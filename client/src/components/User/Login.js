import React from 'react';
import { Container, Row, Button } from 'reactstrap'
import banner from '../../media/login-banner.png'

const Login = props => (
    <Container fluid={true}>
        <Row>
            <div className="col-12 col-sm-10 offset-sm-1">
                <h1>Login</h1>
                <hr/>
                <Row>
                    <div className="col-12 col-sm-6">
                        <p>You can login though the form below. You can also login through your facebook or twitter account.</p>
                        <form>
                            <p>
                                <input type="text" className="form-control" placeholder="Username or Email"/>
                            </p>
                            <p>
                                <input type="text" className="form-control" placeholder="Password"/>
                            </p>
                            <p>
                                <Button color="primary">Login</Button>
                            </p>
                        </form>
                    </div>
                    <div className="col-12 col-sm-6">
                        <h2 className="text-center">
                            Welcome to Barkley's
                        </h2>
                        <Row>
                            <div className="col-10 offset-1">
                                <img src={banner} className="img-fluid mx-auto d-block"/>
                            </div>
                        </Row>
                        <p>
                        Lorem ipsum dolor sit amet, quas eligendi per ut, in pri epicuri probatus. Te vel vocibus placerat scripserit, sit stet qualisque adversarium in.
                        </p>
                    </div>
                </Row>
            </div>
        </Row>
    </Container>
);

export default Login;