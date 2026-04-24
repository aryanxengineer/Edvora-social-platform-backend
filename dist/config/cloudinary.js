import { v2 as cloudinary, } from "cloudinary";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME, CLOUDINARY_FOLDER, } from "./env.js";
import { InternalServerError } from "@common/errors/internal.error.js";
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new InternalServerError("Cloudinary configuration error: Missing required environment variables.");
}
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true, // Use HTTPS
});
const DEFAULT_UPLOAD_OPTIONS = {
    folder: CLOUDINARY_FOLDER || "default",
    overwrite: false,
    resource_type: "auto",
};
export const uploadFromPath = async (filePath, options) => {
    try {
        return await cloudinary.uploader.upload(filePath, {
            ...DEFAULT_UPLOAD_OPTIONS,
            ...options,
        });
    }
    catch (error) {
        throw normalizeCloudinaryError(error);
    }
};
export const uploadFromBuffer = async (buffer, options) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({
            ...DEFAULT_UPLOAD_OPTIONS,
            ...options,
        }, (error, result) => {
            if (error) {
                return reject(normalizeCloudinaryError(error));
            }
            resolve(result);
        });
        uploadStream.end(buffer);
    });
};
export const deleteAsset = async (publicId, resourceType = "image") => {
    try {
        await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
        });
    }
    catch (error) {
        throw normalizeCloudinaryError(error);
    }
};
const normalizeCloudinaryError = (error) => {
    const cloudError = error;
    return new Error(`Cloudinary Error: ${cloudError.message || "Unknown error"}`);
};
export { cloudinary };
//# sourceMappingURL=cloudinary.js.map