import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from "firebase";

export default class Navbar extends Component {


    constructor(props) {
        super(props);

        const config = {
            apiKey: "AIzaSyADpZFjXCldn1JzDATAPhO8qYD2oVPPnFQ",
            authDomain: "hawkers-portal.firebaseapp.com",
            databaseURL: "https://hawkers-portal.firebaseio.com",
            storageBucket: "hawkers-portal.appspot.com"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        // console.log(config)


    }


    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Hawkers.SG</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">

                        <li className="navbar-item">
                            <Link to="/memories" className="nav-link">Browse memories</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/memories/add-hawker" className="nav-link">Create memories</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/memories/firebase-uploader" className="nav-link"><b>Single </b>Firebase Uploader</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/memories/firebase-uploader-multiple" className="nav-link"><b>Multiple </b>Firebase Uploader</Link>
                        </li>

                    </ul>
                </div>
            </nav>
        );
    }
}