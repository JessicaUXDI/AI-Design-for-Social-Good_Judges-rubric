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

async function loadSubmissions() {
    try {
        const response = await fetch('/api/submissions');
        const submissions = await response.json();
        
        displaySubmissions(submissions);
        updateStats(submissions);
        
        // Load summary
        const summaryResponse = await fetch('/api/summary');
        const summary = await summaryResponse.json();
        displaySummary(summary);
    } catch (error) {
        console.error('Error loading submissions:', error);
        document.getElementById('submissionsTable').innerHTML = 
            '<p style="color: red;">Error loading submissions. Please refresh.</p>';
    }
}

function displaySubmissions(submissions) {
    const container = document.getElementById('submissionsTable');
    
    if (submissions.length === 0) {
        container.innerHTML = '<p>No submissions yet.</p>';
        return;
    }
    
    let html = '<table><thead><tr>';
    html += '<th>Judge</th>';
    html += '<th>Project</th>';
    
    Object.entries(categories).forEach(([letter, name]) => {
        html += `<th>${letter}: ${name}<br><small>Score</small></th>`;
        html += `<th>${letter}: ${name}<br><small>Feedback</small></th>`;
    });
    
    html += '<th>General Feedback</th>';
    html += '<th>Submitted</th>';
    html += '</tr></thead><tbody>';
    
    submissions.forEach(sub => {
        html += '<tr>';
        html += `<td><strong>${sub.judge_name}</strong></td>`;
        html += `<td>${sub.project_name || 'N/A'}</td>`;
        
        Object.keys(categories).forEach(letter => {
            const score = sub[`category_${letter.toLowerCase()}_score`];
            const feedback = sub[`category_${letter.toLowerCase()}_feedback`];
            html += `<td>${score !== null ? score : '-'}</td>`;
            html += `<td class="feedback-cell">${feedback || '-'}</td>`;
        });
        
        html += `<td class="feedback-cell">${sub.general_feedback || '-'}</td>`;
        html += `<td>${new Date(sub.created_at).toLocaleString()}</td>`;
        html += '</tr>';
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

function displaySummary(summary) {
    const container = document.getElementById('summaryTable');
    
    if (summary.length === 0) {
        container.innerHTML = '<p>No project summaries available yet.</p>';
        return;
    }
    
    let html = '<table><thead><tr>';
    html += '<th>Project</th>';
    html += '<th># Judges</th>';
    
    Object.entries(categories).forEach(([letter, name]) => {
        html += `<th>Avg ${letter}: ${name}</th>`;
    });
    
    html += '<th>Overall Avg</th>';
    html += '</tr></thead><tbody>';
    
    summary.forEach(project => {
        html += '<tr>';
        html += `<td><strong>${project.project_name}</strong></td>`;
        html += `<td>${project.judge_count}</td>`;
        
        let totalAvg = 0;
        let count = 0;
        
        Object.keys(categories).forEach(letter => {
            const avg = project[`avg_${letter.toLowerCase()}`];
            if (avg !== null) {
                const rounded = Math.round(avg * 10) / 10;
                html += `<td>${rounded}</td>`;
                totalAvg += avg;
                count++;
            } else {
                html += '<td>-</td>';
            }
        });
        
        const overallAvg = count > 0 ? Math.round((totalAvg / count) * 10) / 10 : 0;
        html += `<td><strong>${overallAvg}</strong></td>`;
        html += '</tr>';
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

function updateStats(submissions) {
    document.getElementById('totalSubmissions').textContent = submissions.length;
    
    const uniqueJudges = new Set(submissions.map(s => s.judge_name));
    document.getElementById('totalJudges').textContent = uniqueJudges.size;
    
    const uniqueProjects = new Set(
        submissions
            .map(s => s.project_name)
            .filter(p => p && p.trim() !== '')
    );
    document.getElementById('totalProjects').textContent = uniqueProjects.size;
}

// Auto-refresh every 30 seconds
setInterval(loadSubmissions, 30000);

// Load on page load
document.addEventListener('DOMContentLoaded', loadSubmissions);

