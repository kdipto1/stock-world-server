"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllItemsSchema = exports.getItemByIdSchema = exports.updateInventoryItemSchema = exports.createInventoryItemSchema = void 0;
const zod_1 = require("zod");
exports.createInventoryItemSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().positive('Price must be positive'),
        quantity: zod_1.z.number().int().min(0, 'Quantity must be non-negative'),
        category: zod_1.z.string().min(1, 'Category is required'),
        supplier: zod_1.z.string().optional(),
    }),
});
exports.updateInventoryItemSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).max(100).optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().positive().optional(),
        quantity: zod_1.z.number().int().min(0).optional(),
        category: zod_1.z.string().min(1).optional(),
        supplier: zod_1.z.string().optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
    }),
});
exports.getItemByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
    }),
});
exports.getAllItemsSchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
        limit: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
        sortBy: zod_1.z.enum(['name', 'price', 'quantity', 'createdAt', 'updatedAt']).optional(),
        sortOrder: zod_1.z.enum(['asc', 'desc']).optional(),
        category: zod_1.z.string().optional(),
    }),
});
