const SIGNED_IN_KEY = "netflixCloneSignedIn";
const ACTIVE_PROFILE_KEY = "netflixCloneActiveProfile";
const DEMO_VIDEO_URL = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const trendingMovies = [
  {
    id: "lock-upp",
    title: "Lock Upp",
    category: "Reality Series",
    description: "A bold reality showdown with high-stakes drama, fast twists, and a headline-making host.",
    image: "img/tab-content-2-1.png",
    tint: "linear-gradient(180deg, rgba(108, 0, 18, 0.08), rgba(108, 0, 18, 0.65))",
    video: DEMO_VIDEO_URL
  },
  {
    id: "summerslam",
    title: "SummerSlam",
    category: "Live Event",
    description: "A massive stadium event packed with face-offs, entrances, and championship moments.",
    image: "img/background.jpg",
    tint: "linear-gradient(180deg, rgba(28, 12, 0, 0.08), rgba(28, 12, 0, 0.65))",
    video: DEMO_VIDEO_URL
  },
  {
    id: "musafir-cafe",
    title: "Musafir Cafe",
    category: "Romantic Drama",
    description: "A warm travel romance about friendships, family ties, and finding home on the road.",
    image: "img/tab-content-2-2.png",
    tint: "linear-gradient(180deg, rgba(71, 40, 0, 0.08), rgba(71, 40, 0, 0.58))",
    video: DEMO_VIDEO_URL
  },
  {
    id: "ikka",
    title: "Ikka",
    category: "Courtroom Thriller",
    description: "A layered legal thriller where every statement shifts the case in a new direction.",
    image: "img/tab-content-2-3.png",
    tint: "linear-gradient(180deg, rgba(30, 22, 8, 0.08), rgba(30, 22, 8, 0.7))",
    video: DEMO_VIDEO_URL
  },
  {
    id: "peddi",
    title: "Peddi",
    category: "Action Drama",
    description: "A high-energy rural action story driven by rebellion, swagger, and a huge crowd pull.",
    image: "img/background.jpg",
    tint: "linear-gradient(180deg, rgba(94, 42, 0, 0.08), rgba(94, 42, 0, 0.58))",
    video: DEMO_VIDEO_URL
  },
  {
    id: "veerangana",
    title: "Veerangana",
    category: "Crime Thriller",
    description: "A sharp-edged thriller led by a fearless central character and a dangerous chase.",
    image: "img/tab-content-2-1.png",
    tint: "linear-gradient(180deg, rgba(91, 0, 0, 0.08), rgba(91, 0, 0, 0.62))",
    video: DEMO_VIDEO_URL
  }
];

const myListItems = [
  {
    title: "Continue Watching",
    detail: "Episode 6 ready",
    image: "img/tab-content-2-1.png"
  },
  {
    title: "Offline Downloads",
    detail: "4 titles saved",
    image: "img/tab-content-2-2.png"
  },
  {
    title: "New on Netflix",
    detail: "Fresh picks tonight",
    image: "img/tab-content-2-3.png"
  },
  {
    title: "Top 10 in India",
    detail: "Updated daily",
    image: "img/background.jpg"
  }
];

const trendingContainer = document.getElementById("trending-cards");
const myListContainer = document.getElementById("mylist-grid");
const watchListContainer = document.getElementById("watch-list");
const profileLink = document.getElementById("profile-link");
const searchButton = document.getElementById("search-button");
const searchWrapper = document.getElementById("search-wrapper");
const searchInput = document.getElementById("search-input");
const signinButton = document.getElementById("signin-button");
const signinModal = document.getElementById("signin-modal");
const closeModalButton = document.getElementById("close-modal");
const signinForm = document.getElementById("signin-form");
const signinStatus = document.getElementById("signin-status");
const profileIcons = document.getElementById("profile-icons");
const settingsPanel = document.getElementById("settings-panel");
const profileActionNote = document.getElementById("profile-action-note");
const activeProfileName = document.getElementById("active-profile-name");
const watchProfileName = document.getElementById("watch-profile-name");
const watchProfileAvatar = document.getElementById("watch-profile-avatar");
const watchTitle = document.getElementById("watch-title");
const watchCategory = document.getElementById("watch-category");
const watchDescription = document.getElementById("watch-description");
const featuredVideo = document.getElementById("featured-video");
const heroPlayButton = document.getElementById("hero-play-button");
const videoOverlayButton = document.getElementById("video-overlay-button");
const playToggle = document.getElementById("play-toggle");
const rewindButton = document.getElementById("rewind-button");
const muteButton = document.getElementById("mute-button");
const fullscreenButton = document.getElementById("fullscreen-button");
const videoProgress = document.getElementById("video-progress");
const currentTimeLabel = document.getElementById("current-time");
const durationTimeLabel = document.getElementById("duration-time");
const isProfilePage = window.location.pathname.endsWith("profile.html");
const isWatchPage = window.location.pathname.endsWith("watch.html");

const profileThemes = {
  Aisha: { initial: "A", color: "yellow" },
  Rahul: { initial: "R", color: "red" },
  Kids: { initial: "K", color: "blue" },
  Guest: { initial: "G", color: "green" }
};

function getSigninState() {
  return localStorage.getItem(SIGNED_IN_KEY) === "true";
}

function setSigninState(isSignedIn) {
  localStorage.setItem(SIGNED_IN_KEY, String(isSignedIn));
}

function getActiveProfile() {
  return localStorage.getItem(ACTIVE_PROFILE_KEY) || "Aisha";
}

function setActiveProfile(profileName) {
  localStorage.setItem(ACTIVE_PROFILE_KEY, profileName);
}

function syncAuthUi() {
  const isSignedIn = getSigninState();

  if (profileLink) {
    profileLink.classList.toggle("hidden", !isSignedIn);
  }

  if (signinButton) {
    signinButton.textContent = isSignedIn ? "Profile" : "Sign In";
    signinButton.dataset.signedIn = String(isSignedIn);
  }
}

function applyProfileUi(profileName) {
  const theme = profileThemes[profileName] || profileThemes.Aisha;

  if (activeProfileName) {
    activeProfileName.textContent = profileName;
  }

  if (watchProfileName) {
    watchProfileName.textContent = profileName;
  }

  if (watchProfileAvatar) {
    watchProfileAvatar.textContent = theme.initial;
    watchProfileAvatar.className = `watch-profile-avatar ${theme.color}`;
  }

  document.querySelectorAll(".profile-avatar").forEach((avatar) => {
    avatar.classList.toggle("selected", avatar.dataset.profile === profileName);
  });
}

function protectProfilePage() {
  if (isProfilePage && !getSigninState()) {
    window.location.href = "index.html";
  }
}

function renderTrending(list = trendingMovies) {
  if (!trendingContainer) return;

  trendingContainer.innerHTML = "";

  if (!list.length) {
    const query = searchInput ? searchInput.value.trim() : "";
    trendingContainer.innerHTML = `<div class="empty-state">No titles found for "${query}".</div>`;
    return;
  }

  list.forEach((item, index) => {
    const card = document.createElement("a");
    card.className = "card card-link";
    card.href = `watch.html?id=${encodeURIComponent(item.id)}`;
    card.innerHTML = `
      <span class="card-rank" aria-hidden="true">${index + 1}</span>
      <div class="card-poster-shell">
        <div class="card-media" style="background-image: ${item.tint}, url('${item.image}')" role="img" aria-label="${item.title}"></div>
        <div class="card-banner">
          <p class="card-badge">N</p>
          <h3 class="card-title">${item.title}</h3>
          <p class="card-meta">${item.category}</p>
        </div>
      </div>
    `;
    trendingContainer.appendChild(card);
  });
}

function renderMyList() {
  if (!myListContainer) return;

  myListContainer.innerHTML = "";

  myListItems.forEach((item) => {
    const card = document.createElement("article");
    card.className = "mylist-item";
    card.innerHTML = `
      <div class="mylist-media" style="background-image: url('${item.image}')" role="img" aria-label="${item.title}"></div>
      <div class="mylist-banner">
        <p class="mylist-detail">${item.detail}</p>
        <h3 class="mylist-title">${item.title}</h3>
      </div>
    `;
    myListContainer.appendChild(card);
  });
}

function toggleSearch() {
  if (!searchWrapper || !searchInput) return;

  searchWrapper.classList.toggle("hidden");
  if (!searchWrapper.classList.contains("hidden")) {
    searchInput.focus();
  }
}

function handleSearch(event) {
  const query = event.target.value.toLowerCase().trim();
  const filtered = trendingMovies.filter(
    (item) =>
      item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
  );
  renderTrending(filtered);
}

function openModal() {
  if (getSigninState()) {
    window.location.href = "profile.html";
    return;
  }

  if (!signinModal || !signinStatus) return;

  signinModal.classList.remove("hidden");
  signinStatus.textContent = "";
}

function closeModal() {
  if (!signinModal || !signinForm) return;

  signinModal.classList.add("hidden");
  signinForm.reset();
}

function handleSignin(event) {
  event.preventDefault();

  const emailField = document.getElementById("signin-email");
  const passwordField = document.getElementById("signin-password");
  const email = emailField ? emailField.value.trim() : "";
  const password = passwordField ? passwordField.value.trim() : "";

  if (!email || !password) {
    if (signinStatus) {
      signinStatus.textContent = "Please enter both email and password.";
    }
    return;
  }

  setSigninState(true);
  syncAuthUi();

  if (signinStatus) {
    signinStatus.textContent = "Signed in successfully!";
  }

  setTimeout(() => {
    closeModal();
    window.location.href = "profile.html";
  }, 700);
}

function handleProfileClick(event) {
  const targetAvatar = event.target.closest(".profile-avatar");
  if (!targetAvatar) return;

  setActiveProfile(targetAvatar.dataset.profile);
  applyProfileUi(targetAvatar.dataset.profile);

  if (settingsPanel) {
    settingsPanel.classList.remove("hidden");
  }

  if (profileActionNote) {
    profileActionNote.textContent = `${targetAvatar.dataset.profile} profile selected. Settings are now visible.`;
  }
}

function getSelectedMovie() {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");
  return trendingMovies.find((item) => item.id === movieId) || trendingMovies[0];
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function updateProgress() {
  if (!featuredVideo || !videoProgress) return;
  const progress = featuredVideo.duration ? (featuredVideo.currentTime / featuredVideo.duration) * 100 : 0;
  videoProgress.value = progress;
  if (currentTimeLabel) currentTimeLabel.textContent = formatTime(featuredVideo.currentTime);
}

function syncPlayButtons() {
  if (!featuredVideo) return;
  const isPaused = featuredVideo.paused;
  if (playToggle) playToggle.textContent = isPaused ? "Play" : "Pause";
  if (heroPlayButton) heroPlayButton.textContent = isPaused ? "Play" : "Pause";
  if (videoOverlayButton) videoOverlayButton.classList.toggle("hidden", !isPaused);
  if (videoOverlayButton) videoOverlayButton.textContent = "Play";
}

function syncMuteButton() {
  if (!featuredVideo || !muteButton) return;
  muteButton.textContent = featuredVideo.muted ? "Unmute" : "Mute";
}

function togglePlayback() {
  if (!featuredVideo) return;
  if (featuredVideo.paused) {
    featuredVideo.play();
  } else {
    featuredVideo.pause();
  }
}

function openFullscreen() {
  if (!featuredVideo) return;
  if (document.fullscreenElement) {
    document.exitFullscreen();
    return;
  }
  featuredVideo.requestFullscreen();
}

function renderWatchList(selectedMovie) {
  if (!watchListContainer) return;

  watchListContainer.innerHTML = "";

  trendingMovies.forEach((item) => {
    const link = document.createElement("a");
    link.className = `watch-list-item${item.id === selectedMovie.id ? " active" : ""}`;
    link.href = `watch.html?id=${encodeURIComponent(item.id)}`;
    link.innerHTML = `
      <div class="watch-list-thumb" style="background-image: url('${item.image}')"></div>
      <div>
        <p class="watch-list-category">${item.category}</p>
        <h3>${item.title}</h3>
      </div>
    `;
    watchListContainer.appendChild(link);
  });
}

function setupWatchPage() {
  if (!isWatchPage || !featuredVideo) return;

  const movie = getSelectedMovie();

  if (watchTitle) watchTitle.textContent = movie.title;
  if (watchCategory) watchCategory.textContent = movie.category;
  if (watchDescription) watchDescription.textContent = movie.description;

  featuredVideo.poster = movie.image;
  featuredVideo.src = movie.video;
  featuredVideo.load();

  renderWatchList(movie);
  syncPlayButtons();
  syncMuteButton();

  featuredVideo.addEventListener("loadedmetadata", () => {
    if (durationTimeLabel) durationTimeLabel.textContent = formatTime(featuredVideo.duration);
    updateProgress();
  });

  featuredVideo.addEventListener("timeupdate", updateProgress);
  featuredVideo.addEventListener("play", syncPlayButtons);
  featuredVideo.addEventListener("pause", syncPlayButtons);
  featuredVideo.addEventListener("volumechange", syncMuteButton);
  featuredVideo.addEventListener("ended", syncPlayButtons);

  if (heroPlayButton) heroPlayButton.addEventListener("click", togglePlayback);
  if (videoOverlayButton) videoOverlayButton.addEventListener("click", togglePlayback);
  if (playToggle) playToggle.addEventListener("click", togglePlayback);

  if (rewindButton) {
    rewindButton.addEventListener("click", () => {
      featuredVideo.currentTime = Math.max(0, featuredVideo.currentTime - 10);
    });
  }

  if (muteButton) {
    muteButton.addEventListener("click", () => {
      featuredVideo.muted = !featuredVideo.muted;
    });
  }

  if (fullscreenButton) {
    fullscreenButton.addEventListener("click", openFullscreen);
  }

  if (videoProgress) {
    videoProgress.addEventListener("input", () => {
      if (!featuredVideo.duration) return;
      featuredVideo.currentTime = (Number(videoProgress.value) / 100) * featuredVideo.duration;
    });
  }
}

protectProfilePage();
syncAuthUi();
applyProfileUi(getActiveProfile());

if (searchButton) {
  searchButton.addEventListener("click", toggleSearch);
}

if (searchInput) {
  searchInput.addEventListener("input", handleSearch);
}

if (signinButton) {
  signinButton.addEventListener("click", openModal);
}

if (closeModalButton) {
  closeModalButton.addEventListener("click", closeModal);
}

if (signinForm) {
  signinForm.addEventListener("submit", handleSignin);
}

if (signinModal) {
  window.addEventListener("click", (event) => {
    if (event.target === signinModal) {
      closeModal();
    }
  });
}

if (profileIcons) {
  profileIcons.addEventListener("click", handleProfileClick);
}

renderTrending();
renderMyList();
setupWatchPage();
