<script setup>
import { ref } from "vue";
import { users } from "../data/users";
import AddUserModal from "./AddUserModal.vue";

const showModal = ref(false);
</script>

<template>
  <div class="table-container">
    <div class="header">
      <h2>Users Table</h2>

      <button @click="showModal = true">Add User</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Country</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user.name }}</td>
          <td>{{ user.country }}</td>
        </tr>
      </tbody>
    </table>

    <AddUserModal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<style scoped>
.table-container {
  width: 70%;
  margin: 50px auto;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
}

button {
  padding: 10px 15px;
}
</style>
