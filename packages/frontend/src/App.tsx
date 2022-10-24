import { Route, Routes } from 'react-router-dom';
import './App.css';
import StartPage from './pages/StartPage';
import DetailPage from './pages/DetailPage';
import LogInPage from './pages/LogInPage';
import UserPage from './pages/UserPage';
import RegisterPage from './pages/RegisterPage';

function App() {

  return (
    <div className="App">
      <header>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/user/login" element={<LogInPage />} />
          <Route path="/user/userinfo" element={<UserPage />} />
        </Routes>
      </header>

    </div>
  );
}

export default App;
