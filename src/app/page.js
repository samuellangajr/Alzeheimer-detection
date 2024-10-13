"use client"
import { useState } from 'react';

export default function PredictPage() {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    ethnicity: '',
    educationLevel: '',
    bmi: '',
    smoking: '',
    alcoholConsumption: '',
    physicalActivity: '',
    dietQuality: '',
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

    const response = await fetch('/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setLoading(false);
    setResult(data.prediction === 1 ? 'Alzheimer Positivo' : 'Alzheimer Negativo');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Previsão de Alzheimer</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label className="block">Idade</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Gênero</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Selecione</option>
            <option value="0">Masculino</option>
            <option value="1">Feminino</option>
          </select>
        </div>
        <div>
          <label className="block">Etnia</label>
          <input
            type="text"
            name="ethnicity"
            value={formData.ethnicity}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Nível de Educação</label>
          <input
            type="number"
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Índice de Massa Corporal (BMI)</label>
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Fuma?</label>
          <select
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="0">Não</option>
            <option value="1">Sim</option>
          </select>
        </div>
        <div>
          <label className="block">Consumo de Álcool</label>
          <input
            type="number"
            name="alcoholConsumption"
            value={formData.alcoholConsumption}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Atividade Física</label>
          <input
            type="number"
            name="physicalActivity"
            value={formData.physicalActivity}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Qualidade da Dieta</label>
          <input
            type="number"
            name="dietQuality"
            value={formData.dietQuality}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md"
          disabled={loading}
        >
          {loading ? 'Calculando...' : 'Prever'}
        </button>
      </form>

      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Resultado: {result}</h2>
        </div>
      )}
    </div>
  );
}
