

const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
  url: `mongodb+srv://pneel578:pneel578@cluster0.3jnmkyi.mongodb.net/?retryWrites=true&w=majority`,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (request, file) => {
    const match = ["image/png", "image/jpg","application/pdf"];
    

    if (match.indexOf(file.mimetype) === -1 || match.indexOf(file.mimetype) === 0 )
      return `${Date.now()}-blog-${file.originalname}`;

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`
    };
    
    
  }
});
const storageFiles = new GridFsStorage({    //problem occure here in location of this
  url: `mongodb+srv://pneel578:pneel578@cluster0.3jnmkyi.mongodb.net/?retryWrites=true&w=majority`,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (request, file) => {
    const match = ["application/pdf"];
    console.log('inner')              //beacuse this not generate name cz file is not defined this part whole not working
    if (match.indexOf(file.mimetype) === -1)
      return `${Date.now()}-uploadedfile-${file.originalname}`;

    return {
      bucketName: "files",
      filename: `${Date.now()}-uploadedfile-${file.originalname}`
    };
  }
 
});

const upload = multer({ storage });
const uploadfile = multer({ storageFiles });

module.exports = {
  upload,uploadfile
};
