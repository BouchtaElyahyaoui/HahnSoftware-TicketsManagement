# Ticket Management System

## Description

This is a full-stack Ticket Management System built with React for the frontend and .NET for the backend. The system allows users to create, view, update, and delete tickets, with features like pagination, sorting, and filtering.

## Demonstration
https://github.com/user-attachments/assets/d78a24ad-5cfe-493c-a0c3-7b8600b9f5b0


## Project Structure

```
.
├── .git
├── backend
│   └── tickets-management-api
│       ├── src
│       ├── tests
│       └── tickets-management-api.sln
├── frontend
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- .NET SDK 6.0 or later
- SQL Server Express

## Setup and Running

### Backend (.NET API)

1. Navigate to the `backend/tickets-management-api` directory.

2. Ensure you have SQL Server Express running and update the connection string in `src/appsettings.json` if necessary.

3. Run the following commands to set up and start the API:

   ```
   dotnet restore
   dotnet build
   cd src
   dotnet run --project .\src\tickets-management-api\tickets-management-api.csproj
   ```

   The API should now be running on `http://localhost:5000`.

### Frontend (React)

1. Navigate to the `frontend` directory.

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

   The frontend application should now be running and accessible in your browser.

## Running Tests

### Backend Tests

In the `backend/tickets-management-api` directory, run:

```
dotnet test
```

### Frontend Tests

In the `frontend` directory, run:

```
npm test
```

## Technologies Used

- Frontend:
  - React
  - TypeScript
  - Material-UI
  - Axios
  - Vite (build tool)
  - Jest (testing)

- Backend:
  - .NET 8
  - Entity Framework Core
  - SQL Server

## Additional Notes

- Ensure that the backend API is running before starting the frontend application.
- The frontend is configured to proxy API requests to `http://localhost:5000`. If you change the backend URL, update the proxy configuration in the frontend's `vite.config.js`.
