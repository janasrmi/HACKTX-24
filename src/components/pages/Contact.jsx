import React, { useState } from "react";

export const Contact = () => {
    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Set the image source to the reader's result
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {image && (
                <img src={image} alt="Uploaded" style={{ width: '100%', borderRadius: '8px', marginTop: '1rem' }} />
            )}
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit...
            </div>
        </div>
    );
};

