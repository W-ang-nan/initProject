import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
interface OptionsType {
    distance?: number | string;
    direction?: 'x' | 'y';
}
let tl = gsap.timeline({ duration: 0.2 });
export const gsapTimeline = (Element: string[], Options: OptionsType = { distance: 200, direction: "x" }) => {
    const animation = {
        x: Options.direction === 'x' ? Options.distance : 0,
        y: Options.direction === 'y' ? Options.distance : 0,
        opacity: 0,
        stagger: 0.1,
    }
    Element.forEach((item: string) => {
        tl.from(item, animation);
    })
    // if (Options.direction === "x") {
    //     Element.forEach((item: string) => {
    //         tl.from(item, { x: Options.distance, opacity: 0, stagger: .1 });
    //     })
    // } else {
    //     Element.forEach((item: string) => {
    //         tl.from(item, { y: Options.distance, opacity: 0, stagger: .1 });
    //     })
    // }
}

export const gsapText = (Element: string, Text: string, Time: number) => {
    gsap.registerPlugin(TextPlugin);
    gsap.to(Element, {
        duration: Time, // 动画持续时间
        text: Text
    })
}

export const gsapShow = (Element: string, Time: number) => {
    gsap.from(Element, {
        duration: Time,
        autoAlpha: 0,
        opacity: 0,
        scale: 0,
    })
}