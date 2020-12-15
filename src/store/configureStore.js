import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducerCall from './reducers/index.js';

let createStoreWithMiddleware;
if (process.env.NODE_ENV === 'development') {
    const logger = require('redux-logger');
    createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger.createLogger())(
        createStore
    );
} else {
    createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
}

export default function configureStore(initialState) {
    return createStoreWithMiddleware(
        reducerCall,
        initialState,
        typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose
    );
}
