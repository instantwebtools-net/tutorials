<template>
  <div>
    <v-data-table
      :page="page"
      :pageCount="numberOfPages"
      :headers="headers"
      :items="passengers"
      :options.sync="options"
      :server-items-length="totalPassengers"
      :loading="loading"
        class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      page: 0,
      totalPassengers: 0,
      numberOfPages: 0,
      passengers: [],
      loading: true,
      options: {},
      headers: [
        { text: "Passenger Name", value: "name" },
        { text: "Number Of Trips", value: "trips" },
        { text: "Airline", value: "airline[0].name" },
      ],
    };
  },
  watch: {
    options: {
      handler () {
        this.readDataFromAPI();
      }      
    },
    deep: true,
  },
  methods: {
    readDataFromAPI() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      console.log("Page Number ", page, itemsPerPage);
      axios
        .get(
          "https://api.instantwebtools.net/v1/passenger?size=" +
            itemsPerPage +
            "&page=" +
            page
        )
        .then((response) => {
          this.loading = false;
          this.passengers = response.data.data;
          this.totalPassengers = response.data.totalPassengers;
          this.numberOfPages = response.data.totalPages;
        });
    },
  },
  mounted() {
    this.readDataFromAPI();
  },
};
</script>
