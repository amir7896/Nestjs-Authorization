// src/multer/multer.options.ts
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async () => {
    return {
      folder: 'Nestjs-App',
      format: 'jpeg',
    };
  },
});

export const multerOptions = {
  storage,
};
