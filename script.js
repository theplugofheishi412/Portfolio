document.addEventListener('DOMContentLoaded', function() {
    // Animation des barres de competences
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });

    // Animation au scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('section, .timeline-item, .skill, .project-list li');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if(elementPosition < screenPosition) {
                const animation = window.getComputedStyle(element).getPropertyValue('animation');
                if(animation === 'none 0s ease 0s 1 normal none running') {
                    const delay = element.dataset.delay || '0s';
                    element.style.animation = `fadeInUp 1s ease-out ${delay} forwards`;
                }
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Appel initial pour les elements dejà visibles

    // Smooth scrolling pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Mise à jour de l'état actif de la navigation
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Changement  de la navigation au scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});

document.getElementById('downloadCV').addEventListener('click', function() {
    // Remplacez cette URL par le lien vers votre vrai CV
    const cvUrl = 'CV_Mbourou_Ndiaye_Cyrille_Dimitri.pdf';
    
    // Création d'un lien temporaire pour le téléchargement
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'CV_Mbourou_Ndiaye_Cyrille_Dimitri.pdf'; // Nom du fichier à télécharger
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Animation de confirmation (optionnelle)
    this.innerHTML = '<i class="fas fa-check"></i> CV téléchargé !';
    this.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
    setTimeout(() => {
        this.innerHTML = '<i class="fas fa-download"></i> Télécharger mon CV';
        this.style.background = 'linear-gradient(135deg, var(--primary-color), var(--accent-color))';
    }, 2000);
});