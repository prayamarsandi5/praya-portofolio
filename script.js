// 1. Fungsi Modal Quest (Updated with Tech Stack & Image Logic)
function openQuest(title, desc, link, tech, imgName) {
    const modal = document.getElementById('sao-modal');
    const modalLink = document.getElementById('modal-link');
    const imgContainer = document.getElementById('modal-img-container');
    
    // Update Konten Teks
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('modal-tech').innerText = tech;
    modalLink.href = link;

    // Logika khusus jika Quest masih tahap PLANNING
    if (link === '#' || !link) {
        imgContainer.innerHTML = '<div style="opacity:0.3; text-align:center;"><i class="fas fa-lock" style="font-size:3rem;"></i><br>DATA ENCRYPTED / PLANNING</div>';
        modalLink.style.pointerEvents = 'none';
        modalLink.style.opacity = '0.5';
        modalLink.innerText = 'LOCKED';
        modalLink.style.background = '#444';
    } else {
        // Jika ada link, aktifkan tombol dan tampilkan gambar
        imgContainer.innerHTML = `<img src="${imgName}" alt="Preview" onerror="this.parentElement.innerHTML='IMAGE NOT FOUND'">`;
        modalLink.style.pointerEvents = 'auto';
        modalLink.style.opacity = '1';
        modalLink.innerText = 'ACCEPT QUEST';
        modalLink.style.background = 'transparent'; // Kembali ke style asli CSS
    }

    modal.style.display = 'flex';
    console.log(`System: Accessing Quest Detail - ${title}`);
}

function closeQuest() {
    document.getElementById('sao-modal').style.display = 'none';
}

// Tutup modal jika klik di luar box
window.onclick = function(event) {
    const modal = document.getElementById('sao-modal');
    if (event.target == modal) {
        closeQuest();
    }
}

// 2. Animasi Exp Fill saat scroll
const skillSection = document.querySelector('#skills');
const expFills = document.querySelectorAll('.exp-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            expFills.forEach(fill => {
                const targetWidth = fill.style.width;
                fill.style.width = '0';
                setTimeout(() => { 
                    fill.style.width = targetWidth; 
                }, 200);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if(skillSection) skillObserver.observe(skillSection);

// 3. Efek Window Reveal
const windows = document.querySelectorAll('.sao-window');
const winObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

windows.forEach(win => {
    win.style.opacity = 0;
    win.style.transform = "translateY(30px)";
    win.style.transition = "all 0.6s ease-out";
    winObserver.observe(win);
});

// 4. Smooth Scroll for Navigation
document.querySelectorAll('.nav-links a, .sao-btn').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});