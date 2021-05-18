import nltk
rawData = "Natural Language Processing (NLP) is a subset of artificial intelligence which deals with how computers process and understand natural language, or human language. It is used to processes human language in the form of speech or text so that it can be used by the computer and analyzed to recognize context and intent. It is far from perfect, and there is still much to be explored and improved in this field."
tokens = nltk.word_tokenize(rawData.lower())
newText= [tokens for tokens in tokens if tokens.isalnum()]

print(newText)