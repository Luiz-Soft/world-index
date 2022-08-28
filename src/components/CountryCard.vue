<template>
<div>
  <b-card
    :title="name"
    :img-src="flag"
    img-alt="Image"
    img-top
    tag="article"
    style="width: 25rem;"
    class="mb-2 m-2" 
    img-height="200"
  >
    <b-button @click.prevent="goToCountryDetails" variant="primary">{{ $t("see-details") }}</b-button>
  </b-card>
</div>
</template>

<script>
import CountriesService from "../services/countries.service"
export default {
  name: "CountryCard",
  props: {
			name: {
				type: String,
				required: true,
			},
			flag: {
				type: Number,
				required: true,
			},
		},
methods:{
 getCountries(selectedPage) {
    
        CountriesService.getAllCountries(selectedPage)
          .then((response) => {
            this.AllCountries = response.data 
            this.AllCountries.sort((a,b) => (a.name.common > b.name.common) ? 1 : ((b.name.common > a.name.common) ? -1 : 0))
            
          })
          .catch((error) => {
            console.log(error);
          });
    
    },
    goToCountryDetails(){
      this.$router.push({name: 'Details', params: { country: this.name}});
    }
},
 beforeMount() {
    this.getCountries();
  },
};
</script>