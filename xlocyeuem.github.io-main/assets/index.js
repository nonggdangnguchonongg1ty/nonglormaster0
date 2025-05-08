const slides = document.querySelectorAll('.slide');
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

// Cuộn chuột
let scrollTimeout;
window.addEventListener('wheel', (e) => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    if (e.deltaY > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }, 100);
});

// Vuốt trên điện thoại
let startY = 0;
window.addEventListener('touchstart', (e) => {
  startY = e.touches[0].clientY;
});

window.addEventListener('touchend', (e) => {
  const endY = e.changedTouches[0].clientY;
  if (startY - endY > 50) nextSlide();  // Vuốt lên
  else if (endY - startY > 50) prevSlide();  // Vuốt xuống
});

showSlide(current);

// Type Effect
console.log("Coded by xlocyeuem — All rights reserved");
console.log("https://xlocyeuem.github.io");

const typingText = document.getElementById("typing-text");
const sentences = [
  "...",
  "Nhận code theo yêu cầu.",
  "Coder by xlocyeuem — All rights reserved",
  "Spotify mood: chill, deep & đáng yêu ~ "
];

let sentenceIndex = 0;
let charIndex = 0;
let isDeleting = false;
let speed = 100;

function typeEffect() {
  const currentSentence = sentences[sentenceIndex];
  typingText.textContent = currentSentence.substring(0, charIndex);

  if (!isDeleting && charIndex < currentSentence.length) {
    charIndex++;
    speed = 100;
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    speed = 50;
  }

  if (charIndex === currentSentence.length && !isDeleting) {
    speed = 1000;
    isDeleting = true;
  } else if (charIndex === 0 && isDeleting) {
    isDeleting = false;
    sentenceIndex = (sentenceIndex + 1) % sentences.length;
    speed = 500;
  }

  setTimeout(typeEffect, speed);
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
  AOS.init();
});

// Spotify playlist
const spotifyTracks = [
  {
    url: "https://open.spotify.com/track/5kqIPrATaCc2LqxVWzQGbk",
    artist: "Lukas Graham",
    audio: "/assets/music/7y.mp3"
  },
  {
    url: "https://open.spotify.com/track/2fLnUa3pPr511oHESDJUlr?si=2157b44c229c4147",
    artist: "Duc Minh,Lê Phú,Hoàng Anh",
    audio: "/assets/music/laviai.mp3"
  },
  {
    url: "https://open.spotify.com/track/2sSsy51uNPKas6x0JWr0TN?si=2a5d1be882df404a",
    artist: "2T, Văn",
    audio: "/assets/music/lieugio.mp3"
  },
  {
    url: "https://open.spotify.com/track/0ThuBBxygY0NLCs4w2bkR6?si=f5c68ecd6d754550",
    artist: "刀酱,DJ铁柱",
    audio: "/assets/music/520am.mp3"
  },
  {
    url: "https://open.spotify.com/track/0NyrI1tMvqcK3vU5z9DMdI?si=36ba02d3a7bb447c",
    artist: "JustaTee",
    audio: "/assets/music/snk.mp3"
  },
  {
    url: "https://open.spotify.com/track/3ukrFH17Zl6iEZ2QJ1Zwiy?si=a737267e66ac41d6",
    artist: "RPT Orijinn,Ronboogz",
    audio: "/assets/music/dontcoi.mp3"
  },
  {
    url: "https://open.spotify.com/track/12DNdwLD9oZOPADqM10oyE?si=d14f14c56a864505",
    artist: "Fishy, Trí Dũng",
    audio: "/assets/music/fgmn.mp3"
  },
  {
    url: "https://open.spotify.com/track/41DlPJXKTCypXdf2eSqa03?si=822aef179218489f",
    artist: "Vũ., Hà Anh Tuấn",
    audio: "/assets/music/binhyen.mp3"
  },
  {
    url: "https://open.spotify.com/track/0669gFIK8dYK9GGQ0K0QNF?si=2d14a8617fcd428d",
    artist: "Dương Domic",
    audio: "/assets/music/mkn.mp3"
  }
];

let audio;

async function loadSpotifyTrack(spotifyObj) {
  try {
    const trackId = spotifyObj.url.split("/track/")[1].split("?")[0];
    const res = await fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/track/${trackId}`);
    const data = await res.json();

    const songImage = document.querySelector(".spotify-now-playing img");
    const songTitle = document.querySelector(".spotify-now-playing .song-title");
    const songArtist = document.querySelector(".spotify-now-playing .song-artist");

    songImage.src = data.thumbnail_url;
    songImage.parentElement.href = spotifyObj.url;
    songTitle.textContent = data.title || "Không rõ tên bài hát";
    songTitle.href = spotifyObj.url;
    songArtist.textContent = spotifyObj.artist;

    audio = new Audio(spotifyObj.audio);

  } catch (err) {
    console.error("Không lấy được bài hát Spotify:", err);
    document.querySelector(".song-title").textContent = "Không tải được bài hát";
  }
}

window.onload = function () {
  const randomTrack = spotifyTracks[Math.floor(Math.random() * spotifyTracks.length)];
  loadSpotifyTrack(randomTrack);

  document.body.addEventListener('click', () => {
    if (audio) {
      audio.play().catch(err => console.error("Error playing audio:", err));
    }
  });
};
