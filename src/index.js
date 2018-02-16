import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './store/configStore';
const store = configureStore(window.REDUX_STATE || {});

window.onload = () => {
    Loadable.preloadReady().then(() => {
        console.log(store);
        ReactDOM.hydrate(
            <ReduxProvider store={store}>
                <App />
            </ReduxProvider>,
            document.getElementById('root')
        );
    });
};
registerServiceWorker();
