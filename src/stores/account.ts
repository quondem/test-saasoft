// Utilities
import type { Account } from '@/interfaces/account'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', {
  state: () => ({
    accounts: [] as Account[]
  }),
  actions: {
    addOne() {
      this.accounts.push({ labels: [{ text: '123' }, { text: 'fds' }], type: 'local', login: '', password: '', id: this.accounts[this.accounts.length - 1]?.id || 1 })
    },
    delete(id: number) {
      this.accounts.splice(this.accounts.findIndex(i => id == i.id), 1)
    }
  }
})
