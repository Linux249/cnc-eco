export const devMode = process.env.NODE_ENV === 'development';

export const api_url = devMode
    ? 'http://localhost:8000/api/v1'
    : 'https://cnc-eco.herokuapp.com/api/v1';

export const LOCAL_STORE = devMode ? 'cnc-eco-dev' : 'cnc-eco';
