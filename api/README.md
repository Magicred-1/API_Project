# API PROJECT (Planode Index) - README

## Description
This project is a simple API that allows you to create, read, update and delete users and their posts. It is a REST API that uses the HTTP protocol to communicate with the client. The API is built with Node.js and Express.js. The data is stored in a Supabase database.

## Features
The API includes the following features:

- CRUD management of spaces, including the name, description, images, type, capacity, duration, opening hours, and accessibility for disabled visitors.
- Maintenance mode for spaces, which can be activated by an admin user. A maintenance log system is in place to help identify the best time to perform repairs on a space.
- Management of animals by spaces, with the ability to track treatments through a veterinary log system.
- Weekly management of employees to ensure that the zoo can open with at least one receptionist, one caretaker, one maintenance worker, and one vendor present.
- Ticket management, with different types of passes available (day pass, weekend pass, annual pass, and one-day-per-month pass). An API is in place to validate whether a user can access a space with their ticket before allowing entry.
- Escape game passes, which provide access to spaces in a predefined order (e.g. tiger/lion/monkey).
- Daily and weekly statistics to track attendance by space.
- Real-time monitoring of zoo and space attendance.
- Nighttime access to the zoo with a Night Pass, which can be activated by an admin user.
- Access to the API requires an employee account, and only employees can perform actions for the zoo.

## Technologies
This API was built using the following technologies:

- Node.js for the backend.
- Typescript for the language.
- Supabase for the database.
- Vercel for deployment.


## Getting Started
To use this API, you must first set up a Supabase database. You can find instructions for doing so in the Supabase documentation. Once you have set up your database, you will need to rename the .env.example file to .env and fill in the appropriate values for your database. 

You will also need to create a Supabase admin account including a DB and add the appropriate values to the .env file.

Once everything is done, you can then install the required dependencies using npm install, compile and run the server using ```npm run buildandrun```.

Once the server is running, you can access the API endpoints using your preferred HTTP client (example: Postman). See the documentation for a full list of available endpoints and their parameters.

## Documentation
# API Documentation
The API Key need to be passed in the header of each request as ```x-api-key```.

## Employees
### Get all employees
```GET /employees```

### Get employee by id
```GET /employees/:id```

### Create employee
```POST /employees/create``` with query parameters:
- name: string
- role: string
- availabilities: string

### Update employee
```PUT /employees/:id``` with query parameters:
- name: string
- role: string
- availabilities: string

### Delete employee
```DELETE /employees/delete/:id```

## Spaces
### Get all spaces
```GET /spaces```

### Get space by id
```GET /spaces/:id```

### Create space
```POST /spaces/create``` with query parameters:
- name: string
- description: string
- capacity: string

### Update space
```PUT /spaces/:id``` with query parameters:
- name: string
- description: string
- capacity: string

### Delete space
```DELETE /spaces/delete/:id```

## Animals
### Get all animals
```GET /animals```

### Get animal by id
```GET /animals/:id```
- id: number

### Create animal
```POST /animals/create``` with query parameters:
- name: string
- species: string
- space_id: string

### Update animal
```PUT /animals/update/:id``` with query parameters:
- name: string (optional)
- species: string (optional)
- space_id: string (optional)

### Delete animal
```DELETE /animals/delete/:id```
- id: number

## Tickets
### Get all tickets
```GET /tickets```

### Get ticket by id
```GET /tickets/:id```
- id: number

## API Key Generation
API Keys are generated using the ```generateAPIKey()``` function in the ```authMiddleware.ts``` file located in ```./tokenAuthenfication/authMiddleware.ts```. This function returns a string and then stores it in the database when a new employee is created. The API Key is then used to authenticate the employee when they make a request to the API.

## Contributors
This API was developed by D.Gadiou (@Magicred_1) / A.Duquenne (@WizerZ) / A.GomezDelToro (@AgustinGomezDelToro).
