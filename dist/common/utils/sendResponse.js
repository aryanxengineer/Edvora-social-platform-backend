export const sendResponse = ({ res, statusCode, message, data, meta }) => {
    const response = {
        success: true,
        message,
        ...(data !== undefined && { data }),
        ...(meta !== undefined && { meta })
    };
    return res.status(statusCode).json(response);
};
//# sourceMappingURL=sendResponse.js.map