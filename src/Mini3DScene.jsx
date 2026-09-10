import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const palette = {
  cyan: 0x47d9ff,
  blue: 0x5d83ff,
  warm: 0xffb866,
  green: 0x7de3ad,
  violet: 0xb18cff,
  red: 0xff8f8f,
}

function cube(width, height, depth, color, position, options = {}) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), new THREE.MeshStandardMaterial({ color, roughness: .6, metalness: .2, ...options }))
  mesh.position.set(...position)
  return mesh
}

function tag(color) {
  const group = new THREE.Group()
  const body = cube(.55, .07, .55, 0x061a29, [0, 0, 0], { emissive: color, emissiveIntensity: .25, metalness: .65 })
  const ring = new THREE.Mesh(new THREE.TorusGeometry(.17, .022, 8, 24), new THREE.MeshBasicMaterial({ color }))
  ring.rotation.x = Math.PI / 2
  group.add(body, ring)
  return group
}

function signal(color) {
  const group = new THREE.Group()
  for (let index = 0; index < 3; index += 1) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(.28 + index * .11, .012, 8, 28, Math.PI), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .7 - index * .16 }))
    ring.rotation.x = Math.PI / 2
    group.add(ring)
  }
  return group
}

function addFeatureObject(scene, variant, accent) {
  const room = new THREE.Group()
  scene.add(room)
  room.add(cube(5.8, .12, 4.2, 0x07141f, [0, -.1, 0]))
  room.add(cube(5.8, 3.4, .1, 0x102c3c, [0, 1.55, -1.8]))
  room.add(cube(.1, 3.4, 4.2, 0x0b202d, [-2.9, 1.55, 0]))
  const addWindow = (position, color) => room.add(cube(.92, .8, .04, color, position, { emissive: color, emissiveIntensity: .72 }))
  addWindow([1.45, 2.15, -1.73], variant === 'sleep' ? accent : palette.cyan)
  addWindow([.4, 2.15, -1.73], palette.warm)
  if (variant === 'sleep') {
    room.add(cube(2.2, .62, 1.1, 0x294452, [-.35, .43, .35], { roughness: .85 }))
    room.add(cube(2.2, .35, .15, 0xa6c4c8, [-.35, .8, -.15], { roughness: .9 }))
    room.add(cube(.42, .9, .42, palette.warm, [1.8, .45, .8], { emissive: palette.warm, emissiveIntensity: .6 }))
  } else if (variant === 'focus') {
    room.add(cube(2.35, .14, .9, 0x365769, [.35, 1.0, .45]))
    room.add(cube(.12, 1.25, .12, 0x52788a, [-.58, .42, .65]))
    room.add(cube(.9, .06, .62, palette.cyan, [.35, 1.14, .43], { emissive: palette.cyan, emissiveIntensity: .55 }))
    room.add(cube(.06, .6, .06, palette.warm, [.95, 1.35, .3], { emissive: palette.warm, emissiveIntensity: .7 }))
  } else if (variant === 'leave' || variant === 'presence' || variant === 'home') {
    room.add(cube(1.3, 2.0, .16, 0x0b2433, [1.65, 1.0, -1.66], { emissive: accent, emissiveIntensity: .2 }))
    room.add(cube(.48, .65, .05, palette.warm, [1.15, 1.45, -1.57], { emissive: palette.warm, emissiveIntensity: .8 }))
    room.add(cube(.48, .65, .05, palette.green, [1.95, 1.45, -1.57], { emissive: palette.green, emissiveIntensity: .8 }))
    if (variant === 'leave') {
      room.add(cube(1.72, .08, .18, accent, [1.65, 2.08, -1.5], { emissive: accent, emissiveIntensity: .6 }))
      room.add(cube(.65, .95, .04, 0x081520, [1.65, .72, -1.77], { emissive: palette.blue, emissiveIntensity: .3 }))
    }
  } else if (variant === 'office') {
    room.add(cube(2.3, .14, 1.05, 0x365769, [.3, 1.0, .35]))
    room.add(cube(.12, 1.25, .12, 0x52788a, [-.72, .42, .65]))
    room.add(cube(.82, .06, .58, palette.blue, [.2, 1.14, .3], { emissive: palette.blue, emissiveIntensity: .5 }))
    room.add(cube(.08, .95, .08, 0x869fa8, [1.18, .65, .15]))
    room.add(cube(.46, .35, .46, palette.warm, [1.18, 1.18, .15], { emissive: palette.warm, emissiveIntensity: .7 }))
  } else if (variant === 'board') {
    room.add(cube(2.2, 1.35, .12, 0x142d3a, [0, 1.35, -1.66]))
    ;[[-.55, palette.warm], [0, palette.red], [.55, palette.cyan]].forEach(([x, color]) => room.add(cube(.42, .35, .04, color, [x, 1.45, -1.56], { emissive: color, emissiveIntensity: .55 })))
  } else if (variant === 'vault') {
    const lock = new THREE.Mesh(new THREE.TorusGeometry(.7, .13, 10, 32, Math.PI * 1.65), new THREE.MeshStandardMaterial({ color: accent, emissive: accent, emissiveIntensity: .5, metalness: .7 }))
    lock.position.set(.3, 1.25, -1.45)
    lock.rotation.z = Math.PI
    room.add(lock, cube(.7, .75, .12, 0x102d44, [.3, .95, -1.5], { emissive: palette.blue, emissiveIntensity: .35 }))
  } else if (variant === 'smart') {
    room.add(cube(1.9, .75, 1.25, 0x3b5b62, [.7, .42, .35]))
    room.add(cube(.14, 1.1, .14, 0x7e948d, [-.8, .58, .2]))
    room.add(cube(.45, .36, .45, palette.warm, [-.8, 1.18, .2], { emissive: palette.warm, emissiveIntensity: .75 }))
  } else if (variant === 'family' || variant === 'universal') {
    const colors = variant === 'family' ? [palette.cyan, palette.violet, palette.warm] : [palette.cyan, palette.warm]
    colors.forEach((color, index) => { const node = new THREE.Mesh(new THREE.SphereGeometry(.23, 12, 12), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: .75 })); node.position.set(-.7 + index * .7, 1.15 + (index % 2) * .24, -.8); room.add(node) })
  } else {
    room.add(cube(1.4, .12, .9, palette.cyan, [0, .55, .25], { emissive: palette.cyan, emissiveIntensity: .5 }))
  }
  return room
}

export default function Mini3DScene({ variant = 'focus' }) {
  const mountRef = useRef(null)
  useEffect(() => {
    const mount = mountRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, mount.clientWidth / mount.clientHeight, .1, 50)
    camera.position.set(4.5, 3.25, 5.8)
    camera.lookAt(0, 1, 0)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)
    scene.add(new THREE.HemisphereLight(0x9edaff, 0x06101a, 1.35))
    const light = new THREE.PointLight(palette.warm, 3.8, 7, 2)
    light.position.set(-1, 3, 2)
    scene.add(light)
    const accent = variant === 'vault' ? palette.violet : variant === 'family' ? palette.violet : variant === 'smart' ? palette.green : variant === 'presence' ? palette.green : palette.cyan
    const room = addFeatureObject(scene, variant, accent)
    const tagObject = tag(accent)
    tagObject.position.set(-1.8, .2, 1.1)
    tagObject.rotation.x = -.25
    scene.add(tagObject)
    const tagSignal = signal(accent)
    tagSignal.position.set(-1.8, .22, 1.1)
    scene.add(tagSignal)
    const phone = new THREE.Group()
    phone.position.set(1.35, 1.22, 1.28)
    phone.rotation.set(-.12, -.28, .1)
    phone.add(cube(.72, 1.48, .12, 0x17364b, [0, 0, 0], { metalness: .75, roughness: .22 }))
    phone.add(cube(.58, 1.12, .02, 0x082239, [0, .02, .08], { emissive: palette.blue, emissiveIntensity: .42 }))
    phone.add(new THREE.Mesh(new THREE.CircleGeometry(.13, 16), new THREE.MeshBasicMaterial({ color: accent })))
    phone.children[2].position.set(0, .23, .11)
    scene.add(phone)
    const path = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1.55, .35, 1.1), new THREE.Vector3(-.25, .8, 1.5), new THREE.Vector3(1.15, 1.2, 1.25)]), new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: .8 }))
    scene.add(path)
    const pointer = { x: 0 }
    const onPointerMove = (event) => { const rect = mount.getBoundingClientRect(); pointer.x = ((event.clientX - rect.left) / rect.width - .5) * 2 }
    mount.addEventListener('pointermove', onPointerMove)
    let frame = 0
    let visible = true
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { threshold: .05 })
    observer.observe(mount)
    const animate = (time) => {
      frame = requestAnimationFrame(animate)
      if (!visible) return
      const seconds = time * .001
      room.rotation.y += ((pointer.x * .08) - room.rotation.y) * .03
      if (!reducedMotion) {
        phone.position.x = 1.35 + Math.sin(seconds * .7) * .1
        phone.position.y = 1.22 + Math.sin(seconds * 1.1) * .05
        tagObject.rotation.z = Math.sin(seconds * 1.5) * .12
        tagSignal.scale.setScalar(.76 + Math.sin(seconds * 1.7) * .17)
        path.material.opacity = .4 + Math.sin(seconds * 1.4) * .25
      }
      renderer.render(scene, camera)
    }
    const resize = () => { camera.aspect = mount.clientWidth / mount.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(mount.clientWidth, mount.clientHeight) }
    window.addEventListener('resize', resize)
    animate(0)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); mount.removeEventListener('pointermove', onPointerMove); window.removeEventListener('resize', resize); renderer.dispose(); mount.removeChild(renderer.domElement) }
  }, [variant])
  return <div className={`mini-3d mini-3d-${variant}`} ref={mountRef} aria-label={`Animated 3D ${variant} NFC concept`} />
}
