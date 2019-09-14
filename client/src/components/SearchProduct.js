import React, { Component } from 'react'
import {Container,Row,Col,FormGroup, Form} from 'reactstrap'

const productSearchStyle = {
    marginTop: 30
}

export default class SearchProduct extends Component {
    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col sm={{ size: 10, offset: 1}}>
                        <Form>
                            <FormGroup style={productSearchStyle}>
                                <input type="text" className="form-control" name="productSearch" id="productSearch" placeholder="Find your product here. iPhone, Jacket.etc."/>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
