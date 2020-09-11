import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {Container, Button, Row, Col} from 'reactstrap'
import axios from 'axios'
import debounce from 'lodash.debounce'
import {getItems,clearItems,addPageNumber,resetPageNumber} from '../redux/actions/itemActions'
import SearchProduct from './SearchProduct'
import Items from './Items/Items'

// import {products} from './mock/mock'
// import img from '../media/avatar.png'

class App extends React.Component{
    state = {
        pageTitle: 'Welcome to Barkley\'s Store',
        filteredItems: [],
        pageNumber: 0
    };

    handleHeader = headerTitle => {
        // const target = e.target;
        
        if(headerTitle !== ''){
            const filteredItems = this.props.products.filter(item => item.title.includes(headerTitle));
            this.setState(() => ({ filteredItems }));
        }else{
            this.setState(() => ({ filteredItems: this.props.products }));
        }

        headerTitle  = headerTitle !== '' ? `Searched for: ${headerTitle}`: 'Welcome to Barkley\'s Store';
        this.setState(() => ({pageTitle: headerTitle}));
    }

    handleWindowScroll = () => {
        console.log('app scrolling');
        if(window.innerHeight + document.documentElement.scrollTop == document.documentElement.offsetHeight){
            console.log('Needs to load more');

            this.props.getItems(this.props.pageNumber);
            this.props.addPageNumber();
        }
    }
    
    componentDidMount = () => {
        this.props.getItems(this.props.pageNumber);
        this.props.addPageNumber();
        window.onscroll = debounce(this.handleWindowScroll, 1000);
    }

    getSnapshotBeforeUpdate = (prevProps, prevState) => {
        console.log('getSnapshotBeforeUpdate');
        // if(prevProps.products.length < this.props.products.length){
        //     console.log('debounced');
        //     // window.addEventListener('scroll', this.handleWindowScroll);
        //     // window.onscroll = debounce(this.handleWindowScroll, 1000);
        //     window.addEventListener('scroll', debounce(this.handleWindowScroll, 1000));
        // }else{
        //     console.log('debounce stopped');
        //     window.removeEventListener('scroll', debounce(this.handleWindowScroll, 1000));
        // }
        return null;
    }

    componentDidUpdate = (prevProps, prevState, snapshot) =>{
        // console.log(prevProps.products);
        // console.log(this.props.products);
        // console.log('new props');
    }

    componentWillUnmount = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.props.clearItems();
        this.props.resetPageNumber();
        // window.removeEventListener('scroll', this.handleWindowScroll);
    }

    render = () => {
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
                {/* {this.props.products.length !== 0 && this.props.loading && ( */}
                    <Container>
                        <Row>
                            <div className="col-12 offset-sm-4 col-sm-4 text-center mb-2" style={{marginTop: '2rem'}}>
                                <div role="status" style={{width: '3rem', height: '3rem', borderWidth: '.35em'}} className="spinner-border text-danger">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </Row>
                    </Container>
                {/* )} */}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return{
        products: state.items.items,
        pageNumber: state.items.pageNumber,
        loading: state.items.loading
    }
};

// ReactDOM.render(<App products={products}/>, document.querySelector('#app'));
export default connect(mapStateToProps,{getItems, clearItems, addPageNumber, resetPageNumber})(App);