export type AkaNavigationItemType = 'aside' | 'basic' | 'collapsable' | 'divider' | 'group' | 'spacer';

export interface AkaNavigationItem {
  id?: string;
  title?: string;
  subtitle?: string;
  type: AkaNavigationItemType;
  hidden?: (item: AkaNavigationItem) => boolean;
  active?: boolean;
  disabled?: boolean;
  link?: string;
  externalLink?: boolean;
  exactMatch?: boolean;
  function?: (item: AkaNavigationItem) => void;
  classes?: {
    title?: string;
    subtitle?: string;
    icon?: string;
    wrapper?: string;
  };
  icon?: string;
  badge?: {
    title?: string;
    classes?: string;
  };
  children?: AkaNavigationItem[];
  meta?: any;
}

export type AkaVerticalNavigationAppearance = 'default' | 'compact' | 'dense' | 'futuristic' | 'thin' | string;

export type AkaVerticalNavigationMode = 'over' | 'side';

export type AkaVerticalNavigationPosition = 'left' | 'right';
