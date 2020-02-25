import React, { Component, Fragment } from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

import { Menu, MenuItem, IconButton, Tooltip, Typography, Badge } from "@material-ui/core";

import NotificationsIcon from "@material-ui/icons/Notifications";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import ChatIcon from "@material-ui/icons/Chat";

class Notifications extends Component {
  state = {
    anchorEl: null,
  };

  handleOpen = e => {
    this.setState({ anchorEl: e.target });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton aria-owns={anchorEl ? "simple-menu" : undefined} aria-haspopup="true" onClick={this.handleOpen}>
            <NotificationsIcon />
          </IconButton>
        </Tooltip>
      </Fragment>
    );
  }
}

export default Notifications
