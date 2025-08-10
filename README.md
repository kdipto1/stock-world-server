# StockWorld Server

A RESTful API server for managing inventory of computer components built with Node.js, Express.js, and MongoDB. This project follows a clean, modular architecture with TypeScript for better code maintainability.

## Features

- **Inventory Management**: Create, read, update, and delete inventory items
- **Authentication**: JWT-based authentication system
- **User Management**: User-specific inventory items
- **Clean Architecture**: Modular structure with proper separation of concerns
- **Error Handling**: Comprehensive error handling with proper HTTP status codes
- **Logging**: Request logging with Morgan and Winston
- **TypeScript**: Full TypeScript support for better development experience

## Technologies Used

- **Node.js & Express.js**: Backend framework
- **MongoDB & Mongoose**: Database and ODM
- **TypeScript**: Type-safe JavaScript
- **JWT**: Authentication tokens
- **Winston**: Logging
- **Morgan**: HTTP request logging
- **Cron**: Scheduled tasks

## Project Structure

```
src/
├── app/
│   ├── middleware/          # Custom middleware
│   ├── modules/            # Feature modules
│   │   ├── auth/           # Authentication module
│   │   └── inventory/      # Inventory module
│   └── routes/             # API routes
├── config/                 # Configuration files
├── enums/                  # Enums and constants
├── errors/                 # Error handling
├── interfaces/             # TypeScript interfaces
├── logger/                 # Logging configuration
├── types/                  # Type definitions
├── utils/                  # Utility functions
├── app.ts                  # Express app setup
└── index.ts               # Server entry point
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login

### Inventory
- `GET /api/v1/inventory/home` - Get home page items (public)
- `POST /api/v1/inventory` - Create new inventory item (auth required)
- `GET /api/v1/inventory/manage` - Get all inventory items (auth required)
- `GET /api/v1/inventory/user` - Get user's inventory items (auth required)
- `GET /api/v1/inventory/:id` - Get specific inventory item (auth required)
- `PUT /api/v1/inventory/:id` - Update inventory item (auth required)
- `DELETE /api/v1/inventory/:id` - Delete inventory item (auth required)

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- MongoDB
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_jwt_secret
   PORT=5000
   PING_URL=http://localhost:5000
   ```

4. Build the project:
   ```bash
   pnpm run build
   ```

5. Start the server:
   ```bash
   # Development
   pnpm run dev
   
   # Production
   pnpm start
   ```

## Scripts

- `pnpm run dev` - Start development server with hot reload
- `pnpm run build` - Build TypeScript to JavaScript
- `pnpm start` - Start production server

## License

MIT
