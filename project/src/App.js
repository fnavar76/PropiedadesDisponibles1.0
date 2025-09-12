import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import AdminLogin from './pages/AdminLogin';

const App = () => {
  // Dark mode state
  const [darkMode, setDarkMode] = React.useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  // Language state
  const [lang, setLang] = React.useState(() => {
    return localStorage.getItem('lang') || 'en';
  });
  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  React.useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);
  // ...existing code...
  const [adminUser, setAdminUser] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem('adminUser'));
    } catch {
      return null;
    }
  });

  const handleLogin = (user) => {
    setAdminUser(user);
    localStorage.setItem('adminUser', JSON.stringify(user));
  };
  const handleLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('adminUser');
  };

  return (
    <Router>
      <div className={darkMode ? 'min-h-screen bg-gray-900 text-gray-100' : 'min-h-screen bg-gray-50 text-gray-900'}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} lang={lang} setLang={setLang} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage lang={lang} />} />
            <Route path="/propiedades" element={<PropertiesPage lang={lang} />} />
            <Route path="/propiedad/:id" element={<PropertyDetailPage lang={lang} />} />
            <Route path="/contacto" element={<ContactPage lang={lang} />} />
            <Route path="/admin" element={
              adminUser
                ? <AdminPage adminUser={adminUser} onLogout={handleLogout} lang={lang} />
                : <AdminLogin onLogin={handleLogin} lang={lang} />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;