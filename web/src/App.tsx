import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Auth } from './pages/Auth';
import MyBooks from './pages/MyBooks';
import { ViewBook } from './components/books/ViewBook';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/homePage" element={<MyBooks />} />
      <Route path="/viewBook/:bookId" element={<ViewBook />} />
    </Routes>
  );
}

export default App;
