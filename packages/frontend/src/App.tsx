import { Route, Routes } from 'react-router-dom';
import './App.css';
import StartPage from './pages/StartPage';
import DetailPage from './pages/DetailPage';

function App() {

  return (
    <div className="App">
      <header>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/detail" element={<DetailPage />} />
        </Routes>
      </header>

    </div>
  );
}

export default App;
