document.addEventListener('DOMContentLoaded', function() {
    const welcomeBtn = document.querySelector('.user-welcome-btn');
    const modalOverlay = document.querySelector('.user-modal-overlay');
    const modal = document.querySelector('.user-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    if(welcomeBtn) {
        welcomeBtn.addEventListener('click', function() {
            modalOverlay.classList.add('active');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    function closeModal() {
        modalOverlay.classList.remove('active');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modalOverlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    
    // Close when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if(e.key === 'Escape') {
            closeModal();
        }
    });
});