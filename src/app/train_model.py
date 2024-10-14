import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score

# Carregar o dataset
data = pd.read_csv('C:/Users/NeltonBeula/Desktop/Alzeheimer-detection/src/app/alzheimers_disease_data.csv')

# Separar features (X) e target (y)
X = data.drop('Diagnosis', axis=1)  # Supondo que 'Diagnosis' seja a coluna alvo
y = data['Diagnosis']

# Dividir os dados em conjunto de treino e teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Treinar o modelo RandomForestClassifier
rf_model = RandomForestClassifier()
rf_model.fit(X_train, y_train)

# Salvar o modelo treinado em um arquivo .pkl
with open('random_forest_model.pkl', 'wb') as model_file:
    pickle.dump(rf_model, model_file)

# Carregar o modelo salvo (apenas para demonstração de uso)
with open('random_forest_model.pkl', 'rb') as model_file:
    loaded_model = pickle.load(model_file)

# Fazer previsões no conjunto de teste
y_pred = loaded_model.predict(X_test)

# Exibir os resultados
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

print(f"Acurácia: {accuracy * 100:.2f}%")
print("Relatório de Classificação:")
print(report)
