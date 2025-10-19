"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: "POST",
            path: "/signup",
            handler: "signup.register",
            config: {
                auth: { public: true }, // allow public access (or set to true if needed)
            },
        },
    ],
};
