import React from "react";
import { Composition } from "remotion";
import { RebrandLaunch } from "./RebrandLaunch";
import { BrandNewStills } from "./brandnew/Stills";
import { CAMPAIGN_FRAMES, CampaignFilm, CampaignStills } from "./brandnew/Campaign";
import { STORY_FRAMES, Story } from "./brandnew/Story";
import { LOGO_BUILD_FRAMES, LogoBuild } from "./brandnew/LogoBuild";
import { BrandGrid, GRID_FRAMES } from "./brandnew/Grid";
import { BEFORE_AFTER_FRAMES, BeforeAfter } from "./brandnew/BeforeAfter";
import { BENTO_FRAMES, Bento } from "./brandnew/Bento";
import { DREAM_FRAMES, DreamFilm, DreamStills } from "./brandnew/Dream";
import { MarkWindow, SITE_FRAMES, SiteScroll, WINDOW_FRAMES } from "./brandnew/Motion";
import { DURATION, FPS } from "./theme";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="RebrandLaunch" component={RebrandLaunch} durationInFrames={DURATION} fps={FPS} width={1920} height={1080} />
    <BrandNewStills />
    <CampaignStills />
    <DreamStills />
    <Composition id="BN-dream" component={DreamFilm} durationInFrames={DREAM_FRAMES} fps={FPS} width={1920} height={1080} />
    <Composition id="BN-campaign" component={CampaignFilm} durationInFrames={CAMPAIGN_FRAMES} fps={FPS} width={1920} height={1080} />
    <Composition id="BN-story" component={Story} durationInFrames={STORY_FRAMES} fps={FPS} width={1920} height={1080} />
    <Composition id="BN-before-after" component={BeforeAfter} durationInFrames={BEFORE_AFTER_FRAMES} fps={FPS} width={1920} height={1080} />
    <Composition id="BN-mark-window" component={MarkWindow} durationInFrames={WINDOW_FRAMES} fps={FPS} width={1920} height={1080} />
    <Composition id="BN-site-scroll" component={SiteScroll} durationInFrames={SITE_FRAMES} fps={FPS} width={1920} height={1080} />
    <Composition id="BN-logo-build" component={LogoBuild} durationInFrames={LOGO_BUILD_FRAMES} fps={FPS} width={1920} height={1080} />
    <Composition id="BN-grid" component={BrandGrid} durationInFrames={GRID_FRAMES} fps={FPS} width={1920} height={1080} />
    <Composition id="BN-bento" component={Bento} durationInFrames={BENTO_FRAMES} fps={FPS} width={1920} height={1080} />
    <Composition id="RebrandLaunch4x5" component={RebrandLaunch} durationInFrames={DURATION} fps={FPS} width={1080} height={1350} />
  </>
);
