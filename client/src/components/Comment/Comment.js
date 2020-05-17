import React from 'react'
import { connect } from 'react-redux'
import { EditCommentModal, RemoveCommentModal } from '../../redux/actions/commentActions'
import styles from './styles/Comment.scss'
import avatar from '../../media/avatar-1.png'

class Comment extends React.Component{

    toggleEditModal = () => {
        const {uuid, userName, comment} = this.props;
        this.props.EditCommentModal(uuid, userName, comment);
    }

    toggleRemoveModal = () => {
        const {uuid} = this.props;
        this.props.RemoveCommentModal(uuid);
    }

    render(){
        const {comment, userName} = this.props;
        return(
            <div className={styles.commentContainer}>
                <div className={styles.commentAvatarContainer}>
                    <span className={styles.userAvatarContainer}>
                        <img src={avatar.substr(2, avatar.length + 1)} className=""/>
                        {userName}
                    </span>
                    <p className={styles.commentText}>{comment}</p>
                </div>
                <div className={styles.commentBtnsContainer}>
                    {this.props.auth && 
                        <>
                            <button className={styles.commentBtns} onClick={this.toggleEditModal}><i className="far fa-edit"></i></button>
                            <button className={styles.commentBtns} onClick={this.toggleRemoveModal}><i className="far fa-trash-alt"></i></button>
                        </>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => ({
    auth: store.auth[0]
});

export default connect(mapStateToProps, {EditCommentModal, RemoveCommentModal})(Comment);