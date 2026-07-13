import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WzCard } from './design-system/WzComponents';

interface PlaceData {
  id: number;
  name: string;
  desc: string;
  rating: string;
  color: string;
  icon: string;
  category: string;
}

interface ClusterPinProps {
  onSelect: () => void;
  showIssues: boolean;
}

const PLACES: PlaceData[] = [
  { id: 1, name: "Dishoom Soho", desc: "Indian Restaurant", rating: "4.8 ★ (1,240)", color: "#E15B00", icon: "🍛", category: "Casual Indian" },
  { id: 2, name: "Flat Iron", desc: "Popular Steakhouse", rating: "4.7 ★ (982)", color: "#E15B00", icon: "🥩", category: "Classic Grill" },
  { id: 3, name: "Pizza Pilgrims", desc: "Neapolitan Pizzeria", rating: "4.6 ★ (845)", color: "#E15B00", icon: "🍕", category: "Stonebake" },
  { id: 4, name: "Soho Ramen", desc: "Authentic Noodle Bar", rating: "4.5 ★ (412)", color: "#E15B00", icon: "🍜", category: "Japanese Ramen" },
  { id: 5, name: "Mildreds Soho", desc: "Creative Vegetarian", rating: "4.4 ★ (631)", color: "#E15B00", icon: "🥗", category: "Plant-Based" },
  { id: 6, name: "Burger & Lobster", desc: "Seafood & Grill", rating: "4.6 ★ (1,102)", color: "#E15B00", icon: "🦞", category: "Comfort Food" },
  { id: 7, name: "The Ivy Soho", desc: "Premium British", rating: "4.9 ★ (2,154)", color: "#E15B00", icon: "🍽️", category: "Fine Dining" }
];

// Custom Fork & Spoon SVG matching the Waze Food cluster layout
const ForkSpoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Fork */}
    <path d="M6 3v7a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3" />
    <path d="M8 10v9" />
    {/* Spoon */}
    <path d="M16 11c1.66 0 3-1.5 3-3V5c0-1.5-1.34-2-3-2s-3 .5-3 2v3c0 1.5 1.34 3 3 3z" fill="currentColor" />
    <path d="M16 11v8" />
  </svg>
);

export const ClusterPin: React.FC<ClusterPinProps> = ({ onSelect, showIssues }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredPlaceId, setHoveredPlaceId] = useState<number | null>(null);

  if (!showIssues) return null;

  // Compute angles for the 7 fanned out pins across an upper arc (190° to 350°)
  const getFanCoords = (index: number) => {
    const startAngle = 190;
    const endAngle = 350;
    const totalCount = PLACES.length;
    const step = (endAngle - startAngle) / (totalCount - 1);
    const angleDeg = startAngle + index * step;
    const angleRad = (angleDeg * Math.PI) / 180;
    
    // Distance from center of the fan
    const distance = 105;
    const x = distance * Math.cos(angleRad);
    const y = distance * Math.sin(angleRad);
    
    return { x, y };
  };

  return (
    <div 
      className="relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredPlaceId(null);
      }}
    >
      {/* Absolute Connecting Lines (Faded connector rays) */}
      <AnimatePresence>
        {isHovered && PLACES.map((place, index) => {
          return (
            <motion.div
              key={`line-${place.id}`}
              initial={{ width: 0, rotate: 0 }}
              animate={{ 
                width: 105, 
                rotate: (190 + index * ((350 - 190) / 6)) 
              }}
              exit={{ width: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300, delay: index * 0.02 }}
              className="absolute h-[1.5px] border-b border-dashed border-primary/40 origin-left left-1/2 top-1/2 pointer-events-none z-0"
              style={{ transformOrigin: "0 0" }}
            />
          );
        })}
      </AnimatePresence>

      {/* Fanned Out Singular Place Pins */}
      <AnimatePresence>
        {isHovered && PLACES.map((place, index) => {
          const { x, y } = getFanCoords(index);
          const isThisPlaceHovered = hoveredPlaceId === place.id;
          
          return (
            <motion.div
              key={`pin-${place.id}`}
              initial={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
              animate={{ 
                x: x, 
                y: y, 
                scale: isThisPlaceHovered ? 1.15 : 1, 
                opacity: 1 
              }}
              exit={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 220, delay: index * 0.02 }}
              className="absolute w-11 h-11 pointer-events-auto z-40 transform -translate-x-1/2 -translate-y-1/2"
              onMouseEnter={() => setHoveredPlaceId(place.id)}
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
            >
              <div className="relative w-full h-full cursor-pointer flex items-center justify-center filter drop-shadow-md">
                {/* Colored Pin Core */}
                <div 
                  className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center relative transition-shadow"
                  style={{ 
                    backgroundColor: place.color,
                    boxShadow: isThisPlaceHovered ? '0 0 12px rgba(225,91,0,0.6)' : '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <span className="text-[19px] leading-none mb-0.5 select-none">{place.icon}</span>
                </div>
                
                {/* Pin Arrow Tail */}
                <div 
                  className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px]"
                  style={{ borderTopColor: "white" }}
                />

                {/* Individual Mini Tooltip on Card Hover */}
                <AnimatePresence>
                  {isThisPlaceHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-14 left-1/2 -translate-x-1/2 z-50 w-52 pointer-events-none"
                    >
                      <WzCard elevation={2} className="!p-3 border-hairline relative !rounded-lg text-left bg-white shadow-xl">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-waze-boing font-bold text-content-default text-[13.5px] leading-tight">
                            {place.name}
                          </span>
                          <span className="font-sans text-[11px] text-hint-text font-medium uppercase tracking-wider">
                            {place.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 text-content-p2">
                          <span className="font-sans text-[12px] font-medium text-[#E06B00]">
                            {place.rating}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-content-p3" />
                          <span className="font-sans text-[11px] text-content-p3">
                            Food Cluster
                          </span>
                        </div>
                        <p className="font-sans text-[10px] text-primary font-medium mt-1.5 border-t border-hairline pt-1">
                          Click to select details
                        </p>
                      </WzCard>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Center Cluster Master Base Pin */}
      <motion.div 
        animate={{ scale: isHovered ? 1.08 : 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        className="relative z-30 flex items-center bg-white border-2 border-white rounded-full shadow-elevation-3 py-1 pl-1.5 pr-3 cursor-pointer h-12 w-[82px] overflow-hidden select-none"
      >
        <div className="w-[36px] h-[36px] rounded-full bg-[#E06B00] border border-white flex items-center justify-center text-white shadow-sm flex-shrink-0 z-10">
          <ForkSpoonIcon />
        </div>

        {/* Multi-layered Crescent Effect to represent a stack of 4 pins */}
        <div className="relative flex-1 h-full flex items-center pointer-events-none">
          <div 
            className="absolute left-[30px] w-[30px] h-[30px] rounded-full bg-[#FFB300] border border-white z-0" 
            style={{ 
              clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)',
              transform: isHovered ? 'translateX(6px)' : 'translateX(0px)',
              transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
            }} 
          />
          <div 
            className="absolute left-[36px] w-[26px] h-[26px] rounded-full bg-[#FFCA28] border border-white z-0" 
            style={{ 
              clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)',
              transform: isHovered ? 'translateX(10px)' : 'translateX(0px)',
              transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
            }} 
          />
          <div 
            className="absolute left-[40px] w-[22px] h-[22px] rounded-full bg-[#FFE082] border border-white z-0" 
            style={{ 
              clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)',
              transform: isHovered ? 'translateX(12px)' : 'translateX(0px)',
              transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
            }} 
          />
        </div>

        {/* Counter Badge */}
        <div className="absolute top-0 right-1 border border-white shadow-sm bg-primary text-white text-[9px] font-waze-boing font-black rounded-full w-4.5 h-4.5 flex items-center justify-center z-20">
          7
        </div>
      </motion.div>
    </div>
  );
};
