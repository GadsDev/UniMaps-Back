# UniMaps-Back

# Requisitos
- NodeJs e NPM instalados
- Ter o cross-env instalado globalmente sudo npm i -g cross-env


## Configurando Ambiente
### ENV
1. Na raiz do projeto crie uma pasta chamada env
2. dentro dela crie 2 arquivos .env.prod .env.dev com esta estrutura

```{r somePlot, echo=FALSE}
    PORT=8000
    MONGODB_URL=exemplo.com
    JWT_SECRET=MINHA_SENHA_SECRETA
```

# Iniciando
- subir versão Prod
npm run prod
- Subir versão Dev
npm run dev
- Rodar testes
npm run test 
