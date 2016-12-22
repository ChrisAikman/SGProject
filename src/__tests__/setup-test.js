import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import expect from 'expect';
import App from '../App';

import { updateDatabase } from '../Helpers.js';
import { getCommentID } from '../Helpers.js';
import dataset from '../../data/Data.json';

describe('App', function () {
  /* Gather the updated database to test if it is correct. */
  const updateddb = updateDatabase(dataset);
  var app = ReactTestUtils.renderIntoDocument(
      <App />
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
});
