<template>
  <div class="account">
    <v-form class="account__form" ref="form">
      <v-text-field class="account__input" ref="field1" v-model="formData.labels" hide-details="auto" />
      <v-select v-model="formData.type" class="account__input" label="Select" :items="[
        { title: 'Локальная', value: 'local' },
        { title: 'LDAP', value: 'ldap' },
      ]"></v-select>
      <v-text-field class="account__input" v-model="formData.login" :rules="rules" hide-details="auto" />
      <v-text-field v-if="formData.type == 'local'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword" class="account__input"
        v-model="formData.password" :rules="rules" hide-details="auto" />
      <v-btn @click="() => accountStore.delete(id)" icon="mdi-delete"></v-btn>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import type { Label } from '@/interfaces/account';
import { useAccountStore } from '@/stores/account'
const accountStore = useAccountStore()

interface Props {
  labels: Label[];
  type: 'local' | 'ldap';
  login: string;
  password: string;
  id: number;
}

const showPassword = ref(false)

const { labels, login, password, type, id } = defineProps<Props>()

const form = ref(null);
const formData = ref({
  labels: labels.map(i => i.text).join('; ') || '',
  type: type || "local",
  login: login || "",
  password: password || "",
});

const emit = defineEmits(['send'])

watch(() => [formData.value.login, formData.value.type, formData.value.password], () => { validate() })

async function validate() {
  console.log(await form.value.validate(), "form.value");
  const { valid } = await form.value.validate();
  if (valid) alert("Form is valid");
  emit('send', formData.value)
}

const rules = [
  (value) => !!value || "Required.",
  (value) => (value && value.length >= 3) || "Min 3 characters",
];
</script>

<style scoped lang="scss">
@import url(./index.scss);
</style>
