import { Article } from '../models';
import { v4 as uuidv4 } from 'uuid';

export const getNYArticle = async (id: string) => {
  const res = await fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=uri:"nyt://article/${id}"&api-key=6PwsEZoKesC2JSVylxfRq7GOtRHpuxB4`
  );

  const data = await res.json();

  const article: Article = {
    url: data.response.docs[0].web_url,
    title: data.response.docs[0].headline.main,
    date: data.response.docs[0].pub_date,
    abstract: data.response.docs[0].lead_paragraph,
    author: data.response.docs[0].byline.original,
    id: uuidv4(),
    images: data.response.docs[0].multimedia[0].url,
    section: data.response.docs[0].section_name,
    uri: data.response.docs[0].uri,
  };

  return article;
};
