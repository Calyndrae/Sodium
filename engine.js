// ==========================================
// ⚡ SODIUM ENGINE: The Ultimate Web Optimizer
// ==========================================
(function() {
    'use strict';

    // ==========================================
    // 1. THE DOM DE-BLOATER (The Executioner)
    // ==========================================
    const bloatSelectors = [
        '.social-share', '.share-buttons', '.addthis_toolbox', 
        '#cookie-notice', '.cookie-banner', '#gdpr-banner', 
        'iframe[src*="doubleclick"]', 'iframe[src*="ads"]', 
        '.taboola', '.outbrain', '.teads',
        '.floating-video', '.video-ad', '.sticky-bottom'
    ].join(', ');

    const observer = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
            for (let node of mutation.addedNodes) {
                if (node.nodeType === 1) {
                    // Kill Bloat
                    if (node.matches && node.matches(bloatSelectors)) {
                        node.remove();
                    } else if (node.querySelectorAll) {
                        node.querySelectorAll(bloatSelectors).forEach(el => el.remove());
                    }
                    
                    // ==========================================
                    // 2. FORCED LAZY-LOADING (Bandwidth Saver)
                    // ==========================================
                    // If the node is an image or iframe, force Chrome to wait until you scroll to it.
                    if (node.tagName === 'IMG' || node.tagName === 'IFRAME') {
                        node.setAttribute('loading', 'lazy');
                    } else if (node.querySelectorAll) {
                        node.querySelectorAll('img, iframe').forEach(el => el.setAttribute('loading', 'lazy'));
                    }
                }
            }
        }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    // ==========================================
    // 3. AGGRESSIVE PRE-FETCHER (Zero-Latency Clicks)
    // ==========================================
    let prefetchedUrls = new Set();
    document.addEventListener('mouseover', (e) => {
        const link = e.target.closest('a');
        if (!link || !link.href) return;

        const url = link.href;
        if (url.startsWith('http') && !prefetchedUrls.has(url) && link.origin === window.location.origin) {
            const prefetchTag = document.createElement('link');
            prefetchTag.rel = 'prefetch';
            prefetchTag.href = url;
            document.head.appendChild(prefetchTag);
            prefetchedUrls.add(url);
        }
    }, { passive: true });

    // ==========================================
    // 4. INVISIBLE CSS, CHUNK CULLING & ANTI-FOIT
    // ==========================================
    const optimizeCSS = `
        /* ANTI-FOIT: Force text to render immediately using system fonts, then swap later */
        @font-face {
            font-display: swap !important;
        }
        
        /* Chunk Culling */
        main, section, article { 
            content-visibility: auto; 
            contain-intrinsic-size: auto 1000px; 
        }
        
        /* Layout Isolation */
        aside, nav, footer, header { 
            contain: paint layout; 
        }
        
        /* Smart Hardware Acceleration */
        video, canvas, iframe { 
            will-change: transform; 
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = optimizeCSS;
    document.documentElement.appendChild(style);

    // Decouple the mouse wheel from heavy JavaScript to prevent stuttering
    const passiveOptions = { passive: true, capture: true };
    document.addEventListener('touchstart', function(){}, passiveOptions);
    document.addEventListener('touchmove', function(){}, passiveOptions);
    document.addEventListener('wheel', function(){}, passiveOptions);

})();
