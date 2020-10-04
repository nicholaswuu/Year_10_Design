import json

jString = '{"name":"Felix", "age":20, "city":"Toronto"}'

data = json.loads(jString)

print (data)

for i in data:
	print(i)

for j in data.values():
	print(j)

for k in data.items():
	print(k)
	
for l in data.items():
	print(l[0] + ": " + str(l[1]))