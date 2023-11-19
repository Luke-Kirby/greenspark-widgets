export interface BadgeText {
  title: string,
  subTitle: string,
}

export interface EnvmtData {
  id: number,
  type: string,
  amount: number,
  action: string,
  active: boolean,
  linked: boolean,
  selectedColor: string
}

export interface Tooltip  {
  isVisible: boolean,
  isMousePresent: boolean,
  isMobileVersion: boolean,
};

export enum LoadingState {
  NotLoaded = 'notLoaded',
  Loading = 'loading',
  Loaded = 'loaded',
}
