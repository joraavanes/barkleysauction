import React from 'react'
import { Container, Row, Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/actions/authActions'
import { clearErrors } from '../../redux/actions/errorActions';
import banner from '../../media/login-banner.png'

class Login extends React.Component{
    constructor(props){
        super(props);
        this.submitBtn = React.createRef();
    }

    handleFormSubmit = e => {
        e.preventDefault();
        this.submitBtn.current.setAttribute('disabled', 'disabled');
        // e.target.elements.submitBtn.setAttribute('disabled', 'disabled');

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        
        this.props.login(email, password);
    }

    componentDidMount = () => {
        document.title = 'Barkley\'s Store | Login';
        this.props.clearErrors();
    }

    componentDidUpdate(){
        if(this.props.isAuthenticated)
            this.props.history.push('/dashboard');
        
        if(!this.props.isAuthenticated && this.props.emailError && !this.props.loading)
            this.submitBtn.current.removeAttribute('disabled');
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
                                    {this.props.emailError && <p className="text-danger">{this.props.emailError}</p>}
                                    <p>
                                        <input type="text" name="email" className="form-control" placeholder="Username or Email"/>
                                    </p>
                                    <p>
                                        <input type="password" name="password" className="form-control" placeholder="Password"/>
                                    </p>
                                    <p>
                                        <button type="submit" className="btn btn-primary" ref={this.submitBtn}>
                                            Login
                                            {this.props.loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} 
                                        </button>
                                        {/* <Button color="primary" name="submitBtn">
                                            Login
                                            {this.props.loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} 
                                        </Button> */}
                                    </p>
                                    <h1 className="text-center">Or</h1>
                                    
                                    <NavLink to="/register" className="btn btn-primary d-block mx-auto" style={{width: '80%'}}>You can also register here :)</NavLink>
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
    emailError: store.error.email,
    isAuthenticated: store.auth.length !== 0
});

export default connect(mapStateToProps,{login, clearErrors})(Login);