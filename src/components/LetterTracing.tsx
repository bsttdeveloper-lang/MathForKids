import { useState, useRef, useEffect } from "react";
import { Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const LetterTracing = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 280;
    canvas.height = 280;

    // Draw the letter template
    drawTemplate(ctx);
  }, []);

  const drawTemplate = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, 280, 280);
    
    // Background
    ctx.fillStyle = '#FFF9E6';
    ctx.fillRect(0, 0, 280, 280);
    
    // Draw dotted letter A
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 30;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setLineDash([5, 10]);
    
    // Letter A shape
    ctx.beginPath();
    ctx.moveTo(140, 40);
    ctx.lineTo(60, 240);
    ctx.moveTo(140, 40);
    ctx.lineTo(220, 240);
    ctx.moveTo(85, 160);
    ctx.lineTo(195, 160);
    ctx.stroke();
    
    ctx.setLineDash([]);
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    setHasDrawn(true);
    
    const { x, y } = getCoordinates(e);
    
    ctx.strokeStyle = '#FF6B9D';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    
    const { x, y } = getCoordinates(e);
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    
    drawTemplate(ctx);
    setHasDrawn(false);
  };

  return (
    <div className="gradient-card rounded-3xl p-8 shadow-float max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-bold mb-4">
          <Sparkles className="w-4 h-4" />
          Letter Practice
        </div>
        <h3 className="font-fredoka text-2xl text-foreground mb-2">Trace the Letter A!</h3>
        <p className="text-muted-foreground">Follow the dotted lines with your finger</p>
      </div>

      {/* Canvas Container */}
      <div className="bg-muted/30 rounded-2xl p-4 mb-6 flex justify-center">
        <canvas
          ref={canvasRef}
          className="rounded-xl cursor-crosshair touch-none shadow-card"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <Button 
          onClick={resetCanvas} 
          variant="outline" 
          className="flex-1"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Start Over
        </Button>
        {hasDrawn && (
          <Button variant="success" className="flex-1 animate-pop">
            Great Job! ⭐
          </Button>
        )}
      </div>
    </div>
  );
};

export default LetterTracing;
