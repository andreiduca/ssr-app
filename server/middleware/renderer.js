import React from 'react'
import ReactDOMServer from 'react-dom/server';
import { Provider as ReduxProvider } from 'react-redux';
import App from '../../src/App';
import Loadable from 'react-loadable';
import manifest from '../../build/asset-manifest.json';

const path = require("path");
const fs = require("fs");
const modules = [];
const extractAssets = (assets, chunks) => Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k]);

export default (store) => (req, res, next) => {
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');
    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('err', err);
            return res.status(404).end()
        }
        const html = ReactDOMServer.renderToString(
             <Loadable.Capture report={m => modules.push(m)}>
                 <ReduxProvider store={store}>
                     <App />
                </ReduxProvider>
            </Loadable.Capture>
        );
        const reduxState = JSON.stringify(store.getState());
        console.log('reduxState', reduxState);
        const extraChunks = extractAssets(manifest, modules)
            .map(c => `<script type="text/javascript" src="/${c}"></script>`);

        return res.send(
            htmlData.replace(
                '<div id="root"></div>',
                `<div id="root">${html}</div>`
            ).replace(
                '</body>',
                extraChunks.join('') + '</body>'
            )
            .replace('__SERVER_REDUX_STATE__', reduxState)
        );
    });

}
