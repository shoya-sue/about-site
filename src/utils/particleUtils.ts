import * as THREE from 'three'

export interface ParticlePosition {
  x: number
  y: number
  z: number
}

// 文字を形成するための座標を生成
export function getTextPositions(text: string, fontSize: number = 10): ParticlePosition[] {
  const positions: ParticlePosition[] = []
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!
  
  canvas.width = 512
  canvas.height = 128
  
  context.fillStyle = '#000000'
  context.fillRect(0, 0, canvas.width, canvas.height)
  
  // より読みやすいフォント設定
  context.font = `bold ${fontSize * 12}px "Helvetica Neue", Arial, sans-serif`
  context.fillStyle = '#FFFFFF'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(text, canvas.width / 2, canvas.height / 2)
  
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data
  
  // サンプリング密度
  const sampling = 2
  
  for (let y = 0; y < canvas.height; y += sampling) {
    for (let x = 0; x < canvas.width; x += sampling) {
      const index = (y * canvas.width + x) * 4
      const brightness = data[index]
      
      if (brightness > 128) {
        positions.push({
          x: (x - canvas.width / 2) * 0.15, // スケールを大きく
          y: (canvas.height / 2 - y) * 0.15,
          z: (Math.random() - 0.5) * 2
        })
      }
    }
  }
  
  return positions
}

// パーティクルの位置を補間
export function lerpParticlePosition(
  current: ParticlePosition,
  target: ParticlePosition,
  factor: number
): ParticlePosition {
  return {
    x: current.x + (target.x - current.x) * factor,
    y: current.y + (target.y - current.y) * factor,
    z: current.z + (target.z - current.z) * factor
  }
}

// ランダムな初期位置を生成
export function getRandomPositions(count: number, spread: number = 100): ParticlePosition[] {
  const positions: ParticlePosition[] = []
  
  for (let i = 0; i < count; i++) {
    positions.push({
      x: (Math.random() - 0.5) * spread,
      y: (Math.random() - 0.5) * spread,
      z: (Math.random() - 0.5) * spread
    })
  }
  
  return positions
}

// 爆発エフェクト用の位置を計算
export function getExplodedPositions(
  basePositions: ParticlePosition[],
  explosionForce: number = 50
): ParticlePosition[] {
  return basePositions.map(pos => {
    const angle = Math.random() * Math.PI * 2
    const force = Math.random() * explosionForce
    
    return {
      x: pos.x + Math.cos(angle) * force,
      y: pos.y + Math.sin(angle) * force,
      z: pos.z + (Math.random() - 0.5) * force
    }
  })
}

// スキルアイコンの形状を生成
export function getSkillIconPositions(skillName: string): ParticlePosition[] {
  const positions: ParticlePosition[] = []
  const radius = 5
  const segments = 32
  
  // 円形のアウトライン
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    positions.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      z: 0
    })
  }
  
  // 中心に向かう線
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2
    for (let j = 0; j < 10; j++) {
      const r = (j / 10) * radius
      positions.push({
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        z: 0
      })
    }
  }
  
  return positions
}

// 色の補間
export function lerpColor(color1: THREE.Color, color2: THREE.Color, factor: number): THREE.Color {
  return new THREE.Color().lerpColors(color1, color2, factor)
}

// 時間に基づく色の変化（青・緑・紫のパレット）
export function getTimeBasedColor(time: number): THREE.Color {
  const colors = [
    new THREE.Color(0x0080ff), // 明るい青
    new THREE.Color(0x00ff80), // 明るい緑
    new THREE.Color(0x8000ff), // 明るい紫
    new THREE.Color(0x00ffff), // シアン
    new THREE.Color(0x80ff00), // ライムグリーン
    new THREE.Color(0xff00ff)  // マゼンタ
  ]
  
  const phase = (time * 0.1) % colors.length
  const index = Math.floor(phase)
  const nextIndex = (index + 1) % colors.length
  const factor = phase - index
  
  return lerpColor(colors[index], colors[nextIndex], factor)
}