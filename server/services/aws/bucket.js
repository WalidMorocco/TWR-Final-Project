import multer from "multer";
import S3 from "aws-sdk/clients/s3.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    console.log("Test file: ", file);
    cb(null, "");
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerUpload = multer({ storage: storage, fileFilter: filefilter });

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

export { multerUpload };

export function uploadImage(
  image,
  folder,
  name,
  previousName,
  onUploadComplete
) {
  if (previousName && !previousName.includes("default")) {
    console.log(`Deleting images/${folder}${previousName}`);
    s3.deleteObject(
      {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `images/${folder}${previousName}`,
      },
      (err, _data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Delete Succeeded");
        }
      }
    );
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `images/${folder}${name}`,
    Body: image.buffer,
    ContentType: "image/jpeg",
  };

  s3.upload(params, onUploadComplete);
}
