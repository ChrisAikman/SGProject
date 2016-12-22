import ReactDOM from 'react-dom';

/** Universal function for getting a comment ID from a comment.
 *  @param {object} comment - The comment to get the ID of.
 */
export function getCommentID(comment) {
  return comment.author_id + comment.datetime;
}

/** Helper function to recursively convert comments for the app.
 *  @param {object} commentsdb - The converted comment database.
 *  @param {object} comments - The comment to convert.
 */
export function copyComments(commentsdb, comments) {
  for (var c = 0, len = comments.length; c < len; c++) {
    /* Copy the comment data over. */
    var newcomment = {'comments': []};
    for (var cc in comments[c]) {
      if (cc !== 'comments') {
        newcomment[cc] = comments[c][cc];
      }
    }

    /* Recursively convert subcomments if they exist. */
    if ('comments' in comments[c]) {
      for (var ccc = 0, len2 = comments[c].comments.length; ccc < len2; ccc++) {
        newcomment['comments'].push(getCommentID(comments[c].comments[ccc]));
      }

      copyComments(commentsdb, comments[c].comments);
    }

    commentsdb[getCommentID(comments[c])] = newcomment;
  }
}

/** Helper function to convert the database for use with the app.
 *  @param {object} threaddb - The JSON database for the thread.
 */
export function updateDatabase(threaddb) {
  /* Convert the discussion into a comment, and pull out the title. */
  var discussion = {'comments': [], 'deleted': false, 'public': true};
  for (var d in threaddb.discussion) {
    if (d === 'discussion') {
      discussion['comment']  = threaddb.discussion[d];
    }
    if (d !== 'comments' && d !== 'discussion') {
      discussion[d] = threaddb.discussion[d];
    }
  }
  if ('comments' in threaddb.discussion) {
    for (var c = 0, len = threaddb.discussion.comments.length; c < len; c++) {
      discussion['comments'].push(getCommentID(threaddb.discussion.comments[c]));
    }
  }

  /* Convert the comments recursively. */
  var comments = {};
  copyComments(comments, threaddb.discussion.comments);
  const disKey = getCommentID(discussion);
  comments[disKey] = discussion;

  var discussionRef = {'title': discussion.title, 'commentid': disKey};

  return {discussion: discussionRef, comments: comments};
}
