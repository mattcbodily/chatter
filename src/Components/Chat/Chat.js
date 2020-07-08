import React, {Component} from 'react';
import SideMenu from '../SideMenu/SideMenu';
import MessageDisplay from '../MessageDisplay/MessageDisplay'; 

export default class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.location.state.user
        }
    }

    render(){
        return (
            <div className='chat'>
                
            </div>
        )
    }
}