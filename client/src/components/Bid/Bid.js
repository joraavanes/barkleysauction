import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { addBid } from '../../redux/actions/bidActions'
import styles from './styles/Bid.scss'

const Bid = ({item, auth, addBid, loading}) => {

    const handleBidSubmit = e => {
        e.preventDefault();
        const bidPrice = e.target.elements.BidPrice.value;
        
        console.log(item.uuid, bidPrice, auth.token);
        console.log(addBid);
        // addBid(item.uuid, bidPrice, auth.token);
    }

    useEffect(() => {
        
        return () => {
            
        }
    }, [loading])

    return (
        <>
            <h2>Your Bid</h2>
            <form onSubmit={handleBidSubmit} className={styles.BidForm}>
                <input type="number" step="0.01" className={styles.BidPrice} name="BidPrice" id="BidPrice" placeholder="e.g. 29.99" autoComplete="off"/>
                <button type="submit" value="Add Bid" className={styles.BidSubmitBtn} id="bid-submit-btn">
                    Add Bid
                    {/* <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> */}
                </button>
            </form>
            
        </>
    );
};

const mapStateToProps = state => ({
    auth: state.auth[0],
    item: state.items.item,
    loading: state.bids.loading
});

export default connect(mapStateToProps, {addBid})(Bid);