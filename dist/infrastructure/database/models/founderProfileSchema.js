"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FounderProfile = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const FounderProfileSchema = new mongoose_1.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    badge: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false
    },
    summary: {
        type: String,
        required: false
    },
    achievements: {
        type: [String],
        required: false,
        default: []
    },
    socialLinks: {
        linkedIn: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: false
        }
    }
}, {
    timestamps: true
});
exports.FounderProfile = mongoose_1.default.model("FounderProfile", FounderProfileSchema);
