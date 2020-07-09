import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class GroupModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            groupName: '',
            directMessage: false
        }
    }

    createGroup = () => {
        const {groupName, directMessage} = this.state,
              {user_id} = this.props.user,
              {getGroupsFn, modalFn} = this.props;

        axios.post('/api/group', {groupName, directMessage, user_id})
        .then(() => {
            getGroupsFn();
            modalFn();
        })
        .catch(err => console.log(err));
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        const {groupName, directMessage} = this.state;
        return (
            <div className='group-modal'>
                <input value={groupName} name='groupName' onChange={e => this.handleInput(e)}/>
                <input type='checkbox' value={directMessage} name='directMessage' onChange={e => this.handleInput(e)}/>
                <button onClick={this.createGroup}>Create Group</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(GroupModal);