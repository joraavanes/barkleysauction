import React from 'react'
import { Container, Row, Card, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        
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
                    <div className="col-6">
                        <NavLink to="/Dashboard/Items/list-an-item" className="btn btn-primary">Sell your object</NavLink>
                    </div>
                    <div className="col-6">
                        
                    </div>
                    
                </Row>
            </Container>
        );
    };
}

export default Dashboard;