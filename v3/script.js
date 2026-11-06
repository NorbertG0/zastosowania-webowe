const photoPath = {
  Natura: "photo/nature/",
  Miasta: "photo/city/",
  Motoryzacja: "photo/cars/"
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
createPhoto(1, "Zachód słońca", "Natura", "nature001.jpg"),
  createPhoto(2, "Ślady chwil", "Natura", "nature002.jpg"),
  createPhoto(3, "Delikatność istnienia", "Natura", "nature003.jpg"),
  createPhoto(4, "Zapisane w ciszy", "Natura", "nature004.jpg"),
  createPhoto(5, "Między światłem a cieniem", "Natura", "nature005.jpg"),
  createPhoto(6, "Zatrzymane na moment", "Natura", "nature006.jpg"),
  createPhoto(7, "Tam, gdzie płynie czas", "Natura", "nature007.jpg"),
  createPhoto(8, "Nieuchwytne piękno", "Natura", "nature008.jpg"),
  createPhoto(9, "W rytmie świata", "Natura", "nature009.jpg"),
  createPhoto(10, "Historie bez słów", "Natura", "nature010.jpg"),
  createPhoto(11, "Wszystko przemija, coś pozostaje", "Natura", "nature011.jpg"),
  createPhoto(12, "Oddech", "Natura", "nature012.jpg"),
  createPhoto(13, "W swoim rytmie", "Natura", "nature013.jpg"),
  createPhoto(14, "Poza czasem", "Natura", "nature014.jpg"),

  createPhoto(15, "Timeless", "Motoryzacja", "cars001.jpg"),
  createPhoto(16, "Adrenaline", "Motoryzacja", "cars002.jpg"),
  createPhoto(17, "Własny kierunek", "Motoryzacja", "cars003.jpg"),
  createPhoto(18, "Wolność ma swój wymiar", "Motoryzacja", "cars004.jpg"),
  createPhoto(19, "Każdy ma swoją drogę", "Motoryzacja", "cars005.jpg"),
  createPhoto(20, "Emocje zapisane w ruchu", "Motoryzacja", "cars006.jpg"),
  createPhoto(21, "Charakter", "Motoryzacja", "cars007.jpg"),
  createPhoto(22, "Nieuchwytność", "Motoryzacja", "cars008.jpg"),
  createPhoto(23, "Niepowtarzalny styl", "Motoryzacja", "cars009.jpg"),
  createPhoto(24, "Chwila przed startem", "Motoryzacja", "cars010.jpg"),
  createPhoto(25, "W rytmie silnika", "Motoryzacja", "cars011.jpg"),
  createPhoto(26, "Stworzone z charakterem", "Motoryzacja", "cars012.jpg"),
  createPhoto(27, "Wolność wyboru", "Motoryzacja", "cars013.jpg"),
  createPhoto(28, "Nieznany kierunek", "Motoryzacja", "cars014.jpg"),


  createPhoto(29, "Perspektywa", "Miasta", "city001.jpg"),
  createPhoto(30, "Metropolia", "Miasta", "city002.jpg"),
  createPhoto(31, "Ślady", "Miasta", "city003.jpg"),
  createPhoto(32, "Horyzont", "Miasta", "city004.jpg"),
  createPhoto(33, "Cienie przeszłości", "Miasta", "city005.jpg"),
  createPhoto(34, "Światło codzienności", "Miasta", "city006.jpg"),
  createPhoto(35, "Architektura wspomnień", "Miasta", "city007.jpg"),
  createPhoto(36, "Nieuchwytna atmosfera", "Miasta", "city008.jpg"),
  createPhoto(37, "Gra kontrastów", "Miasta", "city009.jpg"),
  createPhoto(38, "Nowy wymiar", "Miasta", "city010.jpg"),
  createPhoto(39, "Detale mają znaczenie", "Miasta", "city011.jpg"),
  createPhoto(40, "Forma i przestrzeń", "Miasta", "city012.jpg"),
  createPhoto(41, "Gdy wszystko zwalnia", "Miasta", "city013.jpg"),
  createPhoto(42, "Pośpiech", "Miasta", "city014.jpg"),

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
        <img class="photo-image" src="${photo.image}" alt="${photo.title}">
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