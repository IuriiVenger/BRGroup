import moment from 'moment';

const dateTransform = (num: number) => moment(new Date(num * 1000)).format('LLLL');

export default dateTransform;
