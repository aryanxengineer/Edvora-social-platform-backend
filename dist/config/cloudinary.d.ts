import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
interface CloudinaryUploadOptions {
    folder?: string;
    public_id?: string;
    overwrite?: boolean;
    resource_type?: "image" | "video" | "raw" | "auto";
    transformation?: Record<string, unknown>[];
    tags?: string[];
}
export declare const uploadFromPath: (filePath: string, options?: CloudinaryUploadOptions) => Promise<UploadApiResponse>;
export declare const uploadFromBuffer: (buffer: Buffer, options?: CloudinaryUploadOptions) => Promise<UploadApiResponse>;
export declare const deleteAsset: (publicId: string, resourceType?: "image" | "video" | "raw") => Promise<void>;
export { cloudinary };
//# sourceMappingURL=cloudinary.d.ts.map