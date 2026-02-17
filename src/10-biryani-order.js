/**
 * 🍗 Paradise Biryani Batch System
 *
 * Paradise restaurant mein biryani orders aate hain. Kitchen ek batch mein
 * sirf 5 plates bana sakti hai. Agar ek order mein zyada plates hain toh
 * woh multiple batches mein split hota hai.
 *
 * Rules (use do...while loop):
 *   - orders is an array of numbers (plates per order): [3, 7, 2, ...]
 *   - Process orders one by one (for each order, use do...while for batching)
 *   - Each batch can have MAXIMUM 5 plates
 *   - If an order has more than 5, split into batches:
 *     e.g., order of 12 = batch(5) + batch(5) + batch(2) = 3 batches
 *   - Track: totalBatches, totalPlates, ordersProcessed
 *   - Skip orders that are not positive integers (0, negative, decimal, non-number)
 *
 * Validation:
 *   - Agar orders array nahi hai ya empty hai,
 *     return: { totalBatches: 0, totalPlates: 0, ordersProcessed: 0 }
 *
 * @param {number[]} orders - Array of plate counts per order
 * @returns {{ totalBatches: number, totalPlates: number, ordersProcessed: number }}
 *
 * @example
 *   biryaniBatchProcessor([3, 7, 2])
 *   // Order 3: 1 batch (3 plates)
 *   // Order 7: 2 batches (5 + 2 plates)
 *   // Order 2: 1 batch (2 plates)
 *   // => { totalBatches: 4, totalPlates: 12, ordersProcessed: 3 }
 *
 *   biryaniBatchProcessor([5, 10])
 *   // Order 5: 1 batch (5 plates)
 *   // Order 10: 2 batches (5 + 5 plates)
 *   // => { totalBatches: 3, totalPlates: 15, ordersProcessed: 2 }
 */
export function biryaniBatchProcessor(orders) {
  // Your code here
  if(!Array.isArray(orders) || orders.length === 0) {
    return {totalBatches:0, totalPlates:0, ordersProcessed:0}
  }

  let totalBatches = 0; // to track total batches which are needed
  let totalPlates = 0; // to track total plates which are processed
  let ordersProcessed = 0; // to track total orders which are processed

  for(let order of orders) {
    if(typeof order !== 'number' || order <= 0 || !Number.isInteger(order)) {
      continue; // skip invalid orders
    }

    ordersProcessed++;
    let remainingPlates = order; // to track remaining plates for current order

    do {
      const batchSize = Math.min(remainingPlates, 5);
      totalBatches++; // increment batch count for each batch processed
      totalPlates += batchSize; // add batch size to total plates processed
      remainingPlates -= batchSize; // reduce remaining plates by batch size
    } while (remainingPlates > 0); // continue batching until all plates for the current order are processed
  }

  return { totalBatches, totalPlates, ordersProcessed };
}
