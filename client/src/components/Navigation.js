import React from 'react'
import {Container,Row,Col,Navbar,NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'

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
                            <NavbarToggler onClick={this.toggle} />
                            <div className="spinner-grow" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
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
