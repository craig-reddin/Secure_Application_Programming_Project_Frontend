React Student Management System

A web application for managing student records built with React, 

Vite and in TypeScript.

Features

    •	Student record management - create, read, update and delete functionality

    •	Admin Sign In

    •	Client-side routing

    •	Form validation

    •	Route Protection (authentication required)

    •	Session Management (authentication required)

    •	HTTPS/ SSL

Requirements

    •	Node.js 18.0 or higher

    •	npm (Node package manager)

Setup Instructions

    1.	Clone the Repository:

        git clone https://github.com/craig-reddin/Secure_Application_Programming_Project_Frontend.git

        cd Secure_Application_Programming_Project_Frontend

    2.	Install Dependencies: Install all required packages:

        npm install

    3.	HTTPS Implementation: Copy privateKey.pem and server.crt files used 

    for Flask API for HTTPS (Link in Backend Integration Section below)and 

    paste into root folder.

    4.	Running the Application:

        npm run dev

    The development server will start on https://localhost:5173.

Application Routes

    Route	Description

    / : Admin sign in

    /create : Create student 

    /view_all :	List all students

    /student/:id : Update student

Libraries

    •	React (v19.0.0) - JavaScript UI library

    •	React Router DOM (v7.3.0) - Client-side routing

    •	Bootstrap (v5.3.3) - CSS framework

    •	React Bootstrap (v2.10.9) - React implementation of Bootstrap components

Development Tools

    •	TypeScript (v5.7.2) 

    •	Vite (v6.2.0)

    •	ESLint (v9.21.0)

Backend Integration

    The frontend is designed to connect with a student management API 
    (Link Below). 

    https://github.com/craig-reddin/Secure_Application_Programming_Project_Frontend/tree/main
