import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CommentEditor from './CommentEditor.js';
import CommentToolbutton from './CommentToolbutton.js';
import DeleteCommentWindow from './DeleteCommentWindow.js'
import { getCommentID } from './Helpers.js';
import { getTimestamp } from './Helpers.js';
import { scrollIntoView } from './Helpers.js'
import profilepic from './user.svg';

/** Component that contains a single comment. */
class Comment extends Component {
  /** Set up the initial comment state. */
  constructor() {
    super();
    this.commentEditor = null;
    this.replyEditor = null;
    this.state = {
      addonClass: '',
      isEditing: false,
      isDeleting: false,
      isReplying: false,
    };
  }

  /** Helper function to manage visuals. */
  componentDidMount() {
    /* If this was a reply, we want to scroll it into view and color it
       differently for a time. */
    if ('wasreply' in this.props.comment) {
      scrollIntoView(this);
      this.setState({
        addonClass: 'NewComment'
      });

      /* After a time, fade the comment into normal status. */
      setTimeout(function() {
        if (this.state.addonClass === 'NewComment') {
          this.setState({addonClass: ''})
        }
      }.bind(this), 2000);
    }
  }

  /** Since the reply button can be in two places, resuse the code! */
  getReplyButton() {
    return (
      <CommentToolbutton
        key={getCommentID(this.props.comment) + 'ReplyButton'}
        icon={'fa fa-reply'}
        command={'Reply'}
        onClick={(command) => this.handleClick(command)}
      />
    );
  }

  /** Helper function to get a toolbar for comment management. */
  getToolbar() {
    var mytoolbars = [];

    /* We only want a maximum of two levels of comments. */
    /* Ensure the right requirements are met for this reply button! */
    if (this.props.nest_level < 3 &&
       (this.props.comment.comments.length === 0 ||
        this.props.nest_level === 1)) {
      mytoolbars.push(
        this.getReplyButton()
      );
    }

    /* Check if we made this comment, so that we can manage it. */
    if (this.props.curauthorid === this.props.comment.author_id) {
      mytoolbars.push(
        <CommentToolbutton
          key={getCommentID(this.props.comment) + 'DeleteButton'}
          icon={'fa fa-trash-o'}
          command={'Delete'}
          onClick={(command) => this.handleClick(command)}
        />
      );

      mytoolbars.push(
        <CommentToolbutton
          key={getCommentID(this.props.comment) + 'EditButton'}
          icon={'fa fa-pencil-square-o'}
          command={'Edit'}
          onClick={(command) => this.handleClick(command)}
        />
      );
    }

    return (
      <div className="Toolbar">
        {mytoolbars}
        <div className="clear"></div>
      </div>
    )
  }

  /** Helper function to get the reply editor if replying to this comment. */
  getReplyEditor() {
    if (this.state.isReplying) {
      return (
        <CommentEditor
          key={getCommentID(this.props.comment) + 'Reply'}
          comment={''}
          ref={(CommentEditor) => {this.replyEditor = CommentEditor}}
          onClick={(command) => {this.handleClick(command)}}
        />
      );
    } else {
      /* We only want a maximum of two levels of comments. */
      if (this.props.nest_level < 3) {
        return (
          <div className="Toolbar">
            {this.getReplyButton()}
            <div className="clear"></div>
          </div>
        );
      }
    }
  }

  /** Helper function to get subcomments and the reply editor if needed.
   *  @param {string} subComments - The HTML of the subcomments.
   */
  getSubComments(subComments) {
    if (subComments.length > 0 || this.state.isReplying) {
      return (
        <div className="SubComments">
          {subComments}
          {this.getReplyEditor()}
        </div>
      );
    }

    return null;
  }

  /** Handles button commands for this comment.
   *  @param {string} command - The command to execute.
   */
  handleClick(command) {
    switch (command) {
      case 'Edit':
        if (!this.state.isEditing) {
          this.setState({
            addonClass: 'HideToolbar',
            isEditing: true
          });
        }
        break;

      case 'Reply':
        if (!this.state.isReplying) {
          this.setState({
            addonClass: 'HideToolbar',
            isReplying: true
          });
        }
        break;

      case 'Submit':
        if (this.state.isEditing) {
          this.setState({
            addonClass: '',
            isEditing: false
          });
          this.props.onEdit(this.props.comment, this.commentEditor.editor.getHTML());
          scrollIntoView(this);
        }
        if (this.state.isReplying) {
          this.setState({
            addonClass: '',
            isReplying: false
          });
          this.props.onReply(this.props.comment, this.replyEditor.editor.getHTML());
        }
        break;

      case 'Delete':
        if (!this.state.isDeleting) {
          scrollIntoView(this);
          this.setState({
            addonClass: 'DeleteComment',
            isDeleting: true
          });
        } else {
          this.setState({
            isDeleting: false
          })
          this.props.onDelete(this.props.comment);
        }
        break;

      case 'Cancel':
        if (this.state.isEditing  ||
            this.state.isDeleting ||
            this.state.isReplying ) {
          /* Clear everything! */
          this.setState({
            addonClass: '',
            isEditing: false,
            isDeleting: false,
            isReplying: false,
          });
        }
        break;

      default:
        break;
    }
  }

  /** Helper function to get the normal comment text, or the editor. */
  getCommentText() {
    const comment = this.props.comment;
    const commentText = comment.comment;

    if (!this.state.isEditing) {
      return (
        <div className="CommentText ql-snow">
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{__html: commentText}}
          />
        </div>
      );
    } else {
      return (
        <CommentEditor
          key={getCommentID(this.props.comment) + 'Edit'}
          comment={commentText}
          ref={(CommentEditor) => {this.commentEditor = CommentEditor}}
          onClick={(command) => {this.handleClick(command)}}
        />
      );
    }
  }

  /** Helper function to get a delete window if the comment is being deleted. */
  getDeleteWindow() {
    if (this.state.isDeleting) {
      return (
        <DeleteCommentWindow
          key={getCommentID(this.props.comment) + 'Delete'}
          isDeleting={this.state.isDeleting}
          onClick={(command) => this.handleClick(command)}
        />
      );
    }

    return null;
  }

  /** Render the component. */
  render() {
    const comment = this.props.comment;
    const classes = (this.props.nest_level === 1) ? 'Comment ' : 'Comment OuterComment ';

    if ('deleted' in comment && comment.deleted) {
      return (
        <div className={classes}>
        <div className="Side Desktop">
          <div className="Filler">
            &nbsp;
          </div>
        </div>
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
      <ReactCSSTransitionGroup
        transitionName="FadeInOut"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <div className={classes + this.state.addonClass}>
          <div className="Side Desktop">
            <img src={profilepic} alt={comment.author}/>
          </div>

          <div className="Content">
            <div className="Side Mobile">
              <img src={profilepic} alt={comment.author}/>
            </div>

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
        {this.getDeleteWindow()}
      </ReactCSSTransitionGroup>
    );
  }
}

/** PropType definitions to ensure correct properties. */
Comment.propTypes = {
  comment: React.PropTypes.object.isRequired,
  nest_level: React.PropTypes.number.isRequired,
  subcomments: React.PropTypes.array,
  curauthorid: React.PropTypes.number,
  onEdit: React.PropTypes.func.isRequired,
  onReply: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
};

export default Comment;
