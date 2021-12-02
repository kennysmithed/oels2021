# -*- coding: utf-8 -*-
## Attribution: original code by Kenny Smith, edited by Jenny Culbertson

import boto3
import xmltodict
import datetime # or getting today's date
import pytz # for timezone stuff
import glob  # for listing files with wildcards in names
import argparse # for parsing command-line arguments
import sys
import unidecode # for dealing with accents in worker comments (or anywhere else)
import codecs

## To run in a virtual environment in case of python verison conflicts:

	## First time:
	# pip install virtualenv
	# mkdir mturk
	# cd mturk/
	# virtualenv .

	## To activate it (every time), navigate to mturk folder then:
	# source bin/activate

## How to use:
	## To launch a new batch...will create a new HITID file (in the mturk folder)
	# python create_tasks.py --create

	## To check whether all assignments are complete, make sure to update the HITID File
	# python create_tasks.py --check --hitfile HITIDFiles/NPO_exp6HIT_12_12_2019_Batch0.txt

	## To approve the work once it's complete (will pay/give qualifications for a batch)
	# python create_tasks.py --approve --hitfile HITIDFiles/NPO_exp6HIT_11_12_2019_Batch2.txt

	## To download the data
	# create_tasks.py --data --hitfile HITIDFiles/NPO_exp6HIT_11_12_2019_Batch1.txt

################################################################################
############ Global parameters
################################################################################

##Location of xml file specifying ExternalHIT (specify your path)
user = 'XXX'
path = '/Users/'+user+'XXX/mturk/'
questionFile = path+'question.xml' # see example file on scripts page
hitidFilePath = path+'HITIDFiles/' # create this folder if it doesn't exist

## Enter your credentials here
access_key = "XXXX"
secret_access_key = "XXXX"

platform = 'sandbox' ### Set to 'live' to run live

#this is the live server details
mturkLive = boto3.client('mturk',
   aws_access_key_id = access_key,
   aws_secret_access_key = secret_access_key,
   region_name='us-east-1',
   endpoint_url = 'https://mturk-requester.us-east-1.amazonaws.com')


#this is the sandbox server
mturkSandbox = boto3.client('mturk',
   aws_access_key_id = access_key,
   aws_secret_access_key = secret_access_key,
   region_name='us-east-1',
   endpoint_url = 'https://mturk-requester-sandbox.us-east-1.amazonaws.com'
)

livePreviewURL = "https://worker.mturk.com/mturk/preview?groupId="
sandboxPreviewURL = "https://workersandbox.mturk.com/mturk/preview?groupId="

#set other parameters based on whether we are in sandbox or live mode
if (platform=='sandbox'):
    mturk = mturkSandbox #set to mturkLive for live
    previewURL = sandboxURL #set to liveURL

elif (platform=='live'):
    mturk = mturkLive #set to mturkLive for live
    previewURL = liveURL #set to liveURL


################################################################################
############# Misc
################################################################################

def getYNInput():
    keypress = raw_input()
    #keypress = input() #python 3 version
    if (keypress=='y'):
        return True
    else:
        return False


################################################################################
############# Check balance
################################################################################

def check_balance():
    print("I have $" + mturk.get_account_balance()['AvailableBalance'] + " in my account")

################################################################################
############# Qualifications
################################################################################

# see external file create_qualification.py for example

################################################################################
############# HIT creation
################################################################################


## assumes that you are using an xml question file to specify the hit URL/appearance
def create_hit():

    ## incorporate balance check to make sure you have enough to run the HITs
    check_balance()
    ## create a datestring for HIT id
    dateString = datetime.date.today().strftime('%d_%m_%Y')
    print('Launch HIT? (y/n)')
    ## if 'y' then launch the HIT...
    if (getYNInput()):
        hitFiles = glob.glob(hitidFilePath + 'XXXHIT_'+ dateString + '*.txt') # looking for HIT ids with today's date to check for previous batches
        thisBatchNumber = len(hitFiles) # if there's already been a batch, current batch number will be one more than that (starts at 0)
        thisHITFile = hitidFilePath+'XXXHIT_'+dateString+'_Batch'+str(thisBatchNumber)+'.txt' # create the new HIT id
        ## read the question file (contains external URL information for your HIT)
        question = open(questionFile, 'r').read()
        ## indicate the qualifications that are required for this HIT (note you must create a qualification for your HIT in the mturk requester web interface)
        ## qualifications are disabled in sandbox mode - you typically want to be able to access your own HIT, and
        ## the live and sandbox sites use different custom qualifications anyway, so using live qualifications on the
        ## dandbox generates an error
        if (platform=='sandbox'):
            qualsRequired=[]
        elif (platform=='live'):
            qualsRequired=[
                {'QualificationTypeId':'00000000000000000071', # set location qualification...
                'Comparator':'EqualTo', # equal to...
                'LocaleValues': [{'Country': 'US'}], # US --> only workers in the US
                'ActionsGuarded': 'PreviewAndAccept'}, # allow only qualified workers to preview
                {'QualificationTypeId':'00000000000000000040', # set number of HITs completed qualification...
                'Comparator':'GreaterThanOrEqualTo', # greater than or equal to...
                'IntegerValues': [1000], # 1000
                'ActionsGuarded': 'PreviewAndAccept'},
                {'QualificationTypeId':'000000000000000000L0', # set % assignments approved qualification...
                'Comparator':'GreaterThanOrEqualTo', # greater than or equal to...
                'IntegerValues': [98], # 98%
                'ActionsGuarded': 'PreviewAndAccept'},
                {'QualificationTypeId':'XXX', # qualification for your HIT (Real), given to workers who have already completed the HIT
                'Comparator':'DoesNotExist'},] # if that qualification does NOT exist, then worker can complete HIT
        ## create the HIT parameters
        new_hit = mturk.create_hit(
                Title = 'Learn a small part of a new language', # set as you like, this is what workers will see before they preview
                Description = 'Learn a small part of a new language, earn $2.50 for 10min', # set as you like, this is what workers will see before they preview
                Keywords = 'language, psychology, experiment', # set as you like, this helps workers to find the HIT
                Reward = '2.5', # set amount of pay per HIT (does NOT include additional mturk fee, that's automatically added)
                MaxAssignments = 9, # set number of assignments (participants to recruit) for the HIT, NB: if 10 or more then you pay extra, so good to do 9 at a time!
                LifetimeInSeconds = 72000, # set time limit for entire batch of HITs to be completed
                AssignmentDurationInSeconds = 2700, # set time limit for each worker to complete the HIT
                AutoApprovalDelayInSeconds = 86400, # set automatic approval time
                Question = question, # specify external URL, see above
                QualificationRequirements=qualsRequired) # specify qualifications, see above
        ## get the HIT id
        with open(thisHITFile, "w") as text_file:
            text_file.write(new_hit['HIT']['HITId'])
        ## print information so you can preview the HIT, either on real mturk OR on sandbox
        print("Preview: " + previewURL + new_hit['HIT']['HITGroupId'])
        print("HITID = " + new_hit['HIT']['HITId'])
        return new_hit

################################################################################
############# Payment
################################################################################

## each data item is a dict
## get data from 'FreeText' element (if it exists)
def extract_data(data_dict):
    if data_dict['FreeText']:
        return data_dict['QuestionIdentifier'],data_dict['FreeText'].split(',')
    else:
        return data_dict['QuestionIdentifier'],None

## get workerId and AssignmentId
def data_from_assignment(assignment_dict):
    workerId=assignment_dict['WorkerId']
    assignmentId=assignment_dict['AssignmentId']
    return workerId,assignmentId

## get trial answers
def field_from_assignment(assignment_dict,field_to_return):
    workerId=assignment_dict['WorkerId']
    #the list of answers produced by the participant is slightly buried in here
    answerList = xmltodict.parse(assignment_dict['Answer'])['QuestionFormAnswers']['Answer']
    formatted_answer_list = [extract_data(answer) for answer in answerList]
    other_question_answers = [answer for answer in formatted_answer_list if 'trialData' not in answer[0]]
    relevant_question_answers = [a for a in other_question_answers if a[0]==field_to_return]
    return workerId,relevant_question_answers

## get comments
def get_comments(hitID):
    result=mturk.list_assignments_for_hit(HITId=hitID)
    assignments = result['Assignments']
    comments = [field_from_assignment(a,'comments') for a in assignments]
    print(comments)

## approve the HIT, pay participants and give HIT qualifications (to prevent workers participating again)
def approve_hit(filename,hitID):
    ## check your balance again to make sure you can pay...don't do this unless you know all the assignments have been completed
    check_balance()
    print('Approving and paying after ' + filename)
    print("If you haven't checked this HIT is complete, we suggest you don't proceed!")
    ## find all the completed assignments for this HIT
    result=mturk.list_assignments_for_hit(HITId=hitID)
    assignments = result['Assignments']
    worker_assignment_list = [data_from_assignment(a) for a in assignments]

    ## calculate who gets paid and qualifications
    print('Number of workers: ' + str(len(assignments)))
    print('Proceed to approve and qualify? (y/n)')
    ## if 'n', stop
    if (not(getYNInput())):
        print('CAUTION! workers have not been paid!')
        sys.exit()
    ## if 'y', approve, pay, and give qualification to each worker
    else:
        for workerID,assignmentID in worker_assignment_list:
            #they get their work approved
            print('Approving assignment ',assignmentID,' for worker ',workerID)
            if mturk.get_assignment(AssignmentId=assignmentID)['Assignment']['AssignmentStatus']!='Approved':
                _ = mturk.approve_assignment(AssignmentId=assignmentID)
            ## give qualification to indicate they have completed the HIT, which rules them out from taking it again
            if (platform=='live'):
                _ = mturk.associate_qualification_with_worker(QualificationTypeId='XXX', # add your qualification
                                               WorkerId=workerID,
                                               IntegerValue=1,
                                               SendNotification=False)
    print('Completed tidy-up')


################################################################################
############# Checking and expiring
################################################################################

## reports on status of the HIT
def check_hit(hitID):
    hit = mturk.get_hit(HITId=hitID)
    nAvailable = hit['HIT']['MaxAssignments']
    nComplete = mturk.list_assignments_for_hit(HITId=hitID)['NumResults']
    expiration = hit['HIT']['Expiration']
    if expiration<datetime.datetime.now(pytz.utc):
        print(str(nComplete)+'/'+str(nAvailable),' assignments completed, HIT expired at ',datetime.datetime.strftime(expiration,'%H:%M %d %b %Y'))
    else:
        print(str(nComplete)+'/'+str(nAvailable),' assignments completed, HIT is LIVE and will expire at ',datetime.datetime.strftime(expiration,'%H:%M %d %b %Y'))

## expires HIT
def expire_hit(hitID):
    mturk.update_expiration_for_hit(HITId=hitID,ExpireAt=datetime.datetime.now()-datetime.timedelta(days=1))

# ## cleans trial data strings so that separator is comma (for csv formatting)
# def clean_stringold(datastring):
#     tidy = datastring.replace('_',',')
#     #return datastring.replace('-',',') # if dashes were used as separators, use this instead
#     return tidy

# ## get data in the right format and write to csv...this will need to be changed depending on what data you are returning
# def format_worker_data(simple_answers):
# 	## answers are lists, a[0] returns names/ids, a[1] is the entry, entry itself is a list, so to access it use [0][0]
# 	## e.g., [u'noun', [u'feather']]
# 	## XXXX
# 	filename = dataDirectory + workerId + '.csv'
# 	headers = ','.join(['condition','workerId','phase','trial','meaning','phrase','foil','response','noun_def','inner_mod1_def','inner_mod2_def','outer_mod1_def','outer_mod2_def','strategy','lang1','lang1_rating','lang2','lang2_rating','lang3','lang3_rating','lang4','lang4_rating'])
# 	with open(filename, "w") as csv_file:
# 		csv_file.write(headers+'\n')
# 		for t in trialData:
# 			csv_file.write(t.encode('utf-8') + ',' + questionnaire_data.encode('utf-8') + '\n'.encode('utf-8')) # python 2 version: encode as utf-8 to prevent any issues with accents or weird characters in comments
# 			#csv_file.write(t + ',' + questionnaire_data + '\n') # python 3 version: encode as utf-8 to prevent any issues with accents or weird characters in comments

# ## get data from a hit (calls format_worder_data() to write to csv)
# def get_data(hitID):
#     assignments = mturk.list_assignments_for_hit(HITId=hitID)['Assignments']
#     for a in assignments:
#         parsed_answers = xmltodict.parse(a['Answer'])['QuestionFormAnswers']['Answer']
#         format_worker_data([extract_data(a) for a in parsed_answers])

################################################################################
############# Revoking out-of-date qualifications
################################################################################


################################################################################
############# Doing stuff based on a HIT file
################################################################################

def idFromFile(filename):
    with open(filename, 'r') as myfile:
        hitID=myfile.read()
    return hitID

def check_from_file(filename):
    hitID=idFromFile(filename)
    check_hit(hitID)

def approve_from_file(filename):
    hitID=idFromFile(filename)
    approve_hit(filename,hitID)

def expire_from_file(filename):
    hitID=idFromFile(filename)
    expire_hit(hitID)

def data_from_file(filename):
    hitID=idFromFile(filename)
    get_data(hitID)

def comments_from_file(filename):
    hitID=idFromFile(filename)
    get_comments(hitID)


################################################################################
############# Main
################################################################################


def main():
    description = "Creates and pays off Particle HITS."
    parser = argparse.ArgumentParser(description=description)
    parser.add_argument("--balance",
                        action='store_true',
                        help="Set this flag to check balance.")
    parser.add_argument("--create",
                        action='store_true',
                        help="Set this flag to create a HIT.")
    parser.add_argument("--check",
                        action='store_true',
                        help="Set this flag to check progress on a HIT.")
    parser.add_argument("--approve",
                        action='store_true',
                        help="Set this flag to approve all assignments on a HIT.")
    parser.add_argument("--data",
                        action='store_true',
                        help="Set this flag to get all data from a HIT.")
    parser.add_argument("--comments",
                        action='store_true',
                        help="Set this flag to check progress on a HIT.")
    parser.add_argument("--expire",
                        action='store_true',
                        help="Set this flag to expire a HIT.")
    parser.add_argument("--hitfile", "-f",\
                        help="File containing HIT ID of HIT to be checked/paid")

    parser.add_argument("--compensation",
                        action='store_true',
                        help="Set this flag to qualify a worker for a compensation HIT.")
    parser.add_argument("--decompensation",
                        action='store_true',
                        help="Set this flag to remove qualification a worker for a compensation HIT.")
    parser.add_argument("--worker", "-w",\
                        help="Worker to be qualified")
    parser.add_argument("--amount", "-a",\
                        help="Amount for compensation HIT")

    args = parser.parse_args()
    if (args.balance):
        check_balance()
    elif (args.expire) & (args.hitfile is not None):
        expire_from_file(args.hitfile)
    elif (args.check) & (args.hitfile is not None):
        check_from_file(args.hitfile)
    elif (args.approve) & (args.hitfile is not None):
        approve_from_file(args.hitfile)
    elif (args.data) & (args.hitfile is not None):
        data_from_file(args.hitfile)
    elif (args.comments) & (args.hitfile is not None):
        comments_from_file(args.hitfile)
    elif args.create:
        create_hit()


    else:
        print('Not sure what you want me to do!')


if __name__ == "__main__":
    main()
