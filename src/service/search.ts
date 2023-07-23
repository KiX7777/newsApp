import { Article } from '../models';
import { v4 as uuidv4 } from 'uuid';

export const getSearch = async (query: string, p: number) => {
  try {
    const res = await fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=6PwsEZoKesC2JSVylxfRq7GOtRHpuxB4&sort=newest&page=${
        p - 1
      }`
    );
    const data = await res.json();

    const articles = data.response.docs.map((art: Record<string, any>) => {
      const article: Article = {
        url: art.web_url,
        abstract: art.lead_paragraph,
        date: art.pub_date,
        author: art.byline.original,
        id: uuidv4(),
        images: art.multimedia[0].url,
        section: art.section_name,
        title: art.headline.main,
        uri: art.uri,
      };
      return article;
    });
    const totalPages = Math.ceil(data.response.meta.hits / 10);
    const hasMore = p < totalPages;

    return {
      articles: articles,
      totalPages: totalPages,
      hasMore,
    };
  } catch (error) {}
};
