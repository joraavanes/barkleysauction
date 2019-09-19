import React, { Component } from 'react'

export default class viewItem extends Component {
    render() {
        return (
            <div>
                <h5 className="card-title">{this.props.name}</h5>
                This is where you can see details
            </div>
        );
    }
}
