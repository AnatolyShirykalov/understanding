const settings = {
  apiUrl: process.env.NODE_ENV==='production' ? '' : 'http://localhost:4245',
};
export const apiUrl = settings.apiUrl;
export default settings;
