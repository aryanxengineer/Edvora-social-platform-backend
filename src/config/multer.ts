import { logger } from "@logger/index.js";
import { type Request } from "express";
import multer, { type FileFilterCallback } from "multer";

const MAX_IMAGE_SIZE_MB = 2;
const MAX_VIDEO_SIZE_MB = 50;
const IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
  "image/gif",
  "image/svg+xml",
  "image/tiff",
  "image/avif",
  "image/heic",
  "image/heif",
];
const VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-matroska",
  "video/avi",
  "video/mpeg",
  "video/3gpp",
  "video/ogg",
];

const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const isImage = IMAGE_MIME_TYPES.includes(file.mimetype);
  const isVideo = VIDEO_MIME_TYPES.includes(file.mimetype);

  if (!isImage && !isVideo) {
    return cb(
      new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Unsupported file type"),
    );
  }

  cb(null, true);
};

const baseMulter = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_VIDEO_SIZE_MB * 1024 * 1024,
    files: 1,
  },
});

export const uploadImage = baseMulter.single("image");
export const uploadVideo = baseMulter.single("video");

export const uploadMultipleMedia = baseMulter.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

export const validateUploadedFile = (file: Express.Multer.File | undefined) => {
  if (!file) {
    throw new Error("File is required");
  }

  const isImage = IMAGE_MIME_TYPES.includes(file.mimetype);
  const isVideo = VIDEO_MIME_TYPES.includes(file.mimetype);

  if (isImage) {
    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      throw new Error("Image size exceeds limit");
    }
  }

  if (isVideo) {
    if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
      throw new Error("Video size exceeds limit");
    }
  }

  return {
    buffer: file.buffer,
    mimetype: file.mimetype,
    size: file.size,
    originalName: file.originalname,
    isImage,
    isVideo,
  };
};
