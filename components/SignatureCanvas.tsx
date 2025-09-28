import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import type { SignatureCanvasRef } from '../types.ts';
import { SignatureIcon } from './icons.tsx';


const SignatureCanvas = forwardRef<SignatureCanvasRef>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasSigned(false);
        setIsDrawing(false); // Reset drawing state
      }
    }
  };

  useImperativeHandle(ref, () => ({
    clear: clearCanvas,
    getSignature: () => {
      if (!hasSigned || !canvasRef.current) return '';
      // Create a temporary canvas to draw the signature on a white background
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (canvasRef.current && tempCtx) {
          tempCanvas.width = canvasRef.current.width;
          tempCanvas.height = canvasRef.current.height;
          tempCtx.fillStyle = '#FFFFFF';
          tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
          tempCtx.drawImage(canvasRef.current, 0, 0);
          return tempCanvas.toDataURL('image/png');
      }
      // Fallback to the original canvas if something fails
      return canvasRef.current.toDataURL('image/png');
    },
    isEmpty: () => !hasSigned,
  }));
  
  // Effect for initial canvas setup and resizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if(!ctx) return;

    const resizeCanvas = () => {
      // Preserve drawing is complex, so for simplicity we will clear on resize.
      // This is often an acceptable UX tradeoff.
      const { width } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = 200; // Fixed height
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Effect for handling drawing logic, depends on `isDrawing` state
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const getCoordinates = (event: MouseEvent | TouchEvent): { x: number; y: number } | null => {
      const rect = canvas.getBoundingClientRect();
      
      if (event instanceof MouseEvent) {
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
      }
      if (window.TouchEvent && event instanceof TouchEvent && event.touches.length > 0) {
        return { x: event.touches[0].clientX - rect.left, y: event.touches[0].clientY - rect.top };
      }
      return null;
    };

    const startDrawing = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      const coords = getCoordinates(event);
      if (!coords) return;

      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      setIsDrawing(true);
      if (!hasSigned) {
        setHasSigned(true);
      }
    };

    const draw = (event: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      event.preventDefault();
      const coords = getCoordinates(event);
      if (!coords) return;
      
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    };

    const stopDrawing = () => {
      if (isDrawing) {
        ctx.closePath();
        setIsDrawing(false);
      }
    };
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    
    // Use { passive: false } to allow preventDefault for touch events
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isDrawing, hasSigned]);

  return (
    <div className="w-full">
      <label htmlFor="signature" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        <SignatureIcon className="h-5 w-5 mr-2 text-gray-500" />
        Firma Digital
      </label>
      <div className="relative w-full h-[200px] bg-white border-2 border-dashed border-gray-300 rounded-lg touch-none overflow-hidden">
        {!hasSigned && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
            <p>Firme en este recuadro</p>
          </div>
        )}
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
      <button
        type="button"
        onClick={clearCanvas}
        className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
      >
        Limpiar Firma
      </button>
    </div>
  );
});

export default SignatureCanvas;