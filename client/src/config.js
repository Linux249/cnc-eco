export const api_url =
    process.env.NODE_ENV === 'devel2opment'
        ? 'http://localhost:8000/api/v1'
        : 'https://cnc-eco.herokuapp.com/api/v1';
