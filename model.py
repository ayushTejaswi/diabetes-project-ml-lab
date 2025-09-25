import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier
from sklearn.neighbors import KNeighborsClassifier
from flask import Flask, request, jsonify   
from flask_cors import CORS


df = pd.read_csv('db.csv',index_col = 0)

one_hot_encoded = pd.get_dummies(df['Gender'],drop_first=True,prefix='Gender')
df = pd.concat([df,one_hot_encoded],axis = 1)
df.drop('Gender',inplace=True,axis = 1)

X =df.drop('Diagnosis',axis = 1)
y= df['Diagnosis']

X_train,X_test,y_train,y_test = train_test_split(X,y,test_size = 0.3,random_state = 42)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)


k = 57
knn_classifier = KNeighborsClassifier(n_neighbors=k)
knn_classifier.fit(X_train,y_train)

mlp_classifier = MLPClassifier(hidden_layer_sizes=(100,), max_iter=1000, random_state=42,activation='tanh',alpha=0.01,solver='adam',learning_rate='adaptive')
mlp_classifier.fit(X_train, y_train)

feature_names = ["Age", "BMI", "Chol", "TG", "HDL", "LDL", "Cr", "BUN", "Gender_M"]

app= Flask(__name__)
CORS(app)
# Define prediction route
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if data['Gender']=='M':
        Gender_M=1
    elif data['Gender']=='F':
        Gender_M=0
    
    features = pd.DataFrame([[
        float(data["Age"]),
        float(data["BMI"]),
        float(data["Chol"]),
        float(data["TG"]),
        float(data["HDL"]),
        float(data["LDL"]),
        float(data["Cr"]),
        float(data["BUN"]),
        Gender_M
    ]], columns=feature_names)


    features_scaled = scaler.transform(features) 

   
    knn_prediction = knn_classifier.predict(features_scaled)[0]
    mlp_prediction = mlp_classifier.predict(features_scaled)[0]
    # Combine predictions using a simple voting mechanism
    ensemble_prediction = int(round((knn_prediction + mlp_prediction) / 2))

   
    diagnosis = 'Yes, I am sorry but you have diabetes' if ensemble_prediction == 1 else 'No, you can relax, you do not have diabetes'

    return jsonify({'diagnosis': diagnosis})

if __name__ == '__main__':
    app.run(debug=True)