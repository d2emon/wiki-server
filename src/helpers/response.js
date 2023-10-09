import Debug from 'debug';
import config from '../config';

export const successResponse = result => JSON.stringify(
  { result },
  null,
  4,
);

export const errorResponse = (message, code = 500) => {
  Debug(`${config.appName}:error`)(`Error: ${message}`);
  return JSON.stringify(
    {
      error: {
        code,
        message,
      },
    },
    null,
    4,
  );
};
