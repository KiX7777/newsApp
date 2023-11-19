// netlify-functions/api.js
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const axios = require('axios');
const APIKEY = 'a32a159ec4bf4ba9ad86a81b74194867';
// eslint-disable-next-line no-undef
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

    console.log(response);

    const data = await response.json();
    const articles = data.articles.map((art) => {
      const article = {
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
    });

    const totalPages = Math.ceil(data.totalResults / 6);
    const hasMore = page < totalPages;

    const returnData = {
      articles: articles,
      totalPages: totalPages,
      hasMore,
      next: hasMore ? page + 1 : null,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(returnData),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error }),
    };
  }
};
