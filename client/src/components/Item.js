import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

const Item = (props) => {
    return (
        // <div>
        //     <h3>{name} - {price.toLocaleString()}</h3>
        // </div>
        <div className="col-12 col-sm-6 col-md-3 col-lg-2">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <p>
                        <span>Offering: </span>
                        <i className="fas fa-pound-sign xs-margin"></i>
                        {props.price.toLocaleString()}
                    </p>
                    <NavLink to={`/items/${props.name}`} className="btn btn-primary">See detail</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Item;
