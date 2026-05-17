<script setup>
import { ref, onMounted } from "vue";
import { users, fetchUsers, deleteUser } from "../data/users";
import AddUserModal from "./AddUserModal.vue";

const showModal = ref(false);
const editingUser = ref(null); // null = add mode, object = edit mode

onMounted(fetchUsers);

function openAdd() {
  editingUser.value = null;
  showModal.value = true;
}

function openEdit(user) {
  editingUser.value = { ...user }; // clone so original isn't mutated
  showModal.value = true;
}

function handleClose() {
  showModal.value = false;
  editingUser.value = null;
}

async function handleDelete(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    await deleteUser(id);
  }
}
</script>

<template>
  <div class="table-container">
    <div class="header">
      <h2>Users Table</h2>
      <button class="btn btn-add" @click="openAdd">+ Add User</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.country }}</td>
          <td class="actions">
            <button class="btn btn-edit" @click="openEdit(user)">
              ✏️ Edit
            </button>
            <button class="btn btn-delete" @click="handleDelete(user.id)">
              🗑️ Delete
            </button>
          </td>
        </tr>

        <tr v-if="users.length === 0">
          <td colspan="4" class="empty">No users found.</td>
        </tr>
      </tbody>
    </table>

    <AddUserModal
      v-if="showModal"
      :editUser="editingUser"
      @close="handleClose"
    />
  </div>
</template>

<style scoped>
.table-container {
  width: 75%;
  margin: 50px auto;
  font-family: "Segoe UI", sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #2c3e50;
  color: white;
  padding: 12px 15px;
  text-align: left;
}

td {
  border: 1px solid #ddd;
  padding: 12px 15px;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: opacity 0.2s;
}

.btn:hover {
  opacity: 0.85;
}

.btn-add {
  background-color: #27ae60;
  color: white;
  padding: 10px 18px;
}

.btn-edit {
  background-color: #2980b9;
  color: white;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.empty {
  text-align: center;
  color: #999;
  padding: 20px;
}
</style>
