import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Button is installed
import { Card } from "@/components/ui/card"; // Assuming shadcn/ui Card is installed
export default function ThePrize() {
  return (
    <>
      <title>The Prize | Cut to Black Prize</title>
      {/* <PrizePage /> */}

      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <Card className="w-full border-none shadow-2xl overflow-hidden relative h-96 mt-20">
          {/* Background Image Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`, // Placeholder scenic image; replace with actual
            }}
          >
            <div className="absolute inset-0 bg-black/20" />{" "}
            {/* Dark overlay for text readability */}
          </div>

          {/* Content Overlay */}
        </Card>
        <div className="relative z-10 p-8 md:p-12 text-white text-center">
          {/* Main Hero Text */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight bg-linear-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            One winner
            <br />
            <span className="text-4xl md:text-7xl">$10,000.</span>
            Producer meeting.
          </h1>

          {/* Description Paragraphs */}
          <div className="max-w-7xl mx-auto text-left text-lg md:text-xl leading-relaxed mb-8 space-y-6">
            <p>
              Cut to Black Prize is intentionally small and highly selective. We
              invite a limited number of writers whose work signals craft,
              discipline, and a distinct voice. Every script is read blind by
              working producers and analysts, with the field kept tight so
              attention goes to depth, not volume. This is a competition
              designed for outcomes, not optics.
            </p>
            <p>
              The prize is singular because the promise is singular. One winner
              receives $10,000, a trip to Hollywood, and a scheduled meeting
              with a producer. If you were invited, you are part of a short list
              chosen for potential and readiness. This is the place to submit
              your strongest work.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button size="lg" className="py-6">
              REQUEST AN INVITATION
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
