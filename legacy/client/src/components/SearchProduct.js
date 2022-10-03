import React, { Component } from 'react'
import {Container,Row,Col,FormGroup, Form} from 'reactstrap'
import {getItemsByName} from '../redux/actions/itemActions'
import {connect} from 'react-redux'
import debounce from 'lodash.debounce'

const productSearchStyle = {
    marginTop: 30
}

class SearchProduct extends Component {
    searchText = React.createRef();

    searchItems = value => {
        const searchText = this.searchText.current.value;
        this.props.getItemsByName(searchText);
    }

    // handleHeader = e => {
    //     let target = e.target;
    //     let value = target.value;

    //     const search = debounce(this.searchItems, 1000);
    // }

    handleCopyText = e => {
        alert('text copied');
    }

    handleSubmit = e => e.preventDefault();

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={{ size: 10, offset: 1}}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup style={productSearchStyle}>
                                <input
                                    type="text"
                                    className="form-control search"
                                    ref={this.searchText}
                                    name="productSearch" 
                                    id="productSearch" 
                                    placeholder="Find your product here. iPhone, Jacket.etc."
                                    autoComplete="off"
                                    onChange={debounce(this.searchItems, 1000)}
                                    onCopy={this.handleCopyText}
                                />
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(null,{getItemsByName})(SearchProduct);
