from flask import Flask, jsonify, request
from flask_cors import CORS
from metaphor_python import Metaphor
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

metaphor = Metaphor("ce859a75-1e02-4487-b51e-e0e3a3657883")

@app.route("/find-similar", methods=["POST"])
def find_similar():
    url = request.json.get("url")

    if not url:
        return jsonify({"error": "URL is required"}), 400

    try:
        api_url = "https://api.metaphor.systems/findSimilar"

        payload = {
            "url": url,
            "numResults": 5,
            "includeDomains": ["google.scholar.com","jstor.org","pubmed.ncbi.nlm.nih.gov","loc.gov","science.gov","worldcat.org","researchgate.net",],
        }
        headers = {
            "accept": "application/json",
            "content-type": "application/json",
            "x-api-key": "ce859a75-1e02-4487-b51e-e0e3a3657883"
        }

        response = requests.post(api_url, json=payload, headers=headers)

        data = response.json()
        return jsonify(data)


    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/get-article-info", methods=["POST"])
def get_article_info():
    ids = request.json.get("ids")
    
    if not ids:
        return jsonify({"error": "Article IDs are required"}), 400

    api_url = f"https://api.metaphor.systems/contents?ids={ids}"

    headers = {
        "accept": "application/json",
        "x-api-key": "ce859a75-1e02-4487-b51e-e0e3a3657883"
    }

    try:
        response = requests.get(api_url, headers=headers)
        data = response.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/get-abstract", methods=["POST"])
def get_abstract():
    url = request.json.get("url")
    
    if not url:
        return jsonify({"error": "Article URL is required"}), 400

    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')

        # Locate the div with id 'eng-abstract'
        abstract_div = soup.find("div", id="eng-abstract")

        # Check if the abstract div is found
        if not abstract_div:
            return jsonify({"error": "Could not extract abstract"}), 400

        # Extract all paragraph text within the div
        paragraphs = abstract_div.find_all("p")
        abstract_text = ' '.join([p.get_text().strip() for p in paragraphs])

        return jsonify({"abstract": abstract_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=3001)