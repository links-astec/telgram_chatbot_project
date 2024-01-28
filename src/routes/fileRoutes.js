const express = require('express');
const router = express.Router();
const {fileController} = require('../controllers/fileController');
 
router.post('/upload', fileController.uploadFile);
router.get('/getfiles', fileController.getAllFiles);
router.get('/getByName/:fileName', fileController.getFileByName);
router.put('/update/:fileId', fileController.updateFile);
router.delete('/delete/:fileId', fileController.deleteFile);

module.exports = router;

