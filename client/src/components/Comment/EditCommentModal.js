import React from 'react'
import { connect } from 'react-redux'
import { EditCommentModal as editCommentModal, EditComment, EditCommentCompleted, getComments } from '../../redux/actions/commentActions'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class EditCommentModal extends React.Component {
  constructor(props) {
      super(props);
      this.submitBtn = React.createRef();
      this.cancelBtn = React.createRef();
  }

  toggle = () => this.props.editCommentModal(undefined, undefined);

  editFormSubmit = e => {
    e.preventDefault();
    this.submitBtn.current.setAttribute('disabled', 'disabled');
    this.cancelBtn.current.setAttribute('disabled', 'disabled');

    const uuid = this.props.uuid;
    const userName = this.props.userName;
    const comment = e.target.elements.comment.value;
    const token = this.props.auth ? this.props.auth.token : undefined;

    this.props.EditComment(this.props.item._id, token, {uuid, userName, comment});
  }

  componentDidUpdate = () => {
    if(this.props.done && !this.props.loading){
      this.submitBtn.current.removeAttribute('disabled');
      this.cancelBtn.current.removeAttribute('disabled');
      this.props.EditCommentCompleted();
      this.props.getComments(undefined, this.props.item._id);
    }
  }

  render(){
      return (
        <div>
          <Modal isOpen={this.props.editModalState} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Edit your comment</ModalHeader>
            <form onSubmit={this.editFormSubmit}>
              <ModalBody>
                  <textarea className="form-control" id="comment" rows="3" defaultValue={this.props.comment}></textarea>
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-secondary" onClick={this.toggle} ref={this.cancelBtn}>Cancel</button>{' '}
                {/* <Button color="primary" onClick={this.editComment}>Update</Button> */}
                <button className="btn btn-primary" type="submit" ref={this.submitBtn}>
                  Update
                  {this.props.loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                </button>
              </ModalFooter>
            </form>
          </Modal>
        </div>
      );
  }
}

const mapStateToProps = store => ({
  auth: store.auth[0],
  editModalState: store.comments.editModal,
  uuid: store.comments.commentEditData.uuid,
  userName: store.comments.commentEditData.userName,
  comment: store.comments.commentEditData.comment,
  done: store.comments.commentEditData.done,
  item: store.items.item,
  loading: store.comments.loading
});

export default connect(mapStateToProps, {editCommentModal, EditComment, EditCommentCompleted, getComments})(EditCommentModal);