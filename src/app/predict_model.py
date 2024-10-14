import sys
import json
import numpy as np
import pickle

with open('random_forest_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

input_data = json.loads(sys.argv[1])

input_data = np.array(input_data).reshape(1, -1)

prediction = model.predict(input_data)

print(int(prediction[0]))
