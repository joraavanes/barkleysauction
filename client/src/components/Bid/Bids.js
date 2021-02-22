import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBids } from '../../redux/actions/bidActions'

const Bids = ({getBids}) => {
    const {uuid} = useParams();
    
    useEffect(() => {
        getBids(uuid);
    },[]);
    
    return(
        <div>Bids</div>
    );
};

const mapStateToProps = state => ({
    bids: state.bids.bids
});

export default connect(mapStateToProps, {getBids})(Bids);