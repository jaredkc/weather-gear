/**
 * Copy static assets to the build folder
 *
 * This is used for the weather icon images.
 * Which icon image is needed is determined by the weather API.
 * We don't want to import them all in React as we may only need one or two.
 */
const fs = require("fs-extra");

// Get the source and destination folders
const sourceFolder = "./app/assets/static";
const destinationFolder = "./public/build/_assets/static";

// Get all the images in the source folder
const images = fs.readdirSync(sourceFolder);

fs.mkdirSync(destinationFolder);

// Copy each image to the destination folder
images.forEach((image) => {
  fs.copyFileSync(`${sourceFolder}/${image}`, `${destinationFolder}/${image}`);
});
