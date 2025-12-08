import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-linear-to-br from-background via-background to-pblue/5">
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Pulsing background glow */}
        <div className="absolute inset-0 rounded-full bg-pblue/20 blur-xl animate-pulse"></div>
        
        {/* Outer spinning ring */}
        <div 
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-pblue border-r-pblue animate-spin"
          style={{ animationDuration: "1.5s" }}>
        </div>
        
        {/* Middle counter-rotating ring */}
        <div 
          className="absolute inset-3 rounded-full border-3 border-transparent border-t-bluegray border-b-bluegray animate-spin"
          style={{ 
            animationDuration: "2.5s",
            animationDirection: "reverse"
          }}>
        </div>

        {/* Inner pulsing circle */}
        <div 
          className="absolute w-24 h-24 rounded-full bg-pblue/10 animate-ping"
          style={{ animationDuration: "2s" }}>
        </div>

        {/* Logo with scale animation */}
        <div className="relative z-10 animate-pulse">
          <Image
            src="/round-logo.webp"
            alt="Loading"
            width={80}
            height={80}
            className="drop-shadow-2xl"
          />
        </div>

        {/* Orbiting dots */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-pblue rounded-full -translate-x-1/2"></div>
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s", animationDelay: "1.5s" }}>
          <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-bluegray rounded-full -translate-x-1/2"></div>
        </div>
      </div>
      
      {/* Loading text */}
      <p className="absolute mt-56 text-sm text-bluegray animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loading;