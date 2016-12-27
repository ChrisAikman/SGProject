import React, { Component } from 'react';
import ReactQuill from '@djyde/react-quill';
import CommentToolbutton from './CommentToolbutton.js';
import { scrollIntoView } from './Helpers.js'
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

import quillConfig from '../config/quill.config.js';

/** Component that contains a WYSIWYG comment editor. */
class CommentEditor extends Component {
  /** Construct the initial state. */
  constructor(props) {
    super(props);
    this.editor = null;
    this.state = {
      options: quillConfig.options
    }
  }

  /** Helper function to set the text of the editor, and manage visuals. */
  componentDidMount() {
    /* This is needed because of a limitation in the djyde react-quill module,
       since it does not give a way to initialize the editor's text. */
    if (this.props.comment !== '') {
      this.editor.$quill.container.firstChild.innerHTML = this.props.comment;
    }

    /* Scroll the editor into view and focus on it! */
    scrollIntoView(this);
    this.editor.$quill.container.firstChild.focus();
  }

  /** Handle a button command.
   *  @param {string} command - The command to run.
   */
  handleClick(command) {
    /* Simply forward the command to the comment. */
    this.props.onClick(command);
  }

  /** Render the component. */
  render () {
    return (
      <div className="CommentEditor">
        <ReactQuill
          options={this.state.options}
          ref={(ReactQuill) => {this.editor = ReactQuill}}
        />
        <CommentToolbutton
          icon={'fa fa-times'}
          command={'Cancel'}
          onClick={(command) => this.handleClick(command)}
        />
        <CommentToolbutton
          icon={'fa fa-check'}
          command={'Submit'}
          onClick={(command) => this.handleClick(command)}
        />

        <div className="clear"></div>
      </div>
    );
  }
}

/** PropType definitions to ensure correct properties. */
CommentEditor.propTypes = {
  comment: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default CommentEditor;
