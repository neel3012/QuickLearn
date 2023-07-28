
  
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const url = 'http://localhost:5000';

let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'files'
  });
});

const uploadFile = (req, res) => {
  console.log('inside upload file',req.file)
  if (!req.file) {
    return res.status(404).json("File not found");
  }

  const fileUrl = `${url}/uploadedfile/${req.file.filename}`;
  return res.status(200).json(fileUrl);
};



const getFile = (request, response) => {
  const filename = request.params.filename;

  if (!filename) {
    return response.status(400).json('Filename is required');
  }

  const bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: 'files', // Replace with the name of your bucket for files
  });

  const downloadStream = bucket.openDownloadStreamByName(filename);
  downloadStream.on('error', (error) => {
    console.error('Error retrieving file:', error);
    response.status(404).json('File not found');
  });

  downloadStream.pipe(response);
};






module.exports = {
  
  uploadFile,
  getFile
};
