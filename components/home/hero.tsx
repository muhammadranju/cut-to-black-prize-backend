// "use client";
// import { Pause, Play } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

// export default function Hero() {
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const playerRef = useRef<any>(null);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [showIcon, setShowIcon] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const iconTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     // Load Vimeo player script
//     const script = document.createElement("script");
//     script.src = "https://player.vimeo.com/api/player.js";
//     script.async = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       if (iframeRef.current && (window as any).Vimeo) {
//         playerRef.current = new (window as any).Vimeo.Player(iframeRef.current);

//         // Mute the video on load
//         playerRef.current.setVolume(0);

//         // Listen for video ready event
//         playerRef.current.on("loaded", () => {
//           setIsLoading(false);
//         });

//         // Fallback: hide loader after 3 seconds even if event doesn't fire
//         setTimeout(() => {
//           setIsLoading(false);
//         }, 5000);
//       }
//     };

//     return () => {
//       if (document.body.contains(script)) {
//         document.body.removeChild(script);
//       }
//     };
//   }, []);

//   const togglePlayPause = () => {
//     if (!playerRef.current) return;

//     if (isPlaying) {
//       playerRef.current.pause();
//       setIsPlaying(false);
//     } else {
//       playerRef.current.play();
//       setIsPlaying(true);
//     }

//     // Show icon
//     setShowIcon(true);

//     // Clear existing timeout
//     if (iconTimeoutRef.current) {
//       clearTimeout(iconTimeoutRef.current);
//     }

//     // Hide icon after 1 second
//     iconTimeoutRef.current = setTimeout(() => {
//       setShowIcon(false);
//     }, 1000);
//   };

//   return (
//     <div className="relative w-full h-screen bg-cover bg-center flex items-center justify-center overflow-hidden -mb-[550px] lg:mb-0">
//       <div className="absolute inset-0 lg:bg-black/40 z-10 pointer-events-none "></div>
//       {/*  */}
//       {/* Loading Spinner */}
//       {isLoading && (
//         <div className="absolute inset-0 z-40 flex items-center justify-center bg-black">
//           <div className="relative">
//             {/* Spinning circle */}
//             <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
//             {/* Optional: Loading text */}
//           </div>
//         </div>
//       )}

//       <div className="relative w-full h-full z-0 lg:mt-0 mt-36 ">
//         <div
//           style={{
//             padding: "56.25% 0 0 0",
//             position: "relative",
//             width: "100%",
//           }}
//         >
//           <iframe
//             ref={iframeRef}
//             src="https://player.vimeo.com/video/278235942?autoplay=1&background=1"
//             frameBorder="0"
//             allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//             }}
//             title="Cut to Black Prize"
//           ></iframe>

//           {/* Clickable overlay */}
//           <div
//             className="absolute inset-0 z-20 cursor-pointer"
//             onClick={togglePlayPause}
//           />

//           {/* Play/Pause Icon Overlay */}
//           {showIcon && (
//             <div
//               className="absolute inset-0 lg:-top-36 z-30 flex items-center justify-center pointer-events-none"
//               style={{
//                 animation: "fadeOut 1s ease-out forwards",
//               }}
//             >
//               <div className="bg-black/60 rounded-full p-6 ">
//                 {isPlaying ? (
//                   <Play className="lg:w-16 lg:h-16 w-10 h-10 text-white" />
//                 ) : (
//                   <Pause className="lg:w-16 lg:h-16 w-10 h-10 text-white" />
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeOut {
//           0% {
//             opacity: 1;
//           }
//           70% {
//             opacity: 1;
//           }
//           100% {
//             opacity: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showIcon, setShowIcon] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [minTimePassed, setMinTimePassed] = useState(false);
  const iconTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Minimum loading time timer (5 seconds)
    const minLoadTimer = setTimeout(() => {
      setMinTimePassed(true);
    }, 3000);

    return () => clearTimeout(minLoadTimer);
  }, []);

  // Hide loading spinner only when both video is ready AND minimum time has passed
  useEffect(() => {
    if (videoReady && minTimePassed) {
      setIsLoading(false);
    }
  }, [videoReady, minTimePassed]);

  useEffect(() => {
    // Load Vimeo player script
    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (iframeRef.current && (window as any).Vimeo) {
        playerRef.current = new (window as any).Vimeo.Player(iframeRef.current);

        // Mute the video on load
        playerRef.current.setVolume(0);

        // Listen for video ready event
        playerRef.current.on("loaded", () => {
          setVideoReady(true);
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pause();
      setIsPlaying(false);
    } else {
      playerRef.current.play();
      setIsPlaying(true);
    }

    // Show icon
    setShowIcon(true);

    // Clear existing timeout
    if (iconTimeoutRef.current) {
      clearTimeout(iconTimeoutRef.current);
    }

    // Hide icon after 1 second
    iconTimeoutRef.current = setTimeout(() => {
      setShowIcon(false);
    }, 1000);
  };

  return (
    <div className="relative w-full h-screen bg-cover bg-center flex items-center justify-center overflow-hidden -mb-[550px] lg:mb-0">
      <div className="absolute inset-0 lg:bg-black/40 z-10 pointer-events-none "></div>
      {/*  */}
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black">
          <div className="relative">
            {/* Spinning circle */}
            <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      <div className="relative w-full h-full z-0 lg:mt-0 mt-36 ">
        <div
          style={{
            padding: "56.25% 0 0 0",
            position: "relative",
            width: "100%",
          }}
        >
          <iframe
            ref={iframeRef}
            src="https://player.vimeo.com/video/278235942?autoplay=1&background=1"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            title="Cut to Black Prize"
          ></iframe>

          {/* Clickable overlay */}
          <div
            className="absolute inset-0 z-20 cursor-pointer"
            onClick={togglePlayPause}
          />

          {/* Play/Pause Icon Overlay */}
          {showIcon && (
            <div
              className="absolute inset-0 lg:-top-36 z-30 flex items-center justify-center pointer-events-none"
              style={{
                animation: "fadeOut 1s ease-out forwards",
              }}
            >
              <div className="bg-black/60 rounded-full p-6 ">
                {isPlaying ? (
                  <Play className="lg:w-16 lg:h-16 w-10 h-10 text-white" />
                ) : (
                  <Pause className="lg:w-16 lg:h-16 w-10 h-10 text-white" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
