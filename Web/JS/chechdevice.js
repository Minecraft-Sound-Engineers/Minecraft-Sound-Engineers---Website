function redirectBasedOnDevice() {
  // Get the user agent string
  var userAgent = navigator.userAgent.toLowerCase();

  // Define device types
  var isMobile = /iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(userAgent);
  var isTablet = /ipad|android(?!.*mobile)|windows.*tablet|kindle|silk/i.test(userAgent);
  var isDesktop = !isMobile && !isTablet;

  // Redirect based on device type
  if (isMobile) {
      window.location.href = "Web/HTML/mobile/index.html"; // Mobile website URL
  } else if (isTablet) {
      window.location.href = "Web/HTML/tablet & computer/index.html"; // Tablet website URL
  } else if (isDesktop) {
      window.location.href = "Web/HTML/tablet & computer/index.html"; // Desktop website URL
  }
}