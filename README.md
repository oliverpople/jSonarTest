# jSonarTest

A node.js web app for accessing and viewing customer data.

# Dev Cheat Sheet

# Getting started

First checkout this repo, then install and run the dependencies with the following commands:

```
$ git clone git@github.com:oliverpople/jSonarTest.git
$ cd jSonarTest
$ cd jSonarTest/backend
$ npm i
$ cd jSonarTest/frontend
$ npm i
```

To run Express server use the following commands in a new tab:

```
$ cd jSonarTest/backend
$ nodemon server.js
```

To run react client use the following commands in a separate tab:

```
$ cd jSonarTest/client
$ npm start
```

To run cypress.js tests use the following commands in a separate tab:

```
$ cd jSonarTest/client
$ ./node_modules/.bin/cypress open
```

When the browser opens select the 'app_spec.js' file. Note: If it does not run automatically press the refresh button to see test run.

# User Experience

![](jSonarTestDemo.gif)

# User Stories

As a user  
I want to login into my data discover page  
So only I and other authenticated users have access.

As a user  
I want to see a list of all the customers  
So I can view and manage all customers in one place.

As a user  
I want to filter the list of customers by name  
So I only see a list of relevant customers.

As a user  
I want to select a customer and see all the products they have ordered along with all the products' details and order details in a chronological order based on the order date  
So I know precisely what each customer ordered and when it was ordered.

As a user  
I want to switch between customers and view their order & product details  
So it’s easy to view the order details of multiple users in quick succession.

## Dependencies

[Express.js](https://expressjs.com/) Node framework  
[Create-react-app](https://github.com/facebook/create-react-app) frontend scaffolding  
Sample data has been provided by [mysqltutorial](http://www.mysqltutorial.org/mysql-sample-database.aspx)  
End-to-end testing with [Cypress.js](https://www.cypress.io/)  
GUI components from [Material-ui](https://material-ui.com/)

## To Do:

- Demonstrate Runnable/packaged binaries on Nginx. Deploy app and database using [Captain Duck Duck](https://captainduckduck.com)
- Improve responsiveness on mobile
- Write test checking order data renders in chronological order
- Write test checking order details render (i.e. not just detail field names)
