import { useEffect } from "react";

export function useContentCard({ src, setCard, iconLoading }) {
    useEffect(() => setCard(src ? <img className='img' src={src} alt='Img card' /> : iconLoading), [src]);
}
