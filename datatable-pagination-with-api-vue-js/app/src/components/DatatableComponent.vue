<template>
  <div class="">
    <h1 style="text-align: center;">Datatable with 3rd Party API</h1>
    <v-data-table
      :page="page"
      :pageCount="numberOfPages"
      :headers="headers"
      :items="passengers"
      :options.sync="options"
      :server-items-length="totalPassengers"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:item.logo="{ item }">
        <img :src="item.airline.logo" style="width: 10%;" />
      </template>
      <template v-slot:item.website="{ item }">
        <a :href="item.airline.website">{{ item.airline.website }}</a>
      </template>
    </v-data-table>
  </div>
</template>
<style scoped></style>
<script>
import axios from "axios";
export default {
  name: "DatatableComponent",
  data() {
    return {
      page: 1,
      totalPassengers: 0,
      numberOfPages: 0,
      passengers: [],
      loading: true,
      options: {},
      headers: [
        { text: "Passenger Name", value: "name" },
        { text: "Number Of Trips", value: "trips" },
        { text: "Airline", value: "airline[0].name" },
        { text: "Logo", value: "logo" },
        { text: "Website", value: "website" },
      ],
    };
  },
  watch: {
    options: {
      handler() {
        this.readDataFromAPI();
      },
    },
    deep: true,
  },
  methods: {
    readDataFromAPI() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      console.log("Page Number ", page, itemsPerPage);
      let pageNumber = page - 1;
      axios
        .get(
          "https://api.instantwebtools.net/v1/passenger?size=" +
            itemsPerPage +
            "&page=" +
            pageNumber
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
