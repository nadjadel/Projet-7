import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import { People, ChatBubble, VideoLibrary, More,Flag } from '@material-ui/icons';

import "./side.css";

export default class Side extends Component {
  render() {
    

    return (

<div className="home__body__sidebarLeft">
  

  <div>
  <Flag
className="icon"
  />
    <span className="label">Pages</span>
  </div>

  <div>
  <People
  className="icon"
  />
    <span className="label">Amis</span>
  </div>

  <div>
  <ChatBubble
  className="icon"
  />
    <span className="label">Messenger</span>
  </div>

  <div>
  <VideoLibrary
  className="icon"
  />
    <span className="label">Videos</span>
  </div>

  <div className="see-more">
  <More
 className="icon"
  />
    <span className="label">voir Plus</span>
  </div>
</div>
    )
  }
}
