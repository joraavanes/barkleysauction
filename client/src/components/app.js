import React from 'react'
import ReactDOM from 'react-dom'
import {Container, Button, Row, Col} from 'reactstrap'
import SearchProduct from './SearchProduct'
import Items from './Items'

// import {products} from './mock/mock'

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
                <SearchProduct handleHeader={this.handleHeader}/>
                <Container>
                    <Row>
                        <Col>
                            <h2 className="text-center">{this.state.pageTitle}</h2>
                            {/*<input type="hidden" name="year" id="year" value={new Date().valueOf()}/> */}                            
                            {/* <img src={img}/> */}
                        </Col>
                    </Row>
                </Container>
                <Items products={this.state.filteredItems}/>
            </React.Fragment>
        );
    }
}



// ReactDOM.render(<App products={products}/>, document.querySelector('#app'));
export default App;