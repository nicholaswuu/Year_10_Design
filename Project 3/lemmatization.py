import nltk
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet

text = ['natural', 'language', 'processing', 'nlp', 'subset', 'artificial', 'intelligence', 'deals', 'computers', 'process', 'understand', 'natural', 'language', 'human', 'language', 'used', 'processes', 'human', 'language', 'form', 'speech', 'text', 'used', 'computer', 'analyzed', 'recognize', 'context', 'intent', 'far', 'perfect', 'still', 'much', 'explored', 'improved', 'field']

tagged = nltk.pos_tag(text)
newtagged = []

for w in tagged:
	tag = w[1]
	if tag.startswith('J'):
		w = (w[0], wordnet.ADJ)
		newtagged.append(w)
	elif tag.startswith('V'):
		w = (w[0], wordnet.VERB)
		newtagged.append(w)
	elif tag.startswith('N'):
		w = (w[0], wordnet.NOUN)
		newtagged.append(w)
	elif tag.startswith('R'):
		w = (w[0], wordnet.ADV)
		newtagged.append(w)
	else:
		w = (w[0], wordnet.ADV)
		newtagged.append(w)

lemmatizer = WordNetLemmatizer()

lemmatized = []

for w, t in newtagged:
	if t is None:
		lemmatized.append(word)
	else:
		lemmatized.append(lemmatizer.lemmatize(w, t))

print(lemmatized)