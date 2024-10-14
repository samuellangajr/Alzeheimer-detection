"use client";
import { useState } from "react";

export default function PredictPage() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    ethnicity: "",
    educationLevel: "",
    bmi: "",
    smoking: "",
    alcoholConsumption: "",
    physicalActivity: "",
    dietQuality: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const response = await fetch("/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setLoading(false);
    setResult(
      data.prediction === 1 ? "Alzheimer Positivo" : "Alzheimer Negativo"
    );
  };

  return (
    <div className="container mx-auto max-w-xl p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Previsão de Alzheimer
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div>
          <label className="block font-medium text-gray-700">Idade</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Gênero</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Selecione</option>
            <option value="0">Masculino</option>
            <option value="1">Feminino</option>
          </select>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Etnia</label>
          <input
            type="text"
            name="ethnicity"
            value={formData.ethnicity}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Nível de Educação
          </label>
          <input
            type="number"
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Índice de Massa Corporal (BMI)
          </label>
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Fuma?</label>
          <select
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="0">Não</option>
            <option value="1">Sim</option>
          </select>
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Consumo de Álcool
          </label>
          <input
            type="number"
            name="alcoholConsumption"
            value={formData.alcoholConsumption}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Atividade Física
          </label>
          <input
            type="number"
            name="physicalActivity"
            value={formData.physicalActivity}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">
            Qualidade da Dieta
          </label>
          <input
            type="number"
            name="dietQuality"
            value={formData.dietQuality}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md transition-colors duration-300"
          disabled={loading}
        >
          {loading ? "Calculando..." : "Prever"}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
          <h2 className="text-xl font-bold">Resultado: {result}</h2>
        </div>
      )}
    </div>
  );
}
