import React, { Component } from 'react'
import {Container, Row, Col} from 'reactstrap'
import Item from './Item'

const Items = props => (
    <Container fluid={true} className="items-container">
        <Row>
            {props.products && props.products.map((product, index) => {
                return(
                    <Item {...product} key={index}/>
                )
            })}
        </Row>
    </Container>
);

export default Items;