import React from 'react';
import { Container, Row } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../../redux/actions/authActions'
import { clearErrors } from '../../redux/actions/errorActions';
import banner from '../../media/login-banner.png'

class Register extends React.Component{
    constructor(props){
        super(props);
    }

    handleRegisterForm = e => {
        e.preventDefault();

        const {name: {value:name}, surname : {value: surname}, email: {value: email}, password: {value: password}} = e.target.elements;
        this.props.register({name,surname,email,password});
    }

    handleFieldBlur = e => e.target.setAttribute('readonly','readonly');
    handleFieldFocus = e => e.target.removeAttribute('readonly');

    componentDidMount = () => this.props.clearErrors();

    componentWillUpdate = () => {
        if(this.props.isAuthenticated)
            this.props.history.push('/');
    }

    render(){
        return(
            <Container fluid={true}>
                <Row>
                    <div className="col-12 col-sm-10 offset-sm-1">
                        <h1>Register</h1>
                        <hr/>
                        <Row>
                            <div className="col-12 col-md-6">
                                <p>Please fill out the form below.</p>
                                <form onSubmit={this.handleRegisterForm}>
                                    {this.props.nameError && <p className="text-danger no-margin-bottom">{this.props.nameError}</p>}
                                    <p>
                                        <input type="text" name="name" className="form-control auto-complete-off" placeholder="Name"/>
                                    </p>
                                    {this.props.surnameError && <p className="text-danger no-margin-bottom">{this.props.surnameError}</p>}
                                    <p>
                                        <input type="text" name="surname" className="form-control auto-complete-off" placeholder="Surname"/>
                                    </p>
                                    {this.props.emailError && <p className="text-danger no-margin-bottom">{this.props.emailError}</p>}
                                    <p>
                                        <input type="text" name="email" className="form-control auto-complete-off" placeholder="Email or Username" readOnly onFocus={this.handleFieldFocus} onBlur={this.handleFieldBlur}/>
                                    </p>
                                    {this.props.passwordError && <p className="text-danger no-margin-bottom">{this.props.passwordError}</p>}
                                    <p>
                                        <input type="password" className="form-control auto-complete-off" name="password" placeholder="Password" readOnly onFocus={this.handleFieldFocus} onBlur={this.handleFieldBlur}/>
                                    </p>
                                    <p>
                                        <input type="password" className="form-control auto-complete-off" name="confirmPassword" placeholder="Confirm Password"/>
                                    </p>
                                    <p>
                                        <button className="btn btn-primary" type="submit">
                                            Register 
                                            {this.props.loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} 
                                        </button>
                                        {/* <input type="submit" className="btn btn-primary" value="Register"/> */}
                                    </p>
                                    <h2 className="text-center">Or</h2>
                                    <NavLink to="/login" className="btn btn-primary d-block mx-auto" style={{width: '80%'}}>Login</NavLink>
                                </form>
                            </div>
                            <div className="col-12 col-md-6">
                                <h2 className="text-center">Welcome to Barkley's</h2>
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
    isAuthenticated: store.auth.length !== 0,
    nameError: store.error.name,
    surnameError: store.error.surname,
    emailError: store.error.email,
    passwordError: store.error.password
});

export default connect(mapStateToProps,{register, clearErrors})(Register);