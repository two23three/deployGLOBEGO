# GLOBE-GO

## Problem Statement

## Problem
There is a growing need for a user-friendly and dynamic travel planning application that caters to the needs of modern travelers. Existing solutions may lack features such as:

- Limited search and filtering: Current apps might offer basic search functionalities but often lack advanced filtering options based on destination, activity type, budget, or user ratings.
- Poor user experience: The user interface might be clunky or lack intuitive navigation, making it difficult for users to discover new destinations or manage their travel plans.
- Limited social interaction:Existing apps might not offer features for users to share travel plans, create itineraries with friends, or discuss travel experiences with a community.

This project aims to develop a web-based travel planning application using React for the frontend and Flask for the backend to address these shortcomings.

## Solution
1. Display a list of destinations:
   - Allow users to view detailed information about a specific destination, including key attractions, activities, and travel tips.
   - Display user reviews and travel journals alongside destination details.

2. User Authentication:
  - Allow users to create accounts.
  - Implement user login and logout functionality.

3. Travel Itinerary Creation:
  - Allow authenticated users to create and manage personalized travel itineraries.
  - Ensure that itineraries include daily plans, activities, and accommodations.

4. Review Submission:
  - Allow authenticated users to submit reviews for destinations and activities.
  - Ensure that reviews include a rating (integer between 1 and 5) and a comment (text).

5. Review Validation:
  - Validate that the rating is an integer between 1 and 5.
  - Optionally validate the length of the comment to ensure it is reasonable.

6. Routing:
  - Implement routes for browsing destinations, viewing destination details, and viewing user-specific itineraries and reviews using React Router.

This basic solution prioritizes ease of use and core functionalities. You can expand on it later with features like:

- More advanced search filters (activity type, budget, etc.)
- User accounts and personalized travel plans
- Social features like recommendations and discussions (requires user account)



## Project Overview
GlobeGo is a comprehensive travel planning web application designed to streamline the process of organizing and enjoying trips. Users can browse destinations, view detailed information, and create personalized travel itineraries. Registered users can create accounts, plan trips, and share their experiences through travel journals and reviews.

# Features
- Destination Browsing: Explore various travel destinations with detailed information.
- User Reviews: Write, update, and delete reviews for different locations.
- Travel Journals: Maintain a journal of your travel experiences.
- Personalized Itineraries: Create and manage personalized travel itineraries.
- Ticket Purchasing: Buy tickets for various travel options directly from the application.
- User Authentication: Secure login and registration system using JWT.
- Admin Dashboard: Manage users, locations, and reviews (for administrators).

## Installation
Prerequisites:
- Python 3.8+
- Node.js 14+
- npm 6+
- PostgreSQL or SQLite (for development)

## Technologies Used
Backend:
- Language: Python, JavaScript (Node.js)
- Framework: Flask
- Database: MySQL
- Authentication: JWT (JSON Web Tokens) or OAuth

Frontend:
- Language: JavaScript
- Framework: React
- Routing: React Router

Development Tools:
- Version Control:Git and GitHub
- Package Management:npm
- Build Tools: Create React App

## Backend Setup
The `server/` directory contains all of your backend code.

`app.py` is your Flask application. You'll want to use Flask to build a simple
API backend like we have in previous modules. You should use Flask-RESTful for
your routes. You should remember that you will need to use Flask-SQLAlchemy, Flask-Migrate, and
SQLAlchemy-Serializer instead of SQLAlchemy and Alembic in your models.

The project contains a default `Pipfile` with some basic dependencies. You may
adapt the `Pipfile` if there are additional dependencies you want to add for
your project.

1. Clone the repository:

```
git clone <https://github.com/treyjeyoghera/GLOBE-GO>
```

2. Create a virtual environment and activate it:
```
pipenv install
pipenv shell
```
3. Install the required packages:
```
pip install -r requirements.txt
```
4. Set up environment variables:
Create a .env file in the project root and add the following:
```
export FLASK_DEBUG=True
```

5. Run database migrations:
```
flask db init
flask db migrate -m "Initial migration."
flask db upgrade
```

6. Run the Flask application:
```
flask run
```

You can run your Flask API on [`localhost:5555`](http://localhost:5555) by
running:

```console
python server/app.py
```

Check that your server serves the default route `http://localhost:5555`. You
should see a web page with the heading "Project Server".

## Frontend Setup

The `client/` directory contains all of your frontend code. The file
`package.json` has been configured with common React application dependencies,
include `react-router-dom`. The file also sets the `proxy` field to forward
requests to `"http://localhost:5555". Feel free to change this to another port-
just remember to configure your Flask app to use another port as well!

1. Navigate to the frontend directory:
```
cd client
```

2. Install the required packages:
```
npm install
```

3. Start the React application:
```
npm start
```

To download the dependencies for the frontend client, run:

```console
npm install --prefix client
```

You can run your React app on [`localhost:3000`](http://localhost:3000) by
running:

```sh
npm start --prefix client
```

Check that your the React client displays a default page
`http://localhost- [Setting up a respository - Atlassian](https://www.atlassian.com/git/tutorials/setting-up-a-repository)
- [Create a repo- GitHub Docs](https://docs.github.com/en/get-started/quickstart/create-a-repo)
- [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)
- [Python Circular Imports - StackAbuse](https://stackabuse.com/python-circular-imports/)
- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/):3000`. You should see a web page with the heading "Project
Client".

## Project Structure

The structure of the application should be as follows:
```console

.
├── CONTRIBUTING.md
├── LICENSE.md
├── Pipfile
├── README.md
├── client
│   ├── README.md
│   ├── package.json
│   ├── public
│   ├── package-lock.json
    ├── .gitignore
    ├── node_modules
    ├── src
        ├── index.css
        ├── index.js
        ├── components
            ├── App.css
            ├── App.js
            ├── AuthForm.js
            ├── EditReviewForm.js
            ├── LocationDetails.css
            ├── LocationDetails.js
            ├── LocationList.js
            ├── LocationList.css
            ├── Login.js
            ├── Navbar.js
            ├── Navbar.css
            ├── PrivateRoute.js
            ├── ReviewForm.js
            ├── Review.js
            ├── Signup.css
            ├── Signup.js
            └── Style.css

└── server
    ├── _pycache_
    ├── migration
    ├── administrator.py
    ├── app.db
    ├── app.py
    ├── auth.py
    ├── config.py
    ├── models.py
    └── traveler.py
    
```

```console
.
├── app.py
├── config.py
├── migrations
│   ├── README
│   ├── __pycache__
│   ├── alembic.ini
│   ├── env.py
│   ├── script.py.mako

```
### Backend
- app.py: Main entry point of the Flask application. Configures and initializes the app, sets up routes, and starts the server.
- models.py: Contains the SQLAlchemy models for the application, including User, Ticket, Review, and Location.
- auth.py: Manages user authentication, including registration, login, and JWT handling.
- administrator.py: Contains routes and logic for administrative tasks.
- traveler.py: Handles traveler-related routes, such as viewing locations, purchasing tickets, and posting reviews.
- migrations/: Manages database migrations using Flask-Migrate.

### Frontend
- src/index.js: Entry point of the React application. Renders the main component and sets up routing.
- src/components/Locations.js: Displays a list of locations and allows users to view details, purchase tickets, and write reviews.
- src/components/UserReviews.js: Shows the logged-in user's reviews, with options to update or delete them.
- src/components/EditReviewForm.js: Handles the patch method for the reviews.

## Usage
- Register a new user account.
- Log in to access personalized features.
- Browse available travel destinations.
- Purchase tickets for selected destinations.
- Write and read reviews for locations.

## Routes
1. Authentication
    - POST /auth/register: Registers a new user.
    - POST /auth/login: Logs in a user and returns a JWT token.

2. Traveler
    - GET /traveler/locations: Retrieves a list of all locations.
    - GET /traveler/locations/:id: Retrieves details of a specific location.
    - GET /traveler/tickets: Retrieves a list of all available tickets.
    - POST /traveler/buy_ticket: Purchases a ticket.
     POST /traveler/post_review: Posts a new review.
    - GET /traveler/user_reviews: Retrieves reviews written by the logged-in user.
    - PATCH /traveler/user_reviews/:review_id: Updates a specific review.
    - DELETE /traveler/user_reviews/:review_id: Deletes a specific review.

## Models
1. User
    - id: Primary key.
    - username: Unique username for the user.
    - email: Unique email address.
    - password_hash: Hashed password for authentication.
    - tickets: Relationship to the Ticket model.
    - reviews: Relationship to the Review model.

2. Ticket
    - id: Primary key.
    - location_id: Foreign key to the Location model.
    - price: Price of the ticket.
    - means: Means of travel (e.g., bus, plane).
    - seat_no: Seat number.
    - user_id: Foreign key to the User model (nullable).

3. Review
    - id: Primary key.
    - location_id: Foreign key to the Location model.
    - user_id: Foreign key to the User model.
    - rating: Rating given by the user.
    - comment: Comment for the review.

4. Location
    - id: Primary key.
    - name: Name of the location.
    - description: Detailed description of the location.
    - shortDescription: Short description of the location.
    - image_url: URL of the location's image.
    - reviews: Relationship to the Review model.


## Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request.

# License
This project is licensed under the MIT License - see the LICENSE.md file for details.

