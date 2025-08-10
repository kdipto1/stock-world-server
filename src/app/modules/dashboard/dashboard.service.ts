
import { InventoryItem } from "../inventory/inventory.model";

const getDashboardStats = async () => {
  try {
    // Get basic counts first
    const totalItems = await InventoryItem.countDocuments();
    
    if (totalItems === 0) {
      return {
        totalItems: 0,
        totalQuantity: 0,
        totalValue: 0,
        lowStockItems: 0,
        categoryCounts: []
      };
    }

    // Get all items and calculate in JavaScript for safety
    const items = await InventoryItem.find().select('price quantity category');
    
    let totalQuantity = 0;
    let totalValue = 0;
    let lowStockItems = 0;
    const categoryCountsMap = new Map();
    
    items.forEach(item => {
      // Safely convert to numbers
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      const category = item.category || 'Uncategorized';
      
      totalQuantity += quantity;
      totalValue += price * quantity;
      
      if (quantity < 10) {
        lowStockItems++;
      }
      
      // Count categories
      categoryCountsMap.set(category, (categoryCountsMap.get(category) || 0) + 1);
    });
    
    // Convert category counts to array format
    const categoryCounts = Array.from(categoryCountsMap.entries()).map(([_id, count]) => ({ _id, count }));
    
    return {
      totalItems,
      totalQuantity,
      totalValue,
      lowStockItems,
      categoryCounts
    };
    
  } catch (error) {
    console.error('❌ Error in getDashboardStats:', error);
    // Return safe defaults on any error
    return {
      totalItems: 0,
      totalQuantity: 0,
      totalValue: 0,
      lowStockItems: 0,
      categoryCounts: []
    };
  }
};

export const DashboardService = {
  getDashboardStats,
};
