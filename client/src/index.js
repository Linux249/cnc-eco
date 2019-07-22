import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import urlToBase from './util/parseurl';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './style/index.css';

const initial_state = urlToBase(
    'map=2|N|N|-fix-|.........12p12p12p.14r20h20s20h.12p24a12p12p16r20h27s20h.12p20p12p.14r20h20s20h.12p24a12p......12p12p12p.12n17s....cc.12n17s12nc..........j37s37f37s37f37s37q.l37q37zj37z37z37zk..37q37sj37qll37s..37qh37c37q37c37qjj.37q37s37z37qj37s37q..l37q37q37s37q37zh..37mj37w37w37w37wh.h37w37qh37m37q..k.42l42l43r43r..1q1p.42l43r44r44r..1b..48l48r48r46r.....50m50m43r43r38r....|newEconomy'
);

if (process.env.NODE_ENV !== 'production') {
    console.log('INITIAL STATE - FROM URL');
    console.log({ initial_state });
    // const { whyDidYouUpdate } = require('why-did-you-update');
    //whyDidYouUpdate(React)
}

export const store = configureStore(initial_state);

ReactDOM.render(
    <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
            <App />
        </Provider>
    </DndProvider>,
    document.getElementById('app')
);
