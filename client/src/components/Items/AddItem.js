import React, { Component } from 'react'
import { Container, Row, Card, Col } from 'reactstrap';

const spanStyle = {
    fontSize: 18
};

export default class AddItem extends Component {

    handleAddItem = e => {
        e.preventDefault();

        const { title: { value: title }, startingPrice: {value:startingPrice}, description: {value: description}, imageUrl: {value: imageUrl}, thumbnail: {value:thumbnail} } = e.target.elements;
        console.log(title, startingPrice, description, imageUrl, thumbnail);
    }

    render() {
        return (
            <Container>
                <Row>
                    <div className="col-12 col-md-12">
                        <h1>Listing a New Item <span style={spanStyle}>on Barkley's</span></h1>
                        <form onSubmit={this.handleAddItem}>
                            <div className="form-group">
                                <input type="text" name="title" id="title" className="form-control" placeholder="Your object title"/>
                            </div>
                            <div className="form-group">
                                <input type="number" name="startingPrice" id="starginPrice" className="form-control" step="0.01" placeholder="Stargin price"/>
                            </div>
                            <div className="form-group">
                                <textarea className="form-control" name="description" id="description" placeholder="Describe how glamorous your item is" rows="10"></textarea>
                            </div>
                            <div className="form-group">
                                <input type="text" name="imageUrl" id="imageUrl" className="form-control" placeholder="Image"/>
                            </div>
                            <div className="form-group">
                                <input type="text" name="thumbnail" id="thumbnail" className="form-control" placeholder="Image"/>
                            </div>
                            <div>
                                <input type="submit" className="btn btn-primary" value="Add"/>
                            </div>
                        </form>
                    </div>
                </Row>
            </Container>
        )
    }
}
