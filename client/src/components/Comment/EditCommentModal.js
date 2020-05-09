import React from 'react'
import { connect } from 'react-redux'
import { EditCommentModal as editCommentModal } from '../../redux/actions/commentActions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class EditCommentModal extends React.Component {
  constructor(props) {
      super(props);
  }

  toggle = () => this.props.editCommentModal();

  render(){
      return (
        <div>
          <Modal isOpen={this.props.editModalState} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Edit your comment</ModalHeader>
            <ModalBody>
              <form>
                <textarea className="form-control" id="comment" rows="3"></textarea>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>{' '}
              <Button color="primary" onClick={this.toggle}>Update</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
  }
}

const mapStateToProps = store => ({
  editModalState: store.comments.editModal
});

export default connect(mapStateToProps, {editCommentModal})(EditCommentModal);