import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';

import FeaturedSlider from './components/FeaturedSlider';
import ServiceDetail from './components/ServiceDetail';
import Preloader from './components/Preloader';
import ChatBot from './components/ChatBot';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [loading, setLoading] = React.useState(true);

  return (
    <Router>
      <ScrollToTop />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <ChatBot startTimer={!loading} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <>
              <FeaturedSlider />
              <div id="services"><Services /></div>
              <div id="gallery"><Gallery /></div>
              <div id="contact"><Contact /></div>
            </>
          } />
          <Route path="services/:id" element={<ServiceDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
