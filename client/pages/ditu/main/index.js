/**
 * Created by JackieWu on 2018/7/15.
 */
import React from 'react';
import { hydrate } from 'react-dom';
import App from './app';

hydrate(<App { ...window.__INITIAL_DATA__} />, document.getElementById('container-box'));