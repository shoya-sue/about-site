'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { EffectComposer, RenderPass, EffectPass, BloomEffect } from 'postprocessing'
import { 
  getTextPositions, 
  getRandomPositions, 
  lerpParticlePosition,
  getTimeBasedColor,
  getSkillIconPositions,
  getExplodedPositions
} from '@/utils/particleUtils'

interface Phase {
  name: string
  duration: number
  particleCount: number
}

const PHASES: Phase[] = [
  { name: 'intro', duration: 5, particleCount: 15000 },
  { name: 'selfIntro', duration: 5, particleCount: 20000 },
  { name: 'skills', duration: 5, particleCount: 25000 },
  { name: 'projects', duration: 5, particleCount: 30000 },
  { name: 'contact', duration: 5, particleCount: 25000 },
  { name: 'outro', duration: 5, particleCount: 15000 }
]

export default function ParticleScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const composerRef = useRef<EffectComposer | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const frameRef = useRef<number>(0)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [currentPhase, setCurrentPhase] = useState(0)

  useEffect(() => {
    if (!mountRef.current) return

    // シーンのセットアップ（ダークブルーの背景）
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x001122)
    scene.fog = new THREE.Fog(0x001122, 50, 150)
    sceneRef.current = scene

    // カメラのセットアップ
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 50
    cameraRef.current = camera

    // レンダラーのセットアップ
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // ポストプロセッシング
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    
    const bloomEffect = new BloomEffect({
      intensity: 2.5,
      luminanceThreshold: 0.1,
      luminanceSmoothing: 0.025,
      mipmapBlur: true
    })
    composer.addPass(new EffectPass(camera, bloomEffect))
    composerRef.current = composer

    // パーティクルシステムの作成
    const maxParticleCount = 50000
    const positions = new Float32Array(maxParticleCount * 3)
    const colors = new Float32Array(maxParticleCount * 3)
    const sizes = new Float32Array(maxParticleCount)
    const targetPositions = new Float32Array(maxParticleCount * 3)

    // 初期位置
    const initialPositions = getRandomPositions(maxParticleCount)
    for (let i = 0; i < maxParticleCount; i++) {
      positions[i * 3] = initialPositions[i].x
      positions[i * 3 + 1] = initialPositions[i].y
      positions[i * 3 + 2] = initialPositions[i].z

      targetPositions[i * 3] = positions[i * 3]
      targetPositions[i * 3 + 1] = positions[i * 3 + 1]
      targetPositions[i * 3 + 2] = positions[i * 3 + 2]

      // 青・緑・紫のグラデーション
      const colorChoice = Math.random()
      if (colorChoice < 0.33) {
        // 青系
        colors[i * 3] = 0.1 + Math.random() * 0.2
        colors[i * 3 + 1] = 0.3 + Math.random() * 0.2
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2
      } else if (colorChoice < 0.66) {
        // 緑系
        colors[i * 3] = 0.1 + Math.random() * 0.2
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.3
        colors[i * 3 + 2] = 0.2 + Math.random() * 0.2
      } else {
        // 紫系
        colors[i * 3] = 0.5 + Math.random() * 0.3
        colors[i * 3 + 1] = 0.1 + Math.random() * 0.2
        colors[i * 3 + 2] = 0.7 + Math.random() * 0.3
      }

      sizes[i] = Math.random() * 0.5 + 0.1
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute('targetPosition', new THREE.BufferAttribute(targetPositions, 3))

    // シェーダーマテリアル
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uProgress: { value: 0 },
        uPhase: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 targetPosition;
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uProgress;
        varying vec3 vColor;

        void main() {
          vColor = color;
          
          vec3 pos = mix(position, targetPosition, uProgress);
          
          // 揺らぎを追加
          pos.x += sin(uTime + position.y * 0.1) * 0.1;
          pos.y += cos(uTime + position.x * 0.1) * 0.1;
          pos.z += sin(uTime + position.z * 0.1) * 0.1;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * 300.0 * uPixelRatio / -mvPosition.z;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        uniform float uTime;

        void main() {
          float dist = distance(gl_PointCoord, vec2(0.5));
          float strength = 1.0 - smoothstep(0.0, 0.5, dist);
          
          // パルス効果
          float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
          
          vec3 finalColor = vColor * strength * (1.5 + pulse * 0.5);
          gl_FragColor = vec4(finalColor, strength);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    particlesRef.current = particles

    // GSAPタイムラインの設定
    const timeline = gsap.timeline({ repeat: -1 })
    timelineRef.current = timeline

    // フェーズ1: イントロ（SHO43の形成）- 0-5秒
    timeline.to(material.uniforms.uProgress, {
      value: 1,
      duration: 3,
      ease: "power2.inOut",
      onStart: () => {
        const textPositions = getTextPositions('SHO43', 12)
        const posAttr = geometry.getAttribute('targetPosition') as THREE.BufferAttribute
        
        for (let i = 0; i < Math.min(textPositions.length, maxParticleCount); i++) {
          posAttr.setXYZ(i, textPositions[i].x, textPositions[i].y, textPositions[i].z)
        }
        posAttr.needsUpdate = true
        setCurrentPhase(0)
      }
    })
    .to({}, { duration: 2 }) // 文字を保持

    // フェーズ2: 自己紹介テキスト - 5-10秒
    .to(material.uniforms.uProgress, {
      value: 0,
      duration: 1,
      ease: "power2.in"
    })
    .to(material.uniforms.uProgress, {
      value: 1,
      duration: 3,
      ease: "power2.out",
      onStart: () => {
        const introText = 'Blockchain Developer'
        const textPositions = getTextPositions(introText, 5)
        const posAttr = geometry.getAttribute('targetPosition') as THREE.BufferAttribute
        
        // 複数行のテキスト配置
        const lines = ['Blockchain Developer', 'Solana Expert', 'Community Manager']
        let totalIndex = 0
        
        lines.forEach((line, lineIndex) => {
          const linePositions = getTextPositions(line, 5)
          linePositions.forEach((pos, i) => {
            if (totalIndex < maxParticleCount) {
              posAttr.setXYZ(
                totalIndex,
                pos.x,
                pos.y - lineIndex * 8,
                pos.z
              )
              totalIndex++
            }
          })
        })
        
        posAttr.needsUpdate = true
        setCurrentPhase(1)
      }
    })
    .to({}, { duration: 1 })

    // フェーズ3: スキル表示 - 10-15秒
    .to(material.uniforms.uProgress, {
      value: 0,
      duration: 0.5,
      ease: "power2.in"
    })
    .to(material.uniforms.uProgress, {
      value: 1,
      duration: 3,
      ease: "elastic.out(1, 0.5)",
      onStart: () => {
        const skills = ['Solana', 'React', 'Three.js', 'Web3', 'TypeScript']
        const posAttr = geometry.getAttribute('targetPosition') as THREE.BufferAttribute
        let particleIndex = 0
        
        skills.forEach((skill, skillIndex) => {
          const angle = (skillIndex / skills.length) * Math.PI * 2
          const radius = 20
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          
          const iconPositions = getSkillIconPositions(skill)
          iconPositions.forEach((pos) => {
            if (particleIndex < maxParticleCount) {
              posAttr.setXYZ(
                particleIndex,
                pos.x + x,
                pos.y + y,
                pos.z
              )
              particleIndex++
            }
          })
        })
        
        posAttr.needsUpdate = true
        setCurrentPhase(2)
      }
    })
    .to({}, { duration: 1.5 })

    // フェーズ4: プロジェクト展示 - 15-20秒
    .to(material.uniforms.uProgress, {
      value: 0,
      duration: 0.5,
      ease: "power2.in"
    })
    .to(material.uniforms.uProgress, {
      value: 1,
      duration: 3,
      ease: "expo.out",
      onStart: () => {
        const projects = ['SCANNNER BCG', 'Web3 Projects', 'Community Building']
        const posAttr = geometry.getAttribute('targetPosition') as THREE.BufferAttribute
        let particleIndex = 0
        
        projects.forEach((project, index) => {
          const z = -index * 15
          const textPositions = getTextPositions(project, 6)
          
          textPositions.forEach((pos) => {
            if (particleIndex < maxParticleCount) {
              posAttr.setXYZ(
                particleIndex,
                pos.x,
                pos.y,
                pos.z + z
              )
              particleIndex++
            }
          })
        })
        
        posAttr.needsUpdate = true
        setCurrentPhase(3)
      }
    })
    .to({}, { duration: 1.5 })

    // フェーズ5: コンタクト情報 - 20-25秒
    .to(material.uniforms.uProgress, {
      value: 0,
      duration: 0.5,
      ease: "power2.in"
    })
    .to(material.uniforms.uProgress, {
      value: 1,
      duration: 2,
      ease: "power2.out",
      onStart: () => {
        const contactInfo = 'CONTACT ME'
        const textPositions = getTextPositions(contactInfo, 10)
        const posAttr = geometry.getAttribute('targetPosition') as THREE.BufferAttribute
        
        // グリッチエフェクト風の配置
        textPositions.forEach((pos, i) => {
          if (i < maxParticleCount) {
            const glitchOffset = Math.random() * 2 - 1
            posAttr.setXYZ(
              i,
              pos.x + glitchOffset,
              pos.y,
              pos.z + glitchOffset
            )
          }
        })
        
        posAttr.needsUpdate = true
        setCurrentPhase(4)
        
        // グリッチアニメーション
        gsap.to(material.uniforms, {
          uPhase: 1,
          duration: 2,
          ease: "steps(10)",
          yoyo: true,
          repeat: 1
        })
      }
    })
    .to({}, { duration: 1 })

    // フェーズ6: アウトロ（粒子の爆発）- 25-30秒
    .to(material.uniforms.uProgress, {
      value: 0,
      duration: 3,
      ease: "power2.in",
      onStart: () => {
        const posAttr = geometry.getAttribute('targetPosition') as THREE.BufferAttribute
        const currentPositions = []
        
        // 現在の位置を保存
        for (let i = 0; i < maxParticleCount; i++) {
          currentPositions.push({
            x: posAttr.getX(i),
            y: posAttr.getY(i),
            z: posAttr.getZ(i)
          })
        }
        
        // 爆発位置を設定
        const explodedPositions = getExplodedPositions(currentPositions)
        explodedPositions.forEach((pos, i) => {
          if (i < maxParticleCount) {
            posAttr.setXYZ(i, pos.x, pos.y, pos.z)
          }
        })
        
        posAttr.needsUpdate = true
        setCurrentPhase(5)
      },
      onComplete: () => {
        // 初期位置にリセット
        const posAttr = geometry.getAttribute('targetPosition') as THREE.BufferAttribute
        const initialPositions = getRandomPositions(maxParticleCount)
        
        for (let i = 0; i < maxParticleCount; i++) {
          posAttr.setXYZ(i, initialPositions[i].x, initialPositions[i].y, initialPositions[i].z)
        }
        posAttr.needsUpdate = true
      }
    })
    .to({}, { duration: 2 })

    // アニメーションループ
    const clock = new THREE.Clock()
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()
      material.uniforms.uTime.value = elapsedTime

      // 時間に基づく色の変化
      const timeColor = getTimeBasedColor(elapsedTime)
      const colorAttr = geometry.getAttribute('color') as THREE.BufferAttribute
      
      for (let i = 0; i < 1000; i++) {
        const idx = Math.floor(Math.random() * maxParticleCount)
        colorAttr.setXYZ(idx, timeColor.r, timeColor.g, timeColor.b)
      }
      colorAttr.needsUpdate = true

      // カメラの動き
      camera.position.x = Math.sin(elapsedTime * 0.1) * 5
      camera.position.y = Math.cos(elapsedTime * 0.1) * 5
      camera.lookAt(0, 0, 0)

      composer.render()
    }

    animate()

    // リサイズハンドラー
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
      composer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', handleResize)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      composer.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 w-full h-full"
      style={{ touchAction: 'none' }}
    />
  )
}