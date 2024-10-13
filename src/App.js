// src/App.js
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/reset-password" component={ResetPassword}/>
                    <Route path="/" exact>
                        <h1>Welcome! Please login or register.</h1>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
