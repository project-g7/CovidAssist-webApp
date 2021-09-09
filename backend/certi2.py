import cv2 as cv
#import openpyxl
import sys
import os
import boto3
from botocore.exceptions import ClientError
from dotenv import load_dotenv
load_dotenv()

template_path = 'images/vaccineCard.png'

name = sys.argv[1]
nic = sys.argv[2]
address = sys.argv[3]
vaccine2 = sys.argv[4]
center2 = sys.argv[5]
date2 = sys.argv[6]
vaccine1 = sys.argv[7]
center1 = sys.argv[8]
date1 = sys.argv[9]


# Output Paths
output_path = '/output'

font_size = 2
font_color = (0, 0, 0)


coordinate_y_adjustment = 10
coordinate_x_adjustment = 10

access_key = os.environ.get('s3_access_key')  
access_secret = os.environ.get('s3_access_secret')  
bucket_name = os.environ.get('s3_bucket_name')  
client_s3 = boto3.client(
    's3',
    aws_access_key_id = access_key,
    aws_secret_access_key = access_secret
    )


for i in range(1, 2):

 
    img = cv.imread(template_path)


    font = cv.FONT_HERSHEY_COMPLEX_SMALL

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
    cv.putText(img, address,
               (447, 496),
               font,
               font_size,
               font_color, 2)
    cv.putText(img, vaccine1,
               (447, 865),
               font,
               font_size,
               font_color, 2)
    cv.putText(img, center1,
               (447, 936),
               font,
               font_size,
               font_color, 2)
    cv.putText(img, date1,
               (447, 1008),
               font,
               font_size,
               font_color, 2)
    cv.putText(img, vaccine2,
               (447, 1220),
               font,
               font_size,
               font_color, 2)
    cv.putText(img, center2,
               (447, 1291),
               font,
               font_size,
               font_color, 2)
    cv.putText(img, date2,
               (447, 1361),
               font,
               font_size,
               font_color, 2)
   
    certi_path = output_path + '/certi_'+ str(nic) + '.png'

  
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

