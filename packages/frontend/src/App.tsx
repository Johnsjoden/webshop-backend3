import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/DetailPage';
import StartPage from './pages/StartPage';


function App() {

  return (
    <div className="App">
      <header>
        <Routes>
          {/* <Route path="/" element={<DetailPage />} /> */}
          <Route path="/" element={<StartPage />} />
        </Routes>
      </header>

    </div>
  );
}

export default App;
