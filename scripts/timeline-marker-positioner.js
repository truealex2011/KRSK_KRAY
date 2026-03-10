/**
 * MarkerPositioner - Positions markers along the snake path
 */

class MarkerPositioner {
  /**
   * @param {SVGPathElement} snakePath - The SVG path element
   * @param {NodeList} markerElements - Collection of marker elements
   */
  constructor(snakePath, markerElements) {
    this.snakePath = snakePath;
    this.markerElements = markerElements;
    this.markerRadius = 40; // Half of marker size (80px / 2)
    this.containerHeight = 5000; // SVG viewBox height
  }

  /**
   * Position all markers on the snake path
   */
  positionMarkers() {
    const markerCount = this.markerElements.length;
    const pathLength = this.snakePath.getTotalLength();
    
    this.markerElements.forEach((marker, index) => {
      const position = this.calculateMarkerPosition(index, markerCount, pathLength);
      this.applyMarkerPosition(marker, position);
    });
  }

  /**
   * Calculate position for a specific marker
   * @param {number} index - Marker index
   * @param {number} totalMarkers - Total number of markers
   * @param {number} pathLength - Total path length
   * @returns {Object} Position object with x, y, and side
   */
  calculateMarkerPosition(index, totalMarkers, pathLength) {
    // Distribute markers evenly along the path
    const distance = (pathLength / totalMarkers) * (index + 1);
    
    let point = null;
    try {
      // Get point on SVG path at this distance
      point = this.snakePath.getPointAtLength(distance);
    } catch (e) {
      // Fallback if path methods not available
      const itemHeight = this.containerHeight / totalMarkers;
      const y = (index + 1) * itemHeight;
      point = { x: 300, y: y };
    }

    const side = this.getMarkerSide(index);

    return {
      x: point.x,
      y: point.y,
      side: side
    };
  }

  /**
   * Get marker side (left or right)
   * @param {number} index - Marker index
   * @returns {string} 'left' or 'right'
   */
  getMarkerSide(index) {
    return index % 2 === 0 ? 'right' : 'left';
  }

  /**
   * Apply position to marker element
   * @param {HTMLElement} marker - Marker element
   * @param {Object} position - Position object
   */
  applyMarkerPosition(marker, position) {
    const item = marker.closest('.timeline__item');
    if (!item) return;

    // The SVG path coordinates are in viewBox space (0-600 width, 0-5000 height)
    // We need to position the item relative to the timeline container
    // Position the item so the marker center is on the path
    item.style.position = 'absolute';
    item.style.left = (position.x - this.markerRadius) + 'px';
    item.style.top = (position.y - this.markerRadius) + 'px';

    // Set data attribute for side
    item.setAttribute('data-side', position.side);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MarkerPositioner;
}
