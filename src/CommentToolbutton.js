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

/** PropType definitions to ensure correct properties. */
CommentToolbutton.propTypes = {
  icon: React.PropTypes.string.isRequired,
  command: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default CommentToolbutton;
