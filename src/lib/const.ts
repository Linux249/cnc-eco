if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

export const dbUri = process.env.MONGODB_URI;

export const API_URL = '/api/v1';

export const JWT_SECRET = process.env.JWT_SECRET || 'secret123';
export const LOCAL_STORE = process.env.NODE_ENV === 'development' ? 'cnc-eco-dev2' : 'cnc-eco2';
