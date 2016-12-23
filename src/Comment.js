import React, { Component } from 'react';
import { getTimestamp } from './Helpers.js';
import profilepic from './user.svg';

/** Component that contains a single comment. */
class Comment extends Component {
  /** Render the component. */
  render() {
    const comment = this.props.comment;

    return (
      <div className={"Comment"}>
        <div className="Side">
          <img src={profilepic} alt={comment.author}/>
        </div>

        <div className="Content">
          <div className="User">
            {comment.author}
          </div>

          <div className="Datetime">
            {getTimestamp(comment.datetime)}
          </div>
          <div className="clear"></div>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

export default Comment;
