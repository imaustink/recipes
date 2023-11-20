export const WIP_DATA_KEY = 'wipData';

interface Recipe {
  title: string;
  ingredients: string;
  directions: string;
  tags: string[];
}

export function saveWipData(data: Recipe) {
	localStorage.setItem(WIP_DATA_KEY, JSON.stringify(data));
}

export function destroyWipData() {
	localStorage.removeItem(WIP_DATA_KEY);
}

export function getWipData(): Partial<Recipe> {
  const rawWipData = localStorage.getItem(WIP_DATA_KEY);
	return rawWipData ? JSON.parse(rawWipData) : {};
}