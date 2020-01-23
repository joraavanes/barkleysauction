import React, { Component } from 'react';
import { Container, Row, Card, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { postItem } from '../../redux/actions/itemActions'
import { clearErrors } from '../../redux/actions/errorActions';

const spanStyle = {
    fontSize: 18
};

const pureObjectIsEmpty = obj => obj && obj.constructor === Object && Object.keys(obj).length === 0;

class AddItem extends Component {

    handleAddItem = e => {
        e.preventDefault();

        const { title: { value: title }, startingBid: {value:startingBid}, description: {value: description}, imageUrl: {value: imageUrl}, thumbnail: {value:thumbnail} } = e.target.elements;
        this.props.postItem({title, startingBid, description, imageUrl, thumbnail});
    }

    componentWillUnmount = () => this.props.clearErrors();

    componentDidUpdate = () => {
        console.log('add item updated');
        if(this.props.done){
            this.props.history.push('/dashboard');
        }

        // if(this.checkNoErrors()){
        //     this.props.history.push('/dashboard');
        // }
    }

    render() {
        return (
            <Container>
                <Row>
                    <div className="col-12 col-md-12">
                        <h1>Listing a New Item <span style={spanStyle}>on Barkley's</span></h1>
                        <form onSubmit={this.handleAddItem}>
                            <div className="form-group">
                                {this.props.titleError && <span className="text-danger">{this.props.titleError}</span>}
                                <input type="text" name="title" id="title" className="form-control" placeholder="Your object title"/>
                            </div>
                            <div className="form-group">
                                {this.props.startingBidError && <span className="text-danger">{this.props.startingBidError}</span>}
                                <input type="number" name="startingBid" id="startingBid" className="form-control" step="0.01" placeholder="Starting price"/>
                            </div>
                            <div className="form-group">
                                {this.props.descriptionError && <span className="text-danger">{this.props.descriptionError}</span>}
                                <textarea className="form-control" name="description" id="description" placeholder="Describe how glamorous your item is" rows="10"></textarea>
                            </div>
                            <div className="form-group">
                                {this.props.imageUrlError && <span className="text-danger">{this.props.imageUrlError}</span>}
                                <input type="text" name="imageUrl" id="imageUrl" className="form-control" placeholder="Image"/>
                            </div>
                            <div className="form-group">
                                {this.props.thumbnailError && <span className="text-danger">{this.props.thumbnailError}</span>}
                                <input type="text" name="thumbnail" id="thumbnail" className="form-control" placeholder="Image"/>
                            </div>
                            <div>
                                <input type="submit" className="btn btn-primary" value="Add"/>
                            </div>
                        </form>
                    </div>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (store) => ({
    titleError: store.error.title,
    startingBidError: store.error.startingBid,
    descriptionError: store.error.description,
    imageUrlError: store.error.imageUrl,
    thumbnailError: store.error.thumbnail,
    done: store.items.done
});

export default connect(mapStateToProps, {postItem,clearErrors})(AddItem);