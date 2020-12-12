import React, { Component } from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { connect } from 'react-redux';
import { toggleLoginModal } from '../../redux/actions/pageStateActions'
import { login } from '../../redux/actions/authActions'
import { clearErrors } from '../../redux/actions/errorActions'

class LoginModal extends Component {

    constructor(props){
        super(props);
        this.submitBtn = React.createRef();
        this.cancelBtn = React.createRef();
    }

    toggle =() =>{
        this.props.toggleLoginModal();
        this.props.clearErrors();
    }

    handleFormSubmit = e => {
        e.preventDefault();
        this.submitBtn.current.setAttribute('disabled', 'disabled');
        this.cancelBtn.current.setAttribute('disabled', 'disabled');
        // e.target.elements.submitBtn.disabled = true;
        // e.target.elements.cancelBtn.disabled = true;

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        this.props.login(email, password);
    }

    componentDidUpdate = (prevProps, prevState) => {
        
        if(this.props.loginState && this.props.emailError){
            this.submitBtn.current.removeAttribute('disabled');
            this.cancelBtn.current.removeAttribute('disabled');
            // e.target.elements.submitBtn.disabled = false;
            // e.target.elements.cancelBtn.disabled = false;
        }
        
        if(this.props.loginState && this.props.auth){
            this.submitBtn.current.removeAttribute('disabled');
            this.cancelBtn.current.removeAttribute('disabled');
            // e.target.elements.submitBtn.disabled = false;
            // e.target.elements.cancelBtn.disabled = false;
            this.props.toggleLoginModal();
        }
    }

    componentWillUnmount = () => {
        this.props.clearErrors();
    }

    render() {
        return (
            <>
                {/* <Button className="btn-sm" color="danger" onClick={this.toggle}>Open Modal</Button> */}
                <Modal isOpen={this.props.loginState} toggle={this.toggle} unmountOnClose={false}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <form onSubmit={this.handleFormSubmit}>
                        <ModalBody>
                                <p>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" name="email" id="email" className="form-control" autoComplete="off"/>
                                </p>
                                <p>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" className="form-control" autoComplete="off"/>
                                </p>
                                {this.props.emailError && <p className="text-danger">{this.props.emailError}</p>}
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-primary" name="submitBtn" id="submitBtn" type="submit" ref={this.submitBtn}>
                                Login
                                {this.props.loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                            </button>
                            <button className="btn btn-secondary" name="cancelBtn" id="cancelBtn" onClick={this.toggle} type="button" ref={this.cancelBtn}>Cancel</button>
                        </ModalFooter>
                    </form>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = store => ({
    auth: store.auth.length !== 0,
    loginState: store.pageState.loginState,
    emailError: store.error.email,
    loading: store.pageState.loading,
});

export default connect(mapStateToProps,{ toggleLoginModal, login, clearErrors })(LoginModal);