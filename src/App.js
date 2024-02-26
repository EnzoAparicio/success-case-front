import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MultipleSelect from './Componentes/selectListIndustry/selectListIndustry';
import MainLayout from './components/MainLayout';
import MainLayout2 from './components/MainLayout2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="layout2" element={<MainLayout2 />} />
       <MultipleSelect />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
