import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import { RemoveCommentModal as removeCommentModal, RemoveComment, RemoveCommentCompleted, getComments } from '../../redux/actions/commentActions'

class RemoveCommentModal extends React.Component{
    constructor(props){
        super(props);
        this.removeBtn = React.createRef();
        this.cancelBtn = React.createRef();
    }

    toggle = () => this.props.removeCommentModal(undefined);

    removeFormSubmit = e => {
        e.preventDefault();
        this.removeBtn.current.setAttribute('disabled', 'disabled');
        this.cancelBtn.current.setAttribute('disabled', 'disabled');

        const {uuid} = this.props;
        const {token} = this.props.auth;
        const {_id} = this.props.item;

        this.props.RemoveComment(_id, token, uuid);
    }

    componentDidUpdate = prevProps => {
        if(this.props.done && !this.props.loading){
            this.cancelBtn.current.removeAttribute('disabled');
            this.removeBtn.current.removeAttribute('disabled');
            this.props.getComments(undefined, this.props.item._id);
            this.props.RemoveCommentCompleted();
        }
    }

    render(){
        return(
            <Modal isOpen={this.props.modalState} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Remove your comment</ModalHeader>
                <form onSubmit={this.removeFormSubmit}>
                    <ModalBody>
                        Are you going to remove the comment?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-secondary" onClick={this.toggle} type="button" ref={this.cancelBtn}>Cancel</button>{' '}
                        <button className="btn btn-primary" type="submit" ref={this.removeBtn}>
                            Remove
                            {this.props.loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        </button>
                    </ModalFooter>
                </form>
            </Modal>
        );
    }
}

const mapStateToProps = store => ({
    auth: store.auth[0],
    uuid: store.comments.commentRemoveData.uuid,
    item: store.items.item,
    modalState: store.comments.removeModal,
    done: store.comments.commentRemoveData.done,
    loading: store.comments.loading
});

export default connect(mapStateToProps, {removeCommentModal, RemoveComment, RemoveCommentCompleted, getComments})(RemoveCommentModal);