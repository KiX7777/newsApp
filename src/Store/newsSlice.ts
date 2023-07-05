import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface NewsState {
  articles: any[];
  searchQuery: string;
  page: number | null;
  totalPages: number | null;
  mobileMenuOpen: boolean;
  homepageOption: 'FEATURED' | 'LATEST';
  homepagePrompt: boolean;
}

const initialState: NewsState = {
  articles: [],
  searchQuery: '',
  page: 1,
  totalPages: null,
  mobileMenuOpen: false,
  homepageOption: 'FEATURED',
  homepagePrompt: true,
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
    setSearch: (state, payload: PayloadAction<string>) => {
      state.searchQuery = payload.payload;
    },
    setPage: (state, payload: PayloadAction<number>) => {
      state.page = payload.payload;
    },
    setTotalPages: (state, payload: PayloadAction<number>) => {
      state.page = payload.payload;
    },
    setArticles: (state, payload: PayloadAction<any[]>) => {
      state.articles = payload.payload;
    },
    setHomepageOption: (
      state,
      payload: PayloadAction<'FEATURED' | 'LATEST'>
    ) => {
      state.homepageOption = payload.payload;
    },
  },
});

export const newsActions = newsSlice.actions;
