<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div v-if="!isLoading">
<h1 class="text-center pt-3 title-align font-weight-bold" >{{country.name.common}}</h1>
  <div class="container  details-container">
   
    <b-img-lazy  v-bind="mainProps" :src="country.flags.png"  alt="Responsive image" class="flag-size mr-5 margin-right"></b-img-lazy>
   
    <b-table stacked :items="items" :fields="fields" class="pt-5 ml-2"></b-table>
  </div>
  <div class="borders-container mt-n2">
  <h3 v-if="borders" class="mt-2 ml-1">{{ $t("borders") }}:</h3>
  <button type="button" class="btn btn-secondary m-2"  v-for="(countryCode, index) in borders" :key="index" @click="goToCountryBorder(countryCode)">{{countryCode}}</button>
  </div>
  <GmapMap
  :center="coordinates"
  :zoom="7"
  map-type-id="terrain"
  style="width: 100%; height: 300px"
>
</GmapMap>

</div>
</template>

<script>
import CountriesService from "@/services/countries.service";
import {gmapApi} from 'vue2-google-maps'
export default {

  name: "Details",
  data() {
    return {
     country: {},
     coordinates: {lat: undefined, lng: undefined},
     isLoading: true,
     mainProps: {
          center: true,
          fluidGrow: true,
          blank: true,
          blankColor: '#bbb',
          width: 75,
          height: 50,
          class: 'my-5'
        },
        items: [
          { Name: undefined, Population: undefined, Region: undefined, SubRegion: undefined, Capital: undefined, Languages: undefined },
        ],

        borders: undefined,
    };
  },
computed:{
   google: gmapApi,
  countryName(){
    return this.$route.params.country
  },
  fields(){
    let fields= [
    {key: 'Name',  label: this.$i18n.t('name') },
    {key: 'Population',  label: this.$i18n.t('population') },
    {key: 'Region', label: this.$i18n.t('region') },
    {key: 'SubRegion', label: this.$i18n.t('subRegion') },
    {key: 'Capital', label: this.$i18n.t('capital') },
    {key: 'Languages', label: this.$i18n.t('languages') }
    ]
  return fields
  },
  countryCode(){
    return this.$route.params.countryCode
  }
},
beforeMount() {
    this.getCountry();
  },
methods:{
       goToCountryBorder(countryCode){
      CountriesService.getCountryByCode(countryCode)
        .then((response) => {
          this.country = response.data[0];
          this.setTableItems(response.data[0])
        }).catch((error) => {
          console.log(error);
        });    
    },
    getCountry() {
      this.isLoading= true
      if(this.countryName){
        CountriesService.getCountryByName(this.countryName)
        .then((response) => {
          this.country = response.data[0];
          this.setTableItems(response.data[0])
        }).catch((error) => {
          console.log(error);
        });
      }
    this.isLoading= false
    },
    setTableItems(countryData){
this.items[0].Name = countryData.name.official
this.items[0].Population = countryData.population
this.items[0].Region = countryData.region
this.items[0].SubRegion= countryData.subregion
this.items[0].Capital = countryData.capital.toString()
this.items[0].Languages = Object.values(countryData.languages).toString()
this.borders= countryData.borders
this.coordinates.lat= countryData.latlng[0]
this.coordinates.lng= countryData.latlng[1]
    }
}

};
</script>
<style scoped>

.details-container{
  display: flex;
  flex-direction: row;
  margin-top: -30px;
}
.margin-right{
  margin-right: 100px !important;
}
.borders-container{
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  margin-top: -25px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.flag-size{
height: 60% !important;
width: 60% !important;
}
@media only screen and (max-device-width: 820px) {
  .flag-size{
  height: 100% 60% !important;
  width: 90% 60% !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 20% !important;
  margin-bottom: -10% !important;
}
.details-container{
  display: flex;
  flex-direction: column;
  margin-top: -30px;
}
.borders-container{
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  margin-top: -15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
}
</style>