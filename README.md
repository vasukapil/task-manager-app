# Task Management App

A simple and responsive Task Management application built using **React**, **Redux Toolkit**, and **React Router**. The app allows users to create, view, update, and delete tasks, with each task categorized into three statuses: "To Do", "In Progress", and "Done". It also uses **lazy loading** to improve performance and **Progressive Web App (PWA)** functionality for offline usage.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Task Management](#task-management)
- [PWA Functionality](#pwa-functionality)
- [Responsive Design](#responsive-design)
- [Contributing](#contributing)

## Features

- **Task CRUD**: Create, Read, Update, Delete tasks.
- **Task Status**: Tasks are categorized into three statuses: "To Do", "In Progress", and "Done".
- **Lazy Loading**: Task details are lazily loaded to enhance performance.
- **Offline Support (PWA)**: Full offline support, caching initial data via a service worker.
- **Add to Home Screen**: The app is installable as a PWA on mobile and desktop devices.
- **Responsive Design**: Works across all screen sizes, from mobile to desktop.

## Technologies Used

- **React**: Frontend library for building the UI.
- **Redux Toolkit**: For state management, with asynchronous data fetching using `createAsyncThunk`.
- **React Router**: Handles navigation between the task board and task details.
- **Tailwind CSS**: For responsive styling and utility-first CSS.
- **PWA (Service Worker)**: Offline support and "Add to Home Screen" functionality.
- **Lazy Loading**: React's `Suspense` and `lazy` for loading task details only when needed.

## Task Management

### Task List

The task list is divided into three columns:

- **To Do**: Tasks that are yet to be started.
- **In Progress**: Tasks currently being worked on.
- **Done**: Completed tasks.

Each task has the following functionality:

- **Edit**: Modify the task's title.
- **Delete**: Remove a task from the list.
- **Change Status**: Move the task between statuses using a dropdown menu.
- **Task Details**: Click a task to view its detailed information in the task details page (loaded lazily for performance).

### Task Form

Users can add new tasks via a form input at the top of the page.

## PWA Functionality

The app is a **Progressive Web App (PWA)**, meaning it has offline support and can be installed on mobile or desktop devices.

- **Service Worker**: Caches API data to allow the app to work offline.
- **Add to Home Screen**: Users can install the app on their devices directly from the browser.

## Responsive Design

The application is fully responsive, with tasks displayed in three columns (one for each status) on larger screens, and columns stacking vertically on smaller devices (like mobile phones).

### Example Screens:

- **Desktop View**: Tasks are displayed in a three-column layout (To Do, In Progress, Done).
- **Mobile View**: Columns stack vertically for ease of access and better usability on smaller screens.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-management-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and go to:

   ```
   http://localhost:3000
   ```

### Building the Project for Production

To build the project for production:

```bash
npm run build
```
