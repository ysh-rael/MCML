import { findChild } from "../../../utils/findChild";
import { findParent } from "../../../utils/findParent";


export function nextImgIndex({ event, setImgIndex, setQuant, id }) {
    try {
        if (event.target.id !== `DropArea-${id}`) return;

        setImgIndex((prevImgIndex) => prevImgIndex + 1);
        setQuant((prevImgIndex) => prevImgIndex + 1);
    } catch (err) {
        console.log(err);
    }
}

export function hiddenInpt({ target }) {
    target.type = 'hidden'
}


export function editLabel(event, lbl, setLbl) {
    const iconEdit = event.target
    const parent = findParent(iconEdit, 'DropArea')

    if (!parent) {
        console.log('Parent was not found.')
        console.log(`Parent: ${parent}`)
        return;
    }

    const inpt = findChild(parent, 'inptEditLabelDropArea')
    const label = findChild(parent, 'labelDropArea')

    if (!inpt && !label) {
        console.log('inpt or label was not found.')
        console.log(`inpt: ${inpt}`)
        console.log(`label: ${label}`)
        return;
    }
    inpt.type = 'text'
    inpt.focus()
}

export function deleteThis({ id, setDropsArea, Elements, setElements }) {
    try {
        if (!id) return false;

        setDropsArea(elements => elements.filter(esse => esse.props.id !== id));

        setElements(elements => elements.filter(esse => esse.id !== id));

        const tag = document.getElementById(`Tag-${id}`);
        if (tag) tag.parentElement.removeChild(tag);

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}



export function increaseThis(id) {
    try {
        console.log(id)
        if (!id) return false
        const dropArea = document.getElementById(`DropArea-${id}`)
        const tag = document.getElementById(`Tag-${id}`)

        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

export function blur({ event, setElements, id, lbl }) {
    hiddenInpt(event)
    setElements(prev => prev.map(esse => {
        if (esse.id === id) esse.label = lbl
        return esse
    }))
}

export function update({ event, setImgIndex, setQuant, id, setImgs, lbl, Elements, setElements, setDesigns, setContainsTheObject }) {
    
    let containsTheObject = false
    setContainsTheObject(esse => {
        containsTheObject = esse
        return esse
    })

    let designs = []
    setDesigns(esse => {
        designs = esse
        return esse
    })

    let Imgs = []
    setImgs(esse => {
        Imgs = esse
        return esse
    })

    let ImgIndex = 0
    setImgIndex(esse => {
        ImgIndex = esse
        return esse
    })


    if (Imgs[ImgIndex] && Imgs[ImgIndex].src) {
        setElements(elems => {
            const indexElem = elems.findIndex(esse => esse.id === id)
            elems[indexElem].imgs.push({ src: Imgs[ImgIndex].src, designs, containsTheObject })
            return elems
        })
        nextImgIndex({ event, setImgIndex, setQuant, id })
    }


}