# AI Development Guidelines for Modern Web Projects in Firebase Studio

## Project Overview

This project aims to create a web application that allows users to generate and display images of food items. The application will feature a user interface with an input field for food names, a button to trigger image generation, and an area to display the generated image. Additionally, it provides a simple contact form for partnership inquiries and a Disqus comment section for user engagement.

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

## Current Task: Implement Food Image Generator, Partnership Inquiry Form, and Disqus Comments

### Plan

1.  Read the current content of `index.html`, `style.css`, and `main.js`.
2.  Modify `index.html` to add the input field, button, image display, loading indicator (for food image generator), the partnership inquiry form, and the Disqus comment section.
3.  Modify `style.css` to add basic styling for all new UI elements.
4.  Modify `main.js` to implement the logic for handling user input, triggering image generation (with a placeholder/external service), and displaying results.

### Steps

*   **Step 1:** Read `index.html`. (Completed)
*   **Step 2:** Read `style.css`. (Completed)
*   **Step 3:** Read `main.js`. (Completed)
*   **Step 4:** Add new UI elements to `index.html`. (Completed - Food Image Generator, Contact Form, and Disqus Comments)
*   **Step 5:** Add styles to `style.css`. (Completed - Food Image Generator and Contact Form)
*   **Step 6:** Add JavaScript logic to `main.js`. (Completed - Food Image Generator. No JS needed for Formspree or Disqus.)

## Implementation Details:

*   **index.html:**
    *   **Food Image Generator:** Replaced the original "Decide My Dinner!" button with an `<input type="text" id="food-input">` and a new `<button id="generate-food-image-btn">`. Added a `<p id="loading-text">` for loading status.
    *   **Partnership Inquiry Form:** Added a new `<section class="contact-section">` after the `calendar-section`. This section contains a `<form>` with `action="https://formspree.io/f/mkovjgkk"` and `method="POST"`. Includes `label`, `input` (text, email), and `textarea` elements, and a submit button.
    *   **Disqus Comments:** Added `<div id="disqus_thread" class="card" style="margin-top: 20px; padding: 20px;"></div>` and the provided JavaScript embedding code right before the closing `</body>` tag, after the footer.
*   **style.css:**
    *   Added styles for `.food-generator-controls`, `.food-input`, and `.loading-text`.
    *   Added styles for `.contact-section .card-content`, `.form-group`, `label`, `input[type="text"]`, `input[type="email"]`, and `textarea` to visually integrate the form.
    *   A class `card` and some inline styles were added to `disqus_thread` div to integrate visually.
*   **main.js:**
    *   Updated element references and logic for the food image generator, as detailed in the previous update.
    *   The calendar logic was updated to store and retrieve generic `dailyEntries` (which include `foodName` and `imageUrl`) in `localStorage`.
    *   No specific JavaScript changes were required for the basic Formspree or Disqus integrations, as they handle their functionalities directly.