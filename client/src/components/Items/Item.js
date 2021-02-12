import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import bag from '../../media/backpack.jpg'
import toaster from '../../media/toasterWide.jpg'
import Image from '../shared/Image'

const Item = (props) => {
    return (
        <div className="col-12 col-sm-6 col-md-3 col-lg-2">
            <div className="card">
                <NavLink to={`/items/${props.title}/${props.uuid}`}>
                    <Image source={props.imageUrl} cssClass="img-fluid item-img"/>
                    {/* <img src={props.imageUrl || bag} className="img-fluid item-img"/> */}
                    {/* <img src={props.name=='toaster'?toaster:bag} className="img-fluid App__Items_Item-img"/> */}
                    {/* <img src={props.img} className="img-fluid App__Items_Item-img"/> */}
                </NavLink>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
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
                        <span>Starting: </span>
                        <i className="fas fa-pound-sign xs-margin"></i>
                        {props.startingBid.toLocaleString()}
                    </p>
                    <NavLink to={`/items/${props.title}/${props.uuid}`} className="btn btn-primary">
                        See detail
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Item;
