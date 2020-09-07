import { defaultThemes } from './defaulTheme';

export const defaultStyles = (theme) => ({
  table: {
    style: {
      color: theme.text.primary,
      backgroundColor: theme.background.default,
    },
  },
  tableWrapper: {
    style: {
      display: 'table',
    },
  },
  header: {
    style: {
      fontSize: '22px',
      color: theme.text.primary,
      backgroundColor: theme.background.default,
      minHeight: '56px',
      paddingLeft: '16px',
      paddingRight: '8px',
    },
  },
  head: {
    style: {},
  },
  headRow: {
    style: {
      backgroundColor: theme.background.default,
      minHeight: '56px',
      borderBottomWidth: '1px',
      borderBottomColor: theme.divider.default,
      borderBottomStyle: 'solid',
    },
  },
  headCells: {
    style: {
      fontSize: '16px',
      fontWeight: 500,
      color: theme.text.primary,
      paddingLeft: '16px',
      paddingRight: '16px',
    },
    activeSortStyle: {
      color: theme.text.primary,
      '&:focus': {
        outline: 'none',
      },
      '&:hover:not(:focus)': {
        color: theme.sortFocus.default,
      },
    },
    inactiveSortStyle: {
      '&:focus': {
        outline: 'none',
        color: theme.sortFocus.default,
      },
      '&:hover': {
        color: theme.sortFocus.default,
      },
    },
  },
  contextMenu: {
    style: {
      backgroundColor: theme.context.background,
      fontSize: '18px',
      fontWeight: 400,
      color: theme.context.text,
      paddingLeft: '16px',
      paddingRight: '8px',
      transform: 'translate3d(0, -100%, 0)',
      transitionDuration: '125ms',
      transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
      willChange: 'transform',
    },
    activeStyle: {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  cells: {
    style: {
      paddingLeft: '16px',
      paddingRight: '16px',
      wordBreak: 'break-word',
    },
  },
  rows: {
    style: {
      fontSize: '16px',
      color: theme.text.primary,
      backgroundColor: theme.background.default,
      minHeight: '48px',
      '&:not(:last-of-type)': {
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: theme.divider.default,
      },
    },
    selectedHighlightStyle: {
      // use nth-of-type(n) to override other nth selectors
      '&:nth-of-type(n)': {
        color: theme.selected.text,
        backgroundColor: theme.selected.default,
        borderBottomColor: theme.background.default,
      },
    },
  },
  noData: {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.text.primary,
      backgroundColor: theme.background.default,
    },
  },
});

export const createStyles = (theme = 'default') => {
  const themeType = defaultThemes[theme] ? theme : 'default';

  return defaultStyles(defaultThemes[themeType]);
};
