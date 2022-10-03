import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { getAllUsers } from '../../redux/actions/userActions'
import DashboardNav from './DashboardNav'

import styles from './styles/Dashboard.scss'

const User = props => {

    const loader = (<div className="spinner-border text-danger" role="status">
                <span className="sr-only">Loading...</span>
            </div>);

    useEffect(() => {
        props.getAllUsers(props.user.token);
    
    }, []);

    return (
        <Container fluid={true} className={styles.containerFluid}>
            <Row>
                <div className="col-12 col-sm-2" style={{marginLeft: 0, paddingLeft: 0}}>
                    <DashboardNav/>
                </div>
                <div className="col-10">
                    <h2>Users</h2>
                    {props.users.length == 0 ? loader : (

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className="bg-pink">Email</th>
                                    <th scope="col" className="bg-pink">Name</th>
                                    <th scope="col" className="bg-pink">Surname</th>
                                    <th scope="col" className="bg-pink">Edit/Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.users.length != 0 &&
                                    props.users.map(user => (
                                        <tr key={user._id}>
                                            <td>{user.email}</td>
                                            <td>{user.name}</td>
                                            <td>{user.surname}</td>
                                            <td>
                                                <NavLink className="btn btn-warning btn-sm" to={`/dashboard/items/edit-item/${user._id}`}>Edit</NavLink>
                                                <button className="btn btn-warning btn-sm ml-2">Reset password</button>
                                                <button
                                                    className="btn btn-danger btn-sm ml-2" 
                                                    data-uuid={user.uuid}
                                                    data-title={user.title}>
                                                        Remove
                                                </button>
                                            </td>
                                        </tr>
                                        // <li key={user._id}>{user.email} - {user.name} - {user.surname}</li>
                                    ))
                                }
                            </tbody>
                        </table>
                    )}
                </div>
            </Row>
        </Container>
    );
};

const mapStateToProps = state => ({
    users: state.users.users,
    user: state.auth[0]
});

export default connect(mapStateToProps, { getAllUsers })(User);