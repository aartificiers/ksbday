import React, { useEffect, useRef, useState } from 'react';
import './birthday.scss';
import * as THREE from 'three';
import { NavLink } from 'react-router';
import { FaReplyAll } from 'react-icons/fa';
import { MdReplay } from 'react-icons/md';


const Birthday = () => {
  const [cakeClicked, setCakeClicked] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const cakeCanvasRef = useRef(null);
  const confettiCanvasRef = useRef(null);
  const instructionsRef = useRef(null);
  const scrollInstructionRef = useRef(null);
  const letterRef = useRef(null);
  const containerRef = useRef(null);

  let scene, camera, renderer, cake, candles = [], candleLights = [];

  useEffect(() => {
    initCake();
    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (renderer) renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (renderer) renderer.setSize(window.innerWidth, window.innerHeight);
      if (confettiCanvasRef.current) {
        confettiCanvasRef.current.width = window.innerWidth;
        confettiCanvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initCake = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    cakeCanvasRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const cakeGroup = new THREE.Group();

    const bottomCake = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 2, 32),
      new THREE.MeshPhongMaterial({ color: 0xffb6c1 })
    );
    cakeGroup.add(bottomCake);

    const middleCake = new THREE.Mesh(
      new THREE.CylinderGeometry(4, 4, 2, 32),
      new THREE.MeshPhongMaterial({ color: 0xffc0cb })
    );
    middleCake.position.y = 2;
    cakeGroup.add(middleCake);

    const topCake = new THREE.Mesh(
      new THREE.CylinderGeometry(3, 3, 2, 32),
      new THREE.MeshPhongMaterial({ color: 0xffcccb })
    );
    topCake.position.y = 4;
    cakeGroup.add(topCake);

    addFrosting(cakeGroup);
    addCandles(cakeGroup);

    scene.add(cakeGroup);
    cake = cakeGroup;
    camera.position.z = 15;
    camera.position.y = 5;

    animate();
  };

  const addFrosting = (cakeGroup) => {
    const add = (count, radius, y, size) => {
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const frostingMesh = new THREE.Mesh(
          new THREE.SphereGeometry(size, 8, 8),
          new THREE.MeshPhongMaterial({ color: 0xffffff })
        );
        frostingMesh.position.set(x, y, z);
        cakeGroup.add(frostingMesh);
      }
    };
    add(12, 5, 0.8, 0.5);
    add(10, 4, 2.8, 0.4);
    add(8, 3, 4.8, 0.3);
  };

  const addCandles = (cakeGroup) => {
    const positions = [
      { x: 0, y: 5.5, z: 0 },
      { x: 1.5, y: 5.5, z: 0 },
      { x: -1.5, y: 5.5, z: 0 },
      { x: 0, y: 5.5, z: 1.5 },
      { x: 0, y: 5.5, z: -1.5 }
    ];

    positions.forEach((pos, index) => {
      const candle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 1, 16),
        new THREE.MeshPhongMaterial({ color: 0xf5deb3 })
      );
      candle.position.set(pos.x, pos.y, pos.z);
      cakeGroup.add(candle);
      candles.push(candle);

      const light = new THREE.PointLight(0xffcc00, 1, 3);
      light.position.set(pos.x, pos.y + 0.7, pos.z);
      cakeGroup.add(light);
      candleLights.push(light);

      const flame = new THREE.Mesh(
        new THREE.ConeGeometry(0.15, 0.4, 16),
        new THREE.MeshPhongMaterial({
          color: 0xff9900,
          emissive: 0xff6600,
          transparent: true,
          opacity: 0.9
        })
      );
      flame.position.set(pos.x, pos.y + 0.7, pos.z);
      cakeGroup.add(flame);
      candles.push(flame);
    });
  };

  const animate = () => {
    requestAnimationFrame(animate);
    candles.forEach((obj, index) => {
      if (index % 2 === 1 && !cakeClicked) {
        obj.rotation.y += 0.05;
        obj.position.y += Math.sin(Date.now() * 0.01) * 0.001;
      }
    });
    if (cakeClicked) cake.rotation.y += 0.03;
    renderer.render(scene, camera);
  };

  const handleCakeClick = () => {
    if (!cakeClicked) {
      setCakeClicked(true);
      instructionsRef.current.style.display = "none";
      candles.forEach((obj, index) => {
        if (index % 2 === 1) obj.visible = false;
      });
      candleLights.forEach((light) => (light.intensity = 0));
      confettiCanvasRef.current.style.display = "block";
      createConfetti();
      setScrollEnabled(true);
      setTimeout(() => {
        scrollInstructionRef.current.style.display = "block";
      }, 1000);
    }
  };

  const createConfetti = () => {
    const canvas = confettiCanvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiCount = 200;
    const colors = ["#ff4081", "#ff9e80", "#ffff8d", "#b9f6ca", "#80d8ff", "#8c9eff", "#ea80fc"];
    const confetti = Array.from({ length: confettiCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 2 - canvas.height,
      size: Math.random() * 5 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 3 + 2,
      angle: Math.random() * 360,
      rotation: 0,
      rotationSpeed: Math.random() * 10 - 5
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let stillActive = false;
      confetti.forEach((c) => {
        if (c.y < canvas.height) {
          stillActive = true;
          ctx.save();
          ctx.translate(c.x, c.y);
          ctx.rotate((c.rotation * Math.PI) / 180);
          ctx.fillStyle = c.color;
          ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
          ctx.restore();
          c.y += c.speed;
          c.rotation += c.rotationSpeed;
        }
      });
      if (stillActive) requestAnimationFrame(draw);
      else canvas.style.display = "none";
    };
    draw();
  };

  const handleScroll = () => {
    const scrollTop = containerRef.current.scrollTop;
    // if (!scrollEnabled && scrollTop > 0) {
    //   containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    //   return;
    // }

    if (scrollTop > 100) {
      cakeCanvasRef.current.style.transform = "translate(-40%, 0) scale(0.5)";
      letterRef.current.style.right = "10%";
      scrollInstructionRef.current.style.display = "none";
    } else {
      cakeCanvasRef.current.style.transform = "translate(0, 0) scale(1)";
      letterRef.current.style.right = "-100%";
      if (cakeClicked) {
        scrollInstructionRef.current.style.display = "block";
      }
    }
  };

  return (
    <div className="scroll-container" ref={containerRef}>
      <div className="fixed-layer">
        <div className="cake-canvas" ref={cakeCanvasRef} />
        {!cakeClicked && (
          <div className="click-overlay" onClick={handleCakeClick} />
        )}
        <div className="instructions" ref={instructionsRef}>
          🎂 Make a wish and click to blow candles! 🎂
        </div>
        <div className="scroll-instruction" ref={scrollInstructionRef}>
          📜 Scroll Down! 📜
        </div>
        <canvas className="confetti-canvas" ref={confettiCanvasRef} />
      </div>

      <div className="birthday-content">
        <div className="spacer" />
        <div className="letter" ref={letterRef}>
          <h1>Happy Birthday!</h1>
          <p>Here's your special birthday message. 🎉🎈</p>
          <p>On this special day, I just want to remind you how incredibly grateful I am to have you in my life. You light up every room you walk into, and your smile still gives me butterflies.

            May this year bring you endless happiness, beautiful memories, and all the love your heart can hold. I’ll be right beside you — through every laugh, every challenge, and every dream we chase together.</p>
        </div>
        <NavLink to={"/"} >Replay <MdReplay/></NavLink>
        <div className="spacer" />
      </div>
    </div>
  );
};

export default Birthday;
