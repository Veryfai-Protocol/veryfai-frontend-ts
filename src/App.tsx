// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResultAnalysis } from './screens/ResultAnalysis';
import { MainApp } from './screens/MainApp';
import { Login } from './screens/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/result-analysis/:task_id" element={<ResultAnalysis />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
