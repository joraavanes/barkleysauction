import React from 'react'
import { connect } from 'react-redux'
import { toggleCommentForm, postComment, getComments} from '../../redux/actions/commentActions'
import styles from './styles/PostComment.scss'

class PostComment extends React.Component{
    constructor(props){
        super(props);
        this.commentBtn = React.createRef();
    }

    toggleComment = () =>{
        this.props.toggleCommentForm();
    }

    postComment = e => {
        e.preventDefault();
        this.commentBtn.current.setAttribute('disabled', 'disabled');

        // todo: post action of comment reducer
        if(this.props.item)
            this.props.postComment(this.props.item._id, this.props.user.name, this.state.comment, this.props.user.token);
    }

    handleCommentChange = e => {
        
        e.target.value.length != 0 ? 
            this.commentBtn.current.removeAttribute('disabled') :
             this.commentBtn.current.setAttribute('disabled', 'disabled');

        const comment = e.target.value;
        this.setState({comment});
    }

    componentDidUpdate = () => {
        if(this.props.done){
            this.props.toggleCommentForm();
            this.props.getComments(undefined, this.props.item._id);
        }
    }

    componentWillUnmount = () => {
        this.props.formToggle && this.props.toggleCommentForm();
    }

    handleKeyUpCapture = () => {
        // console.log('handleKeyUpCapture');
    }

    render(){
        if(!this.props.user){
            return(<div className="alert alert-warning" role="alert">
                        <span>
                            <i className={styles.exclamationIcon}></i>
                        </span>
                        Please login to post a comment
                    </div>);
        }

        if(!this.props.formToggle){
            return (
                <button className={styles.commentBtn} onClick={this.toggleComment}>Leave a comment</button>
            );
        }else{
            return(
                <div>
                    <form onSubmit={this.postComment}>
                        <textarea className="form-control" id="comment" rows="3" autoFocus={true} onChange={this.handleCommentChange} onKeyUpCapture={this.handleKeyUpCapture}></textarea>
                        <div className={styles.btnWrapper}>
                            <button onClick={this.toggleComment} className={styles.cancelBtn}>
                                Cancel
                            </button>
                            <button type="submit" className={styles.postBtn} ref={this.commentBtn} disabled="disabled">
                                Comment
                                {this.props.btnLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                            </button>
                        </div>
                    </form>
                </div>
            );
        }
    }
};

const mapStateToProps = store => ({
    user: store.auth[0],
    loading: store.pageState.loading,
    btnLoading: store.comments.loading,
    formToggle: store.comments.formToggle,
    item: store.items.item,
    done: store.comments.done
});

export default connect(mapStateToProps,{toggleCommentForm, postComment, getComments})(PostComment);