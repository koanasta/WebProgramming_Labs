(() => {
  const LS_KEY = "relationz_contacts_v1";

  const load = () => JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  const save = (arr) => localStorage.setItem(LS_KEY, JSON.stringify(arr));

  
  function render({ search = "" } = {}) {
    const list = document.querySelector(".contacts__list");
    if (!list) return;

    let contacts = load();
    const sort = document.querySelector("#sortByExperience")?.checked;
    if (search) {
      const s = search.toLowerCase();
      contacts = contacts.filter(c => c.name.toLowerCase().includes(s) || c.phone.includes(s));
    }
    if (sort) contacts.sort((a, b) => b.experience - a.experience);

    list.innerHTML = contacts.length
      ? contacts.map(c => `
        <li class="contacts__item">
          <div class="contact-card__body">
            <h2>${c.name}</h2>
            <p>${c.phone}</p>
            <p>Experience: ${c.experience}</p>
            <div class="contact-card__buttons">
              <button class="edit" data-id="${c.id}">Edit</button>
              <button class="del" data-id="${c.id}">Remove</button>
            </div>
          </div>
        </li>`).join("")
      : `<p style="padding:16px;">No contacts yet.</p>`;
    
    const total = document.querySelector(".controls__total-value");
    if (total) total.textContent = contacts.length;
  }


  const add = d => { const c = load(); c.push({ id: Date.now(), ...d }); save(c); };
  const del = id => { save(load().filter(c => c.id != id)); };
  const update = (id, d) => {
    const c = load(); const i = c.findIndex(x => x.id == id);
    if (i > -1) { c[i] = { ...c[i], ...d }; save(c); }
  };

 
  if (location.pathname.endsWith("contacts.html")) {
    render();

    document.querySelector(".contacts__list")?.addEventListener("click", e => {
      const id = e.target.dataset.id;
      if (e.target.classList.contains("del")) { del(id); render(); }
      if (e.target.classList.contains("edit")) location.href = `edit-contact.html?id=${id}`;
    });

    document.querySelector(".header__search-form")?.addEventListener("submit", e => {
      e.preventDefault();
      const val = e.target.querySelector("input").value;
      render({ search: val });
    });

    document.querySelector(".search-form__button--reset")?.addEventListener("click", () => render());
    document.querySelector("#sortByExperience")?.addEventListener("change", () => render());
    document.querySelector(".controls__button")?.addEventListener("click", () =>
      alert("Total contacts: " + load().length)
    );
  }


  if (location.pathname.endsWith("add-contact.html")) {
    document.querySelector("form")?.addEventListener("submit", e => {
      e.preventDefault();
      const name = e.target.title.value.trim();
      const phone = e.target.phone.value.trim();
      const exp = Number(e.target.experience.value) || 0;
      if (!name || !phone) return alert("Fill all fields!");
      add({ name, phone, experience: exp });
      location.href = "contacts.html";
    });
  }


  if (location.pathname.endsWith("edit-contact.html")) {
    const id = new URLSearchParams(location.search).get("id");
    const c = load().find(x => x.id == id);
    const f = document.querySelector("form");
    if (!c || !f) return;
    f.title.value = c.name;
    f.phone.value = c.phone;
    f.experience.value = c.experience;
    f.addEventListener("submit", e => {
      e.preventDefault();
      update(id, {
        name: f.title.value.trim(),
        phone: f.phone.value.trim(),
        experience: Number(f.experience.value)
      });
      location.href = "contacts.html";
    });
  }
})();
