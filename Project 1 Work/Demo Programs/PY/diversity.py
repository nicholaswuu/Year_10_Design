#https://developers.google.com/docs/api/quickstart/python

import requests

fname = input("first name: ")
lname = input("last name: ")
url = "https://api.diversitydata.io/?fullname="+fname+"%20"+lname
response = requests.get(url)
print (response.text)