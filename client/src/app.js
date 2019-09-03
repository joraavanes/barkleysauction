import React from 'react'
import ReactDOM from 'react-dom'
import {Container, Button} from 'reactstrap';

class App extends React.Component{
    handleWelcome = e => {
        e.preventDefault();
        console.log(e);
    }

    render(){
        return(

            <Container onClick={this.handleWelcome}>
                <h2>Welcome to Barkley's Store</h2>
                <input type="hidden" name="year" id="year" value={new Date().valueOf()}/>
                <Button color="info">click on me</Button>
            </Container>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('#app'));