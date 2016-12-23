import React, { Component } from 'react';

class CommentToolbutton extends Component {
  /** Render the component. */
  render() {
    return (
      <div className={'Button ' + this.props.command + 'Button'}
        onClick={() => this.props.onClick(this.props.command)}
      >
        <i className={this.props.icon} aria-hidden="true"></i>
        {this.props.command}
      </div>
    );
  }
}

export default CommentToolbutton;
