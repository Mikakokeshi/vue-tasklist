# 概要

タスク管理アプリです<br >
タスク登録後、ステータスのPieチャートやカレンダーに反映され、視覚的にタスク管理できます。 <br >
レスポンシブ対応しているのでスマホからもご利用いただけます。

 <img width="1400" alt="スクリーンショット" src="./images/pc_dashboard.png">
<!--  <img width="1400" alt="スクリーンショット" src="./images/pc_inputtask.png">
 <img width="1400" alt="スクリーンショット" src="./images/pc_tasklist.png">
 <img width="1400" alt="スクリーンショット" src="./images/pc_calendar.png"> -->

 <img width="350" text-align="center" alt="スクリーンショット" src="./images/sp_dashboard.png">
<!--  <img width="350" alt="スクリーンショット" src="./images/sp_inputtask.png">
 <img width="350" alt="スクリーンショット" src="./images/sp_tasklist.png">
 <img width="350" alt="スクリーンショット" src="./images/sp_calendar.png"> -->

# URL

https://vue-tasklist-five.vercel.app/<br >
最初に「タスク登録」画面でタスク追加後、「ダッシュボード」「タスク一覧/編集」「カレンダー」の画面を確認できます。

# 使用技術

- vue: ^3.4.29,
  - vue-router: ^4.4.0,
  - vue-chartjs: ^5.3.1,
  - vuetify: ^3.6.10
- fullcalendar

## デプロイ

- Vercel

# 機能一覧

- 投稿/編集/削除 機能(localStorage)
- カレンダー(fullcalendar)
- カテゴリ/ステータスのPieチャート(charts.js)
