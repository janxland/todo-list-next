# Next.js To-Do List App

This is a simple To-Do List web application built using Next.js and Prisma. It allows you to create, view, and toggle the completion status of your to-do items.

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your local development machine.

### Installation

1. Clone this repository:

   ```sh
   git clone https://github.com/PhoenixSatoshi/nextjs-to-do-list.git
   ```

2. Navigate to the project directory:

   ```sh
   cd nextjs-to-do-list
   ```

3. Install the project dependencies:

   ```sh
   npm install
   ```

### Configuration

- Create a `.env.local` file in the root directory of the project and set the following environment variables:

   ```env
   DATABASE_URL="sqlite://./dev.db"
   ```

### Database Setup

- Run the Prisma migration to set up the SQLite database:

   ```sh
   npx prisma migrate dev
   ```

### Usage

1. Start the development server:

   ```sh
   npm run dev
   ```

2. Open your web browser and access the application at `http://localhost:3000`.

3. You can create new to-do items, mark them as complete, or delete them.

## Folder Structure

- `/pages`: Contains Next.js pages for the application routes.
- `/public`: Static assets (e.g., images).
- `/src`: Contains custom components and utility functions.
- `schema.prisma`: Prisma schema for defining the database model.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Open a pull request to the main repository.

## License

This project is licensed under the MIT License - see the [LICENSE]
