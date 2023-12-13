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

export function deleteThis({ id, setDropsArea, DropsArea }) {
    try {
      if (!id) return false;
  
      setDropsArea(elements => {
        console.log(elements.length)
          const updatedElements = elements.filter(esse => {
            console.log(esse.props)
            return esse.props.id !== `DropArea-${id}`
          });
          console.log(updatedElements)
          return updatedElements;
        });
        console.log(DropsArea)
  
      const tag = document.getElementById(`Tag-${id}`);
  
      if (tag) {
        tag.parentElement.removeChild(tag);
      }
  
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

export function update({ event, setImgIndex, setQuant, id, Imgs, setImgs, ImgIndex, lbl, Elements, setElements, Designs, setDesigns }) {
    const designs = Designs
    if (Imgs[ImgIndex] && Imgs[ImgIndex].src) {
        setElements(elems => {
            const indexElem = elems.findIndex(esse => esse.id === id)
            elems[indexElem].imgs.push({ src: Imgs[ImgIndex].src, designs })
            return elems
        })
        console.log(Elements)
    }

    nextImgIndex({ event, setImgIndex, setQuant, id })
    increaseThis(id)
}