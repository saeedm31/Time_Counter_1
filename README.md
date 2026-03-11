# Time & Tally Tracker

A premium, interactive web application that displays real-time clocks and weather for multiple cities (Porto, Tehran, Toronto) alongside a versatile tally counter.

![Time & Tally Screenshot](screenshot.png) <!-- Optional: Add a screenshot of the app here later -->

## Features

*   **Global Clocks:** Real-time clocks for Porto, Tehran, and Toronto.
*   **Live Weather:** Current temperature fetching for each location using the Open-Meteo API.
*   **Interactive Tally Counter:** Features "Count Up", "Count Down", and "Reset" functionality.
*   **Premium Design:** Glassmorphism UI, animated background, and smooth interactions.
*   **Haptic Feedback:** Vibrates on mobile devices when interacting with the counter.
*   **Responsive:** Fully functional and beautiful on both desktop and mobile devices.

## Technologies Used

*   **HTML5 & CSS3:** For the structure and premium glassmorphism styling.
*   **Vanilla JavaScript:** For the core functionality, DOM manipulation, clock intervals, and API fetching.
*   **Ionicons:** For high-quality, scalable icons.
*   **Open-Meteo API:** A free, open-source weather API used for grabbing current temperatures.

## Getting Started

1.  Clone this repository:
    ```bash
    git clone https://github.com/YOUR_USERNAME/time-tally-tracker.git
    ```
2.  Open the `index.html` file in your preferred web browser.

No server or build process is required! The project runs entirely on client-side code.

## Customization

You can easily change the tracked cities by modifying the `script.js` file. Update the coordinates (`lat` and `lon`) and the time zones (`tz`) inside the `clocks` object to match the location of your choosing.

## License

This project is open-source and available under the [MIT License](LICENSE).
