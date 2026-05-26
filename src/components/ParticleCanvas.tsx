import { useEffect, useRef } from "react";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Scroll interpolation and real-time kinetic physics
    let smoothScrollY = window.scrollY;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let scrollWobble = 0;

    // --- 3D VECTOR MATH CLASS & COMPOSITIONS ---
    interface Point3D {
      x: number;
      y: number;
      z: number;
    }

    function rotateX(p: Point3D, angle: number): Point3D {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x,
        y: p.y * cos - p.z * sin,
        z: p.y * sin + p.z * cos
      };
    }

    function rotateY(p: Point3D, angle: number): Point3D {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x * cos + p.z * sin,
        y: p.y,
        z: -p.x * sin + p.z * cos
      };
    }

    function rotateZ(p: Point3D, angle: number): Point3D {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x * cos - p.y * sin,
        y: p.x * sin + p.y * cos,
        z: p.z
      };
    }

    function getCrossProduct(v1: Point3D, v2: Point3D, v3: Point3D): Point3D {
      const ax = v2.x - v1.x;
      const ay = v2.y - v1.y;
      const az = v2.z - v1.z;
      const bx = v3.x - v1.x;
      const by = v3.y - v1.y;
      const bz = v3.z - v1.z;
      return {
        x: ay * bz - az * by,
        y: az * bx - ax * bz,
        z: ax * by - ay * bx
      };
    }

    function normalizeVector(v: Point3D): Point3D {
      const len = Math.hypot(v.x, v.y, v.z);
      if (len === 0) return { x: 0, y: 0, z: 0 };
      return { x: v.x / len, y: v.y / len, z: v.z / len };
    }

    function dotProduct(v1: Point3D, v2: Point3D): number {
      return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }

    // --- 3D GEOMETRY SCHEMAS & DIALS ---

    // Shape 1: Geodesic Icosahedron Solid (20 face polygons, 30 edges, 12 vertices)
    const pIco = (1.0 + Math.sqrt(5.0)) / 2.0;
    const rawIcoVertices = [
      { x: -1, y: pIco, z: 0 }, { x: 1, y: pIco, z: 0 },
      { x: -1, y: -pIco, z: 0 }, { x: 1, y: -pIco, z: 0 },
      { x: 0, y: -1, z: pIco }, { x: 0, y: 1, z: pIco },
      { x: 0, y: -1, z: -pIco }, { x: 0, y: 1, z: -pIco },
      { x: pIco, y: 0, z: -1 }, { x: pIco, y: 0, z: 1 },
      { x: -pIco, y: 0, z: -1 }, { x: -pIco, y: 0, z: 1 }
    ];
    const icoNormFactor = Math.hypot(1, pIco);
    const icosaVertices: Point3D[] = rawIcoVertices.map(v => ({
      x: v.x / icoNormFactor,
      y: v.y / icoNormFactor,
      z: v.z / icoNormFactor
    }));

    // Standard icosahedron face index combinations
    const icosaFaces: number[][] = [
      [0, 11, 5],  [0, 5, 1],   [0, 1, 7],   [0, 7, 10],  [0, 10, 11],
      [1, 5, 9],   [5, 11, 4],  [11, 10, 2], [10, 7, 6],  [7, 1, 8],
      [3, 9, 4],   [3, 4, 2],   [3, 2, 6],   [3, 6, 8],   [3, 8, 9],
      [4, 9, 5],   [2, 4, 11],  [6, 2, 10],  [8, 6, 7],   [9, 8, 1]
    ];

    const icosaEdges: number[][] = [];
    icosaFaces.forEach(face => {
      const pairs = [[face[0], face[1]], [face[1], face[2]], [face[2], face[0]]];
      pairs.forEach(([a, b]) => {
        const sorted = [Math.min(a, b), Math.max(a, b)];
        if (!icosaEdges.some(e => e[0] === sorted[0] && e[1] === sorted[1])) {
          icosaEdges.push(sorted);
        }
      });
    });

    // Shape 2: Geodesic Octahedron Solid (8 faces, 12 edges, 6 vertices)
    const octaVertices: Point3D[] = [
      { x: 1, y: 0, z: 0 }, { x: -1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 }, { x: 0, y: -1, z: 0 },
      { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: -1 }
    ];
    const octaFaces: number[][] = [
      [0, 2, 4], [2, 1, 4], [1, 3, 4], [3, 0, 4],
      [0, 3, 5], [3, 1, 5], [1, 2, 5], [2, 0, 5]
    ];
    const octaEdges: number[][] = [];
    octaFaces.forEach(face => {
      const pairs = [[face[0], face[1]], [face[1], face[2]], [face[2], face[0]]];
      pairs.forEach(([a, b]) => {
        const sorted = [Math.min(a, b), Math.max(a, b)];
        if (!octaEdges.some(e => e[0] === sorted[0] && e[1] === sorted[1])) {
          octaEdges.push(sorted);
        }
      });
    });

    // Shape 3: Quantum Tesseract Inner/Outer glass hypercube
    const tesseractVertices: Point3D[] = [];
    const baseCube = [
      { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 },
      { x: 1, y: 1, z: -1 }, { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 },
      { x: 1, y: 1, z: 1 }, { x: -1, y: 1, z: 1 }
    ];
    tesseractVertices.push(...baseCube.map(v => ({ x: v.x * 0.95, y: v.y * 0.95, z: v.z * 0.95 })));
    tesseractVertices.push(...baseCube.map(v => ({ x: v.x * 0.50, y: v.y * 0.50, z: v.z * 0.50 })));

    // Facets/Faces of Tesseract (outer 6 + inner 6)
    const tesseractFaces: number[][] = [
      // Outer cube
      [0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4],
      [2, 3, 7, 6], [0, 3, 7, 4], [1, 2, 6, 5],
      // Inner cube (offset + 8)
      [8, 9, 10, 11], [12, 13, 14, 15], [8, 9, 13, 12],
      [10, 11, 15, 14], [8, 11, 15, 12], [9, 10, 14, 13]
    ];
    const tesseractEdges: number[][] = [];
    tesseractFaces.forEach(face => {
      const numPts = face.length;
      for (let i = 0; i < numPts; i++) {
        const a = face[i];
        const b = face[(i + 1) % numPts];
        const sorted = [Math.min(a, b), Math.max(a, b)];
        if (!tesseractEdges.some(e => e[0] === sorted[0] && e[1] === sorted[1])) {
          tesseractEdges.push(sorted);
        }
      }
    });
    // Add the 3D projection bridging edges from outer to inner vertices
    for (let i = 0; i < 8; i++) {
      tesseractEdges.push([i, i + 8]);
    }

    // --- COGNITIVE SPACE BACKGROUND NEURAL DUST ---
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      originalRadius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.5 + 0.5;
        this.originalRadius = this.radius;

        const colors = [
          "rgba(59, 130, 246, 0.45)", // Blue
          "rgba(139, 92, 246, 0.45)", // Purple
          "rgba(168, 85, 247, 0.35)", // Indigo
          "rgba(6, 182, 212, 0.4)"   // Cyan
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(mouseX: number, mouseY: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 180) {
          const force = (180 - dist) / 180;
          this.x += (dx / dist) * force * 0.65;
          this.y += (dy / dist) * force * 0.65;
          this.radius = this.originalRadius * (1 + force * 1.2);
        } else {
          if (this.radius > this.originalRadius) {
            this.radius -= 0.04;
          }
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
      }
    }

    const particles: Particle[] = [];
    const count = Math.min(Math.floor((width * height) / 12000), 110);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    let mouse = { x: width / 2, y: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // --- PAINTERS ALGORITHM ENGINE FOR UNIFIED 3D ELEMENTS ---
    enum RenderPrimitiveType {
      FACE,
      EDGE,
      VERTEX
    }

    interface RenderPrimitive {
      type: RenderPrimitiveType;
      depth: number;
      draw: () => void;
    }

    function draw3DSolid(
      c: CanvasRenderingContext2D,
      vertices: Point3D[],
      faces: number[][],
      edges: number[][],
      baseCenterX: number,
      baseCenterY: number,
      scale: number,
      angleX: number,
      angleY: number,
      angleZ: number,
      primaryColor: string, // format: "rgba(59, 130, 246, 1)" or similar
      highlightColor: string,
      parallaxFactor: number
    ) {
      const centerY = baseCenterY - smoothScrollY * parallaxFactor;

      // Skip rendering if shapes scroll entirely outside the visual container bounds
      if (centerY < -scale * 2.5 || centerY > height + scale * 2.5) {
        return;
      }

      // 1. Rotation pipeline apply
      const rotatedVertices = vertices.map(v => {
        let p = rotateX(v, angleX);
        p = rotateY(p, angleY);
        p = rotateZ(p, angleZ);
        return p;
      });

      // 2. Perspective focal projection
      const cameraDist = 3.2;
      const focalMultiplier = scale * 1.5;

      const projected = rotatedVertices.map(p => {
        const factor = focalMultiplier / (p.z + cameraDist);
        return {
          sx: baseCenterX + p.x * factor,
          sy: centerY + p.y * factor,
          sz: p.z
        };
      });

      const primitivesList: RenderPrimitive[] = [];

      // Create Light Vector targeting cursor coordinates in 3D perspective space
      const rx = (mouse.x - baseCenterX) / (width * 0.5);
      const ry = (mouse.y - centerY) / (height * 0.5);
      const rawLight = { x: rx, y: ry, z: -1.2 };
      const lightDir = normalizeVector(rawLight);

      // --- 3. INJECT FACES PRIMITIVES WITH REAL LAMBERTIAN SPECS SHADING ---
      faces.forEach(face => {
        // Average coordinates for face depth sorting
        let sumZ = 0;
        face.forEach(idx => (sumZ += rotatedVertices[idx].z));
        const avgDepth = sumZ / face.length;

        primitivesList.push({
          type: RenderPrimitiveType.FACE,
          depth: avgDepth,
          draw: () => {
            // Apply polygon triangulation normal solver for illumination
            const p0 = rotatedVertices[face[0]];
            const p1 = rotatedVertices[face[1]];
            const p2 = rotatedVertices[face[2]];

            const normal = normalizeVector(getCrossProduct(p0, p1, p2));
            
            // Align camera view forward vector
            const cameraView = { x: 0, y: 0, z: -1 };
            const backfaceCull = dotProduct(normal, cameraView);

            // Double sided transparent glass mesh rendering
            const isFront = backfaceCull < 0;

            // Compute Lambert direct reflection shade
            const lightReflect = dotProduct(normal, lightDir);
            const diffuse = Math.max(0.0, (lightReflect + 1.0) / 2.0); // wrap diffuse highlights

            // Calculate elegant glass gradient highlight and ambient alpha
            let alpha = isFront ? 0.22 : 0.08;
            // Charge opacity based on scroll activity to make scrolling highly visual
            alpha += Math.min(0.18, Math.abs(scrollWobble) * 1.8);

            // Generate beautiful procedural gradient inside face polygon
            c.beginPath();
            c.moveTo(projected[face[0]].sx, projected[face[0]].sy);
            for (let i = 1; i < face.length; i++) {
              c.lineTo(projected[face[i]].sx, projected[face[i]].sy);
            }
            c.closePath();

            // Set up rich neon face colors reflecting diffuse light values
            const rVal = Math.floor(59 + diffuse * 80);
            const gVal = Math.floor(130 + diffuse * 50);
            const bVal = Math.floor(246 + diffuse * 9);
            const gradientColors = isFront 
              ? `rgba(${rVal}, ${gVal}, ${bVal}, ${alpha})`
              : `rgba(139, 92, 246, ${alpha})`;

            c.fillStyle = gradientColors;
            c.fill();

            // Draw a subtle border stroke around front facing faces
            if (isFront) {
              c.strokeStyle = highlightColor.replace("1)", `${alpha * 1.4}`);
              c.lineWidth = 0.55;
              c.stroke();
            }
          }
        });
      });

      // --- 4. INJECT EDGES PRIMITIVES ---
      edges.forEach(edge => {
        const v0 = rotatedVertices[edge[0]];
        const v1 = rotatedVertices[edge[1]];
        const avgDepth = (v0.z + v1.z) / 2;

        primitivesList.push({
          type: RenderPrimitiveType.EDGE,
          depth: avgDepth,
          draw: () => {
            const p0 = projected[edge[0]];
            const p1 = projected[edge[1]];

            // Normalize depth range approx -1.4 to 1.4 to establish volumetric opacity
            const depthRatio = (avgDepth + 1.4) / 2.8;
            const alphaVal = Math.max(0.1, Math.min(0.68, 0.65 - depthRatio * 0.42)) + Math.min(0.2, Math.abs(scrollWobble) * 2.2);
            const lineWidth = Math.max(0.6, Math.min(2.5, 2.4 - depthRatio * 1.4));

            c.beginPath();
            c.moveTo(p0.sx, p0.sy);
            c.lineTo(p1.sx, p1.sy);

            c.strokeStyle = primaryColor.replace("1)", `${alphaVal})`);
            c.lineWidth = lineWidth;
            c.lineCap = "round";
            c.stroke();
          }
        });
      });

      // --- 5. INJECT VERTICES PRIMITIVES (NEON SPARK POINTS) ---
      projected.forEach((p, idx) => {
        const rotV = rotatedVertices[idx];

        primitivesList.push({
          type: RenderPrimitiveType.VERTEX,
          depth: rotV.z,
          draw: () => {
            // Determine distance from mouse to vertex for proximity feedback reaction
            const dx = mouse.x - p.sx;
            const dy = mouse.y - p.sy;
            const dist = Math.hypot(dx, dy);

            let pointRadius = 2.2;
            let targetGlow = false;

            if (dist < 110) {
              const hoverSustain = (110 - dist) / 110;
              pointRadius += hoverSustain * 3.5;
              targetGlow = true;
            }

            // Draw vertex point
            c.beginPath();
            c.arc(p.sx, p.sy, pointRadius, 0, Math.PI * 2);

            if (targetGlow) {
              c.shadowColor = highlightColor;
              c.shadowBlur = 10;
              c.fillStyle = "#ffffff";
            } else {
              c.fillStyle = highlightColor;
            }

            c.fill();

            // Reset canvas shadow states instantly for frame rate health
            c.shadowBlur = 0;
          }
        });
      });

      // --- 6. RENDER EVERYTHING FROM BACK TO FRONT (Painters Sort) ---
      // Crucial: Depth represents Z axis. Higher Z values are further away from camera in our system
      primitivesList.sort((a, b) => b.depth - a.depth);

      primitivesList.forEach(prime => prime.draw());
    }

    // --- MASTER RENDER REVOLVER LOOP ---
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep, cinematic cosmic black space backing
      ctx.fillStyle = "rgba(3, 3, 8, 1)";
      ctx.fillRect(0, 0, width, height);

      // Capture scroll kinetics and velocity for responsive motion simulation
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;
      
      // Interpolate scroll parameters with rubber-band spring dampening
      scrollVelocity += (scrollDiff - scrollVelocity) * 0.12;
      scrollWobble += (scrollVelocity * 0.0028 - scrollWobble) * 0.085;
      
      smoothScrollY += (currentScrollY - smoothScrollY) * 0.085;
      lastScrollY = currentScrollY;

      // Slow down the wobble momentum progressively
      scrollVelocity *= 0.94;

      // Master timing loop parameters
      const time = Date.now() * 0.00045;

      // --- DYNAMIC BACKGROUND ISOMETRIC MESH ---
      ctx.strokeStyle = "rgba(45, 45, 80, 0.045)";
      ctx.lineWidth = 1;
      const gridSize = 75;
      const offsetY = -(smoothScrollY * 0.1) % gridSize;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = offsetY; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // --- DYNAMIC AMBIENT BACKLIGHTS ---
      const gradientBlue = ctx.createRadialGradient(
        width * 0.25,
        height * 0.35 + smoothScrollY * 0.05,
        0,
        width * 0.25,
        height * 0.35 + smoothScrollY * 0.05,
        height * 0.75
      );
      gradientBlue.addColorStop(0, "rgba(59, 130, 246, 0.05)");
      gradientBlue.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradientBlue;
      ctx.fillRect(0, 0, width, height);

      const gradientPurple = ctx.createRadialGradient(
        width * 0.82,
        height * 0.7 - smoothScrollY * 0.06,
        0,
        width * 0.82,
        height * 0.7 - smoothScrollY * 0.06,
        height * 0.8
      );
      gradientPurple.addColorStop(0, "rgba(139, 92, 246, 0.045)");
      gradientPurple.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradientPurple;
      ctx.fillRect(0, 0, width, height);

      // --- NEURAL NETWORK SYSTEM DOT LINKS ---
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (distance < 135) {
            const alpha = ((135 - distance) / 135) * 0.13;
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update(mouse.x, mouse.y);
        p.draw(ctx);
      });

      // --- RENDER CINEMATIC 3D PARALLAX GEOMETRIES ---
      const baseScale = Math.min(width, height);

      // Kinetic scroll wobble tilts variables
      // Scroll friction forces shapes to tilt instantly in the vector direction of scroll!
      const tiltX = scrollWobble * 3.5;
      const tiltY = scrollWobble * -1.8;

      // Object 1: Epic Tesseract Polyhedron (Aligned beautifully inside Hero Section)
      draw3DSolid(
        ctx,
        tesseractVertices,
        tesseractFaces,
        tesseractEdges,
        width * 0.78, // Right layout grid align
        height * 0.42, 
        baseScale * 0.125,
        time * 0.35 + tiltX,
        time * 0.45 + tiltY + smoothScrollY * 0.0014,
        time * 0.22,
        "rgba(59, 130, 246, 1)", // Electric Neon Blue lines
        "rgba(6, 182, 212, 1)",  // Teal-cyan core vertices
        0.30 // Moves at 30% of scroll speed (Parallax depth)
      );

      // Object 2: Geodesic Solid Icosahedron (Aligned next to About Biography section)
      draw3DSolid(
        ctx,
        icosaVertices,
        icosaFaces,
        icosaEdges,
        width * 0.16, // Left aligned
        height * 1.58, 
        baseScale * 0.12,
        time * -0.28 + tiltX * 1.2,
        time * 0.42 + tiltY + smoothScrollY * 0.0018,
        time * 0.18,
        "rgba(139, 92, 246, 1)", // Neon Purple edges
        "rgba(168, 85, 247, 1)",  // Orchid Indigo point lights
        0.45
      );

      // Object 3: Complex 3D Geodesic Octahedron Solid (Projects showreel center backing)
      draw3DSolid(
        ctx,
        octaVertices,
        octaFaces,
        octaEdges,
        width * 0.84, // Right aligned
        height * 2.85, 
        baseScale * 0.13,
        time * 0.48 + tiltX * 0.8,
        time * -0.32 + tiltY + smoothScrollY * -0.0015,
        time * -0.25,
        "rgba(6, 182, 212, 1)", // Cyan profiles
        "rgba(59, 130, 246, 1)",  // Royal Indigo vertex nodes
        0.55
      );

      // Object 4: Stellar Dual Glass Pyramidal Prism (Connect / Booking footer backdrop)
      draw3DSolid(
        ctx,
        octaVertices,
        octaFaces,
        octaEdges,
        width * 0.50, // Perfect viewport bottom center
        height * 5.25, 
        baseScale * 0.14,
        time * 0.32 + tiltX,
        time * -0.42 + tiltY + smoothScrollY * 0.0012,
        time * 0.55,
        "rgba(168, 85, 247, 1)", // Violet Orchids
        "rgba(139, 92, 246, 1)",  // Deep Electric Lilac
        0.62
      );

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      id="neon-particle-canvas"
      ref={canvasRef}
      className="fixed inset-0 -z-50 block h-full w-full bg-[#030308] pointer-events-none"
    />
  );
}
