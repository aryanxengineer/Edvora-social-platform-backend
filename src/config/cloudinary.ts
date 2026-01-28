import {
  v2 as cloudinary,
  type UploadApiResponse,
  type UploadApiErrorResponse,
} from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_FOLDER,
} from "./env.js";

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error(
    "Cloudinary configuration error: Missing required environment variables."
  );
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true, // Use HTTPS
});

interface CloudinaryUploadOptions {
  folder?: string;
  public_id?: string;
  overwrite?: boolean;
  resource_type?: "image" | "video" | "raw" | "auto";
  transformation?: Record<string, unknown>[];
  tags?: string[];
}

const DEFAULT_UPLOAD_OPTIONS: CloudinaryUploadOptions = {
  folder: CLOUDINARY_FOLDER || "default",
  overwrite: false,
  resource_type: "auto",
};

export const uploadFromPath = async (
  filePath: string,
  options?: CloudinaryUploadOptions
): Promise<UploadApiResponse> => {
  try {
    return await cloudinary.uploader.upload(filePath, {
      ...DEFAULT_UPLOAD_OPTIONS,
      ...options,
    });
  } catch (error) {
    throw normalizeCloudinaryError(error);
  }
};

export const uploadFromBuffer = async (
  buffer: Buffer,
  options?: CloudinaryUploadOptions
): Promise<UploadApiResponse> => {

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        ...DEFAULT_UPLOAD_OPTIONS,
        ...options,
      },
      (error, result) => {
        if (error) {
          return reject(normalizeCloudinaryError(error));
        }
        resolve(result as UploadApiResponse);
      }
    );

    uploadStream.end(buffer);
  });
};

export const deleteAsset = async (
  publicId: string,
  resourceType: "image" | "video" | "raw" = "image"
): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  } catch (error) {
    throw normalizeCloudinaryError(error);
  }
};

const normalizeCloudinaryError = (error: unknown): Error => {
  const cloudError = error as UploadApiErrorResponse;

  return new Error(
    `Cloudinary Error: ${cloudError.message || "Unknown error"}`
  );
};

export { cloudinary };
