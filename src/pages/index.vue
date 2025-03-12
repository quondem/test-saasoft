<template>
  <div class="accounts">
    <div class="accounts__head">
      <h1 class="account__title">Учетные записи</h1>
      <v-btn @click="accountStore.addOne" icon="mdi-plus"></v-btn>
    </div>
    <v-banner icon="mdi-help-circle-outline"
      text="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;" :stacked="false">
    </v-banner>
    <template v-if="accounts.length">
      <div class="accounts__headings">
        <p class="accounts__heading">Метки</p>
        <p class="accounts__heading">Тип поля</p>
        <p class="accounts__heading">Логин</p>
        <p v-if="accounts.find(i => i.type == 'local')" class="accounts__heading">Пароль</p>
      </div>
      <Account :key="account.id" @send="data => accountStore.update(data)" v-bind="account"
        v-for="account in accounts" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useAccountStore } from '@/stores/account'
import { storeToRefs } from 'pinia';

const accountStore = useAccountStore()
const { accounts } = storeToRefs(accountStore)
</script>

<style lang="scss" scoped>
.accounts {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__head {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__headings {
    display: flex;
    gap: 10px;
    width: calc(100% - 34px);
  }

  &__heading {
    flex: 1 0;
  }
}
</style>
