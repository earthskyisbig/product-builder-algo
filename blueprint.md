# AI Development Guidelines for Modern Web Projects in Firebase Studio

## Project Overview

This project is a high-quality, single-page web application featuring a collection of AI-powered tools. It has been structured and enhanced to meet Google AdSense quality guidelines by providing clear navigation, original content, and transparent user policies. The tools include an AI Food Recognition tool and a "Pet Face Test" that classifies uploaded images. The site also includes user engagement features like a Disqus comment section and a partnership contact form, and is set up for monetization with Google AdSense.

## Style, Design, and Features

### Current State (AdSense Optimized)

*   **Structure:** A single-page application with a fixed top navigation bar for easy access to all sections. Includes dedicated sections for "About Us," "Privacy Policy," and "Terms of Service" to build user trust.
*   **Navigation:** A smooth-scrolling navigation bar (`<nav class="top-nav">`) allows users to jump to any section of the site, providing a clear and organized user experience.
*   **Content:** Each tool includes descriptive text explaining its purpose and how to use it, providing valuable, original content.
*   **Environment:** Firebase Studio with Code OSS-based IDE and a preview server.
*   **Core Mandates:** Adherence to project conventions, modern web standards (Baseline), ES Modules for JavaScript, CDN for third-party libraries (with SRI), Web Components for reusable UI, modern CSS features, and modern JavaScript syntax.
*   **Visual Design:** A clean, modern, and responsive design with a focus on user experience. A consistent theme is applied across all sections.

### Key Features

*   **AI Food Recognition (File Input):** A tool that uses a placeholder model to recognize food items from an uploaded image.
*   **Pet Face Test (File Input):** A tool that uses a Teachable Machine model to classify uploaded images as either "Dog" or "Cat".
*   **About Us, Privacy Policy, Terms of Service:** Dedicated sections providing transparency and important information to the user.
*   **Partnership Inquiry Form:** A contact form integrated with Formspree.
*   **Disqus Comment Section:** A comment section for user engagement.
*   **Google AdSense Integration:** Includes the AdSense script, meta tag, `ads.txt` file, and a responsive ad unit placeholder.

## Current Task: Implement Food Recognition Feature

### Plan

1.  Replace the "Food Image Generator" with a "Food Recognition" feature.
2.  Update `index.html` with a file upload input and a recognition button.
3.  Update `main.js` to handle image uploads and implement a placeholder for the recognition logic.
4.  Update `blueprint.md` to reflect the changes.

### Steps

*   **Step 1:** Modify `index.html` to replace the food generator section with the new food recognition UI. (Completed)
*   **Step 2:** Modify `main.js` to remove the food generator and calendar logic, and add the new food recognition and pet test logic. (Completed)
*   **Step 3:** Update `blueprint.md` to reflect the site's new functionality. (Completed)

## Implementation Details:

*   **index.html:**
    *   **Food Recognition Section:** Replaced the `#food-generator` section with a new `#food-recognition` section. The new section includes a file input (`#food-upload`), a button (`#recognize-food-btn`), an image preview (`#food-image`), and a container for labels (`#food-label-container`).
    *   **Navigation Bar:** Updated the navigation link to point to `#food-recognition`.
*   **main.js:**
    *   **Code Cleanup:** Removed the `generateFoodImage` function, its event listeners, and all the code related to the calendar functionality.
    *   **Food Recognition Logic:** Added event listener to `#food-upload` to preview the selected image. Added an event listener to `#recognize-food-btn` that calls the `recognizeFood` function. The `recognizeFood` function currently contains a placeholder for the AI model integration.
    *   **Pet Test Logic:** Added a placeholder `initPetTest` function and an event listener to `#image-upload` to preview the image and call the `initPetTest` function.
*   **ads.txt:** Remains unchanged.