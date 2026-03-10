/**
 * ResponsiveTimelineHandler - Handles responsive behavior and resize events
 */

class ResponsiveTimelineHandler {
  /**
   * @param {HTMLElement} timelineElement - The timeline container element
   * @param {SnakePathGenerator} pathGenerator - Path generator instance
   * @param {MarkerPositioner} markerPositioner - Marker positioner instance
   * @param {AnimatedTimeline} timelineInstance - Timeline instance for fixing positions
   */
  constructor(timelineElement, pathGenerator, markerPositioner, timelineInstance) {
    this.timelineElement = timelineElement;
    this.pathGenerator = pathGenerator;
    this.markerPositioner = markerPositioner;
    this.timelineInstance = timelineInstance;
    this.resizeTimeout = null;
    this.debounceDelay = 250;
    this.resizeHandler = () => this.onWindowResize();
  }

  /**
   * Initialize responsive handler
   */
  initialize() {
    window.addEventListener('resize', this.resizeHandler);
  }

  /**
   * Handle window resize event with debouncing
   */
  onWindowResize() {
    clearTimeout(this.resizeTimeout);

    this.resizeTimeout = setTimeout(() => {
      this.updatePathAndMarkers();
    }, this.debounceDelay);
  }

  /**
   * Update path and marker positions after resize
   */
  updatePathAndMarkers() {
    // Update amplitude based on new viewport
    this.pathGenerator.amplitude = this.pathGenerator.getResponsiveAmplitude();

    // Recalculate marker positions
    const markerCount = this.markerPositioner.markerElements.length;
    const markerPositions = this.calculateMarkerPositions(markerCount);

    // Update SVG path
    const svgContainer = this.timelineElement.querySelector('.timeline__line svg');
    if (svgContainer) {
      const pathElement = svgContainer.querySelector('path');
      if (pathElement) {
        const newPathData = this.pathGenerator.getPathData(markerPositions);
        pathElement.setAttribute('d', newPathData);
      }
    }

    // Reposition markers
    this.markerPositioner.positionMarkers();
    
    // Fix marker positions on the new path
    if (this.timelineInstance) {
      this.timelineInstance.fixMarkerPositions();
    }
  }

  /**
   * Calculate marker positions for current viewport
   * @param {number} markerCount - Number of markers
   * @returns {Array} Array of marker positions
   */
  calculateMarkerPositions(markerCount) {
    const positions = [];
    const containerHeight = this.timelineElement.offsetHeight;
    const itemHeight = containerHeight / markerCount;

    for (let i = 0; i < markerCount; i++) {
      positions.push({
        y: (i + 1) * itemHeight,
        x: this.pathGenerator.centerX
      });
    }

    return positions;
  }

  /**
   * Destroy handler and clean up
   */
  destroy() {
    clearTimeout(this.resizeTimeout);
    window.removeEventListener('resize', this.resizeHandler);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ResponsiveTimelineHandler;
}
