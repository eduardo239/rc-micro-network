import path from 'path';
import express from 'express';
import multer from 'multer';
import User from '../models/userModel.js';
import Jimp from 'jimp';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

export const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'backend/uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

export function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only.');
  }
}

export const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// - - - - - - - - - - - - - - - - - - AVATAR - - - - - - - - -- - - - - - - - -
router.post('/avatar', protect, upload.single('avatar'), async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const image = await Jimp.read(
    `http://localhost:5000/uploads/${req.file.filename}`
  );
  await image.quality(100);
  await image.resize(Jimp.AUTO, 160);
  await image.write(`backend/uploads/${req.file.filename}`);

  if (user) {
    const avatarUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    user.imageAvatar = avatarUrl || user.imageAvatar;

    await user.save();
    res.status(200).send(avatarUrl);
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

router.post('/profile', protect, upload.single('profile'), async (req, res) => {
  const user = req.user;

  const profileImageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  user.profileImage = profileImageUrl || user.profileImage;
  const updatedUser = user.save();

  res.send(profileImageUrl);
});

export default router;
