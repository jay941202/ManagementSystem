# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Store Management System

This project is a Store Management System built with React, Node.js (Express), and MongoDB.

Features Authentication

Users can sign up and log in on the initial login screen.

During sign-up, a user model is created and passwords are encrypted using bcrypt.

Upon login, a JWT token is generated for authorization management.

Admin Dashboard

Once logged in as an admin, the system provides access to the following pages:

Employees

Manage employee personal information and hourly rates.

Add new employees.

Track active status to see whether an employee is currently working.

Schedule

Schedule cells for each date with morning and afternoon shifts.

Assign employees to shifts using a dropdown menu, fetching data from the employee list.

Tips

Enter total tips per shift.

Tips are allocated to employees based on their percentage share.

CPA (Cost per Activity)

Shows how much each employee earned per day and per shift within the selected date range.

A summary grid aggregates overall data for easier analysis.

Recipes

Uses ingredients from the inventory to create recipes.

Calculates cost based on unit price, and displays margin ratio compared to sales price.

Inventory

Product specifications and pricing management.

Manage actual inventory quantities separately.

Day Summary

Displays employees’ clock-in and clock-out times, refunds, cash counts, and unavailable dates for each employee. User Dashboard

When logged in as a regular user, the system provides access to the following pages:

Recipes

Displays recipe information only.

Cost or margin data are not shown for regular users.

Inventory

Employees can add items or update current stock quantities.

Pressing the “Mas!” button marks items that need to be purchased, which can be viewed on the admin page.

Utilities

Clock In / Clock Out Employees can clock in and out using a button. Verification is done via the last 4 digits of their phone number, and the database is updated accordingly.

Cash Count Allows employees to update the current cash in the POS system, broken down by bill denominations.

Refunds Employees can update the list of refunds that occur during their shift.

Unavailable Dates Employees can input dates when they are unavailable. Verification is done using the last 4 digits of their phone number. On these dates, the corresponding employee cannot be selected in the admin schedule.
