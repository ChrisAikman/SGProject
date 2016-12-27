# Discussion Thread Application
This is my version of the discussion thread application.

Although I implemented this project in the way I thought best, I am certain there are better ways to go about implemented much of the functionality. I look forward to hearing ways to improve and optimize this app.

Deployed build [here](http://www.chrisaikman.com/sgproj).

## Table of Contents

- [Setup, Running, and Testing](#setup-running-and-testing)
- [Project Requirements](#project-requirements)
- [Project Timeline](#project-timeline)
- [Assumptions](#assumptions)
- [Requirements Overview](#requirements-overview)
- [Data Format](#data-format)
- [Design](#design)
- [Tools Used](#tools-used)
- [Future Improvements](#future-improvements)
- [What I've Learned](#-what-ive-learned)

## Setup, Running and Testing
Pull the repository located on this page.

Install all required modules with: `npm install --save-dev`.

Run dev build with: `npm start`.

Compile production build with: `npm run build`.

Run the tests with `./node_modules/karma/bin/karma start ./config/karma.config.js`.

## Project Requirements
- [x] Implement the code and markup to display the thread on a web page.
- [x] Assume, as a visitor to the page you are the author of at least two of the comments.
- [x] Display and implement Edit and Delete functionality for the appropriate comments.
- [x] Render the comments using recursion in your code.
- [x] Pay close attention to the UX.
  - [x] Are the main features of your app easily discoverable at first glance?
  - [x] For any complex features, are they at least quickly learnable and obvious?
  - [x] Once a user has learned how to use your app, can they repeatedly use it efficiently?
  - [x] Is the responsiveness of your UI high?
  - [x] Is there a sense of delight or joy when using it?
- [x] JavaScript automated testing.

## Project Timeline
### Tuesday and Wednesday, December 20/21, 2016
I used this time to plan a design, and relearn how to use React. I also researched some of the tools that were mentioned during my interview. I researched, downloaded, and set up Webpack, Mocha, Karma, and LESS, and configured them all to work with React. By the end of Wednesday, I had everything I thought I would need set up for the project.

### Thursday, December 22, 2016
Started figuring out how best to handle the data, and started writing some tests. With the tests, I wrote the code for database management and made sure everything was working. I then got a working recursive comment layout, with tests, and did some initial styling.

### Friday, December 23, 2016
I was surprised with a family visit for a four-day weekend for the holidays, so I tried my best to avoid working. I made some very minor changes.

### Saturday, December 24, 2016
Worked on designing the functionality and began implementing pieces of it.

### Sunday, December 25, 2016
Implemented a good portion of the functionality.

### Monday, December 26, 2016
After my family had to leave, I put in several hours to finalize most of the code.

### Tuesday, December 27, 2016
Minor fixes to polish everything for submission. Wrote a majority of the README.

## Assumptions
### Custom Database Parsing is OK
Since the database was not in the most optimal format for React data updating, I chose to parse the data into a different format for easier control. More information on this can be seen in the [Data Format](#data-format) section.

### Comment Nest Limit of Two
To prevent the comments from being nested infinitely I assumed that this type of discussion has two nesting levels: the first contains replies to the original discussion, the second contains replies to those replies. It is assumed that each initial comment has its own discussion going on in a chronological order. This nest limit level can be easily changed as each comment keeps track of the level it is on.

### Discussion Topic can be Edited/Deleted
I assumed that the discussion topic could be edited and deleted like any other comment, given that the current user posted the topic.

### We Are Brady
Since one of the requirements was to assume that we are one of the users with at least two comments, and since Brady has the most comments, I assumed that we are the user Brady.

### Data Loading
I assumed that the database would actually be loaded by different means, such as dynamically using AJAX. Since this project was just for the front end, the dataset is hard loaded.

### Server Communication
I assumed that in a real deployment of this app, it would be communicating back and forth with the server. It is possible to do realtime updating of comments by pulling in the database, reparsing it, and then updating the database within React. In addition, when a user edits, deletes, or replies to a comment, a request should be made to the server to perform that operation within its database. These requests should be done within the `handleEdit()`, `handleReply()`, `handleDelete()` functions within `app.js`. In addition, the server should check that the requests are valid.

### Current User Info
I assumed that the current user information (such as current author and author_id) would be available through the index. This information is passed as properties to the App. This setup can easily be changed if this convention is abnormal.

### Security Flaw Assumptions
There is potential security flaw with userids and comment management, so it is assumed that the server will check the validity of a new comment, edit, or deletion based on the currently logged in user before making changes to the database. It is assumed that the end-user can change their userid within the app if they feel like it, and edit/delete as many posts as they want by spoofing an id, however, with proper server checking, the actions would not be mirrored on the server side. It is assumed that this is O.K., because any end-user with a tool such as firebug could do the same thing.

### Reply to Self
I assumed that it was valid to reply to your own comment. This would be easy to disable.

### Comment IDs
Since comments don't have unique identifiers within the database, I assumed that a comment could be uniquely identified by a combination of a comment's author_id and datetime. This assumption was made as it seems unlikely for an author to post two comments within the same second.

### Git Features
Since this was a solo project, I did not use any of the more advanced git/GitHub functionality such as branching, or code reviews.

## Requirements Overview
### Implement the code and markup to display the thread on a web page.
All of the code was implemented in a way that I felt was most appropriate. Although I am sure that there are much better ways to implement everything, and I can't wait to hear how to better program within React, I tried to make my code as nice as possible. I split code into different files when I could, and I made sure to document everything. I also named components, classes, functions, and variables with logical names for easier understanding. My hope is that several months to several years from now, I will be able to come back to this and understand exactly what I was thinking while programming this.

### Assume, as a visitor to the page you are the author of at least two of the comments.
See the [We Are Brady](#we-are-brady) section in the Assumptions.

### Display and implement Edit and Delete functionality for the appropriate comments.
This, in addition to Reply functionality, are all done within the App and Comment components, with the help of a few minor components such as the Buttons and the DeleteWindow.

### Render the comments using recursion in your code.
The comments are rendered recursively using the `getComments()` helper function in `App.js`.

### Are the main features of your app easily discoverable at first glance?
I took special care to make sure that all of the features are clear and understandable.

### For any complex features, are they at least quickly learnable and obvious?
I don't believe there are any complex features, possibly other than the Quill editor. I chose the Quill editor because it has been used and supported by many different projects and has been optimized to make the experience as user-friendly as possible.

### Once a user has learned how to use your app, can they repeatedly use it efficiently?
I believe so. The functionality within the app should be common knowledge to most Internet users, and if the user is new to discussion applications, the clear buttons should help the user learn how to quickly use it.

### Is the responsiveness of your UI high?
The app is responsive within reason. Since replies, edits and deletes may cause sudden changes to the look of the app, care was taken to try to smoothly let the user know when something has changed. For example, when a comment is edited, the app scroll the editor into the center of the page. When a comment is deleted, it is scrolled into the center of the page and highlighted red for 2 seconds. When a reply is made, the app scrolls the reply into view and highlights it green for 2 seconds. Since instant scrolling to new content is disorienting, it is done over .5 seconds. During these .5 seconds, the app will not be responsive to user input, however, I believe the benefits outweigh the cons of non-responsiveness in special cases.

### Is there a sense of delight or joy when using it?
Perhaps? As much as a simple discussion app would allow. I think that the three major functions (reply, edit, and delete) are enjoyable and understandable and they are not frustrating, which is the most important thing.

### JavaScript automated testing.
See the [Tests](#tests) section for details.

## Data Format
Upon initial viewing of the thread data, and reading on React data updating conventions, I decided it would be beneficial to parse the data into a new format. The new format involved two data structures: the `discussion` and `comments`. The `discussion` contains the comment key for the main discussion, and the title of the discussion. The discussion itself is converted into a comment. The `comments` is an dictionary of comments keyed by their individual comment keys. Each comment has its original data, except its comments array is converted to hold the keys of the subcomments. This new data structure makes it easy to search for any comment in the discussion by using its key. Helper functions are provided to quickly convert the incoming raw database into this new data format.

This new format was decided from the beginning as React convention states that, "*When you want to aggregate data from multiple children or to have two child components communicate with each other, move the state upwards so that it lives in the parent component. The parent can then pass the state back down to the children via props, so that the child components are always in sync with each other and with the parent.*" So instead of splitting the data down to the comment components, it was maintained in the main App. This is not necessary and could be changed back to the original format with a few modifications to the code, but there would need to be additional functions to search the recursive database.

## Design
For the design, I tried to keep everything as minimalistic as possible. I tried to make sure that every part of the app had a purpose and that structure was heavily implied. I focused on a gray color scheme with a blue primary highlight color. I included room for a profile picture since, if I recall correctly from Visualization class, a picture can be processed and recognized within the brain faster than making the connection between a username and the person. I used enclosure to show which comments are subcomments. I used colors to emphasize certain features, such as coloring a comment that is going to be deleted red, and a new comment green. I used icons within the buttons for fast function recognition, and made the buttons stand out just enough to show that they provide functionality. I sized the comments based on the assumption that this app would likely have additional information or features on the side of the page. Finally, I utilized media queries to ensure that the app would respond to the sizes of different devices. Since I don't have access to a device testing suite, I tested the design on my computer, tablet and phone to ensure consistent use and easy access on varying sizes.

## Tools Used
I tried to use third-party modules as much as I could instead of writing everything by myself. With this goal in mind, I researched and utilized several different tools.

### Font-Awesome
I utilized font-awesome for the font symbols within the buttons. This was chosen because it is popular and well-suppored.

### Mocha / Karma / Expect
I specifically chose this test suite as I remember it being mentioned during my interview. Since I hadn't used these tools previously, I thought now would be the best time to learn!

### Less
I had experience with Less prior to this project, although I had most recently used Sass. I chose to switch to Less for this project since I remember it being mentioned during my interview.

### ReactCSSTransitionGroup
For custom CSS transitions of components within the app, I utilized React's CSS Transition module.

### Quill and @Djyde/React-Quill
I spent some time researching the best WYSIWYG editor to ensure optimal user friendliness. These modules made it easy to import a nice editor for the comments.

## Tests
For testing, I utilized Karma and Mocha. I aimed to get as much coverage as possible for the app. I put all of the tests in the `__tests__/setup-test.js` file. The tests automatically check whether the database has been converted correctly (see [Data Format](#data-format)), that the discussion topic has been rendered correctly, and that all of the comments are displayed. In addition, the edit, delete, and reply functionality is tested through `ReactTestUtils.Simulate()` to simulate user input. Although the coverage is not 100%, the coverage is broad. The untested areas of the app are relatively simple and tests for those could be written in the same way that the others were.

## Documentation
I used the JSDoc style to document all of the code. I also included comments within the code where necessary.

## Future Improvements
Here are a few possible things that I would research for improving the app in the future.

### Move Constants into a Config File
I am not sure what the conventions are for React in this context. My assumptions are that it would be beneficial to pull out all constants into a config file to allow for easy changing of common data, or to even change the entire language of the app. I did something similar for the Quill config, as that has its own configuration file located at `config/quill.config.js`, but I would like to research the optimal way to handle this for common data within React.

### Implement Additional Discussion Functionality
It would be neat to implement additional functionality such as upvoting comments, and sorting comments based on date, or upvotes.

### Implement the Surrounding Project
This is just one discussion thread. It could use a parent layer that displays all of the discussion threads within a topic, and a parent layer above that that displays all of the topics on the site. In addition, it would be beneficial to include additional information, such as related discussions, within each discussion to allow for a more immersive experience for the user.

## What I've Learned
I learned so much during this project! The biggest thing is that I learned (or relearned) how to use all of the tools and modules that I utilized in this project. I relearned how to setup and build a React app, and learned some new conventions for it. I learned how to configure Webpack and use common modules within it, such as the React Updates module, and the Less CSS Preprocessor module. I also finally learned how to do JavaScript testing!

Although I learned so much, the biggest thing to me is to ***keep learning***. I have no doubts that are much more elegant and optimal ways to do everything I've done within this project. I hope to redo this project several months down the road to see how much I have improved. I look forward to any critiques or feedback so that I can keep improving my knowledge and optimizing my workflow.
