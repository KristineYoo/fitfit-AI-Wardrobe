from sentence_transformers import SentenceTransformer

sentence_transformer_model = None 

def get_model(): 
   global sentence_transformer_model 
   if sentence_transformer_model is None: 
      sentence_transformer_model = SentenceTransformer('all-MiniLM-L6-v2') 
   return sentence_transformer_model

def getEmbedding(texts):
    model = get_model()
    embedding = model.encode(texts)
    return embedding

if __name__ == "__main__":
    getEmbedding("A pink sweater that looks good")