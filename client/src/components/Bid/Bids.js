import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

const Bids = () => {
    const params = useParams();
    console.log(params);
    
    return(
        <div>Bids</div>
    );
};

const mapStateToProps = state => ({
    bids: state.bid.bids
});

export default connect(mapStateToProps, {})(Bids);