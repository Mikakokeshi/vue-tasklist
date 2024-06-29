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
        dateClick: this.handleDateClick,

        // itemsオブジェクトをループしてイベントを生成
        events: items.map((item) => ({
          title: item.content, // イベントタイトルをアイテムのコンテンツに設定
          date: item.limit // イベント日付をアイテムの制限日に設定
        }))
      }
    }
  },
  methods: {
    handleDateClick: function (arg) {
      alert('date click! ' + arg.dateStr)
    }
  }
}
</script>
<template>
  <FullCalendar :options="calendarOptions" />
</template>
