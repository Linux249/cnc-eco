import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducerCall from './reducers/index.js';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
thunkMiddleware,
loggerMiddleware
)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(reducerCall, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}