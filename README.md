# MCML (Model Create Machine Learning)

## Descrição
MCML é uma aplicação para a criação de modelos voltados para aprendizado de máquina, utilizando a biblioteca TensorFlow. A aplicação foi desenvolvida em React, com um design simplista e minimalista.

### Características
- Possibilidade de utilizar APIs externas para obter dados de imagem, incluindo suporte para tokens de autenticação premium.
- Exportação de modelos em formato zip para armazenamento local ou envio por e-mail.

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

## Segurança e Privacidade

Não se preocupe com a segurança dos seus dados. Tokens e e-mails não são armazenados e são esquecidos assim que a exportação do modelo é concluída.

## Autor
Seu Nome ou Nome do Time
Email de Contato: seu@email.com

## Licença
Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE para obter detalhes.
