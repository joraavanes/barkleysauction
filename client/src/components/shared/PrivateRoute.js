import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class PrivateRoute extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }

    render(){
        console.log(this.props.isAuthenticated);
        // if(!this.state.isAuthenticated){
        if(!this.props.isAuthenticated){
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

const mapStateToProps = store => ({
    isAuthenticated: store.auth.length !== 0 
});

export default connect(mapStateToProps,{})(PrivateRoute);