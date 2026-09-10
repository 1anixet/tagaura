import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const cyan = 0x42d9ff
const blue = 0x2f72ff
const warm = 0xffb65c

function box(width, height, depth, color, x, y, z, material = {}) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), new THREE.MeshStandardMaterial({ color, roughness: .56, metalness: .25, ...material }))
  mesh.position.set(x, y, z)
  return mesh
}

function createTag(color, scale = 1) {
  const group = new THREE.Group()
  const plate = new THREE.Mesh(new THREE.BoxGeometry(.62 * scale, .08 * scale, .62 * scale), new THREE.MeshStandardMaterial({ color: 0x071e31, emissive: color, emissiveIntensity: .22, metalness: .55, roughness: .3 }))
  const ring = new THREE.Mesh(new THREE.TorusGeometry(.19 * scale, .025 * scale, 10, 32), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .9 }))
  ring.rotation.x = Math.PI / 2
  group.add(plate, ring)
  return group
}

function createSignal(color) {
  const group = new THREE.Group()
  for (let index = 0; index < 3; index += 1) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(.36 + index * .13, .012, 8, 40, Math.PI), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .8 - index * .18 }))
    ring.rotation.set(Math.PI / 2, 0, 0)
    group.add(ring)
  }
  return group
}

export default function ThreeHeroScene() {
  const mountRef = useRef(null)
  useEffect(() => {
    const mount = mountRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(29, mount.clientWidth / mount.clientHeight, .1, 100)
    camera.position.set(8.4, 6.3, 10.8)
    camera.lookAt(0, 1.25, 0)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    mount.appendChild(renderer.domElement)

    scene.add(new THREE.HemisphereLight(0x8ac8ff, 0x06101a, 1.2))
    const key = new THREE.DirectionalLight(0xb7e7ff, 2.4)
    key.position.set(4, 9, 5)
    key.castShadow = true
    scene.add(key)
    const warmLight = new THREE.PointLight(warm, 5.5, 7, 2)
    warmLight.position.set(-1.2, 2.2, 1.3)
    scene.add(warmLight)
    const cyanLight = new THREE.PointLight(cyan, 4.2, 8, 2)
    cyanLight.position.set(2.8, .7, 2.5)
    scene.add(cyanLight)

    const world = new THREE.Group()
    world.rotation.y = -.25
    scene.add(world)

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(13, 9), new THREE.MeshStandardMaterial({ color: 0x06131d, roughness: .85, metalness: .1, transparent: true, opacity: .92 }))
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -.02
    ground.receiveShadow = true
    world.add(ground)
    const grid = new THREE.GridHelper(12, 18, 0x1a506b, 0x0b2637)
    grid.position.y = .01
    grid.material.transparent = true
    grid.material.opacity = .3
    world.add(grid)

    const house = new THREE.Group()
    house.position.set(-.1, 0, -.05)
    house.rotation.y = -.1
    world.add(house)
    const lower = box(5.3, 2.05, 3.1, 0x102b3a, 0, 1.05, 0)
    const upper = box(3.65, 1.65, 2.75, 0x183a49, .55, 2.9, -.1)
    lower.castShadow = true; upper.castShadow = true
    house.add(lower, upper)
    const roof = new THREE.Mesh(new THREE.ConeGeometry(2.8, 1.35, 4), new THREE.MeshStandardMaterial({ color: 0x0c202d, roughness: .75, metalness: .15 }))
    roof.rotation.y = Math.PI / 4
    roof.scale.set(1.23, 1, .78)
    roof.position.set(.45, 4.35, -.1)
    house.add(roof)

    const windows = []
    const addWindow = (x, y, z, width, height, color) => {
      const window = box(width, height, .06, color, x, y, z, { emissive: color, emissiveIntensity: .8, roughness: .2 })
      windows.push(window)
      house.add(window)
    }
    addWindow(-1.58, 1.25, 1.58, .88, .78, warm)
    addWindow(.15, 1.25, 1.58, 1.15, .78, 0x37b8ed)
    addWindow(1.45, 3.05, 1.3, .8, .78, warm)
    addWindow(-.05, 3.05, 1.3, .82, .78, 0x4bc9f5)
    const door = box(.58, 1.35, .08, 0x071a29, 1.95, .7, 1.59, { emissive: blue, emissiveIntensity: .35 })
    house.add(door)

    const tagPoints = [
      { position: new THREE.Vector3(-2.7, .16, 1.9), color: cyan, scale: .9 },
      { position: new THREE.Vector3(2.75, .2, 1.4), color: blue, scale: .75 },
      { position: new THREE.Vector3(2.65, 2.1, 1.15), color: warm, scale: .72 },
    ]
    const tags = tagPoints.map(({ position, color, scale }) => {
      const tag = createTag(color, scale)
      tag.position.copy(position)
      tag.rotation.x = -.18
      world.add(tag)
      const signal = createSignal(color)
      signal.position.copy(position)
      signal.position.y += .05
      signal.rotation.z = -.12
      world.add(signal)
      return { tag, signal }
    })

    const phone = new THREE.Group()
    phone.position.set(3.15, 1.85, 2.1)
    phone.rotation.set(-.17, -.42, .12)
    const phoneBody = box(1.1, 2.2, .18, 0x132b3d, 0, 0, 0, { metalness: .8, roughness: .22 })
    const screen = box(.9, 1.72, .02, 0x071a2b, 0, .02, .11, { emissive: 0x1c7db2, emissiveIntensity: .45, roughness: .18 })
    const screenCore = new THREE.Mesh(new THREE.CircleGeometry(.22, 24), new THREE.MeshBasicMaterial({ color: cyan, transparent: true, opacity: .75 }))
    screenCore.position.set(0, .32, .135)
    phone.add(phoneBody, screen, screenCore)
    world.add(phone)
    const phoneSignal = createSignal(cyan)
    phoneSignal.scale.setScalar(.8)
    phoneSignal.position.set(2.75, 1.75, 1.85)
    phoneSignal.rotation.set(Math.PI / 2, 0, -.4)
    world.add(phoneSignal)

    const pathMaterial = new THREE.LineBasicMaterial({ color: cyan, transparent: true, opacity: .72 })
    const paths = [
      [[-2.7, .25, 1.9], [0, 1.4, 1.7], [2.7, 1.8, 2.0]],
      [[2.75, .25, 1.4], [1.3, 1.4, 1.65], [2.75, 1.8, 2.0]],
    ].map((points) => {
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(([x, y, z]) => new THREE.Vector3(x, y, z))), pathMaterial)
      world.add(line)
      return line
    })

    const particleGeometry = new THREE.SphereGeometry(.035, 8, 8)
    const particles = Array.from({ length: 14 }, (_, index) => {
      const particle = new THREE.Mesh(particleGeometry, new THREE.MeshBasicMaterial({ color: index % 3 ? cyan : warm }))
      world.add(particle)
      return particle
    })
    const pointer = { x: 0, y: 0 }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const onPointerMove = (event) => {
      const rect = mount.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width - .5) * 2
      pointer.y = ((event.clientY - rect.top) / rect.height - .5) * 2
    }
    mount.addEventListener('pointermove', onPointerMove)
    let frame = 0
    let visible = true
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { threshold: .05 })
    observer.observe(mount)
    const animate = (time) => {
      frame = requestAnimationFrame(animate)
      if (!visible) return
      const seconds = time * .001
      world.rotation.y += ((pointer.x * .08 - .25) - world.rotation.y) * .025
      world.rotation.x += ((pointer.y * -.025) - world.rotation.x) * .025
      if (!reducedMotion) {
        house.position.y = Math.sin(seconds * .55) * .035
        phone.position.y = 1.85 + Math.sin(seconds * .9) * .12
        tags.forEach(({ tag, signal }, index) => { tag.rotation.z = Math.sin(seconds * 1.2 + index) * .12; signal.scale.setScalar(.82 + Math.sin(seconds * 1.6 + index) * .16) })
        windows.forEach((window, index) => { window.material.emissiveIntensity = .62 + Math.sin(seconds * 1.1 + index) * .22 })
        paths.forEach((path, index) => { path.material.opacity = .42 + Math.sin(seconds * 1.5 + index) * .22 })
        particles.forEach((particle, index) => {
          const progress = (seconds * .18 + index / particles.length) % 1
          particle.position.lerpVectors(new THREE.Vector3(-2.7, .25, 1.9), new THREE.Vector3(2.7, 1.8, 2), progress)
          particle.position.y += Math.sin(progress * Math.PI) * .3
        })
      }
      renderer.render(scene, camera)
    }
    const resize = () => { camera.aspect = mount.clientWidth / mount.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(mount.clientWidth, mount.clientHeight) }
    window.addEventListener('resize', resize)
    animate(0)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); mount.removeEventListener('pointermove', onPointerMove); window.removeEventListener('resize', resize); renderer.dispose(); mount.removeChild(renderer.domElement) }
  }, [])
  return <div ref={mountRef} className="three-hero" aria-label="Animated 3D NFC Home concept scene" />
}
