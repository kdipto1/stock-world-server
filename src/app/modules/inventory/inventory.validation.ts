import { z } from 'zod';

export const createInventoryItemSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
    description: z.string().optional(),
    price: z.number().positive('Price must be positive'),
    quantity: z.number().int().min(0, 'Quantity must be non-negative'),
    category: z.string().min(1, 'Category is required'),
    supplier: z.string().optional(),
  }),
});

export const updateInventoryItemSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    quantity: z.number().int().min(0).optional(),
    category: z.string().min(1).optional(),
    supplier: z.string().optional(),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
  }),
});

export const getItemByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
  }),
});

export const getAllItemsSchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: z.string().regex(/^\d+$/).transform(Number).optional(),
    sortBy: z.enum(['name', 'price', 'quantity', 'createdAt', 'updatedAt']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    category: z.string().optional(),
  }),
});
