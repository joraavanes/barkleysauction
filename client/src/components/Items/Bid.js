import React, { Component } from 'react'
import styles from './styles/Bid.scss'

class Bid extends Component {

    handleBidSubmit = e => {
        e.preventDefault();
    }

    render() {
        return (
            <>
                <h2>Your Bid</h2>
                <form onSubmit={this.handleBidSubmit} className={styles.BidForm}>
                    <input type="number" step="0.01" className={styles.BidPrice} name="BidPrice" id="BidPrice"/>
                    <button type="submit" value="Add Bid" className={styles.BidSubmitBtn} id="bid-submit-btn">
                        Add Bid
                        {this.props.loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} 
                    </button>
                </form>
                
            </>
        )
    }
};

export default Bid;