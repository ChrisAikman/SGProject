import React, { Component } from 'react';
import CommentToolbutton from './CommentToolbutton.js';
import { getTimestamp } from './Helpers.js';
import profilepic from './user.svg';

/** Component that contains a single comment. */
class Comment extends Component {
  /** Set up the initial comment state. */
  constructor() {
    super();
    this.state = {
      addonClass: '',
      isEditing: false,
      isDeleting: false,
      isReplying: false,
    };
  }

  /** Helper function to get a toolbar for comment management. */
  getToolbar() {
    var mytoolbars = [];

    /* We only want a maximum of two levels of comments. */
    if (this.props.nest_level < 2) {
      mytoolbars.push(
        <CommentToolbutton
          icon={'fa fa-reply'}
          command={'Reply'}
          onClick={(command) => this.handleClick(command)}
        />
      );
    }

    /* Check if we made this comment, so that we can manage it. */
    if (this.props.curauthorid === this.props.comment.author_id) {
      mytoolbars.push(
        <CommentToolbutton
          icon={'fa fa-trash-o'}
          command={'Delete'}
          onClick={(command) => this.handleClick(command)}
        />
      );

      mytoolbars.push(
        <CommentToolbutton
          icon={'fa fa-pencil-square-o'}
          command={'Edit'}
          onClick={(command) => this.handleClick(command)}
        />
      );
    }

    return (
      <div className="Toolbar">
        {mytoolbars}
      </div>
    )
  }

  /** Helper function to get subcomments and the reply editor if needed.
   *  @param {string} subComments - The HTML of the subcomments.
   */
  getSubComments(subComments) {
    if (subComments.length > 0) {
      return (
        <div className="SubComments">
          {subComments}
        </div>
      );
    }

    return null;
  }

  /** Helper function to get the normal comment text, or the editor. */
  getCommentText() {
    const comment = this.props.comment;
    const commentText = comment.comment;

    return (
      <div className="CommentText">
        <div
          dangerouslySetInnerHTML={{__html: commentText}}
        />
      </div>
    );
  }

  /** Handles button commands for this comment.
   *  @param {string} command - The command to execute.
   */
  handleClick(command) {
  }

  /** Render the component. */
  render() {
    const comment = this.props.comment;
    const classes = (this.props.nest_level === 1) ? 'Comment ' : 'Comment OuterComment ';

    if ('deleted' in comment && comment.deleted) {
      return (
        <div className={classes}>
          <div className="Content">
            <div className="Deleted">
              This comment has been deleted.
            </div>
            {this.getSubComments(this.props.subcomments)}
          </div>
        </div>
      );
    }

    return (
      <div className={classes + this.state.addonClass}>
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

          {this.getCommentText()}

          {this.getToolbar()}
          <div className="clear"></div>

          {this.getSubComments(this.props.subcomments)}
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

export default Comment;
