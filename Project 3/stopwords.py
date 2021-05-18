import nltk
from nltk.corpus import stopwords

stop_words = stopwords.words('english')

text = ['natural', 'language', 'processing', 'nlp', 'is', 'a', 'subset', 'of', 'artificial', 'intelligence', 'which', 'deals', 'with', 'how', 'computers', 'process', 'and', 'understand', 'natural', 'language', 'or', 'human', 'language', 'it', 'is', 'used', 'to', 'processes', 'human', 'language', 'in', 'the', 'form', 'of', 'speech', 'or', 'text', 'so', 'that', 'it', 'can', 'be', 'used', 'by', 'the', 'computer', 'and', 'analyzed', 'to', 'recognize', 'context', 'and', 'intent', 'it', 'is', 'far', 'from', 'perfect', 'and', 'there', 'is', 'still', 'much', 'to', 'be', 'explored', 'and', 'improved', 'in', 'this', 'field']

filtered_sentence = []

for w in text: 
	if w not in stop_words: 
		filtered_sentence.append(w)

print(filtered_sentence) 