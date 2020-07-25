<template>
  <div class="scroll-view">
    <h1>Scroll View With Vue JS</h1>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="20"
    >
    {{data}}
    </div>
  </div>
</template>

<script>
var count = 0;
export default {
  name: "ScrollView",
  data: function() {
    return {
      data: [],
      busy: false,
    };
  },
  methods: {
    loadMore: function() {
      this.busy = true;
      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({ name: count++ });
        }
        this.busy = false;
      }, 1000);
    },
  },
};
</script>
