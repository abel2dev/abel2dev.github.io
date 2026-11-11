window.show = function(pageId) {
    const pages = document.querySelectorAll('.page');

    pages.forEach(page => {
        page.classList.remove('active');
    });

    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    return false; 
};

window.addEventListener('DOMContentLoaded', () => {
    // 1. Audio Manifest
    const sfx = {
        hiss: new Audio('OpenDoorSFX.wav'),
        hover: new Audio('HighlightButton.mp3'),
        press: new Audio('PressButton.mp3'),
        bgm: document.getElementById('backgroundMusic')
    };
    
    sfx.hover.volume = 0.8;
    sfx.press.volume = 0.5;

    // 2. Airlock Logic
    const splash = document.getElementById('airlock-splash');
    const terminalUI = document.getElementById('terminal-ui');

    if (splash) {
        splash.addEventListener('click', () => {
            sfx.hiss.play().catch(() => {});
            if (sfx.bgm) sfx.bgm.play().catch(() => {});

            splash.style.backgroundColor = 'transparent';
            
            document.querySelector('.left-door').classList.add('open-left');
            document.querySelector('.right-door').classList.add('open-right');

            if(terminalUI) {
                terminalUI.style.opacity = '1';
                terminalUI.style.pointerEvents = 'auto';
            }

            setTimeout(() => {
                splash.style.display = 'none';
                document.body.style.overflow = 'hidden';
            }, 1500);
        });
    }

    // 3. Interaction Logic
    const interactables = document.querySelectorAll('.plate-btn, .highlightable');

    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            sfx.hover.currentTime = 0;
            sfx.hover.play().catch(err => console.log("Hover sound blocked:", err));
        });

        el.addEventListener('mousedown', () => {
            sfx.press.currentTime = 0;
            sfx.press.play().catch(err => console.log("Press sound blocked:", err));
        });
    });

    // 4. Initialize the first page
    window.show('page-start');
});