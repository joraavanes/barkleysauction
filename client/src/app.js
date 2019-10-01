import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router,Switch, Route, Link } from 'react-router-dom'
import App from './components/app'
import Auction from './components/Auction'
import Navigation from './components/Navigation'
import ViewItem from './components/ViewItem'
import LoginModal from './components/LoginModal'
import {products} from './mock/mock'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/custom.scss'

const router = (
    <Router>
            <Navigation/>
            <div className='mask'></div>
            <LoginModal/>
            <Switch>
                <Route 
                    path="/"
                    // render={() => <App products={products}/>}
                    component={App}
                    exact={true}/>
                <Route path="/items" component={App} exact={true}/>
                <Route path="/items/:id" component={ViewItem}/>
                <Route path="/Auction" component={Auction}/>
                <Route path="*" render={() => <h2>Middle of nowhere !</h2>}/>
            </Switch>
    </Router>
);

ReactDOM.render(router, document.querySelector('#app'));