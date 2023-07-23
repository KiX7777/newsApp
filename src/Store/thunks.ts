import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article, GenericObj } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { NewsState } from './newsSlice';

const APIKEY = 'a32a159ec4bf4ba9ad86a81b74194867';
// https://api.nytimes.com/svc/search/v2/articlesearch.json?q=messi&api-key=6PwsEZoKesC2JSVylxfRq7GOtRHpuxB4
export const getNYFeatured = createAsyncThunk(
  'news/NYTIMES_Featured',
  async (_, thunkAPI) => {
    try {
      const res = await fetch(
        'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=6PwsEZoKesC2JSVylxfRq7GOtRHpuxB4'
      );
      if (!res.ok) {
        throw new Error('Failed to fetch data.');
      }
      const data = await res.json();

      const articles = data.results.map((art: GenericObj) => {
        const article: Article = {
          url: art.url,
          abstract: art.abstract,
          date: art.published_date,
          author: art.byline,
          id: uuidv4(),
          images: art.multimedia
            ? art.multimedia.map((img: GenericObj) => img.url)
            : ['./src/assets/noimg.svg.webp'],
          section: art.section,
          title: art.title,
        };
        return article;
      });
      return articles
        .sort((a: Article, b: Article) => {
          return a.date.localeCompare(b.date);
        })
        .reverse();
    } catch (err) {
      const error = err as Error;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getByCategory = createAsyncThunk(
  'news/category',
  async (category: string, thunkAPI) => {
    const { news } = thunkAPI.getState() as { news: NewsState };
    const page = news.page;
    try {
      const res = await fetch(
        // await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:("Sports")&sort=newest&api-key=6PwsEZoKesC2JSVylxfRq7GOtRHpuxB4`).then(res=> res.json())

        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}`,
        {
          method: 'GET',
          headers: {
            'x-api-key': APIKEY,
          },
        }
      );
      if (!res.ok) {
        throw new Error('Failed to fetch data.');
      }
      const data = await res.json();

      const articles = data.articles.map((art: GenericObj) => {
        const article: Article = {
          url: art.url,
          abstract: art.description,
          date: art.publishedAt,
          author: art.author,
          id: uuidv4(),
          images: [art.urlToImage],
          section: category,
          title: art.title,
        };
        return article;
      });

      const totalPages = Math.ceil(data.totalResults / 20);
      return {
        articles: articles,
        totalPages: totalPages,
      };
    } catch (err) {
      const error = err as Error;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getSearch = createAsyncThunk(
  'news/search',
  async (query: string, thunkAPI) => {
    const { news } = thunkAPI.getState() as { news: NewsState };
    const page = news.page;

    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=20&page=${page}&sortBy=publishedAt`,
        {
          method: 'GET',
          headers: {
            'x-api-key': APIKEY,
          },
        }
      );
      if (!res.ok) {
        throw new Error('Failed to fetch data.');
      }
      const data = await res.json();

      const articles = data.articles.map((art: GenericObj) => {
        const article: Article = {
          url: art.url,
          abstract: art.description,
          date: art.publishedAt,
          author: art.author,
          id: uuidv4(),
          images: [art.urlToImage],
          section: query,
          title: art.title,
        };
        return article;
      });

      const totalPages = Math.ceil(data.totalResults / 20);
      return {
        articles: articles,
        totalPages: totalPages,
      };
    } catch (err) {
      const error = err as Error;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getLatest = createAsyncThunk(
  'news/latest',
  async (_, thunkAPI) => {
    const { news } = thunkAPI.getState() as { news: NewsState };
    const page = news.infiniteScrollPage;

    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=6`,
        {
          method: 'GET',
          headers: {
            'x-api-key': APIKEY,
          },
        }
      );

      if (!res.ok) {
        throw new Error('Failed to fetch data.');
      }

      const data = await res.json();

      const articles: Article[] = data.articles.map((art: GenericObj) => {
        const article: Article = {
          url: art.url,
          abstract: art.description,
          date: art.publishedAt,
          author: art.author,
          id: uuidv4(),
          images: [art.urlToImage],
          section: 'Latest',
          title: art.title,
        };
        return article;
      });

      const totalPages = Math.ceil(data.totalResults / 6);
      return {
        articles: articles,
        totalPages: totalPages,
      };
    } catch (err) {
      const error = err as Error;
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
