// material-ui
import { Box, Collapse, Fade, Grow, Slide, Zoom } from '@mui/material';
import { ExoticComponent, forwardRef, useMemo } from 'react';

import { TransitionProps } from './Transition.types';

const Transition = forwardRef<ExoticComponent, TransitionProps>((props, ref) => {
  const { children, position = 'top-left', direction = 'up', sx } = props;

  const positionSX = useMemo(() => {
    switch (position) {
      case 'top-right':
        return {
          transformOrigin: 'top right',
        };
      case 'top':
        return {
          transformOrigin: 'top right',
        };
      case 'bottom-left':
        return {
          transformOrigin: 'bottom left',
        };
      case 'bottom-right':
        return {
          transformOrigin: 'bottom right',
        };
      case 'bottom':
        return {
          transformOrigin: 'bottom',
        };
      case 'top-left':
        return {
          transformOrigin: '0 0 0',
        };
    }
  }, [position]);

  const transition = useMemo(() => {
    switch (props.type) {
      case 'grow':
        return (
          <Grow {...props}>
            <Box sx={positionSX}>{children}</Box>
          </Grow>
        );
      case 'collapse':
        return (
          <Collapse {...props} sx={positionSX}>
            {children}
          </Collapse>
        );
      case 'fade':
        return (
          <Fade
            {...props}
            timeout={{
              appear: 500,
              enter: 600,
              exit: 400,
            }}
          >
            <Box sx={positionSX}>{children}</Box>
          </Fade>
        );
      case 'slide':
        return (
          <Slide
            {...props}
            timeout={{
              appear: 0,
              enter: 400,
              exit: 200,
            }}
            direction={direction}
          >
            <Box sx={positionSX}>{children}</Box>
          </Slide>
        );
      case 'zoom':
        return (
          <Zoom {...props}>
            <Box sx={positionSX}>{children}</Box>
          </Zoom>
        );
    }
  }, [positionSX, direction, children, props]);

  return (
    <Box ref={ref} sx={sx}>
      {transition}
    </Box>
  );
});
Transition.displayName = 'Transition';

export { Transition };
