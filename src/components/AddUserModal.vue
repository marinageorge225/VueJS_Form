<script setup>
import { ref, watch } from "vue";
import { addUser, updateUser } from "../data/users";

const props = defineProps({
  editUser: {
    type: Object,
    default: null, // null = Add mode, object = Edit mode
  },
});

const emit = defineEmits(["close"]);

const name = ref("");
const country = ref("");

// Pre-fill form when editing
watch(
  () => props.editUser,
  (user) => {
    if (user) {
      name.value = user.name;
      country.value = user.country;
    } else {
      name.value = "";
      country.value = "";
    }
  },
  { immediate: true },
);

const isEditMode = () => props.editUser !== null;

async function handleSubmit() {
  if (!name.value.trim() || !country.value.trim()) {
    alert("Please fill in both fields.");
    return;
  }

  if (isEditMode()) {
    await updateUser(props.editUser.id, {
      name: name.value,
      country: country.value,
    });
  } else {
    await addUser({
      name: name.value,
      country: country.value,
    });
  }

  emit("close");
}
</script>

<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="modal">
      <h2>{{ isEditMode() ? "Edit User" : "Add New User" }}</h2>

      <input v-model="name" placeholder="Name" />
      <input v-model="country" placeholder="Country" />

      <div class="modal-actions">
        <button class="btn btn-submit" @click="handleSubmit">
          {{ isEditMode() ? "Update" : "Add" }}
        </button>
        <button class="btn btn-cancel" @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 320px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

h2 {
  margin: 0;
  font-size: 20px;
  color: #2c3e50;
}

input {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #2980b9;
}

.modal-actions {
  display: flex;
  gap: 10px;
}

.btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn:hover {
  opacity: 0.85;
}

.btn-submit {
  background-color: #27ae60;
  color: white;
}

.btn-cancel {
  background-color: #95a5a6;
  color: white;
}
</style>
