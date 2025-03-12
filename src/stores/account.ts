// Utilities
import type { Account } from '@/interfaces/account'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', {
  state: () => ({
    accounts: [] as Account[]
  }),
  actions: {
    addOne() {
      this.accounts.unshift({ labels: [], type: 'local', login: '', password: '', id: this.accounts[0]?.id + 1 || 1 })
    },
    delete(id: number) {
      this.accounts.splice(this.accounts.findIndex(i => id == i.id), 1)
    },
    update(account: Account) {
      const index = this.accounts?.findIndex(i => account.id == i.id)
      this.accounts[index] = account
    }
  },
  persist: true,
})
