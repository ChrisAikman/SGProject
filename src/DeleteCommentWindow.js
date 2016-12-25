import React, { Component } from 'react';
import CommentToolbutton from './CommentToolbutton.js';

/** Component for handling the delete comment window. */
class DeleteCommentWindow extends Component {
  /** Render the component. */
  render() {
    return (
      <div className="DeleteCommentWarning">
        <div className="Warning">
          Are you sure you want to delete this comment?
          <div className="Buttons">
            <CommentToolbutton
              icon={'fa fa-times'}
              command={'Cancel'}
              onClick={(command) => this.props.onClick(command)}
            />
            <CommentToolbutton
              icon={'fa fa-trash-o'}
              command={'Delete'}
              onClick={(command) => this.props.onClick(command)}
            />
            <div className="clear"></div>
          </div>
        </div>

        <div className="clear"></div>
      </div>
    );
  }
}

export default DeleteCommentWindow;
