/**
 * Assinatura Fácil — endpoint para Google Sheets + Google Drive.
 * 1. Crie uma planilha e copie o ID da URL.
 * 2. Crie um projeto em script.google.com, cole este arquivo.
 * 3. Preencha SHEET_ID e, opcionalmente, DRIVE_FOLDER_ID.
 * 4. Implante como Web App: executar como você e acesso "qualquer pessoa".
 */
const SHEET_ID = 'COLE_O_ID_DA_PLANILHA_AQUI';
const DRIVE_FOLDER_ID = ''; // Opcional. Uma pasta será criada se ficar vazio.

function doPost(event) {
  try {
    const data = JSON.parse(event.postData.contents || '{}');
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(['createdAt', 'name', 'company', 'role', 'email', 'phone', 'website', 'logo', 'tagline', 'layout', 'driveFileId']);
    const createdAt = new Date();
    const json = JSON.stringify(data, null, 2);
    const folder = DRIVE_FOLDER_ID ? DriveApp.getFolderById(DRIVE_FOLDER_ID) : getOrCreateFolder_();
    const file = folder.createFile(`assinatura-${safeName_(data.name || 'sem-nome')}-${createdAt.getTime()}.json`, json, MimeType.PLAIN_TEXT);
    sheet.appendRow([createdAt, data.name || '', data.company || '', data.role || '', data.email || '', data.phone || '', data.website || '', data.logo || '', data.tagline || '', data.layout || '', file.getId()]);
    return jsonResponse_({ok: true, fileId: file.getId()});
  } catch (error) {
    return jsonResponse_({ok: false, error: String(error.message || error)});
  }
}

function getOrCreateFolder_() {
  const name = 'Assinatura Fácil — Dados';
  const folders = DriveApp.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(name);
}

function safeName_(value) { return String(value).replace(/[^a-z0-9-_]/gi, '-').slice(0, 50); }
function jsonResponse_(body) { return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON); }
