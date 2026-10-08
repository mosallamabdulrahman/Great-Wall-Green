import type { getCopy } from "../../content";
export type { Lang } from "../../content";

export type SiteCopy = ReturnType<typeof getCopy>;

export interface NavItem {
  route: string;
  label: string;
}

export type DialogType = string;
