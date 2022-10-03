import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { getBids, clearBids } from '../../redux/actions/bidActions'
import RandomAvatar from '../shared/RandomAvatar'

const Bids = ({getBids, clearBids, bids, item, addedBid, loading}) => {
    const {uuid} = useParams();
    
    useEffect(() => {
        getBids(uuid);

        return () => clearBids();
    }, []);

    useEffect(()=> getBids(uuid), [addedBid]);

    const bidDate = timestamp => {

        const currentTime = moment();
        
        const minutes = currentTime.diff(timestamp, 'minutes');
        const hours = currentTime.diff(timestamp, 'hours');
        const days = currentTime.diff(timestamp, 'days');
        const weeks = currentTime.diff(timestamp, 'weeks');

        if(weeks) return  weeks == 1 ? `a week ago` : `${weeks} weeks ago`;
        if(days) return days == 1 ? `a day ago` : `${days} days ago`;
        if(hours) return hours == 1 ? `an hour ago` : `${hours} hours ago`;
        if(minutes) return minutes == 1 ? `a minute ago` : `${minutes} minutes ago`;
        
        return 'a few moments ago';
    }

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
                                    has bid <i className="fas fa-pound-sign xs-margin"></i>{bid.bidPrice.toLocaleString()} - {bidDate(bid.bidDate)}
                                </div>
                            </div>
                        </li>
                    ))}
                    
                    {bids.slice(4,9) && bids.slice(4,9).map(bid => (
                        <li className="list-group-item" key={bid._id}>{bid.user.name} has bid <i className="fas fa-pound-sign xs-margin"></i>{bid.bidPrice} - {bidDate(bid.bidDate)}</li>
                    ))}
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