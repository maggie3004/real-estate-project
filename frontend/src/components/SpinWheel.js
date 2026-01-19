import React, { useRef, useEffect } from 'react';
import { prizes } from '../utils/spinWheelUtils';

const SpinWheel = ({ rotation, isSpinning }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas size based on container
        const size = Math.min(containerRef.current?.offsetWidth || 400, 400);
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const outerRadius = size / 2 - 5;
        const wheelRadius = outerRadius - 15;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. Draw Outer Gold Border
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
        const goldGradient = ctx.createRadialGradient(centerX, centerY, wheelRadius, centerX, centerY, outerRadius);
        goldGradient.addColorStop(0, '#B8860B'); // Dark Gold
        goldGradient.addColorStop(0.5, '#FFD700'); // Bright Gold
        goldGradient.addColorStop(1, '#B8860B');
        ctx.fillStyle = goldGradient;
        ctx.fill();

        // 2. Draw Decorative Rim Elements (Lights and Triangles)
        const lightCount = 20;
        const triangleCount = 12;

        // Draw inward-pointing triangles (Silver/Metallic)
        for (let i = 0; i < triangleCount; i++) {
            const angle = (i * 2 * Math.PI) / triangleCount;
            const innerPointR = wheelRadius + 2;
            const outerPointR = outerRadius - 2;
            const width = 15;

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle);

            ctx.beginPath();
            ctx.moveTo(innerPointR, 0);
            ctx.lineTo(outerPointR, -width / 2);
            ctx.lineTo(outerPointR, width / 2);
            ctx.closePath();

            const triGradient = ctx.createLinearGradient(innerPointR, 0, outerPointR, 0);
            triGradient.addColorStop(0, '#E5E7EB');
            triGradient.addColorStop(1, '#9CA3AF');
            ctx.fillStyle = triGradient;
            ctx.fill();

            // Add a little shine to the triangle
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.restore();
        }

        // Draw Lights
        for (let i = 0; i < lightCount; i++) {
            const angle = (i * 2 * Math.PI) / lightCount;
            const x = centerX + Math.cos(angle) * (outerRadius - 7.5);
            const y = centerY + Math.sin(angle) * (outerRadius - 7.5);

            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ffffff';
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        // Draw wheel segments
        const segmentAngle = (2 * Math.PI) / prizes.length;

        prizes.forEach((prize, index) => {
            const startAngle = index * segmentAngle - Math.PI / 2;
            const endAngle = startAngle + segmentAngle;

            // Draw segment with subtle gradient
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, wheelRadius, startAngle, endAngle);
            ctx.closePath();

            const segmentGradient = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, wheelRadius);
            segmentGradient.addColorStop(0, prize.color);
            segmentGradient.addColorStop(1, adjustColor(prize.color, -20)); // Darken towards edge

            ctx.fillStyle = segmentGradient;
            ctx.fill();

            // Draw segment dividers
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)'; // Subtle gold dividers
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw icon with background circle for prominence
            const textAngle = startAngle + segmentAngle / 2;
            const iconRadius = wheelRadius * 0.55;
            const iconX = centerX + Math.cos(textAngle) * iconRadius;
            const iconY = centerY + Math.sin(textAngle) * iconRadius;

            // Icon Background circle for high contrast
            ctx.beginPath();
            ctx.arc(iconX, iconY, size * 0.055, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Prize Icon (Emoji)
            ctx.save();
            ctx.translate(iconX, iconY);
            ctx.rotate(textAngle + Math.PI / 2);
            ctx.font = `${size * 0.09}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            // Bright white glow for the icon
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 10;
            ctx.fillText(prize.emoji, 0, 0);
            ctx.restore();

            // Draw prize name
            const nameRadius = wheelRadius * 0.82;
            const nameX = centerX + Math.cos(textAngle) * nameRadius;
            const nameY = centerY + Math.sin(textAngle) * nameRadius;

            ctx.save();
            ctx.translate(nameX, nameY);
            ctx.rotate(textAngle + Math.PI / 2);
            ctx.font = `bold ${size * 0.028}px "Inter", sans-serif`;
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            // Dark outline for white text to make it pop
            ctx.shadowColor = 'rgba(0, 0, 0, 1)';
            ctx.shadowBlur = 6;
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';

            const nameWords = prize.name.split(' ');
            const drawText = (text, y) => {
                ctx.strokeText(text, 0, y);
                ctx.fillText(text, 0, y);
            };

            if (nameWords.length > 2) {
                drawText(nameWords.slice(0, 2).join(' '), -size * 0.015);
                drawText(nameWords.slice(2).join(' '), size * 0.015);
            } else if (nameWords.length === 2) {
                drawText(nameWords[0], 0, -size * 0.013);
                drawText(nameWords[1], 0, size * 0.013);
            } else {
                drawText(prize.name, 0, 0);
            }
            ctx.restore();
        });

        // 3. Draw Center Circle (SPIN Button look)
        const centerRadius = size * 0.12;

        // Outer rim of center button
        ctx.beginPath();
        ctx.arc(centerX, centerY, centerRadius, 0, 2 * Math.PI);
        const centerRimGradient = ctx.createLinearGradient(centerX - centerRadius, centerY - centerRadius, centerX + centerRadius, centerY + centerRadius);
        centerRimGradient.addColorStop(0, '#B8860B');
        centerRimGradient.addColorStop(0.5, '#FFD700');
        centerRimGradient.addColorStop(1, '#B8860B');
        ctx.fillStyle = centerRimGradient;
        ctx.fill();

        // Inner part of center button
        ctx.beginPath();
        ctx.arc(centerX, centerY, centerRadius - 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw "SPIN" text
        ctx.font = `black ${size * 0.045}px "Inter", sans-serif`;
        ctx.fillStyle = '#991b1b';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('SPIN', centerX, centerY);

    }, [rotation]);

    // Helper to darken hex colors
    const adjustColor = (hex, percent) => {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = ((num >> 8) & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (Math.min(255, Math.max(0, R)) * 0x10000) + (Math.min(255, Math.max(0, G)) * 0x100) + Math.min(255, Math.max(0, B))).toString(16).slice(1);
    };

    return (
        <div ref={containerRef} className="relative flex items-center justify-center w-full max-w-md mx-auto">
            {/* Pointer - Gold/Red Contrast */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20" style={{ marginTop: '-5px' }}>
                <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[35px] border-t-[#B8860B] drop-shadow-xl relative after:content-[''] after:absolute after:-top-[32px] after:left-[-12px] after:w-0 after:h-0 after:border-l-[12px] after:border-l-transparent after:border-r-[12px] after:border-r-transparent after:border-t-[22px] after:border-t-[#991b1b]"></div>
            </div>

            {/* Wheel */}
            <div
                className="transition-transform duration-[5000ms] ease-out drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                style={{
                    transform: `rotate(${rotation}deg)`,
                    transitionTimingFunction: isSpinning ? 'cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
                }}
            >
                <canvas
                    ref={canvasRef}
                    className="w-full h-auto"
                />
            </div>
        </div>
    );
};

export default SpinWheel;
