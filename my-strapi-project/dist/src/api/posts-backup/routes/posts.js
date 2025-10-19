"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: "POST",
            path: "/posts",
            handler: "posts.create",
            config: {
                auth: { public: false }, // user must be logged in
            },
        },
    ],
};
