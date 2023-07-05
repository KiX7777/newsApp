import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface NewsState {
  articles: any[];
  searchQuery: string;
  page: number | null;
  totalPages: number | null;
  mobileMenuOpen: boolean;
  homepageOption: 'FEATURED' | 'LATEST';
  homepagePrompt: boolean;
  favorites: any[];
}

const initialState: NewsState = {
  articles: [],
  searchQuery: '',
  page: 1,
  totalPages: null,
  mobileMenuOpen: false,
  homepageOption: 'FEATURED',
  homepagePrompt: true,
  favorites: [],
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
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
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
    addFav: (state, action: PayloadAction<string>) => {
      state.favorites.push(action.payload);
    },
    removeFav: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.id === action.payload
      );
    },
  },
});

export const newsActions = newsSlice.actions;
