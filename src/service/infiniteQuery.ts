import axios from 'axios';

export const infiniteQuery = async (page: number) => {
  try {
    // const res = await fetch(
    //   `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:World&page=${page}&sort=newest&api-key=6PwsEZoKesC2JSVylxfRq7GOtRHpuxB4`
    // );

    const res = await axios.get(`/infinite?page=${page}`);
    if (res.data) return res.data;
  } catch (err) {
    const error = err as Error;
    console.error(error);
  }
};
