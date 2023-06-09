// import React, { useState } from 'react';

// const Upload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = () => {
//     // Perform upload logic here, such as sending the file to a server
//  console.log(selectedFile)
//     // Reset selected file state
//     setSelectedFile(null);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={!selectedFile}>
//         Upload
//       </button>
//     </div>
//   );
// };

// export default Upload;

import React, { useState } from 'react';
import axios from 'axios';

const Upload = ({getUserDetails}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      const token = localStorage.getItem('id_token');

      try {
        await axios.post('/api/images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: token ? `Bearer ${token}` : '',
          }
        });
        
        getUserDetails()
        console.log('Image uploaded successfully',selectedFile);
      } 
      
      catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div>
      <h4 style={{fontSize: '17px'}}>Image Upload</h4>
      <form onSubmit={handleSubmit}>
        <div>
        <input type="file" onChange={handleFileChange} />
        </div>
        <button className="btn btn-primary" type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Upload;