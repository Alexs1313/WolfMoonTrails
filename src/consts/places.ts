export type PlaceCategoryId =
  | 'wolf-lands'
  | 'bear-country'
  | 'forest-giants'
  | 'sky-hunters';

export type PlaceCategoryFilter = 'all' | PlaceCategoryId;

export type PlaceCategory = {
  id: PlaceCategoryId;
  label: string;
  color: string;
};

export const placeCategories: PlaceCategory[] = [
  {id: 'wolf-lands', label: 'Wolf Lands', color: '#9333EA'},
  {id: 'bear-country', label: 'Bear Country', color: '#FF6B1A'},
  {id: 'forest-giants', label: 'Forest Giants', color: '#22C55E'},
  {id: 'sky-hunters', label: 'Sky Hunters', color: '#3B82F6'},
];

export const placeCategoryFilters: {id: PlaceCategoryFilter; label: string}[] = [
  {id: 'all', label: 'All'},
  ...placeCategories.map(c => ({id: c.id, label: c.label})),
];

export function getCategoryById(id: PlaceCategoryId): PlaceCategory {
  return placeCategories.find(c => c.id === id)!;
}
