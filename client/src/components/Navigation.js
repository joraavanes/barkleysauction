import React from 'react'
import {Container,Row,Col,Navbar,NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import {NavLink as RouterLink} from 'react-router-dom'

export default class Navigation extends React.Component{
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
            <Container fluid={true}>
                <Row>
                    <Col>                    
                        <Navbar color="light" light expand="md">
                            <NavbarBrand href="/">Barkley's</NavbarBrand>
                            <div className="spinner-grow" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <RouterLink to="/" className="nav-link">Home</RouterLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/Auction/">Auction</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/Offers">Offers</NavLink>
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
}
