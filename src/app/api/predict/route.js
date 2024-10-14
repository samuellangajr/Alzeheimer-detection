import { spawn } from 'child_process';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      age,
      gender,
      ethnicity,
      educationLevel,
      bmi,
      smoking,
      alcoholConsumption,
      physicalActivity,
      dietQuality,
    } = req.body;

    const inputData = [
      age, gender, ethnicity, educationLevel, bmi, smoking,
      alcoholConsumption, physicalActivity, dietQuality,
    ];

    const pythonProcess = spawn('python3', ['predict_model.py', JSON.stringify(inputData)]);
    pythonProcess.stdout.on('data', (data) => {
      const prediction = data.toString().trim();
      res.status(200).json({ prediction });
    });

    pythonProcess.stderr.on('data', (data) => {
      res.status(500).json({ error: data.toString() });
    });

  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
