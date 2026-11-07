const photoPath = {
  Natura: "photo/nature/",
  Miasta: "photo/city/",
  Motoryzacja: "photo/cars/"
};

function createPhoto(id, title, category, filename, date, tags) {
  return {
    id,
    title,
    category,
    date,
    tags,
    image: photoPath[category] + filename
  };
}

const photos = [
  createPhoto(1, "Zachód słońca", "Natura", "nature001.jpg", "2026-09-12", ["las", "światło"]),
  createPhoto(2, "Ślady chwil", "Natura", "nature002.jpg", "2026-07-05", ["las", "jesień"]),
  createPhoto(3, "Delikatność istnienia", "Natura", "nature003.jpg", "2025-01-15", ["woda", "z lotu ptaka"]),
  createPhoto(4, "Zapisane w ciszy", "Natura", "nature004.jpg", "2025-09-21", ["góry", "światło"]),
  createPhoto(5, "Między światłem a cieniem", "Natura", "nature005.jpg", "2026-02-19", ["góry"]),
  createPhoto(6, "Zatrzymane na moment", "Natura", "nature006.jpg", "2026-06-01", ["las", "woda"]),
  createPhoto(7, "Tam, gdzie płynie czas", "Natura", "nature007.jpg", "2026-04-30", ["las", "woda"]),
  createPhoto(8, "Nieuchwytne piękno", "Natura", "nature008.jpg", "2026-01-02", ["droga"]),
  createPhoto(9, "W rytmie świata", "Natura", "nature009.jpg", "2025-01-27", ["las", "góry"]),
  createPhoto(10, "Historie bez słów", "Natura", "nature010.jpg", "2026-06-25", ["woda", "zwierzęta"]),
  createPhoto(11, "Wszystko przemija, coś pozostaje", "Natura", "nature011.jpg", "2026-03-23", ["zachód słońca", "woda"]),
  createPhoto(12, "Oddech", "Natura", "nature012.jpg", "2026-04-20", ["zwierzęta", "woda"]),
  createPhoto(13, "W swoim rytmie", "Natura", "nature013.jpg", "2026-10-26", ["kwiaty"]),
  createPhoto(14, "Poza czasem", "Natura", "nature014.jpg", "2026-04-07", ["zwierzęta"]),
  createPhoto(15, "Timeless", "Motoryzacja", "cars001.jpg", "2025-05-25", ["klasyk"]),
  createPhoto(16, "Adrenaline", "Motoryzacja", "cars002.jpg", "2025-11-29", ["sportowy"]),
  createPhoto(17, "Własny kierunek", "Motoryzacja", "cars003.jpg", "2025-02-16", ["ulica"]),
  createPhoto(18, "Wolność ma swój wymiar", "Motoryzacja", "cars004.jpg", "2025-11-15", ["klasyk"]),
  createPhoto(19, "Każdy ma swoją drogę", "Motoryzacja", "cars005.jpg", "2025-04-07", ["sportowy"]),
  createPhoto(20, "Emocje zapisane w ruchu", "Motoryzacja", "cars006.jpg", "2025-05-05", ["sportowy"]),
  createPhoto(21, "Charakter", "Motoryzacja", "cars007.jpg", "2025-06-01", ["sportowy"]),
  createPhoto(22, "Nieuchwytność", "Motoryzacja", "cars008.jpg", "2026-10-15", ["parking"]),
  createPhoto(23, "Niepowtarzalny styl", "Motoryzacja", "cars009.jpg", "2026-02-26", ["sedan"]),
  createPhoto(24, "Chwila przed startem", "Motoryzacja", "cars010.jpg", "2025-10-23", ["parking"]),
  createPhoto(25, "W rytmie silnika", "Motoryzacja", "cars011.jpg", "2025-08-25", ["sedan"]),
  createPhoto(26, "Stworzone z charakterem", "Motoryzacja", "cars012.jpg", "2025-06-25", ["klasyk", "ulica"]),
  createPhoto(27, "Wolność wyboru", "Motoryzacja", "cars013.jpg", "2026-01-28", ["sedan", "noc"]),
  createPhoto(28, "Nieznany kierunek", "Motoryzacja", "cars014.jpg", "2026-05-19", ["sportowy", "ulica"]),
  createPhoto(29, "Perspektywa", "Miasta", "city001.jpg", "2025-10-09", ["wieżowce", "noc", "z lotu ptaka"]),
  createPhoto(30, "Metropolia", "Miasta", "city002.jpg", "2025-12-08", ["wieżowce", "noc", "ruch uliczny"]),
  createPhoto(31, "Ślady", "Miasta", "city003.jpg", "2025-09-10", ["wieżowce"]),
  createPhoto(32, "Horyzont", "Miasta", "city004.jpg", "2025-08-05", ["noc", "ruch uliczny", "z lotu ptaka"]),
  createPhoto(33, "Cienie przeszłości", "Miasta", "city005.jpg", "2025-02-26", ["z lotu ptaka", "światło"]),
  createPhoto(34, "Światło codzienności", "Miasta", "city006.jpg", "2025-03-15", ["wieżowce", "noc", "odbicia"]),
  createPhoto(35, "Architektura wspomnień", "Miasta", "city007.jpg", "2026-09-21", ["wieżowce", "odbicia"]),
  createPhoto(36, "Nieuchwytna atmosfera", "Miasta", "city008.jpg", "2026-01-10", ["wieżowce", "ruch uliczny"]),
  createPhoto(37, "Gra kontrastów", "Miasta", "city009.jpg", "2025-07-19", ["wieżowce", "światło"]),
  createPhoto(38, "Nowy wymiar", "Miasta", "city010.jpg", "2026-08-09", ["wieżowce", "światło"]),
  createPhoto(39, "Detale mają znaczenie", "Miasta", "city011.jpg", "2026-08-21", ["z lotu ptaka"]),
  createPhoto(40, "Forma i przestrzeń", "Miasta", "city012.jpg", "2025-04-16", ["wieżowce", "z lotu ptaka"]),
  createPhoto(41, "Gdy wszystko zwalnia", "Miasta", "city013.jpg", "2025-07-06", ["z lotu ptaka"]),
  createPhoto(42, "Pośpiech", "Miasta", "city014.jpg", "2026-07-22", ["noc", "ruch uliczny", "z lotu ptaka"]),
 ];

  const gallery = document.getElementById("gallery");
  const search = document.getElementById("search");
  const sort = document.getElementById("sort");
  const count = document.getElementById("count");
  const empty = document.getElementById("empty");
  const modal = document.getElementById("modal");
  const tagFilters = document.getElementById("tagFilters");


  let activeCategory = "Wszystkie";
  let activeTag = null;

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  function renderTagFilters() {
    const allTags = [...new Set(photos.flatMap(photo => photo.tags))]
      .sort((a, b) => a.localeCompare(b, "pl"));
 
    tagFilters.innerHTML = allTags.map(tag => `
      <button class="tag-filter${tag === activeTag ? " active" : ""}"
        data-tag="${tag}">#${tag}</button>
    `).join("");
  }
 
  function setTag(tag) {
    activeTag = activeTag === tag ? null : tag;
    renderTagFilters();
    renderGallery();
  }

  function renderGallery() {
    const query = search.value.toLowerCase();

    let filtered = photos.filter(photo => {
      const matchesCategory =
        activeCategory === "Wszystkie" ||
        photo.category === activeCategory;

       const matchesTag =
        activeTag === null || photo.tags.includes(activeTag);

      const matchesSearch =
        photo.title.toLowerCase().includes(query) ||
        photo.category.toLowerCase().includes(query);

      return matchesCategory && matchesTag && matchesSearch;
    });

    if (sort.value === "asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort.value === "desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort.value === "newest") {
      filtered.sort((a, b) => b.date.localeCompare(a.date));
    } else if (sort.value === "oldest") {
      filtered.sort((a, b) => a.date.localeCompare(b.date));
    }

    gallery.innerHTML = filtered.map(photo => `
      <article class="photo" tabindex="0" role="button"
        data-id="${photo.id}"
        aria-label="Otwórz ${photo.title}">
        <img class="photo-image" src="${photo.image}" alt="${photo.title}">
        <h3>${photo.title}</h3>
        <p>${photo.category}</p> · ${formatDate(photo.date)}</p>
        <div class="tags">
          ${photo.tags.map(tag => `<span class="tag" data-tag="${tag}">#${tag}</span>`).join("")}
        </div>
      </article>
    `).join("");

    count.textContent = `Wyświetlono ${filtered.length} z ${photos.length} zdjęć`;
    empty.style.display = filtered.length ? "none" : "block";
  }

  function setCategory(category) {
    activeCategory = category;

    document.querySelectorAll("[data-category]").forEach(el => {
      el.classList.toggle(
        "active",
        el.dataset.category === category
      );
    });

    renderGallery();
  }

  document.querySelectorAll("[data-category]").forEach(el => {
    el.addEventListener("click", event => {
      event.preventDefault();
      setCategory(el.dataset.category);
    });
  });

  search.addEventListener("input", renderGallery);
  sort.addEventListener("change", renderGallery);

  function openPhoto(id) {
  const photo = photos.find(item => item.id === Number(id));
  if (!photo) return;

  document.getElementById("modalTitle").textContent = photo.title;
  document.getElementById("modalCategory").textContent = photo.category;
  document.getElementById("modalDate").textContent = formatDate(photo.date);
  document.getElementById("modalTags").textContent =
    photo.tags.map(tag => "#" + tag).join("  ");

  const modalImage = document.getElementById("modalImage");
  modalImage.src = photo.image;
  modalImage.alt = photo.title;

  modal.classList.add("open");
  document.getElementById("close").focus();
}

  tagFilters.addEventListener("click", event => {
    const button = event.target.closest("[data-tag]");
    if (button) setTag(button.dataset.tag);
  });

  gallery.addEventListener("click", event => {
    const tagEl = event.target.closest(".tag");
    if (tagEl) {
      setTag(tagEl.dataset.tag);
      return;
    }
 
    const card = event.target.closest(".photo");

    if (!card) return;

    const id = Number(card.dataset.id);
    openPhoto(id);
  });

  gallery.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      const photo = event.target.closest(".photo");
      if (photo) {
        event.preventDefault();
        openPhoto(photo.dataset.id);
      }
    }
  });

  function closeModal() {
    modal.classList.remove("open");
  }

  document.getElementById("close").addEventListener("click", closeModal);

  modal.addEventListener("click", event => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
  });

  renderTagFilters()
  renderGallery();
