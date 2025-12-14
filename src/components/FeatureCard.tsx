import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: "primary" | "secondary" | "accent" | "success" | "purple";
}

const colorClasses = {
  primary: "gradient-button",
  secondary: "gradient-pink",
  accent: "gradient-accent",
  success: "gradient-green",
  purple: "gradient-purple",
};

const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => {
  return (
    <div className="gradient-card rounded-3xl p-6 shadow-card hover:shadow-float transition-all duration-300 hover:-translate-y-2 group">
      <div className={`
        w-16 h-16 rounded-2xl ${colorClasses[color]} 
        flex items-center justify-center mb-4
        group-hover:scale-110 transition-transform duration-300
        shadow-soft
      `}>
        <div className="text-white w-8 h-8">
          {icon}
        </div>
      </div>
      <h3 className="font-fredoka text-xl text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
