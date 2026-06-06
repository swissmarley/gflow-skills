---
description: Run a full short-film pipeline from storyboard to assembled clips with AI-generated scenes and consistent characters
---

Run the cinema-production skill. Break the script into scenes, characters, locations, and mood, run `gflow doctor`, storyboard key frames per scene with `gflow image`, get user approval on the storyboard, then render per-scene video with `gflow video --model veo-3.1-quality`, hold character continuity with `--character <name>` and brand with `--project <brand>`, build transitions with `gflow video --start-frame --end-frame`, batch-render the full sequence with `gflow batch`, and deliver numbered clips, an assembly guide, and the storyboard doc after running the full quality gate.
