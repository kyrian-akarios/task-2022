# Example School Dashboard and Report Template System

## Requirements
In order to run the server, you need to have installed the following:
- Node, version 16.14.0
- NPM, version 8.3.1
- SQLite3, version 3.38.2

## Run
Then, you need to go into the directory which contains `package.json` and run the following command:
```
    npm install
```

Then, run the following command in the directory which contains `bootstrap.js`:
```
    node bootstrap.js
```

Then, go to the `index.html` file in /frontend in your local browser.

## Testing
Testing can be carried out by running the following command in the test directory:
```
    mocha .
```
## Optional Features
The following are optional features, within the `optional-features` branch of task-2022:
- report template - A report can be generated through clicking on 'Generate Report' in dashboard.html with the loaded elements. I wanted to include this feature as it would allow hypothetical parents to download a report - though I was not able to finish the report creating logic in time. It used jsPDF as a library.
- animations - I also included animations through CSS, as they would make the site more aesthetically pleasing. 


## Design Rationale
This section attempts to explain the features of the application and its parts. It is comprised of 3 distinct sections:
- the frontend
- the backend
- general development
### Frontend
My main aim for designing the frontend was to create a smooth and flat interface that could be quickly designed in the time given. Hence, the flat colours and such. As an optional feature, I added animations - through the @keyframes rule. I also included accessibility through aria-labels and through <label> so that people with difficulty perusing web pages can also access the site. 

I chose to use HTML instead of hosting it on a localhost server because it is easier for me to do and I do not have to worry about handling the server connection and all. 

Styles were created in CSS, and used the flexbox layout, as it is the layout I am most familiar with. It is very useful for creating 2D layouts - though if I had time, I would have liked to use CSS Grid.

### Backend
The techstack for the backend was comprised of Node (and the express library) along with SQLite3. When I was given the CSV file, I opted to convert it into an SQLite database for ease of interaction - as I was planning on building a dashboard when I was first given the task. I chose to use Node/Express as I was quite familiar with it.

I had a main server file from which I would import all other files, such as the /api files, and in those, I would call the /services files. I chose to use static methods (and a Singleton pattern) as they were utility functions and did not require instantiation.

Validation and security are also present within the backend - through server-side validation carried out by the Validator class. This class uses static functions that act upon regex patterns - which can easily be called when needed. Security-wise - the database handler has a function that allows for prepared statements, binding them to values, and then executing them. I did not make use of this until the /statements API - as I needed to call multiple SQL statements repeatedly. Otherwise, I believe the server-side validation would have been enough due to simply being SELECT statements.

Testing of the backend was mainly comprised of using Mocha, as it is a well-known and reliable testing framework. I also like its declarative syntax as it makes code much easier to read.

### General Development
I used branch development within Github so that I could manage my work effectively. Once I was done with the core features - I moved onto optional features, and created a new branch for that - which lets me rollback changes if needed.

In general, I wanted this task to be a focus on error handling, validation, and security - as these are the qualities of a robust application, and robustness is important within web development. I also wanted to focus on clear and sleek design, hence the colour schemes and flat UI design - so that it's visual hierarchy isn't weakened by other elements. 

I would have liked to implement some other features with more time, such as:
- an authentication system
- being able to select schools from the main page
