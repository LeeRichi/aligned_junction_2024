from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import fitz  # PyMuPDF for PDF extraction
from pinecone import Pinecone
from transformers import AutoModel
import re
from langchain_ollama import OllamaEmbeddings

# FastAPI app instance
app = FastAPI()

# Initialize Pinecone API
pc = Pinecone(api_key='8bc6be74-a2e6-4a20-be99-6f700a4273b0')

# Pinecone index name and dimension
index_name = "quickstart4"
dimension = 4096

# Create a Pinecone index object for querying
pc_index = pc.Index(index_name)

# Initialize the embedding model (using Ollama embeddings in this case)
embedding_model = OllamaEmbeddings(model="llama3")

# Define the request body for querying
class QueryRequest(BaseModel):
    question: str

# Load and preprocess data from Excel and PDF
# def load_data():
#     # Load data from Excel
#     excel_data = pd.read_excel('/Users/gultajseyid/Desktop/fingrid_english_excel.xlsx')
#     text_data = excel_data.to_string()  # Convert dataframe to string format

#     # Load data from PDF
#     pdf_text = ""
#     with fitz.open("/Users/gultajseyid/Desktop/fingrid_meeting_notes.pdf") as pdf:
#         for page in pdf:
#             pdf_text += page.get_text()

#     return pdf_text + " " + text_data

# Chunk the text into smaller pieces for embedding
# def chunk_text(text, chunk_size=300):
#     sentences = re.split(r'(?<=[.!?]) +', text)
#     chunks = []
#     current_chunk = ""
#     for sentence in sentences:
#         if len(current_chunk) + len(sentence) <= chunk_size:
#             current_chunk += " " + sentence
#         else:
#             chunks.append(current_chunk.strip())
#             current_chunk = sentence
#     chunks.append(current_chunk.strip())
#     return chunks

# # Load and chunk data
# data = load_data()
# chunks = chunk_text(data)

# # Prepare embeddings and upsert them to Pinecone
# for i, chunk in enumerate(chunks):
#     if len(chunk) < 2:  # Skip empty chunks
#         continue
#     # Generate embedding using the embedding model
#     embedding = embedding_model.embed_query(chunk)
#     embedding = list(embedding)  # Ensure embedding is in the correct format (list of floats)

#     # Upsert the embedding into Pinecone
#     pc_index.upsert([(f"chunk-{i}", embedding, {"text": chunk})])

# Function to query Pinecone with a user question
def query_pinecone(question):
    # Generate embedding for the query
    question_embedding = embedding_model.embed_query(question)
    question_embedding = list(question_embedding)  # Ensure it's a list of floats

    # Query Pinecone for the top 3 matches
    results = pc_index.query(vector=[question_embedding], top_k=3, include_metadata=True)

    # Extract matched texts from the results
    return [match['metadata']['text'] for match in results['matches']]

# FastAPI endpoint for querying Pinecone
@app.post("/query")
async def query(query_request: QueryRequest):
    try:
        relevant_texts = query_pinecone(query_request.question)
        return {"relevant_texts": relevant_texts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
