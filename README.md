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
