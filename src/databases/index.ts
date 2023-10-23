import { DB_HOST, DB_PORT, DB_DATABASE } from '@config';

console.log('DB_DATABASE: ', DB_DATABASE);
export const dbConnection = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
};
