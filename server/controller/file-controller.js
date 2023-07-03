// const grid = require('gridfs-stream');
// const mongoose = require('mongoose');

// const url = 'http://localhost:5000';


// let gfs, gridfsBucket;
// const conn = mongoose.connection;
// conn.once('open', () => {
//     gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//         bucketName: 'fsfiles'
//     });
//     gfs = grid(conn.db, mongoose.mongo);
//     gfs.collection('fsfiles');
// });


//  const uploadFile = (request, response) => {
//     // console.log('inside upload',request)
//     if(!request.file) 
//         return response.status(404).json("File not found");
//     // console.log(request.file)
//     const fileUrl = `${url}/coursefiles/${request.file.originalname}`;

//     response.status(200).json(fileUrl);    
// }

//  const getFile = async (request, response) => {
//     try {   
//         const file = await gfs.files.findOne({ filename: request.params.filename });
//         // const readStream = gfs.createReadStream(file.filename);
//         // readStream.pipe(response);
//         console.log('file name1',file)
//         const readStream = gridfsBucket.openDownloadStream(file._id);
//         readStream.pipe(response);
//     } catch (error) {
//         response.status(500).json({ msg: error.message });
//     }
// }
// module.exports = {
//     uploadFile,
//     getFile
//   };
  
  
const mongoose = require('mongoose');

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
// const getFile = async (request, response) => {
//   try {   
//     console.log('in',request.params.filemame)
//       const file = await gfs.files.findOne({ filename: request.params.filename });
//       // const readStream = gfs.createReadStream(file.filename);
//       // readStream.pipe(response);
//       console.log('file name',file)
//       const readStream = gridfsBucket.openDownloadStream(file._id);
//       readStream.pipe(response);
//   } catch (error) {
//       response.status(500).json({ msg: error.message });
//   }
// }
const { GridFSBucket } = require('mongodb');

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

  
  
  
  