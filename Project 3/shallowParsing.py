import nltk
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag
from nltk.chunk import ne_chunk

rawData = "Natural Language Processing (NLP) is a subset of artificial intelligence which deals with how computers process and understand natural language, or human language."
tokens = nltk.word_tokenize(rawData.lower())
newText= [tokens for tokens in tokens if tokens.isalnum()]

tagged = nltk.pos_tag(newText)

pattern = 'NP: {<DT>?<JJ>*<NN|NNS>+}'

cp = nltk.RegexpParser(pattern)
cs = cp.parse(tagged)
print(cs)

NPChunker = nltk.RegexpParser(pattern) 
result = NPChunker.parse(tagged)
result.draw()