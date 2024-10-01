// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResultAnalysis } from './screens/ResultAnalysis';
import { MainApp } from './screens/MainApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/result-analysis/:inputValue" element={<ResultAnalysis />} />
      </Routes>
    </Router>
  );
}

export default App;
