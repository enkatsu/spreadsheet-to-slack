function main() {
  // *** Slack に投稿する記事をSpreadSheetから取得する ***
  const sheetId = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  const sheet = SpreadsheetApp.openById(sheetId);
  const posts = sheet2objects(sheet);
  const notPosted = posts.filter(post => !post.posted)
    .filter(post => post.content.trim().length != 0);
  if (notPosted.length === 0) {
    console.info('投稿できる記事はありません');
    return;
  }

  // *** Slack に投稿 ***
  const thisTimePost = notPosted[0];
  let slackToken = PropertiesService.getScriptProperties().getProperty('SLACK_TOKEN');
  let channel = PropertiesService.getScriptProperties().getProperty('CHANNEL');
  const slackApp = SlackApp.create(slackToken);
  slackApp.postMessage(channel, thisTimePost.content);

  // *** チェックボックスを true にする ***
  // let content = sheet.getRange(`B${thisTimePost.rowNumber}:B${thisTimePost.rowNumber}`);
  const checkboxPosition = `A${thisTimePost.rowNumber}:A${thisTimePost.rowNumber}`;
  let checkbox = sheet.getRange(checkboxPosition);
  if (checkbox.getValue()) {
    console.error(`${checkboxPosition} は既に true でした`);
  }
  console.info(`${checkboxPosition} を true にしました`);
  checkbox.setValue(true);
}

/**
 * Spreadsheetを元にした
 * ヘッダーをキーとしたオブジェクトの配列を返す
 */
function sheet2objects(sheet) {
  const rows = sheet
    .getDataRange()
    .getValues();
  const header = rows.shift();
  const objects = rows.map((row, i) => {
    const object = { rowNumber: i + 2 };
    for (let i = 0; i < header.length; i++) {
      const key = header[i];
      object[key] = row[i];
    }
    return object;
  });

  return objects;
}
