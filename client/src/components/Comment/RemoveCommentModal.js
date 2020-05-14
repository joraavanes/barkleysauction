import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'

class RemoveCommentModal extends React.Component{
    state = {
        modalState: false
    }

    toggle = () => {
        this.setState(prevState => ({ modalState: !prevState.modalState }));
    }

    removeFormSubmit = e => {
        e.preventDefault();
    }

    render(){
        return(
            <>
                <button className="btn" onClick={this.toggle}>toggle remove</button>
                <Modal isOpen={this.state.modalState} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <form onSubmit={this.removeFormSubmit}>
                        <ModalBody>
                            Are you going to remove the comment?
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-secondary" onClick={this.toggle}>Cancel</button>{' '}
                            <button className="btn btn-primary" type="submit" onClick={this.toggle}>Remove</button>
                        </ModalFooter>
                    </form>
                </Modal>
            </>
        );
    }
}

export default connect(undefined, {})(RemoveCommentModal);