// Category mappings
const categories = {
    'A': 'Walnut',
    'B': 'OnFire',
    'C': 'Genie',
    'D': 'BoldSteps',
    'E': 'Align',
    'F': 'Joy',
    'G': 'SnapAlly',
    'H': 'Category H',
    'I': 'Category I',
    'J': 'Category J'
};

// Create category inputs
function createCategoryInputs() {
    const container = document.getElementById('categoriesContainer');
    
    Object.entries(categories).forEach(([letter, name]) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category-group';
        categoryDiv.innerHTML = `
            <div class="category-header">
                <h3>Category ${letter}: ${name}</h3>
            </div>
            <div class="category-content">
                <div class="form-group">
                    <label for="score_${letter}">Score (1-10) *</label>
                    <input 
                        type="number" 
                        id="score_${letter}" 
                        name="score_${letter}" 
                        min="1" 
                        max="10" 
                        required
                        class="score-input"
                    >
                </div>
                <div class="form-group">
                    <label for="feedback_${letter}">Feedback/Comments</label>
                    <textarea 
                        id="feedback_${letter}" 
                        name="feedback_${letter}" 
                        rows="3" 
                        placeholder="Enter your feedback for ${name}..."
                        class="feedback-input"
                    ></textarea>
                </div>
            </div>
        `;
        container.appendChild(categoryDiv);
    });
}

// Handle form submission
document.getElementById('judgingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const judgeName = document.getElementById('judgeName').value;
    const projectName = document.getElementById('projectName').value;
    const generalFeedback = document.getElementById('generalFeedback').value;
    
    // Collect scores and feedback
    const scores = {};
    const feedback = {};
    
    Object.keys(categories).forEach(letter => {
        const scoreInput = document.getElementById(`score_${letter}`);
        const feedbackInput = document.getElementById(`feedback_${letter}`);
        
        if (scoreInput.value) {
            scores[letter] = parseInt(scoreInput.value);
        }
        if (feedbackInput.value) {
            feedback[letter] = feedbackInput.value;
        }
    });
    
    if (generalFeedback) {
        feedback.general = generalFeedback;
    }
    
    // Submit to server
    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                judgeName,
                projectName,
                scores,
                feedback
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage('Scores submitted successfully! Thank you for judging.', 'success');
            document.getElementById('judgingForm').reset();
        } else {
            showMessage(data.error || 'Failed to submit scores. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Network error. Please check your connection and try again.', 'error');
    }
});

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    createCategoryInputs();
});

