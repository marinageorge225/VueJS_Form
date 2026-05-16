<script setup>
import { ref } from "vue";
import { users } from "../data/users";
import { useRouter } from "vue-router";

const name = ref("");
const country = ref("");

const router = useRouter();

const addUser = () => {
  users.push({
    name: name.value,
    country: country.value,
  });

  name.value = "";
  country.value = "";

  router.push("/users");
};
</script>

<template>
  <div class="form-container">
    <h2>Add User</h2>

    <input v-model="name" placeholder="Enter name" />

    <input v-model="country" placeholder="Enter country" />

    <button @click="addUser">Submit</button>
  </div>
</template>

<style scoped>
.form-container {
  width: 300px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input,
button {
  padding: 10px;
}
</style>
