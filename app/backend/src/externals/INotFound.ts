interface INotFound extends Error{
  message: string;
  statusCode: number;
}

export default INotFound;
