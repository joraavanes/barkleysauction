import React, { Component } from 'react'
import {Container,Row,} from 'reactstrap'
import { connect } from 'react-redux';
import {getItem,clearItems} from '../redux/actions/itemActions'
import { clearComments } from '../redux/actions/commentActions'
import Comment from './Comment/Comment'
import avatar1 from '../media/avatar-1.png'
import avatar3 from '../media/avatar-5.png'
import avatar4 from '../media/avatar-4.png'
import bag from '../media/bag.jpg'

class ViewItem extends Component {

    componentDidMount(){
        this.props.getItem(this.props.match.params.name,this.props.match.params.id);
    }

    componentWillUnmount(){
        this.props.clearItems();
        this.props.clearComments();
    }

    render() {
        // console.log(this.props.item.description);
        return (
            <Container fluid={true}>
                <Row>
                    <main className="col-12 col-sm-6 col-md-8">
                        <Row>
                            <div className="col-12 col-md-4 col-lg-3">
                                <img src={bag.substr(2)} className="img-fluid" alt={this.props.item ? this.props.item.name:'Product is not here!'}/>
                                {/* {this.props.item !=null ? (

                                    <img src={require('../media/bag.jpg').substr(2)} className="img-fluid" alt={this.props.item.name}/>
                                ):(
                                    <div>Loading ...</div>
                                )} */}
                            </div>
                            <div className="col-12 col-md-8 col-lg-9">
                                {this.props.item != null ? (
                                    <React.Fragment>
                                        <h1>
                                            {this.props.item.name} -  
                                            {!this.props.item.sold ? 
                                            (<span className="text-success avail-status">Available</span>) 
                                            :
                                            (<span className="text-danger avail-status">Sold for <i className="fas fa-pound-sign xs-margin"></i>{this.props.item.price.toLocaleString()}</span>)}
                                        </h1>
                                        <h4>Last bid was <i className="fas fa-pound-sign xs-margin"></i>{this.props.item.price.toLocaleString()}</h4>
                                    </React.Fragment>
                                ):(
                                    <div>Loading ...</div>
                                )}
                                {/* <h5 className="card-title">{this.props.match.params.name} -- {this.props.match.params.id}</h5> */}
                                    
                                <p>
                                    {this.props.item && this.props.item.description}
                                </p>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12 col-sm-12 col-md-10 offset-md-1">
                                <Comment/>
                            </div>
                        </Row>
                    </main>
                    <div className="col-12 col-sm-6 col-md-4">
                        <h2 className="bid-title">Last bids
                            <span>for {this.props.item && this.props.item.name}</span>
                        </h2>

                        {/* <div className="bids-loader">
                            <div role="status" className="spinner-border text-danger">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div> */}

                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <div className="media">
                                    <img src={avatar1.substr(2,avatar1.length+1)} className="mr-3 avatar-img"/>                                    
                                    <div className="media-body">
                                        <h5 className="mt-0">rosa_55r</h5>
                                        is bidding <i className="fas fa-pound-sign xs-margin"></i> 235 - a few minutes ago
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="media">
                                    <img src={avatar3.substr(2,avatar3.length+1)} className="mr-3 avatar-img" alt="..."/>
                                    <div className="media-body">
                                        <h5 className="mt-0">rip_slayer</h5>
                                        Bids <i className="fas fa-pound-sign xs-margin"></i> 225 - a few minutes ago
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="media">
                                    <img src={avatar4.substr(2,avatar4.length+1)} className="mr-3 avatar-img" alt="..."/>
                                    <div className="media-body">
                                        <h5 className="mt-0">merry_eli_992</h5>
                                        Bids <i className="fas fa-pound-sign xs-margin"></i> 217 - a few minutes ago
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">Dapibus ac facilisis in</li>
                            <li className="list-group-item">Morbi leo risus</li>
                            <li className="list-group-item">Porta ac consectetur ac</li>
                            <li className="list-group-item">Vestibulum at eros</li>
                        </ul>
                    </div>

                </Row>
            </Container>
        );
    }
};

const mapStateToProps = store => ({
    item: store.items.items[0]
});

export default connect(mapStateToProps,{getItem, clearItems, clearComments})(ViewItem);