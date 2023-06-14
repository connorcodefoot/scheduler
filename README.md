# Interview Scheduler

## Description

Interview Scheduler is a single page app designed using JS and React. It enables a user to schedule appointments with a desired interviewer. The functionality includes:
- The ability to browse days and available times
- Book, edit or delete interviews
- Select from available interviewers

The base functionality can be easily adapted for different organization requirements. For example, the individual could be book an interview, formal meeting, coffee chat, what have you.

Future considerations for the project include a view specific to a logged in user, as well as a view for a logged in interviewer to see their schedule.

## Technical Features

- Designed using Storybook
- React
- API (Not built by me) for Postgres DB
- Jest unit and integration tests
- Cypress integration tests

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Scheduler API

Fork and clone https://github.com/lighthouse-labs/scheduler-api
Setup DB based on Scheduler API README

```sh
npm start
```


## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress

```sh
npm run Cypress
```

## Views


!["Scheduler app view"](https://raw.githubusercontent.com/connorcodefoot/scheduler/master/docs/Scheduler-app.png)
!["New appointment"](https://github.com/connorcodefoot/scheduler/blob/master/docs/Scheduler-new.png)
!["Day List"](https://github.com/connorcodefoot/scheduler/blob/master/docs/Scheduler-daylist.png)

