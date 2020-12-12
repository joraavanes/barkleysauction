import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row } from 'reactstrap'
import { getAllUsers } from '../../redux/actions/userActions'

const User = props => {

    const loader = (<div className="spinner-border text-danger" role="status">
                <span className="sr-only">Loading...</span>
            </div>);

    useEffect(() => {
        props.getAllUsers(props.user.token);
    
    }, []);

    return (
        <Container>
            <Row>
                <h2>Users</h2>
                {props.users.length == 0 ? (
                    <div className="spinner-border text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <div>
                        {props.users.map(user => (
                            <li key={user._id}>{user.email} - {user.name} - {user.surname}</li>
                        ))}
                    </div>
                )}
            </Row>
        </Container>
    );
};

const mapStateToProps = state => ({
    users: state.users.users,
    user: state.auth[0]
});

export default connect(mapStateToProps, { getAllUsers })(User);