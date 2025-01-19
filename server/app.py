from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

AZURE_KEY = "3m4FzdtJk56AL7WVWXKAcWck8RZ5f0C9hUmmgmuLWJtI4gD1m2pyJQQJ99BAACBsN54XJ3w3AAAYACOGWNcf"
AZURE_ENDPOINT = f"https://canadacentral.api.cognitive.microsoft.com"  # Constructed using the region
JAN_API_URL = "http://127.0.0.1:1337/v1/chat/completions"

def analyze_with_azure(text):
    headers = {
        "Ocp-Apim-Subscription-Key": AZURE_KEY,
        "Content-Type": "application/json"
    }
    
    body = {
        "documents": [{
            "language": "en",
            "id": "1",
            "text": text
        }]
    }
    
    response = requests.post(
        f"{AZURE_ENDPOINT}/text/analytics/v3.0/entities/health",
        headers=headers,
        json=body
    )
    
    return response.json()

def get_jan_explanation(term):
    try:
        # Create a simple, direct prompt
        messages = [
            {
                "role": "system",
                "content": "You are a helpful medical assistant. Explain medical terms simply and briefly."
            },
            {
                "role": "user",
                "content": f"What is {term} in simple terms?"
            }
        ]
        
        # Debug print
        print(f"\nSending to Jan at {JAN_API_URL}")
        print(f"Term: {term}")
        
        payload = {
            "messages": messages,
            "temperature": 0.7,
            "stream": False
        }
        
        # Debug print
        print(f"Jan Payload: {payload}")
        
        response = requests.post(
            JAN_API_URL,
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        # Debug print
        print(f"Jan Response Status: {response.status_code}")
        print(f"Jan Response: {response.text}\n")
        
        if response.status_code == 200:
            return response.json()['choices'][0]['message']['content'].strip()
        else:
            print(f"Error from Jan: {response.status_code} - {response.text}")
            return f"Unable to explain {term} at this time."
            
    except Exception as e:
        print(f"Exception when calling Jan: {str(e)}")
        return f"Unable to explain {term} at this time."

@app.route('/analyze-medical-terms', methods=['POST'])
def analyze_medical_terms():
    text = request.json.get('text', '')
    
    # Get medical terms from Azure
    azure_results = analyze_with_azure(text)
    medical_terms = {}
    
    # Extract medical entities
    if 'documents' in azure_results and azure_results['documents']:
        entities = azure_results['documents'][0].get('entities', [])
        for entity in entities:
            if entity.get('category') in ['MedicalCondition', 'Symptom', 'Treatment', 'MedicationClass']:
                term = entity['text']
                # Get simplified explanation from Jan
                explanation = get_jan_explanation(term)
                medical_terms[term] = explanation
    
    return jsonify({"insights": medical_terms})

if __name__ == '__main__':
    print(f"Flask server starting on http://0.0.0.0:5000")
    app.run(host='0.0.0.0', debug=True, port=5000) 