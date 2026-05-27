export const WlffMuddTraillsRoutes = {
  root: {
    loader: 'Loader',
    intro: 'Intro',
    main: 'Main',
  },
  tabs: {
    explore: 'Explore',
    map: 'Map',
    quiz: 'Quiz',
    guide: 'Guide',
    saved: 'Saved',
  },
  overview: {
    main: 'OverviewMain',
    detail: 'OverviewDetail',
  },
  regions: {
    main: 'RegionsMain',
    detail: 'RegionsDetail',
  },
  sessions: {
    main: 'SessionsMain',
    quiz: 'SessionsQuiz',
    result: 'SessionsResult',
  },
  library: {
    main: 'LibraryMain',
    detail: 'LibraryDetail',
  },
  shelf: {
    main: 'ShelfMain',
    detail: 'ShelfDetail',
  },
} as const;

export type WlffMuddTraillsTabRouteName = (typeof WlffMuddTraillsRoutes.tabs)[keyof typeof WlffMuddTraillsRoutes.tabs];
