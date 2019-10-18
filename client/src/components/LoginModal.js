import React, { Component } from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

export default class LoginModal extends Component {
    state = {
        modal: false
    };

    toggle =() =>{
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

    render() {
        return (
            <div>
                <Button className="btn-sm" color="danger" onClick={this.toggle}>Open Modal</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <form>
                        <ModalBody>
                                <p>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" name="email" id="email" className="form-control" autoComplete="off"/>
                                </p>
                                <p>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" className="form-control" autoComplete="off"/>
                                </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Login</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        )
    }
}
