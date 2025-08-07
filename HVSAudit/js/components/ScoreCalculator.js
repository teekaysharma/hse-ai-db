export default class ScoreCalculator {
    constructor(containerId, scores) {
        this.container = document.getElementById(containerId);
        this.scores = scores;
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <h3 style="text-align: center; margin-bottom: 20px;">DYNAMIC AUDIT SCORING</h3>
            <div class="score-grid">
                <div class="score-item">
                    <div>Items Scored</div>
                    <div class="score-value" id="itemsScored">0</div>
                </div>
                <div class="score-item">
                    <div>Total Possible Score</div>
                    <div class="score-value" id="totalPossible">0</div>
                </div>
                <div class="score-item">
                    <div>Actual Score</div>
                    <div class="score-value" id="actualScore">0</div>
                </div>
                <div class="score-item">
                    <div>Final % Score</div>
                    <div class="score-value" id="finalPercent">0%</div>
                </div>
                <div class="score-item">
                    <div>Safety Rating</div>
                    <div class="score-value" id="safetyRating">CRITICAL</div>
                </div>
            </div>
        `;
        
        this.updateDisplay();
    }

    updateDisplay() {
        document.getElementById('itemsScored').textContent = this.scores.itemsScored;
        document.getElementById('totalPossible').textContent = this.scores.totalPossible;
        document.getElementById('actualScore').textContent = this.scores.actualScore;
        
        const percentElement = document.getElementById('finalPercent');
        percentElement.textContent = `${this.scores.finalPercent}%`;
        percentElement.style.color = this.getRatingColor(this.scores.finalPercent);
        
        const ratingElement = document.getElementById('safetyRating');
        ratingElement.textContent = this.scores.rating;
        ratingElement.style.color = this.getRatingColor(this.scores.finalPercent);
    }

    getRatingColor(percent) {
        if (percent >= 95) return '#28a745';
        if (percent >= 85) return '#28a745';
        if (percent >= 75) return '#ffc107';
        if (percent >= 60) return '#fd7e14';
        return '#dc3545';
    }
}
