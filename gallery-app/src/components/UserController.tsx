'use client'

import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function PlayerController() {
    const { camera, gl } = useThree()

    // кути огляду
    const yaw = useRef(0)    // навколо Y (ліво/право)
    const pitch = useRef(0)  // навколо X (вгору/вниз)
    const dragging = useRef(false)
    const last = useRef<{ x: number; y: number } | null>(null)

    const SENS = 0.003
    const PITCH_LIMIT = Math.PI / 2 - 0.001 // щоб не "вивертало"

    useEffect(() => {
        const el = gl.domElement

        const onMouseDown = (e: MouseEvent) => {
            dragging.current = true
            last.current = { x: e.clientX, y: e.clientY }
            el.style.cursor = 'grabbing'
        }

        const onMouseMove = (e: MouseEvent) => {
            if (!dragging.current || !last.current) return
            const dx = e.clientX - last.current.x
            const dy = e.clientY - last.current.y
            yaw.current -= dx * SENS
            pitch.current -= dy * SENS
            // кламп по вертикалі
            if (pitch.current > PITCH_LIMIT) pitch.current = PITCH_LIMIT
            if (pitch.current < -PITCH_LIMIT) pitch.current = -PITCH_LIMIT
            last.current = { x: e.clientX, y: e.clientY }
        }

        const onMouseUp = () => {
            dragging.current = false
            last.current = null
            el.style.cursor = 'grab'
        }

        const onContext = (e: MouseEvent) => e.preventDefault() // без контекст-меню

        // touch-підтримка
        // 


        el.addEventListener('mousedown', onMouseDown)
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
        el.addEventListener('contextmenu', onContext)

        // el.addEventListener('touchstart', onTouchStart, { passive: true })
        // el.addEventListener('touchmove', onTouchMove, { passive: true })
        // el.addEventListener('touchend', onTouchEnd)

        el.style.cursor = 'grab'

        return () => {
            el.removeEventListener('mousedown', onMouseDown)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
            el.removeEventListener('contextmenu', onContext)
            // el.removeEventListener('touchstart', onTouchStart)
            // el.removeEventListener('touchmove', onTouchMove)
            // el.removeEventListener('touchend', onTouchEnd)
        }
    }, [gl])

    useFrame(() => {
        const euler = new THREE.Euler(pitch.current, yaw.current, 0, 'YXZ')
        camera.quaternion.setFromEuler(euler)
        // якщо треба фіксована висота:
        // camera.position.y = 1.6
    })

    return null
}
