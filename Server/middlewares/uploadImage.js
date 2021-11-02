const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/profiles');
	},
	filename: (req, file, cb) => {
		const fileName = `${file.fieldname}-${shortid.generate()+Date.now() + path.extname(file.originalname)}`;

		cb(null, fileName);
	}
});

const upload = multer({ 
	storage, 
	fileFilter: (req, file, cb) => {
		if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
			cb(null, true);
		} else {
			cb(new Error('File type must be PNG/JPG/JPEG of type image'), false);
		}
	}
});

module.exports = upload;