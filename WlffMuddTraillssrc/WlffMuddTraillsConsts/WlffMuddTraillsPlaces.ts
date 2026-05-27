export type WlffMuddTraillsPlaceCategoryId =
  | 'wolf-lands'
  | 'bear-country'
  | 'forest-giants'
  | 'sky-hunters';

export type WlffMuddTraillsPlaceCategoryFilter = 'all' | WlffMuddTraillsPlaceCategoryId;

export type WlffMuddTraillsPlaceCategory = {
  id: WlffMuddTraillsPlaceCategoryId;
  label: string;
  color: string;
};

export const WlffMuddTraillsPlaceCategories: WlffMuddTraillsPlaceCategory[] = [
  {id: 'wolf-lands', label: 'Wolf Lands', color: '#9333EA'},
  {id: 'bear-country', label: 'Bear Country', color: '#FF6B1A'},
  {id: 'forest-giants', label: 'Forest Giants', color: '#22C55E'},
  {id: 'sky-hunters', label: 'Sky Watchers', color: '#3B82F6'},
];

export const WlffMuddTraillsPlaceCategoryFilters: {id: WlffMuddTraillsPlaceCategoryFilter; label: string}[] = [
  {id: 'all', label: 'All'},
  ...WlffMuddTraillsPlaceCategories.map(c => ({id: c.id, label: c.label})),
];

export function WlffMuddTraillsGetCategoryById(id: WlffMuddTraillsPlaceCategoryId): WlffMuddTraillsPlaceCategory {
  return WlffMuddTraillsPlaceCategories.find(c => c.id === id)!;
}
