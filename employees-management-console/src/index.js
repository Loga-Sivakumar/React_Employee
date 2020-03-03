import React from 'react';
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router,Switch } from 'react-router-dom';
import Employee from './components/employee';
import pageNotFound from './components/pageNotFound';
import './index.css';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
const routing = ( <Router>
    <Switch>
<Route exact path = '/employees' component = {Employee}/>
<Route  component = {pageNotFound}/>
</Switch>
</Router>
 );
ReactDOM.render(routing, document.getElementById('root'));
serviceWorker.unregister();
