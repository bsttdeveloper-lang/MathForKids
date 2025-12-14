import { useState } from "react";
import { Star, BookOpen, Calculator, Palette, Music, Brain, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MathExercise from "@/components/MathExercise";
import LetterTracing from "@/components/LetterTracing";
import StoreButtons from "@/components/StoreButtons";
import FeatureCard from "@/components/FeatureCard";
import mascotOwl from "@/assets/mascot-owl.png";
import decorativeElements from "@/assets/decorative-elements.png";

const Index = () => {
  const [activeDemo, setActiveDemo] = useState<"math" | "letter">("math");

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Background Decorations */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url(${decorativeElements})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Floating Decorative Elements */}
      <div className="fixed top-20 left-10 w-16 h-16 rounded-full gradient-accent opacity-40 animate-float" />
      <div className="fixed top-40 right-20 w-12 h-12 rounded-full gradient-pink opacity-50 animate-bounce-slow" style={{ animationDelay: '0.5s' }} />
      <div className="fixed bottom-32 left-20 w-10 h-10 rounded-full gradient-purple opacity-40 animate-float" style={{ animationDelay: '1s' }} />
      <div className="fixed bottom-40 right-10 w-14 h-14 rounded-full gradient-green opacity-40 animate-bounce-slow" style={{ animationDelay: '1.5s' }} />

      {/* Header */}
      <header className="relative z-10 py-6 px-4">
        <nav className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={mascotOwl} alt="Wise Owl" className="w-12 h-12 animate-wiggle" />
            <span className="font-fredoka text-2xl text-foreground">LearnWithOwl</span>
          </div>
          <Button variant="default" size="sm">
            Get Started
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-12 md:py-20 px-4">
        <div className="container mx-auto text-center">
          {/* Mascot */}
          <div className="relative inline-block mb-8">
            <img 
              src={mascotOwl} 
              alt="Wise Owl Mascot" 
              className="w-48 h-48 md:w-64 md:h-64 animate-bounce-slow mx-auto"
            />
            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full gradient-button flex items-center justify-center animate-pulse-glow">
              <Star className="w-6 h-6 text-primary-foreground fill-current" />
            </div>
          </div>

          {/* Hero Text */}
          <h1 className="font-fredoka text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight">
            Learning is <span className="text-primary">Fun</span> with<br />
            <span className="text-secondary">LearnWithOwl!</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 font-nunito">
            Help your kids learn letters, numbers, and more through exciting games and activities!
          </p>

          {/* Store Buttons */}
          <StoreButtons />

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur px-4 py-2 rounded-full shadow-soft">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-current" />
                ))}
              </div>
              <span className="text-sm font-bold text-foreground">4.9 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur px-4 py-2 rounded-full shadow-soft">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-foreground">1M+ Kids Learning</span>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="relative z-10 py-16 px-4" id="demo">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-fredoka text-3xl md:text-5xl text-foreground mb-4">
              Try it Now! <span className="animate-sparkle inline-block">✨</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience our interactive exercises
            </p>
          </div>

          {/* Demo Toggle */}
          <div className="flex justify-center gap-4 mb-10">
            <Button
              variant={activeDemo === "math" ? "default" : "outline"}
              onClick={() => setActiveDemo("math")}
              className="gap-2"
            >
              <Calculator className="w-5 h-5" />
              Math
            </Button>
            <Button
              variant={activeDemo === "letter" ? "secondary" : "outline"}
              onClick={() => setActiveDemo("letter")}
              className="gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Letters
            </Button>
          </div>

          {/* Demo Content */}
          <div className="animate-pop" key={activeDemo}>
            {activeDemo === "math" ? <MathExercise /> : <LetterTracing />}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 px-4 bg-card/50 backdrop-blur">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-fredoka text-3xl md:text-5xl text-foreground mb-4">
              Everything Kids Love!
            </h2>
            <p className="text-xl text-muted-foreground">
              Packed with activities designed for young learners
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Calculator />}
              title="Fun Math Games"
              description="Learn counting, addition, and subtraction with colorful visual exercises"
              color="primary"
            />
            <FeatureCard
              icon={<BookOpen />}
              title="Letter Tracing"
              description="Practice writing letters with guided tracing activities"
              color="secondary"
            />
            <FeatureCard
              icon={<Palette />}
              title="Creative Coloring"
              description="Express creativity while learning shapes and colors"
              color="accent"
            />
            <FeatureCard
              icon={<Music />}
              title="Sing & Learn"
              description="Catchy songs that make learning memorable"
              color="purple"
            />
            <FeatureCard
              icon={<Brain />}
              title="Brain Puzzles"
              description="Challenge young minds with age-appropriate puzzles"
              color="success"
            />
            <FeatureCard
              icon={<Trophy />}
              title="Rewards & Progress"
              description="Earn stars and track learning achievements"
              color="primary"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="gradient-card rounded-3xl p-10 md:p-16 shadow-float max-w-4xl mx-auto relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 gradient-accent rounded-full opacity-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 gradient-pink rounded-full opacity-20 blur-3xl" />
            
            <div className="relative z-10">
              <img 
                src={mascotOwl} 
                alt="Wise Owl" 
                className="w-32 h-32 mx-auto mb-6 animate-float"
              />
              <h2 className="font-fredoka text-3xl md:text-4xl text-foreground mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                Join millions of happy kids on their learning adventure today!
              </p>
              <StoreButtons />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 bg-card/80 backdrop-blur border-t border-border">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={mascotOwl} alt="Wise Owl" className="w-10 h-10" />
            <span className="font-fredoka text-lg text-foreground">LearnWithOwl</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 LearnWithOwl. Made with ❤️ for kids everywhere.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
