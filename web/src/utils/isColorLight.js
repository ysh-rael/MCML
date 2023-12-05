export function isColorLight(hexColor) {
    // Remove o caractere '#' se estiver presente
    hexColor = hexColor.replace(/^#/, '');

    // Converte a cor hexadecimal para RGB
    const bigint = parseInt(hexColor, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    // Calcula o brilho da cor usando a fórmula de luminância
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Se o brilho for maior que 0,, considera-se uma cor clara
    return brightness > 0.76;
}