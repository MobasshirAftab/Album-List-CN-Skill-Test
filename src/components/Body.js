import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

export default function Body() {
     const [albums, setAlbums] = useState([]);
     const [newAlbumTitle, setNewAlbumTitle] = useState("");
     const [editAlbumTitle, setEditAlbumTitle] = useState("");
     const [selectedAlbumId, setSelectedAlbumId] = useState(null);

     useEffect(() => {
       fetchAlbums();
     }, []);
    
    //  function for fetching the album list using API
     const fetchAlbums = async () => {
       try {
         const response = await axios.get(
           "https://jsonplaceholder.typicode.com/albums"
         );
         setAlbums(response.data);
       } catch (error) {
         console.error("Error fetching albums:", error);
       }
     };

    //  function for Adding new Album to the list
     const addAlbum = async () => {
       try {
         const response = await axios.post(
           "https://jsonplaceholder.typicode.com/albums",
           {
             title: newAlbumTitle,
           }
         );
         setAlbums([...albums, response.data]);
         setNewAlbumTitle("");
       } catch (error) {
         console.error("Error adding album:", error);
       }
     };

    //  function for updating the list
     const updateAlbum = async () => {
       try {
         await axios.put(
           `https://jsonplaceholder.typicode.com/albums/${selectedAlbumId}`,
           {
             title: editAlbumTitle,
           }
         );
         const updatedAlbums = albums.map((album) => {
           if (album.id === selectedAlbumId) {
             album.title = editAlbumTitle;
           }
           return album;
         });
         setAlbums(updatedAlbums);
         setSelectedAlbumId(null);
         setEditAlbumTitle("");
       } catch (error) {
         console.error("Error updating album:", error);
       }
     };

    //  function for deleting the album
     const deleteAlbum = async (albumId) => {
       try {
         await axios.delete(
           `https://jsonplaceholder.typicode.com/albums/${albumId}`
         );
         const updatedAlbums = albums.filter((album) => album.id !== albumId);
         setAlbums(updatedAlbums);
       } catch (error) {
         console.error("Error deleting album:", error);
       }
     };

    //  This function will be invoked as soon as the edit button is pressed
     const handleEditAlbum = (album) => {
       setSelectedAlbumId(album.id);
       setEditAlbumTitle(album.title);
     };

  return (
    <div className="app">
      <h1 className="title">Albums List</h1>
      <div className="add-album">
        <h2 className="form-title">Add Album</h2>
        <input
          type="text"
          className="input"
          placeholder="Album Title"
          value={newAlbumTitle}
          onChange={(e) => setNewAlbumTitle(e.target.value)}
        />
        <button className="add-button my-2" onClick={addAlbum}>
          Add
        </button>
      </div>
      {selectedAlbumId && (
        <div className="edit-album">
          <h2 className="form-title">Edit Album</h2>
          <input
            type="text"
            className="input"
            placeholder="Album Title"
            value={editAlbumTitle}
            onChange={(e) => setEditAlbumTitle(e.target.value)}
          />
          <button className="update-button" onClick={updateAlbum}>
            Update
          </button>
        </div>
      )}
      <div className="album-list">
        <h2 className="list-title">Albums</h2>
        <ul className="list">
          {albums.map((album) => (
            <li key={album.id} className="list-item">
              {album.title}
              <div className="button-group">
                <button
                  className="edit-button"
                  onClick={() => handleEditAlbum(album)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteAlbum(album.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
