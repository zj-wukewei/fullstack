import moment from 'moment';

export function dataFormat(unix) {
    return moment(unix).format('YYYY-MM-DD HH:mm:ss');
}
