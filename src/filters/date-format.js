import moment from 'moment';

moment.locale('zh-CN');

export default function (date, pattern = 'yyyy-MM-DD HH:mm:ss') {
  return moment(date).format(pattern)
}
