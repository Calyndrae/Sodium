// Sodium Engine: Maximize raw rendering speed.
(function() {
    'use strict';

    const sodiumStyle = document.createElement('style');
    
    const optimizeCSS = `
        /* 1. Nuke all animations and transitions. Instant UI response. */
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }

        /* 2. Force GPU Hardware Acceleration on heavy media elements */
        img, video, iframe, canvas {
            transform: translateZ(0) !important;
            will-change: transform !important;
        }

        /* 3. Force Chrome to prioritize raw text drawing speed over perfect kerning */
        * {
            text-rendering: optimizeSpeed !important;
        }
        
        /* 4. Stop off-screen elements from hogging rendering power */
        main, section, article {
            content-visibility: auto;
        }
    `;

    sodiumStyle.appendChild(document.createTextNode(optimizeCSS));
    (document.head || document.documentElement).appendChild(sodiumStyle);
})();
