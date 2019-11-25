import moment from 'moment';

export function dataFormat(unix) {
    return moment(unix).format('YY-MM-DD HH:mm:ss');
}
