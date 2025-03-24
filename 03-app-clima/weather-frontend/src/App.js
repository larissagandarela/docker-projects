import React, { useState } from "react";
import axios from "axios";

function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const fetchWeather = async () => {
        if (!city.trim()) {
            setError("Por favor, digite uma cidade");
            return;
        }

        setError(null);
        setWeather(null);

        try {
            const cityEncoded = encodeURIComponent(city.trim());
            const response = await axios.get(`http://localhost:5000/weather?city=${cityEncoded}`);
            setWeather(response.data);
        } catch (error) {
            setError("Erro ao buscar o clima");
            console.error("Erro ao buscar clima:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>App de Clima</h1>
            <input 
                type="text" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                placeholder="Digite a cidade" 
            />
            <button onClick={fetchWeather}>Buscar Clima</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {weather && (
                <div>
                    <h2>{weather.cidade}, {weather.pais}</h2>
                    <p>Temperatura: {weather.temperatura}°C</p>
                    <p>Sensação térmica: {weather.sensacao_termica}°C</p>
                    <p>Umidade: {weather.umidade}%</p>
                    <p>Condição: {weather.descricao}</p>
                    <img 
                        src={`http://openweathermap.org/img/wn/${weather.icone}@2x.png`} 
                        alt={weather.descricao} 
                    />
                </div>
            )}
        </div>
    );
}

export default App;
