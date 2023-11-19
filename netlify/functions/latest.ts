import { v4 as uuidv4 } from 'uuid';
const APIKEY = 'a32a159ec4bf4ba9ad86a81b74194867';

const axios = require('axios');

exports.handler = async (event) => {
  const { queryStringParameters } = event;
  const { page } = queryStringParameters;

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=6`,
      {
        headers: {
          'x-api-key': APIKEY,
        },
      },
    );

    const data = await response.json();

    const articles = data.results.map((art: Record<string, any>) => {
      const article: any = {
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

    const returnObj = articles
      .sort((a: any, b: any) => {
        return a.date.localeCompare(b.date);
      })
      .reverse();

    return {
      statusCode: 200,
      body: JSON.stringify({ returnObj }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data.' }),
    };
  }
};
