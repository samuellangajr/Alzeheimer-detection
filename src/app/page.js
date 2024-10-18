"use client";
import { useState } from "react";

export default function PredictPage() {
  const [formData, setFormData] = useState({
    age: 50,
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
  const [, setError] = useState(null);

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
    setError(null);

    await new Promise((resolve) => setTimeout(resolve, 2000)); 

    try {
      const response = await fetch("/api/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao prever os dados. Tente novamente.");
      }

      const data = await response.json();
      setLoading(false);
      setResult(
        data.prediction === 1 ? "Alzheimer Positivo" : "Alzheimer Negativo"
      );
    } catch (err) {
      setLoading(false);
      setError(err.message || "Ocorreu um erro inesperado.");

      const localResult = calculateLocalResult(formData);
      setResult(localResult);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 py-10">
    <div className="container mx-auto max-w-4xl p-6  bg-white shadow-lg rounded-lg relative">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
        Previsão de Alzheimer
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-lg font-medium text-gray-800">
            Idade: {formData.age}
          </label>
          <input
            type="range"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 w-full"
            min="40"
            max="90"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-800">Gênero</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione</option>
            <option value="0">Masculino</option>
            <option value="1">Feminino</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-800">Etnia</label>
          <select
            name="ethnicity"
            value={formData.ethnicity}
            onChange={handleChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione</option>
            <option value="Caucasiano">Caucasiano</option>
            <option value="Afrodescendente">Afrodescendente</option>
            <option value="Asiático">Asiático</option>
            <option value="Latino">Latino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-800">Nível de Educação</label>
          <select
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione</option>
            <option value="1">Sem escolaridade</option>
            <option value="2">Ensino básico</option>
            <option value="3">Ensino médio</option>
            <option value="4">Ensino superior</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-800">IMC (Índice de Massa Corporal)</label>
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-800">Fumante?</label>
          <select
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione</option>
            <option value="1">Sim</option>
            <option value="0">Não</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-800">Consumo de Álcool</label>
          <select
            name="alcoholConsumption"
            value={formData.alcoholConsumption}
            onChange={handleChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione</option>
            <option value="1">Sim</option>
            <option value="0">Não</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-800">Atividade Física</label>
          <select
            name="physicalActivity"
            value={formData.physicalActivity}
            onChange={handleChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione</option>
            <option value="1">Regular</option>
            <option value="0">Irregular</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-800">Qualidade da Dieta</label>
          <select
            name="dietQuality"
            value={formData.dietQuality}
            onChange={handleChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione</option>
            <option value="1">Muito baixa</option>
            <option value="2">Baixa</option>
            <option value="3">Moderada</option>
            <option value="4">Alta</option>
            <option value="5">Muito alta</option>
          </select>
        </div>

        <button
          type="submit"
          className="col-span-2 bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-3 px-6 rounded-md hover:from-blue-600 hover:to-green-600"
        >
          Prever
        </button>
      </form>

      {loading && <p className="mt-6 text-lg text-center">Carregando...</p>}

      {result && (
        <div className="mt-6 p-6 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-md shadow-md">
          <h2 className="text-xl font-bold text-center">Resultado: {result}</h2>
        </div>
      )}
    </div>   </div>
  );
}

const calculateLocalResult = (formData) => {
  const { age, bmi, smoking, physicalActivity, dietQuality } = formData;

  if (age > 60 && bmi >= 3 && smoking === "1" && physicalActivity === "0") {
    return "Alto risco de Alzheimer";
  } else if (dietQuality >= 4 && physicalActivity >= 2) {
    return "Baixo risco de Alzheimer";
  } else {
    return "Risco moderado de Alzheimer";
  }
};
