import React from 'react'
import PostComment from './PostComment'
import {connect} from 'react-redux'
import { getComments, clearComments, postComment } from '../../redux/actions/commentActions'

class Comments extends React.Component{
    componentDidMount(){
        if(!this.props.comments)
            this.props.getComments(this.props.comments);
    }

    componentWillUnmount(){
        this.props.clearComments();
    }

    render(){
        const length = this.props.comments && this.props.comments.length;

        return(
            <section id="comments-wrapper">
                <h2>
                    <i className="fa fa-comments md-icon xs-margin"></i>
                    Comments
                </h2>
                {(this.props.comments && this.props.comments.length > 0) ? (
                        <p>{this.props.comments.length} people {length > 1 ? 'have' : 'has'} commented</p>
                    ): (
                        <p>No one has commented yet</p>
                    )}
                <hr/>
                {!this.props.comments && 
                    <div className="spinner-border text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                }

                <PostComment/>
                {this.props.comments && this.props.comments.map((comment, i) => {
                    return <p key={i}>{comment.userName} says {comment.comment}</p>
                })}
            </section>
        );
    }
}

const mapStateToProps = store => ({
    comments: store.comments.comments
});

export default connect(mapStateToProps, {getComments, clearComments})(Comments);