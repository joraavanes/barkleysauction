import React from 'react'
import {Container,Row,Col,Navbar,NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import { toggleLoginModal } from '../../redux/actions/pageStateActions'
import { logout } from '../../redux/actions/authActions'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

const style = {
    position: 'relative',
    boxShadow: '0 6px 8px 1px #ddd',
    zIndex: 200
};

class Navigation extends React.Component{
    state = {
        isOpen: false
    };

    // toggle login modal
    handleLoginModal = () => {
        this.props.toggleLoginModal();
    }   

    handleLogout = () => {
        this.props.logout(this.props.tokens[0].token);
    }

    // toggle navigation menu in mobile screen
    toggle = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    render(){
        return (
            <Container fluid={true} id="navigation" style={style}>
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
                                        <NavLink to="/" className="nav-link" exact={true}>Auction</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink to="/YourBids" className="nav-link">Your bids</NavLink>
                                    </NavItem>
                                    <NavItem>

                                        <NavLink to="/Dashboard" className="nav-link">Dashboard</NavLink>
                                    </NavItem>
                                    {!this.props.auth &&
                                        <NavItem>
                                            <a href="#" className="nav-link" onClick={this.handleLoginModal}>Login</a>
                                        </NavItem>
                                    }
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                        Settings
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            {this.props.auth && 
                                                <DropdownItem>
                                                    Hi {this.props.auth.name}
                                                </DropdownItem>
                                            }
                                            <DropdownItem>
                                                User Settings
                                            </DropdownItem>
                                            <DropdownItem>
                                                Theme
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            {!this.props.auth ? (
                                                <NavLink to="/Login" className="dropdown-item" role="menuitem">
                                                    Login
                                                </NavLink>
                                            ):(
                                                <DropdownItem onClick={this.handleLogout}>
                                                    Logout
                                                </DropdownItem>
                                            )}
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

const mapStateToProps = store => ({
    loading: store.items.loading,
    tokens: store.auth,
    auth: store.auth[0]
});

export default connect(mapStateToProps,{toggleLoginModal, logout})(Navigation);