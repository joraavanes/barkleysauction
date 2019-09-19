import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class Item extends Component {
    render() {
        const {name,price} = this.props.product;
        return (
            // <div>
            //     <h3>{name} - {price.toLocaleString()}</h3>
            // </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-2">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        {/* <a href="#" className="btn btn-primary">See detail</a> */}
                        <NavLink to={`/items/${name}`} className="btn btn-primary">See detail</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}
