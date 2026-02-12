# AI Development Guidelines for Modern Web Projects in Firebase Studio

## Project Overview

This project is a high-quality, single-page web application featuring a collection of AI-powered tools. It has been structured and enhanced to meet Google AdSense quality guidelines by providing clear navigation, original content, and transparent user policies. The tools include an AI Food Image Generator and a "Pet Face Test" that classifies uploaded images. The site also includes user engagement features like a Disqus comment section and a partnership contact form, and is set up for monetization with Google AdSense.

## Style, Design, and Features

### Current State (AdSense Optimized)

*   **Structure:** A single-page application with a fixed top navigation bar for easy access to all sections. Includes dedicated sections for "About Us," "Privacy Policy," and "Terms of Service" to build user trust.
*   **Navigation:** A smooth-scrolling navigation bar (`<nav class="top-nav">`) allows users to jump to any section of the site, providing a clear and organized user experience.
*   **Content:** Each tool includes descriptive text explaining its purpose and how to use it, providing valuable, original content.
*   **Environment:** Firebase Studio with Code OSS-based IDE and a preview server.
*   **Core Mandates:** Adherence to project conventions, modern web standards (Baseline), ES Modules for JavaScript, CDN for third-party libraries (with SRI), Web Components for reusable UI, modern CSS features, and modern JavaScript syntax.
*   **Visual Design:** A clean, modern, and responsive design with a focus on user experience. A consistent theme is applied across all sections.

### Key Features

*   **AI Food Image Generator:** Allows users to enter a food name and see an AI-generated image.
*   **Pet Face Test (File Input):** A tool that uses a Teachable Machine model to classify uploaded images as either "Dog" or "Cat".
*   **Dinner Calendar:** A feature to save generated food ideas to a local storage-backed calendar.
*   **About Us, Privacy Policy, Terms of Service:** Dedicated sections providing transparency and important information to the user.
*   **Partnership Inquiry Form:** A contact form integrated with Formspree.
*   **Disqus Comment Section:** A comment section for user engagement.
*   **Google AdSense Integration:** Includes the AdSense script, meta tag, `ads.txt` file, and a responsive ad unit placeholder.

## Current Task: Optimize for Google AdSense Approval

### Plan

1.  Add a fixed top navigation bar for clear site structure.
2.  Add "About Us," "Privacy Policy," and "Terms of Service" sections.
3.  Add descriptive content to each tool section.
4.  Reorganize `index.html` and `style.css` to implement the new structure and improve layout.

### Steps

*   **Step 1:** Modify `index.html` to add the new navigation bar and content sections, and restructure the layout. (Completed)
*   **Step 2:** Modify `style.css` to style the new elements, adjust the layout for responsiveness, and ensure a consistent design. (Completed)
*   **Step 3:** Update `blueprint.md` to reflect the site's new high-quality structure. (Completed)

## Implementation Details:

*   **index.html:**
    *   **Structure Overhaul:** Reorganized the entire document. Sections are now clearly delineated with `id` attributes for navigation.
    *   **Navigation Bar:** Added a new `<nav class="top-nav">` at the top of the page with links to `#food-generator`, `#pet-test`, `#about`, and `#contact`. The theme switcher was moved into this bar.
    *   **New Content Sections:**
        *   Added `<section class="about-section card" id="about">` with descriptive text about the website's mission.
        *   Added `<section class="legal-section card">` containing both the Privacy Policy and Terms of Service.
    *   **Enhanced Descriptions:** Added `<p class="initial-message">` with more descriptive text to the Food Generator, Pet Test, and Calendar sections.
*   **style.css:**
    *   **Layout:** Added `padding-top` to the `body` to account for the fixed navigation bar. Enabled `scroll-behavior: smooth`.
    *   **Navigation Bar:** Added styles for `.top-nav` to create a fixed, modern navigation bar with styled links (`.top-nav a`).
    *   **Content Sections:** Added styles for `.text-content` to ensure readability for the new "About" and "Legal" sections. Added `.centered-content` for better layout in the tool sections.
    *   **Responsiveness & General Cleanup:** Adjusted various styles for a more consistent and responsive layout across the entire application.
*   **main.js:** No changes were needed for this structural update.
*   **ads.txt:** Remains unchanged.