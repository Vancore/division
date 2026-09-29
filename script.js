const readingProgressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight > 0 && readingProgressBar) {
        const progress = (scrollTop / scrollHeight) * 100;
        readingProgressBar.style.width = progress + '%';
    }
});

const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
}
function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

if (menuToggle) menuToggle.addEventListener('click', openSidebar);
if (menuClose) menuClose.addEventListener('click', closeSidebar);
if (overlay) overlay.addEventListener('click', closeSidebar);
sidebarLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
});

const musicToggle = document.getElementById('music-toggle');
const musicClose = document.getElementById('music-close');
const musicSidebar = document.getElementById('music-sidebar');

function openMusicSidebar() {
    closeSidebar();
    musicSidebar.classList.add('active');
    overlay.classList.add('active');
}

function closeMusicSidebar() {
    musicSidebar.classList.remove('active');
    overlay.classList.remove('active');
}

if (musicToggle) musicToggle.addEventListener('click', openMusicSidebar);
if (musicClose) musicClose.addEventListener('click', closeMusicSidebar);
if (overlay) overlay.addEventListener('click', closeMusicSidebar);

const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('player-play-btn');
const playerSlider = document.getElementById('player-progress');
const currentTimeEl = document.getElementById('player-current-time');
const totalTimeEl = document.getElementById('player-total-time');
const musicItems = document.querySelectorAll('.music-item');

const playlist = [
    {
        title: "Science Documentary",
        author: "leberch",
        duration: "2:04",
        src: "/audio/leberch.mp3"
    },
    {
        title: "Atmosphere Documentary",
        author: "leberch",
        duration: "2:46",
        src: "/audio/leberch2.mp3"
    },
    {
        title: "Documentary",
        author: "leberch",
        duration: "2:30",
        src: "/audio/leberch3.mp3"
    },
    {
        title: "Ambient",
        author: "leberch",
        duration: "2:32",
        src: "/audio/leberch4.mp3"
    }
];

let currentTrack = 0;
let isSeeking = false;

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function loadTrack(index) {
    currentTrack = index;
    audio.src = playlist[currentTrack].src;
    totalTimeEl.textContent = playlist[currentTrack].duration;
    currentTimeEl.textContent = '0:00';
    if (playerSlider) playerSlider.value = 0;
    
    musicItems.forEach((item, i) => {
        item.classList.toggle('active', i === currentTrack);
    });
}

if (audio) {
    loadTrack(0);
    audio.volume = 0.4;

    audio.addEventListener('timeupdate', () => {
        if (!isSeeking && audio.duration) {
            playerSlider.value = (audio.currentTime / audio.duration) * 100;
            currentTimeEl.textContent = formatTime(audio.currentTime);
        }
    });

    audio.addEventListener('ended', () => {
        currentTrack++;
        if (currentTrack < playlist.length) {
            loadTrack(currentTrack);
            audio.play();
        } else {
            playBtn.textContent = '▶';
            musicToggle.classList.remove('playing');
            loadTrack(0);
        }
    });
}

if (playBtn) {
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                playBtn.textContent = '⏸';
                musicToggle.classList.add('playing');
            }).catch(err => console.warn(err));
        } else {
            audio.pause();
            playBtn.textContent = '▶';
            musicToggle.classList.remove('playing');
        }
    });
}

musicItems.forEach(item => {
    item.addEventListener('click', () => {
        const idx = parseInt(item.getAttribute('data-index'), 10);
        loadTrack(idx);
        audio.play().then(() => {
            playBtn.textContent = '⏸';
            musicToggle.classList.add('playing');
        }).catch(err => console.warn(err));
    });
});

if (playerSlider) {
    playerSlider.addEventListener('input', () => {
        isSeeking = true;
        if (audio.duration) {
            currentTimeEl.textContent = formatTime((playerSlider.value / 100) * audio.duration);
        }
    });
    playerSlider.addEventListener('change', () => {
        if (audio.duration) {
            audio.currentTime = (playerSlider.value / 100) * audio.duration;
        }
        isSeeking = false;
    });
}


document.querySelectorAll('.term').forEach(term => {
    const tooltip = document.createElement('div');
    tooltip.className = 'term-tooltip';
    tooltip.textContent = term.getAttribute('data-definition');
    term.appendChild(tooltip);

    term.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = term.classList.contains('active');
        document.querySelectorAll('.term').forEach(t => t.classList.remove('active'));
        if (!isActive) term.classList.add('active');
    });
});

document.addEventListener('click', () => {
    document.querySelectorAll('.term').forEach(t => t.classList.remove('active'));
});











const isRu = document.documentElement.lang === 'ru';
const copyLabel = isRu ? 'Копировать' : 'Copy';
const copiedLabel = isRu ? '✓ Скопировано' : '✓ Copied';

const shareMenu = document.createElement('div');
shareMenu.id = 'quote-share-menu';
shareMenu.innerHTML = `
    <button id="share-x-btn" title="Share on X">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        <span>X</span>
    </button>
    <div class="divider"></div>
    <button id="share-tg-btn" title="Share on Telegram">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
        <span>TG</span>
    </button>
    <div class="divider"></div>
    <button id="copy-quote-btn" title="${copyLabel}">
        <span>${copyLabel}</span>
    </button>
`;
document.body.appendChild(shareMenu);

shareMenu.addEventListener('mousedown', (e) => e.stopPropagation());
shareMenu.addEventListener('touchstart', (e) => e.stopPropagation());
shareMenu.addEventListener('touchend', (e) => e.stopPropagation());

let selectedQuote = '';
let isScrolling = false;
let scrollTimeout = null;
window.addEventListener('scroll', () => {
    isScrolling = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 200);
}, { passive: true });

function handleTextSelection() {
    if (isScrolling) return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
        shareMenu.style.display = 'none';
        return;
    }

    const text = selection.toString().trim();

    if (text.length >= 2) {
        const range = selection.getRangeAt(0);
        let rect = range.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) {
            return;
        }

        const targetEl = range.commonAncestorContainer.nodeType === 1 
            ? range.commonAncestorContainer 
            : range.commonAncestorContainer.parentElement;
        if (targetEl && targetEl.closest('.container, header')) {
            selectedQuote = text;

            let leftPos = rect.left + rect.width / 2;
            const halfMenuWidth = 110; 
            leftPos = Math.max(halfMenuWidth + 12, Math.min(window.innerWidth - halfMenuWidth - 12, leftPos));
            shareMenu.style.left = `${leftPos}px`;

            if (window.innerWidth <= 768) {
                shareMenu.classList.add('below');
                shareMenu.style.top = `${rect.bottom + window.scrollY + 12}px`;
            } else {
                shareMenu.classList.remove('below');
                shareMenu.style.top = `${rect.top + window.scrollY - 12}px`;
            }
            shareMenu.style.display = 'flex';
            return;
        }
    }

    // Скрываем меню ТОЛЬКО если человек реально снял выделение
    shareMenu.style.display = 'none';
}

let selectionTimer = null;
document.addEventListener('selectionchange', () => {
    clearTimeout(selectionTimer);
    selectionTimer = setTimeout(handleTextSelection, 200);
});

document.addEventListener('mouseup', () => setTimeout(handleTextSelection, 20));

document.addEventListener('mousedown', (e) => {
    if (!shareMenu.contains(e.target)) {
        shareMenu.style.display = 'none';
    }
});

document.getElementById('share-x-btn').addEventListener('click', () => {
    const quote = selectedQuote.length > 180 ? selectedQuote.slice(0, 177) + '...' : selectedQuote;
    const tweetText = `«${quote}»`;
    const url = `https://x.com/intent/post?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    shareMenu.style.display = 'none';
});

document.getElementById('share-tg-btn').addEventListener('click', () => {
    const quote = `«${selectedQuote}»`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(quote)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    shareMenu.style.display = 'none';
});

document.getElementById('copy-quote-btn').addEventListener('click', () => {
    const fullQuote = `«${selectedQuote}» — ${window.location.href}`;
    navigator.clipboard.writeText(fullQuote).then(() => {
        const btnText = document.querySelector('#copy-quote-btn span');
        btnText.textContent = copiedLabel;
        setTimeout(() => {
            btnText.textContent = copyLabel;
            shareMenu.style.display = 'none';
        }, 1200);
    });
});