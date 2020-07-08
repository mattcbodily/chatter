import React, {Component} from 'react';
import {connect} from 'react-redux';
import MessageDisplay from '../MessageDisplay/MessageDisplay'; 

class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages: []
        }
    }

    render(){
        return (
            <div className='chat'>
                
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Chat);