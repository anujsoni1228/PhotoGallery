import React, { useState } from 'react';
import './PhotoGallery.css';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [newPhoto, setNewPhoto] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editPhotoId, setEditPhotoId] = useState(null);
  const [editPhotoUrl, setEditPhotoUrl] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handlePhotoChange = (e) => {
    setNewPhoto(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleAddPhoto = () => {
    if (newPhoto.trim() !== '' && newDescription.trim() !== '') {
      const newEntry = {
        id: Date.now(),
        photoUrl: newPhoto,
        description: newDescription,
      };

      setPhotos([...photos, newEntry]);
      setNewPhoto('');
      setNewDescription('');
    }
  };

  const handleRemovePhoto = (id) => {
    const updatedPhotos = photos.filter((photo) => photo.id !== id);
    setPhotos(updatedPhotos);
  };

  const handleEditPhoto = (id) => {
    const photoToEdit = photos.find((photo) => photo.id === id);
    if (photoToEdit) {
      setEditPhotoId(id);
      setEditPhotoUrl(photoToEdit.photoUrl);
      setEditDescription(photoToEdit.description);
    }
  };

  const handleSaveEdit = () => {
    const updatedPhotos = photos.map((photo) => {
      if (photo.id === editPhotoId) {
        return {
          ...photo,
          photoUrl: editPhotoUrl,
          description: editDescription,
        };
      }
      return photo;
    });

    setPhotos(updatedPhotos);
    setEditPhotoId(null);
    setEditPhotoUrl('');
    setEditDescription('');
  };

  const handleCancelEdit = () => {
    setEditPhotoId(null);
    setEditPhotoUrl('');
    setEditDescription('');
  };

  return (
    <div className="photo-gallery">
      <h2>Photo Gallery</h2>
      <div className="add-photo-form">
        <input
          type="text"
          placeholder="Enter photo URL"
          value={newPhoto}
          onChange={handlePhotoChange}
        />
        <input
          type="text"
          placeholder="Enter description"
          value={newDescription}
          onChange={handleDescriptionChange}
        />
        <button onClick={handleAddPhoto}>Add Photo</button>
      </div>
      <div className="photo-list">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            {editPhotoId === photo.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editPhotoUrl}
                  onChange={(e) => setEditPhotoUrl(e.target.value)}
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <div>
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <img src={photo.photoUrl} alt={photo.description} />
                <p>{photo.description}</p>
                <div className="button-group">
                  <button onClick={() => handleEditPhoto(photo.id)}>Edit</button>
                  <button onClick={() => handleRemovePhoto(photo.id)}>Remove</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
