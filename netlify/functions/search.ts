import { v4 as uuidv4 } from 'uuid';

const axios = require('axios');
const APIKEY = 'a32a159ec4bf4ba9ad86a81b74194867';

exports.handler = async (event) => {
  const { queryStringParameters } = event;
  const { query, page } = queryStringParameters;

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=20&page=${page}&sortBy=publishedAt`,
      {
        headers: {
          'x-api-key': APIKEY,
        },
      },
    );

    const data = await response.json();

    const articles = data.articles.map((art: any) => {
      const article: any = {
        url: art.url,
        abstract: art.description,
        date: art.publishedAt,
        author: art.author,
        id: uuidv4(),
        images: [art.urlToImage],
        section: query,
        title: art.title,
      };
      return article;
    });

    const totalPages = Math.ceil(data.totalResults / 20);

    const returnObj = {
      articles: articles,
      totalPages: totalPages,
    };

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
