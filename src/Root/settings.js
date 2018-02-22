const settings = {
  apiUrl: process.NODE_ENV==='production' ? 'https://api.understanding.shirykalov.ru' : 'http://localhost:4245',
};
export const apiUrl = settings.apiUrl;
export default settings;
