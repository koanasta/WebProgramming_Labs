(() => {
  const LS_KEY = "relationz_contacts_v1";

  const load = () => JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  const save = (arr) => localStorage.setItem(LS_KEY, JSON.stringify(arr));


  const showModal = (message) => {
  let modal = document.querySelector(".modal-warning");
  if (!modal) {
    modal = document.createElement("div");
    modal.className = "modal-warning";
    modal.innerHTML = `
      <div class="modal-warning__content">
        <p class="modal-warning__text"></p>
        <button class="modal-warning__btn">OK</button>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector(".modal-warning__btn").addEventListener("click", () => {
      modal.remove();
    });
  }
  modal.querySelector(".modal-warning__text").textContent = message;
  modal.style.display = "flex";
};


 
  function validateInputs(name, phone, exp) {
    const phonePattern = /^[+]?[0-9\s()-]{7,15}$/;
    if (!name.match(/^[a-zA-Zа-яА-ЯїЇєЄіІ\s]+$/)) {
      showModal("Name must contain only letters!");
      return false;
    }
    if (!phonePattern.test(phone)) {
      showModal("Phone number is invalid!");
      return false;
    }
    if (isNaN(exp) || exp < 0) {
      showModal("Experience must be a positive number!");
      return false;
    }
    return true;
  }


  function render({ search = "" } = {}) {
    const list = document.querySelector(".contacts__list");
    if (!list) return;

    let contacts = load();
    const sort = document.querySelector("#sortByExperience")?.checked;
    if (search) {
      const s = search.toLowerCase();
      contacts = contacts.filter(c =>
        c.name.toLowerCase().includes(s) || c.phone.includes(s)
      );
    }
    if (sort) contacts.sort((a, b) => b.experience - a.experience);

    list.innerHTML = contacts.length
      ? contacts
          .map(
            (c) => `
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
        </li>`
          )
          .join("")
      : `<p style="padding:16px;">No contacts yet.</p>`;

    const total = document.querySelector(".controls__total-value");
    if (total) total.textContent = contacts.length;
  }

  const add = (d) => {
    const c = load();
    c.push({ id: Date.now(), ...d });
    save(c);
  };
  const del = (id) => {
    save(load().filter((c) => c.id != id));
  };
  const update = (id, d) => {
    const c = load();
    const i = c.findIndex((x) => x.id == id);
    if (i > -1) {
      c[i] = { ...c[i], ...d };
      save(c);
    }
  };


  if (location.pathname.endsWith("contacts.html")) {
    render();

    document.querySelector(".contacts__list")?.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      if (e.target.classList.contains("del")) {
        del(id);
        render();
      }
      if (e.target.classList.contains("edit"))
        location.href = `edit-contact.html?id=${id}`;
    });

    document
      .querySelector(".header__search-form")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        const val = e.target.querySelector("input").value;
        render({ search: val });
      });

    document
      .querySelector(".search-form__button--reset")
      ?.addEventListener("click", () => render());
    document
      .querySelector("#sortByExperience")
      ?.addEventListener("change", () => render());
    document.querySelector(".controls__button")?.addEventListener("click", () =>
      alert("Total contacts: " + load().length)
    );
  }


  if (location.pathname.endsWith("add-contact.html")) {
    document.querySelector("form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = e.target.title.value.trim();
      const phone = e.target.phone.value.trim();
      const exp = Number(e.target.experience.value) || 0;

      if (!name || !phone) return showModal("All fields are required!");
      if (!validateInputs(name, phone, exp)) return;

      add({ name, phone, experience: exp });
      location.href = "contacts.html";
    });
  }

 
  if (location.pathname.endsWith("edit-contact.html")) {
    const id = new URLSearchParams(location.search).get("id");
    const c = load().find((x) => x.id == id);
    const f = document.querySelector("form");
    if (!c || !f) return;

    f.title.value = c.name;
    f.phone.value = c.phone;
    f.experience.value = c.experience;

    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = f.title.value.trim();
      const phone = f.phone.value.trim();
      const exp = Number(f.experience.value);

      if (!name || !phone) return showModal("All fields are required!");
      if (!validateInputs(name, phone, exp)) return;

      update(id, { name, phone, experience: exp });
      location.href = "contacts.html";
    });
  }
})();
