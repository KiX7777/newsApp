import { Article } from '../models';
import { v4 as uuidv4 } from 'uuid';

export const infiniteQuery = async (page: number) => {
  try {
    // const res = await fetch(
    //   `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:World&page=${page}&sort=newest&api-key=6PwsEZoKesC2JSVylxfRq7GOtRHpuxB4`
    // );
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=6`,
      {
        method: 'GET',
        headers: {
          'x-api-key': 'a32a159ec4bf4ba9ad86a81b74194867',
        },
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch data.');
    }

    const data = await res.json();
    const articles: Article[] = data.articles.map(
      (art: Record<string, any>) => {
        const article: Article = {
          url: art.url,
          abstract: art.description,
          date: art.publishedAt,
          author: art.author,
          id: uuidv4(),
          images: [art.urlToImage],
          section: 'Latest',
          title: art.title,
          uri: art.uri,
        };
        return article;
      }
    );

    const totalPages = Math.ceil(data.totalResults / 6);
    const hasMore = page < totalPages;

    return {
      articles: articles,
      totalPages: totalPages,
      hasMore,
      next: hasMore ? page + 1 : null,
    };
  } catch (err) {
    const error = err as Error;
    console.error(error);
  }
};
