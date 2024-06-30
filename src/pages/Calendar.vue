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
      console.log(e)
      const selectedDate = e.event.start
        .toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
        .replaceAll('/', '-')
      alert('タスク： ' + '「' + e.event.title + '」' + ' 期限：' + selectedDate)
    }
  }
}
</script>
<template>
  <h1>カレンダー</h1>
  <FullCalendar :options="calendarOptions" />
</template>

<style>
@media screen and (max-width: 678px) {
  .fc-dayGridMonth-view table td {
    height: initial;
    width: initial;
  }
}
</style>
