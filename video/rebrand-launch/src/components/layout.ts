import { useVideoConfig } from "remotion";

// Scenes are authored on a 1920x1080 grid; `u` scales that grid into the
// current composition so the 4:5 cut reuses the same choreography.
export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const u = Math.min(width / 1920, height / 1080);
  return { width, height, cx: width / 2, cy: height / 2, u, tall: height > width };
};

// Where the lockup sits above the hero headline (1920-grid units). The
// reveal hands the lockup to the prompt scene in this slot, and the end
// card puts it back in the same place.
export const HERO_LOGO = { width: 250, cy: 196 };
