import { Route, Routes } from 'react-router-dom';
import './App.css';
import StartPage from './pages/StartPage';
import DetailPage from './pages/DetailPage';
import LogInPage from './pages/LogInPage';

function App() {

  return (
    <div className="App">
      <header>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/user/login" element={<LogInPage />} />
          <Route path="/user/userinfo" element={<LogInPage />} />
        </Routes>
      </header>

    </div>
  );
}

export default App;
