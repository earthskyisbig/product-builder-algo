# Lotto Number Generator

## Overview

A simple and visually appealing web application that allows users to generate unique sets of lottery numbers. The application will be built with HTML, CSS, and JavaScript, following modern web standards and design principles.

## Features & Design

### Core Functionality
- **Generate Numbers:** A user can click a button to generate a set of 6 unique random numbers between 1 and 45.
- **Display Numbers:** The generated numbers are displayed clearly on the screen.
- **Theme Switching (New):** Users can toggle between light and dark modes. The preference will be saved locally.

### Visual Design
- **Theme:** A modern and clean design with a playful feel, adaptable to light and dark modes.
- **Layout:** A centered, responsive layout that works well on both desktop and mobile devices.
- **Colors:** A vibrant color palette will be used to distinguish the number balls, making the interface more intuitive and engaging. These colors will adapt for dark mode.
- **Typography:** Clear and readable fonts will be used for all text elements.
- **Effects:** Subtle shadows and transitions will be used to create a sense of depth and interactivity.

## Current Plan

1.  **HTML (`index.html`):** Create the basic structure of the application, including a title, a container for the lottery numbers, a "Generate" button, and a theme toggle switch.
2.  **CSS (`style.css`):**
    *   Define CSS variables for colors, text, and backgrounds for both light and dark themes.
    *   Style all the elements to create a polished and visually appealing user interface, adapting styles based on the active theme. This will include styling the number balls with different colors and adding responsive design rules.
3.  **JavaScript (`main.js`):**
    *   Implement the logic for generating unique, random lottery numbers when the user clicks the button and display them in the UI.
    *   Implement theme switching logic:
        *   Detect user's system preference (light/dark).
        *   Apply the default theme based on preference or saved setting.
        *   Handle click events on the theme toggle to switch themes.
        *   Save the user's theme preference in local storage.
4.  **Verify Functionality:** Check if theme switching works as expected and numbers are generated correctly.
5.  **Commit and Push:** Commit all changes and push to the remote git repository.