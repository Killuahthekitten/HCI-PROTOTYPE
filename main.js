// Intersection Observer for staggered card animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 50);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all language boxes
document.addEventListener('DOMContentLoaded', () => {
    const languageBoxes = document.querySelectorAll('.language-box');
    languageBoxes.forEach(box => {
        observer.observe(box);
    });
});

// Start Learning button functionality
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.start-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const languageName = this.parentElement.querySelector('.language-name').textContent;
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Show notification
            alert(`Welcome to ${languageName} learning path!`);
        });
    });
});

// Replace broken language images with a Font Awesome fallback icon
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.language-box img.language-icon').forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
            // if a fallback already exists, don't add another
            if (img.nextElementSibling && img.nextElementSibling.classList && img.nextElementSibling.classList.contains('fallback-icon')) return;
            const fallback = document.createElement('i');
            fallback.className = 'fas fa-code fallback-icon';
            fallback.setAttribute('aria-hidden', 'true');
            img.parentNode.insertBefore(fallback, img.nextSibling);
        });
        // If image failed to load earlier (cached), check naturalWidth
        if (img.complete && img.naturalWidth === 0) {
            img.dispatchEvent(new Event('error'));
        }
    });
});

// Search: filter language boxes by name or section technologies
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-box input[type="search"]');
    const searchBtn = document.querySelector('.search-btn');
    const container = document.querySelector('.learning-section-wrapper .container');

    if (!searchInput || !searchBtn || !container) return;

    function performSearch() {
        const q = (searchInput.value || '').trim().toLowerCase();
        const boxes = Array.from(document.querySelectorAll('.language-box'));
        let any = false;

        boxes.forEach(box => {
            const name = (box.querySelector('.language-name')?.textContent || '').toLowerCase();
            const sectionTech = (box.closest('.learning-section')?.querySelector('.technologies')?.textContent || '').toLowerCase();
            const match = q === '' || name.includes(q) || sectionTech.includes(q);
            box.classList.toggle('hidden', !match);
            if (match) any = true;
        });

        let no = container.querySelector('.no-results');
        if (!no) {
            no = document.createElement('div');
            no.className = 'no-results';
            no.textContent = 'No results found.';
            container.insertBefore(no, container.firstChild);
        }
        no.style.display = any ? 'none' : 'block';
    }

    searchBtn.addEventListener('click', performSearch);

    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
            return;
        }
        if (searchInput.value.trim() === '') {
            // clear filter
            document.querySelectorAll('.language-box.hidden').forEach(b => b.classList.remove('hidden'));
            const no = container.querySelector('.no-results');
            if (no) no.style.display = 'none';
        }
    });
});
