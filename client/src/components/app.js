import React from 'react'
import {connect} from 'react-redux'
import {Container, Button, Row, Col} from 'reactstrap'
import debounce from 'lodash.debounce'
import {getItems,clearItems,addPageNumber,resetPageNumber,allFetched} from '../redux/actions/itemActions'
import { clearSearchText } from '../redux/actions/filterActions'
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

    handleWindowScroll = () => {
        console.log('app scrolling');
        const threshold = window.innerHeight + document.documentElement.scrollTop == document.documentElement.offsetHeight;

        if(threshold && this.props.pageNumber != undefined){
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
        // console.log('getSnapshotBeforeUpdate', this.props.products);
        // if(prevProps.products.length < this.props.products.length){
        //     console.log('debounced');
        //     // window.addEventListener('scroll', this.handleWindowScroll);
        //     // window.onscroll = debounce(this.handleWindowScroll, 1000);
        //     window.addEventListener('scroll', debounce(this.handleWindowScroll, 1000));
        // }else{
        //     console.log('debounce stopped');
        //     window.removeEventListener('scroll', debounce(this.handleWindowScroll, 1000));
        // }
        return this.props.products.length;
    }

    componentDidUpdate = (prevProps, prevState, snapshot) =>{
        console.log('componentDidUpdate', this.props.loading);
        if(prevProps.products.length < this.props.products.length){
            console.log('NEW PRODUCTS');
        }

        console.log(prevProps.products.length, this.props.products.length, this.props.loading)
        if(prevProps.products.length == this.props.products.length && !this.props.loading){
            console.log(prevProps.products.length, this.props.products.length, this.props.loading)
            this.props.allFetched();
        }

        if(this.props.pageNumber == 0 && this.props.searchText == '' && this.props.products.length == 0){
            this.props.resetPageNumber();
            this.props.getItems(this.props.pageNumber);
            this.props.addPageNumber();
        }
    }

    componentWillUnmount = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.props.clearItems();
        this.props.resetPageNumber();
        this.props.clearSearchText();
        // window.removeEventListener('scroll', this.handleWindowScroll);
    }

    render = () => {
        const {searchText, pageNumber} = this.props;
        const {pageTitle} = this.state;

        return(
            <React.Fragment>                
                <SearchProduct/>
                <Container>
                    <Row>
                        <Col>
                            <h2 className="text-center pt-3 pb-3">
                                {searchText !== '' ? <>Searched for: <span className="badge badge-warning bg-pink text-light">{searchText}</span></> : pageTitle}
                            </h2>                            
                        </Col>
                    </Row>
                </Container>
                <Items products={this.props.products}/>
                {pageNumber != undefined && (
                    <Container>
                        <Row>
                            <div className="col-12 offset-sm-4 col-sm-4 text-center mt-4">
                                <div role="status" style={{width: '3rem', height: '3rem', borderWidth: '.35em'}} className="spinner-border text-danger">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </Row>
                    </Container>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return{
        products: state.items.items,
        pageNumber: state.items.pageNumber,
        searchText: state.filters.searchText,
        loading: state.items.loading
    }
};

// ReactDOM.render(<App products={products}/>, document.querySelector('#app'));
export default connect(mapStateToProps,{getItems, clearItems, addPageNumber, resetPageNumber, allFetched, clearSearchText})(App);