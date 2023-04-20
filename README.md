# Spreadsheet to Slack

SpreadsheetをSlackに投稿するGAS

## スプレットシートのフォーマット

|   | A      | B       | C | D |
|---|--------|---------|---|---|
| 1 | posted | content |   |   |
| 2 | [x]    | text1   |   |   |
| 3 | [ ]    | text2   |   |   |
| 4 | [ ]    | text3   |   |   |

## スクリプト プロパティ

- CHANNEL: SlackのチャンネルID or チャンネル名
- SHEET_ID: スプレッドシートID
- SLACK_TOKEN: SlackのAPIトークン
