# Pokémon TCG Deck Tracker - MVP

This project is a Minimum Viable Product (MVP) for a web application that helps users track their Pokémon Trading Card Game (TCG) collection and manage their decks. It's built with React, TypeScript, Tailwind CSS, and uses a JSON Server to simulate a backend API.

## Features

- **Card Library:** Browse a library of Pokémon cards, fetched from the JSON Server (which initially loads from `db.json`).
- **Card Ownership:** Mark cards as "owned" and track the quantity of each owned card.
- **Deck Building:** View pre-constructed decks (data also from JSON Server).
- **Deck Details:** See the cards in each deck, along with their quantities.
- **Filtering:**
  - Filter cards in the library by name.
  - Filter cards by whether they are owned or not.
- **Responsive Design:** Adapts to different screen sizes using Tailwind CSS's utility classes.

## Technologies Used

- **Frontend:**
  - **React:** JavaScript library for building user interfaces.
  - **TypeScript:** Adds static typing to JavaScript for better code maintainability.
  - **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
  - **React Router:** Declarative routing for React applications.
  - **React Query:** Powerful data fetching, caching, and state management library.
- **Backend (Simulated):**
  - **JSON Server:** Creates a mock REST API from a `db.json` file, allowing you to simulate a backend for development and testing.

## Prerequisites

Before running the application, make sure you have the following installed:

- **Node.js:** (v18 or higher recommended) [https://nodejs.org/](https://nodejs.org/)
- **npm:** (Usually comes bundled with Node.js)

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

## Running the Application

This application requires running both the JSON Server (backend) and the React development server (frontend) concurrently.

1. **Start JSON Server:**

   In a separate terminal window, navigate to the project's root directory and run:

   ```bash
   json-server --watch data/db.json --port 3001
   ```

   This starts the JSON Server, which will watch the `db.json` file for changes and serve the data on `http://localhost:3001`.

2. **Start React Development Server:**

   In another terminal window, also in the project's root directory, run:

   ```bash
   npm start
   ```

   This starts the React development server, usually on `http://localhost:3000`. Your browser should automatically open to this address.

## Important Notes

- **MVP Status:** This project is a minimum viable product, meaning it has basic functionality but can be significantly expanded.
- **JSON Server:** Remember that JSON Server is for development purposes. For a production application, you would replace it with a real backend (e.g., Node.js/Express, Python/Django, etc.).
- **Data:** The initial data is loaded from `db.json`. You can modify this file to add more cards or decks, but be sure to follow the correct JSON format. The `ownedCards` array in `db.json` will be updated as you interact with the application.

## Future Enhancements

- **User Authentication:** Implement a proper login/signup system.
- **Deck Creation:** Allow users to create and save their own custom decks.
- **Advanced Filtering:** Add more filtering options (e.g., by card type, rarity, expansion set).
- **Search Functionality:** Improve search to include more card attributes.
- **Production Backend:** Replace JSON Server with a real backend and database.
- **Import/Export:** Allow users to import and export their card collection and decks.

## Contributing

Contributions to this project are welcome! If you find any bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.
