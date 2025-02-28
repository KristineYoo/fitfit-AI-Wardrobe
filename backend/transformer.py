from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

def getEmbedding(texts):
    embedding = model.encode(texts)
    return embedding

if __name__ == "__main__":
    getEmbedding("A pink sweater that looks good")