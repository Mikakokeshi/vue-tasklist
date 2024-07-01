<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      {
        title: 'ダッシュボード',
        url: '/',
        icon: 'mdi-view-dashboard'
      },
      {
        title: 'タスク登録',
        url: '/inputtask',
        icon: 'mdi-pencil-plus'
      },
      {
        title: 'タスク一覧/編集',
        url: '/tasklists',
        icon: 'mdi-view-list-outline'
      },
      {
        title: 'カレンダー',
        url: '/calendar',
        icon: 'mdi-calendar-badge'
      }
    ]
  }),

  watch: {
    group() {
      this.drawer = false
    }
  }
}
</script>

<template>
  <main>
    <router-view></router-view>
  </main>
  <v-layout>
    <v-app-bar color="secondary" prominent>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title> <router-link to="/">Vue.js タスク管理APP </router-link></v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'left' : undefined"
      temporary
    >
      <v-list nav>
        <v-list-item v-for="item in items" :key="item.title" :prepend-icon="item.icon"
          ><router-link :color="item.color" :to="item.url">{{
            item.title
          }}</router-link></v-list-item
        >
      </v-list>
    </v-navigation-drawer>
  </v-layout>
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
main {
  width: 860px;
  margin-top: 60px;
  position: relative;
}
.v-app-bar-title a {
  color: #fff;
}
.v-app-bar-title,
.v-list-item__content a {
  font-weight: 600;
}
@media screen and (max-width: 678px) {
  main {
    width: 100%;
  }
}
</style>
