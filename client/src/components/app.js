import React from 'react'
import {connect} from 'react-redux'
import {Container, Row, Col} from 'reactstrap'
import debounce from 'lodash.debounce'
import { getItems, clearItems, clearTimestamp, allFetched} from '../redux/actions/itemActions'
import { clearSearchText, defaultSearchState } from '../redux/actions/filterActions'
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

    // Checks if user sees the loading spinner, if so then again calls for new items from server
    handleWindowScroll = () => {
        const threshold = window.innerHeight + document.documentElement.scrollTop >= (document.documentElement.offsetHeight - 58);

        if(threshold && this.props.lastTimestamp != 0){
            this.props.getItems(this.props.lastTimestamp);
        }
    }
    
    // Calls remote server for new items, then udpates lastTimestamp for further items later
    componentDidMount = () => {
        this.props.clearItems();

        const timestamp = new Date().valueOf();
        this.props.getItems(timestamp);

        window.onscroll = debounce(this.handleWindowScroll, 800);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) =>{
        // if(prevProps.products.length < this.props.products.length){
        //     console.log('New Products');
        // }

        // Checks if searching is end then fetch items again
        if(this.props.isSearchingEnd && this.props.searchText == '' && this.props.products.length == 0){
            this.props.defaultSearchState();

            const timestamp = new Date().valueOf();
            this.props.getItems(timestamp);
        }
    }

    // Removes the existing state related to items
    componentWillUnmount = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.props.clearItems();
        this.props.clearTimestamp();
        this.props.clearSearchText();
        this.props.allFetched(false);

        window.onscroll = undefined;
    }

    render = () => {
        const {searchText, lastTimestamp, allItemsFetched} = this.props;
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
                {allItemsFetched == false && (
                    <Container>
                        <Row>
                            <div className="col-12 offset-sm-4 col-sm-4 text-center mt-4 mb-3">
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
        lastTimestamp: state.items.lastTimestamp,
        allItemsFetched: state.items.allItemsFetched,
        isSearchingEnd: state.filters.isSearchingEnd,
        searchText: state.filters.searchText,
        loading: state.items.loading
    }
};

export default connect(mapStateToProps,{getItems, clearItems, clearTimestamp, allFetched, clearSearchText, defaultSearchState})(App);