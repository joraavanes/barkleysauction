import React, { Component } from 'react'
import {Container,Row,} from 'reactstrap'
import { connect } from 'react-redux';
import {getItem,clearItems} from '../redux/actions/itemActions'
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
    }

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <main className="col-12 col-sm-8">
                        <Row>
                            <div className="col-3">
                                <img src={bag.substr(2,bag.length+1)} className="img-fluid"/>
                            </div>
                            <div className="col-9">
                                {this.props.items.length>0 ? (
                                    <React.Fragment>
                                        <h1>{this.props.items[0].name}</h1>
                                        <h4>Last bid was 235</h4>
                                        <p>{this.props.items[0].price}</p>
                                        <p>{this.props.items[0].sold}</p>
                                        <p>{this.props.items[0].img}</p>
                                    </React.Fragment>
                                ):(
                                    <div>Loading ...</div>
                                )}
                                <h5 className="card-title">{this.props.match.params.name} -- {this.props.match.params.id}</h5>

                                This is where you can see details
                            </div>
                        </Row>
                    </main>
                    <div className="col-12 col-sm-4">
                        <h2 className="bid-title">Last bids
                            <span>for {this.props.items[0] && this.props.items[0].name}</span>
                        </h2>
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
    items: store.items.items
});

export default connect(mapStateToProps,{getItem, clearItems})(ViewItem);