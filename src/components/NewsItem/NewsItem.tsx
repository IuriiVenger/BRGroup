import { Card } from '@mui/material';
import { FC } from 'react';

import { Link } from 'react-router-dom';

import classes from './NewsItem.module.scss';

import dateTransform from '@/services/dateTransform';
import NewsData from '@/types/NewsData';

interface INewsItemProps {
  news: NewsData;
}

const NewsItem: FC<INewsItemProps> = ({ news }) => {
  const normalizeData = dateTransform(news.time);

  return (
    <Link to={`/news/${news.id}`}>
      <Card className={classes.newsItem} key={news.id}>
        <small>{normalizeData}</small>
        <h3>{news.title}</h3>
        <span>
          <p>score: {news.score}</p>
          <p>author: {news.by}</p>
        </span>
      </Card>
    </Link>
  );
};

export default NewsItem;
