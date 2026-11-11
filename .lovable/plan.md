# Clean photos and Our Story layout

## Changes
- Remove added grain, warm filters and color-blending photo treatments across the site, including the faded B2B photo. Preserve photo motion and all other functionality.
- Rebuild Our Story on cream: centered overlapping hero label, Founders / Travel Stories / Italian Cider blocks, final edge-to-edge table photo, then the existing footer.
- Use the supplied lead lines and existing body copy. Desktop photos touch alternating viewport edges; mobile always places the photo after the text.
- Apply the requested sharp tilted labels and update story doodle positions. Remove the timeline, feature cards, mosaic, collection and crew banner only from Our Story.

## Technical details
- Keep story copy in `src/data/retro.ts`, placements in `src/data/doodles.ts`, and page-specific styling in the global stylesheet.
- Preserve route metadata, age gate, shared motion and Shopify placeholders.
- Check all seven requested pages for photo treatments and verify Our Story at 375, 768, 1280 and 1920px, including label clearance and edge alignment.