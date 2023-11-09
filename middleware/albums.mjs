// Import necessary modules and dependencies
import fs from 'fs';

// Define a function to create an album
function createAlbum(name, description) {
    // Check if an album with the same name already exists
    const albums = getAlbums();
    const existingAlbum = albums.find(album => album.name === name);
    if (existingAlbum) {
        throw new Error(`Album with name ${name} already exists`);
    }

    const album = {
        name,
        description,
        images: []
    };
    // Save the new album to disk
    saveAlbum(album);
    return album;
}

// Define a function to add an image to an album
function addImage(albumName, filename, filesize) {
    // Load the album from disk
    const album = getAlbum(albumName);
    album.images.push({
        filename,
        filesize
    });
    // Save the updated album to disk
    saveAlbum(album);
}

// Define a function to get album details
function getAlbumDetails(albumName) {
    const album = getAlbum(albumName);
    return {
        name: album.name,
        description: album.description,
        numImages: album.images.length
    };
}

// Helper function to load all albums from disk
function getAlbums() {
    const albumsData = fs.readFileSync('albums.json');
    return JSON.parse(albumsData);
}

// Helper function to load a single album from disk
function getAlbum(albumName) {
    const albums = getAlbums();
    const album = albums.find(album => album.name === albumName);
    if (!album) {
        throw new Error(`Album with name ${albumName} not found`);
    }
    return album;
}

// Helper function to save an album to disk
function saveAlbum(album) {
    const albums = getAlbums();
    const existingAlbumIndex = albums.findIndex(a => a.name === album.name);
    if (existingAlbumIndex !== -1) {
        // Replace the existing album
        albums[existingAlbumIndex] = album;
    } else {
        // Add the new album
        albums.push(album);
    }
    fs.writeFileSync('albums.json', JSON.stringify(albums));
}

export { createAlbum, addImage, getAlbumDetails };