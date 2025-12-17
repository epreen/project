// oc/rose/animations.ts
import gsap from "gsap"

export function initRoseAmbient() {
  gsap.to(".rose-shell", {
    backgroundPosition: "200% 200%",
    duration: 20,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  })
}