// export default App;
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import MainLayout from './components/Layout/MainLayout';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import FAQ from './components/Pages/FAQ';
import Dolar from './components/Pages/Dolar';
import Inflacion from './components/Pages/Inflacion';



function App() {
  return (
    <ChakraProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/conversor' element={<Dolar />} />
            <Route path='/inflacion' element={<Inflacion />} />
          </Routes>
        </MainLayout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
