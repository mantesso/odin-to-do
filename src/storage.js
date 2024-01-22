/**
 * Saves an item to localStorage.
 * @param {Item} item - The item to save.
 */
function saveItem(item) {
  const itemSerialized = JSON.stringify(item);
  localStorage.setItem(`item${item.id}`, itemSerialized);
}

/**
 * Retrieves an item from localStorage.
 * @param {string} itemId - The ID of the item to retrieve.
 * @returns {Item | null} - The retrieved item, or null if not found.
 */
function getItem(itemId) {
  const itemSerialized = localStorage.getItem(`item${itemId}`);
  return itemSerialized ? JSON.parse(itemSerialized) : null;
}

// Additional functions for updating and deleting items can follow a similar pattern.

export { saveItem, getItem };
