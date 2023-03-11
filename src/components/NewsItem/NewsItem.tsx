import dateTransform from '@/services/dateTransform';
import NewsData from '@/types/NewsData';
import { Card } from '@mui/material';
import { FC } from 'react';
import classes from './NewsItem.module.scss';
import moment from 'moment';
import { Link } from 'react-router-dom';

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
