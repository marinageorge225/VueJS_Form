<script setup>
import { ref } from "vue";
import { users } from "../data/users";

const emit = defineEmits(["close"]);

const name = ref("");
const country = ref("");

const addUser = () => {
  users.push({
    name: name.value,
    country: country.value,
  });

  emit("close");
};
</script>

<template>
  <div class="overlay">
    <div class="modal">
      <h2>Add New User</h2>

      <input v-model="name" placeholder="Name" />

      <input v-model="country" placeholder="Country" />

      <button @click="addUser">Add</button>

      <button @click="$emit('close')">Close</button>
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
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
}

input,
button {
  padding: 10px;
}
</style>
