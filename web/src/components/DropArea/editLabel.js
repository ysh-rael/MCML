import { findChild } from "../../utils/findChild";
import { findParent } from "../../utils/findParent";

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