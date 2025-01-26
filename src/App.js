import React from 'react';
import './App.css'; // Import the CSS file
import Symptom from './components/symptomchecker/Symptom'; // Import the SymptomChecker component

function App() {
  return (
    <div className="App">
      <Symptom /> {/* Render only the SymptomChecker component */}
    </div>
  );
}

export default App;