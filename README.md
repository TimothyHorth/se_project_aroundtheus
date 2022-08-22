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

JavaScript was also used to render the 6 initial element cards using DOM manipulation. This takes the place of the previous hardcoded element cards that were originally in place. To add to the functionality of the webpage, JavaScript was also utilized to execute form validation anytime a user fires an 'input' event. Inheritance, encapuslation, and polymorphism were incorporated into this project. Classes were created for new location cards, a general popup window, an image popup, and form popups. Anytime a new card is created, the **Card** class is utilized to generate a new HTML element. The **FormValidator** class was used on both popup windows.

An update was made to this project to implement use of Webpack to bundle the project's files together. The JavaScript files, CSS files, and dependencies were linked together and made more concise, and then connected to the HTML file in order to make the code more efficient. Webpack does this through the following:

- The JavaScript code is rewritten so that functionality is maintained but can be used with older JavaScript versions. This negates the need to worry about browser compatibility.
- CSS stylesheets are minified. The spaces, line breaks, and comments are all removed since the browser does not need them.
- Vendor prefixes are automatically set so that once again browser compatability is not a concern.

The latest update to the project was connecting to the project's API using fetch method calls. The initial cards are pulled from the project's API (which is why you see a various assortment of test cards from other users) instead of hardcoding them into the program. The API is also used to update the user's profile info, add new cards, and update likes on the webpage. A unique feature that can be seen on the webpage is that a trash can icon only appears on cards that the user added. This prevents other users from deleting cards that they themselves did not save to the webpage/API. I am still working on getting the verification modal to delte the specific card if the user clicks the "Yes" button.

**Technologies**

The webpage was made to be responsive/adaptive using CSS flexbox. Additionally, relative width values were given to elements so that no sizes are fixed. Media queries are included to change the layout of the webpage at specific resolutions. Java

- Semantic HTML5
- CSS Flexbox
- Positioning and relative units
- Vertical stacking with z-index
- Property transitions
- Media queries
- JavaScript (DOM manipulation, Classes, Inheritance, Encapsulation, Polymorphism, Form Validation)
- Node Project Manager (NPM) / Node.js
- Webpack
- Promises/Asynchronous programming
- APIs

**Project**

- [See it live](https://timothyhorth.github.io/se_project_aroundtheus/)

**Figma**

- [Link to the project on Figma](https://www.figma.com/file/xQVeb8gprjukPVKXiLXS5T/Sprint-9%3A-Applied-JavaScript?node-id=0%3A1)

**Images**

Each image was exported from Figma as either a PNG, JPEG, or SVG. The PNG and JPEG images were compressed using **_tinypng.com_**, and then stored in the `/images` folder.
