import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [features, setFeatures] = useState({
    BMI: "",
    Age: "",
    Chol: "",
    TG: "",
    HDL: "",
    LDL: "",
    Cr: "",
    BUN: "",
    Gender: "M", // default to Male
  });

  const [diagnosis, setDiagnosis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFeatures({ ...features, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        features
      );
      setDiagnosis(response.data.diagnosis);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Welcome to IIEST Diagnostic Centre</h1>
      <h2 className="subheading">Please enter the details below:</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Gender">Gender:</label>
          <select
            id="Gender"
            name="Gender"
            value={features.Gender}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Age">Age:</label>
          <input
            type="text"
            className="form-control"
            id="Age"
            name="Age"
            value={features.Age}
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
          <label htmlFor="Chol">Cholesterol:</label>
          <input
            type="text"
            className="form-control"
            id="Chol"
            name="Chol"
            value={features.Chol}
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
            value={features.TG}
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
            value={features.HDL}
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
            value={features.LDL}
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
            value={features.Cr}
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
            value={features.BUN}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Predicting..." : "Predict Diagnosis"}
        </button>
      </form>

      {diagnosis && (
        <h2
          className={`diagnosis ${
            diagnosis === "Yes, I am sorry but you have diabetes"
              ? "green"
              : "red"
          }`}
        >
          Diagnosis: {diagnosis}
        </h2>
      )}
    </div>
  );
}

export default App;
