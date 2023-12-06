export function findParent(elem, className) {
    try {
        if (!elem) return;

        if (elem.parentNode.className.split(' ').indexOf(className) !== -1) {
            return elem.parentNode;
        } else {
            return findParent(elem.parentNode, className);
        }
    } catch (error) {
        console.log(error)
        return;
    }
}