"use client"

import { useState, useEffect } from 'react';

// Mock listings data
const listingsData = [
  {
    id: '1',
    image: 'https://images.stockx.com/images/Air-Jordan-4-Retro-Thunder-2023-Product.jpg',
    name: 'Air Jordan 4 Retro Thunder (2023)',
    styleId: 'DH6927-017',
    size: '11',
    askPrice: '$259.00',
    lowestAsk: '$245.00',
    highestBid: '$220.00',
    status: 'active',
    dateAdded: '01/05/2025',
    expiryDate: '02/05/2025',
    spread: 14,
    isLowestAsk: false
  },
  {
    id: '2',
    image: 'https://images.stockx.com/images/Nike-Dunk-Low-Retro-White-Black-2021-Product.jpg',
    name: 'Nike Dunk Low Retro White Black Panda (2021)',
    styleId: 'DD1391-100',
    size: '9',
    askPrice: '$130.00',
    lowestAsk: '$120.00',
    highestBid: '$115.00',
    status: 'active',
    dateAdded: '01/08/2025',
    expiryDate: '02/08/2025',
    spread: 10,
    isLowestAsk: false
  },
  {
    id: '3',
    image: 'https://images.stockx.com/images/adidas-Yeezy-Boost-350-V2-Zebra-Product.jpg',
    name: 'adidas Yeezy Boost 350 V2 Zebra',
    styleId: 'CP9654',
    size: '10',
    askPrice: '$280.00',
    lowestAsk: '$280.00',
    highestBid: '$250.00',
    status: 'active',
    dateAdded: '01/03/2025',
    expiryDate: '02/03/2025',
    spread: 30,
    isLowestAsk: true
  },
  {
    id: '4',
    image: 'https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Spider-Man-Across-the-Spider-Verse-Product.jpg',
    name: 'Air Jordan 1 High OG Spider-Man Across the Spider-Verse',
    styleId: 'DV1748-601',
    size: '10.5',
    askPrice: '$190.00',
    lowestAsk: '$180.00',
    highestBid: '$175.00',
    status: 'expired',
    dateAdded: '12/15/2024',
    expiryDate: '01/15/2025',
    spread: 10,
    isLowestAsk: false
  },
  {
    id: '5',
    image: 'https://images.stockx.com/images/Air-Jordan-4-Retro-Military-Black-Product.jpg',
    name: 'Air Jordan 4 Retro Military Black',
    styleId: 'DH6927-111',
    size: '9.5',
    askPrice: '$320.00',
    lowestAsk: '$320.00',
    highestBid: '$300.00',
    status: 'active',
    dateAdded: '01/10/2025',
    expiryDate: '02/10/2025',
    spread: 20,
    isLowestAsk: true
  },
  // Generate more mock items to demonstrate pagination
  ...Array.from({ length: 15 }, (_, index) => ({
    id: `${index + 6}`,
    image: 'https://images.stockx.com/images/Nike-Dunk-Low-Retro-White-Black-2021-Product.jpg',
    name: `Nike ${['Air Max', 'Dunk Low', 'Air Force 1', 'SB Dunk', 'Blazer'][index % 5]} Sample Item ${index + 1}`,
    styleId: `NK${10000 + index}`,
    size: `${8 + (index % 5)}`,
    askPrice: `$${120 + (index * 5)}.00`,
    lowestAsk: `$${115 + (index * 5)}.00`,
    highestBid: `$${100 + (index * 5)}.00`,
    status: index % 4 === 0 ? 'expired' : 'active',
    dateAdded: '01/15/2025',
    expiryDate: '02/15/2025',
    spread: index % 15 + 5,
    isLowestAsk: index % 3 === 0
  }))
];

// Helper function to extract numeric value from price string
const extractPrice = (priceStr) => {
  if (!priceStr) return 0;
  return parseFloat(priceStr.replace('$', '').replace(',', ''));
};

// Mock React Query hook
export function useListings({
  token,
  params = {
    page: 1,
    limit: 10,
    status: '',
    search: '',
    sortBy: 'newest',
    spreadFilter: '',
    minPrice: '',
    maxPrice: ''
  }
}) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    totalDocs: 0,
    totalPages: 0,
    currentPage: params.page || 1,
    limit: params.limit || 10,
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
        // Apply all filters to the data
        let filteredData = [...listingsData];
        
        // Filter by status
        if (params.status && params.status !== 'all') {
          filteredData = filteredData.filter(item => item.status === params.status);
        }

        // Filter by search
        if (params.search) {
          const searchLower = params.search.toLowerCase();
          filteredData = filteredData.filter(item => 
            item.name.toLowerCase().includes(searchLower) || 
            item.styleId.toLowerCase().includes(searchLower)
          );
        }

        // Filter by price range
        if (params.minPrice) {
          const minPrice = parseFloat(params.minPrice);
          filteredData = filteredData.filter(item => 
            extractPrice(item.askPrice) >= minPrice
          );
        }
        
        if (params.maxPrice) {
          const maxPrice = parseFloat(params.maxPrice);
          filteredData = filteredData.filter(item => 
            extractPrice(item.askPrice) <= maxPrice
          );
        }

        // Filter by spread
        if (params.spreadFilter) {
          switch(params.spreadFilter) {
            case 'positive':
              filteredData = filteredData.filter(item => item.spread > 0);
              break;
            case 'negative':
              filteredData = filteredData.filter(item => item.spread < 0);
              break;
            case 'zero':
              filteredData = filteredData.filter(item => item.spread === 0);
              break;
          }
        }

        // Sort the data
        if (params.sortBy) {
          switch(params.sortBy) {
            case 'newest':
              filteredData.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
              break;
            case 'oldest':
              filteredData.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
              break;
            case 'price_high':
              filteredData.sort((a, b) => extractPrice(b.askPrice) - extractPrice(a.askPrice));
              break;
            case 'price_low':
              filteredData.sort((a, b) => extractPrice(a.askPrice) - extractPrice(b.askPrice));
              break;
            case 'spread_high':
              filteredData.sort((a, b) => b.spread - a.spread);
              break;
            case 'spread_low':
              filteredData.sort((a, b) => a.spread - b.spread);
              break;
          }
        }

        // Calculate pagination
        const totalDocs = filteredData.length;
        const totalPages = Math.ceil(totalDocs / (params.limit || 10));
        const page = params.page || 1;
        
        // Paginate the data
        const startIndex = (page - 1) * (params.limit || 10);
        const endIndex = startIndex + (params.limit || 10);
        const paginatedData = filteredData.slice(startIndex, endIndex);

        setData(paginatedData);
        setPagination({
          totalDocs,
          totalPages,
          currentPage: page,
          limit: params.limit || 10,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        });
        setIsLoading(false);
      } catch (err) {
        setError('An error occurred while fetching listings.');
        setIsLoading(false);
      }
    }, 800); // Simulate network delay

    return () => clearTimeout(timer);
  }, [
    params.page, 
    params.limit, 
    params.status,
    params.search,
    params.sortBy,
    params.spreadFilter,
    params.minPrice,
    params.maxPrice
  ]);

  // Format the response to match React Query pattern
  return {
    orders: data,
    pagination,
    isLoading,
    error,
    refetch: () => {
      setIsLoading(true);
      // Re-run the effect
      const timer = setTimeout(() => {
        // This will trigger the useEffect above
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  };
} 