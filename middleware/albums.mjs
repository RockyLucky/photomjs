// Import necessary modules and dependencies
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// Define the albums directory
const albumsDir = process.env.ALBUMS_DIR;

// Define the albums array
let albums = [];

// Define the function to read the albums directory
const readAlbumsDir = () => {
  // Read the albums directory
  fs.readdir(albumsDir, (err, files) => {
    // If there is an error, log it
    if (err) {
      console.log(err);
    } else {
      // If there is no error, log the files
      console.log(files);
      // Assign the files to the albums array
      albums = files;
    }
  });
};

// Define the function to create an album
const createAlbum = (albumName) => {
  // Create the album directory
  fs.mkdir(`${albumsDir}/${albumName}`, (err) => {
    // If there is an error, log it
    if (err) {
      console.log(err);
    } else {
      // If there is no error, log the success message
      console.log(`Album ${albumName} created successfully`);
    }
  });
};

// Define the function to delete an album
const deleteAlbum = (albumName) => {
  // Delete the album directory
  fs.rmdir(`${albumsDir}/${albumName}`, (err) => {
    // If there is an error, log it
    if (err) {
      console.log(err);
    } else {
      // If there is no error, log the success message
      console.log(`Album ${albumName} deleted successfully`);
    }
  });
};


// Define the function to rename an album
const renameAlbum = (oldAlbumName, newAlbumName) => {
  // Rename the album directory
  fs.rename(`${albumsDir}/${oldAlbumName}`, `${albumsDir}/${newAlbumName}`, (err) => {
    // If there is an error, log it
    if (err) {
      console.log(err);
    } else {
      // If there is no error, log the success message
      console.log(`Album ${oldAlbumName} renamed to ${newAlbumName} successfully`);
    }
  });
};

// Define the function to read the album contents
const readAlbumContents = (albumName) => {
  // Read the album directory
  fs.readdir(`${albumsDir}/${albumName}`, (err, files) => {
    // If there is an error, log it
    if (err) {
      console.log(err);
    } else {
      // If there is no error, log the files
      console.log(files);
    }
  });
};

export { albums, readAlbumsDir, createAlbum, deleteAlbum, renameAlbum, readAlbumContents };