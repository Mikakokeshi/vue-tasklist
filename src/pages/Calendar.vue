<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const items = JSON.parse(localStorage.getItem('items')) || []

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        eventClick: (e) => this.handleEventClick(e),
        drgScroll: true,

        // itemsオブジェクトをループしてイベントを生成
        events: items.map((item) => ({
          title: item.content, // イベントタイトルをアイテムのコンテンツに設定
          date: item.limit // イベント日付をアイテムの制限日に設定
        }))
      }
    }
  },
  methods: {
    handleEventClick: function (e) {
      alert('イベント ' + e.event.title + 'です')
    }
  }
}
</script>
<template>
  <h1>カレンダー</h1>
  <FullCalendar :options="calendarOptions" />
</template>
