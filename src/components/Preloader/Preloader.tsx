import * as React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

import classes from './Preloader.module.scss';

const Preloader: React.FunctionComponent = () => {
  return (
    <div className={classes.preloader}>
      <div className={classes.preloader_background} />
      <InfinitySpin width='200' color='#FB651E' />
    </div>
  );
};

export default Preloader;
