import React, { Component } from 'react';
import { getCommentID } from './Helpers.js';
import { updateDatabase } from './Helpers.js';
import Comment from './Comment.js';
import './App.less';
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
        curauthorid={this.props.author_id}
      />
    )
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
      </div>
    );
  }
}

export default App;
