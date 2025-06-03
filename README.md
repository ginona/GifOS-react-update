# GifOS

A React application for searching, creating, and sharing animated GIFs. This project is part of a performance comparison study between Vanilla JavaScript and React implementations of the same application.

## Project Purpose

This React version of GifOS is developed alongside a Vanilla JavaScript version to:
- Compare performance metrics between both implementations
- Analyze development efficiency and code maintainability
- Evaluate user experience and load times
- Study the trade-offs between framework-based and vanilla approaches

## Features

- Search GIFs using the Giphy API
- Dark/Light mode toggle
- Create your own GIFs using your device's camera
- Save favorite GIFs
- Responsive design for all devices

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Giphy API key

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Giphy API key:
```
REACT_APP_GIPHY_API_KEY=your_api_key_here
```

## Running the Application

To start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Building for Production

To create a production build:
```bash
npm run build
```

## Technologies Used

- React
- React Router
- SCSS Modules
- Giphy API
- Font Awesome Icons 