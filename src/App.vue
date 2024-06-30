<script setup></script>

<template>
  <main>
    <router-link to="/">Home</router-link> | <router-link to="/inputtask">タスク登録</router-link> |
    <router-link to="/tasklists">タスク一覧</router-link> |
    <router-link to="/calendar">カレンダー</router-link> |
    <router-view></router-view>
  </main>
</template>

<style>
header {
  line-height: 1.5;
}
h1 {
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0 40px;
}
</style>
