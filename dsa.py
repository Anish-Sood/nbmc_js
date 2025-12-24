import requests
import json
from datetime import datetime
import base64;
import os;
import re;
# second_api=f"{url}/Output_Copy"
first_api="{url}/FinalFilter"
request_body={ "Dept_Id": "10000047", 
              "fromdate": "2025-01-01", 
               "todate": "2025-12-31" }

outputfolder = "punjab_gazette_v3"

if not os.path.exists(outputfolder):
    os.makedirs(outputfolder)
    print(f"created folder: {outputfolder}")

def clean_filename(txt):
    return re.sub(r'[\/:*?"<>|]', '_', txt)

def fetch_all():
    url = "https://dsa.punjab.gov.in/egazette/api/Final/FinalFilter"
    payload={ "Dept_Id": "10000047", 
              "fromdate": "2025-01-01", 
               "todate": "2025-12-31" }
    print("files ki list nikal rhi hai")
    response = requests.post(url, json=payload)
    if response.status_code == 200:
        json_data = response.json()
        data_list =  json_data.get('data', [])
        print(f"Found {len(data_list)} items.")
        id_list=[]
        file_info=[] # this is list of disctionares where [{id:" ",date: " mm-dd-yyyy"}, ]
        if len(data_list) > 0:
            # print("all resonses from first api")
            for item in data_list:
                # print(json.dumps(item, indent=4)) 
                # print("next\n")
                # id_list.append(item["Request_Id"])
                req_id=item["Request_Id"]
                noti_title_without_format=item["Notification_Title"]
                date_without_format=item["Gazette_Date"]
                if date_without_format:
                    date_with_format = date_without_format[:10].replace('/','-')
                    # print (date_with_format)
                if noti_title_without_format:
                    noti_title=clean_filename(noti_title_without_format)[:150]
                    # noti_title=noti_title_without_format
                if req_id:
                    file_info.append({
                            "id": req_id,
                            "date": date_with_format,
                            "notificationTitle": noti_title
                        })
            print("request id ikhathi ho gyi hai.")
        return file_info
    else:
        print("Failed to get list.")
        return []
    # for item1 in id_list:
    #     print(item1)


def download_files(file_info):
    print("2nd step")
    
    for both_data in file_info:
        req_id=both_data['id']
        file_date=both_data['date']
        noti_title=both_data['notificationTitle']
        payload = {"Request_Id": req_id}
        # Second API
        response = requests.post("https://dsa.punjab.gov.in/egazette/api/Final/Output_Copy", json=payload)
        data = response.json()
            
        if data.get('data') and len(data['data']) > 0:
            base64_content = data['data'][0]['Output_File']
                
            file_bytes = base64.b64decode(base64_content)
                
                # Save file inside the folder
            filename = f"{outputfolder}/{file_date}_{noti_title}.pdf"
            counter=1
            while os.path.exists(filename):
                filename = f"{outputfolder}/{file_date}_{noti_title}_{counter}.pdf"
                counter+=1

            with open(filename, "wb") as f:
                f.write(file_bytes)
                    
            print(f"Saved: {filename}")
        else:
            print(f"No filefor ID: {req_id}")

file_info = fetch_all()
if len(file_info) > 0:
    download_files(file_info)
    print("finished.")
else:
    print("none exist.")

