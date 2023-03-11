import { LoadingButton } from '@mui/lab';
import { CircularProgress } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import classes from './NewsListPage.module.scss';

import { getLatestNews } from '@/api/getData';
import mainImage from '@/assets/main-image.svg';
import NewsItem from '@/components/NewsItem/NewsItem';
import NewsData from '@/types/NewsData';

const NewsListPage: React.FunctionComponent = () => {
  const [newsList, setNewsList] = useState([] as NewsData[]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  let autoUpdateNews: NodeJS.Timer;

  const getNews = () => {
    if (!isLoading) {
      clearInterval(autoUpdateNews);
      setIsLoading(true);
      getLatestNews()
        .then(news => news && setNewsList(news))
        .catch(e => console.log(e))
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    if (location.hash) {
      const elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [location]);

  useEffect(() => {
    newsList.length === 0 && getNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    autoUpdateNews = setInterval(getNews, 60000);
    return () => {
      clearInterval(autoUpdateNews);
    };
  }, [newsList]);

  return (
    <section className={classes.newsListPage}>
      <div className={classes.mainInfo}>
        <section className={classes.mainInfo_description}>
          <h3>
            Hey, welcome
            <span role='img' aria-label='wave'>
              👋
            </span>
          </h3>
          <h1>
            The lastest <br />
            articles from the <strong>HackerNews</strong> api
          </h1>
          <h3>
            Get actual news <strong>every minute</strong>
          </h3>
          <LoadingButton
            onClick={getNews}
            loading={isLoading}
            variant='contained'
            color='warning'
            sx={{ width: '16rem', height: '3rem', borderRadius: 15 }}
          >
            Update now
          </LoadingButton>
        </section>
        <img src={mainImage} alt='women-with-laptop' />
      </div>
      <h2 id='news-list'>
        News list <CircularProgress color='warning' sx={{ visibility: isLoading ? 'visible' : 'hidden' }} />
      </h2>
      <section className={classes.newsList}>
        {isLoading && <div className={classes.layout} />}
        {newsList.map(news => news && <NewsItem news={news} key={news?.id} />)}
      </section>
    </section>
  );
};

export default NewsListPage;
