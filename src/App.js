import React from 'react';
import './App.css'; // Import the CSS file
import Symptom from './components/symptomchecker/Symptom'; // Import the SymptomChecker component

function App() {
  return (
    <div className="App">
      <h1>Symptom Checker</h1>
      <p>Enter your symptoms below to find possible conditions and guidance.</p>
      <div className="symptom-container">
        <Symptom /> {/* Render only the SymptomChecker component */}
      </div>
    </div>
  );
}

export default App;