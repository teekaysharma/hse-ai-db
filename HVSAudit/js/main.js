import PhaseSelector from './components/PhaseSelector.js';
import AuditSection from './components/AuditSection.js';
import ScoreCalculator from './components/ScoreCalculator.js';

class SafetyAuditApp {
    constructor() {
        this.state = {
            activePhases: new Set([
                'site-prep',
                'civil-works',
                'equipment-install',
                'electrical-install',
                'testing-comm',
                'final-handover'
            ]),
            scores: {
                itemsScored: 0,
                totalPossible: 0,
                actualScore: 0
            }
        };

        this.initComponents();
        this.bindEvents();
    }

    initComponents() {
        this.phaseSelector = new PhaseSelector(
            'phase-selector-container', 
            this.state.activePhases
        );
        
        this.auditSection = new AuditSection(
            'sections-container',
            this.state.activePhases
        );
        
        this.scoreCalculator = new ScoreCalculator(
            'score-section',
            this.state.scores
        );
    }

    bindEvents() {
        document.addEventListener('phaseChanged', (e) => {
            this.state.activePhases = e.detail;
            this.auditSection.updateVisibleSections();
        });

        document.addEventListener('scoreUpdated', (e) => {
            this.state.scores = e.detail;
            this.scoreCalculator.updateDisplay();
        });
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SafetyAuditApp();
});
