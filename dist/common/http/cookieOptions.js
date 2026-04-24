export const cookieOptions = {
    access: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: true,
        maxAge: 15 * 60 * 1000
    },
    refresh: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
};
//# sourceMappingURL=cookieOptions.js.map