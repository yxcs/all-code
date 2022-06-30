import { Routes, Route } from 'react-router-dom';
import WrapWeb from './pages/web/WrapWeb'
import Home from './pages/web/home/Home'
import About from './pages/web/About'

function App() {
  return (
    <Routes>
      <Route path="/" element={<WrapWeb />}>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
