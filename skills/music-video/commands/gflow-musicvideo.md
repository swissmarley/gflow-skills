---
description: Build visual narratives for music with performance scenes, abstract visuals, story-driven sequences, and lyric imagery as shot-by-shot clips
---

Run the music-video skill. Capture the music brief (genre, tempo and BPM, mood arc, lyric themes, visual references), run `gflow doctor`, break the structure down by mapping song sections (verse, chorus, bridge) to visual treatments, create a performer with `gflow character create` if narrative, generate key-frame stills per section with `gflow image`, get user approval per section, render per-section clips with `gflow video --duration` matched to section length, bridge sections with `gflow video --start-frame --end-frame`, batch-render the full video with `gflow batch`, carry the performer with `--character <name>` and the look with `--project <brand>`, and deliver numbered clips mapped to timestamps plus an edit guide after running the full quality gate.
