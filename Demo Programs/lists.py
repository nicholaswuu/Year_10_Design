numList = [1,2,3,4,5,6,7,8,9,10]
wordList = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]

for n in numList:
	print(n)

for w in wordList:
	print(w)

print(numList[0:5])
print(wordList[4:])

print(len(numList))

wordList.append("black")

print(wordList)

wordList.remove("black")

print(wordList)