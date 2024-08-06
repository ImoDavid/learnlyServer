import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImg = async (file) => {
  return cloudinary.v2.uploader.upload(
    file,
    {
      folder: 'profitprocloudtrading',
      transformation: [{ width: 500, height: 500, crop: 'limit' }],
    }
  );
};

export { uploadImg };
