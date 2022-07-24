# Project 3: Around The U.S.

### Overview

- Intro
- Technologies
- Project
- Figma
- Images

**Intro**

This webpage is the seventh project in the Software Engineer program at Practicum by Yandex. It was created using HTML, CSS, and JavaScript. The HTML and CSS portions were created based on design specs provided by Practicum using Figma. One of the focuses of this project was to build a responsive webpage that would seamlessly adjust its layout based on the screen size. The break points for this webpage were determined by the common screen sizes of popular electronic devices, as well as how webpage elements looked and interacted with eachother at different resolutions.

Additionally, this was one of my first projects implementing JavaScript into a webpage for functionality. JavaScript was utilized to create a pop-up window that allows the user to edit their name and bio or job description. The main functions that were focused on were ensuring that the current text values appeared in the pop-up window, that the values could be changed, and that the webpage would accurately update to reflect the changes after the form was submitted. The user is able to change their name or bio by using the save button, or if the user does not want to change their profile's values, they can simply exit using the "close" button or clicking outside of the popup window.

JavaScript was also used to render the 6 initial element cards using DOM manipulation. This takes the place of the previous hardcoded element cards that were originally in place. To add to the functionality of the webpage, JavaScript was also utilized to execute form validation anytime a user fires an 'input' event.

The most recent update to this project was incorporating classes and encapsulation into the JavaScript files. A class was created for a new card, and another class was created for form validation. Anytime a new card is created, the **card** class is utilized. Additionally, the **FormValidator** class was used on both popup windows.

**Technologies**

The webpage was made to be responsive/adaptive using CSS flexbox. Additionally, relative width values were given to elements so that no sizes are fixed. Media queries are included to change the layout of the webpage at specific resolutions.

- Semantic HTML5
- CSS Flexbox
- Positioning and relative units
- Vertical stacking with z-index
- Property transitions
- Media queries
- JavaScript (DOM manipulation, Classes, Encapsulation, Form Validation)

**Project**

- [See it live](https://timothyhorth.github.io/se_project_aroundtheus/)

**Figma**

- [Link to the project on Figma](https://www.figma.com/file/m79HxYeZpOXRw0Tz2eZGOV/Sprint-5%3A-Around-The-U.S.-%7C-desktop-%2B-mobile?node-id=1%3A2)

**Images**

Each image was exported from Figma as either a PNG, JPEG, or SVG. The PNG and JPEG images were compressed using **_tinypng.com_**, and then stored in the `/images` folder.
