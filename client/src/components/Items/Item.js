import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import bag from '../../media/backpack.jpg'
import toaster from '../../media/toasterWide.jpg'

const Item = (props) => {
    return (
        // <div>
        //     <h3>{name} - {price.toLocaleString()}</h3>
        // </div>
        <div className="col-12 col-sm-6 col-md-3 col-lg-2">
            <div className="card">
                <NavLink to={`/items/${props.name}/${props.id}`}>
                    <img src={props.name=='toaster'?toaster:bag} className="img-fluid App__Items_Item-img"/>
                    {/* <img src={props.img} className="img-fluid App__Items_Item-img"/> */}
                </NavLink>
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                    
                    {props.description.length > 50 ? (
                        <p className="">
                            {props.description.slice(0, 50) + ' ...'}
                        </p>
                    ):(
                        <p className="">
                            {props.description}
                        </p>
                    )}
                    <p>
                        <span>Offering: </span>
                        <i className="fas fa-pound-sign xs-margin"></i>
                        {props.price.toLocaleString()}
                    </p>
                    <NavLink to={`/items/${props.name}/${props.id}`} className="btn btn-primary">
                        See detail
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Item;
