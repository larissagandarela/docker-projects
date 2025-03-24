from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
import os
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)

load_dotenv()
API_KEY = os.getenv("OPENWEATHER_API_KEY")

if not API_KEY:
    raise ValueError("erro na chave da API")

BASE_URL = "http://api.openweathermap.org/data/2.5/weather"

@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    
    if not city:
        return jsonify({"error": "Cidade não especificada"}), 400

    try:
        response = requests.get(BASE_URL, params={"q": city, "appid": API_KEY, "units": "metric", "lang": "pt"})
        data = response.json()

        if data.get("cod") != 200:
            return jsonify({"error": data.get("message", "Erro desconhecido")}), data.get("cod", 500)

        result = {
            "cidade": data["name"],
            "pais": data["sys"]["country"],
            "temperatura": data["main"]["temp"],
            "sensacao_termica": data["main"]["feels_like"],
            "umidade": data["main"]["humidity"],
            "descricao": data["weather"][0]["description"],
            "icone": data["weather"][0]["icon"]
        }

        return jsonify(result)

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Erro ao buscar dados do clima: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
