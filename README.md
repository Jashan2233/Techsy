# Techsy

## Project Summary
In this project, I developed a dynamic eCommerce platform inspired by Etsy. 
The application encompasses essential features, including user authentication, product management, and a shopping cart system.

## Screenshots
## Landing
![techsylanding](https://github.com/Jashan2233/Techsy/assets/130947401/11a51ceb-d3a8-4f5a-adc1-2dc0524d9f29)
## Product Page
![techsyproduct](https://github.com/Jashan2233/Techsy/assets/130947401/3ff33781-6d4d-406e-aa10-d3e2d65b5e12)
## Shop UI
![techsyshop](https://github.com/Jashan2233/Techsy/assets/130947401/9148f4e7-59b4-49db-8a54-6c23c0b9adfb)


## Technologies
1. JavaScript
2. React
3. Flask
4. Express
5. PostgreSQL
6. AWS
7. Node.js
8. Python
9. SQLAlchemy


## Upcoming Features
1. Wishlist
2. Payment Gateway
3. UI/UX
4. Search

# Run this Project
To build this application locally, you will need the following:

1. Node.js v16.20.1
2. Python 3.9.4
3. Python pip
4. Amazon Web Services account and S3 Bucket (Bucket name, key, and secret key are required for the development environment variables)
Instructions:

Clone this repository (only branch: main)

Install dependencies

pipenv install -r requirements.txt

Create a .env file based on the example with proper settings for your development environment

Make sure the SQLite3 database connection URL is in the .env file

This starter organizes all tables inside the flask_schema schema, defined by the SCHEMA environment variable. Replace the value for SCHEMA with a unique name, making sure you use the snake_case convention.

Get into your pipenv, migrate your database, seed your database, and run your Flask app

pipenv shell
flask db upgrade
flask seed all
flask run
After seeding, to initiate the applicaiton from outside of the pipenv, you can use the command:

pipenv run flask run

