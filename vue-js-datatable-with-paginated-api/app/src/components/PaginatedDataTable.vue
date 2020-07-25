<template>
  <div>
    <v-data-table
      :page="pageNumber"
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
      totalPassengers: 0,
      passengers: [],
      loading: true,
      options: {},
      pageNumber: 0,
      headers: [
        { text: "Passenger Name", value: "name" },
        { text: "Number Of Trips", value: "trips" },
        { text: "Airline", value: "airline[0].name" },
      ],
    };
  },
  methods: {
    readDataFromAPI() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      axios
        .get(
          "https://api.instantwebtools.net/v1/passenger?size=" +
            itemsPerPage +
            "&page=" +
            page
        )
        .then((response) => {
          this.loading = false;
          console.log(response.data);
          this.passengers = response.data.data;
          this.totalPassengers = response.data.totalPassengers;
        });
    },
  },
  mounted() {
    this.readDataFromAPI();
  },
};
</script>
