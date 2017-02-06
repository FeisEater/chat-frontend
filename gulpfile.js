const fs = require("fs");

if (process.env.NODE_ENV !== "production") {
  fs.readdirSync("./gulp")
  .filter(file => (/\.(js)$/i).test(file))
  .map(file => require("./gulp/" + file));
} else {
  // change this if you want to use other gulp files when you build your app
  require("./gulp/build:prod");
}
