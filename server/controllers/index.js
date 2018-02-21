import express from "express";

import serverRenderer from '../middleware/renderer';
import configureStore from '../../src/store/configStore';
import { setMessage } from '../../src/store/appReducer';

const router = express.Router();
const path = require("path");
const store = configureStore();

const actionIndex = (req, res, next) => {
    store.dispatch(setMessage("Hi, I'm from server!"));
    serverRenderer(store)(req, res, next);
};


// root (/) should always serve our server rendered page
router.use('^/$', actionIndex);
// other static resources should just be served as they are
router.use(express.static(
    path.resolve(__dirname,'..', '..', 'build'),
    { maxAge: '30d' },
));
 router.use('*', actionIndex);

export default router;
