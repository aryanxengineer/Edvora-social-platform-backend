import multer, { type FileFilterCallback } from "multer";
import { type Request } from "express";

/**
 * ============================
 * CONSTANTS (Product defaults)
 * ============================
 */
const MAX_IMAGE_SIZE_MB = 5;
const MAX_VIDEO_SIZE_MB = 50;

const IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

const VIDEO_MIME_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

/**
 * ============================
 * STORAGE
 * ============================
 * memoryStorage is used because:
 * - container safe
 * - cloud upload friendly (Cloudinary / S3)
 * - no server disk dependency
 */
const storage = multer.memoryStorage();

/**
 * ============================
 * FILE FILTER (SECURITY)
 * ============================
 */
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const isImage = IMAGE_MIME_TYPES.includes(file.mimetype);
  const isVideo = VIDEO_MIME_TYPES.includes(file.mimetype);

  if (!isImage && !isVideo) {
    return cb(
      new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Unsupported file type")
    );
  }

  cb(null, true);
};

/**
 * ============================
 * MULTER BASE CONFIG
 * ============================
 */
const baseMulter = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_VIDEO_SIZE_MB * 1024 * 1024, // max possible (video)
    files: 1, // strict: one file per request
  },
});

/**
 * ============================
 * IMAGE UPLOAD (POSTS / PROFILE)
 * ============================
 */
export const uploadImage = baseMulter.single("image");

/**
 * ============================
 * VIDEO UPLOAD (REELS)
 * ============================
 */
export const uploadVideo = baseMulter.single("video");

/**
 * ============================
 * MULTI MEDIA (FUTURE PROOF)
 * ============================
 */
export const uploadMultipleMedia = baseMulter.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

/**
 * ============================
 * POST-MULTER VALIDATION
 * ============================
 * Product companies ALWAYS validate again after multer
 */
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
