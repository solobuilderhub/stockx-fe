"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, MapPin, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Suggestion categories with custom icons
const searchCategories = [
    { name: "Fast Food", icon: "🍔" },
    { name: "Indian", icon: "🍛" },
    { name: "Halal", icon: "🍖" },
    { name: "Vegetarian", icon: "🥗" },
    { name: "Dessert", icon: "🍰" },
];

// Dummy restaurant data
const popularRestaurants = [
    {
        id: "r1",
        name: "KFC",
        cuisine: "Fast Food • American",
        image: null,
        rating: 4.5,
        deliveryTime: "15-25 min",
    },
    {
        id: "r2",
        name: "Popeyes",
        cuisine: "American • Chicken",
        image: null,
        rating: 4.2,
        deliveryTime: "20-30 min",
    },
    {
        id: "r3",
        name: "Spice Delight",
        cuisine: "Indian • Vegetarian",
        image: null,
        rating: 4.8,
        deliveryTime: "25-35 min",
    },
];

const ExpandedSearch = ({ className, onCollapse, isDesktop = false }) => {
    const router = useRouter();
    // add mock search query and selected location
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [openLocationModal, setOpenLocationModal] = useState(false);

    const [inputFocused, setInputFocused] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    // Focus input on mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Mock search suggestion function
    const getSuggestions = (query) => {
        setLoading(true);

        // Simulate API delay
        setTimeout(() => {
            // Get suggestions from mockData.js based on query
            const mockItems =
                query.length > 0
                    ? [
                          {
                              type: "category",
                              name: "Categories",
                              items: searchCategories
                                  .filter((cat) =>
                                      cat.name
                                          .toLowerCase()
                                          .includes(query.toLowerCase())
                                  )
                                  .slice(0, 3),
                          },
                          {
                              type: "restaurant",
                              name: "Restaurants",
                              items: popularRestaurants.filter(
                                  (item) =>
                                      item.name
                                          .toLowerCase()
                                          .includes(query.toLowerCase()) ||
                                      item.cuisine
                                          .toLowerCase()
                                          .includes(query.toLowerCase())
                              ),
                          },
                          {
                              type: "dish",
                              name: "Popular Dishes",
                              items: [
                                  {
                                      id: "d1",
                                      name: "Butter Chicken",
                                      restaurant: "Spice Delight",
                                      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=684&auto=format&fit=crop",
                                  },
                                  {
                                      id: "d2",
                                      name: "Veggie Biryani",
                                      restaurant: "Curry House",
                                      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=687&auto=format&fit=crop",
                                  },
                              ].filter(
                                  (item) =>
                                      item.name
                                          .toLowerCase()
                                          .includes(query.toLowerCase()) ||
                                      item.restaurant
                                          .toLowerCase()
                                          .includes(query.toLowerCase())
                              ),
                          },
                      ]
                    : [
                          {
                              type: "category",
                              name: "Categories",
                              items: searchCategories.slice(0, 5),
                          },
                          {
                              type: "restaurant",
                              name: "Popular Near You",
                              items: popularRestaurants,
                          },
                          {
                              type: "recent",
                              name: "Recent Searches",
                              items: ["Chicken Biryani", "Halal", "Vegetarian"],
                          },
                      ];

            setSuggestions(
                mockItems.filter((section) => section.items.length > 0)
            );
            setLoading(false);
        }, 300);
    };

    // Get suggestions on query change
    useEffect(() => {
        getSuggestions(searchQuery);
    }, [searchQuery]);

    // Handle search submission
    const handleSearch = (e) => {
        e?.preventDefault();

        // Build search params
        const params = new URLSearchParams();
        if (searchQuery) params.set("q", searchQuery);

        // Add location parameters from global state
        if (selectedLocation?.coordinates) {
            params.set("latitude", selectedLocation.coordinates[0].toString());
            params.set("longitude", selectedLocation.coordinates[1].toString());
            if (selectedLocation.radius) {
                params.set("radius", selectedLocation.radius.toString());
            }
        }

        router.push(`/caterers?${params.toString()}`);
        onCollapse();
    };

    // If in desktop mode, render within the dropdown
    if (isDesktop) {
        return (
            <div className={cn("flex flex-col h-full", className)}>
                {/* Search Header - Styled to exactly match the collapsed search input */}
                <div className="search-header p-3 px-4 border-b flex items-center space-x-3 bg-gray-100">
                    <X
                        className="h-5 w-5 text-gray-500 cursor-pointer"
                        onClick={onCollapse}
                    />
                    <div className="flex-1 flex items-center">
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search StockXGoat"
                            className="expanded-search-input bg-gray-100 flex-1 outline-none text-gray-800 placeholder-gray-600"
                            autoFocus
                        />
                        {searchQuery && (
                            <X
                                className="h-5 w-5 text-gray-500 cursor-pointer"
                                onClick={() => setSearchQuery("")}
                            />
                        )}
                    </div>
                </div>

                {/* Suggestions area - only visible when expanded beyond initial state */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                    className="overflow-auto max-h-[400px] pb-2 pt-1.5 px-2 border-t border-gray-100"
                >
                    <AnimatePresence>
                        {loading ? (
                            <div className="p-4">
                                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-3"></div>
                                <div className="h-12 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div className="h-12 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                {suggestions.length > 0 ? (
                                    suggestions.map((section, i) => (
                                        <div
                                            key={`section-${i}`}
                                            className="mb-4"
                                        >
                                            <h3 className="px-2 text-sm font-semibold text-gray-500 mb-2">
                                                {section.name}
                                            </h3>

                                            {/* Render content based on section type */}
                                            {renderSectionContent(section)}
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-gray-500">
                                        <p>No results found</p>
                                        <p className="text-sm">
                                            Try a different search term
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        );
    }

    // For mobile fullscreen version
    return (
        <div
            className={cn(
                "fixed inset-0 bg-white z-50 flex flex-col",
                className
            )}
        >
            {/* Search Header */}
            <div className="search-header p-3 px-4 border-b flex items-center space-x-3 bg-gray-100">
                <ChevronLeft
                    className="h-5 w-5 text-gray-500 cursor-pointer"
                    onClick={onCollapse}
                />
                <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search StockXGoat"
                    className="expanded-search-input bg-gray-100 flex-1 outline-none text-gray-800 placeholder-gray-600"
                />
                {searchQuery && (
                    <X
                        className="h-5 w-5 text-gray-500 cursor-pointer"
                        onClick={() => setSearchQuery("")}
                    />
                )}
            </div>

            {/* Location bar */}
            <button
                className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 hover:bg-gray-50"
                onClick={openLocationModal}
            >
                <MapPin className="h-4 w-4 text-primary" />
                <div className="flex-1 text-left">
                    <span className="text-sm font-medium">Deliver to</span>
                    <p className="text-sm text-gray-600">
                        {selectedLocation?.name || "Select a location"}
                    </p>
                </div>
            </button>

            {/* Suggestions area */}
            <div className="flex-1 overflow-auto">
                <AnimatePresence>
                    {loading ? (
                        <div className="p-4">
                            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-3"></div>
                            <div className="h-12 bg-gray-200 rounded animate-pulse mb-2"></div>
                            <div className="h-12 bg-gray-200 rounded animate-pulse mb-2"></div>
                            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {suggestions.length > 0 ? (
                                suggestions.map((section, i) => (
                                    <div key={`section-${i}`} className="mb-6">
                                        <h3 className="px-4 text-sm font-semibold text-gray-500 mb-2">
                                            {section.name}
                                        </h3>

                                        {/* Render content based on section type */}
                                        {renderSectionContent(section, true)}
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    <p>No results found</p>
                                    <p className="text-sm">
                                        Try a different search term
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );

    // Helper function to render different section types
    function renderSectionContent(section, isMobile = false) {
        const paddingClass = isMobile ? "px-4" : "px-2";

        switch (section.type) {
            case "category":
                return (
                    <div
                        className={`${
                            isMobile ? "px-4" : "px-2"
                        } overflow-x-auto scrollbar-hide`}
                    >
                        <div className="flex space-x-3">
                            {section.items.map((item, j) => (
                                <button
                                    key={`cat-${j}`}
                                    className="flex flex-col items-center justify-center py-2 px-3 rounded-md min-w-[4.5rem] bg-gray-50"
                                    onClick={() => {
                                        setSearchQuery(item.name);
                                        handleSearch();
                                    }}
                                >
                                    <span className="text-2xl mb-1">
                                        {item.icon}
                                    </span>
                                    <span className="text-xs font-medium truncate max-w-[4.5rem]">
                                        {item.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case "recent":
                return (
                    <div>
                        {section.items.map((item, j) => (
                            <button
                                key={`recent-${j}`}
                                className={`w-full ${paddingClass} py-3 text-left hover:bg-gray-50 flex items-center`}
                                onClick={() => {
                                    setSearchQuery(item);
                                    handleSearch();
                                }}
                            >
                                <Search className="h-5 w-5 text-gray-400 mr-3" />
                                <span>{item}</span>
                            </button>
                        ))}
                    </div>
                );

            case "restaurant":
                return (
                    <div>
                        {section.items.map((item, j) => (
                            <button
                                key={`rest-${j}`}
                                className={`w-full ${paddingClass} py-3 text-left hover:bg-gray-50 flex items-center`}
                                onClick={() => {
                                    setSearchQuery(item.name);
                                    handleSearch();
                                }}
                            >
                                <div className="w-14 h-14 relative rounded-full overflow-hidden mr-3 bg-gray-100 flex-shrink-0">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center font-medium text-lg text-gray-500">
                                            {item.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="font-medium text-base">
                                        {item.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {item.cuisine}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        ⭐ {item.rating} • {item.deliveryTime}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                );

            case "dish":
                return (
                    <div>
                        {section.items.map((item, j) => (
                            <button
                                key={`dish-${j}`}
                                className={`w-full ${paddingClass} py-3 text-left hover:bg-gray-50 flex items-center`}
                                onClick={() => {
                                    setSearchQuery(item.name);
                                    handleSearch();
                                }}
                            >
                                <div className="w-14 h-14 relative rounded-md overflow-hidden mr-3 bg-gray-100 flex-shrink-0">
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="object-cover w-full h-full"
                                        />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">
                                        {item.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {item.restaurant}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    }
};

export default ExpandedSearch;
