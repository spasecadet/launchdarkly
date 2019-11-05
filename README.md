## Coding test

This repository contains a small application that consumes test score data and exposes the data via a REST API.  Your job is to build a UI on top of the API, based on provided wireframes.

#### About the application

The application consumes data from `http://live-test-scores.herokuapp.com/scores`, using the [Server-Sent Events](https://www.w3.org/TR/2015/REC-eventsource-20150203/) protocol and stores the results in memory.
This means that there is no data on start up, and test scores will stream in over time.

The data is exposed via the following REST API:

1. `/api/v1/students` lists all students that have received at least one test score
2. `/api/v1/students/{id}` lists the test results for the specified student, and provides the student's average score across all exams
3. `/api/v1/exams` lists all the exams that have been recorded
4. `/api/v1/exams/{number}` lists all the results for the specified exam, and provides the average score across all students

#### Extending the application

We'd like you to build a UI on top of the existing API, allowing a user to browse the list of exams.
While design is important to us,  we don't expect you to be a designer so we we're not looking for you to fill in the visual design details.
However, we do expect you to be able to craft an intuitive and friendly user experience.

We've provided a wireframe for these two views below: an exam list view and an exam detail view.

![Exams UI Wireframe](wireframe.png)

We primarily use React and Redux to build the LaunchDarkly front-end.
However, there are a lot of tools, libraries, and frameworks out there these days for front-end web development, and it's our experience that good developers can easily pick up new frameworks.
To create a more level playing field for all applicants and to allow us to more easily compare solutions, we have a few restrictions on what 3rd-party libraries can be used:

* The solution only needs to work in modern browsers (one or both of latest Chrome/Firefox)
* No JavaScript frameworks are allowed (React, Angular, etc). The solution should be achievable with modern vanilla JS
  * JS variants such as Typescript are allowed
  * Polyfills are allowed
  * Babel is allowed
* No CSS frameworks are allowed (Bootstrap, Bulma, etc)
  * Pre/post processors such as LESS, SASS, or PostCSS are allowed
  * Resets/normalizers are allowed
* Application frameworks are allowed
  * The API currently leverages Express, but use what you're comfortable with
* Feel free to make changes to the API

When you're done, commit your solution to the provided GitHub repository (this one).  Be prepared to walk someone through your solution and expand upon the work you've done.

#### Running the application

Install NVM if you don't have Node v9.x and don't want to upgrade your local node version
```
https://github.com/creationix/nvm
```

Install Yarn
```
https://yarnpkg.com/en/docs/install
```

Prior to running the app
```sh
$ nvm install 9.1.0 # Node v9.x, doesn't have to be this version exactly
$ nvm use 9.1.0
$ yarn
```

Running the app
```sh
$ yarn start
```

Running the tests
```sh
$ yarn test
```

By default the application starts up at `http://localhost:4000`

---
Notes from Tracy

I'd like to cover some of the things I considered when building this.  I think this is more complex than is really warranted for this size project in terms of creating a SPA and handling everything through JS.  However, I like to make sure I'm learning something too when I work on projects like this.  I read a couple articles a while back on modern vanilla js and I wanted to try it out.  I can DEFINITELY see how the creators of React got from something very simple like this to really quickly wanting to create JSX.  I also see how you get to a virtual DOM pretty easily doing something like this.

One of my early ideas was that instead of clearing out the elements from the table every time the table got new data was to reuse all the nodes that were created and only clear out empty ones and only add new nodes when I ran out of existing ones.  I thought this would be really performant, but ended up deciding it was overkill for this kind of project, especially since I was detaching the table from the DOM anyway. 

I tried to keep as much of the state knowledge as possible in AcademyStats rather than letting the table decide where links should go or what to do when one was clicked.  This made it easier to handle the dependencies between StatTable and LeftMenu, and potentially makes the table more reusable (assuming it gets the same kind of data elsewhere).

I modified the API to get the same data format back for each kind of request.  It made sense seeing as how I was showing data in the same format for each different type of data.  I also added some 404 responses for /exams/:id and /students/:id for when there was no matching student or exam.  True, if you waited long enough that exam or student might come around again, but it seemed like a pretty useless thing to show the user - an endless loading state.  I debated doing the same thing for /exams and /students, but that didn't cover the case when the server had just started and we're waiting for events to populate, and seems unlikely that a user would ever have to wait very long for SOME exams or students.

Now that I am done with this project there are a number of things I'd like to go back and change.  The way I created the SPA would be hard to support in even the short run.  There needs to be real routing if there were to be any more types of pages, which would need to be handled at the root level.  Right now watching for browser navigation is happening inside AcademyStats since internally that's the only place where data changes.  Also it would be better to at least create a link component that could handle the link history pushstate logic a little better internally.  

I'm not super pleased with the sass implementation - I didn't want to spend a long time on it and this was the fastest way to make it work, but obviously in the long term it would be better to use webpack or another task runner and only include the files that are needed when they are actually required.  At the very least it would be nice to have all the scss files picked up automatically and not have to manually add them to the master scss file.

Most importantly though: I remember why we like frameworks!



