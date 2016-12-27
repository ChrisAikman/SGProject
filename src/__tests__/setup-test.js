import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import expect from 'expect';
import App from '../App';

import { updateDatabase } from '../Helpers.js';
import { getCommentID } from '../Helpers.js';
import dataset from '../../data/Data.json';

describe('App', function () {
  /* Optional author information, if want to test comment management functionality. */
  const author_id = 4;
  const author = 'Brady';

  /* Gather the updated database to test if it is correct. */
  const updateddb = updateDatabase(dataset);
  var app = ReactTestUtils.renderIntoDocument(
      <App
        author_id={author_id}
        author={author}
      />
  );

  it("converts the discussion correctly", function () {
    /* Make sure the discussion details are correct. */
    expect('title' in updateddb.discussion).toEqual(true);
    expect('commentid' in updateddb.discussion).toEqual(true);
    expect(updateddb.discussion.title).toEqual(dataset.discussion.title);

    /* Make sure that the discussion was converted to a comment correctly. */
    const diskey = getCommentID(dataset.discussion);
    expect(updateddb.comments[diskey].comment).toEqual(dataset.discussion.discussion);
    expect(updateddb.comments[diskey].comments.length).toEqual(dataset.discussion.comments.length);
    for (var k of ['author', 'author_id', 'datetime']) {
      expect(updateddb.comments[diskey][k]).toEqual(dataset.discussion[k]);
    }
  });

  it("converts comments correctly", function () {
    /* Since the data is supplied recursively, need to recursively check the data. */
    function recursiveCommentCheck(comment) {
      for (var c in comment.comments) {
        const key = getCommentID(dataset.comments[c]);
        expect(updateddb.comments[key].comments.length).toEqual(comment[c].comments.length);
        for (var k of ['author', 'author_id', 'comment', 'deleted', 'datetime', 'public']) {
          expect(updateddb.comments[key][k]).toEqual(comment[c][k]);
        }

        recursiveCommentCheck(comment.comments);
      }
    }

    /* Make sure that details of the comments are correct. */
    recursiveCommentCheck(dataset.discussion.comments);
  });

  it("displays the discussion title", function () {
      /* Make sure that the page title was set. */
      expect(document.title).toEqual(updateddb.discussion.title);


      /* Make sure that the header was set. */
      var h1 = ReactTestUtils.findRenderedDOMComponentWithTag(app, 'h1');
      expect(h1).toExist();
      expect(h1.textContent).toEqual(updateddb.discussion.title);
  });

  it("displays all comments", function() {
    var comments = ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'Comment');
    expect(comments.length).toEqual(Object.keys(updateddb.comments).length);
  });

  if (typeof author_id !== 'undefined' && typeof author !== 'undefined') {
    it("allows comment edits", function() {
        var editButton = ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'EditButton');

        /* Just pick an arbitrary edit button to test. */
        if (editButton.length > 0) {
          /* Get the comment text. */
          var content = editButton[0].parentNode.parentNode.parentNode;
          var commentText = content.querySelector(".ql-editor").innerHTML;

          /* Click it! */
          ReactTestUtils.Simulate.click(editButton[0]);

          /* Change the text. */
          var debugText = "<p>THIS IS DEBUG TEST TEXT!!!!</p>";
          var editor = content.querySelector(".ql-editor");
          editor.innerHTML = debugText;

          /* Submit the edit. */
          var submitButton = content.querySelector(".SubmitButton");
          ReactTestUtils.Simulate.click(submitButton);

          /* Make sure the comment text changed. */
          var commentTextNew = content.querySelector(".ql-editor").innerHTML;
          expect(commentText).toNotEqual(commentTextNew);
          expect(commentTextNew).toEqual(debugText);
        }
    });

    it("allows comment deletes", function() {
      var commentCount = ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'Deleted').length;
      var deleteButton = ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'DeleteButton');

      /* Just pick an arbitrary delete button to test. */
      if (deleteButton.length > 0) {
        /* Get the comment text. */
        var content = deleteButton[0].parentNode.parentNode.parentNode;
        var commentText = content.querySelector(".ql-editor").innerHTML;

        /* Click it! */
        ReactTestUtils.Simulate.click(deleteButton[0]);

        /* Make sure the delete window popped up. */
        var deleteWindow = ReactTestUtils.findRenderedDOMComponentWithClass(app, 'DeleteCommentWarning');
        expect(deleteWindow).toExist();
        var deleteButton2 = deleteWindow.querySelector(".DeleteButton");
        expect(deleteButton2).toExist();

        /* Click the confirm delete button! */
        ReactTestUtils.Simulate.click(deleteButton2);

        /* Make sure it was deleted! */
        var comments = ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'ql-editor');
        for (var c of comments) {
          expect(c.innerHTML).toNotEqual(commentText);
        }

        /* Make sure the number of deleted comments increased by 1. */
        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'Deleted').length).toEqual(commentCount+1);
      }
    });

    it("allows comment replies", function() {
      var commentCount = ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'Comment').length;
      var replyButton = ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'ReplyButton');

      /* Just pick an arbitrary reply button. */
      if (replyButton.length > 0) {
        /* Get the parent comment. */
        var content = replyButton[0].parentNode.parentNode.parentNode;

        /* Click it! */
        ReactTestUtils.Simulate.click(replyButton[0]);

        /* Enter some text. */
        var debugText = "<p>THIS IS DEBUG TEST TEXT!!!!</p>";
        var editor = content.querySelector(".ql-editor");
        editor.innerHTML = debugText;

        /* Submit the comment. */
        var submitButton = content.querySelector(".SubmitButton");
        ReactTestUtils.Simulate.click(submitButton);

        /* Make sure the comment text changed. */
        var comments = ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'ql-editor');
        var matches = 0;
        for (var c of comments) {
          if (c.innerHTML === debugText) {
            matches++;
          }
        }
        expect(matches).toEqual(1);
      }

      /* Make sure the number of comments increased by 1. */
      expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'Comment').length).toEqual(commentCount+1);
    });
  }
});
