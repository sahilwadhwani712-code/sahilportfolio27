# Project conventions
- Projects and game libraries share GearShowcase and ExpandedShowcase, so presentation and accessible detail interactions remain consistent.
- Persona environments are static CSS gradient tokens sampled from each original background; crossfade opacity only to avoid expensive background interpolation and photo loading.
- Home portrait layers remain mounted; decode the requested portrait before changing persona so transitions never reveal unloaded assets.