# Trending

This project is also published on Netlify on the link:
- https://marcusfrontend.netlify.com/

PS: This projects connects to the Twitter API, which doesn't allow cross-origin access. That's why it connects to an API which makes the data transport. Check it here:
- https://github.com/markcorrea/trending-passport

Project overview:

Trending is a project focused on showing the developer and its abilities. In this case the Frontend.

I have chosen to use React with Mobx and Webpack, mainly because these are the main frameworks I use today. React can divide the project in reusable components, and MobX makes the state management good to understand and it's so much easier than Redux. Webpack not just bundles the module, but gives me back the URL access and can convert all the files on the project (images, code, style, any) to understandable files to the browser.

It is a simple page which connects to the Twitter API, and has some rules to show only those tweets we want to be shown on screen. These rules are:
- Geolocation: first thing, it gets the current location of the user, such as latitude and longitude, and also the City.
- Filters: the project brings every tweet that contains the hastag '#nowplaying' on its body. Also, it filters only those tweets with content coming from Spotify or Youtube. 
- Performance: For a better performance, the request will only bring the first 5 registers on the page.
- Keep rolling: The page contains Infinite Scrolling, on which, everytime the user gets to the end of the page, it loads more 5 registers.
- Up to date: The page also has a websocket integrated, so that, everytime a tweet that requires these rules above is posted on twitter, it automatically will pop on the page, no need to refresh the page.

On the right side of the feed, there is a formulary where the user can post, no need to access Twitter page to do that.

# Technologies:

NPM
- Node Package Manager - a library that manages the available packages of node.

REACT
- JavaScript framework for building reactive UI applications.

MOBX
- State management library, works together with React.

ECMASCRIPT 6 (2015)
- JavaScript recent updates on language, released in 2015.

BABEL
- Once EcmaScript6 was so recently released, many browsers still doesn't have support for its new features. So Babel is a translator, which converts all the code to simple EcmaScript5.

CSS/FILE/HTML/SASS/STYLE/URL LOADERS
- Loaders to be used on webpack. Just like Babel, they convert the files for an understandable language and structure for the browser.

AXIOS
- Promise based HTTP client for the browser and node.js.

SOCKET.IO
- Enables real-time bidirectional event-based communication.

JQUERY
- JavaScript library, required by the other libraries.

BOOTSTRAP
- Styling library for a better CSS development.

SASS/SCSS
- CSS developing method, turns CSS development much easier and more readable.

FONTAWESOME
- Free online icon library.

WEBPACK
- Module bundler. Its main purpose is to bundle JavaScript files for usage in a browser.

GIT
- Version control system, aiming on performance.

# Project Installation:

This project is installed using Node's Package Manager (NPM). If you don't have it on your machine yet, you can download it here: https://nodejs.org/en/;

To do so, you have to use Linux or MAC's Terminal. If you are using Windows, the command prompt won't work. I recommend downloading Git Bash.

This project contains a package.json file, which means that the necessary libraries will be installes once you type the specified command. Being so, please go to the Terminal and access the root file of your project. Once done, run "npm install".

All libraries will be installed inside the node_modules folder.

Once done, go to the terminal again and run "npm start".

Webpack will start the server and , once done, you can access it by http://localhost:8080.

# Project Structure:

The structure was all build using React's component concept.

the config files are all put on the root folder, and te development project stays on the 'src' folder.

Inside the 'src' folder, I have the main JS file of this project, 'index.js'. Here I divide the project in two folders: 'media' and 'components'.

On the 'media' folder I have the style SASS/SCSS files, and in the 'image', I have the used images for tests.

The 'components' folder has the main project, divided in two folders: 'Trending' and 'ui'.

The 'ui' folder carries the small components, which are used inside the 'Trending' components.

the 'Trending' components are the big ones, used to build the page. It has four files:

- Trending.jsx: the main Trending file;
- TrendingController: controls the usage of all the funcions/variables/attributes on the other Trending pages;
- TrendingList: the main layout shown on the browser.
- TrendingService: where are stored the requests done to the Backend. It uses Axios to make the requests.