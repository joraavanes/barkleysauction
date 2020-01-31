import React from 'react'
import { Container, Row, Card, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { getItems, clearItems } from '../../redux/actions/itemActions';

class Dashboard extends React.Component{
    state = {
        items: [],
        error: undefined
    }

    componentDidMount = () => {
        this.props.getItems();
    }

    componentWillUnmount = () => {
        this.props.clearItems();
    }

    render(){
        return (
            <Container fluid={true}>
                <Row>
                    <div className="col">
                        <h2>Here you can control the stuff!</h2>                    
                    </div>
                </Row>
                <Row>
                    <div className="col-4">
                        <NavLink to="/Dashboard/Items/list-an-item" className="btn btn-primary">Sell your object</NavLink>
                    </div>
                    <div className="col-8">
                        <h3>Products {this.props.items.length}</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className="bg-pink">#</th>
                                    <th scope="col" className="bg-pink">Title</th>
                                    <th scope="col" className="bg-pink">Starting Bid</th>
                                    <th scope="col" className="bg-pink">Sold</th>
                                    <th scope="col" className="bg-pink">Date</th>
                                    <th scope="col" className="bg-pink">
                                        Edit / Remove
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.items && this.props.items.map((item, index) => {
                                    return (
                                        <tr key={item._id}>
                                            <td scope="row">{index + 1}</td>
                                            <td>{item.title}</td>
                                            <td>{item.startingBid}</td>
                                            <td>{item.sold.toString()}</td>
                                            {/* <td>{new Date(`${item.dateIssued}`).toLocaleDateString()} - {new Date(`${item.dateIssued}`).toLocaleTimeString()}</td> */}
                                            <td>{new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}</td>
                                            <td>
                                                <NavLink className="btn btn-warning btn-sm" to={`/dashboard/items/edit-item/${item.title}/${item.uuid}`}>Edit</NavLink>
                                                <NavLink className="btn btn-warning btn-sm" to="/items/remove">Remove</NavLink>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* <h3>
                            {this.state.items.length}
                        </h3>
                        <h2>{this.state.error && this.state.error}</h2>
                        <ul>
                            {this.state.items.length != 0 && this.state.items.map((item) => {
                                return(
                                    <li key={item._id}>{item.title}</li>
                                );
                            })}
                        </ul> */}
                    </div>
                    
                </Row>
            </Container>
        );
    };
}

const mapStateToProps = store => ({
    items: store.items.items
});

export default connect(mapStateToProps, {getItems, clearItems})(Dashboard);