import nltk

text = ['natural', 'language', 'processing', 'nlp', 'subset', 'artificial', 'intelligence', 'deal', 'computer', 'process', 'understand', 'natural', 'language', 'human', 'language', 'use', 'process', 'human', 'language', 'form', 'speech', 'text', 'use', 'computer', 'analyze', 'recognize', 'context', 'intent', 'far', 'perfect', 'still', 'much', 'explore', 'improved', 'field']

tagged = nltk.pos_tag(text)
print(tagged)