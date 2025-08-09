"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseAdmin = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const config_1 = __importDefault(require("./config"));
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert({
            projectId: config_1.default.firebase.projectId,
            privateKey: config_1.default.firebase.privateKey,
            clientEmail: config_1.default.firebase.clientEmail,
        }),
    });
}
exports.firebaseAdmin = firebase_admin_1.default;
