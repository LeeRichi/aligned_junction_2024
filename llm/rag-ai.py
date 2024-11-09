# Import required libraries
import pandas as pd
import fitz  # PyMuPDF for PDF extraction

from pinecone import Pinecone, ServerlessSpec

from transformers import AutoModel
import re
from langchain_ollama import OllamaEmbeddings

# Initialize Pinecone API
pc = Pinecone(api_key='8bc6be74-a2e6-4a20-be99-6f700a4273b0')

# Create a Pinecone index
index_name = "quickstart4"
dimension = 4096  # Adjust the dimension based on your embedding model

# Create Pinecone index (ensure the correct spec for serverless and region)
# pc_index = pc.create_index(
#     name=index_name,
#     dimension=dimension, 
#     metric="cosine",
#     spec=ServerlessSpec(
#         cloud="aws",
#         region="us-east-1"
#     )
# )

# Create a Pinecone index object for querying
pc_index = pc.Index(index_name)

# Initialize the embedding model (from transformers or Ollama)
embedding_model = OllamaEmbeddings(model="llama3")

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

# Chunk data
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
    
    # Query Pinecone for the top 3 matches ndex.query(vector=
    results = pc_index.query(vector=[question_embedding], top_k=3, include_metadata=True)
    
    # Extract matched texts from the results
    return [match['metadata']['text'] for match in results['matches']]

# Example user query
question = "What was the latest error?"
relevant_texts = query_pinecone(question)

# Display relevant texts from Pinecone query results
# for text in relevant_texts:
#     print(text)

# Use the context for a Groq chat completion
matched_info = ' '.join(relevant_texts)
sources = ["source1", "source2"]  # Example, use actual sources from metadata if available
context = f"Information: {matched_info} and the sources: {sources}"

sys_prompt = f"""
Instructions:
- Be helpful and answer questions concisely. If you don't know the answer, say 'I don't know'
- Utilize the context provided for accurate and specific information.
- Incorporate your preexisting knowledge to enhance the depth and relevance of your response.
- Cite your sources
Context: {context}
"""
# Initialize Groq client
from groq import Groq
client = Groq(api_key='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')

# Chat completion using Groq API
chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": sys_prompt
        },
        {
            "role": "user",
            "content": question
        }
    ],
    model="llama3-8b-8192",  # Example model, adjust based on your needs
    temperature=0.5,
    max_tokens=4096,
    top_p=1,
    stop=None,
    stream=False,
)
print('Done after groq')

print(chat_completion.choices[0].message.content)
