import { KeyboardArrowDown } from '@mui/icons-material';
import {
  AutocompleteProps,
  Breakpoints,
  ButtonProps,
  Components,
  CssVarsTheme,
  DialogProps,
  IconButtonProps,
  InputBaseProps,
  Palette,
  PaperProps,
  PopoverOrigin,
  SxProps,
  Theme,
  TypographyVariantsOptions,
} from '@mui/material';
import { CSSProperties } from 'react';

import { DEFAULT_BORDER_RADIUS } from '../../../configs/defaults';
import { parseSxPropsToArray } from '../../../utils/muiUtils';

export const getThemeComponents = (
  breakpoints: Breakpoints,
  palette: Palette,
  typography: TypographyVariantsOptions,
): Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme> => ({
  MuiAccordion: {
    styleOverrides: {
      root: {
        padding: '10px',
        marginTop: '4px !important',
      },
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: {
        padding: '16px 0 0',
      },
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        minHeight: '24px',
        paddingLeft: 0,
        paddingRight: 0,
        '&.Mui-focusVisible': {
          backgroundColor: 'initial',
        },
      },
      content: {
        flexDirection: 'column' as CSSProperties['flexDirection'],
        margin: 0,
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: '4px',
      },
      filled: {
        gap: '8px',
        padding: '10px',
        '& .MuiAlert-message': {
          color: palette.grey[700],
          padding: 0,
        },
        '& .MuiAlert-action': {
          padding: 0,
          marginRight: 0,
        },
      },
      filledError: {
        backgroundColor: palette.danger[100],
        '& .MuiAlert-action': {
          color: palette.danger[300],
        },
      },
      filledInfo: {
        backgroundColor: palette.blue[100],
        '& .MuiAlert-action': {
          color: palette.blue[500],
        },
      },
      filledSuccess: {
        backgroundColor: palette.green[100],
        '& .MuiAlert-action': {
          color: palette.green[700],
        },
      },
      filledWarning: {
        backgroundColor: palette.yellow[50],
        '& .MuiAlert-action': {
          color: palette.yellow[500],
        },
      },
      outlined: {
        backgroundColor: palette.background.paper,
        color: palette.grey[700],
      },
      outlinedError: {
        borderColor: palette.danger[300],
        '& .MuiAlert-icon': {
          color: palette.danger[300],
        },
      },
      outlinedInfo: {
        borderColor: palette.blue[500],
        '& .MuiAlert-icon': {
          color: palette.blue[500],
        },
      },
      outlinedSuccess: {
        borderColor: palette.green[700],
        '& .MuiAlert-icon': {
          color: palette.green[700],
        },
      },
      outlinedWarning: {
        borderColor: palette.yellow[500],
        '& .MuiAlert-icon': {
          color: palette.yellow[500],
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        '& .MuiToolbar-root': {
          backgroundColor: palette.grey[50],
          [breakpoints.down('lg')]: {
            marginLeft: '12px',
            marginRight: '12px',
          },
        },
      },
    },
  },
  MuiAutocomplete: {
    defaultProps: {
      fullWidth: true,
      multiple: false,
      size: 'large' as AutocompleteProps<unknown, undefined, undefined, undefined>['size'],
    },
    styleOverrides: {
      root: {
        '& .MuiInputBase-root': {
          padding: '8px 66px 8px 16px !important',
          '& .MuiAutocomplete-endAdornment': {
            right: '12px',
          },
          '&.MuiInputBase-sizeLarge': {
            padding: '12px 64px 12px 16px !important',
            '& .MuiAutocomplete-endAdornment': {
              right: '12px',
            },
          },
          '&.MuiInputBase-sizeSmall': {
            padding: '2.5px 56px 2.5px 6px !important',
            '& .MuiAutocomplete-endAdornment': {
              right: '4px',
            },
          },
        },
        '&.Mui-multiple': {
          '& .MuiInputBase-root': {
            gap: '10px',
            '&.MuiInputBase-sizeLarge': {
              padding: '10px 70px 10px 16px !important',
              '& .MuiAutocomplete-input': {
                lineHeight: '32px',
              },
            },
          },
        },
      },
      input: {
        padding: '0 !important',
        width: '100% !important',
      },
      loading: {
        padding: 0,
      },
      noOptions: {
        color: palette.grey[700],
        padding: 0,
      },
    },
  },
  MuiBackdrop: {
    styleOverrides: {
      root: {
        '&:not(.MuiBackdrop-invisible)': {
          backgroundColor: palette.grey[700],
          opacity: '0.7 !important',
        },
      },
    },
  },
  MuiBadge: {
    styleOverrides: {
      dot: {
        backgroundColor: palette.danger[300],
        right: '3px',
        top: '3px',
      },
      standard: {
        backgroundColor: palette.danger[300],
        color: palette.common.white,
        fontSize: '10px',
        fontWeight: 700,
        lineHeight: '10px',
      },
    },
  },
  MuiBreadcrumbs: {
    styleOverrides: {
      root: {
        '& .MuiBreadcrumbs-separator': {
          color: palette.blue[500],
        },
        '& .MuiBreadcrumbs-li': {
          '& .MuiTypography-root': {
            color: palette.blue[500],
            fontSize: '14px',
            fontWeight: 700,
            textDecoration: 'none',
          },
          '&:last-of-type .MuiTypography-root': {
            color: palette.grey[600],
          },
        },
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
      size: 'large' as ButtonProps['size'],
      variant: 'contained' as ButtonProps['variant'],
    },
    styleOverrides: {
      root: {
        ...typography.button,
        borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
        textTransform: 'none' as CSSProperties['textTransform'],
      },
      sizeSmall: {
        borderRadius: '5px',
        height: 25,
        padding: '2px 12px',
      },
      sizeMedium: {
        height: 36,
        padding: '6px 8px',
      },
      sizeLarge: {
        height: 48,
        padding: '12px 16px',
      },
      contained: {
        '&.Mui-disabled': {
          backgroundColor: palette.grey[50],
          color: palette.grey[300],
        },
      },
      containedPrimary: {
        backgroundColor: palette.yellow[500],
        color: palette.blue[500],
        '&:hover': {
          backgroundColor: palette.yellow[600],
        },
        '& .MuiTouchRipple-child': {
          backgroundColor: `${palette.yellow[100]} !important`,
        },
      },
      containedSecondary: {
        backgroundColor: palette.grey[200],
        color: palette.grey[700],
        '&:hover': {
          backgroundColor: palette.grey[400],
        },
        '& .MuiTouchRipple-child': {
          backgroundColor: `${palette.grey[300]} !important`,
        },
      },
      outlined: {
        backgroundColor: palette.background.default,
        border: '1px solid',
        '&.Mui-disabled': {
          borderColor: palette.grey[300],
          color: palette.grey[500],
        },
      },
      outlinedPrimary: {
        borderColor: palette.yellow[500],
        color: palette.blue[500],
        '&:hover': {
          backgroundColor: palette.yellow[50],
          borderColor: palette.yellow[500],
        },
        '& .MuiTouchRipple-child': {
          backgroundColor: `${palette.yellow[100]} !important`,
        },
      },
      outlinedSecondary: {
        borderColor: palette.grey[400],
        color: palette.grey[700],
        '&:hover': {
          backgroundColor: palette.grey[200],
          borderColor: palette.grey[400],
        },
        '& .MuiTouchRipple-child': {
          backgroundColor: `${palette.grey[300]} !important`,
        },
      },
      text: {
        backgroundColor: 'transparent',
        '&.Mui-disabled': {
          color: palette.grey[500],
        },
      },
      textPrimary: {
        color: palette.blue[500],
        '&:hover': {
          backgroundColor: palette.yellow[100],
        },
        '& .MuiTouchRipple-child': {
          backgroundColor: `${palette.yellow[500]} !important`,
        },
      },
      textSecondary: {
        color: palette.grey[700],
        '&:hover': {
          backgroundColor: palette.grey[200],
        },
        '& .MuiTouchRipple-child': {
          backgroundColor: `${palette.grey[300]} !important`,
        },
      },
    },
    variants: [
      {
        props: {
          color: 'tertiary',
          variant: 'contained',
        },
        style: {
          backgroundColor: palette.blue[50],
          color: palette.grey[600],
          '&:hover': {
            backgroundColor: palette.blue[200],
          },
          '& .MuiTouchRipple-child': {
            backgroundColor: `${palette.blue[100]} !important`,
          },
        },
      },
      {
        props: {
          color: 'destructive',
          variant: 'contained',
        },
        style: {
          backgroundColor: palette.danger[300],
          color: 'white',
          '&:hover': {
            backgroundColor: palette.danger[500],
          },
          '&.Mui-disabled': {
            backgroundColor: palette.danger[100],
          },
          '& .MuiTouchRipple-child': {
            backgroundColor: `${palette.danger[200]} !important`,
          },
        },
      },
      {
        props: {
          color: 'tertiary',
          variant: 'outlined',
        },
        style: {
          borderColor: palette.blue[200],
          color: palette.grey[700],
          '&:hover': {
            backgroundColor: palette.blue[50],
            borderColor: palette.blue[200],
          },
          '& .MuiTouchRipple-child': {
            backgroundColor: `${palette.blue[100]} !important`,
          },
        },
      },
      {
        props: {
          color: 'tertiary',
          variant: 'text',
        },
        style: {
          color: palette.grey[700],
          '&:hover': {
            backgroundColor: palette.blue[50],
          },
          '& .MuiTouchRipple-child': {
            backgroundColor: `${palette.blue[100]} !important`,
          },
        },
      },
    ],
  },
  MuiCardActions: {
    styleOverrides: {
      root: {
        padding: '24px',
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: '0 24px',
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: {
        color: palette.blue[500],
        padding: '24px',
        [breakpoints.down('md')]: {
          flexDirection: 'column',
          '& .MuiCardHeader-content': {
            marginRight: 'auto',
          },
          '& .MuiCardHeader-action': {
            margin: '8px 0 0',
            overflowX: 'auto',
            width: '100%',
            '& .MuiStack-root': {
              marginLeft: 'auto',
              width: 'max-content',
            },
          },
        },
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: palette.grey[500],
        '& .MuiTouchRipple-root:hover': {
          backgroundColor: palette.grey[200],
        },
        '&.Mui-checked': {
          color: palette.blue[500],
        },
        '&.Mui-disabled': {
          color: palette.grey[300],
        },
        '& .MuiTouchRipple-child': {
          backgroundColor: `${palette.grey[300]} !important`,
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        '&.MuiChip-select': {
          backgroundColor: palette.grey[200],
          borderRadius: '4px',
          margin: 0,
          height: '24px',
          '&.MuiChip-sizeSmall': {
            height: '16px',
          },
          '&.MuiChip-sizeLarge': {
            height: '32px',
          },
          '& .MuiChip-label': {
            ...typography.bodySm,
            color: palette.grey[700],
          },
          '& .MuiSvgIcon-root': {
            color: palette.grey[700],
          },
          '&.Mui-disabled': {
            opacity: 1,
            '& .MuiChip-label': {
              color: palette.grey[500],
            },
            '& .MuiSvgIcon-root': {
              display: 'none',
            },
          },
          '&.Mui-readonly': {
            opacity: 1,
            '& .MuiChip-label': {
              color: palette.grey[700],
            },
            '& .MuiSvgIcon-root': {
              display: 'none',
            },
          },
        },
      },
    },
  },
  MuiDialog: {
    defaultProps: {
      fullWidth: true,
      maxWidth: 'lg' as DialogProps['maxWidth'],
    },
    styleOverrides: {
      paper: {
        height: '70%',
      },
      paperFullScreen: {
        borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
        height: 'calc(100% - 128px)',
        margin: '64px 24px',
        width: 'calc(100% - 48px)',
        [breakpoints.down('sm')]: {
          margin: '24px 8px',
        },
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: '0 32px',
        [breakpoints.down('md')]: {
          padding: '0 16px',
        },
      },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        color: palette.grey[800],
        display: 'flex',
        justifyContent: 'space-between',
        padding: '24px 32px 0',
        [breakpoints.down('md')]: {
          padding: '24px 16px 0',
        },
        '& + .MuiDialogContent-root': {
          paddingTop: '16px !important',
        },
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: palette.divider,
      },
    },
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        '&.file-upload': {
          backgroundColor: 'white',
          color: palette.grey[500],
          '& .MuiSvgIcon-root': {
            color: palette.grey[700],
          },
          '& .dropzone': {
            border: `3px dashed ${palette.blue[100]}`,
            borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
            '&.Mui-disabled': {
              borderColor: palette.grey[300],
            },
          },
          '& .title': {
            color: palette.grey[700],
            '& .MuiFormLabel-root': {
              ...typography.h5,
              color: palette.grey[700],
            },
          },
          '&.Mui-disabled': {
            backgroundColor: palette.grey[50],
            color: palette.grey[500],
            '& .dropzone': {
              borderColor: palette.grey[300],
            },
            '& .MuiSvgIcon-root': {
              color: palette.grey[500],
            },
            '& .MuiFormLabel-root': {
              color: palette.grey[500],
            },
          },
          '&.Mui-error': {
            '& .dropzone': {
              borderColor: palette.danger[300],
            },
            color: palette.danger[300],
          },
        },
      },
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      root: {
        '&:is(.MuiFormControlLabel-checkbox, .MuiFormControlLabel-radio)': {
          '& .MuiTypography-root': {
            color: palette.grey[700],
          },
          '&.Mui-disabled .MuiTypography-root': {
            color: palette.grey[500],
          },
          '&.Mui-error .MuiTypography-root': {
            color: palette.danger[300],
          },
          '&.Mui-readonly .MuiTypography-root': {
            color: palette.grey[700],
          },
        },
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        ...typography.caption,
        color: palette.grey[700],
        '&.Mui-disabled': {
          color: palette.grey[500],
        },
        '&.Mui-error': {
          color: palette.danger[300],
        },
      },
      sizeSmall: {
        marginLeft: '8px',
        marginRight: '8px',
      },
    },
  },
  MuiIconButton: {
    defaultProps: {
      size: 'medium' as IconButtonProps['size'],
    },
    styleOverrides: {
      root: {
        borderRadius: '8px',
        '&.Mui-disabled': {
          backgroundColor: palette.grey[50],
          color: palette.grey[300],
        },
        '& .MuiSvgIcon-root': {
          strokeWidth: 1.5,
          fontSize: '20px',
        },
      },
      sizeSmall: {
        height: 24,
        width: 24,
        padding: '4px',
      },
      sizeMedium: {
        height: 32,
        width: 32,
        padding: '4px',
      },
      sizeLarge: {
        height: 36,
        width: 36,
        padding: '8px',
      },
      colorInherit: {
        backgroundColor: 'transparent',
        '&.Mui-disabled': {
          backgroundColor: 'transparent',
        },
      },
      colorPrimary: {
        backgroundColor: palette.yellow[500],
        color: palette.blue[500],
        '&:hover': {
          backgroundColor: palette.yellow[600],
        },
        '& .MuiTouchRipple-child': {
          backgroundColor: `${palette.yellow[100]} !important`,
        },
      },
      colorSecondary: {
        backgroundColor: palette.grey[200],
        color: palette.grey[700],
        '&:hover': {
          backgroundColor: palette.grey[400],
        },
        '& .MuiTouchRipple-child': {
          backgroundColor: `${palette.grey[300]} !important`,
        },
      },
    },
    variants: [
      {
        props: {
          color: 'tertiary',
        },
        style: {
          backgroundColor: palette.blue[50],
          color: palette.blue[500],
          '&:hover': {
            backgroundColor: palette.blue[200],
          },
          '& .MuiTouchRipple-child': {
            backgroundColor: `${palette.blue[100]} !important`,
          },
        },
      },
    ],
  },
  MuiInputBase: {
    defaultProps: {
      fullWidth: true,
      minRows: 3,
      size: 'large' as InputBaseProps['size'],
    },
    styleOverrides: {
      root: {
        '&.MuiOutlinedInput-root': {
          backgroundColor: palette.grey[50],
          borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
          '&:not(:is(.Mui-disabled,.Mui-error,.Mui-readonly))': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: `${palette.grey[500]} !important`,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: `${palette.blue[500]} !important`,
            },
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.grey[300],
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.danger[300],
          },
          '&.Mui-readonly .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.grey[50],
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px !important',
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.grey[400],
          borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
          legend: {
            marginLeft: '5px',
            span: {
              paddingRight: 0,
            },
          },
        },
        '&.Mui-disabled': {
          '& .MuiInputAdornment-root > .MuiSvgIcon-root': {
            color: palette.grey[500],
          },
          '& .MuiInputBase-input': {
            color: palette.grey[500],
            '&::placeholder': {
              color: palette.grey[500],
            },
          },
        },
        '&.Mui-error': {
          '& .MuiInputAdornment-root > .MuiSvgIcon-root': {
            color: palette.danger[300],
          },
        },
        '&.Mui-readonly': {
          '& .MuiInputBase-input': {
            color: palette.grey[700],
            WebkitTextFillColor: palette.grey[700],
            '&::placeholder': {
              color: palette.grey[700],
              WebkitTextFillColor: palette.grey[700],
            },
          },
        },
        '& .MuiInputAdornment-root > .MuiSvgIcon-root': {
          color: palette.grey[700],
        },
        '& .MuiInputBase-input': {
          ...typography.bodySm,
          padding: '8px 16px',
          height: 'auto',
          color: palette.grey[700],
          '&::placeholder': {
            ...typography.bodySm,
            color: palette.grey[700],
            opacity: 1,
          },
          '&.MuiInputBase-inputAdornedStart': {
            paddingLeft: 0,
          },
          '&[type="number"]': {
            '&, &::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
              margin: 0,
              MozAppearance: 'textfield !important',
              WebkitAppearance: 'none',
            },
          },
        },
        '&.MuiInputBase-multiline': {
          padding: 0,
        },
        '&.MuiOutlinedInput-date': {
          paddingRight: '16px',
          '& .clearButton': {
            opacity: 1,
          },
        },
        '&.MuiOutlinedInput-search': {
          backgroundColor: palette.grey[200],
          borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
          '& .MuiInputBase-input.MuiInputBase-inputAdornedStart': {
            paddingLeft: 0,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.grey[200],
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.grey[500],
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.blue[200],
          },
          '& .MuiCheckbox-root': {
            backgroundColor: palette.grey[50],
            borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
            color: palette.blue[500],
            padding: '4px',
            '&.Mui-checked': {
              backgroundColor: palette.blue[500],
              color: 'white',
            },
          },
        },
        '& .MuiSelect-icon': {
          right: '12px !important',
        },
        '&.MuiInputBase-sizeLarge': {
          '&.MuiOutlinedInput-date': {
            paddingRight: '20px',
          },
          '& .MuiInputBase-input': {
            ...typography.bodyMd,
            padding: '12px 16px',
            '&::placeholder': {
              ...typography.bodyMd,
            },
          },
          '& .MuiSelect-icon': {
            right: '16px !important',
          },
        },
        '&.MuiInputBase-sizeSmall': {
          borderRadius: '5px',
          '&.MuiOutlinedInput-date': {
            paddingRight: '6px',
          },
          '& .MuiInputBase-input': {
            ...typography.bodySm,
            padding: '2.5px 6px',
            '&::placeholder': {
              ...typography.bodySm,
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '5px',
            '& legend': {
              marginLeft: '-5px',
            },
          },
          '& .MuiSelect-icon': {
            right: '7px !important',
          },
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        ...typography.caption,
        color: palette.grey[700],
        transform: 'translate(18px, -9px)',
        '&:not(.MuiInputLabel-shrink)': {
          ...typography.bodySm,
          transform: 'translate(18px, 8px)',
        },
        '&.Mui-disabled': {
          color: palette.grey[500],
        },
        '&.Mui-error': {
          color: palette.danger[300],
        },
        '&.Mui-readonly': {
          color: palette.grey[700],
        },
        '&.MuiInputLabel-sizeLarge': {
          transform: 'translate(21px, -9px)',
          '&:not(.MuiInputLabel-shrink)': {
            ...typography.bodyMd,
            transform: 'translate(16px, 12px)',
          },
        },
        '&.MuiInputLabel-sizeSmall': {
          transform: 'translate(8px, -9px)',
          '&:not(.MuiInputLabel-shrink)': {
            ...typography.bodySm,
            transform: 'translate(8px, 2px)',
          },
        },
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: palette.blue[50],
      },
      bar: {
        backgroundColor: palette.blue[500],
      },
    },
  },
  MuiList: {
    styleOverrides: {
      root: {
        // Sidebar menu style
        '&.MuiList-menu': {
          '& .MuiCollapse-root .MuiList-root:after': {
            backgroundColor: palette.grey[300],
          },
        },
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        ...typography.bodyMd,
        backgroundColor: 'transparent',
        borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
        color: palette.grey[700],
        '&.Mui-selected': {
          color: palette.blue[500],
        },
        '&:hover': {
          backgroundColor: palette.blue[50],
        },
        // Sidebar menu content style
        '&.MuiListItemButton-menuGroup': {
          backgroundColor: palette.grey[200],
          height: '48px',
          '&:hover': {
            backgroundColor: palette.blue[100],
          },
        },
        '&.MuiListItemButton-menuItem': {
          '&:not(.open)': {
            borderRadius: '5px',
          },
          '& .MuiListItemIcon-root': {
            color: palette.grey[300],
          },
          '&.Mui-selected:not(:hover)': {
            backgroundColor: 'transparent',
            '&.open': {
              backgroundColor: palette.grey[100],
            },
            '& .MuiListItemIcon-root': {
              color: palette.blue[500],
            },
          },
          '&:hover': {
            backgroundColor: palette.grey[200],
            '&.open': {
              backgroundColor: palette.grey[100],
            },
            '& .MuiListItemIcon-root': {
              color: palette.grey[700],
            },
          },
        },
        // Tree component style
        '&.MuiListItemButton-treeNode': {
          backgroundColor: palette.grey[100],
          height: '48px',
          width: '256px',
          gap: '12px',
          marginTop: 0,
          '& .MuiListItemIcon-root': {
            color: palette.grey[300],
            '& .MuiListItemIcon-root': {
              color: palette.grey[700],
            },
          },
          '& .MuiSvgIcon-root': {
            fontSize: '24px',
          },
          '& .MuiIconButton-root:hover': {
            backgroundColor: palette.blue[200],
          },
          '&:hover': {
            backgroundColor: palette.blue[100],
            '& .MuiListItemIcon-root': {
              color: palette.grey[700],
            },
            '& .MuiButtonBase-root': {
              color: palette.grey[700],
            },
          },
          '&.highlighted': {
            color: palette.blue[500],
            '& .MuiListItemIcon-root': {
              color: palette.blue[500],
            },
            '& .MuiButtonBase-root': {
              color: palette.blue[500],
            },
          },
        },
        '&.MuiListItemButton-treeLeaf': {
          height: '48px',
          width: '256px',
          gap: '12px',
          '& .MuiListItemIcon-root': {
            color: palette.grey[300],
          },
          '&:hover': {
            backgroundColor: palette.grey[200],
            '& .MuiListItemIcon-root': {
              color: palette.grey[700],
            },
          },
          '&.highlighted': {
            color: palette.blue[500],
            backgroundColor: palette.grey[100],
            '& .MuiListItemIcon-root': {
              color: palette.blue[500],
            },
          },
        },
      },
    },
  },
  MuiMenu: {
    defaultProps: {
      anchorOrigin: {
        horizontal: 'right' as PopoverOrigin['horizontal'],
        vertical: 'bottom' as PopoverOrigin['vertical'],
      },
      slotProps: {
        paper: {
          elevation: 0,
          variant: 'outlined' as PaperProps['variant'],
        },
      },
      transformOrigin: {
        horizontal: 'right' as PopoverOrigin['horizontal'],
        vertical: 'top' as PopoverOrigin['vertical'],
      },
    },
    styleOverrides: {
      list: {
        padding: '10px',
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        ...typography.bodySm,
        borderRadius: '4px',
        color: palette.grey[700],
        gap: '12px',
        padding: '0 6px',
        '& .MuiListItemIcon-root': {
          minWidth: '24px',
          '& > .MuiSvgIcon-root': {
            color: palette.grey[700],
          },
        },
        '& .MuiCheckbox-root': {
          margin: '-9px',
        },
        '&.Mui-selected': {
          backgroundColor: 'inherit',
        },
        '&:not(:last-of-type)': {
          marginBottom: '3px',
        },
        '&.MuiTablePagination-menuItem': {
          justifyContent: 'center',
        },
      },
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
      variant: 'flat' as PaperProps['variant'],
    },
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
      rounded: {
        borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
      },
      elevation: {
        backgroundColor: palette.background.paper,
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
      },
      outlined: {
        border: `1px solid ${palette.blue[200]}`,
        borderRadius: '8px !important',
      },
    },
    variants: [
      {
        props: {
          variant: 'flat',
        },
        style: {
          backgroundColor: palette.background.default,
        },
      },
      {
        props: {
          variant: 'menu',
        },
        style: {
          backgroundColor: palette.grey[100],
          border: `1px solid ${palette.blue[200]}`,
          borderRadius: '8px !important',
          '& .MuiPaper-arrow': {
            backgroundColor: palette.grey[100],
            borderBottom: `1px solid ${palette.blue[200]}`,
            borderLeft: `1px solid ${palette.blue[200]}`,
          },
        },
      },
      {
        props: {
          variant: 'select',
        },
        style: {
          backgroundColor: palette.grey[50],
          border: `1px solid ${palette.blue[500]}`,
          '& .MuiMenu-list': {
            maxHeight: '450px',
            padding: '6px',
          },
          '& .MuiMenuItem-root': {
            padding: '8px 12px',
          },
        },
      },
    ],
  },
  MuiRadio: {
    styleOverrides: {
      root: {
        color: palette.grey[500],
        '& .MuiTouchRipple-root:hover': {
          backgroundColor: palette.grey[200],
        },
        '&.Mui-checked': {
          color: palette.blue[500],
        },
        '&.Mui-disabled': {
          color: palette.grey[300],
        },
        '& .MuiTouchRipple-child': {
          backgroundColor: `${palette.grey[300]} !important`,
        },
      },
    },
  },
  MuiSelect: {
    defaultProps: {
      // IconComponent defined here instead of inside custom SelectField due to TablePagination component internally using select for rows per page selection
      IconComponent: (props: object) => (
        <KeyboardArrowDown
          {...props}
          sx={[
            ...('sx' in props ? parseSxPropsToArray(props.sx as SxProps) : []),
            { fontSize: '16px', right: '16px !important' },
          ]}
        />
      ),
    },
    styleOverrides: {
      select: {
        padding: '8px 34px 8px 16px !important',
        '&.MuiInputBase-inputSizeLarge': {
          padding: '12px 40px 12px 16px !important',
        },
        '&.MuiInputBase-inputSizeSmall': {
          padding: '2.5px 24px 2.5px 6px !important',
        },
        '&.Mui-clearable': {
          padding: '8px 16px !important',
          '&.MuiInputBase-inputSizeLarge': {
            padding: '12px 16px !important',
          },
          '&.MuiInputBase-inputSizeSmall': {
            padding: '2.5px 6px !important',
          },
        },
        '&.MuiSelect-multiple:not(.Mui-empty,.MuiInputBase-inputSizeSmall)': {
          padding: '6px 40px 6px 16px !important',
          '&.Mui-clearable': {
            padding: '6px 16px !important',
          },
          '&.MuiInputBase-inputSizeLarge': {
            padding: '8px 40px 8px 16px !important',
            '&.Mui-clearable': {
              padding: '8px 16px !important',
            },
          },
        },
      },
      icon: {
        '&.Mui-disabled': {
          display: 'none',
        },
      },
    },
  },
  MuiStepConnector: {
    styleOverrides: {
      line: {
        borderColor: palette.blue[200],
      },
    },
  },
  MuiStepContent: {
    styleOverrides: {
      root: {
        borderColor: palette.blue[200],
      },
    },
  },
  MuiStepIcon: {
    styleOverrides: {
      root: {
        color: palette.grey[300],
        '&.Mui-active': {
          color: palette.blue[500],
        },
        '&.Mui-error': {
          color: palette.danger[300],
        },
      },
    },
  },
  MuiStepLabel: {
    styleOverrides: {
      label: {
        color: palette.grey[700],
        '&.Mui-error': {
          color: palette.danger[300],
        },
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        borderBottom: '2px solid transparent',
        color: palette.grey[700],
        opacity: 1,
        textTransform: 'none' as CSSProperties['textTransform'],
        '&.Mui-selected': {
          color: palette.blue[500],
          borderBottom: `2px solid ${palette.blue[500]}`,
        },
        '&.Mui-error': {
          color: palette.danger[300],
        },
        '& .MuiTouchRipple-child': {
          backgroundColor: `${palette.blue[50]} !important`,
        },
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        borderBottom: `1px solid ${palette.grey[200]}`,
      },
      flexContainer: {
        flexWrap: 'wrap' as CSSProperties['flexWrap'],
      },
      indicator: {
        display: 'none',
      },
    },
  },
  MuiTableBody: {
    styleOverrides: {
      root: {
        '& .MuiTableRow-root': {
          backgroundColor: palette.background.default,
          height: '42px',
          '&:not(:is(.MuiTableRow-empty, .Mui-disabled))': {
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: palette.grey[200],
              '& .MuiTableCell-body': {
                backgroundColor: palette.grey[200],
              },
            },
          },
          '&:is(.Mui-children, .Mui-children:hover)': {
            backgroundColor: palette.grey[50],
            '& .MuiTableCell-body': {
              backgroundColor: palette.grey[50],
            },
          },
          '&:is(.Mui-selected, .Mui-selected:hover, .Mui-expanded, .Mui-expanded:hover)': {
            backgroundColor: palette.grey[200],
            '& .MuiTableCell-body': {
              backgroundColor: palette.grey[200],
            },
          },
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        ...typography.bodySm,
        padding: '8px 16px',
      },
      head: {
        '&.primary': {
          backgroundColor: palette.blue[50],
          color: palette.blue[500],
          '& .MuiTableSortLabel-root': {
            color: `${palette.blue[500]} !important`,
            '& .MuiTableSortLabel-icon': {
              color: `${palette.blue[500]} !important`,
            },
          },
        },
        '&.secondary': {
          backgroundColor: palette.background.default,
          borderBottom: `1px solid ${palette.grey[200]}`,
          color: palette.grey[700],
          fontWeight: 700,
          '& .MuiTableSortLabel-root': {
            color: `${palette.grey[700]} !important`,
            '& .MuiTableSortLabel-icon': {
              color: `${palette.grey[700]} !important`,
            },
          },
        },
        border: 'none',
      },
      body: {
        backgroundColor: palette.background.default,
        color: palette.grey[700],
        '&.primary': {
          borderColor: palette.grey[300],
        },
        '&.secondary': {
          border: 'none',
        },
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        '& .MuiTableRow-filters': {
          '&.primary .MuiTableCell-root': {
            backgroundColor: palette.grey[100],
          },
          '&.secondary .MuiTableCell-root': {
            backgroundColor: palette.background.default,
          },
          '& .MuiTableCell-root': {
            padding: 0,
          },
        },
        '& .MuiTableRow-loader .MuiTableCell-root': {
          padding: 0,
        },
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      fullWidth: true,
    },
  },
});
