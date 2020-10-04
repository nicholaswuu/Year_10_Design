import math

def sumFactor(n):
	counter = 1
	for i in range(2, int(math.sqrt(n)+1)):
		if(n%i == 0):
			counter = counter + i + n/i
	return(counter)

for n in range(1,1000000):
	if(sumFactor(n) == n):
		print(n)