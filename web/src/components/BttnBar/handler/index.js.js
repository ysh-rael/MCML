import { findParent } from "../../../utils/findParent"

export function handlerOnClick({ target }, bttnBar, setBttnBar) {
    bttnBar === 'fa-solid fa-bars-staggered' ? setBttnBar('fa-solid fa-bars') : setBttnBar('fa-solid fa-bars-staggered')
    const parent = findParent(target, 'tagAside')
    console.log(parent)

    if (!parent) {
        console.log(`bttnBar parent was not found!`, parent)
        return;
    }
    parent.classList.contains('actived') ? parent.classList.remove(`actived`) : parent.classList.add(`actived`)
}