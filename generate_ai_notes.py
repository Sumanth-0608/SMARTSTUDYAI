# =================================================================
# 🤖 HUGGING FACE API KEY - PASTE YOUR KEY HERE
# =================================================================
# Get your free API key from: https://huggingface.co/settings/tokens
# Your key should start with "hf_"
# 
# PASTE YOUR KEY HERE:

HF_API_KEY = "YOUR_HF_API_KEY"
OPENROUTER_API_KEY = "YOUR_OPENROUTER_API_KEY"
# =================================================================

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/generate-ai-notes", methods=["POST"])
def generate_ai_notes():
    """
    Generate AI notes using Hugging Face API
    Fresh implementation with proper error handling
    """
    try:
        # Get JSON data from request
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data received"}), 400
        
        transcript = data.get("transcript", "").strip()
        if not transcript:
            return jsonify({"error": "Transcript is required"}), 400
        
        # Get Hugging Face API key
        hf_api_key = HF_API_KEY
        if not hf_api_key or hf_api_key == "PASTE_YOUR_HUGGING_FACE_API_KEY_HERE":
            return jsonify({
                "error": "API key not configured",
                "message": "Please paste your Hugging Face API key in generate_ai_notes.py"
            }), 500
        
        print(f"Generating AI notes for transcript length: {len(transcript)}")
        
        # Prepare prompt
        prompt = f"""Summarize this transcript into:

* Key points
* Important concepts
* 3 practice questions

Transcript:
{transcript}"""
        
        # Hugging Face API configuration
        api_url = "https://router.huggingface.co/hf-inference/models/google/flan-t5-base"
        headers = {
            "Authorization": f"Bearer {hf_api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "inputs": prompt,
            "parameters": {
                "max_length": 500,
                "temperature": 0.7,
                "do_sample": True
            }
        }
        
        print("Sending request to Hugging Face API...")
        
        # Make API request
        import requests
        try:
            response = requests.post(api_url, headers=headers, json=payload, timeout=30)
            
            if response.status_code == 200:
                result = response.json()
                
                if result and isinstance(result, list) and len(result) > 0:
                    generated_text = result[0].get("generated_text", "")
                    
                    if generated_text:
                        print("AI notes generated successfully")
                        return jsonify({
                            "notes": generated_text.strip(),
                            "message": "AI notes generated successfully"
                        })
            
            # Handle specific HTTP errors
            elif response.status_code == 429:
                return jsonify({
                    "error": "Rate limit exceeded",
                    "message": "Too many requests. Please try again later."
                }), 429
            elif response.status_code == 503:
                return jsonify({
                    "error": "Service unavailable",
                    "message": "AI service is temporarily unavailable."
                }), 503
            elif response.status_code == 504:
                return jsonify({
                    "error": "Model loading",
                    "message": "Model is loading, please try again."
                }), 504
            else:
                return jsonify({
                    "error": "API error",
                    "message": f"API returned status {response.status_code}"
                }), response.status_code
                
        except requests.exceptions.Timeout:
            return jsonify({
                "error": "Request timeout",
                "message": "Request timed out. Please try again."
            }), 408
        except requests.exceptions.ConnectionError:
            return jsonify({
                "error": "Connection error",
                "message": "Could not connect to AI service."
            }), 503
        except Exception as e:
            print(f"Unexpected error: {e}")
            return jsonify({
                "error": "Service error",
                "message": "An unexpected error occurred."
            }), 500
            
    except Exception as e:
        print(f"Error in generate_ai_notes: {e}")
        return jsonify({
            "error": "Internal server error",
            "message": "Failed to process request"
        }), 500

if __name__ == '__main__':
    print("🤖 AI Notes API Server Running on http://localhost:5001")
    app.run(debug=True, port=5001)
