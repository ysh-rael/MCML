import { useEffect } from "react";
import { generatorTag } from "../generatorTag";
import { findChild } from "../../../utils/findChild";

export const useInitComponent = ({ setLbl, label, id, setId, stop, lbl, background, tags, setTags, quant, setElements }) => {
    useEffect(() => {
        setLbl(label)
        if (!id && stop != id) {
            const generatedId = generatorTag({ lbl, background, tags, setTags, quant });
            setId(generatedId);
            stop = generatedId
            setElements(prev => [...prev, {id: generatedId, label: label, imgs: []}])
        }

    }, []);
}

export function useLabelTag({ lbl, id }) {
    useEffect(() => {
        const tag = document.getElementById(`Tag-${id}`)
        if (!tag) {
            console.log(`Tag was not found!`, tag)
            return;
        }
        const labelTag = findChild(tag, 'labelTag')
        if (!labelTag) {
            console.log(`labelTag was not found!`, labelTag)
            return;
        }
        labelTag.innerText = lbl

    }, [lbl]);
}

export function useQuantTag({ quant, id }) {
    useEffect(() => {
        const tag = document.getElementById(`Tag-${id}`)
        if (!tag) {
            console.log(`Tag was not found!`, tag)
            return;
        }
        const quanTag = findChild(tag, 'quantTag')
        if (!quanTag) {
            console.log(`quanTag was not found!`, quanTag)
            return;
        }
        quanTag.innerText = quant

    }, [quant]);
}