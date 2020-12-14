import React, { Component } from 'react';
import { Container, Row, Card, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { postItem, getItem, putItem, clearItem } from '../../redux/actions/itemActions'
import { clearErrors } from '../../redux/actions/errorActions';
import DashboardNav from '../Dashboard/DashboardNav';

const spanStyle = {
    fontSize: 18
};

// const pureObjectIsEmpty = obj => obj && obj.constructor === Object && Object.keys(obj).length === 0;

class AddItem extends Component {
    state = {
        imageUrl: null,
        thumbnail: null
    };

    handleAddItem = e => {
        e.preventDefault();

        const { title: { value: title }, startingBid: {value:startingBid}, description: {value: description}} = e.target.elements;
        this.props.postItem({title, startingBid, description, imageUrl: this.state.imageUrl, thumbnail: this.state.thumbnail}, this.props.auth.token);
    }

    handleEditItem = e => {
        e.preventDefault();
        const {_id,title,startingBid, description,imageUrl, thumbnail} = this.state;
        console.log(imageUrl)
        this.props.putItem({_id,title,startingBid, description,imageUrl, thumbnail}, this.props.auth.token);

        // if(this.props.done){
        //     this.props.history.push('/dashboard');
        // } else {
        //     console.log('error submitting edit');
        // }

    }

    handleImageUrl = e => this.setState({ [e.target.name]: e.target.files[0] });

    static getDerivedStateFromProps = (props, state) => {
        if(props.item && !state._id){
            return{
                ...state,
                _id: props.item._id,
                title: props.item.title,
                startingBid: props.item.startingBid,
                description: props.item.description,
                imageUrl: props.item.imageUrl,
                thumbnail: props.item.thumbnail
            };
        };
        
        return state;
    }

    componentDidMount = () => {
        this.props.clearItem();
        
        if(this.props.match.params.uuid){
            this.props.getItem(this.props.match.params.title, this.props.match.params.uuid);
        }
    }

    componentDidUpdate = () => {
        if(this.props.done){
            this.props.history.push('/dashboard');
        }
    }

    componentWillUnmount = () => {
        this.props.clearErrors();
        this.props.clearItem();
    }

    handleFieldChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <div className="col-12 col-sm-2" style={{marginLeft: 0, paddingLeft: 0}}>
                        <DashboardNav/>
                    </div>
                    <div className="col-12 col-md-10">
                        {!this.props.match.params.uuid && <h2>Listing a New Item <span style={spanStyle}>on Barkley's</span></h2>}

                        {this.props.item && <h2>Editing {this.props.item.title} <span style={spanStyle}>on the Barkley's</span></h2>}

                        {/* <h4>{this.props.match.params.id}</h4> */}
                        <form onSubmit={this.props.match.params.uuid ? this.handleEditItem : this.handleAddItem}>
                            <div className="form-group">
                                {this.props.titleError && <span className="text-danger">{this.props.titleError}</span>}
                                <input type="text" name="title" id="title" className="form-control" placeholder="Your object title" onChange={this.handleFieldChange} defaultValue={this.state.title}/>
                            </div>
                            <div className="form-group">
                                {this.props.startingBidError && <span className="text-danger">{this.props.startingBidError}</span>}
                                <input type="number" name="startingBid" id="startingBid" className="form-control" step="0.01" placeholder="Starting price" onChange={this.handleFieldChange} defaultValue={this.state.startingBid}/>
                            </div>
                            <div className="form-group">
                                {this.props.descriptionError && <span className="text-danger">{this.props.descriptionError}</span>}
                                <textarea className="form-control" name="description" id="description" placeholder="Describe how glamorous your item is" rows="10" onChange={this.handleFieldChange} defaultValue={this.state.description}></textarea>
                            </div>
                            <div className="form-group">
                                {this.props.imageUrlError && <span className="text-danger">{this.props.imageUrlError}</span>}
                                {/* <input type="text" name="imageUrl" id="imageUrl" className="form-control" placeholder="Image" onChange={this.handleFieldChange} defaultValue={this.state.imageUrl}/> */}
                                {this.state.imageUrl && <img src={this.state.imageUrl} className="img-fluid img-thumbnail" style={{margin: 10, width: '14%'}}/>}
                                <input type="file" onChange={this.handleImageUrl} name="imageUrl" id="imageUrl" accept="image/jpg, image/jpeg, image/png"/>
                            </div>
                            {/* <div className="form-group">
                                {this.props.thumbnailError && <span className="text-danger">{this.props.thumbnailError}</span>}
                                <input type="text" name="thumbnail" id="thumbnail" className="form-control" placeholder="Image" onChange={this.handleFieldChange} defaultValue={this.state.thumbnail}/>
                                <input type="file" onChange={this.handleImageUrl} name="Thumbnail" id="Thumbnail" accept="image/jpg, image/png, image/jpeg"/>
                            </div> */}
                            <div>
                                <input type="submit" className="btn btn-primary" value={this.props.match.params.uuid ? "Edit" : "Add"}/>
                            </div>
                        </form>
                    </div>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (store) => ({
    item: store.items.item,
    titleError: store.error.title,
    startingBidError: store.error.startingBid,
    descriptionError: store.error.description,
    imageUrlError: store.error.imageUrl,
    thumbnailError: store.error.thumbnail,
    auth: store.auth[0],
    done: store.items.done
});

export default connect(mapStateToProps, {postItem,getItem,putItem,clearItem,clearErrors})(AddItem);