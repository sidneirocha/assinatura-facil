# Assinatura Fácil

Gerador de assinaturas de e-mail com três variações de layout, preview ao vivo, upload de logo, cópia em HTML e download. O frontend é estático e não contém credenciais do Google.

## Rodar localmente

```bash
npx serve .
```

Abra a URL local exibida pelo comando. Também é possível abrir `index.html` diretamente, mas a cópia e o `fetch` para o Apps Script funcionam melhor em um servidor local.

## Google Sheets + Drive

1. Crie uma planilha no Google Sheets.
2. Abra `Extensões → Apps Script` e cole `google-apps-script/Code.gs`.
3. Troque `COLE_O_ID_DA_PLANILHA_AQUI` pelo ID da planilha na URL.
4. Implante como Web App, executando como sua conta e permitindo acesso a qualquer pessoa com o link.
5. No gerador, clique em **Configurar conexão** e cole a URL terminada em `/exec`.

Cada salvamento acrescenta uma linha na planilha, envia o logo para o Drive e guarda um arquivo JSON com os dados. O frontend usa `localStorage` como fallback quando a conexão ainda não foi configurada ou está indisponível. O upload aceita PNG, JPG, WEBP e GIF de até 5 MB.
