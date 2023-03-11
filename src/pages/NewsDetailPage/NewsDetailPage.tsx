import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import classes from './NewsDetailPage.module.scss';

import { getDataById } from '@/api/getData';
import CommentItem from '@/components/CommentItem/CommentItem';
import Preloader from '@/components/Preloader/Preloader';
import dateTransform from '@/services/dateTransform';
import CommentData from '@/types/CommentData';

import NewsData from '@/types/NewsData';

const NewsDetailPage = () => {
  const { id = '' } = useParams();
  const [currentNews, setCurrentNews] = useState({} as NewsData);
  const [comments, setComments] = useState([] as CommentData[]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const getCurrentNews = () => {
    setIsLoading(true);
    getDataById(id)
      .then(news => {
        setCurrentNews(news);
        if (news?.kids?.length > 0) {
          Promise.all(news.kids.map((id: number) => getDataById(id)))
            .then(data => setComments(data))
            .catch(e => console.log(e));
        }
      })
      .finally(() => {
        setLastUpdate(new Date());
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCurrentNews();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const correctDate = dateTransform(currentNews.time);

  return (
    <section className={classes.newsDetailPage}>
      {isLoading && !currentNews.id && <Preloader />}
      <h1>{currentNews.title}</h1>
      <h3>{correctDate}</h3>
      <p>Author: {currentNews.by}</p>
      <div className={classes.buttons}>
        <Button variant='contained' href={currentNews.url} target='__blank'>
          Read more
        </Button>
        <LoadingButton loading={isLoading} variant='contained' color='warning' onClick={getCurrentNews}>
          Update comments
        </LoadingButton>
        <Link to='/main/main#news-list'>
          <Button variant='outlined'>Go back</Button>
        </Link>
      </div>
      <h2>
        Comments: {currentNews.descendants} <small>last update {moment(lastUpdate).calendar()}</small>
      </h2>

      {comments.map(comment => (
        <CommentItem {...comment} key={comment.id} />
      ))}
    </section>
  );
};

export default NewsDetailPage;
