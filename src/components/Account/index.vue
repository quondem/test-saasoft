<template>
  <div class="account">
    <v-form class="account__form" ref="form">
      <v-text-field class="account__input" ref="field1" v-model="formData.labels" :rules="rules" hide-details="auto" />
      <v-select v-model="formData.type" class="account__input" label="Select" :items="[
        { title: 'Локальная', value: 'local' },
        { title: 'LDAP', value: 'ldap' },
      ]"></v-select>
      <v-text-field class="account__input" v-model="formData.login" :rules="rules" hide-details="auto" />
      <v-text-field class="account__input" v-model="formData.login" :rules="rules" hide-details="auto" />
      <v-icon class="account__delete">mdi-delete</v-icon>
    </v-form>
  </div>
</template>

<script setup lang="ts">
const form = ref(null);
const formData = ref({
  labels: "",
  type: "local",
  login: "",
  password: "",
});

async function validate() {
  console.log(await form.value.validate(), "form.value");
  const { valid } = await form.value.validate();
  if (valid) alert("Form is valid");
}

const rules = [
  (value) => !!value || "Required.",
  (value) => (value && value.length >= 3) || "Min 3 characters",
];
</script>

<style scoped lang="scss">
@import url(./index.scss);
</style>
