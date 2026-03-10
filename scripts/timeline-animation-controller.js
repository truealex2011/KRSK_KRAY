/**
 * TimelineAnimationController - Manages animations for timeline path and markers
 */

class TimelineAnimationController {
  /**
   * @param {HTMLElement} timelineElement - The timeline container element
   */
  constructor(timelineElement) {
    this.timelineElement = timelineElement;
    this.svgPath = timelineElement.querySelector('.timeline__line svg path');
    this.markers = timelineElement.querySelectorAll('.timeline__marker');
  }

  /**
   * Animate path load with fade-in effect
   * @returns {Promise} Resolves when animation completes
   */
  animatePathLoad() {
    return new Promise((resolve) => {
      if (!this.svgPath) {
        resolve();
        return;
      }

      // Set initial state
      this.svgPath.style.opacity = '0';
      this.svgPath.style.transition = 'opacity 0.8s ease-in-out';

      // Trigger animation
      requestAnimationFrame(() => {
        this.svgPath.style.opacity = '1';
      });

      // Resolve after animation
      setTimeout(resolve, 800);
    });
  }

  /**
   * Animate markers sequentially with stagger
   * @returns {Promise} Resolves when all animations complete
   */
  animateMarkersSequential() {
    return new Promise((resolve) => {
      const staggerDelay = 100;
      const totalDuration = this.markers.length * staggerDelay + 400;

      this.markers.forEach((marker, index) => {
        const item = marker.closest('.timeline__item');
        if (!item) return;

        setTimeout(() => {
          item.classList.add('timeline__item--animated');
        }, index * staggerDelay);
      });

      setTimeout(resolve, totalDuration);
    });
  }

  /**
   * Enable interactivity after animation
   */
  enableInteractivity() {
    this.markers.forEach((marker) => {
      marker.style.pointerEvents = 'auto';
      marker.style.cursor = 'pointer';
    });
  }

  /**
   * Run complete animation sequence
   * @returns {Promise} Resolves when all animations complete
   */
  async runAnimationSequence() {
    // Disable interactivity during animation
    this.markers.forEach((marker) => {
      marker.style.pointerEvents = 'none';
    });

    // Run animations
    await this.animatePathLoad();
    await this.animateMarkersSequential();

    // Enable interactivity
    this.enableInteractivity();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TimelineAnimationController;
}
