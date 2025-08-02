import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Input from './components/Input';
import EditPage from './pages/EditPage';
import IndiPage from './pages/IndiPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/InputPage" element={<Input />} />
     <Route path="/EditPage/:id" element={<EditPage />} />
    <Route path="/blog/:id" element={<IndiPage />} />
    </Routes>
  );
}

export default App;
