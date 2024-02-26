import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SelectListClients from './components/selectListClients/selectListClients';
import MainLayout from './components/MainLayout';
import MainLayout2 from './components/MainLayout2';

function App() {
  const options = ['1','2'];
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="layout2" element={<MainLayout2 />} />

      </Routes>
    </BrowserRouter>
    <SelectListClients options={options}/>
  );
}

export default App;
