import React from 'react'
import ReactDOM from 'react-dom'
import {Container, Button, Row, Col} from 'reactstrap'
import Navigation from './components/Navigation'
import SearchProduct from './components/SearchProduct'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/custom.scss'

// import img from './assets/mac.jpg'

class App extends React.Component{
    state = {
        pageTitle: 'Welcome to Barkley\'s Store - 2019'
    };

    handleWelcome = e => {
        const target = e.target;
        const path = e.target.path;
        alert(target.textContent);     
        console.log(path);
    }

    handleHeader = e => {
        const target = e.target;
        const value  = target.value && target.value !== '' ? target.value: 'Welcome to Barkley\'s Store'
        this.setState(() => ({pageTitle: value}));
    }

    handleFormSubmit = e => {
        e.preventDefault();
    }

    render(){
        return(
            <React.Fragment>
                <Navigation/>
                <SearchProduct/>
                <Container>
                    <Row>
                        <Col>
                            <form onSubmit={this.handleFormSubmit}>
                                <div className="form=group">
                                    <input type="text" className="form-control" id="message" name="message" onChange={this.handleHeader}/>
                                </div>
                                <p>
                                    {/* <input type="submit" value="Send"/> */}
                                    <Button type="submit">Send</Button>
                                </p>
                            </form>
                        </Col>
                        <Col>
                            <h2>{this.state.pageTitle}</h2>
                            <input type="hidden" name="year" id="year" value={new Date().valueOf()}/>
                            {/* <div style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
                                <Button color="success" onClick={this.handleWelcome}>click on me</Button>
                            </div> */}
                            {/* <img src={img}/> */}
                        </Col>
                    </Row>
                </Container>
                <Container fluid={true}>
                    <Row>
                        <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Container>

            </React.Fragment>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('#app'));