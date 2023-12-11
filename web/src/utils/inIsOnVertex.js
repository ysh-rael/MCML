export function inIsOnVertex({ mouseX, mouseY, Designs, canvasRef }) {
    let result = null;
    try {

        if (Designs.length && canvasRef.current) {
            const canvas = canvasRef.current;

            Designs.forEach((design) => {
                if (!design || result) return;
                if (design.form !== 'circle') return;

                const { x, y, ray } = design;

                // Obtém as coordenadas do canvas em relação à janela do navegador
                const canvasRect = canvas.getBoundingClientRect();
                const canvasX = mouseX - canvasRect.left;
                const canvasY = mouseY - canvasRect.top;

                const distancia = Math.sqrt((canvasX - x) ** 2 + (canvasY - y) ** 2);
                if (distancia <= ray) {
                    result = design.id;
                }
            });
        }
    } catch (error) {
        console.log(error);
        result = null;
    } finally {
        return result;
    }
}
