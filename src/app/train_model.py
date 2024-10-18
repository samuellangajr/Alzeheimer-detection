import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score


data = pd.read_csv('C:/Users/NeltonBeula/Desktop/Alzeheimer-detection/src/app/alzheimers_disease_data.csv')

X = data.drop('Diagnosis', axis=1) 
y = data['Diagnosis']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

rf_model = RandomForestClassifier()
rf_model.fit(X_train, y_train)

with open('random_forest_model.pkl', 'wb') as model_file:
    pickle.dump(rf_model, model_file)

with open('random_forest_model.pkl', 'rb') as model_file:
    loaded_model = pickle.load(model_file)

y_pred = loaded_model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

print(f"Acurácia: {accuracy * 100:.2f}%")
print("Relatório de Classificação:")
print(report)
