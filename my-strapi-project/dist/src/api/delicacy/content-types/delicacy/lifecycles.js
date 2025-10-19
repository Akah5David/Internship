"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lifecycles = void 0;
const reading_time_1 = __importDefault(require("reading-time"));
// Extract plain text from Rich Text JSON
function extractTextFromRichText(richText) {
    if (!Array.isArray(richText))
        return "";
    return richText
        .map(block => { var _a; return ((_a = block.children) === null || _a === void 0 ? void 0 : _a.map((child) => child.text).join(" ")) || ""; })
        .join(" ");
}
exports.lifecycles = {
    async afterCreate(event) {
        const { result } = event;
        if (result.excerpt) {
            const text = extractTextFromRichText(result.excerpt);
            await strapi.db.query("api::delicacy.delicacy").update({
                where: { id: result.id },
                data: { readingTime: Math.ceil((0, reading_time_1.default)(text).minutes) },
            });
        }
    },
    async afterUpdate(event) {
        const { result } = event;
        if (result.excerpt) {
            const text = extractTextFromRichText(result.excerpt);
            await strapi.db.query("api::delicacy.delicacy").update({
                where: { id: result.id },
                data: { readingTime: Math.ceil((0, reading_time_1.default)(text).minutes) },
            });
        }
    },
};
