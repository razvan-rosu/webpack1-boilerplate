import babelimg from '../images/babel.png';
import sassimg from '../images/sass.png';
import webpackimg from '../images/webpack.png';
import postcssimg from '../images/postcss-autoprefixer.png';
// pattern is used in index.scss
import pattern from '../images/pattern.png';

const babel = document.getElementById('babel-img');
if (babel) babel.src = babelimg;

const sass = document.getElementById('sass-img');
if (sass) sass.src = sassimg;

const webpack = document.getElementById('webpack-img');
if (webpack) webpack.src = webpackimg;

const postcss = document.getElementById('postcss-img');
if (postcss) postcss.src = postcssimg;

// alert('Hello index.js');

// Include mithril
const m = require('mithril');

// Pass mithril to the router.
// Only required to overload once, subsequent overloads will
// return the same instance
require('mithril-router')(m);

m.route(document.body, {
    "/": { controller: home, namespace: "index", root: true },
    "/login": { controller: login, namespace: "login" },
    "/dashboard": { controller: dashboard, namespace: "dashboard" }
});