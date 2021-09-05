# import the necessary libraries</pre>

import cv2 as cv
#import openpyxl
import sys
import os
import boto3
from botocore.exceptions import ClientError

# template1.png is the template
# certificate
template_path = 'card.png'

#name = sys.argv[1]
#nic = sys.argv[2]
#district = sys.argv[3]

name = "Limal Manjitha"
nic = "9830956v"
district = "Colombo"
# Excel file containing names of
# the participants
#details_path = 'gsocOrgsList.xlsx'

# Output Paths
output_path = '/output'

# Setting the font size and font
# colour
font_size = 2
font_color = (0, 0, 0)

# Coordinates on the certificate where
# will be printing the name (set
# according to your own template)
coordinate_y_adjustment = 10
coordinate_x_adjustment = 10

# loading the details.xlsx workbook
# and grabbing the active sheet
# obj = openpyxl.load_workbook(details_path)
# sheet = obj.active
access_key = 'AKIA6P76J36QLPMDH4EH'
access_secret = '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'
bucket_name = 'codepipeline-us-east-2-557358387976'
client_s3 = boto3.client(
    's3',
    aws_access_key_id = access_key,
    aws_secret_access_key = access_secret
    )



# printing for the first 10 names in the
# excel sheet
for i in range(1, 2):
    # grabs the row=i and column=1 cell
    # that contains the name value of that
    # cell is stored in the variable certi_name
    #get_name = sheet.cell(row=i, column=1)
    # certi_name = get_name.value
    certi_name = "Limal Manjitha Hiripitiya"

    # read the certificate template
    img = cv.imread(template_path)

    # choose the font from opencv
    font = cv.FONT_HERSHEY_COMPLEX_SMALL

    # get the size of the name to be
    # printed
    text_size = cv.getTextSize(certi_name, font, font_size, 10)[0]

    # get the (x,y) coordinates where the
    # name is to written on the template
    # The function cv.putText accepts only
    # integer arguments so convert it into 'int'.
    # text_x = (img.shape[1] - text_size[0]) / 2 + coordinate_x_adjustment
    text_x = (img.shape[1] - text_size[0]) / 2 + 1
    # text_y = (img.shape[0] + text_size[1]) / 2 - coordinate_y_adjustment
    text_y = (img.shape[0] + text_size[1]) / 2 - 1
    text_x = int(text_x)
    text_y = int(text_y)
    cv.putText(img, name,
               (447, 353),
               font,
               font_size,
               font_color, 2)
    cv.putText(img,nic,
               (447, 426),
               font,
               font_size,
               font_color, 2)
    cv.putText(img, district,
               (447, 496),
               font,
               font_size,
               font_color, 2)
    # Output path along with the name of the
    # certificate generated
    certi_path = output_path + '/certi_'+ str(nic) + '.png'

    # Save the certificate
    cv.imwrite(certi_path, img)
    try:
        client_s3.upload_file(
            certi_path,
            bucket_name,
            certi_path
            )
    except ClientError as e:
        print('Credential is incorrect')
        print(e)
    except Exception as e:
        print(e)

