import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Mainbody from './pages/Mainbody'
import Movieinfo from './pages/Movieinfo';
import Invalidpage from './pages/Page404';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
function App() {
  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Mainbody />} />
        <Route path='/movieinfo' element={<Movieinfo />} />
        <Route path='/404Page' element={<Invalidpage />} />

      </Routes>
      <Footer/>
    </Router>
  </>
  );
}

export default App;
