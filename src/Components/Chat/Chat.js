import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import MessageDisplay from '../MessageDisplay/MessageDisplay'; 

class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            messageInput: ''
        }
    }

    componentDidMount(){
        this.socket = io('http://localhost:3333');
        this.socket.on('room joined', data => {
            this.joinSuccess(data)
          })
        this.socket.on('message dispatched', data => {
            this.updateMessages(data);
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.joinRoom();
        }
    }

    componentWillUnmount(){
        this.socket.disconnect()
    }

    joinRoom = async() => {
        this.socket.emit('join room', {
            group: +this.props.match.params.id
        })
    }

    joinSuccess(messages) {
        this.setState({
          messages
        })
    }

    handleInput = (val) => {
        this.setState({messageInput: val})
    }

    sendMessage = () => {
        this.socket.emit('message sent', {
          message: this.state.messageInput,
          sender: this.props.user.user_id,
          group: +this.props.match.params.id
        })

        this.setState({messageInput: ''})
    }

    updateMessages = (messages) => {
        this.setState({
          messages
        })
    }

    render(){
        console.log(this.props)
        return (
            <div className='chat'>
                <Switch>
                    <Route exact path='/chat' render={props => <MessageDisplay {...props} messages={this.state.messages}/>}/>
                    <Route path='/chat/:id' render={props => <MessageDisplay {...props} messages={this.state.messages}/>}/>
                </Switch>
                <section className='message-bar'>
                    <input value={this.state.messageInput} onChange={e => this.handleInput(e.target.value)}/>
                    <button onClick={this.sendMessage}>Send</button>
                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Chat);