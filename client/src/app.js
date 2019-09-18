import React from 'react'
import ReactDOM from 'react-dom'
import {Container, Button, Row, Col} from 'reactstrap'
import Navigation from './components/Navigation'
import SearchProduct from './components/SearchProduct'
import Items from './components/Items'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/custom.scss'

import {products} from './mock/mock'

// import img from './assets/mac.jpg'

class App extends React.Component{
    state = {
        pageTitle: 'Welcome to Barkley\'s Store',
        filteredItems: this.props.products
    };

    handleHeader = headerTitle => {
        // const target = e.target;
        
        if(headerTitle !== ''){
            const filteredItems = this.props.products.filter(item => item.name.includes(headerTitle));
            this.setState(() => ({ filteredItems }));
        }else{
            this.setState(() => ({ filteredItems: this.props.products }));
        }

        headerTitle  = headerTitle !== '' ? headerTitle: 'Welcome to Barkley\'s Store';
        this.setState(() => ({pageTitle: headerTitle}));
    }

    render(){
        return(
            <React.Fragment>
                <Navigation/>
                <SearchProduct handleHeader={this.handleHeader}/>
                <Container>
                    <Row>
                        {/*
                        <Col>
                             <form onSubmit={this.handleFormSubmit}>
                                <div className="form=group">
                                    <input type="text" className="form-control" id="message" name="message" onChange={this.handleHeader} onCopy={this.handleCopyText}/>
                                </div>
                                <p>
                                    <Button type="submit">Send</Button>
                                </p>
                            </form> 
                        </Col>*/}
                        <Col>
                            <h2 className="text-center">{this.state.pageTitle}</h2>
                            {/*<input type="hidden" name="year" id="year" value={new Date().valueOf()}/> */}
                            {/* <div style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
                                <Button color="success" onClick={this.handleWelcome}>click on me</Button>
                            </div> */}
                            {/* <img src={img}/> */}
                        </Col>
                    </Row>
                </Container>
                <Items products={this.state.filteredItems}/>
            </React.Fragment>
        );
    }
}



ReactDOM.render(<App products={products}/>, document.querySelector('#app'));