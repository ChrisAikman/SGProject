import React, { Component } from 'react';
import { getCommentID } from './Helpers.js';
import { updateDatabase } from './Helpers.js';
import Comment from './Comment.js';
import './App.less';
import 'font-awesome-webpack';
import threaddb from '../data/Data.json';

class App extends Component {
  /** Create the state and convert the database. */
  constructor() {
    super();
    const updateddb = updateDatabase(threaddb);
    this.state = {
      discussion: updateddb.discussion,
      comments: updateddb.comments
    };
  }

  /** Helper function to return a comment node.
   *  @param {object} comment - The comment to convert.
   *  @param {string} subComments - The HTML for the subcomments.
   *  @param {number} nest_level - The current nest level of the comment.
   */
  getComment(comment, subComments, nest_level) {
    return (
      <Comment
        key={getCommentID(comment)}
        comment={comment}
        nest_level={nest_level}
        subcomments={subComments}
        curauthorid={this.props.author_id}
        onEdit={(comment, newcomment) => this.handleCommentEdit(comment, newcomment)}
        onReply={(parentcomment, newcomment) => this.handleCommentReply(parentcomment, newcomment)}
        onDelete={(comment) => this.handleCommentDelete(comment)}
      />
    )
  }

  /** Helper function to recursively convert a list of comments into nodes.
   *  @param {array} comments - An array of comments to convert to nodes.
   *  @param {number} nest_level - The current nest level of the comment.
   */
  getComments(comments, nest_level) {
    var builtComments = [];

    /* Loop through all of the comments at this level. */
    for (var c = 0, len = comments.length; c < len; c++) {
      var comment = this.state.comments[comments[c]];
      var subComments = [];
      if ('comments' in comment && comment.comments.length > 0) {
        /* Recursive call! */
        subComments.push(this.getComments(comment.comments, nest_level + 1));
      }

      builtComments.push(this.getComment(comment, subComments, nest_level));
    }

    return (
      builtComments
    );
  }

  /** Handles adding a new comment reply.
   *  @param {object} parentcomment - The parent comment that is being replied to.
   *  @param {string} newcomment - The comment text of the new comment.
   */
  handleCommentReply(parentcomment, newcomment) {
  }

  /** Handles editing a comment.
   *  @param {object} comment - The comment that is being edited.
   *  @param {string} newcomment - The comment text of the new comment.
   */
  handleCommentEdit(comment, newcomment) {
  }

  /** Handles deleting a comment.
   *  @param {object} comment - The comment that is being deleted.
   */
  handleCommentDelete(comment) {
  }

  /** Render the component. */
  render() {
    document.title = this.state.discussion.title;
    return (
      <div className="Thread">
        <div className="Header">
          <h1>{this.state.discussion.title}</h1>
        </div>
        {this.getComment(this.state.comments[this.state.discussion.commentid], [], 1)}
        {this.getComments(this.state.comments[this.state.discussion.commentid].comments, 1)}
      </div>
    );
  }
}

export default App;
