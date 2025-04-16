// Traditional single-row badge generator
export default function generateBadgeSVG(
  label: string,
  status: string,
  labelColor: string | null,
  statusColor: string | null,
): string {
  // Calculate widths based on text length
  const logoWidth = 22; // Logo plus padding
  const labelTextWidth = label.length * 6.5; // Approximate width calculation
  const labelWidth = logoWidth + labelTextWidth;
  const statusWidth = status.length * 7.5; // Approximate width calculation
  const totalWidth = labelWidth + statusWidth;

  // Use defaults if colors are not provided
  const finalLabelColor = labelColor || "555";
  const finalStatusColor = statusColor || "4c1";

  // Custom logo SVG as a string
  const customLogoSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="14" height="14">
      <polygon 
        points="150,40 250,95 250,205 150,260 50,205 50,95" 
        fill="#00ffff" 
        stroke-width="4" />
      <path 
        d="M150,150 L250,150 L250,205 L150,260 Z" 
        fill="#ff3399" 
        stroke="#ffffff" 
        stroke-width="16" />
    </svg>
  `;

  // Generate the SVG string
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20" viewBox="0 0 ${totalWidth} 20">
      <defs>
        <linearGradient id="gradient" x2="0" y2="100%">
          <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
          <stop offset="1" stop-opacity=".1"/>
        </linearGradient>
      </defs>
      
      <!-- Main background with rounded corners -->
      <rect width="${totalWidth}" height="20" rx="3" fill="#${finalLabelColor}"/>
      
      <!-- Left section (label) -->
      <rect width="${labelWidth}" height="20" rx="3" fill="#${finalLabelColor}"/>
      
      <!-- Right section (status) -->
      <rect x="${labelWidth}" width="${statusWidth}" height="20" fill="#${finalStatusColor}"/>
      
      <!-- Right rounded corner fix -->
      <rect x="${labelWidth}" width="4" height="20" fill="#${finalStatusColor}"/>
      
      <!-- Gradient overlay -->
      <rect width="${totalWidth}" height="20" rx="3" fill="url(#gradient)"/>
      
      <!-- Logo -->
      <g transform="translate(9, 3)">
        ${customLogoSVG}
      </g>
      
      <!-- Text -->
      <text x="${logoWidth}" y="14" fill="#fff" font-family="Verdana, DejaVu Sans, sans-serif" font-size="11">${label}</text>
      <text x="${labelWidth + statusWidth / 2}" y="14" fill="#fff" font-family="Verdana, DejaVu Sans, sans-serif" font-size="11" text-anchor="middle">${status}</text>
    </svg>
  `;
}
