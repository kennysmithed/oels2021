import boto3

MTURK_REAL = 'https://mturk-requester.us-east-1.amazonaws.com'
MTURK_SANDBOX = 'https://mturk-requester-sandbox.us-east-1.amazonaws.com'

mturk = boto3.client('mturk',
   aws_access_key_id = "XXX",
   aws_secret_access_key = "XXX",
   region_name='us-east-1',
   endpoint_url = MTURK_REAL
)

response = mturk.create_qualification_type(
    Name='My XX Qualification',
    Keywords='Some keywords',
    Description='Given to workers who have done the XX study',
    QualificationTypeStatus='Active',
)

print("Your Qualification is created. Your Qualification Type ID is:")
#print(response[:qualification_type][:qualification_type_id]) # not working for some reason
print(response) # this will print out everything about the qualification, you need to find the qualification type ID and copy that 


# QUALIFICATION TYPE ID:
# XXX