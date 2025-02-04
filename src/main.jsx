import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import './queries.css'
import PrivacyPolicy from './PrivacyPolicy.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privaatsuspoliitika" element={<PrivacyPolicy/>}/>
      </Routes>
    </BrowserRouter>
  </>
)
