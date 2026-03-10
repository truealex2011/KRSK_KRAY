/**
 * Economy Tab Interactive Component
 */

class EconomyTab {
  constructor() {
    this.activeAccordion = null;
    this.activeTab = null;
    this.indicatorsExpanded = true;
  }

  initialize() {
    console.log('=== EconomyTab.initialize() called ===');
    console.log('document.readyState:', document.readyState);
    
    // Упрощенная инициализация - только аккордеоны
    console.log('Starting setup methods...');
    this.setupAccordions();
    this.setupIndustryTabs();
    console.log('=== EconomyTab.initialize() complete ===');
  }

  setupMainTabs() {
    const mainTabButtons = document.querySelectorAll('.economy-main-tabs__btn');
    console.log('=== setupMainTabs called ===');
    console.log('Found main tab buttons:', mainTabButtons.length);
    
    if (mainTabButtons.length === 0) {
      console.error('NO MAIN TAB BUTTONS FOUND!');
      console.log('Looking for .economy-main-tabs__btn elements...');
      const allButtons = document.querySelectorAll('[class*="economy"]');
      console.log('Found elements with "economy" in class:', allButtons.length);
      return;
    }
    
    mainTabButtons.forEach((button, index) => {
      console.log(`Setting up button ${index}:`, button.getAttribute('data-tab'));
      
      button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        this.switchMainTab(tabName, button);
      });
    });
    
    console.log('=== setupMainTabs complete ===');
  }

  switchMainTab(tabName, button) {
    console.log('=== switchMainTab called ===');
    console.log('Tab name:', tabName);
    
    const tabsContainer = button.closest('.economy-main-tabs');
    
    if (!tabsContainer) {
      console.log('No tabs container found');
      return;
    }
    
    // Remove active from all buttons and panels
    tabsContainer.querySelectorAll('.economy-main-tabs__btn').forEach(btn => {
      btn.classList.remove('economy-main-tabs__btn--active');
    });
    tabsContainer.querySelectorAll('.economy-main-tabs__panel').forEach(panel => {
      panel.classList.remove('economy-main-tabs__panel--active');
    });
    
    // Add active to clicked button and corresponding panel
    button.classList.add('economy-main-tabs__btn--active');
    const activePanel = tabsContainer.querySelector(`[data-panel="${tabName}"]`);
    console.log('Looking for panel with data-panel:', tabName, 'Found:', activePanel ? 'yes' : 'no');
    if (activePanel) {
      activePanel.classList.add('economy-main-tabs__panel--active');
      console.log('Panel activated successfully');
    }
  }

  setupAccordions() {
    const accordionHeaders = document.querySelectorAll('.economy-accordion__header');
    
    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.economy-accordion__item');
        const isActive = item.classList.contains('active');
        
        // Close all other accordions in the same container
        const container = header.closest('.economy-accordion');
        if (container) {
          container.querySelectorAll('.economy-accordion__item').forEach(el => {
            el.classList.remove('active');
          });
        }
        
        // Toggle clicked accordion
        if (!isActive) {
          item.classList.add('active');
          this.activeAccordion = item;
        } else {
          item.classList.remove('active');
          this.activeAccordion = null;
        }
      });
    });
  }

  setupTabs() {
    const tabButtons = document.querySelectorAll('.economy-tabs__btn');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        const tabsContainer = button.closest('.economy-tabs');
        
        if (!tabsContainer) return;
        
        // Remove active from all buttons and panels in this container
        tabsContainer.querySelectorAll('.economy-tabs__btn').forEach(btn => {
          btn.classList.remove('economy-tabs__btn--active');
        });
        tabsContainer.querySelectorAll('.economy-tabs__panel').forEach(panel => {
          panel.classList.remove('economy-tabs__panel--active');
        });
        
        // Add active to clicked button and corresponding panel
        button.classList.add('economy-tabs__btn--active');
        const activePanel = tabsContainer.querySelector(`[data-panel="${tabName}"]`);
        if (activePanel) {
          activePanel.classList.add('economy-tabs__panel--active');
        }
      });
    });
  }

  setupIndustryTabs() {
    const industryTabButtons = document.querySelectorAll('.industry-tab-btn');
    
    industryTabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        const tabsContainer = button.closest('.economy-accordion__content');
        
        if (!tabsContainer) return;
        
        // Remove active from all buttons and content in this container
        tabsContainer.querySelectorAll('.industry-tab-btn').forEach(btn => {
          btn.classList.remove('industry-tab-btn--active');
        });
        tabsContainer.querySelectorAll('.industry-tab-content').forEach(content => {
          content.classList.remove('industry-tab-content--active');
          content.style.display = 'none';
        });
        
        // Add active to clicked button and corresponding content
        button.classList.add('industry-tab-btn--active');
        const activeContent = tabsContainer.querySelector(`[data-panel="${tabName}"]`);
        if (activeContent) {
          activeContent.classList.add('industry-tab-content--active');
          activeContent.style.display = 'block';
        }
      });
    });
  }
}

// Global function for indicators toggle
function toggleIndicators() {
  const contentDiv = document.getElementById('indicators-content');
  const toggleBtn = document.getElementById('indicators-toggle-btn');
  
  if (!contentDiv || !toggleBtn) return;
  
  const isExpanded = contentDiv.style.maxHeight !== '0px' && contentDiv.style.maxHeight !== '0';
  
  if (isExpanded) {
    // Collapse
    contentDiv.style.maxHeight = '0px';
    toggleBtn.textContent = '▶ Развернуть детали';
    toggleBtn.style.background = 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)';
  } else {
    // Expand
    contentDiv.style.maxHeight = '10000px';
    toggleBtn.textContent = '▼ Свернуть детали';
    toggleBtn.style.background = 'linear-gradient(135deg, #40916C 0%, #52B788 100%)';
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('=== DOMContentLoaded event fired for economy-tab.js ===');
  const economyTab = new EconomyTab();
  economyTab.initialize();
  window.economyTab = economyTab;
  console.log('=== EconomyTab instance created and stored in window ===');
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
  // DOM is still loading, wait for DOMContentLoaded
  console.log('[economy-tab.js] DOM still loading, waiting for DOMContentLoaded');
} else {
  // DOM is already loaded, initialize immediately
  console.log('[economy-tab.js] DOM already loaded, initializing EconomyTab immediately');
  const economyTab = new EconomyTab();
  economyTab.initialize();
  window.economyTab = economyTab;
  console.log('[economy-tab.js] EconomyTab instance created and stored in window');
}

