import { HeroSection } from "@/components/HeroSection";
import { EventDetails } from "@/components/EventDetails";
import { RsvpSection } from "@/components/RsvpSection";
import { NameVotingSection } from "@/components/NameVotingSection";
import { Footer } from "@/components/Footer";
import { BalloonArch } from "@/components/decorations/BalloonArch";
import { PomeranianArt } from "@/components/decorations/PomeranianArt";
import { PomeranianSleepingArt } from "@/components/decorations/PomeranianSleepingArt";
import { FloatingParticles } from "@/components/decorations/FloatingParticles";
import { Gatekeeper } from "@/components/Gatekeeper";

export default function Home() {
  return (
    <Gatekeeper>
      <main className="flex min-h-screen flex-col items-center py-10 px-4 md:py-20 relative overflow-hidden bg-cloud-50">
        
        {/* Lluvia azul y dorada de fondo */}
      <FloatingParticles />

      {/* El Arco Central con Globos en CSS puro */}
      <div className="relative w-full max-w-4xl bg-white shadow-[0_20px_60px_rgba(42,67,101,0.06)] rounded-t-[200px] md:rounded-t-[300px] rounded-b-3xl border border-white mt-24 md:mt-32 pb-32">
        
        {/* Componente de Globos CSS */}
        <BalloonArch />

        {/* Borde interior dorado súper sutil */}
        <div className="absolute inset-3 md:inset-5 border border-gold-300/30 rounded-t-[190px] md:rounded-t-[280px] rounded-b-2xl pointer-events-none z-10" />

        {/* Contenido dentro del Arco */}
        <div className="relative z-30 pt-40 md:pt-48 px-4 pb-10">
          <HeroSection />
          
          <div className="flex justify-center my-16 opacity-50">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
          </div>

          <EventDetails />
          
          <div className="flex justify-center my-16 opacity-50">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
          </div>

          <RsvpSection />
          
          <div className="flex justify-center my-16 opacity-50">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
          </div>

          <NameVotingSection />
          <Footer />
        </div>
      </div>

      {/* Perrito de pie (SVG Inline - Izquierda) */}
      <div className="fixed bottom-0 left-[-20px] md:left-10 w-48 md:w-64 h-48 md:h-64 z-40 pointer-events-none">
        <PomeranianArt />
      </div>

      {/* Perrito durmiendo (SVG Inline - Derecha) */}
      <div className="fixed bottom-[-10px] right-[-20px] md:right-10 w-56 md:w-80 h-56 md:h-80 z-40 pointer-events-none">
        <PomeranianSleepingArt />
      </div>
      
      {/* Nubes en el suelo hechas con CSS Puro */}
      <div className="fixed bottom-[-50px] left-0 right-0 h-40 z-30 pointer-events-none overflow-hidden">
        {/* Capa de nube trasera */}
        <div className="absolute bottom-0 w-full flex justify-around opacity-60 blur-md">
          <div className="w-64 h-64 bg-white rounded-full translate-y-1/2"></div>
          <div className="w-96 h-96 bg-white rounded-full translate-y-1/3"></div>
          <div className="w-72 h-72 bg-white rounded-full translate-y-1/2"></div>
        </div>
        {/* Capa de nube delantera */}
        <div className="absolute bottom-0 w-full flex justify-between blur-sm">
          <div className="w-80 h-80 bg-white/90 rounded-full translate-y-[60%] -translate-x-10"></div>
          <div className="w-[500px] h-[500px] bg-white/90 rounded-full translate-y-[70%]"></div>
          <div className="w-96 h-96 bg-white/90 rounded-full translate-y-[60%] translate-x-10"></div>
        </div>
      </div>
    </main>
  </Gatekeeper>
);
}
