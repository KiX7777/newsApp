import { Article } from '../models';
import { v4 as uuidv4 } from 'uuid';

export const getData = async () => {
  const res = await fetch(
    'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=6PwsEZoKesC2JSVylxfRq7GOtRHpuxB4'
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data.');
  }
  const data = await res.json();

  const articles = data.results.map((art: Record<string, any>) => {
    const article: Article = {
      url: art.url,
      abstract: art.abstract,
      date: art.published_date,
      author: art.byline,
      id: uuidv4(),
      images: art.multimedia
        ? art.multimedia.map((img: Record<string, any>) => img.url)
        : ['./src/assets/noimg.svg.webp'],
      section: art.section,
      title: art.title,
      uri: art.uri,
    };
    return article;
  });

  return articles
    .sort((a: Article, b: Article) => {
      return a.date.localeCompare(b.date);
    })
    .reverse();
};
