import { ItineraryPlan, SavedItinerary } from '../types/travel';

const STORAGE_KEYS = {
  CURRENT_ITINERARY: 'wanderai_current_itinerary_v1',
  SAVED_TRIPS: 'wanderai_saved_trips_v1',
  LAST_SAVED: 'wanderai_last_saved_timestamp',
};

/**
 * Safely load the active itinerary from localStorage
 */
export function loadCurrentItinerary(): ItineraryPlan | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_ITINERARY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as ItineraryPlan;
    // Validate minimum required structure
    if (parsed && typeof parsed.title === 'string' && Array.isArray(parsed.days) && parsed.days.length > 0) {
      return parsed;
    }
    return null;
  } catch (error) {
    console.warn('Failed to load current itinerary from localStorage:', error);
    return null;
  }
}

/**
 * Persist the current itinerary to localStorage
 */
export function saveCurrentItinerary(plan: ItineraryPlan): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    const toSave: ItineraryPlan = {
      ...plan,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.CURRENT_ITINERARY, JSON.stringify(toSave));
    localStorage.setItem(STORAGE_KEYS.LAST_SAVED, new Date().toISOString());
    return true;
  } catch (error) {
    console.warn('Failed to save itinerary to localStorage:', error);
    return false;
  }
}

/**
 * Remove current itinerary from localStorage (for resets)
 */
export function clearCurrentItinerary(): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    localStorage.removeItem(STORAGE_KEYS.CURRENT_ITINERARY);
    localStorage.removeItem(STORAGE_KEYS.LAST_SAVED);
  } catch (error) {
    console.warn('Failed to clear current itinerary from localStorage:', error);
  }
}

/**
 * Get timestamp of last auto-save
 */
export function getLastSavedTimestamp(): string | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return localStorage.getItem(STORAGE_KEYS.LAST_SAVED);
  } catch {
    return null;
  }
}

/**
 * Load all saved trips/bookmarks from library
 */
export function loadSavedTrips(): SavedItinerary[] {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_TRIPS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Failed to load saved trips from localStorage:', error);
    return [];
  }
}

/**
 * Save current itinerary into user's saved trips library
 */
export function saveTripToLibrary(plan: ItineraryPlan, customName?: string): SavedItinerary {
  const currentTrips = loadSavedTrips();
  const id = plan.id || `trip_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  // Check if trip already exists, update if so
  const existingIndex = currentTrips.findIndex((t) => t.id === id);

  const savedItem: SavedItinerary = {
    id,
    name: customName || plan.title,
    savedAt: now,
    plan: {
      ...plan,
      id,
      updatedAt: now,
    },
  };

  let updatedTrips: SavedItinerary[];
  if (existingIndex >= 0) {
    updatedTrips = [...currentTrips];
    updatedTrips[existingIndex] = savedItem;
  } else {
    updatedTrips = [savedItem, ...currentTrips];
  }

  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEYS.SAVED_TRIPS, JSON.stringify(updatedTrips));
    }
  } catch (error) {
    console.warn('Failed to save trip to library:', error);
  }

  return savedItem;
}

/**
 * Delete a trip from the saved library
 */
export function deleteSavedTrip(id: string): SavedItinerary[] {
  const currentTrips = loadSavedTrips();
  const filtered = currentTrips.filter((t) => t.id !== id);
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEYS.SAVED_TRIPS, JSON.stringify(filtered));
    }
  } catch (error) {
    console.warn('Failed to delete saved trip:', error);
  }
  return filtered;
}
