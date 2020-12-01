for j in range(1, 10000, 1):
	def perfectNumbers():
		print(j)

	def isFactor():
		counter = 0
		for i in range(1,int(j/2+1), 1):
			if(j%i == 0):
				counter = counter + i
		if(counter == j):
			perfectNumbers()

	isFactor()
print("done")