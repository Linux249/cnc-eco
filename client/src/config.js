export const api_url =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000/api/v1'
        : 'https://cnc-eco.herokuapp.com/api/v1';

export const LOCAL_STORE = 'cnc-eco-store';
