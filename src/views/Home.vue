<template>
  <div
    v-if="!isLoading"
    class="cards-container pt-3"
    v-scroll="scrollHandler"
    id="country-cards-container"
  >
    <CountryCard
      v-for="(country, index) in visibleCountries"
      :key="index"
      :name="country.name.common"
      :flag="country.flags.png"
      @scroll="scrolledToBottom"
      id="country-card"
    />
    <b-modal v-model="modalVisibility" :title="modalTitle" hide-footer="true"
      ><div class="modal-container">
        <SelectLanguage />
        <p v-html="$t('initial-modal-message')"></p>
        <button
          type="button"
          class="btn btn-secondary m-2"
          id="initial-modal-button"
          @click.prevent="closeModal()"
        >
          {{ $t("initial-modal-button-message") }}
        </button>
      </div></b-modal
    >
  </div>
</template>

<script>
import CountriesService from "../services/countries.service";
import CountryCard from "../components/CountryCard.vue";
import _ from "lodash";
import { mapGetters } from "vuex";
import SelectLanguage from "@/components/SelectLanguage.vue";

export default {
  name: "Home",
  components: { CountryCard, SelectLanguage },
  data() {
    return {
      AllCountries: [],
      visibleCountriesCounter: 27,
      isLoading: false,
      modalVisibility: true,
    };
  },
  computed: {
    ...mapGetters("filters", {
      searchInput: "getSearchInput",
      selectedRegion: "getSelectRegion",
    }),
    visibleCountries() {
      return this.AllCountries.slice(0, this.visibleCountriesCounter);
    },
    modalTitle() {
      return this.$i18n.t("initial-modal-title-message");
    },
  },
  methods: {
    scrollHandler: _.throttle(function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        return (this.visibleCountriesCounter += 27);
      }
    }, 2000),
    getCountries() {
      this.isLoading = true;
      if (this.selectedRegion) {
        CountriesService.getCountryByRegion(this.selectedRegion)
          .then((response) => {
            this.AllCountries = response.data;

            /*this sort had to be done because the API does not responds with the list of the countries alphabetically ordered*/
            this.AllCountries.sort((a, b) =>
              a.name.common > b.name.common
                ? 1
                : b.name.common > a.name.common
                ? -1
                : 0
            );
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        CountriesService.getAllCountries()
          .then((response) => {
            this.AllCountries = response.data;

            /*this sort had to be done because the API does not responds with the list of the countries alphabetically ordered*/
            this.AllCountries.sort((a, b) =>
              a.name.common > b.name.common
                ? 1
                : b.name.common > a.name.common
                ? -1
                : 0
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.isLoading = false;
    },
    closeModal() {
      this.modalVisibility = false;
    },
    searchCountry(keyword) {
      let result = [];
      this.AllCountries.forEach((element) => {
        if (element.name.common.toLowerCase().includes(keyword.toLowerCase())) {
          result.push(element);
        }
      });

      this.AllCountries = result;
    },
  },
  watch: {
    searchInput() {
      if (this.searchInput) {
        this.searchCountry(this.searchInput);
      } else this.getCountries();
    },
    selectedRegion() {
      this.getCountries();
    },
  },
  beforeMount() {
    this.getCountries();
  },
};
</script>

<style scoped>
.cards-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-basis: 33.333333%;
  justify-content: center;
  align-items: center;
}
.modal-container {
  display: flex;
  flex-direction: column;
}
</style>
