import * as serviceWorker from './serviceWorker';
import store from '../src/components/redux/redux-store'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'

// let renderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>, document.getElementById('root')
    );
// }

// store.subscribe(() => {
//     let state = store.getState();
//     renderEntireTree(state);
// });
// renderEntireTree(store.getState());

serviceWorker.unregister();
