# Dinner Recommendation Generator

## Overview

A simple and visually appealing web application that helps users decide what to have for dinner by generating random meal recommendations from various international cuisines. It also allows users to view and assign recommendations to a calendar. The application will be built with HTML, CSS, and JavaScript, following modern web standards and design principles.

## Features & Design

### Core Functionality
- **Generate Categorized Recommendation:** A user can click a button to get a random dinner recommendation, chosen from various international cuisine categories. The category will be displayed alongside the dish.
- **Display Recommendation:** The generated dinner recommendation and its cuisine category are displayed clearly on the screen.
- **Theme Switching:** Users can toggle between light and dark modes. The preference will be saved locally.
- **Calendar Integration:** A calendar will be displayed, allowing users to see daily recommendations. Recommendations can be reflected on specific days.

### Visual Design
- **Theme:** A modern and clean design, adaptable to light and dark modes, with an inviting culinary aesthetic.
- **Layout:** A centered, responsive layout that works well on both desktop and mobile devices. The layout will accommodate the recommendation display and the calendar.
- **Colors:** An appealing color palette that complements the food theme and adapts for dark mode.
- **Typography:** Clear and readable fonts will be used for all text elements, with an emphasis on readability for the recommendations and calendar entries.
- **Effects:** Subtle shadows and transitions will be used to create a sense of depth and interactivity.

## Current Plan

### Phase 1: Categorized Recommendations

1.  **Update `blueprint.md` (Completed):** Reflect the new purpose and features of the application.
2.  **Modify `main.js`:**
    *   Refactor `dinnerRecommendations` into an object where keys are cuisine categories (e.g., "Italian", "Mexican") and values are arrays of dishes.
    *   Modify `generateRecommendation` to first pick a random category, then a random dish from that category.
    *   Add functionality to display the chosen category along with the dish.
3.  **Modify `index.html`:** Add an element to display the chosen cuisine category.
4.  **Modify `style.css`:** Add styles for the category display, ensuring it integrates well with existing themes.

### Phase 2: Calendar Display and Menu Reflection

1.  **Modify `index.html`:**
    *   Add a dedicated section for the calendar display.
    *   Design a simple calendar structure (e.g., a grid with days).
2.  **Modify `style.css`:**
    *   Add comprehensive styling for the calendar, ensuring it's visually appealing and responsive in both light and dark modes.
    *   Define styles for calendar cells, active days, and recommendation entries.
3.  **Modify `main.js`:**
    *   Implement calendar rendering logic, dynamically creating days for the current month.
    *   Implement logic to store and retrieve daily recommendations using `localStorage`.
    *   Add functionality to assign the currently generated recommendation to a selected calendar day.
    *   Ensure the calendar updates to reflect assigned recommendations.

### Verification and Deployment
1.  **Verify Functionality:** Check if categorized dinner recommendations are generated correctly, the category is displayed, and theme switching works as expected. Test calendar rendering, menu assignment, and persistence.
2.  **Commit and Push:** Commit all changes and push to the remote git repository.