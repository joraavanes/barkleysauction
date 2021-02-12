import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { addBid } from '../../redux/actions/bidActions'
import { addError, clearErrors } from '../../redux/actions/errorActions'
import styles from './styles/Bid.scss'

const Bid = ({item, auth, addBid, bidError, clearErrors, loading}) => {
    const [bidPrice, setBidPrice] = useState('');
    const bidButton = useRef();
    const bidPriceInput = useRef();
    
    const handleBidSubmit = e => {
        e.preventDefault();
        
        if(bidPrice==''){
            return;
        }

        bidButton.current.setAttribute('disabled','disabled');
        bidPriceInput.current.setAttribute('disabled','disabled');
        addBid(item.uuid, bidPrice, auth.token);
    }

    useEffect(() => {
        if(!loading){
            bidButton.current.removeAttribute('disabled');
            bidPriceInput.current.removeAttribute('disabled');
            setBidPrice('');
        }
        
    }, [loading]);

    useEffect(()=>{

        return () => clearErrors();
    }, []);

    return (
        <>
            <h2>Your Bid</h2>
            <form onSubmit={handleBidSubmit} className={styles.BidForm}>
                <div className={styles.bidFormGroup}>
                    <input 
                        type="number" 
                        step="0.01" 
                        className={styles.BidPrice} 
                        name="BidPrice" 
                        id="BidPrice" 
                        onChange={e => setBidPrice(e.target.value)} 
                        value={bidPrice} 
                        ref={bidPriceInput}
                        placeholder="e.g. 29.99" 
                        autoComplete="off"
                    />
                    <button 
                        type="submit" 
                        value="Add Bid" 
                        className={styles.BidSubmitBtn} 
                        id="bid-submit-btn" 
                        ref={bidButton}
                    >
                        Add Bid
                        {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                    </button>
                </div>
                {bidError && <p className="text-danger">{bidError}</p>}
            </form>
            
        </>
    );
};

const mapStateToProps = state => ({
    auth: state.auth[0],
    item: state.items.item,
    bidError: state.error.bid,
    loading: state.bids.loading
});

export default connect(mapStateToProps, {addBid, addError, clearErrors})(Bid);