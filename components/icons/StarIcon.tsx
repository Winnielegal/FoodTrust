import React from 'react';

interface StarIconProps extends React.SVGProps<SVGSVGElement> {
  solid?: boolean;
}

export const StarIcon: React.FC<StarIconProps> = ({ solid, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={solid ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.324l5.584.532a.562.562 0 01.314.949l-4.223 3.518a.563.563 0 00-.162.531l1.24 5.273a.563.563 0 01-.844.57l-4.898-2.928a.563.563 0 00-.527 0l-4.898 2.928a.563.563 0 01-.844-.57l1.24-5.273a.563.563 0 00-.162-.531l-4.223-3.518a.562.562 0 01.314-.949l5.584-.532a.563.563 0 00.475-.324l2.125-5.111z" />
  </svg>
);
