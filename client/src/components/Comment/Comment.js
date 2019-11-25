import React from 'react';
import {connect} from 'react-redux'
import { getComments, clearComments } from '../../redux/actions/commentActions'

class Comment extends React.Component{
    componentDidMount(){
        this.props.getComments();
    }

    componentWillUnmount(){
        this.props.clearComments();
    }

    render(){
        return(
            <section id="comments-wrapper">
                <h2>
                    <i className="fa fa-comments md-icon xs-margin"></i>
                    Comments
                </h2>
                <hr/>
                {this.props.comments.length === 0 && 
                    <div className="spinner-border text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                }

                {this.props.comments && this.props.comments.map((comment, i) => {
                    return <p key={i}>{comment.comment}</p>
                })}
            </section>
        );
    }
}

const mapStateToProps = store => ({
    comments: store.comments.comments
});

export default connect(mapStateToProps, {getComments, clearComments})(Comment);