<template>
  <div>
    <b-navbar toggleable="lg" type="primary" variant="primary" fixed="top">
      <b-navbar-brand @click.prevent="goToHome()" class="ml-2 cursor-pointer">{{
        $t("site-name")
      }}</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/">{{ $t(currentRouteName) }}</b-nav-item>
        </b-navbar-nav>

        <b-form-select
          v-model="selectedRegion"
          :options="options"
          size="sm"
          class="select-margin"
          v-if="currentRouteName === 'Home'"
        ></b-form-select>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              v-if="currentRouteName === 'Home'"
              v-model="searchedCountry"
              size="sm"
              class="mr-sm-2 custom-form-input"
              :placeholder="searchCountryText"
            ></b-form-input>
          </b-nav-form>
        </b-navbar-nav>
        <div class="language-position" v-if="isMobile">
          <p class="language-label">{{ $t("language") }}</p>
          <SelectLanguage />
        </div>
      </b-collapse>

      <div class="language-position" v-if="!isMobile">
        <p class="language-label">{{ $t("language") }}</p>
        <SelectLanguage />
      </div>
    </b-navbar>
  </div>
</template>

<script>
import SelectLanguage from "../components/SelectLanguage.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Navbar",
  components: { SelectLanguage },
  data() {
    return {
      searchedCountry: "",
      selectedRegion: null,
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
    isMobile() {
      if (screen.width <= 760) {
        return true;
      } else {
        return false;
      }
    },
    searchCountryText() {
      return this.$i18n.t("search-for-a-country");
    },
    options() {
      const option = [
        { value: null, text: this.$i18n.t("select-a-region") },
        { value: "Africa", text: this.$i18n.t("Africa") },
        { value: "Americas", text: this.$i18n.t("Americas") },
        { value: "Asia", text: this.$i18n.t("Asia") },
        { value: "Europe", text: this.$i18n.t("Europe") },
        { value: "Oceania", text: this.$i18n.t("Oceania") },
      ];
      return option;
    },
  },
  methods: {
    ...mapMutations("filters", ["setSearchInput", "setSelectRegion"]),
    goToHome() {
      this.$router.push({ name: "Home" });
    },
  },
  watch: {
    searchedCountry() {
      this.setSearchInput(this.searchedCountry);
    },
    selectedRegion() {
      this.setSelectRegion(this.selectedRegion);
    },
  },
};
</script>
<style>
.cursor-pointer {
  cursor: pointer;
  margin-left: 20px !important;
}
.select-margin {
  margin-right: 20px !important;
}
.language-position {
  display: flex;
  flex-direction: row;
  height: 20%;
  align-items: baseline;
}

@media only screen and (max-device-width: 820px) {
}
</style>
