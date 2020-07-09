import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import GroupModal from '../GroupModal/GroupModal';

class SideMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            chatGroups: [],
            modalView: false
        }
    }

    componentDidMount(){
        this.getGroups();
    }

    getGroups = () => {
        const {user_id} = this.props.user;

        axios.get(`/api/groups/${user_id}`)
        .then(res => this.setState({chatGroups: res.data}))
        .catch(err => console.log(err));
    }

    toggleModal = () => {
        this.setState(prevState => ({modalView: !prevState.modalView}))
    }

    render(){
        const {chatGroups, modalView} = this.state;
        console.log(chatGroups)
        return (
            <div className='side-menu'>
                {chatGroups.length
                ? chatGroups.map(group => (
                    <Link key={group.group_id} to={`/chat/${group.group_id}`}><p>{group.group_name}</p></Link>
                ))
                : (
                    <>
                        <p>You don't have any groups!</p>
                        <button onClick={this.toggleModal}>Create a Group</button>
                    </>
                )}
                {modalView
                ? <GroupModal getGroupsFn={this.getGroups} modalFn={this.toggleModal}/>
                : null}
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(SideMenu);