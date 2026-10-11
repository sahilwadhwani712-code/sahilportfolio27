# Architecture rules
- Use shared CDN portrait pointers for home and persona pages to reuse cached original-quality images.
- Keep persona composition and gradient backgrounds in global semantic CSS roles so device sizing stays consistent.
- Use the shared collection-card surface for project and game items while retaining their distinct browsing interactions.
- Reset scrolling only on route changes in ScrollProgress; navigation must not schedule competing scroll resets.