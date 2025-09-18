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
