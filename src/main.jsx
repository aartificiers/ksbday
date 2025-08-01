import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.jsx';
import {BrowserRouter as Router} from 'react-router';

createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)
