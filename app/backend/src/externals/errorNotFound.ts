import INotFound from './INotFound';

const errorNotFound = (message: string): INotFound => ({
  name: Error.name,
  message,
  statusCode: 404,
});

export default errorNotFound;
