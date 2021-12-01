# NIS - Directory documentation

## assets

contains all marketing materials.

## credentials

containing all envrionment secrets.

## dist

contains all compiled code

## doc

contains documentation

## src

contains the source code

### archive

contains old code that is bad/not used but still might be a helpfull reference

### commands

contains CLI commands

### config

api-documentation, constants, databaseconfig, *loggers*, *swagger*
creating and exporting the db

### controllers

validating the data that is being received
    pointing to the specific route

### services

handles all the business logic/ similar to controllers
    start the server

### helpers

code that doesnt fit the routes
assisting code elements
e.g. date-converter

### interfaces

defining global interfaces that might rely on specific types

#### types

defining global types

### middlewares

login validations
    checks user
running specific code on route
express - use

### models

creation of database model/defining collections

### validations

checking if the data is correct or valid / business logic

### routes

endpoints, api-routes

### database

### repository

connect to database