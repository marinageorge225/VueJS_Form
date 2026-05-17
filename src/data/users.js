import { reactive } from "vue";

const API = "http://localhost:3000/users";

export const users = reactive([]);

export async function fetchUsers() {
  const res = await fetch(API);
  const data = await res.json();
  users.splice(0, users.length, ...data);
}

export async function addUser(payload) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const newUser = await res.json();
  users.push(newUser);
}

export async function updateUser(id, payload) {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const updated = await res.json();
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) users[index] = updated;
}

export async function deleteUser(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) users.splice(index, 1);
}
