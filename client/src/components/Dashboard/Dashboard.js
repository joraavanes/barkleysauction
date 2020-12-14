import React from 'react'
import { Container, Row, Card, Col} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getItems, clearItems } from '../../redux/actions/itemActions';
import ItemDeleteModal from '../../components/Items/itemDeleteModal'
import DashboardNav from './DashboardNav';

class Dashboard extends React.Component{
    state = {
        items: [],
        deleteModal: {
            modalState: false
        },
        error: undefined
    }

    componentDidMount = () => {
        const timestamp = new Date().valueOf();
        this.props.getItems(timestamp, 100);
    }

    componentWillUnmount = () => {
        this.props.clearItems();
    }

    // as it says toggles the delete modal
    // If the remove button clicked does setState with the uuid,Title of item and pushs down to deleteModal component
    // If the item gets removed, cleans the component state and also redux store items then reread the items from server endpoints and redux store
    toggleDeleteModal = (e, itemRemoved) => {
        const uuid = e && e.target.dataset.uuid,
                title = e && e.target.dataset.title;

        if(!this.state.deleteModal.uuid && !this.state.deleteModal.title){
            this.setState(prevState => ({
                deleteModal: { 
                    uuid,
                    title,
                    modalState: !prevState.deleteModal.modalState 
                }
            }));
            this.props.history.push(`/dashboard/items/remove/${uuid}`);
        }

        if(this.state.deleteModal.uuid && this.state.deleteModal.title){
            this.setState({deleteModal: {
                modalState: false,
                uuid: undefined,
                title: undefined
            }});
            this.props.history.push(`/dashboard`);
        }
        
        if(itemRemoved){
            this.props.clearItems();
            this.props.getItems();
        }

    }

    render(){
        return (
            <Container fluid={true}>
                <ItemDeleteModal uuid={this.state.deleteModal.uuid} title={this.state.deleteModal.title} modalState={this.state.deleteModal.modalState} handleModalState={this.toggleDeleteModal}/>                
                {/* <Row>
                    <div className="col-12">
                        <h2>Management Dashboard</h2>
                    </div>
                </Row> */}
                <Row>
                    <div className="col-12 col-sm-2" style={{marginLeft: 0, paddingLeft: 0}}>
                        {/* <NavLink to="/dashboard/Items/list-an-item" className="btn btn-primary">Sell your object</NavLink> */}
                        <DashboardNav/>
                    </div>
                    <div className="col-12 col-sm-10">
                        <h2>Management Dashboard</h2>
                        <h3>Products {this.props.items.length}</h3>
                        <NavLink to="/dashboard/user">User</NavLink>
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
                                                {/* <NavLink 
                                                    className="btn btn-warning btn-sm" 
                                                    to={`/dashboard/items/remove/${item.uuid}`}
                                                    onClick={this.toggleDeleteModal}>
                                                        Remove
                                                </NavLink> */}
                                                <button
                                                    style={{marginLeft: 5}}
                                                    className="btn btn-danger btn-sm" 
                                                    data-uuid={item.uuid}
                                                    data-title={item.title}
                                                    onClick={this.toggleDeleteModal}>
                                                        Remove
                                                </button>
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