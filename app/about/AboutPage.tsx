import React from "react";
import { ProfileSection } from "./ProfileHeroSection";

interface ProfileData {
  name: string;
  title: string;
  description: string;
  experience: string;
  projects: {
    notable: string[];
    clients: string[];
  };
}

interface StudioImage {
  id: number;
  src: string;
  alt: string;
}

const AboutPage: React.FC = () => {
  const profileData: ProfileData = {
    name: "LEE ROTHENFLUE",
    title: "Producer,Editor & Post Supervisor",
    description:
      "LEE Has Over 20 Years Experience In Production And Post Production Of Various Type Of Film And Video Project, Including Feature Films,Documentaries And Commercials.",
    experience: "He Has Worked On Films Such As",
    projects: {
      notable: ["@Mighty Orphans", "The Blazing World", "And Accidenta Texas"],
      clients: [
        "Google",
        "Meta(Facebook)",
        "Red Bull",
        "Charles Schwab",
        "The Tiger Woods Foundation",
        "PetSmart",
        "Among Other",
      ],
    },
  };

  const studioImages: StudioImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop",
      alt: "Studio setup 1",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&h=600&fit=crop",
      alt: "Studio setup 2",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop",
      alt: "Studio setup 3",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=800&h=600&fit=crop",
      alt: "Studio setup 4",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Profile Section - Black Background */}
      <ProfileSection
        name="LEE ROTHENFLUE"
        title="Producer,Editor & Post Supervisor"
        image="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&h=800&fit=crop"
        bio={"|"}
      />
      {/* The Studio Section - Dark Gray Background */}
      <div className="bg-[#1a1a1a] px-6 py-16 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-300">
            THE STUDIO
          </h2>

          <div className="space-y-4 max-w-5xl mx-auto mb-12">
            <p className="text-white text-xs md:text-sm leading-relaxed">
              Studio Is Equipped With Multiple Edit Bays,That Are Designed For
              Staff And Client Comfort,With Couches, An Adjustable Desk For The
              Editor And Large Client Monitors. Each Bay Has Adobe Premiere, Da
              Vinci Resolve,A Creative Cloud Suite. Our Suites Are Also
              Connected By A Shared Storage Network So You Project Is Housed
              Safely.
            </p>

            <p className="text-white text-xs md:text-sm leading-relaxed">
              We Are Conveniently Located In The Heart Of Austin On South Lamar.
              Great Restaurants,Bars And Coffee Shops Are All Within Walking
              Distance.
            </p>
          </div>

          {/* Studio Images Grid - 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studioImages.map((image) => (
              <div key={image.id} className="overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
