import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducerCall from './reducers/index.js';

const createStoreWithMiddleware =
    process.env.NODE_ENV === 'development'
        ? // development
          applyMiddleware(thunkMiddleware, require('redux-logger')())(createStore)
        : // production
          applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(
        reducerCall,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}
