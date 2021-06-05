<img src="lodr.svg" height="300px"/>

# Lödr
This is LugoCorp's browser-based HTML loading screen library.
You can use the library to add cool loading screens to your websites.
Lödr does not require any other JavaScript libraries to run properly.

## Scripts
You may want to minify the `lodr.js` script so it takes up less bandwidth in production.
To do so, simply run:
``` bash
npm run minify
```

## Usage
``` javascript
lodr.goalpost(3); // Increments the loading goal by 3
lodr.load({ // Displays the loading screen
  text: percent => `Loading ${percent}%`,
  background: "red",
  fontFamily: "sans-serif",
  fontWeight: "bold",
  fontSize: "30px",
  color: "white",
  mode: "text"
});
lodr.progress(2); // Loads 2/3 of the way (66%)
lodr.progress(); // Loads the final goal, the loading screen fades out
```
