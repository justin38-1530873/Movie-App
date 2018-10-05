import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import App from './App';

var config = {
    apiKey: "AIzaSyBF1YaslR54pyTusagirNPzwO7DbRiCrh8",
    authDomain: "movieproject-d3fdc.firebaseapp.com",
    databaseURL: "https://movieproject-d3fdc.firebaseio.com",
    projectId: "movieproject-d3fdc",
    storageBucket: "movieproject-d3fdc.appspot.com",
    messagingSenderId: "440752183141"
};
firebase.initializeApp(config);
// let myIndex = 0;
// carousel();


ReactDOM.render(<BrowserRouter basename={process.env.PUBLIC_URL + '/'}><App /></BrowserRouter>, document.getElementById('root'));