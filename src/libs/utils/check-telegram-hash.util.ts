import * as crypto from 'crypto';

type TelegramAuthWidgetData = {
  auth_date: number;
  first_name: string;
  last_name?: string;
  hash: string;
  id: number;
  photo_url?: string;
  username?: string;
};

export const checkTelegramHash = (
  data: TelegramAuthWidgetData,
  token: string,
): boolean => {
  const secret = crypto.createHash('sha256').update(token).digest();

  const array = [];

  for (const key in data) {
    if (key != 'hash') {
      array.push(key + '=' + data[key]);
    }
  }

  const check_hash = crypto
    .createHmac('sha256', secret)
    .update(array.sort().join('\n'))
    .digest('hex');

  return check_hash == data.hash;
};
