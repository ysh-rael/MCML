export function inIsOnVertex(mouseX, mouseY, Designs) {

    const KeysDesenhos = Object.keys(this.desenhos);
    let result = false;
    if (Designs.length)
        Designs.forEach((design) => {
            if (!design || result) return;
            if (design.forma != 'circle') return;
            const { x, y, ray } = design;
            const distancia = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
            result = distancia <= ray ? design.id : null;
        });

    return result;
}