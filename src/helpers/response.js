import Debug from 'debug';
import config from '../config';

export const successResponse = res => result => res
  .json({ result });

export const errorResponse = res => (message, code = 500) => {
  Debug(`${config.appName}:error`)(`Error: ${message}`);
  return res.json({
    error: {
      code,
      message,
    },
  });
};
