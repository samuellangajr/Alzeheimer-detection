import { spawn } from 'child_process';


export async function POST(req, res) {
    try {
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

      let outputData = '';
      let errorData = '';

      pythonProcess.stdout.on('data', (data) => {
        outputData += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorData += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          res.status(200).json({ prediction: outputData.trim() });
        } else {
          res.status(500).json({ error: errorData || 'Erro na execução do script Python' });
        }
      });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      res.status(500).json({ error: 'Erro no servidor' });
    }

}
