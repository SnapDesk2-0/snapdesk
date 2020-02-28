import React from "react";
import { Nav } from "react-bootstrap";

const LeftNav = props => (
  <div
    className="d-flex justify-content-center flex-direct:column"
    id="leftNav"
  >
    <div className="logo">
      {/* <img
        src="../../img/logo2.png"
        width="250px"
        height="60px"
        className="d-inline-block align-top mx-auto"
        alt="Snap Desk Logo"
      ></img> */}
    </div>
    <div className="profilePic">
      {/* {" "} */}
      <img
        id="profile"
        src={props.url}
        width="250px"
        height="250px"
        className="d-inline-block align-top rounded-circle mx-auto"
        alt="Snap Desk Logo"
      ></img>
      <h4 className="userNameWrap " id="user-Name" width="200px">
        {props.userName}{" "}
      </h4>
    </div>
    <button
      id="logoutButton"
      className="btn btn-success btn-sm "
      width="100px"
      onClick={props.logOut}
    >
      Logout
    </button>
  </div>
);

export default LeftNav;
