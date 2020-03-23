import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { getItem, removeItem, clearItem } from '../../redux/actions/itemActions'

class ItemDeleteModal extends Component {
    state = {
        uuid: undefined,
        title: undefined
    }

    handleFormSubmit = e => {
        e.preventDefault();
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        console.log('Next Props: ', nextProps);
        const {uuid, title} = nextProps;
        if(uuid && title)
            return {uuid, title};
        else
            return {uuid: undefined, title: undefined};
    }

    componentDidUpdate = () => {
        console.log('new state: ', this.state);
        if(this.state.uuid && this.state.title && !this.props.itemToDelete){
            this.props.getItem(this.state.title, this.state.uuid);
        }

        if(this.props.done){
            this.props.clearItem()
            this.props.handleModalState(null, true);
        }
        
    }
    
    handleModalState = e => {
        this.props.clearItem();
        this.props.handleModalState(e);
    }

    submitRemove = () => {
        this.props.removeItem(this.props.itemToDelete._id, this.props.auth.token)
    }

    render() {
        return (
            <Modal isOpen={this.props.modalState} toggle={this.props.handleModalState}>
                <form onSubmit={this.handleFormSubmit}>
                    <ModalHeader>Removing the {this.props.title}</ModalHeader>
                    <ModalBody>
                                <p>
                                    Are you going to delete the item {this.props.title} - ({this.props.uuid})?
                                </p>
                    </ModalBody>
                    <ModalFooter>
                        <button className={this.props.loading ? "btn btn-danger disabled" : "btn btn-danger"} disabled={this.props.loading} onClick={this.submitRemove}>
                            Remove item
                            {this.props.loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} 
                        </button>
                        <Button color="secondary" onClick={this.handleModalState}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        );
    }
}

const mapStateToProps = store => ({
    itemToDelete: store.items.item,
    loading: store.items.loading,
    done: store.items.done,
    auth: store.auth[0]
});

export default connect(mapStateToProps, {getItem, removeItem, clearItem})(ItemDeleteModal);