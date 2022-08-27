<template>
  <div>
    <b-navbar toggleable="lg" type="primary" variant="primary" fixed="top">
      <b-navbar-brand @click.prevent="goToHome()" class="ml-2 cursor-pointer">World Index 🌎</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/">{{ currentRouteName }}</b-nav-item>
        </b-navbar-nav>

       
        <b-form-select v-model="selectedRegion" :options="options" size="sm" class="select-margin" v-if="(currentRouteName==='Home')" ></b-form-select>
         <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
            v-if="(currentRouteName==='Home')"
              v-model="searchedCountry"
              size="sm"
              class="mr-sm-2 custom-form-input"
              placeholder="Procure por um país..."
            ></b-form-input>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    
      
   
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      searchedCountry: "",
      selectedRegion: null,
        options: [
          { value: null, text: 'Seleciona uma região' },
          { value: 'Africa', text: 'África' },
          { value: 'Americas', text: 'Américas' },
          { value: 'Asia', text: 'Ásia' },
          { value: 'Europe', text: 'Europa' },
          { value: 'Oceania', text: 'Oceania' },
        ]
    };
  },
  computed: {
    ...mapGetters("filters", {
      searchInput: "getSearchInput",
      selectRegion: "getSelectRegion",
    }),
    currentRouteName() {
      return this.$route.name;
    },
  },
    methods: {
    ...mapMutations("filters", ["setSearchInput","setSelectRegion"]),
     goToHome(){
      this.$router.push({name: 'Home'});
    }
  },
  watch:{
    searchedCountry(){
      this.setSearchInput(this.searchedCountry)
    },
    selectedRegion(){
      this.setSelectRegion(this.selectedRegion)
    }
  }
};
</script>
<style>
.cursor-pointer{
  cursor: pointer;
  margin-left: 20px !important;
}
.select-margin{
  margin-right: 20px !important;
}
@media only screen and (max-device-width: 820px) {

}
</style>
