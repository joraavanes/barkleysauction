import React, { Component } from 'react'
import {Container, Row, Col} from 'reactstrap'
import Item from './Item'

export default class Items extends Component {
    render() {
        return (
            <Container fluid={true} className="items-container">
                <Row>
                    {this.props.products.map((product, index) => {
                        return(
                            <Item {...product} key={index}/>
                        )
                    })}
                </Row>
            </Container>
        )
    }
}
