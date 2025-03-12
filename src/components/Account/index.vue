<template>
  <div class="account">
    <v-form class="account__form" ref="form">
      <v-text-field validate-on="blur" @blur="validate" class="account__input" ref="field1" :rules="labelRules"
        v-model="formData.labels" hide-details="auto" />
      <v-select v-model="formData.type" class="account__input" label="Select" :items="[
        { title: 'Локальная', value: 'local' },
        { title: 'LDAP', value: 'ldap' },
      ]"></v-select>
      <v-text-field validate-on="blur" @blur="validate" class="account__input" v-model="formData.login"
        :rules="authRules" hide-details="auto" />
      <v-text-field validate-on="blur" @blur="validate" v-if="formData.type == 'local'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword" class="account__input" v-model="formData.password"
        :rules="authRules" hide-details="auto" />
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

watch(() => [formData.value.type], () => {
  if (formData.value.type == 'ldap') formData.value.password = null
  validate()
})

const getLabels = () => {
  return formData.value.labels.split(';')
}

async function validate() {
  console.log(await form.value.validate(), "form.value");
  const { valid } = await form.value.validate();
  if (!valid) return
  emit('send', { ...formData.value, labels: formData.value.labels?.split(';').map(text => ({ text: text.trim() })).filter(item => item.text !== ''), id })
}

const labelRules = [
  (value) => !value || value.length <= 50 || "Max 50 characters",
];

const authRules = [
  (value) => !!value || "Required.",
  (value) => (value && value.length <= 100) || "Max 100 characters",
];
</script>

<style scoped lang="scss">
@import url(./index.scss);
</style>
