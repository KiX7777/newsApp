import React from 'react';
import './App.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './UI/Layout';
import ArticlesSection from './Components/ArticlesSection';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route path='home' element={<Home />} />
          <Route path='general' element={<ArticlesSection />} />
          <Route path='business' element={<ArticlesSection />} />
          <Route path='health' element={<ArticlesSection />} />
          <Route path='science' element={<ArticlesSection />} />
          <Route path='sports' element={<ArticlesSection />} />
          <Route path='technology' element={<ArticlesSection />} />
          <Route path='favorites' element={<ArticlesSection />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
