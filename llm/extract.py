import fitz

def load_data():
    
    # Load data from PDF
    pdf_text = ""
    with fitz.open("/Users/gultajseyid/Desktop/fingrid_meeting_notes.pdf") as pdf:
        for page in pdf:
            pdf_text += page.get_text()

    return pdf_text 

print(load_data)