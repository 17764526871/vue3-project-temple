import { defineStore } from 'pinia';

export const useUserStore = defineStore('mediaStore', {
  state: () => ({
    imgBase64: '',
    userRole: '',
  }),
  actions: {
    login(role) {
      this.isAuthenticated = true;
      this.userRole = role;
    },
    logout() {
      this.isAuthenticated = false;
      this.userRole = '';
    },
  },
});
