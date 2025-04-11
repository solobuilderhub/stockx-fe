"use client";

import { useState, useEffect } from "react";
import ExpandedSearch from "./ExpandedSearch";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Search, MapPin } from "lucide-react";

const MobileSearch = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(false);


  // Prevent body scrolling when search is expanded
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);
  
  // Display location text
  const getDisplayLocation = () => {
    return "Select location";
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Fixed Search Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 px-4 pb-2  bg-white dark:bg-black">
        <motion.div 
          className="flex items-center gap-2 bg-gray-50 rounded-full p-2 border border-gray-200"
          onClick={() => setIsExpanded(true)}
          whileTap={{ scale: 0.98 }}
        >
          <Search className="h-5 w-5 text-gray-500" />
          <span className="text-gray-500 flex-1">Search caterers</span>
        </motion.div>
      </div>
      
  
      
      {/* Non-fixed Delivery Location */}
      <div className="mt-16 py-2 px-4 ">
        <motion.div 
          className="flex items-center text-sm font-medium text-primary" 
          onClick={() => setIsExpanded(true)}
          whileTap={{ scale: 0.98 }}
        >
          <MapPin className="h-4 w-4 mr-1" />
          <span>Delivery: {getDisplayLocation()}</span>
        </motion.div>
      </div>
      
      {/* Full Search UI - Only visible when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <ExpandedSearch onCollapse={() => setIsExpanded(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileSearch; 