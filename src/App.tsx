import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DestinationGallery } from './components/DestinationGallery';
import { DynamicItinerary } from './components/DynamicItinerary';
import { AIChatWidget } from './components/AIChatWidget';
import { PenangTravelGuide } from './components/PenangTravelGuide';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { Footer } from './components/Footer';
import { Destination, ItineraryPlan, TravelStyle, TravelParty } from './types/travel';
import { DEFAULT_PENANG_ITINERARY } from './data/penangData';
import { generateGeminiItinerary } from './services/aiTravelService';

export default function App() {
  const [itinerary, setItinerary] = useState<ItineraryPlan>(DEFAULT_PENANG_ITINERARY);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string>('');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  // Generate Itinerary triggered by Hero search
  const handleHeroSearch = async (
    prompt: string,
    days: number,
    style: TravelStyle,
    party: TravelParty
  ) => {
    setIsGenerating(true);

    // Scroll down to itinerary section immediately so user sees loading state
    const itineraryEl = document.getElementById('itinerary');
    if (itineraryEl) {
      itineraryEl.scrollIntoView({ behavior: 'smooth' });
    }

    try {
      const generated = await generateGeminiItinerary(
        prompt,
        days,
        'Penang, Malaysia',
        style,
        party
      );
      setItinerary(generated);
    } catch (err) {
      console.error('Failed to generate itinerary:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Ask AI about a specific landmark or food
  const handleAskAIAboutTopic = (topic: string) => {
    setChatInitialPrompt(`Tell me insider travel tips, best time to visit, and nearby food for ${topic}`);
    setIsChatOpen(true);
  };

  // Add destination to current itinerary
  const handleAddToItinerary = (destination: Destination) => {
    setItinerary((prev) => {
      const copy = JSON.parse(JSON.stringify(prev)) as ItineraryPlan;
      if (copy.days.length > 0) {
        const targetDay = copy.days[0];
        const newStop = {
          id: `custom-${Date.now()}`,
          time: '03:00 PM',
          period: 'Afternoon' as const,
          title: destination.name,
          category: destination.categoryLabel,
          description: destination.description,
          duration: destination.suggestedDuration,
          locationName: destination.address,
          insiderTip: destination.insiderTip,
          transitInfo: 'Added to your customized route',
          coordinates: destination.coordinates,
        };
        targetDay.stops.push(newStop);
      }
      return copy;
    });

    // Notify user via smooth scroll to itinerary
    const itineraryEl = document.getElementById('itinerary');
    if (itineraryEl) {
      itineraryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smooth scroll helper
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-950">
      {/* Top Navbar */}
      <Navbar
        onOpenChat={() => setIsChatOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Core Feature 1: AI Discovery Hero */}
        <Hero
          onSearch={handleHeroSearch}
          isLoading={isGenerating}
        />

        {/* Core Feature 3: Destination Gallery (Penang Default Theme) */}
        <DestinationGallery
          onSelectDestination={(dest) => setSelectedDestination(dest)}
          onAskAIAboutDestination={handleAskAIAboutTopic}
        />

        {/* Core Feature 4: Dynamic Itinerary View with Interactive Map Placeholder */}
        <DynamicItinerary
          itinerary={itinerary}
          isLoading={isGenerating}
          onRegenerate={(prompt, days) =>
            handleHeroSearch(prompt, days, 'Balanced & Cultural', 'Couple / Romantic')
          }
          onAskAIAboutStop={handleAskAIAboutTopic}
        />

        {/* Penang Street Food & Field Guide */}
        <PenangTravelGuide onAskAI={handleAskAIAboutTopic} />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Core Feature 2: Persistent AI Chat Assistant Widget */}
      <AIChatWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        initialPrompt={chatInitialPrompt}
      />

      {/* Modal for detailed destination views */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onAskAIAboutPlace={handleAskAIAboutTopic}
        onAddToItinerary={handleAddToItinerary}
      />
    </div>
  );
}
