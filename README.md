# To do list:

-   Format the silver/hr in the table (Displays 100k instead of 100000)
-   Manage the tailwind grid/col to make website layout better
-   Style the tables to look better

# Reference Links:

-   https://garmoth.com/grind-tracker/UXikqPEmFP/spot/1

# Console Cmds:

npx tailwindcss -i ./src/index.css -o ./public/index.css --watch

# Dev Log:

## 15/06/2022

-   Added the calculation of overall silver/hr from data on table
-   All numbers output are now rounded to whole numbers using "Math.round()"
-   Added formatting for numbers in Average silver/hr using "int.toLocaleString()"
-   Basic functionality of the grind spot selector was added using switch statements and <select>
-   Remove icons.js, items.js and combined all the data in database.js
-   Grind spot objects now include "icon" and "price".

## 14/06/2022

-   Dev Log Starts Here (Gotta start somewhere)
-   Created the basic layout and functionality for Grind Calculator
-   Use JS to add img and input instead of spamming HTML
-   Caluclates silver/hr based on user inputs and data from "items.js"
-   Implemented temporary data storage method by using JS Objects
-   Used Tailwind Grid/Col to temporarily add a grid-type layout
