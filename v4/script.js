const photoPath = {
  Natura: "webp_photo/nature/",
  Miasta: "webp_photo/city/",
  Motoryzacja: "webp_photo/cars/"
};

function createPhoto(id, title, category, filename) {
  return {
    id,
    title,
    category,
    image: photoPath[category] + filename
  };
}

const photos = [
  createPhoto(1, "Zachód słońca", "Natura", "nature001.webp"),
  createPhoto(2, "Ślady chwil", "Natura", "nature002.webp"),
  createPhoto(3, "Delikatność istnienia", "Natura", "nature003.webp"),
  createPhoto(4, "Zapisane w ciszy", "Natura", "nature004.webp"),
  createPhoto(5, "Między światłem a cieniem", "Natura", "nature005.webp"),
  createPhoto(6, "Zatrzymane na moment", "Natura", "nature006.webp"),
  createPhoto(7, "Tam, gdzie płynie czas", "Natura", "nature007.webp"),
  createPhoto(8, "Nieuchwytne piękno", "Natura", "nature008.webp"),
  createPhoto(9, "W rytmie świata", "Natura", "nature009.webp"),
  createPhoto(10, "Historie bez słów", "Natura", "nature010.webp"),
  createPhoto(11, "Wszystko przemija, coś pozostaje", "Natura", "nature011.webp"),
  createPhoto(12, "Oddech", "Natura", "nature012.webp"),
  createPhoto(13, "W swoim rytmie", "Natura", "nature013.webp"),
  createPhoto(14, "Poza czasem", "Natura", "nature014.webp"),

  createPhoto(15, "Timeless", "Motoryzacja", "cars001.webp"),
  createPhoto(16, "Adrenaline", "Motoryzacja", "cars002.webp"),
  createPhoto(17, "Własny kierunek", "Motoryzacja", "cars003.webp"),
  createPhoto(18, "Wolność ma swój wymiar", "Motoryzacja", "cars004.webp"),
  createPhoto(19, "Każdy ma swoją drogę", "Motoryzacja", "cars005.webp"),
  createPhoto(20, "Emocje zapisane w ruchu", "Motoryzacja", "cars006.webp"),
  createPhoto(21, "Charakter", "Motoryzacja", "cars007.webp"),
  createPhoto(22, "Nieuchwytność", "Motoryzacja", "cars008.webp"),
  createPhoto(23, "Niepowtarzalny styl", "Motoryzacja", "cars009.webp"),
  createPhoto(24, "Chwila przed startem", "Motoryzacja", "cars010.webp"),
  createPhoto(25, "W rytmie silnika", "Motoryzacja", "cars011.webp"),
  createPhoto(26, "Stworzone z charakterem", "Motoryzacja", "cars012.webp"),
  createPhoto(27, "Wolność wyboru", "Motoryzacja", "cars013.webp"),
  createPhoto(28, "Nieznany kierunek", "Motoryzacja", "cars014.webp"),


  createPhoto(29, "Perspektywa", "Miasta", "city001.webp"),
  createPhoto(30, "Metropolia", "Miasta", "city002.webp"),
  createPhoto(31, "Ślady", "Miasta", "city003.webp"),
  createPhoto(32, "Horyzont", "Miasta", "city004.webp"),
  createPhoto(33, "Cienie przeszłości", "Miasta", "city005.webp"),
  createPhoto(34, "Światło codzienności", "Miasta", "city006.webp"),
  createPhoto(35, "Architektura wspomnień", "Miasta", "city007.webp"),
  createPhoto(36, "Nieuchwytna atmosfera", "Miasta", "city008.webp"),
  createPhoto(37, "Gra kontrastów", "Miasta", "city009.webp"),
  createPhoto(38, "Nowy wymiar", "Miasta", "city010.webp"),
  createPhoto(39, "Detale mają znaczenie", "Miasta", "city011.webp"),
  createPhoto(40, "Forma i przestrzeń", "Miasta", "city012.webp"),
  createPhoto(41, "Gdy wszystko zwalnia", "Miasta", "city013.webp"),
  createPhoto(42, "Pośpiech", "Miasta", "city014.webp"),

];

  const gallery = document.getElementById("gallery");
  const search = document.getElementById("search");
  const sort = document.getElementById("sort");
  const count = document.getElementById("count");
  const empty = document.getElementById("empty");
  const modal = document.getElementById("modal");

  let activeCategory = "Wszystkie";

  function renderGallery() {
    const query = search.value.toLowerCase();

    let filtered = photos.filter(photo => {
      const matchesCategory =
        activeCategory === "Wszystkie" ||
        photo.category === activeCategory;

      const matchesSearch =
        photo.title.toLowerCase().includes(query) ||
        photo.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    if (sort.value === "asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort.value === "desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    gallery.innerHTML = filtered.map(photo => `
      <article class="photo" tabindex="0" role="button"
        data-id="${photo.id}"
        aria-label="Otwórz ${photo.title}">
        <img class="photo-image" src="${photo.image}" alt="${photo.title}" loading="lazy">
        <h3>${photo.title}</h3>
        <p>${photo.category}</p>
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

  const modalImage = document.getElementById("modalImage");
  modalImage.src = photo.image;
  modalImage.alt = photo.title;

  modal.classList.add("open");
  document.getElementById("close").focus();
}

  
  gallery.addEventListener("click", event => {
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

  renderGallery();