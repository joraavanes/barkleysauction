import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router,Switch, Route, Link } from 'react-router-dom'
import App from './components/app'
import Navigation from './components/Navigation'
import {products} from './mock/mock'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/custom.scss'

const router = (
    <Router>
            <Navigation/>
            <Switch>
                <Route 
                    path="/"
                    render={() => <App products={products}/>}
                    exact={true}/>
            </Switch>
    </Router>
);

ReactDOM.render(router, document.querySelector('#app'));