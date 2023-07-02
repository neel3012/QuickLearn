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
    bucketName: 'fsfiles'
  });
});

const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(404).json("File not found");
  }

  const fileUrl = `${url}/uploadedfile/${req.file.filename}`;
  return res.status(200).json(fileUrl);
};

const getFile = (req, res) => {
  const { filename } = req.params;

  gfs.find({ filename }).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    const readStream = gfs.openDownloadStreamByName(filename);
    readStream.pipe(res);
  });
};

module.exports = {
  uploadFile,
  getFile
};

  
  
  
  