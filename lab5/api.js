const API_URL = "http://localhost:3000/contacts";

export async function getContacts() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to load contacts");
    return await res.json();
}

export async function getContactbyId(id) {
    const res =  await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Contact not found");
    return await res.json();
}

export async function createContact(contact) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
  if (!res.ok) throw new Error("Failed to create contact");
  return await res.json();
}

export async function updateContact(id, contact) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
  if (!res.ok) throw new Error("Failed to update contact");
  return await res.json();
}

export async function deleteContact(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete contact");
  return true;
}