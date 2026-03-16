'use client'

import { useEffect, useRef } from 'react'

export default function CursorEffect() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -200, y: -200 })
  const ringPos = useRef({ x: -200, y: -200 })
  const raf = useRef<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element
      const interactive = target.closest('a, button, [role="button"], input, textarea, label, select')
      const isImage = target.closest('img')
      if (interactive) {
        dot.classList.add('is-hovering')
        ring.classList.add('is-hovering')
        ring.classList.remove('is-image')
      } else if (isImage) {
        ring.classList.add('is-image')
        dot.classList.remove('is-hovering')
        ring.classList.remove('is-hovering')
      } else {
        dot.classList.remove('is-hovering')
        ring.classList.remove('is-hovering', 'is-image')
      }
    }

    const onLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const onEnter = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    const loop = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.1
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.1
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
      raf.current = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    raf.current = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  )
}
