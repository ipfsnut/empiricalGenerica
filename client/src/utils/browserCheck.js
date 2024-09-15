export function checkBrowserCompatibility() {
    const checks = {
      mediaDevices: !!navigator.mediaDevices && !!navigator.mediaDevices.getUserMedia,
      indexedDB: !!window.indexedDB,
      performance: !!window.performance && typeof performance.now === 'function',
    };
  
    const incompatibilities = Object.entries(checks)
      .filter(([, supported]) => !supported)
      .map(([feature]) => feature);
  
    return {
      isCompatible: incompatibilities.length === 0,
      incompatibilities,
    };
  }
  