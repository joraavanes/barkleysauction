import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {Container, Button, Row, Col} from 'reactstrap'
import axios from 'axios'
import {getItems,clearItems} from '../redux/actions/itemActions'
import SearchProduct from './SearchProduct'
import Items from './Items'

// import {products} from './mock/mock'
// import img from '../media/avatar.png'

class App extends React.Component{
    state = {
        pageTitle: 'Welcome to Barkley\'s Store',
        filteredItems: []
    };

    handleHeader = headerTitle => {
        // const target = e.target;
        
        if(headerTitle !== ''){
            const filteredItems = this.props.products.filter(item => item.name.includes(headerTitle));
            this.setState(() => ({ filteredItems }));
        }else{
            this.setState(() => ({ filteredItems: this.props.products }));
        }

        headerTitle  = headerTitle !== '' ? `Searched for: ${headerTitle}`: 'Welcome to Barkley\'s Store';
        this.setState(() => ({pageTitle: headerTitle}));
    }

    componentDidMount = () => {
        // axios.get('http://localhost:3000/mock/products')
        //     .then(res => {
        //         if(res.data){
        //             this.setState(() => ({filteredItems: res.data}));
        //         }
        //     })
        //     .catch(err => console.log(err));
        this.props.getItems();
    }

    componentWillUnmount(){
        this.props.clearItems();
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
                <Items products={this.props.products}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return{
        products: state.items.items
    }
};

// ReactDOM.render(<App products={products}/>, document.querySelector('#app'));
export default connect(mapStateToProps,{getItems,clearItems})(App);