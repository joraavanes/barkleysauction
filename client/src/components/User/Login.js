import React from 'react'
import { Container, Row, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { login } from '../../redux/actions/authActions'
import banner from '../../media/login-banner.png'

class Login extends React.Component{
    constructor(props){
        super(props);
    }

    handleFormSubmit = e => {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        
        this.props.login(email, password);
    }

    componentWillUpdate(){
        this.props.history.push('/dashboard');
    }

    render(){
        return(
            <Container fluid={true}>
                <Row>
                    <div className="col-12 col-sm-10 offset-sm-1">
                        <h1>Login</h1>
                        <hr/>
                        <Row>
                            <div className="col-12 col-sm-6">
                                <p>You can login through the form below. You can also login through your facebook or twitter account.</p>
                                <form onSubmit={this.handleFormSubmit}>
                                    <p>
                                        <input type="text" name="email" className="form-control" placeholder="Username or Email"/>
                                    </p>
                                    <p>
                                        <input type="password" name="password" className="form-control" placeholder="Password"/>
                                    </p>
                                    <p>
                                        <Button color="primary">
                                            {this.props.loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                                             Login
                                        </Button>
                                    </p>
                                </form>
                            </div>
                            <div className="col-12 col-sm-6">
                                <h2 className="text-center">
                                    Welcome to Barkley's
                                </h2>
                                <Row>
                                    <div className="col-10 offset-1">
                                        <img src={banner} className="img-fluid mx-auto d-block"/>
                                    </div>
                                </Row>
                                <p>
                                Lorem ipsum dolor sit amet, quas eligendi per ut, in pri epicuri probatus. Te vel vocibus placerat scripserit, sit stet qualisque adversarium in.
                                </p>
                            </div>
                        </Row>
                    </div>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = store => ({
    loading: store.pageState.loading,
    isAuthenticated: store.auth.length !== 0
});

export default connect(mapStateToProps,{login})(Login);