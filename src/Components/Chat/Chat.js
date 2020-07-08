import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import MessageDisplay from '../MessageDisplay/MessageDisplay'; 

class Chat extends Component {
    render(){
        return (
            <div className='chat'>
                <Switch>
                    <Route exact path='/chat' render={props => <MessageDisplay {...props}/>}/>
                    <Route exact path='/chat/:id' render={props => <MessageDisplay {...props}/>}/>
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Chat);