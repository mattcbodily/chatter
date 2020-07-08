import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class SideMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            chatGroups: []
        }
    }

    render(){
        const {chatGroups} = this.state;
        return (
            <div className='side-menu'>
                {chatGroups.length
                ? chatGroups.map(group => (
                    <Link to={`/chat/${group.id}`}><p key={i}>{group.name}</p></Link>
                ))
                : (
                    <>
                        <p>You don't have any groups!</p>
                        <button>Create a Group</button>
                    </>
                )}
            </div>
        )
    }
}