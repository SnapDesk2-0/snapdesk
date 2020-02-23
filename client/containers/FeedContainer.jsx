/**
 * ************************************
 *
 * @module  FeedContainer
 * @author
 * @date
 * @description container that renders TicketBox and TicketCreator
 *
 * ************************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import MenteeTicketBox from '../components/MenteeTicketBox';
import BystanderTicketBox from '../components/BystanderTicketBox';
import TicketCreator from '../components/TicketCreator';
// import { render } from 'node-sass';

const mapStateToProps = state => ({
  messageInput: state.tickets.messageInput,
  messageRating: state.tickets.messageRating,
  activeTickets: state.tickets.activeTickets
});

const mapDispatchToProps = dispatch => ({
  postTicket: () => dispatch(actions.postTicket()),
  updateMessage: (event) => dispatch(actions.updateMessage(event.target.value)),
  updateRating: (event) => dispatch(actions.updateRating(parseInt(event.target.value))),
})

class FeedContainer extends Component {
  constructor(props) {
    super(props);
  }
  
  render() { 
    // if there are no active tickets, display a message in the background saying nothing here
    // do not render it when a ticket is added
    
    //build activeTickets list
    //later add conditionals to check which box should be rendered based on the posterId vs logged in user
    const activeTickets = [];

    for (let i = 0; i < this.props.activeTickets.length; i++) {
      activeTickets.push(<MenteeTicketBox 
        messageInput={this.props.activeTickets[i].messageInput}
        messageRating={this.props.activeTickets[i].messageRating} />)
    }
    
    return(
      <div>
      <div className="ticketDisplay">
        {/* map buildFeed to tickets array */}
        {/* <BystanderTicketBox /> */}
        {activeTickets}
      </div>
      <div className="ticketCreator">
        <TicketCreator {...this.props} />
      </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer); 