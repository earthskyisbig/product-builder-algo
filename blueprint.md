# AI Development Guidelines for Modern Web Projects in Firebase Studio

## Project Overview

This project aims to create a web application that allows users to generate and display images of food items. The application will feature a user interface with an input field for food names, a button to trigger image generation, and an area to display the generated image. Additionally, it provides a simple contact form for partnership inquiries, a Disqus comment section for user engagement, a "Pet Face Test" using a Teachable Machine model to classify between dogs and cats based on uploaded image files, and integrated Google AdSense for monetization.

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
*   **Pet Face Test (File Input):** A new section to integrate a Teachable Machine model for classifying dog/cat faces based on uploaded image files.
*   **Google AdSense Integration:** Addition of Google AdSense script, meta tag, and ad unit placeholders for monetization.

## Current Task: Implement Food Image Generator, Partnership Inquiry Form, Disqus Comments, Pet Face Test (File Input), and Google AdSense

### Plan

1.  Read the current content of `index.html`, `style.css`, and `main.js`.
2.  Modify `index.html` to add all new UI elements and scripts.
3.  Modify `style.css` to add basic styling for all new UI elements.
4.  Modify `main.js` for necessary JavaScript logic.
5.  Create `ads.txt` file.

### Steps

*   **Step 1:** Read `index.html`. (Completed)
*   **Step 2:** Read `style.css`. (Completed)
*   **Step 3:** Read `main.js`. (Completed)
*   **Step 4:** Add new UI elements to `index.html`. (Completed - Food Image Generator, Contact Form, Disqus Comments, Pet Face Test, and AdSense placeholder)
*   **Step 5:** Add styles to `style.css`. (Completed - Food Image Generator, Contact Form, Disqus Comments, and Pet Face Test)
*   **Step 6:** Add JavaScript logic to `main.js`. (No changes required in `main.js`, inline scripts in `index.html` handle most logic, AdSense script is in head.)
*   **Step 7:** Create `ads.txt` file. (Completed)

## Implementation Details:

*   **index.html:**
    *   **Google AdSense:** Added the Google AdSense script (`<script async src="...">`) and meta tag (`<meta name="google-adsense-account" ...>`) to the `<head>` section. A placeholder for a responsive ad unit (`<ins class="adsbygoogle" ...>`) was added after the `main` content and before the `calendar-section`.
    *   **Food Image Generator:** Replaced the original "Decide My Dinner!" button with an `<input type="text" id="food-input">` and a new `<button id="generate-food-image-btn">`. Added a `<p id="loading-text">` for loading status.
    *   **Partnership Inquiry Form:** Added a new `<section class="contact-section">` after the `calendar-section`. This section contains a `<form>` with `action="https://formspree.io/f/mkovjgkk"` and `method="POST"`. Includes `label`, `input` (text, email), and `textarea` elements, and a submit button.
    *   **Disqus Comments:** Added `<div id="disqus_thread" class="card" style="margin-top: 20px; padding: 20px;"></div>` and the provided JavaScript embedding code after the footer.
    *   **Pet Face Test:** Added a new `<section class="pet-face-test-section card">` after the Disqus section. This section includes a "Start Webcam Test" button, `<div id="webcam-container">`, `<div id="label-container">`, and the necessary `<script>` tags for TensorFlow.js and Teachable Machine Image, along with the provided inline JavaScript for model loading, webcam setup, and prediction.
*   **ads.txt:** Created in the root directory with the content `google.com, pub-9873122175669208, DIRECT, f08c47fec0942fa0`.
*   **style.css:**
    *   **Pet Face Test:** Removed styles for `#webcam-container` and `#webcam-container canvas`. Added styles for `.file-input` to visually integrate the file upload button with the existing `btn-primary` aesthetic. Added styles for `#uploaded-image` to ensure it displays correctly.
*   **main.js:** No changes were needed, as the Teachable Machine logic is self-contained within the `index.html` file.
*   **Disqus Comments:** Remains unchanged.
*   **Partnership Inquiry Form:** Remains unchanged.
*   **Food Image Generator:** Remains unchanged.