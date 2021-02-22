import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBids, clearBids } from '../../redux/actions/bidActions'
import RandomAvatar from '../shared/RandomAvatar'

const Bids = ({getBids, clearBids, bids, item, addedBid, loading}) => {
    const {uuid} = useParams();
    
    useEffect(() => {
        getBids(uuid);

        return () => clearBids();
    }, []);

    useEffect(()=> getBids(uuid), [addedBid]);

    return(
        <>
            <h2 className="bid-title">Last bids
                <span>for {item && item.title}</span>
            </h2>

            <div className="d-block" style={{minHeight: 300}}>
                {loading && (
                    <div className="bids-loader">
                        <div role="status" className="spinner-border text-danger">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}

                {!loading && bids.length == 0 && <p>No bids has received yet!</p>}

                <ul className="list-group list-group-flush" {...(loading ? { style: {filter: 'blur(1.5px)'}}: {})}>
                    {bids && bids.slice(0,4).map(bid => (
                        <li className="list-group-item" key={bid._id}>
                            <div className="media">
                                {/* <img src={avatar1.substr(2,avatar1.length+1)} className="mr-3 avatar-img"/>*/}
                                <RandomAvatar width="40px" height="40px"/>
                                <div className="media-body ml-3">
                                    <h5 className="mt-0">{bid.user.name}</h5>
                                    bids <i className="fas fa-pound-sign xs-margin"></i>{bid.bidPrice.toLocaleString()} - a few minutes ago
                                </div>
                            </div>
                        </li>
                    ))}
                    
                    {bids.slice(4,9) && bids.slice(4,9).map(bid => (
                        <li className="list-group-item" key={bid._id}>{bid.user.name} bids <i className="fas fa-pound-sign xs-margin"></i>{bid.bidPrice}</li>
                    ))}
                    {/* <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Porta ac consectetur ac</li>
                    <li className="list-group-item">Vestibulum at eros</li> */}
                </ul>
            </div>
        </>
    );
};

const mapStateToProps = state => ({
    bids: state.bids.bids,
    addedBid: state.bids.bid,
    loading: state.bids.loading,
    item: state.items.item
});

export default connect(mapStateToProps, {getBids, clearBids})(Bids);