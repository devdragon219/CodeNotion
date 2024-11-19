import { CollapseProps, FadeProps, GrowProps, SlideProps, SxProps, Theme, ZoomProps } from '@mui/material';

interface BaseTransitionProps {
  position?: 'bottom' | 'bottom-left' | 'bottom-right' | 'top' | 'top-left' | 'top-right';
  in?: boolean;
  direction?: 'up' | 'right' | 'left' | 'down';
  sx?: SxProps<Theme>;
}

export interface GrowTransitionProps extends BaseTransitionProps, GrowProps {
  type: 'grow';
}

export interface CollapseTransitionProps extends BaseTransitionProps, CollapseProps {
  type: 'collapse';
}

export interface FadeTransitionProps extends BaseTransitionProps, FadeProps {
  type: 'fade';
}

export interface SlideTransitionProps extends BaseTransitionProps, SlideProps {
  type: 'slide';
}

export interface ZoomTransitionProps extends BaseTransitionProps, ZoomProps {
  type: 'zoom';
}

export type TransitionProps =
  | GrowTransitionProps
  | CollapseTransitionProps
  | FadeTransitionProps
  | SlideTransitionProps
  | ZoomTransitionProps;
