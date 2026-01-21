/**
 * Color utility functions for ChatBot accent colors
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface ColorVariants {
  accentRgb: string;
  lighterRgb: string;
  darkerRgb: string;
  hexColor: string;
}

/**
 * Maps accent color names to their hex values
 */
export function getHexColor(colorName: string): string {
  const accentColorMap: Record<string, string> = {
    orange: '#f97316',
    blue: '#3b82f6',
    green: '#22c55e',
    purple: '#a855f7',
    pink: '#ec4899',
    red: '#ef4444',
  };
  return accentColorMap[colorName] || accentColorMap.orange;
}

/**
 * Converts hex color to RGB values
 */
export function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 234, g: 88, b: 12 }; // Fallback to orange
}

/**
 * Generates color variants (accent, lighter, darker) from a color name
 */
export function getColorVariants(colorName: string): ColorVariants {
  const hexColor = getHexColor(colorName);
  const rgb = hexToRgb(hexColor);
  
  const accentRgb = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
  const lighterRgb = `${Math.min(rgb.r + 30, 255)}, ${Math.min(rgb.g + 30, 255)}, ${Math.min(rgb.b + 30, 255)}`;
  const darkerRgb = `${Math.max(rgb.r - 30, 0)}, ${Math.max(rgb.g - 30, 0)}, ${Math.max(rgb.b - 30, 0)}`;

  return {
    accentRgb,
    lighterRgb,
    darkerRgb,
    hexColor
  };
}
