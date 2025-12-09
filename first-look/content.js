// content.js - Simplified Facebook Extension Content Script

// Prevent duplicate execution
(function () {
  if (window.fbEngagerContentScriptLoaded) return;
  window.fbEngagerContentScriptLoaded = true;

  // Core state - simplified from 15+ to essential variables
  const state = {
    isInitialized: false,
    debugMode: false,
    extractedUsernames: new Set(),
    lastExtractionTime: 0,
    extractionCount: 0,
    cooldownSetting: 25,
    extractionCountLimit: 50,
    currentPostId: null,
    modalObserver: null,
    feedObserver: null,
    statsInterval: null,
    cleanupInterval: null,
    lastModalStatus: { modalDetected: false, modalType: null, postId: null },
  };

  // Debug mode
  let DEBUG_MODE = false;

  // Initialize from storage
  chrome.storage.local.get(
    [
      "debugMode",
      "extractedUsernames",
      "lastExtractionTime",
      "extractionCount",
      "cooldownSetting",
      "extractionCountLimit",
    ],
    (result) => {
      DEBUG_MODE = state.debugMode = result.debugMode || false;
      if (result.extractedUsernames)
        state.extractedUsernames = new Set(result.extractedUsernames);
      state.lastExtractionTime = result.lastExtractionTime || 0;
      state.extractionCount = result.extractionCount || 0;
      state.cooldownSetting = result.cooldownSetting || 25;
      state.extractionCountLimit = result.extractionCountLimit || 50;
    }
  );

  // Helper function to handle post changes and update post info (without resetting usernames)
  function handlePostChange(newPostInfo) {
    const currentPostId = state.currentPostId;
    const newPostId = newPostInfo?.postId || null;

    console.log(
      `[POST_CHANGE] Checking post change: current=${currentPostId}, new=${newPostId}`
    );

    // Check if this is a different post
    if (currentPostId !== newPostId) {
      console.log(
        `[POST_CHANGE] Post changed from ${currentPostId} to ${newPostId}, updating post info`
      );

      // Reset modal status when post changes
      state.lastModalStatus = {
        modalDetected: false,
        modalType: null,
        postId: null,
      };

      // Update current post ID
      state.currentPostId = newPostId;

      // Send postChanged message to popup
      console.log(`[POST_CHANGE] Sending postChanged message to popup`);
      safeSendMessage({
        action: "postChanged",
        oldPost: { postId: currentPostId },
        newPost: newPostInfo,
      });
    } else {
      console.log(
        `[POST_CHANGE] Post ID same (${currentPostId}), no update needed`
      );
    }
  }

  // Send real-time stats updates to popup
  function sendStatsUpdate() {
    try {
      const modalStatus = checkModalStatus();
      const stats = {
        totalComments:
          modalStatus.modalDetected && modalStatus.modalType === "Comments"
            ? modalStatus.totalComments || 0
            : 0,
        capturedUsernames: state.extractedUsernames.size,
        isExtracting: false, // This will be set by extraction function
        lastUpdate: Date.now(),
      };

      safeSendMessage({
        action: "statsUpdate",
        stats: stats,
      });
    } catch (error) {
      if (state.debugMode) console.log("Error sending stats update:", error);
    }
  }

  // Start periodic stats updates when modal is detected
  function startStatsUpdates() {
    if (state.statsUpdateInterval) return; // Already running

    state.statsUpdateInterval = setInterval(() => {
      // Only send updates if we have a modal and it's been at least 1 second since last update
      const now = Date.now();
      const timeSinceLastUpdate = now - (state.lastStatsUpdate || 0);

      if (timeSinceLastUpdate >= 1000) {
        // Reduced from 3 seconds to 1 second for more responsive updates
        const modalStatus = checkModalStatus();
        if (modalStatus.modalDetected && modalStatus.modalType === "Comments") {
          sendStatsUpdate();
          state.lastStatsUpdate = now;
        }
      }
    }, 2000); // Check every 2 seconds instead of 5

    if (state.debugMode)
      console.log("Started optimized periodic stats updates");
  }

  // Dynamic comment counting with real-time updates during scrolling
  function startDynamicCommentCounting() {
    if (state.dynamicCommentObserver) return; // Already running

    const modal =
      document.querySelector('[role="dialog"]') ||
      document.querySelector('[aria-modal="true"]') ||
      document.querySelector('div[data-visualcompletion="ignore-dynamic"]') ||
      document.querySelector("div[data-pagelet][data-visualcompletion]");

    if (!modal) return;

    // Create a mutation observer for dynamic comment updates
    state.dynamicCommentObserver = new MutationObserver((mutations) => {
      let hasNewComments = false;

      for (const mutation of mutations) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if this is a comment element
              if (
                node.matches(
                  '[data-testid*="comment"], div[role="article"], [data-commentid], [data-testid*="Comment"]'
                ) ||
                node.querySelector(
                  '[data-testid*="comment"], div[role="article"], [data-commentid]'
                )
              ) {
                hasNewComments = true;
                break;
              }
            }
          }
        }
      }

      // If new comments were added, send immediate stats update
      if (hasNewComments) {
        const now = Date.now();
        const timeSinceLastUpdate = now - (state.lastStatsUpdate || 0);

        // Update more frequently - every 500ms instead of 1000ms for instant feedback
        if (timeSinceLastUpdate >= 500) {
          const modalStatus = checkModalStatus();
          if (
            modalStatus.modalDetected &&
            modalStatus.modalType === "Comments"
          ) {
            sendStatsUpdate();
            state.lastStatsUpdate = now;
          }
        }
      }
    });

    // Observe the modal for new comment additions
    state.dynamicCommentObserver.observe(modal, {
      childList: true,
      subtree: true,
    });

    // Add scroll listener for loading more comments with more frequent updates
    state.scrollListener = () => {
      const now = Date.now();
      const timeSinceLastScroll = now - (state.lastScrollTime || 0);

      // Throttle scroll events to every 200ms instead of 500ms for more responsive updates
      if (timeSinceLastScroll >= 200) {
        const modalStatus = checkModalStatus();
        if (modalStatus.modalDetected && modalStatus.modalType === "Comments") {
          // Check if we're near the bottom (within 200px)
          const scrollTop = modal.scrollTop;
          const scrollHeight = modal.scrollHeight;
          const clientHeight = modal.clientHeight;

          if (scrollHeight - scrollTop - clientHeight < 200) {
            // Try to load more comments
            loadMoreContentFast(modal);
          }

          // Send stats update on scroll - more frequent updates (every 1s instead of 2s)
          const timeSinceLastUpdate = now - (state.lastStatsUpdate || 0);
          if (timeSinceLastUpdate >= 1000) {
            // Every 1 second during scroll
            sendStatsUpdate();
            state.lastStatsUpdate = now;
          }
        }
        state.lastScrollTime = now;
      }
    };

    modal.addEventListener("scroll", state.scrollListener, { passive: true });

    if (state.debugMode)
      console.log("Started dynamic comment counting with real-time updates");
  }

  // Stop dynamic comment counting
  function stopDynamicCommentCounting() {
    if (state.dynamicCommentObserver) {
      state.dynamicCommentObserver.disconnect();
      state.dynamicCommentObserver = null;
    }

    if (state.scrollListener) {
      const modal =
        document.querySelector('[role="dialog"]') ||
        document.querySelector('[aria-modal="true"]') ||
        document.querySelector('div[data-visualcompletion="ignore-dynamic"]') ||
        document.querySelector("div[data-pagelet][data-visualcompletion]");

      if (modal) {
        modal.removeEventListener("scroll", state.scrollListener);
      }
      state.scrollListener = null;
    }

    if (state.debugMode) console.log("Stopped dynamic comment counting");
  }

  // Stop periodic stats updates
  function stopStatsUpdates() {
    if (state.statsUpdateInterval) {
      clearInterval(state.statsUpdateInterval);
      state.statsUpdateInterval = null;
      if (state.debugMode) console.log("Stopped periodic stats updates");
    }
  }

  window.addEventListener("unload", () => {
    // Force cleanup of all observers
    if (state.modalObserver) {
      state.modalObserver.disconnect();
      state.modalObserver = null;
    }
    if (state.modalContentObserver) {
      state.modalContentObserver.disconnect();
      state.modalContentObserver = null;
    }
    if (state.statusCheckInterval) {
      clearInterval(state.statusCheckInterval);
      state.statusCheckInterval = null;
    }
    // Stop periodic stats updates
    stopStatsUpdates();
    // Stop dynamic comment counting
    stopDynamicCommentCounting();
  });

  // Also clean up on visibility change (when tab becomes hidden)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      // Reduce resource usage when tab is not visible
      // Keep essential functionality but reduce polling frequency
    }
  });

  // Check if Facebook page is in a healthy state
  function checkFacebookPageHealth() {
    try {
      // Check for critical Facebook elements that should always be present
      const criticalSelectors = ["body", "[data-testid]"];

      let healthScore = 0;
      const issues = [];

      for (const selector of criticalSelectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          issues.push(`Missing: ${selector}`);
        } else {
          healthScore += 1;
        }
      }

      // Check for JavaScript errors in the last few seconds
      const hasRecentErrors = window.__fbErrors && window.__fbErrors.length > 0;

      // Check if the page is still loading
      const isLoading = document.readyState !== "complete";

      const healthStatus = {
        score: healthScore / criticalSelectors.length,
        issues,
        hasRecentErrors,
        isLoading,
        isHealthy:
          healthScore >= 1 && // Require at least body element
          !isLoading, // Page must be loaded
      };

      if (state.debugMode)
        console.log("Facebook page health check:", healthStatus);
      return healthStatus;
    } catch (error) {
      if (state.debugMode)
        console.log("Error checking Facebook health:", error);
      return {
        score: 0,
        issues: ["Health check failed"],
        hasRecentErrors: true,
        isLoading: false,
        isHealthy: false,
      };
    }
  }

  function initializeContentScript() {
    if (state.isInitialized) return;
    const attempts = state.initializationAttempts + 1;
    state.initializationAttempts = attempts;

    try {
      // Check if we're on Facebook
      if (!window.location.hostname.includes("facebook.com")) {
        if (state.debugMode)
          console.log("Not on Facebook, skipping initialization");
        return;
      }

      // Check Facebook page health before proceeding
      const healthStatus = checkFacebookPageHealth();
      if (!healthStatus.isHealthy) {
        if (state.debugMode)
          console.log(
            "Facebook page not healthy, delaying initialization:",
            healthStatus
          );
        if (attempts < state.maxInitAttempts) {
          setTimeout(initializeContentScript, 2000); // Wait longer for unhealthy pages
        } else {
          console.warn(
            "Failed to initialize due to Facebook page health issues after",
            state.maxInitAttempts,
            "attempts"
          );
        }
        return;
      }

      // Check if DOM is ready
      if (
        document.readyState !== "complete" &&
        document.readyState !== "interactive"
      ) {
        if (attempts < state.maxInitAttempts) {
          setTimeout(initializeContentScript, 500);
        } else {
          console.warn(
            "Failed to initialize content script after",
            state.maxInitAttempts,
            "attempts"
          );
        }
        return;
      }

      state.isInitialized = true;
      if (state.debugMode)
        console.log(
          "Content script initialized successfully on:",
          window.location.href
        );

      // Set up initial observers and monitoring
      setupModalDetectionObserver();
      setupFeedPostObserver();

      // Add periodic memory cleanup every 5 minutes
      const memoryCleanupInterval = setInterval(() => {
        try {
          // Force garbage collection hint (if available)
          if (window.gc) {
            window.gc();
          }

          // Check for orphaned observers and clean them up
          const observers = ["modalObserver", "modalContentObserver"];
          observers.forEach((key) => {
            const observer = state[key];
            if (observer && observer._isDisconnected) {
              state[key] = null;
            }
          });

          // Clean up any intervals that might have been orphaned
          const intervals = [
            "modalStatusCheckInterval",
            "urlCheckInterval",
            "modalCheckInterval",
          ];

          intervals.forEach((intervalKey) => {
            const interval = state[intervalKey];
            if (interval && typeof interval === "number") {
              clearInterval(interval);
              state[intervalKey] = null;
            }
          });

          if (state.debugMode) {
            console.log("Periodic memory cleanup completed");
          }
        } catch (error) {
          if (state.debugMode) {
            console.log("Error during memory cleanup:", error);
          }
        }
      }, 300000); // Every 5 minutes
      state.memoryCleanupInterval = memoryCleanupInterval;

      // Cleanup function for intervals
      window.addEventListener("beforeunload", () => {
        const memoryInterval = state.memoryCleanupInterval;
        if (memoryInterval) {
          clearInterval(memoryInterval);
        }
        // Stop periodic stats updates
        stopStatsUpdates();
      });
    } catch (error) {
      console.error("Content script initialization error:", error);
      if (attempts < state.maxInitAttempts) {
        setTimeout(initializeContentScript, 1000);
      } else {
        console.error(
          "Content script initialization failed permanently after",
          state.maxInitAttempts,
          "attempts"
        );
      }
    }
  }

  function waitForDOMReady() {
    return new Promise((resolve) => {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", resolve);
      } else {
        resolve();
      }
    });
  }

  // Initialize when DOM is ready with multiple fallback attempts
  waitForDOMReady().then(() => {
    initializeContentScript();
  });

  // Also try to initialize after a short delay as backup
  setTimeout(() => {
    if (!state.isInitialized) {
      initializeContentScript();
    }
  }, 1000);

  // And try again after page load
  window.addEventListener("load", () => {
    if (!state.isInitialized) {
      initializeContentScript();
    }
  });

  // Set up a high-performance mutation observer to detect when modals are added to the DOM
  function setupModalDetectionObserver() {
    if (state.modalObserver) return;

    // Prevent duplicate observer setup
    if (state.modalObserver) {
      state.modalObserver.disconnect();
      state.modalObserver = null;
    }

    // Use more targeted observation - focus on document body for modal detection
    const targetSelectors = [
      "body",
      '[role="main"]',
      '[data-pagelet="Root"]',
      // More modern Facebook selectors
      '[data-visualcompletion="ignore-dynamic"]',
      "[data-instancekey]",
    ];

    let targetElement = null;
    for (const selector of targetSelectors) {
      targetElement = document.querySelector(selector);
      if (targetElement) break;
    }

    if (!targetElement) {
      targetElement = document.body; // Fallback
    }

    const modalObserver = new MutationObserver((mutations) => {
      // Process mutations in batches to reduce overhead
      let hasNewNodes = false;
      const addedElements = [];

      for (const mutation of mutations) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          hasNewNodes = true;
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              addedElements.push(node);
            }
          }
        }
      }

      // Only process if we have new elements
      if (!hasNewNodes || addedElements.length === 0) return;

      // Debounce processing to avoid excessive calls
      if (modalObserver._processingTimer) {
        clearTimeout(modalObserver._processingTimer);
      }

      modalObserver._processingTimer = setTimeout(() => {
        processAddedElements(addedElements);
      }, 5); // Ultra-fast processing for immediate response
    });

    // Observe with more specific options to reduce noise
    modalObserver.observe(targetElement, {
      childList: true,
      subtree: false, // Don't observe entire subtree to reduce overhead
    });

    state.modalObserver = modalObserver;

    // Separate function to process added modal elements
    function processAddedElements(elements) {
      for (const element of elements) {
        // Quick check for modal characteristics
        if (
          element.matches('[role="dialog"]') ||
          element.matches('[aria-modal="true"]') ||
          element.matches('div[data-visualcompletion="ignore-dynamic"]') ||
          element.matches("div[data-pagelet][data-visualcompletion]") ||
          element.querySelector('[role="dialog"]') ||
          element.querySelector('[aria-modal="true"]') ||
          element.querySelector('div[data-visualcompletion="ignore-dynamic"]')
        ) {
          if (state.debugMode)
            console.log("Modal detected via optimized observer:", element);

          // Immediate processing with minimal overhead
          handleModalDetection(element);
        }
      }
    }

    // Optimized modal handling
    function handleModalDetection(_modalElement) {
      // Check if this is a comments modal
      const modalStatus = checkModalStatus();
      if (modalStatus.modalDetected && modalStatus.modalType === "Comments") {
        if (state.debugMode) {
          console.log("[MODAL_OBSERVER] Comments modal detected");
        }

        // Update modal status
        state.lastModalStatus = modalStatus;

        // Trigger post detection for the modal
        const postInfo = extractCurrentPostInfo();
        if (postInfo) {
          handlePostChange(postInfo);
        }

        // Start stats updates for the modal
        startStatsUpdates();

        // Start dynamic comment counting with real-time updates
        startDynamicCommentCounting();
      } else {
        // Modal closed or not a comments modal, stop dynamic counting
        stopDynamicCommentCounting();
      }
    }
  }
  function setupFeedPostObserver() {
    if (state.feedPostObserver) return;

    // Use more targeted observation - focus on feed containers
    const targetSelectors = [
      '[role="main"]',
      '[data-pagelet="Feed"]',
      "#contentArea",
      ".home",
      'div[data-pagelet*="Feed"]',
    ];

    let targetElement = null;
    for (const selector of targetSelectors) {
      targetElement = document.querySelector(selector);
      if (targetElement) break;
    }

    if (!targetElement) {
      targetElement = document.body; // Fallback
    }

    const feedPostObserver = new MutationObserver((mutations) => {
      // Skip if we have an active modal (modal detection takes priority)
      if (state.lastModalStatus?.modalDetected) return;

      // Process mutations in batches for efficiency
      let hasNewNodes = false;
      const addedElements = [];

      for (const mutation of mutations) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          hasNewNodes = true;
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              addedElements.push(node);
            }
          }
        }
      }

      // Only process if we have new elements
      if (!hasNewNodes || addedElements.length === 0) return;

      // Debounce processing to avoid excessive calls
      if (feedPostObserver._processingTimer) {
        clearTimeout(feedPostObserver._processingTimer);
      }

      feedPostObserver._processingTimer = setTimeout(() => {
        processFeedElements(addedElements);
      }, 25); // Reduced from 100ms for faster detection
    });

    // Observe with reduced scope to minimize performance impact
    feedPostObserver.observe(targetElement, {
      childList: true,
      subtree: false, // Don't observe entire subtree to reduce overhead
    });

    state.feedPostObserver = feedPostObserver;

    // Separate function to process added feed elements
    function processFeedElements(elements) {
      for (const element of elements) {
        // Quick check for post characteristics
        if (
          element.matches('[data-pagelet*="FeedUnit"]') ||
          element.matches("[data-story-id]") ||
          element.querySelector('[data-pagelet*="FeedUnit"]') ||
          element.querySelector("[data-story-id]")
        ) {
          if (state.debugMode)
            console.log("Feed post detected via optimized observer:", element);

          // Immediate processing with minimal overhead
          handleFeedPostDetection(element);
        }
      }
    }

    // Optimized feed post handling
    function handleFeedPostDetection(postElement) {
      // Quick post detection
      const postId =
        postElement.getAttribute("data-story-id") ||
        postElement
          .getAttribute("data-pagelet")
          ?.match(/FeedUnit_(\d+)/)?.[1] ||
        postElement.getAttribute("data-pagelet")?.match(/Story_(\d+)/)?.[1];

      if (postId && postId !== state.currentPostId) {
        // Found a new post, trigger detection
        if (state.debugMode) {
          console.log(`[FEED_OBSERVER] New post detected: ${postId}`);
        }

        // Debounce the full detection to avoid excessive calls
        if (feedPostObserver._debounceTimer) {
          clearTimeout(feedPostObserver._debounceTimer);
        }

        feedPostObserver._debounceTimer = setTimeout(() => {
          try {
            const postInfo = extractCurrentPostInfo();
            if (postInfo && postInfo.postId === postId) {
              handlePostChange(postInfo);
            }
          } catch (error) {
            if (state.debugMode) {
              console.log("Error in feed post detection:", error);
            }
          }
        }, 25); // Reduced from 50ms for faster response
      }
    }

    // Cleanup function
    window.addEventListener("beforeunload", () => {
      const observer = state.feedPostObserver;
      if (observer) {
        if (observer._processingTimer) {
          clearTimeout(observer._processingTimer);
        }
        if (observer._debounceTimer) {
          clearTimeout(observer._debounceTimer);
        }
        observer.disconnect();
        state.feedPostObserver = null;
      }
    });

    if (state.debugMode) {
      console.log("Optimized feed post observer set up");
    }
  }

  // Safe message sending with extension context validation
  function safeSendMessage(message, _fallbackMessage = null) {
    if (
      typeof chrome !== "undefined" &&
      chrome.runtime &&
      chrome.runtime.sendMessage
    ) {
      try {
        chrome.runtime.sendMessage(message).catch((error) => {
          // Handle extension context errors gracefully
          if (
            error.message.includes("Extension context invalidated") ||
            error.message.includes("Receiving end does not exist") ||
            error.message.includes("Could not establish connection")
          ) {
            if (state.debugMode) {
              console.warn(
                "Extension context error - message not sent:",
                error.message
              );
            }
            // Don't retry for these errors - extension needs to be reloaded
            return;
          }

          // For other errors, log if debug mode
          if (state.debugMode) {
            console.log("Message send failed:", error);
          }
        });
      } catch (syncError) {
        // Handle synchronous errors (like extension context invalidated during call)
        if (state.debugMode) {
          console.warn("Synchronous message send error:", syncError.message);
        }
      }
    }
  }

  chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
      try {
        if (request.action === "ping") {
          // Simple ping response to verify content script is loaded and initialized
          sendResponse({
            pong: true,
            initialized: state.isInitialized,
            url: window.location.href,
            readyState: document.readyState,
            debugMode: state.debugMode,
          });
          return;
        }

        if (request.action === "setDebugMode") {
          state.debugMode = request.enabled || false;
          DEBUG_MODE = state.debugMode;
          // Save to storage
          if (typeof chrome !== "undefined" && chrome.storage) {
            chrome.storage.local.set({
              debugMode: state.debugMode,
            });
          }
          sendResponse({
            success: true,
            debugMode: state.debugMode,
          });
          return;
        }

        if (request.action === "setCooldownSetting") {
          const newCooldown = Math.max(
            5,
            Math.min(300, request.cooldown || 25)
          );
          state.cooldownSetting = newCooldown;
          // Save to storage
          if (typeof chrome !== "undefined" && chrome.storage) {
            chrome.storage.local.set({ cooldownSetting: newCooldown });
          }
          sendResponse({ success: true, cooldownSetting: newCooldown });
          return;
        }

        if (request.action === "setExtractionCountLimit") {
          const newLimit = Math.max(50, Math.min(2000, request.limit || 500));
          state.extractionCountLimit = newLimit;
          // Save to storage
          if (typeof chrome !== "undefined" && chrome.storage) {
            chrome.storage.local.set({ extractionCountLimit: newLimit });
          }
          sendResponse({ success: true, extractionCountLimit: newLimit });
          return;
        }

        if (request.action === "checkModalStatus") {
          // Handle async operation
          try {
            const modalStatus = checkModalStatus();

            // Update global modal status tracking
            const modalChanged =
              modalStatus.modalDetected !==
                state.lastModalStatus.modalDetected ||
              modalStatus.postId !== state.lastModalStatus.postId;
            if (modalChanged) {
              if (state.debugMode)
                console.log(
                  "Modal status changed:",
                  state.lastModalStatus,
                  "->",
                  modalStatus
                );
              state.lastModalStatus = modalStatus;

              // If modal closed, we might need to update post detection
              if (
                !modalStatus.modalDetected &&
                state.lastModalStatus.modalDetected
              ) {
                if (state.debugMode)
                  console.log(
                    "Modal closed, will update post detection on next check"
                  );
              }
            }

            if (DEBUG_MODE) console.log("Modal status result:", modalStatus);

            // Get extraction data from StateManager
            const extractedUsernames = state.extractedUsernames;
            const totalExtracted = extractedUsernames.size;
            const lastExtractionTime = state.lastExtractionTime;
            const extractionCount = state.extractionCount;
            const cooldownSetting = state.cooldownSetting;

            // Check if extraction is ready
            const now = Date.now();
            const timeSinceLastExtraction = now - lastExtractionTime;
            const isInCooldown =
              extractionCount >= 5 &&
              timeSinceLastExtraction < cooldownSetting * 1000;
            const remainingTime = isInCooldown
              ? Math.ceil(
                  (cooldownSetting * 1000 - timeSinceLastExtraction) / 1000
                )
              : 0; // Count total comments if modal is detected
            let totalComments = 0;
            if (
              modalStatus.modalDetected &&
              modalStatus.modalType === "Comments"
            ) {
              const modal =
                document.querySelector('[role="dialog"]') ||
                document.querySelector('[aria-modal="true"]') ||
                document.querySelector(
                  "div[data-pagelet][data-visualcompletion]"
                ) ||
                document.querySelector(
                  'div[data-visualcompletion="ignore-dynamic"]'
                );

              if (modal) {
                // More reliable comment counting - look for Facebook's comment structures
                const commentSelectors = [
                  // Facebook's standard comment selectors
                  '[data-testid*="UFI2Comment"]',
                  '[data-testid*="CommentListItem"]',
                  '[data-pagelet*="Comment"]',
                  // Generic comment containers that are likely actual comments
                  'div[data-visualcompletion] > div[role="article"]',
                  "div[data-commentid]",
                  // Fallback selectors
                  '[data-sigil*="comment"]',
                  '[data-testid*="comment"]',
                ];

                const uniqueComments = new Set();

                for (const selector of commentSelectors) {
                  const elements = modal.querySelectorAll(selector);
                  elements.forEach((element) => {
                    // Use element's unique identifier to avoid double counting
                    const commentId =
                      element.getAttribute("data-commentid") ||
                      element.getAttribute("data-testid") ||
                      element.id ||
                      element.getAttribute("data-pagelet") ||
                      element.textContent?.substring(0, 50); // Fallback to content hash

                    if (commentId && !uniqueComments.has(commentId)) {
                      // Additional validation: ensure it has some comment-like content
                      const text = element.textContent?.trim() || "";
                      const hasProfileLink = element.querySelector(
                        'a[href*="facebook.com"], a[href^="/"]'
                      );
                      const hasCommentIndicators =
                        text.length > 10 &&
                        (hasProfileLink ||
                          text.includes("·") || // Facebook comment separator
                          element.querySelector("strong, b, .fwb") ||
                          element.querySelector('span[dir="auto"]'));

                      if (hasCommentIndicators) {
                        uniqueComments.add(commentId);
                      }
                    }
                  });
                }

                totalComments = uniqueComments.size;

                // If we found very few comments, try a simpler count as fallback
                if (totalComments < 3) {
                  const simpleCommentCount = modal.querySelectorAll(
                    'div[role="article"], [data-commentid], [data-testid*="comment"]'
                  ).length;
                  if (simpleCommentCount > totalComments) {
                    totalComments = simpleCommentCount; // Show actual count, no cap
                  }
                }

                if (DEBUG_MODE) {
                  console.log(
                    `Comment count: ${totalComments} (from ${uniqueComments.size} unique elements)`
                  );
                }
              }
            }

            const response = {
              ...modalStatus,
              totalComments,
              totalExtracted,
              isInCooldown,
              remainingTime,
            };
            if (response && response.error) {
              console.error("Content script error:", response.error);
              sendResponse(response);
              return;
            }

            sendResponse(response);
          } catch (checkError) {
            console.error("Error in checkModalStatus:", checkError);
            sendResponse({
              modalDetected: false,
              modalType: null,
              postTitle: null,
              totalComments: 0,
              totalExtracted: 0,
              error: "Modal check failed: " + checkError.message,
            });
          }
          return;
        }

        if (request.action === "debugFacebookHealth") {
          const healthStatus = checkFacebookPageHealth();
          const currentPost = extractCurrentPostInfo();
          const modalStatus = checkModalStatus();

          // Additional debugging for extraction issues
          const modal =
            document.querySelector('[role="dialog"]') ||
            document.querySelector('[aria-modal="true"]') ||
            document.querySelector(
              'div[data-visualcompletion="ignore-dynamic"]'
            ) ||
            document.querySelector("div[data-pagelet][data-visualcompletion]");

          let commentCount = 0;
          let profileLinkCount = 0;
          if (modal) {
            commentCount = modal.querySelectorAll(
              '[data-testid*="comment"], div[role="article"], [data-commentid]'
            ).length;
            profileLinkCount = modal.querySelectorAll(
              'a[href*="facebook.com"], a[href^="/"]'
            ).length;
          }

          sendResponse({
            healthStatus,
            currentPost,
            modalStatus,
            debugInfo: {
              modalFound: !!modal,
              commentCount,
              profileLinkCount,
              modalSelectors: {
                roleDialog: !!document.querySelector('[role="dialog"]'),
                ariaModal: !!document.querySelector('[aria-modal="true"]'),
                visualCompletion: !!document.querySelector(
                  'div[data-visualcompletion="ignore-dynamic"]'
                ),
                pageletVisual: !!document.querySelector(
                  "div[data-pagelet][data-visualcompletion]"
                ),
              },
            },
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            readyState: document.readyState,
          });
          return;
        }

        if (request.action === "extractComments") {
          console.log("Content script received extractComments message");
          // async handling
          try {
            console.log("Starting comment extraction...");
            // Remove initial delay for instant response
            // await new Promise((res) =>
            //   setTimeout(res, Math.random() * 500 + 200)
            // );

            const result = await extractFromComments();
            console.log("Extraction result:", result);

            sendResponse(result);
          } catch (err) {
            console.error("Extraction error:", err);
            sendResponse({
              error: "Internal content script error: " + err?.message,
              mentions: [],
              modalDetected: false,
            });
          }
          return;
        }

        if (request.action === "forcePostDetection") {
          const currentPost = extractCurrentPostInfo();
          if (state.debugMode)
            console.log("Force post detection result:", currentPost);

          // If we found a post, update the last observed post
          if (currentPost) {
            const lastObservedPost = state.lastObservedPost;
            const postChanged =
              !lastObservedPost ||
              currentPost.signature !== lastObservedPost.signature;
            if (postChanged) {
              if (state.debugMode) console.log("Force detection: Post changed");
              handlePostChange(currentPost);
              safeSendMessage({
                action: "postChanged",
                oldPost: lastObservedPost,
                newPost: currentPost,
              });
            } else {
              handlePostChange(currentPost);
            }
            state.lastObservedPost = currentPost;
          }

          sendResponse({
            success: true,
            postDetected: !!currentPost,
            postInfo: currentPost,
          });
          return;
        }

        if (request.action === "clearExtractedUsernames") {
          state.extractedUsernames = new Set();
          state.extractionCount = 0;
          state.lastExtractionTime = 0;
          // Save to storage
          if (typeof chrome !== "undefined" && chrome.storage) {
            chrome.storage.local.set({
              extractedUsernames: [],
              extractionCount: 0,
              lastExtractionTime: 0,
            });
          }
          sendResponse({ success: true, totalExtracted: 0 });
          return;
        }

        if (request.action === "resetExtractionState") {
          state.extractedUsernames = new Set();
          state.extractionCount = 0;
          state.lastExtractionTime = 0;
          sendResponse({ success: true });
          return;
        }

        if (request.action === "globalReset") {
          // Complete reset of all state and observers
          console.log("Performing global reset...");

          // Disconnect all observers
          const modalObserver = state.modalObserver;
          if (modalObserver) {
            modalObserver.disconnect();
            state.modalObserver = null;
          }

          const modalContentObserver = state.modalContentObserver;
          if (modalContentObserver) {
            if (modalContentObserver._debounceTimer) {
              clearTimeout(modalContentObserver._debounceTimer);
            }
            modalContentObserver.disconnect();
            state.modalContentObserver = null;
          }

          // Clear all intervals
          const intervals = [
            "modalStatusCheckInterval",
            "urlCheckInterval",
            "modalCheckInterval",
            "memoryCleanupInterval",
          ];

          intervals.forEach((intervalKey) => {
            const interval = state[intervalKey];
            if (interval) {
              clearInterval(interval);
              state[intervalKey] = null;
            }
          });

          // Reset all state
          state.isInitialized = false;
          state.lastModalStatus = {
            modalDetected: false,
            modalType: null,
            postId: null,
          };
          state.lastObservedPost = null;
          state.currentPostId = null;
          state.posterName = null;
          state.lastDomStructureHash = null;
          state.domChangeCount = 0;
          state.domWarningShown = false;

          // Reset modal post cache
          state.modalPostInfo = null;
          state.modalPostDetected = false;

          // Reset extraction state
          state.extractedUsernames = new Set();
          state.extractionCount = 0;
          state.lastExtractionTime = 0;

          // Stop dynamic comment counting
          stopDynamicCommentCounting();

          // Clear all cleanup functions
          // Reset storage to initial/default values instead of clearing completely
          if (typeof chrome !== "undefined" && chrome.storage) {
            chrome.storage.local.clear(() => {
              if (chrome.runtime.lastError) {
                console.error(
                  "Error clearing storage:",
                  chrome.runtime.lastError
                );
              } else {
                // Set default values after clearing
                const defaultValues = {
                  debugMode: false,
                  cooldownSetting: 25,
                  extractionCountLimit: 50,
                  extractedUsernames: [],
                  extractionCount: 0,
                  lastExtractionTime: 0,
                };
                chrome.storage.local.set(defaultValues, () => {
                  if (chrome.runtime.lastError) {
                    console.error(
                      "Error setting default storage values:",
                      chrome.runtime.lastError
                    );
                  } else {
                    console.log("Storage reset to default values");
                  }
                });
              }
            });
          }

          // Reinitialize after a short delay
          setTimeout(() => {
            if (!state.isInitialized) {
              initializeContentScript();
            }
          }, 1000);

          sendResponse({
            success: true,
            message:
              "Global reset completed - all states restored to initial values",
          });
          return;
        }

        // Unknown action
        sendResponse({ error: "Unknown action: " + request.action });
      } catch (err) {
        console.error("Message handler error:", err);
        sendResponse({
          error: err.message,
          mentions: [],
          modalDetected: false,
        });
      }

      // Tell Chrome we will send response asynchronously
      return true;
    }
  );

  function checkModalStatus() {
    try {
      // Pre-compile selectors for maximum speed
      const modalSelectors = [
        '[role="dialog"]',
        '[aria-modal="true"]',
        'div[data-visualcompletion="ignore-dynamic"]',
        "div[data-pagelet][data-visualcompletion]",
        'div[data-visualcompletion*="dialog"]',
        'div[data-pagelet*="Dialog"]',
        'div[data-testid*="modal"]',
        'div[data-testid*="dialog"]',
        "[data-instancekey]",
        'div[data-visualcompletion*="modal"]',
        'div[data-pagelet*="Modal"]',
        'div[role="dialog"]',
        'div[aria-modal="true"]',
        'div[data-pagelet*="FeedUnit"]',
        'div[data-pagelet*="Story"]',
      ];

      // Single fast query for all modal selectors
      let modal = null;
      let modalType = null;
      let postTitle = null;
      let posterName = null;
      let postId = null;

      // Ultra-fast modal detection - single pass
      for (const selector of modalSelectors) {
        modal = document.querySelector(selector);
        if (modal) break;
      }

      if (!modal) {
        return {
          modalDetected: false,
          modalType: null,
          postTitle: null,
          posterName: null,
          postId: null,
          totalComments: 0,
        };
      }

      // Instant comment detection - single optimized query
      const commentElements = modal.querySelectorAll(`
      [data-testid*="UFI2Comment"],
      [data-testid*="CommentListItem"],
      [data-pagelet*="Comment"],
      div[data-visualcompletion] > div[role="article"],
      div[data-commentid],
      [data-sigil*="comment"],
      [data-testid*="comment"],
      [data-testid*="CommentsList"],
      [data-pagelet*="Comments"],
      div[data-visualcompletion*="comment"],
      [aria-label*="comment"],
      [aria-label*="reply"],
      [data-testid*="Comment"],
      [data-pagelet*="Comment"],
      div[data-ft*="comment"],
      div[data-store*="comment"],
      form.comment-form,
      textarea[placeholder*="comment"],
      textarea[placeholder*="reply"],
      div[data-testid*="comment"],
      article[data-testid*="comment"]
    `);

      const hasComments = commentElements.length > 0;
      modalType = hasComments ? "Comments" : "Unknown";

      // Ultra-fast post info extraction
      if (modalType === "Comments") {
        // Single query for post title
        const titleSelectors = [
          'h2[data-testid="post_message"]',
          'div[data-testid="post_message"] h2',
          'span[data-testid="post_message"]',
          '[data-ad-preview="message"]',
          'div[data-pagelet="FeedUnit_0"] h2',
          'div[data-pagelet="FeedUnit_0"] span[dir="auto"]',
          'div[data-pagelet="FeedUnit_0"] div[dir="auto"]',
          'div[data-pagelet*="Story"] h2',
          'div[data-pagelet*="Story"] span[dir="auto"]',
          'div[data-pagelet*="Story"] div[dir="auto"]',
          'h1[data-testid="post_message"]',
          'h3[data-testid="post_message"]',
          'h4[data-testid="post_message"]',
        ];

        for (const selector of titleSelectors) {
          const titleEl = modal.querySelector(selector);
          if (titleEl?.textContent?.trim()) {
            const text = titleEl.textContent.trim();
            const isInComment = titleEl.closest(
              '[data-commentid], [data-testid*="comment"], [data-sigil*="comment"]'
            );
            const parentElement = titleEl.closest(
              '[data-pagelet], article, [role="article"]'
            );
            const isInPostArea =
              parentElement &&
              (parentElement
                .getAttribute("data-pagelet")
                ?.includes("FeedUnit") ||
                parentElement.getAttribute("data-pagelet")?.includes("Story") ||
                parentElement.matches("article") ||
                parentElement.matches('[role="article"]'));

            if (!isInComment && (isInPostArea || text.length > 20)) {
              postTitle =
                text.length > 100 ? text.substring(0, 97) + "..." : text;
              break;
            }
          }
        }

        if (!postTitle) postTitle = "Facebook Post";

        // Ultra-fast poster name extraction
        const posterSelectors = [
          'a[href*="facebook.com"]:not([href*="groups/"]):not([href*="pages/"]):not([href*="events/"]):not([href*="photos/"]):not([href*="videos/"]):not([href*="posts/"]):not([href*="permalink/"]):not([href*="watch"])',
          'strong a[href*="facebook.com"]',
          'b a[href*="facebook.com"]',
          'h3 a[href*="facebook.com"]',
          'strong:not([data-testid="post_message"] *)',
          'b:not([data-testid="post_message"] *)',
          'h3:not([data-testid="post_message"] *)',
        ];

        for (const selector of posterSelectors) {
          const elements = modal.querySelectorAll(selector);
          for (const element of elements) {
            let name = null;
            if (element.tagName === "A") {
              name = element.textContent.trim();
            } else {
              const link = element.querySelector('a[href*="facebook.com"]');
              name = link
                ? link.textContent.trim()
                : element.textContent.trim();
            }

            if (
              name &&
              name.length >= 2 &&
              name.length <= 50 &&
              !name.includes("http") &&
              !name.includes("@") &&
              !name.includes("#") &&
              !name.includes("...") &&
              name !== postTitle.substring(0, name.length)
            ) {
              posterName = name;
              break;
            }
          }
          if (posterName) break;
        }

        if (!posterName) posterName = "User";

        // Ultra-fast post ID extraction
        const idSelectors = [
          "[data-story-id]",
          '[data-ft*="top_level_post_id"]',
          'div[data-pagelet*="FeedUnit"]',
          '[data-testid*="post"]',
          'div[data-pagelet*="Story"]',
          'div[data-visualcompletion*="story"]',
          '[data-testid*="story"]',
        ];

        for (const selector of idSelectors) {
          const element = modal.querySelector(selector);
          if (element) {
            postId =
              element.getAttribute("data-story-id") ||
              element
                .getAttribute("data-ft")
                ?.match(/"top_level_post_id":"(\d+)"/)?.[1] ||
              element
                .getAttribute("data-pagelet")
                ?.match(/FeedUnit_(\d+)/)?.[1] ||
              element.getAttribute("data-pagelet")?.match(/Story_(\d+)/)?.[1] ||
              element.getAttribute("data-testid")?.match(/post_(\d+)/)?.[1] ||
              element.getAttribute("data-testid")?.match(/story_(\d+)/)?.[1];
            if (postId) break;
          }
        }

        // URL-based fallback
        if (!postId) {
          const urlPatterns = [
            /\/posts\/(\d+)/,
            /\/permalink\/(\d+)/,
            /story_fbid=(\d+)/,
            /\/(\d+)\//,
          ];
          for (const pattern of urlPatterns) {
            const match = window.location.href.match(pattern);
            if (match) {
              postId = match[1];
              break;
            }
          }
        }

        // Last resort
        if (!postId) {
          postId = "modal_" + Date.now().toString().slice(-8);
        }
      }

      // Ultra-fast comment counting
      let totalComments = 0;
      if (modalType === "Comments") {
        const uniqueComments = new Set();

        for (const element of commentElements) {
          const commentId =
            element.getAttribute("data-commentid") ||
            element.getAttribute("data-testid") ||
            element.id ||
            element.getAttribute("data-pagelet") ||
            element.textContent?.substring(0, 50);

          if (commentId) {
            const text = element.textContent?.trim() || "";
            const hasProfileLink = element.querySelector(
              'a[href*="facebook.com"], a[href^="/"]'
            );
            const hasCommentIndicators =
              text.length > 10 &&
              (hasProfileLink ||
                text.includes("·") ||
                element.querySelector("strong, b, .fwb") ||
                element.querySelector('span[dir="auto"]'));

            if (hasCommentIndicators && !uniqueComments.has(commentId)) {
              uniqueComments.add(commentId);
            }
          }
        }

        totalComments = uniqueComments.size;

        // Fallback for simple counting
        if (totalComments < 3) {
          const simpleCount = modal.querySelectorAll(
            'div[role="article"], [data-commentid], [data-testid*="comment"]'
          ).length;
          if (simpleCount > totalComments) {
            totalComments = simpleCount;
          }
        }
      }

      return {
        modalDetected: true,
        modalType,
        postTitle,
        posterName,
        postId,
        totalComments,
      };
    } catch (error) {
      if (DEBUG_MODE) console.error("Modal status check error:", error);
      return {
        modalDetected: false,
        modalType: null,
        postTitle: null,
        posterName: null,
        postId: null,
        totalComments: 0,
        error: error.message,
      };
    }
  }

  /* ---------- Optimized Helper Functions ---------- */

  // Ultra-fast comment loading - single optimized pass with timeout protection
  async function loadMoreContentFast(modal) {
    try {
      const startTime = Date.now();
      const maxTime = 3000; // Maximum 3 seconds for loading
      let clicked = false;

      // Single fast button click attempt with time limit
      const buttons = modal.querySelectorAll(
        'button, [role="button"], a, [data-testid*="see-more"], [data-testid*="load-more"]'
      );

      for (const button of buttons) {
        // Check if we've exceeded time limit
        if (Date.now() - startTime > maxTime) break;

        const text = button.textContent?.toLowerCase() || "";
        const ariaLabel =
          button.getAttribute("aria-label")?.toLowerCase() || "";

        if (
          text.includes("see more") ||
          text.includes("load more") ||
          text.includes("view more") ||
          text.includes("expand") ||
          text.includes("more comments") ||
          text.includes("more replies") ||
          ariaLabel.includes("see more") ||
          ariaLabel.includes("load more") ||
          ariaLabel.includes("view more")
        ) {
          try {
            button.click();
            clicked = true;
            // Minimal wait time for instant loading
            await wait(25);
            break; // Only click one button to avoid delays
          } catch {
            // Ignore click failures
          }
        }
      }

      // Fast scroll to load content if we clicked a button
      if (clicked) {
        const remainingTime = maxTime - (Date.now() - startTime);
        if (remainingTime > 100) {
          modal.scrollTop = modal.scrollHeight;
          await wait(25);
          modal.scrollTop = modal.scrollHeight / 2;
          await wait(25);
        }
      }
    } catch {
      // Silent fail for loading - don't let this break extraction
    }
  }

  // Fast username extraction - single optimized query with time limits
  function extractUsernamesFast(modal, extractedUsernames) {
    const usernames = new Set();
    const startTime = Date.now();
    const maxTime = 5000; // Maximum 5 seconds for extraction

    try {
      // Single comprehensive query for all potential commenter elements
      const allElements = modal.querySelectorAll(`
      a[href*="facebook.com"]:not([href*="groups/"]):not([href*="pages/"]):not([href*="events/"]):not([href*="photos/"]):not([href*="videos/"]):not([href*="posts/"]):not([href*="permalink/"]):not([href*="watch"]),
      a[href^="/"]:not([href^="//"]),
      strong:not([data-testid="post_message"] *),
      b:not([data-testid="post_message"] *),
      h3:not([data-testid="post_message"] *),
      .fwb,
      [data-hovercard-user-id]
    `);

      // Limit processing to prevent timeouts
      const maxElements = Math.min(allElements.length, 500); // Process max 500 elements

      for (let i = 0; i < maxElements; i++) {
        // Check time limit every 50 elements
        if (i % 50 === 0 && Date.now() - startTime > maxTime) {
          if (DEBUG_MODE)
            console.log(`Extraction timed out after processing ${i} elements`);
          break;
        }

        const element = allElements[i];

        // Skip if not in a comment container
        const commentContainer = element.closest(
          '[data-testid*="comment"], div[role="article"], [data-commentid], [data-testid*="Comment"], [data-pagelet*="Comment"]'
        );
        if (!commentContainer) continue;

        // Skip reaction/like buttons and system text
        const text = (element.textContent || "").trim().toLowerCase();
        if (
          text.includes("like") ||
          text.includes("love") ||
          text.includes("haha") ||
          text.includes("wow") ||
          text.includes("sad") ||
          text.includes("angry") ||
          text.includes("see more") ||
          text.includes("load more") ||
          text.includes("reply")
        ) {
          continue;
        }

        let username = "";

        // Method 1: data-hovercard-user-id (fastest)
        const userId = element.getAttribute("data-hovercard-user-id");
        if (userId && /^\d+$/.test(userId)) {
          username = userId;
        }

        // Method 2: URL extraction
        if (!username) {
          const href = element.getAttribute("href");
          if (href) {
            try {
              const url = href.startsWith("http")
                ? new URL(href)
                : new URL(href, "https://facebook.com");
              const pathParts = url.pathname
                .replace(/^\//, "")
                .split("/")
                .filter((p) => p);
              if (
                pathParts.length > 0 &&
                pathParts[0] !== "profile.php" &&
                pathParts[0] !== "user.php"
              ) {
                username = pathParts[0];
              }
            } catch {
              // Ignore URL parsing errors
            }
          }
        }

        // Method 3: Text content (fallback)
        if (!username) {
          const text = (element.textContent || "").trim();
          if (
            text &&
            text.length >= 2 &&
            text.length <= 50 &&
            !text.includes("http") &&
            !text.includes("@") &&
            !text.includes("#")
          ) {
            username = text
              .replace(/[^\p{L}\p{N}\s._-]/gu, "")
              .trim()
              .replace(/\s+/g, ".");
          }
        }

        // Validate and add
        if (
          username &&
          isValidUsernameFast(username, extractedUsernames) &&
          !usernames.has(username)
        ) {
          usernames.add(username);
          // Break early if we have enough usernames (limit to prevent storage bloat)
          if (usernames.size >= 200) break;
        }
      }
    } catch (error) {
      if (DEBUG_MODE) console.log("Username extraction error:", error);
    }

    if (DEBUG_MODE) {
      console.log(
        `Extracted ${usernames.size} usernames in ${Date.now() - startTime}ms`
      );
    }

    return Array.from(usernames);
  }

  // Fast username validation
  function isValidUsernameFast(username, extractedUsernames) {
    if (!username || typeof username !== "string") return false;
    if (username.length < 2 || username.length > 50) return false;
    if (!/^[\p{L}0-9._-]+$/u.test(username)) return false;
    if (/^\d+$/.test(username)) return false; // Exclude numeric IDs
    if (username === "profile.php" || username === "user.php") return false;
    if (extractedUsernames.has(username)) return false; // Already extracted
    return true;
  }

  // Fast storage update with error handling
  function updateStorageFast(
    extractedUsernames,
    lastExtractionTime,
    extractionCount
  ) {
    try {
      const dataToStore = {
        extractedUsernames: Array.from(extractedUsernames),
        lastExtractionTime,
        extractionCount,
      };

      chrome.storage.local.set(dataToStore, () => {
        // Silent error handling - don't block extraction on storage failures
        if (chrome.runtime.lastError && DEBUG_MODE) {
          console.log("Storage save error:", chrome.runtime.lastError.message);
        }
      });
    } catch {
      // Silent fail for storage
    }
  }

  async function extractFromComments() {
    const mentions = [];
    const seen = new Set();
    let modalInfo = null;

    try {
      modalInfo = checkModalStatus();
      if (!modalInfo.modalDetected || modalInfo.modalType !== "Comments") {
        return {
          mentions: [],
          modalDetected: modalInfo.modalDetected,
          modalType: modalInfo.modalType,
          postTitle: modalInfo.postTitle,
          posterName: modalInfo.posterName,
          error: "Comments modal not detected",
        };
      }

      // Get extraction state
      const extractedUsernames = state.extractedUsernames;
      const lastExtractionTime = state.lastExtractionTime;
      const extractionCount = state.extractionCount;
      const extractionCountLimit = state.extractionCountLimit;

      const now = Date.now();
      const timeSinceLastExtraction = now - lastExtractionTime;

      // Reset counter if needed
      const resetCount = timeSinceLastExtraction > 600000;
      const currentCount = resetCount ? 0 : extractionCount;

      const modal =
        document.querySelector('[role="dialog"]') ||
        document.querySelector('[aria-modal="true"]') ||
        document.querySelector("div[data-pagelet][data-visualcompletion]") ||
        document.querySelector('div[data-visualcompletion="ignore-dynamic"]');

      if (!modal) {
        return {
          mentions: [],
          modalDetected: false,
          postTitle: modalInfo.postTitle,
          posterName: modalInfo.posterName,
          error: "Modal element not found",
        };
      }

      // Ultra-fast comment loading - single optimized pass
      await loadMoreContentFast(modal);

      // Fast username extraction - single optimized query
      const commenterLinks = extractUsernamesFast(modal, extractedUsernames);

      if (DEBUG_MODE) {
        console.log(
          `Found ${commenterLinks.length} commenter links to process`
        );
      }

      // Process usernames with optimized validation
      for (const username of commenterLinks) {
        if (mentions.length >= extractionCountLimit) break;

        if (isValidUsernameFast(username, extractedUsernames)) {
          mentions.push(`@${username}`);
          seen.add(username);
          state.extractedUsernames.add(username);
          if (DEBUG_MODE) console.log(`✓ Added valid username: @${username}`);
        }
      }

      // Update state
      const newCount = currentCount + mentions.length;
      state.lastExtractionTime = now;
      state.extractionCount = newCount;

      // Non-blocking storage update - don't wait for completion to avoid timeouts
      setTimeout(() => updateStorageFast(extractedUsernames, now, newCount), 0);

      const finalResult = {
        mentions,
        modalDetected: true,
        modalType: "Comments",
        postTitle: modalInfo.postTitle,
        posterName: modalInfo.posterName,
        extractionCount: newCount,
        totalExtracted: state.extractedUsernames.size,
        totalComments: commenterLinks.length,
      };

      console.log(
        `Returning ${mentions.length} mentions from extractFromComments`
      );
      return finalResult;
    } catch (error) {
      console.error("Comments extraction error:", error);
      return {
        error: "Failed to extract comments: " + (error?.message || error),
        modalDetected: false,
        postTitle: modalInfo?.postTitle || null,
        posterName: modalInfo?.posterName || null,
        mentions: [],
      };
    }
  }

  /* small helpers */
  function wait(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  /* ---------- Post Change Observer ---------- */

  function extractPostInfoFromUrl(url) {
    try {
      const urlObj = new URL(url);

      // Extract post ID from various Facebook URL patterns
      let postId = null;
      let postType = "unknown";

      // Pattern 1: /posts/{id}
      const postsMatch = urlObj.pathname.match(/\/posts\/(\d+)/);
      if (postsMatch) {
        postId = postsMatch[1];
        postType = "post";
      }

      // Pattern 2: /permalink/{id}
      const permalinkMatch = urlObj.pathname.match(/\/permalink\/(\d+)/);
      if (permalinkMatch) {
        postId = permalinkMatch[1];
        postType = "permalink";
      }

      // Pattern 3: story_fbid parameter
      const storyFbid = urlObj.searchParams.get("story_fbid");
      if (storyFbid) {
        postId = storyFbid;
        postType = "story";
      }

      // Pattern 4: /groups/{groupId}/permalink/{postId}
      const groupPermalinkMatch = urlObj.pathname.match(
        /\/groups\/\d+\/permalink\/(\d+)/
      );
      if (groupPermalinkMatch) {
        postId = groupPermalinkMatch[1];
        postType = "group_post";
      }

      // Pattern 5: /groups/{groupId}/posts/{postId}
      const groupPostsMatch = urlObj.pathname.match(
        /\/groups\/\d+\/posts\/(\d+)/
      );
      if (groupPostsMatch) {
        postId = groupPostsMatch[1];
        postType = "group_post";
      }

      // Pattern 6: /{username}/posts/{postId} (new format)
      const userPostsMatch = urlObj.pathname.match(/\/[^/]+\/posts\/(\d+)/);
      if (userPostsMatch) {
        postId = userPostsMatch[1];
        postType = "user_post";
      }

      // Pattern 7: /story.php?story_fbid={id}&id={pageId}
      const storyPhpMatch = urlObj.searchParams.get("story_fbid");
      if (storyPhpMatch && !postId) {
        postId = storyPhpMatch;
        postType = "story_php";
      }

      // Pattern 8: /{pageOrUser}/photos/{albumId}/{photoId} - treat as post
      const photosMatch = urlObj.pathname.match(
        /\/[^/]+\/photos\/[^/]+\/(\d+)/
      );
      if (photosMatch) {
        postId = photosMatch[1];
        postType = "photo_post";
      }

      // Pattern 9: /watch?v={videoId} - video posts
      const watchVideoId = urlObj.searchParams.get("v");
      if (watchVideoId) {
        postId = watchVideoId;
        postType = "video";
      }

      // Pattern 10: /{username}/videos/{videoId}
      const videoMatch = urlObj.pathname.match(/\/[^/]+\/videos\/(\d+)/);
      if (videoMatch) {
        postId = videoMatch[1];
        postType = "video";
      }

      // Pattern 11: Live videos
      const liveMatch = urlObj.pathname.match(/\/[^/]+\/live/);
      if (liveMatch) {
        postId = "live_" + Date.now(); // Generate ID for live videos
        postType = "live";
      }

      // If we found a post ID, create a unique signature
      if (postId) {
        // Create a more unique signature that includes URL components
        const signature = `${postType}_${postId}_${urlObj.pathname}_${
          urlObj.search
        }_${Date.now()}`;

        return {
          postId,
          title: `Facebook ${postType.replace("_", " ")}`,
          signature,
          source: "url",
          url: url,
          postType,
        };
      }

      return null;
    } catch (error) {
      if (DEBUG_MODE)
        console.log("Error extracting post info from URL:", error);
      return null;
    }
  }

  function extractCurrentPostInfo() {
    try {
      // Fast health check
      if (!document.body || document.readyState !== "complete") return null;

      // Priority 1: Modal-based detection (most accurate)
      const modalInfo = checkModalStatus();
      if (
        modalInfo.modalDetected &&
        modalInfo.modalType === "Comments" &&
        modalInfo.postId
      ) {
        return {
          postId: modalInfo.postId,
          title: modalInfo.postTitle || "Facebook Post",
          posterName: modalInfo.posterName || null,
          signature: `modal_${modalInfo.postId}_${Date.now()}`,
          source: "modal",
        };
      }

      // Priority 2: URL-based detection (fast and reliable)
      const urlPostInfo = extractPostInfoFromUrl(window.location.href);
      if (urlPostInfo) return urlPostInfo;

      // Priority 3: DOM-based detection (last resort, optimized)
      const postSelectors = [
        '[data-pagelet*="FeedUnit"]',
        "[data-story-id]",
        'div[data-ft*="top_level_post_id"]',
        '[data-testid*="post"]',
        "article[data-story-id]",
        'div[data-pagelet*="Story"]',
        'div[data-visualcompletion*="story"]',
        '[data-testid*="story"]',
        // More modern Facebook 2024 selectors
        "[data-instancekey]",
        'div[data-visualcompletion*="feed"]',
        '[data-testid*="FeedUnit"]',
        'div[data-pagelet*="FeedUnit"]',
        // Generic post containers
        "article",
        '[role="article"]',
      ];

      for (const selector of postSelectors) {
        const elements = document.querySelectorAll(selector);
        for (const element of elements) {
          // Skip invisible elements
          const rect = element.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) continue;

          // Fast post ID extraction
          const postId =
            element.getAttribute("data-story-id") ||
            element
              .getAttribute("data-pagelet")
              ?.match(/FeedUnit_(\d+)/)?.[1] ||
            element.getAttribute("data-pagelet")?.match(/Story_(\d+)/)?.[1] ||
            element
              .getAttribute("data-ft")
              ?.match(/"top_level_post_id":"(\d+)"/)?.[1];

          if (postId) {
            // Fast title extraction
            const titleEl = element.querySelector(
              '[data-testid="post_message"], h2, [data-ad-preview="message"]'
            );
            const title = titleEl?.textContent?.trim() || "Facebook Post";

            // Fast poster name extraction
            const posterEl = element.querySelector(
              'strong a[href*="facebook.com"], [data-testid*="actor"] a, strong'
            );
            const posterName = posterEl?.textContent?.trim() || null;

            return {
              postId,
              title:
                title.length > 100 ? title.substring(0, 97) + "..." : title,
              posterName,
              signature: `${postId}_${Date.now()}`,
              source: "dom",
            };
          }
        }
      }

      return null;
    } catch {
      return null; // Silent fail for post detection
    }
  }
})();
