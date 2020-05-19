import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router,Switch, Route, Link } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './redux/store/store'
import App from './components/app'
import Auction from './components/Auction'
import Navigation from './components/Navigation'
import ViewItem from './components/Items/ViewItem'
import AddItem from './components/Items/AddItem'
import LoginModal from './components/User/LoginModal'
import PrivateRoute from './components/shared/PrivateRoute'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/User/Login'
import Register from './components/User/register'

import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './styles/custom.scss'
import register from './components/User/register'

// store.dispatch({
//     type: 'ADD_ERROR',
//     errorType: 'email',
//     errorValue: 'Please enter your username!'
// });

// setTimeout(() => {
//     store.dispatch({
//         type: 'REMOVE_ERROR',
//         errorType: 'email'
//     });    
// }, 5000);

const router = (
    <Provider store={store}>
        <Router>
                <Navigation/>
                {/* <div className='mask'></div> */}
                <LoginModal/>
                <Switch>
                    <Route 
                        path="/"
                        // render={() => <App products={products}/>}
                        component={App}
                        exact={true}/>
                    <Route path="/items" component={App} exact={true}/>
                    <Route path="/items/:title/:uuid" component={ViewItem} exact={true}/>
                    <PrivateRoute path="/Dashboard" exact={true}>
                        {/* <Dashboard/> */}
                        <Route component={Dashboard} path="/dashboard"/>
                    </PrivateRoute>
                    <PrivateRoute path="/dashboard/items/list-an-item" exact={true}>
                        <Route component={AddItem}/>
                    </PrivateRoute>
                    <PrivateRoute path="/dashboard/items/edit-item/:title/:uuid" exact={true}>
                        <Route component={AddItem} path="/dashboard/items/edit-item/:title/:uuid"/>
                    </PrivateRoute>
                    <PrivateRoute path="/dashboard/items/remove/:uuid" exact={true}>
                        <Route component={Dashboard} path="/dashboard/items/remove/:uuid"/>
                    </PrivateRoute>
                    <Route path="/Auction" component={Auction}/>
                    <Route path="/Login" component={Login}/>
                    <Route path="/Register" component={Register}/>
                    
                    <Route path="*" render={() => <h2>Middle of nowhere !</h2>}/>
                </Switch>
        </Router>
    </Provider>
);

ReactDOM.render(router, document.querySelector('#app'));