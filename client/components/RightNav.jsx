import React, { Component } from "react";

import LiveChat from "./LiveChat";
import io from "socket.io-client";
let socket;
socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"]
});

import axios from "axios";

class RightNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderChat: false,
      messages: [],
      history: []
    };
    this.renderChat = this.renderChat.bind(this);
    this.sendChat = this.sendChat.bind(this);
    // this.toggleChatBox = this.toggleChatBox.bind(this)
  }

  componentDidMount() {
    // GET PREVIOUS MESSAGES HERE
    axios.get("/api/chat/getMessages").then(({ data }) => {
      // filter the data so the messages dont overlap
      this.setState(prevState => ({
        history: prevState.history.concat(data)
      }));
      // use date constructor to filter out the date
    });

    socket.on("chat", message => {
      // console.log("sock on cm", message);
      this.setState(prevState => ({
        messages: prevState.messages.concat(message)
      }));

      // spot where frontend makes a post request to log chat in database
      console.log(
        "this is the state" + this.props.userId,
        this.props.userName,
        message.messages
      );
      axios
        .post("/api/chat/newMessage", {
          userId: this.props.userId,
          userName: this.props.userName,
          message: message.messages
        })
        .then(({ data }) => {
          console.log(data);
        });
    });
  }

  renderChat() {
    console.log("in render chat");
    if (!this.state.renderChat){
      this.setState({ renderChat: true });
      } else {
        this.setState({ renderChat: false });
      }
  }

  // Socket send chat action
  sendChat(value) {
    console.log("in send chat");
    socket.emit("chat", value);
  }
  render() {
    let chatBox;
    if (this.state.renderChat) {
      chatBox = (
        <div>
          <LiveChat
            sendChat={this.sendChat}
            messages={this.state.messages}
            userName={this.props.userName}
            userId={this.props.userId}
            userAvatar={this.props.userAvatar}
            history={this.state.history}
          />
          <button
            onClick={() => this.renderChat()}
            id="chatBtn"
            className="btn btn-success"
          >
            Close
          </button>
        </div>
      );
    } else {
      chatBox = (
      <div>
        <button
          onClick={() => this.renderChat()}
          id="chatBtn"
          className="btn btn-success"
        >
          Chat
        </button>
      </div>
      );
    }

    return (
      <div className="rightNav">
        {/* <div className="rightBar"> */}
        <img
          src="../../img/logo2.png"
          width="250px"
          height="60px"
          className="logo"
          alt="Snap Desk Logo"
        ></img>
        <div className="rightField">
          Active Tickets: {this.props.ticketsCount}
        </div>
        <div className="rightField">
          Resolved Tickets: {this.props.resolvedTickets}
        </div>
        <div className="chatContainer">
          {chatBox}
          {/* <button
            onClick={() => this.renderChat()}
            id="chatBtn"
            className="btn btn-success"
          >
            Chat
          </button> */}
        </div>
        {/* </div> */}
      </div>
    );
  }
}

export default RightNav;
