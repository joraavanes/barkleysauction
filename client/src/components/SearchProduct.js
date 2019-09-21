import React, { Component } from 'react'
import {Container,Row,Col,FormGroup, Form} from 'reactstrap'

const productSearchStyle = {
    marginTop: 30
}

export default class SearchProduct extends Component {

    handleHeader = e => {
        let target = e.target;
        let value = target.value;
        this.props.handleHeader(value);
    }

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
                                    name="productSearch" 
                                    id="productSearch" 
                                    placeholder="Find your product here. iPhone, Jacket.etc."
                                    onChange={this.handleHeader}
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
