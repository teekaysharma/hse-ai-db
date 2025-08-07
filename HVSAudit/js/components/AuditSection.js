export default class AuditSection {
    constructor(containerId, activePhases) {
        this.container = document.getElementById(containerId);
        this.activePhases = activePhases;
        this.sections = Array.from(document.querySelectorAll('.section'));
        this.initialize();
    }

    initialize() {
        this.updateVisibleSections();
        this.setupCheckboxHandlers();
    }

    updateVisibleSections() {
        this.sections.forEach(section => {
            const sectionPhases = section.dataset.phases.split(',');
            const shouldShow = sectionPhases.some(phase => 
                this.activePhases.has(phase));
            section.style.display = shouldShow ? 'block' : 'none';
        });
        
        this.updateSectionCounter();
    }

    updateSectionCounter() {
        const visibleCount = this.sections.filter(s => 
            s.style.display !== 'none').length;
        document.getElementById('controlsText').innerHTML = 
            `<strong>Active Audit Tool</strong> - ${this.activePhases.size} phases selected, ${visibleCount} sections active`;
    }

    setupCheckboxHandlers() {
        document.addEventListener('change', (e) => {
            if (!e.target.matches('.audit-table input[type="checkbox"]')) return;
            
            const row = e.target.closest('tr');
            const checkboxes = Array.from(row.querySelectorAll('input[type="checkbox"]'));
            const changedIndex = checkboxes.indexOf(e.target);
            const warningDiv = document.getElementById('relevance-warning');

            // Handle relevance checkbox
            if (changedIndex === 0) {
                checkboxes.slice(1).forEach(cb => {
                    cb.disabled = !e.target.checked;
                    if (!e.target.checked) cb.checked = false;
                });
            } 
            // Handle compliance checkbox without relevance
            else if (changedIndex > 0 && e.target.checked && !checkboxes[0].checked) {
                e.target.checked = false;
                this.showWarning(warningDiv, e.target);
                return;
            }
            // Uncheck other compliance options when one is selected
            else if (changedIndex > 0 && e.target.checked) {
                checkboxes.forEach((cb, idx) => {
                    if (idx > 0 && idx !== changedIndex) cb.checked = false;
                });
            }
            
            this.calculateScores();
        });
    }

    showWarning(element, target) {
        element.style.display = 'block';
        const rect = target.getBoundingClientRect();
        element.style.left = `${rect.left}px`;
        element.style.top = `${rect.bottom + window.scrollY + 5}px`;
        
        setTimeout(() => {
            element.style.display = 'none';
        }, 3000);
    }

    calculateScores() {
        let itemsScored = 0;
        let totalPossible = 0;
        let actualScore = 0;
        
        document.querySelectorAll('.audit-table tbody tr').forEach(row => {
            const checkboxes = row.querySelectorAll('input[type="checkbox"]');
            if (checkboxes.length >= 4) {
                const isApplicable = checkboxes[0].checked;
                if (isApplicable) {
                    itemsScored++;
                    totalPossible += 3;
                    
                    if (checkboxes[3].checked) actualScore += 3;
                    else if (checkboxes[2].checked) actualScore += 2;
                    else if (checkboxes[1].checked) actualScore += 1;
                }
            }
        });
        
        const finalPercent = totalPossible > 0 ? 
            Math.round((actualScore / totalPossible) * 100) : 0;
        const rating = this.getSafetyRating(finalPercent);
        
        this.dispatchScoreUpdate({
            itemsScored,
            totalPossible,
            actualScore,
            finalPercent,
            rating: rating.text
        });
    }

    getSafetyRating(percent) {
        if (percent >= 95) return { text: 'EXCELLENT', color: '#28a745' };
        if (percent >= 85) return { text: 'GOOD', color: '#28a745' };
        if (percent >= 75) return { text: 'ACCEPTABLE', color: '#ffc107' };
        if (percent >= 60) return { text: 'POOR', color: '#fd7e14' };
        return { text: 'CRITICAL', color: '#dc3545' };
    }

    dispatchScoreUpdate(scores) {
        const event = new CustomEvent('scoreUpdated', {
            detail: scores
        });
        document.dispatchEvent(event);
    }
}
