import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score
from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS 

# Load the dataset
df = pd.read_csv('db.csv')

# Perform one-hot encoding
one_hot_encoded = pd.get_dummies(df['Gender'], prefix='Gender')
df = pd.concat([df, one_hot_encoded], axis=1)

# Prepare data for modeling
y = df['Diagnosis']
x = df.drop(['Diagnosis', 'Gender_f', 'Gender','Unnamed: 0'], axis=1)
xt, xs, yt, ys = train_test_split(x, y, test_size=0.20, random_state=0)

# Create and train the KNN classifier
k = 5
knn_classifier = KNeighborsClassifier(n_neighbors=k)
knn_classifier.fit(x.values, y.values)
#ensembling

# Create and train the MLP classifier
mlp_classifier = MLPClassifier(hidden_layer_sizes=(100, 50), max_iter=500, random_state=42)
mlp_classifier.fit(x.values, y.values)

# Create Flask app
app = Flask(__name__)
CORS(app)
# Define prediction route
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if data['Gender']=='M':
        Gender_M=1
        Gender_F=0
        
    if data['Gender']=='F':
        Gender_M=0
        Gender_F=1
        
    # Prepare input features for prediction
    features = [float(data['Age']), float(data['BMI']),float(data['Chol']),float(data['TG']),float(data['HDL']),float(data['LDL']),float(data['Cr']),float(data['BUN']),Gender_F,Gender_M]  # Add more features as needed

    # Make predictions using the models
    knn_prediction = knn_classifier.predict([features])[0]
    mlp_prediction = mlp_classifier.predict([features])[0]

    # Combine predictions using a simple voting mechanism
    ensemble_prediction = int(round((knn_prediction + mlp_prediction) / 2))

    # Map prediction to diagnosis
    diagnosis = 'Yes, I am sorry but you have diabetes' if ensemble_prediction == 1 else 'No, you can relax, you do not have diabetes'

    return jsonify({'diagnosis': diagnosis})

if __name__ == '__main__':
    app.run(debug=True)