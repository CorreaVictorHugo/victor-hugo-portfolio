import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function usePageMotion(scope: RefObject<HTMLElement | null>, key: string) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          gsap.from(element, {
            y: 100,
            scale: 0.85,
            opacity: 0,
            duration: 1.2,
            ease: 'back.out(1.4)',
            scrollTrigger: { trigger: element, start: 'top 85%', once: true },
          });
        });
        const mobile = window.matchMedia('(max-width: 768px)').matches;
        gsap.utils.toArray<HTMLElement>('[data-project-pop]').forEach((row) => {
          const cover = row.querySelector('.project-link > div:first-child');
          if (!cover) return;
          gsap.set(cover, { scale: 0.78, y: 90, rotationX: 14, opacity: 0.5, transformPerspective: 1100 });
          const pop = gsap.to(cover, {
            scale: mobile ? 1.10 : 1.16, y: mobile ? -12 : -22, rotationX: 0, opacity: 1,
            boxShadow: '0 42px 65px -18px rgba(20,20,20,0.42)',
            duration: 1, ease: 'back.out(1.2)', paused: true,
          });
          ScrollTrigger.create({
            trigger: row, start: 'top 75%', end: 'bottom 25%',
            onToggle: ({ isActive }) => {
              if (isActive) pop.timeScale(1).play();
              else pop.timeScale(1.7).reverse();
            },
          });
        });
        if (window.matchMedia('(min-width: 769px) and (pointer: fine)').matches) {
          gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
            gsap.fromTo(element, { y: 14 }, { y: -14, ease: 'none', scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 0.5 } });
          });
        }
      }, scope);
      return () => context.revert();
    });
    return () => media.revert();
  }, [scope, key]);
}
