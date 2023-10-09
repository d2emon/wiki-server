import Debug from 'debug';
import config from '../config';

export const successResponse = res => result => res.json(result);

export const errorResponse = res => (error) => {
  Debug(`${config.appName}:error`)(`Error: ${error}`);
  return res.json({
    error: {
      code: error.code,
      message: error.message,
    },
  });
};
