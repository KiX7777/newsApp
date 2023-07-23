import { Article } from '../models';
import { v4 as uuidv4 } from 'uuid';

export const getData = async (p: number, pageName: string) => {
  const category = pageName.charAt(0).toUpperCase() + pageName.slice(1);
  try {
    const res = await fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:("${category}")&page=${p}&sort=newest&api-key=6PwsEZoKesC2JSVylxfRq7GOtRHpuxB4`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch data.');
    }
    const data = await res.json();
    console.log(data);

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
    console.log(articles);
    const totalPages = Math.ceil(data.response.meta.hits / 10);
    const hasMore = p < totalPages;

    console.log(totalPages, hasMore);

    // return articles;

    return {
      articles: articles,
      totalPages: totalPages,
      hasMore,
    };
  } catch (err) {
    const error = err as Error;
    console.log(error);
  }
};
