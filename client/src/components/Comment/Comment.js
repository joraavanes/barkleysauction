import React from 'react'
import styles from './styles/Comment.scss'
import avatar from '../../media/avatar-1.png'

class Comment extends React.Component{

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
                    <button className={styles.commentBtns}><i className="far fa-edit"></i></button>
                    <button className={styles.commentBtns}><i className="far fa-trash-alt"></i></button>
                </div>
            </div>
        )
    }
}

export default Comment;