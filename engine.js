// Sodium Engine: Invisible rendering optimizations.
(function() {
    'use strict';

    // ==========================================
    // 1. INVISIBLE CSS OPTIMIZATIONS
    // ==========================================
    const sodiumStyle = document.createElement('style');
    
    const optimizeCSS = `
        /* 1. "Chunk Culling" (Content Visibility)
           Tells Chrome to completely skip rendering elements that are far off-screen.
           contain-intrinsic-size prevents the scrollbar from aggressively jumping. */
        main, section, article {
            content-visibility: auto;
            contain-intrinsic-size: auto 1000px; 
        }

        /* 2. Layout Isolation (CSS Containment)
           Tells the browser: "If an animation happens inside this box, you don't 
           need to recalculate the layout for the entire rest of the webpage." */
        aside, nav, footer, header {
            contain: paint layout;
        }

        /* 3. Smart GPU Acceleration
           Pre-warns the GPU about elements that are likely to change or need heavy lifting,
           without actively distorting their pixels. */
        video, canvas, iframe {
            will-change: transform;
        }
    `;

    sodiumStyle.appendChild(document.createTextNode(optimizeCSS));
    (document.head || document.documentElement).appendChild(sodiumStyle);

    // ==========================================
    // 2. INVISIBLE JAVASCRIPT OPTIMIZATIONS
    // ==========================================
    
    // Force all scrolling and touch events to be "passive". 
    // This tells Chrome: "Do not wait for JavaScript to finish thinking before you scroll the page."
    // It makes scrolling feel instantly responsive on heavy sites.
    const passiveOptions = { passive: true, capture: true };
    document.addEventListener('touchstart', function(){}, passiveOptions);
    document.addEventListener('touchmove', function(){}, passiveOptions);
    document.addEventListener('mousewheel', function(){}, passiveOptions);
    document.addEventListener('wheel', function(){}, passiveOptions);

})();
