import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styling

function App() {
  const [features, setFeatures] = useState({
    'BMI': '',
    'Age': '',        
    'Gender': '',
    'Chol': '',        
    'TG': '',            
    'HDL': '',           
    'LDL': '',           
    'Cr': '',           
    'BUN': ''
    // Add more features as needed
  });
  const [diagnosis, setDiagnosis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFeatures({ ...features, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/predict', features);
      setDiagnosis(response.data.diagnosis);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Welcome to IIEST Diabetes Diagnostic Centre</h1>
      <h2 className="subheading">Please enter the details below:</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Age">Age:</label>
          <input
            type="text"
            className="form-control"
            id="Age"
            name="Age"
            value={features.Glucose}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="BMI">BMI:</label>
          <input
            type="text"
            className="form-control"
            id="BMI"
            name="BMI"
            value={features.BMI}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Gender">Gender:</label>
          <input
            type="text"
            className="form-control"
            id="Gender"
            name="Gender"
            value={features.Glucose}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Chol">Cholestrol:</label>
          <input
            type="text"
            className="form-control"
            id="Chol"
            name="Chol"
            value={features.Glucose}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="TG">TG:</label>
          <input
            type="text"
            className="form-control"
            id="TG"
            name="TG"
            value={features.Glucose}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="LDL">LDL:</label>
          <input
            type="text"
            className="form-control"
            id="LDL"
            name="LDL"
            value={features.Glucose}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="HDL">HDL:</label>
          <input
            type="text"
            className="form-control"
            id="HDL"
            name="HDL"
            value={features.Glucose}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Cr">Cr:</label>
          <input
            type="text"
            className="form-control"
            id="Cr"
            name="Cr"
            value={features.Glucose}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="BUN">BUN:</label>
          <input
            type="text"
            className="form-control"
            id="BUN"
            name="BUN"
            value={features.Glucose}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Add more input fields for additional features */}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Diagnosis'}
        </button>
      </form>
      {diagnosis && <h2 className={`diagnosis ${diagnosis === "Yes, I am sorry but you have diabetes" ? "green" : "red"}`}>Diagnosis: {diagnosis}</h2>}
    </div>
  );
}

export default App;