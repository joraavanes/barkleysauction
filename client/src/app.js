import React from 'react'
import ReactDOM from 'react-dom'
import {Container, Button} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import img from './assets/mac.jpg'

class App extends React.Component{
    handleWelcome = e => {
        e.preventDefault();
        alert(e);
    }

    render(){
        return(
            <Container onClick={this.handleWelcome}>
                <h2>Welcome to Barkley's Store - 1</h2>
                <input type="hidden" name="year" id="year" value={new Date().valueOf()}/>
                <div style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
                    <Button color="success">click on mee</Button>
                    <img src={img}/>
                </div>
            </Container>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('#app'));