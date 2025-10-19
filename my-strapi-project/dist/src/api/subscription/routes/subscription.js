"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: "POST",
            path: "/subscription",
            handler: "subscription.create",
            config: {
                auth: { public: false }, // false = public
            },
        },
    ],
};
