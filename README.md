# MCML (Model Create Machine Learning)

## Descrição
MCML é uma aplicação para a criação de modelos voltados para aprendizado de máquina, utilizando a biblioteca TensorFlow. A aplicação foi desenvolvida em React, com um design simplista e minimalista.

![mcml-previa-comprimido](https://github.com/ysh-rael/MCML/assets/79410863/e991f7d5-fe57-4d03-8f43-7260400873bf)


### Características
- Possibilidade de utilizar APIs externas para obter dados de imagem, incluindo suporte para tokens de autenticação premium.
- Exportação de modelos em formato zip para armazenamento local ou envio por e-mail.
- **Responsividade:** A aplicação é responsiva, apresentando layouts dedicados para desktop e mobile, com foco na usabilidade da interface do usuário.
- **Request sob Demanda:** Personalize a demanda de requisições à API para ter maior controle sobre o uso. Por exemplo, defina que a cada requisição à API, venham 10 imagens. Quando essas 10 imagens forem utilizadas, mais 10 serão carregadas.

## Funcionamento

A aplicação é uma Single Page Application (SPA) dividida em três seções principais:

### Sessão Card
Nesta seção, você pode configurar a API de base de imagens, descartar imagens, ajustar gráficos para definir objetos a serem reconhecidos e, ao finalizar, enviar os cards para seus respectivos grupos. Após configurar tudo, é possível solicitar a exportação do modelo por arquivo zip ou por e-mail.

### Sessão Grupos
Permite definir grupos nos quais os cards serão organizados. Também é possível atribuir cores personalizadas para facilitar a usabilidade.

### Sessão Tag
Fornece um resumo de cada tag, permitindo o controle da quantidade de cards em cada grupo.

## Exportação do Modelo

Ao finalizar a criação do modelo, você tem a opção de exportá-lo de duas maneiras:
- **Arquivo ZIP:** Baixe o modelo para armazenamento local.
- **E-mail:** Informe seu endereço de e-mail e solicite o envio do modelo. O backend da aplicação, separado, enviará o modelo assim que a criação for concluída, permitindo que você continue suas atividades sem esperar.

## .ENV
*env backend*: Envio de email utilizando Protocolo SMTP.
``` javascript
NODEMAILER_HOST='host-smtp-aqui'
NODEMAILER_PORT='123'
NODEMAILER_USER='seu-usuario-SMTP'
NODEMAILER_PASS='sua-senha-SMTP'
NODEMAILER_FROM='seuEmail@host.com'
NODEMAILER_CC='Emails que receberao uma copia'
NODEMAILER_SUBJECT='Assunto da email aqui'
```

*env web*: Aponta para o back-end da aplicacao e possibiita ativar modo dev.
``` javascript
REACT_APP_DEVELOPER=false
TOKEN_PEXELS='token_api_pixels_para_dev' 
REACT_APP_BACK_URLBASE='http://localhost:3239' // Aponta para o servidor.
REACT_APP_BACK_ENDPOINT_SEND='/mcml' // Rota para envio do modelo
```

## Segurança e Privacidade

Não se preocupe com a segurança dos seus dados. Tokens e e-mails não são armazenados e são esquecidos assim que a exportação do modelo é concluída.

## Funcionalidades Adicionais

- **Request sob Demanda:** Personalize a demanda de requisições à API para ter maior controle sobre o uso.
- **Versão Beta:** A aplicação está em versão beta e tem a meta de aceitar outras formas de obter o banco de imagem. Seu feedback é muito bem-vindo.

## Autor
Ysh-rael
Email de Contato: ysp.rael@email.com

## Licença
Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.


