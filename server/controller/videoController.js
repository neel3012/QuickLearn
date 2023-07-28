
const { GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');

const url = 'http://localhost:5000';

let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'videos'
  });
});

const uploadVideo = (req, res) => {
    console.log('inside upload video', req.file);
  
    if (!req.file) {
      return res.status(404).json("Video file not found");
    }
  
    const videoUrl = `${url}/uploadedvideo/${req.file.filename}`;
    return res.status(200).json(videoUrl);
  };



const getVideo = (request, response) => {
  const filename = request.params.filename;

  if (!filename) {
    return response.status(400).json('Filename is required');
  }

  const bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: 'videos', // Replace with the name of your bucket for files
  });

  const downloadStream = bucket.openDownloadStreamByName(filename);
  downloadStream.on('error', (error) => {
    console.error('Error retrieving file:', error);
    response.status(404).json('video not found');
  });
  response.setHeader('Content-Type', 'video/mp4');
  downloadStream.pipe(response);
};








module.exports = {
  
  uploadVideo,
  getVideo
};

  
  
  
  