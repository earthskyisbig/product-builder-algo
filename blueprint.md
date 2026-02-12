# AI Development Guidelines for Modern Web Projects in Firebase Studio

## Project Overview

This project aims to create a web application that allows users to generate and display images of food items. The application will feature a user interface with an input field for food names, a button to trigger image generation, and an area to display the generated image. Additionally, it provides a simple contact form for partnership inquiries, a Disqus comment section for user engagement, and a "Pet Face Test" using a Teachable Machine model to classify between dogs and cats based on **uploaded image files**.

## Style, Design, and Features

### Initial Version (Current State)

*   **Structure:** Basic HTML, CSS, and JavaScript files (`index.html`, `style.css`, `main.js`).
*   **Environment:** Firebase Studio with Code OSS-based IDE and a preview server.
*   **Core Mandates:** Adherence to project conventions, modern web standards (Baseline), ES Modules for JavaScript, CDN for third-party libraries (with SRI), Web Components for reusable UI, modern CSS features, and modern JavaScript syntax.
*   **Error Handling:** Automated error detection and remediation post-modification.
*   **Visual Design:** Focus on modern aesthetics, responsiveness, intuitive UI, color, typography, texture, visual effects, and iconography. Accessibility (A11Y) standards will be implemented.

### Planned Features for Current Task

*   **User Input (Food Image Generator):** An input field (`<input type="text">`) for users to enter the name of a food item.
*   **Image Generation Trigger (Food Image Generator):** A button (`<button>`) to initiate the image generation process based on the input.
*   **Image Display Area (Food Image Generator):** An `<img>` tag within a container to display the generated food image.
*   **Loading Indicator (Food Image Generator):** A visual cue (e.g., text or spinner) to indicate when an image is being generated.
*   **Image Source (Food Image Generator - Initial):** For the initial implementation, an image retrieved from a public domain image service (Unsplash) is used based on the food name.
*   **Partnership Inquiry Form:** A contact form with fields for name, email, and message, integrated with Formspree.
*   **Disqus Comment Section:** Integration of Disqus for a comment section at the bottom of the page.
*   **Pet Face Test (File Input):** A new section to integrate a Teachable Machine model for classifying dog/cat faces based on **uploaded image files**.

## Current Task: Implement Food Image Generator, Partnership Inquiry Form, Disqus Comments, and Pet Face Test (File Input)

### Plan

1.  Read the current content of `index.html`, `style.css`, and `main.js`.
2.  Modify `index.html` to update the Pet Face Test section from webcam to file input.
3.  Modify `style.css` to update styling for the file input and uploaded image, removing webcam-specific styles.
4.  No changes to `main.js` were required for this specific update.

### Steps

*   **Step 1:** Read `index.html`. (Completed)
*   **Step 2:** Read `style.css`. (Completed)
*   **Step 3:** Read `main.js`. (Completed)
*   **Step 4:** Update UI elements in `index.html` for Pet Face Test (from webcam to file input). (Completed)
*   **Step 5:** Update styles in `style.css` for Pet Face Test (from webcam to file input). (Completed)
*   **Step 6:** Update JavaScript logic in `main.js`. (No changes required in `main.js`, inline script in `index.html` handles the logic.)

## Implementation Details:

*   **index.html:**
    *   **Pet Face Test:**
        *   Replaced the "Start Webcam Test" button and `<div id="webcam-container">` with an `<input type="file" id="image-upload">` and an `<img id="uploaded-image">` to display the selected image.
        *   The inline JavaScript was updated to remove webcam-related code (`Webcam`, `setup`, `play`, `update`, `loop`) and instead:
            *   Added an event listener to `image-upload` for `change` events.
            *   `handleImageUpload` function reads the selected file, displays it in `uploaded-image`, and then calls `predict` with the `uploaded-image` element.
            *   `predict` function now takes an image element as input.
            *   The `init` function is now called on `DOMContentLoaded` and primarily focuses on loading the model and setting up the file input listener.
*   **style.css:**
    *   **Pet Face Test:**
        *   Removed styles for `#webcam-container` and `#webcam-container canvas`.
        *   Added styles for `.file-input` to visually integrate the file upload button with the existing `btn-primary` aesthetic.
        *   Added styles for `#uploaded-image` to ensure it displays correctly.
*   **main.js:** No changes were needed, as the Teachable Machine logic is self-contained within the `index.html` file.
*   **Disqus Comments:** Remains unchanged.
*   **Partnership Inquiry Form:** Remains unchanged.
*   **Food Image Generator:** Remains unchanged.