import { Routes, Route, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import Homepage from '../../Pages/Homepage/Homepage';
import Messagepage from '../../Pages/Messagepage/Messagepage';
import Birthday from '../../Pages/Birthday/Birthday';


const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Homepage/>} />
        <Route path="/mymsg" element={<Messagepage />} />
        <Route path="/bday" element={<Birthday />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
