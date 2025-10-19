"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: "DELETE",
            path: "/delete/:id",
            handler: "delete.delete",
            config: {
                auth: { public: false }, // user must be logged in
            },
        },
    ],
};
