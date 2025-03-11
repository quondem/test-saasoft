// Utilities
import type { Account } from '@/interfaces/account'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', {
  state: () => ({
    accounts: [] as Account[]
  }),
  actions: {
    addOne(){
      this.accounts.push({labels: [], type: 'local', login: '', password: ''})
    }
  }
})
