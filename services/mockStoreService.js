"use client"

import { formatISO } from 'date-fns';

// In-memory storage for stores
const mockStores = new Map();

/**
 * Register a new restaurant/store with DoorDash
 */
export const registerDeliveryStore = async (
  catererId,
  name,
  address,
  phoneNumber,
  email,
  pickupInstructions,
  prepTime = 30,
  businessHours
) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate default business hours if not provided
  const defaultBusinessHours = businessHours || [
    { day_of_week: 'monday', open_time: '09:00', close_time: '21:00', is_closed: false },
    { day_of_week: 'tuesday', open_time: '09:00', close_time: '21:00', is_closed: false },
    { day_of_week: 'wednesday', open_time: '09:00', close_time: '21:00', is_closed: false },
    { day_of_week: 'thursday', open_time: '09:00', close_time: '21:00', is_closed: false },
    { day_of_week: 'friday', open_time: '09:00', close_time: '22:00', is_closed: false },
    { day_of_week: 'saturday', open_time: '10:00', close_time: '22:00', is_closed: false },
    { day_of_week: 'sunday', open_time: '10:00', close_time: '21:00', is_closed: false },
  ];

  const now = new Date();
  const storeId = `store_${Math.random().toString(36).substring(2, 10)}`;

  // Create the store record
  const store = {
    id: storeId,
    external_id: catererId,
    name,
    address,
    business_hours: defaultBusinessHours,
    phone_number: phoneNumber,
    email,
    pickup_instructions: pickupInstructions,
    average_preparation_time: prepTime,
    status: 'active',
    created_at: formatISO(now),
    updated_at: formatISO(now),
  };

  // Store in our mock database
  mockStores.set(storeId, store);
  console.log('Registered new delivery store:', store);

  return store;
};

/**
 * Get a registered store by its ID
 */
export const getDeliveryStore = async (storeId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const store = mockStores.get(storeId);
  return store || null;
};

/**
 * Get a store by the caterer's ID in your system
 */
export const getDeliveryStoreByExternalId = async (catererId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Find store with matching external_id
  for (const store of mockStores.values()) {
    if (store.external_id === catererId) {
      return store;
    }
  }
  return null;
};

/**
 * Update a store's information
 */
export const updateDeliveryStore = async (
  storeId,
  updates
) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const store = mockStores.get(storeId);
  if (!store) {
    return null;
  }

  // Update the store
  const updatedStore = {
    ...store,
    ...updates,
    updated_at: formatISO(new Date()),
  };

  mockStores.set(storeId, updatedStore);
  console.log('Updated delivery store:', updatedStore);

  return updatedStore;
};

/**
 * Deactivate a store (instead of deleting)
 */
export const deactivateDeliveryStore = async (storeId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const store = mockStores.get(storeId);
  if (!store) {
    return false;
  }

  // Deactivate the store
  const updatedStore = {
    ...store,
    status: 'inactive',
    updated_at: formatISO(new Date()),
  };

  mockStores.set(storeId, updatedStore);
  console.log('Deactivated delivery store:', updatedStore);

  return true;
};

