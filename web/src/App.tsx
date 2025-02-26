import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Auth } from './pages/Auth';
import MyBooks from './pages/MyBooks';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/homePage" element={<MyBooks />} />
    </Routes>
  );
}

export default App;
