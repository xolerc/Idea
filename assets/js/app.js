// === index.html dan ajratildi (XOLERIC SEO) ===
let count = 0;
        let target = 1000;
        let activeWord = "";
        const circle = document.getElementById('progressCircle');
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;

        function setProgress(percent) {
            const offset = circumference - (percent / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        }

        function startProApp() {
            const wordVal = document.getElementById('wordInput').value.trim();
            const targetVal = document.getElementById('targetInput').value;

            if (!wordVal || !targetVal) return;

            activeWord = wordVal;
            target = parseInt(targetVal);
            count = 0;

            let setup = document.getElementById('setupScreen');
            let main = document.getElementById('mainScreen');

            setup.style.opacity = '0';
            setup.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                setup.style.display = 'none';
                main.style.display = 'flex';
                // Trigger reflow
                void main.offsetWidth;
                main.style.opacity = '1';
                main.style.transform = 'scale(1)';
            }, 400);

            document.getElementById('proWord').textContent = activeWord;
            updateDisplay();
        }

        function incrementPro() {
            if (count < target) {
                count++;
                updateDisplay();

                if (navigator.vibrate) navigator.vibrate(10);

                const innerText = document.querySelector('.inner-text');
                innerText.style.transform = 'scale(1.03)';
                setTimeout(() => innerText.style.transform = 'scale(1)', 100);

                if (count === target) {
                    if (navigator.vibrate) navigator.vibrate([50, 50, 100]);
                }
            }
        }

        function updateDisplay() {
            document.getElementById('proNumber').textContent = count;
            document.getElementById('proTarget').textContent = `${count} / ${target}`;
            let percentage = (count / target) * 100;
            setProgress(percentage);
        }

        function resetApp(event) {
            event.stopPropagation();
            let setup = document.getElementById('setupScreen');
            let main = document.getElementById('mainScreen');

            main.style.opacity = '0';
            main.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                main.style.display = 'none';
                setup.style.display = 'flex';
                void setup.offsetWidth;
                setup.style.opacity = '1';
                setup.style.transform = 'scale(1)';
                
                count = 0;
                setProgress(0);
                document.getElementById('wordInput').value = '';
                document.getElementById('targetInput').value = '';
            }, 400);
        }

        // PWA o'rnatish logikasi
        let deferredPrompt;
        const installBtn = document.getElementById('installBtn');

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installBtn.style.display = 'block';
        });

        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    installBtn.style.display = 'none';
                }
                deferredPrompt = null;
            }
        });

        // Service Worker ro'yxatdan o'tkazish
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('sw.js').then(reg => {
                    console.log('SW ro\'yxatdan o\'tdi:', reg);
                }).catch(err => console.log('SW xatosi:', err));
            });
        }