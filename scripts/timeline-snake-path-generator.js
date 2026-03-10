/**
 * SnakePathGenerator - Generates smooth SVG Bezier curves for timeline snake path
 */

class SnakePathGenerator {
  /**
   * @param {number} containerWidth - Width of the SVG container
   * @param {number} containerHeight - Height of the SVG container
   * @param {number} markerCount - Number of markers in timeline
   */
  constructor(containerWidth, containerHeight, markerCount) {
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
    this.markerCount = markerCount;
    this.amplitude = this.getResponsiveAmplitude();
    this.centerX = containerWidth / 2;
  }

  /**
   * Get responsive amplitude based on viewport width
   * @returns {number} Amplitude in pixels
   */
  getResponsiveAmplitude() {
    const width = window.innerWidth;
    if (width < 768) return 667;
    if (width < 1024) return 833;
    return 1000;
  }

  /**
   * Generate SVG path element with Bezier curves
   * @param {Array} markerPositions - Array of marker positions
   * @returns {SVGPathElement} SVG path element
   */
  generatePath(markerPositions) {
    const pathData = this.getPathData(markerPositions);
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('stroke', '#81C784');
    path.setAttribute('stroke-width', '12');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    return path;
  }

  /**
   * Get SVG path data string
   * @param {Array} markerPositions - Array of marker positions
   * @returns {string} SVG path data
   */
  getPathData(markerPositions) {
    if (!markerPositions || markerPositions.length === 0) {
      return '';
    }

    let pathData = `M ${this.centerX} 0`;

    // Create smooth path through all marker positions
    for (let i = 0; i < markerPositions.length; i++) {
      const currentPos = markerPositions[i];
      const nextPos = markerPositions[i + 1];

      if (!nextPos) {
        // Last marker - just line to it
        pathData += ` L ${currentPos.x} ${currentPos.y}`;
        break;
      }

      // Alternate wave direction for snake effect
      const isGoingRight = i % 2 === 0;
      const waveAmount = this.amplitude * (isGoingRight ? 1 : -1);

      // Calculate control points for smooth Bezier curve
      const segmentHeight = nextPos.y - currentPos.y;
      
      // First control point - early in the curve
      const cp1X = this.centerX + waveAmount * 0.4;
      const cp1Y = currentPos.y + segmentHeight * 0.33;
      
      // Second control point - late in the curve
      const cp2X = this.centerX + waveAmount * 0.6;
      const cp2Y = currentPos.y + segmentHeight * 0.67;

      pathData += ` C ${cp1X} ${cp1Y} ${cp2X} ${cp2Y} ${nextPos.x} ${nextPos.y}`;
    }

    return pathData;
  }

  /**
   * Get marker side (left or right)
   * @param {number} index - Marker index
   * @returns {string} 'left' or 'right'
   */
  getMarkerSide(index) {
    return index % 2 === 0 ? 'right' : 'left';
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SnakePathGenerator;
}
