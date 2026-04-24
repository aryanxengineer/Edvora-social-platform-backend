export declare const uploadImage: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const uploadVideo: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const uploadMultipleMedia: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const validateUploadedFile: (file: Express.Multer.File | undefined) => {
    buffer: Buffer<ArrayBufferLike>;
    mimetype: string;
    size: number;
    originalName: string;
    isImage: boolean;
    isVideo: boolean;
};
//# sourceMappingURL=multer.d.ts.map