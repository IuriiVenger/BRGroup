import axios from 'axios';

export const getData = async (url: string) => {
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (e) {
    return console.log(e);
  }
};

export const getDataById = (id: string | number) => {
  return getData(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
};

export const getLatestNews = async () => {
  try {
    const newsList = await getData('https://hacker-news.firebaseio.com/v0/newstories.json');
    const topNews = newsList.filter((item: number, index: number) => index < 100);
    return await Promise.all(
      topNews.map((news: number) => getData(`https://hacker-news.firebaseio.com/v0/item/${news}.json?print=pretty`))
    );
  } catch (e) {
    console.log(e);
  }
};
