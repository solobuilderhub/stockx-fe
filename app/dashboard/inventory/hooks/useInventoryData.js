"use client"

import { useState, useEffect } from 'react';

// Sample inventory data
const inventoryItems = [
  {
    id: '1',
    image: 'https://images.stockx.com/images/Timberland-6-Inch-Premium-Waterproof-Boots-Wheat-Product.jpg',
    name: 'Timberland 6" Boot Just Don Denim (GS)',
    styleId: 'TB0NLKR/1184 Size: 5.5Y',
    size: '5.5Y',
    quantity: 10,
    dateAdded: '01/01/2025',
    warehouseLocation: 'Northeast',
    cost: '$95.00',
    daysListed: 15,
    spread: 25,
    isLowestAsk: true,
    isExpired: false
  },
  {
    id: '2',
    image: 'https://images.stockx.com/images/Timberland-6-Inch-Premium-Waterproof-Boots-Black-Nubuck-Product.jpg',
    name: 'Timberland 6" Boot Black Nubuck Premium',
    styleId: 'TB00073-009/TB00073-001/TB00073001-001/TB001',
    size: '9.5',
    quantity: 12,
    dateAdded: '01/01/2025',
    warehouseLocation: 'Midwest',
    cost: '$120.00',
    daysListed: 5,
    spread: 40,
    isLowestAsk: false,
    isExpired: false
  },
  {
    id: '3',
    image: 'https://images.stockx.com/images/Timberland-6-Inch-Premium-Waterproof-Boots-Black-Nubuck-Product.jpg',
    name: 'Timberland 6" Boot Black Nubuck Premium',
    styleId: 'TB00073-009/TB00073-001/TB00073001-001/TB001',
    size: '9.5',
    quantity: 15,
    dateAdded: '02/01/2025',
    warehouseLocation: 'West',
    cost: '$120.00',
    daysListed: 30,
    spread: 10,
    isLowestAsk: true,
    isExpired: true
  },
  {
    id: '4',
    image: 'https://images.stockx.com/images/Timberland-6-Inch-Premium-Waterproof-Boots-Black-Nubuck-Product.jpg',
    name: 'Timberland 6" Boot Black Nubuck Premium',
    styleId: 'TB00073-009/TB00073-001/TB00073001-001/TB001',
    size: '9.5',
    quantity: 18,
    dateAdded: '03/01/2025',
    warehouseLocation: 'South',
    cost: '$120.00',
    daysListed: 3,
    spread: 50,
    isLowestAsk: false,
    isExpired: false
  },
  {
    id: '5',
    image: 'https://images.stockx.com/images/Nike-Air-Max-1-Dark-Stucco-Product.jpg',
    name: 'Nike Air Max 1 SC Dark Stucco',
    styleId: 'NK12345-001',
    size: '8.5',
    quantity: 8,
    dateAdded: '03/15/2025',
    warehouseLocation: 'Central',
    cost: '$110.00',
    daysListed: 20,
    spread: 35,
    isLowestAsk: true,
    isExpired: true
  },
  // Generate more mock items to demonstrate pagination
  ...Array.from({ length: 18 }, (_, index) => ({
    id: `${index + 6}`,
    image: 'https://images.stockx.com/images/Nike-Air-Max-1-Dark-Stucco-Product.jpg',
    name: `Nike Air Max ${index + 1} - Sample Item`,
    styleId: `NK${10000 + index}-00${index}`,
    size: `${8 + (index % 5)}`,
    quantity: 5 + (index % 10),
    dateAdded: '04/01/2025',
    warehouseLocation: ['Northeast', 'Midwest', 'West', 'South', 'Central'][index % 5],
    cost: `$${90 + (index * 5)}.00`,
    daysListed: index % 30,
    spread: index % 40,
    isLowestAsk: index % 2 === 0,
    isExpired: index % 3 === 0
  }))
];

export function useInventoryData({ page = 1, limit = 10, searchQuery = '', filters = null }) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    totalDocs: 0,
    limit: limit,
    currentPage: page,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call delay
    setIsLoading(true);
    const timer = setTimeout(() => {
      try {
        // Filter the data based on search query and filters
        let filteredItems = inventoryItems.filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.styleId.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Apply additional filters if they exist
        if (filters) {
          filteredItems = filteredItems.filter(item => {
            // Spread filter
            if (filters.spreadType === 'greater' && (item.spread || 0) < filters.spreadValue) {
              return false;
            }

            // Days Listed filter
            if (filters.daysListedType === 'greater' && (item.daysListed || 0) < filters.daysListedValue) {
              return false;
            }

            // Lowest Ask filter
            if (filters.lowestAsk === 'lowestAsk' && !item.isLowestAsk) {
              return false;
            } else if (filters.lowestAsk === 'notLowestAsk' && item.isLowestAsk) {
              return false;
            }

            // Expired filter
            if (filters.showOnlyExpired && !item.isExpired) {
              return false;
            }

            return true;
          });
        }

        // Calculate pagination values
        const totalDocs = filteredItems.length;
        const totalPages = Math.ceil(totalDocs / limit);
        
        // Get the paginated data
        const startIndex = (page - 1) * limit;
        const paginatedItems = filteredItems.slice(startIndex, startIndex + limit);

        setData(paginatedItems);
        setPagination({
          totalDocs,
          limit,
          currentPage: page,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        });
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }, 500); // Simulate a network delay

    return () => clearTimeout(timer);
  }, [page, limit, searchQuery, filters]);

  return { inventory: data, pagination, isLoading, error };
} 