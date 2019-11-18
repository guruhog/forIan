import { config } from 'core/constants/service';
import axios from 'axios';
import moment from 'moment';

export const wordToUpper = input => {
  return input
    .trim()
    .toLowerCase()
    .split(' ')
    .map((item, i) => (i > 0 ? item.charAt(0).toUpperCase() + item.substring(1) : item))
    .join('');
};

export const eachWordToUpper = input => {
  return input
    .trim()
    .split(' ')
    .map(item => item.charAt(0).toUpperCase() + item.substring(1))
    .join(' ');
};

export const isImage = ext => {
  const extension = ext.toLowerCase();
  if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
    return true;
  }
};

export const fileIconType = ext => {
  switch (ext.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
    case 'png':
      return 'file image outline';

    case 'doc':
    case 'docx':
      return 'file word outline';

    case 'pdf':
      return 'file pdf outline';

    default:
      return 'file text outline';
  }
};

export const getObjectClickTrough = async app => {
  const object = {
    appId: app._id,
    appName: app.title,
    url: app.url,
    navigator: navigator.userAgent,
    createdAt: moment().format('YYYY-MM-DD H:mm:ss')
  };

  try {
    object.ipAddress = await axios.get(config.url.GET_IP_API).then(res => res.data);
  } catch (e) {
    object.ipAddress = 'notFound';
  }

  return object;
};

function doubleDigitMonth(month) {
  return month < 10 ? `0${month}` : month;
}

export function getBetweenDates(year, from, to) {
  const startDate = `${year}-${doubleDigitMonth(from)}-01`;

  const date = new Date(year, to, 0);
  const endDate = `${year}-${doubleDigitMonth(to)}-${date.getDate()}`;

  return { startDate, endDate };
}
