import React from 'react';
import './App.css';
import store from './Store/store';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './UI/Layout';
import ArticlesSection from './Components/ArticlesSection';
import Search from './pages/Search';
import ArticlePage from './pages/ArticlePage';
import Favorites from './pages/Favorites';

function App() {
  useEffect(() => {
    const handleChange = (): void => {
      localStorage.setItem(
        'favorites',
        JSON.stringify(store.getState().news.favorites)
      );
      localStorage.setItem(
        'articles',
        JSON.stringify(store.getState().news.articles)
      );
      localStorage.setItem(
        'homepagePrompt',
        JSON.stringify(store.getState().news.homepagePrompt)
      );
      localStorage.setItem('page', JSON.stringify(store.getState().news.page));
    };

    const unsubscribe = store.subscribe(handleChange);

    return () => {
      unsubscribe();
    };
  }, []);

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
          <Route path='search/:query' element={<Search />} />
          <Route path='article/:id' element={<ArticlePage />} />
          <Route path='favorites' element={<Favorites />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
