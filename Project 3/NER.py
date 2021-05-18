import nltk
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag
from nltk.chunk import ne_chunk, conlltags2tree, tree2conlltags
from pprint import pprint

rawData = "The Public Health Agency of Canada (PHAC) says Brig.-Gen. Krista Brodie will take over as the general in charge of overseeing the delivery and distribution of COVID-19 vaccines across Canada."
tokens = nltk.word_tokenize(rawData.lower())
newText= [tokens for tokens in tokens if tokens.isalnum()]

tagged = nltk.pos_tag(newText)

pattern = 'NP: {<DT>?<JJ>*<NN|NNS>+}'

cp = nltk.RegexpParser(pattern)
cs = cp.parse(tagged)

NPChunker = nltk.RegexpParser(pattern) 
result = NPChunker.parse(tagged)
result.draw()

iob_tagged = tree2conlltags(cs)

ne_tree = ne_chunk(pos_tag(word_tokenize(rawData)))
print(ne_tree)