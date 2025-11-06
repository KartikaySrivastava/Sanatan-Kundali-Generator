from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

# Flask app setup
app = Flask(__name__)
CORS(app)

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Langflow configuration
BASE_API_URL = os.getenv("BASE_API_URL", "https://api.langflow.astra.datastax.com")
LANGFLOW_ID = os.getenv("LANGFLOW_ID", "13d2661b-1cac-469c-a004-3df3ec5a3da7")
FLOW_ID = os.getenv("FLOW_ID", "f35a2497-666e-479d-879e-29b1817f5916")
APPLICATION_TOKEN = os.getenv("APPLICATION_TOKEN")
TWEAKS = {
    "ChatInput-H4yRa": {},
    "ParseData-67Big": {},
    "Prompt-Rwqkl": {},
    "SplitText-1Qvd7": {},
    "OpenAIModel-h16gt": {},
    "ChatOutput-aVYDO": {},
    "AstraDB-4Vo6G": {},
    "OpenAIEmbeddings-34uTS": {},
    "AstraDB-AeLsd": {},
    "OpenAIEmbeddings-5ECcb": {},
    "File-7A7RK": {}
}

# Validate required environment variables
if not APPLICATION_TOKEN:
    raise ValueError("APPLICATION_TOKEN environment variable is required")

def run_flow(message: str, endpoint: str, tweaks: dict) -> dict:
    """
    Run the Langflow API with a given message and optional tweaks.
    """
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/{endpoint}"

    payload = {
        "input_value": message,
        "output_type": "chat",
        "input_type": "chat",
        "tweaks": tweaks,
    }
    headers = {
        "Authorization": f"Bearer {APPLICATION_TOKEN}",
        "Content-Type": "application/json",
    }

    response = requests.post(api_url, json=payload, headers=headers)

    # Handle errors gracefully
    if response.status_code != 200:
        return {"error": "Langflow API request failed", "details": response.text}

    return response.json()


@app.route("/api/chat", methods=["POST"])
def chat():
    """
    Chat endpoint for handling messages from the frontend.
    """
    try:
        data = request.json
        message = data.get("message", "").strip()
        if not message:
            return jsonify({"error": "Message is required"}), 400

        print(f"Received message: {message}")

        # Run the flow with the given message
        response = run_flow(message=message, endpoint=FLOW_ID, tweaks=TWEAKS)

        # Log response
        print(f"Langflow API response: {response}")

        if "error" in response:
            return jsonify({"error": response["error"], "details": response.get("details", "")}), 500

        # Extract chatbot's reply
        outputs = response.get("outputs", [])
        if outputs:
            # Correctly extract the chatbot response
            chatbot_response = outputs[0]["outputs"][0]["results"]["message"]["text"]
            return jsonify({"message": chatbot_response}), 200

        return jsonify({"error": "No response from Langflow API"}), 500

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500


# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True,port=5001,host='0.0.0.0')
