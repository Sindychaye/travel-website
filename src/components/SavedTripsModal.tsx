import React, { useState } from 'react';
import {
  X,
  Bookmark,
  Calendar,
  Clock,
  Trash2,
  Check,
  FolderOpen,
  RotateCcw,
  Sparkles,
  MapPin,
  Plus,
} from 'lucide-react';
import { ItineraryPlan, SavedItinerary } from '../types/travel';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  savedTrips: SavedItinerary[];
  currentPlan: ItineraryPlan;
  onLoadTrip: (plan: ItineraryPlan) => void;
  onDeleteTrip: (id: string) => void;
  onSaveCurrentTrip: (name?: string) => void;
  onResetToDefault: () => void;
  lastSavedAt: string | null;
}

export const SavedTripsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  savedTrips,
  currentPlan,
  onLoadTrip,
  onDeleteTrip,
  onSaveCurrentTrip,
  onResetToDefault,
  lastSavedAt,
}) => {
  const [newTripName, setNewTripName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveCurrentTrip(newTripName.trim() || undefined);
    setNewTripName('');
    setIsSaving(false);
    showToast('Saved to your trip library!');
  };

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 2500);
  };

  const formatTimestamp = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-stone-200 max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif text-white tracking-wide">
                My Saved Travel Plans
              </h3>
              <p className="text-[11px] text-stone-400">
                Stored locally in your browser · Persists across reloads
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Toast Banner */}
        {successToast && (
          <div className="px-6 py-2.5 bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2 border-b border-emerald-200 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Active Itinerary Auto-Save Banner */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Active Itinerary (Auto-saved)
              </span>
              <h4 className="font-bold text-stone-900 text-sm mt-0.5">{currentPlan.title}</h4>
              <p className="text-stone-600 text-[11px] mt-0.5">
                {currentPlan.days.length} Days · {currentPlan.destination}
                {lastSavedAt ? ` · Last synced ${formatTimestamp(lastSavedAt)}` : ''}
              </p>
            </div>

            <button
              onClick={() => setIsSaving(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Bookmark Copy</span>
            </button>
          </div>

          {/* Quick Bookmark Form (Collapsible) */}
          {isSaving && (
            <form
              onSubmit={handleSave}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 animate-fadeIn text-xs"
            >
              <h5 className="font-bold text-stone-800">Save Itinerary to Library</h5>
              <input
                type="text"
                value={newTripName}
                onChange={(e) => setNewTripName(e.target.value)}
                placeholder={`Name (default: ${currentPlan.title})`}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-xs"
                autoFocus
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSaving(false)}
                  className="px-3 py-1.5 rounded-lg text-stone-600 hover:bg-stone-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          )}

          {/* Saved Library List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Bookmarked Trips ({savedTrips.length})
              </h4>
              <span className="text-[11px] text-stone-400">
                Saved in browser LocalStorage
              </span>
            </div>

            {savedTrips.length === 0 ? (
              <div className="text-center py-10 px-4 rounded-2xl border border-dashed border-stone-200 bg-stone-50/50 space-y-2">
                <FolderOpen className="w-8 h-8 text-stone-400 mx-auto" />
                <p className="text-xs font-medium text-stone-700">No additional bookmarks yet</p>
                <p className="text-[11px] text-stone-500 max-w-sm mx-auto">
                  Your active itinerary is automatically preserved when you refresh the page. Click "Bookmark Copy" above to save multiple variations!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedTrips.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900 truncate">
                          {item.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[10px] font-medium shrink-0">
                          {item.plan.days.length} Days
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 truncate mt-0.5">
                        📍 {item.plan.destination} · Saved {formatTimestamp(item.savedAt)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => {
                          onLoadTrip(item.plan);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Load Trip</span>
                      </button>

                      <button
                        onClick={() => {
                          onDeleteTrip(item.id);
                          showToast('Trip removed from library');
                        }}
                        className="p-1.5 rounded-xl hover:bg-rose-50 text-stone-400 hover:text-rose-600 transition-colors"
                        title="Delete saved trip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs flex-wrap gap-2">
          <button
            onClick={() => {
              if (window.confirm('Reset your active itinerary to the default Penang 3-Day plan?')) {
                onResetToDefault();
                onClose();
              }
            }}
            className="text-stone-500 hover:text-rose-700 flex items-center gap-1.5 transition-colors font-medium cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default Penang Plan</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
