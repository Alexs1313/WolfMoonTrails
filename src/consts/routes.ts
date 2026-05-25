export const Routes = {
  root: {
    intro: 'Intro',
    main: 'Main',
  },
  tabs: {
    overview: 'Overview',
    regions: 'Regions',
    sessions: 'Sessions',
    library: 'Library',
    shelf: 'Shelf',
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

export type TabRouteName = (typeof Routes.tabs)[keyof typeof Routes.tabs];
