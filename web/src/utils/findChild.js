export function findChild(elem, className) {
    try {
        if (!elem) return;

        for (let i = 0; i < elem.children.length; i++) {
            const child = elem.children[i];

            if (child.classList.contains(className)) {
                return child;
            } else {
                const foundChild = findChild(child, className);
                if (foundChild) {
                    return foundChild;
                }
            }
        }

        return null; // Retorna null se nenhum filho com a classe for encontrado
    } catch (error) {
        console.error(error);
        return null;
    }
}
