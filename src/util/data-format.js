import moment from 'moment';

moment.locale('zh-CN');

export function fromNow(date) {
    return moment(date).fromNow()
}
