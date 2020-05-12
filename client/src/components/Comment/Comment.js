import React from 'react'
import { connect } from 'react-redux'
import { EditCommentModal } from '../../redux/actions/commentActions'
import styles from './styles/Comment.scss'
import avatar from '../../media/avatar-1.png'

class Comment extends React.Component{

    toggleModal = () => {
        const {uuid, userName, comment} = this.props;
        this.props.EditCommentModal(uuid, userName, comment);
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
                    <button className={styles.commentBtns} onClick={this.toggleModal}><i className="far fa-edit"></i></button>
                    <button className={styles.commentBtns}><i className="far fa-trash-alt"></i></button>
                </div>
            </div>
        )
    }
}

export default connect(undefined, {EditCommentModal})(Comment);