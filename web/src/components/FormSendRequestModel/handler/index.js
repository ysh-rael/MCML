// Função para fazer o download de um arquivo Blob
const downloadBlob = (blob, filename) => {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};

// Função para fazer o download de um arquivo base64
const downloadBase64 = (filename, contentBase64) => {
    // Decodifica os dados base64 para obter os bytes do arquivo
    const byteCharacters = atob(contentBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Cria um blob com os dados do arquivo
    const blob = new Blob([byteArray], { type: 'application/zip' });

    // Chama a função para fazer o download do arquivo Blob
    downloadBlob(blob, filename);
};

export function submitForm(event, { InputEmail, InptEpochst, Elements, InputAuth, sendForEmail }) {
    event.preventDefault()
    const data = {
        email: InputEmail,
        sendForEmail,
        epochs: InptEpochst,
        data: Elements
    }
    fetch(`${process.env.REACT_APP_BACK_URLBASE}${process.env.REACT_APP_BACK_ENDPOINT_SEND}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': InputAuth
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            // Verifica se a resposta tem um Content-Type de application/zip
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/zip')) {
                // Se for um arquivo ZIP, chama a função para fazer o download do arquivo base64
                response.blob().then(blob => {
                    downloadBlob(blob, 'models.zip');
                });
            } else {
                // Se não for um arquivo ZIP, assume que é uma resposta JSON normal
                return response.json();
            }
        })
        .then(res => {
            // Aqui você pode lidar com a resposta JSON, se necessário
            console.log(res);
        })
        .catch(err => {
            console.error(err);
        });
}
