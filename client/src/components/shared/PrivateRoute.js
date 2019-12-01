import React from 'react'
import { Redirect } from 'react-router-dom'

class PrivateRoute extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }

    render(){
        if(!this.state.isAuthenticated){
            return(
                <Redirect to={{
                    pathname: "/login"
                }}/>
            );
        } else {
            return(
                <div>
                    {this.props.children}
                </div>
            );
        }
    };
}

export default PrivateRoute;