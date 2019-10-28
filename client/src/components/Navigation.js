import React from 'react'
import {Container,Row,Col,Navbar,NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

class Navigation extends React.Component{
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    render(){
        return (
            <Container fluid={true} id="navigation">
                <Row>
                    <Col>
                        <Navbar expand="md" className="bg-pink">
                            {/* <NavbarBrand href="/">Barkley's</NavbarBrand> */}
                            <NavLink to="/" className="navbar-brand">Barkley's</NavLink>
                            <div className={this.props.loading ? 'spinner-grow active' : 'spinner-grow'} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink to="/" className="nav-link" exact={true}>Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink to="/Auction" className="nav-link">Auction</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink to="/Offers" className="nav-link">Offers</NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                        Settings
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                        <DropdownItem>
                                            User Settings
                                        </DropdownItem>
                                        <DropdownItem>
                                            Theme
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            Login
                                        </DropdownItem>
                                        <DropdownItem>
                                            Logout
                                        </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>                            
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        );
    }
};

const mapStateToProps = state => ({
    loading: state.items.loading
});

export default connect(mapStateToProps)(Navigation);