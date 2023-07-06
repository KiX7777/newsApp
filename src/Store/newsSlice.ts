import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getNYFeatured, getByCategory, getSearch, getLatest } from './thunks';
import { Article } from '../models';

export interface NewsState {
  articles: Article[];
  searchQuery: string;
  page: number;
  totalPages: number | null;
  mobileMenuOpen: boolean;
  homepageOption: 'FEATURED' | 'LATEST';
  homepagePrompt: boolean;
  favorites: Article[];
  loading: boolean;
  error: string | null;
  hasMore: boolean | null;
  infiniteScrollPage: number;
  infiniteHasMore: boolean;
  infiniteLoading: boolean;
  latestNewsArticles: Article[];
}

let favorites;
let articles;
let homepagePrompt;
let page;
const localFav = localStorage.getItem('favorites');
const localPage = localStorage.getItem('page');
const localArt = localStorage.getItem('articles');
const homePrompt = localStorage.getItem('homepagePrompt');

localPage ? (page = JSON.parse(localPage)) : (page = 1);
localFav ? (favorites = JSON.parse(localFav)) : (favorites = []);
localArt ? (articles = JSON.parse(localArt)) : (articles = []);
homePrompt
  ? (homepagePrompt = JSON.parse(homePrompt))
  : (homepagePrompt = false);

const initialState: NewsState = {
  articles: articles,
  searchQuery: '',
  page: page,
  totalPages: null,
  mobileMenuOpen: false,
  homepageOption: 'FEATURED',
  homepagePrompt: true,
  favorites: favorites,
  loading: false,
  error: null,
  hasMore: null,
  infiniteScrollPage: 1,
  infiniteHasMore: true,
  latestNewsArticles: [],
  infiniteLoading: false,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    openMobileMenu: (state) => {
      state.mobileMenuOpen = true;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    dismissPrompt: (state) => {
      state.homepagePrompt = false;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    incrementPage: (state) => {
      state.page = state.page + 1;
    },
    decrementPage: (state) => {
      if (state.page === 1) {
        return;
      } else {
        state.page = state.page - 1;
      }
    },
    resetInfinite: (state) => {
      state.latestNewsArticles = [];
      state.infiniteLoading = false;
    },
    setInfiniteLoading: (state, action: PayloadAction<boolean>) => {
      state.infiniteLoading = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    incrementInfinitePage: (state) => {
      state.infiniteScrollPage = state.infiniteScrollPage + 1;
    },
    setArticles: (state, action: PayloadAction<any[]>) => {
      state.articles = action.payload;
    },
    setHomepageOption: (
      state,
      payload: PayloadAction<'FEATURED' | 'LATEST'>
    ) => {
      state.homepageOption = payload.payload;
    },
    addFav: (state, action: PayloadAction<Article>) => {
      state.favorites.push(action.payload);
    },
    removeFav: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.id === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNYFeatured.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getNYFeatured.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload;
    });
    builder.addCase(getNYFeatured.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getByCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload?.articles;
      state.totalPages = action.payload!.totalPages;
      state.hasMore = state.page !== action.payload?.totalPages;
    });
    builder.addCase(getByCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getSearch.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSearch.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload?.articles;
      state.totalPages = action.payload!.totalPages;
      state.hasMore = state.page !== action.payload?.totalPages;
    });
    builder.addCase(getSearch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getLatest.pending, (state) => {
      state.infiniteLoading = true;
      state.error = null;
    });
    builder.addCase(getLatest.fulfilled, (state, action) => {
      state.infiniteLoading = false;
      state.latestNewsArticles = [
        ...state.latestNewsArticles,
        ...action.payload!.articles,
      ];
      state.infiniteHasMore =
        state.infiniteScrollPage !== action.payload?.totalPages;
    });
    builder.addCase(getLatest.rejected, (state, action) => {
      state.infiniteLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const newsActions = newsSlice.actions;
