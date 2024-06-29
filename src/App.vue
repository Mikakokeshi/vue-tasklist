<script setup></script>

<template>
  <main>
    <router-link to="/">Home</router-link> | <router-link to="/calendar">calendar</router-link> |
    <router-view></router-view>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}
</style>
