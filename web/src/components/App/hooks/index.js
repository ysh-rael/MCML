import { useEffect } from "react";

export function useRequestImg({ RequestImg, setImgIndex, setImgs, Imgs, setUrlPrevImg }) {
    return useEffect(() => {
        if (!RequestImg) {
            console.log('requestImg is null')
            console.log(RequestImg)
            return;
        }

        const photos = RequestImg.photos ? RequestImg.photos : null
        if (!photos) {
            console.log('photos is null')
            console.log(RequestImg)
            return;
        }
        photos.forEach(esse => {
            setImgs(prev => [...prev, { src: esse.src.medium }])
        });
        if (Imgs.length === 1) setImgIndex(1)

        setUrlPrevImg(RequestImg.next_page)
    }, [RequestImg])
}

export function usePrevImg({ ImgIndex, Imgs, UrlPrevImg, OptionsRequestImg, setRequestImg }) {
    return useEffect(() => {
        if (Imgs.length - ImgIndex > 0) return;
        fetch(UrlPrevImg, OptionsRequestImg)
            .then(res => res.json())
            .then(res => setRequestImg(res))
            .catch(console.log)

    }, [ImgIndex])
}