<template>
<select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
      </select>
</template>

<script>


export default {
  name: "SelectLanguage",
  data() {
    return {

      langs: ['en', 'pt'],
        
    };
  },
 
};
</script>

