// Initialize Supabase client
const supabaseUrl = 'https://YOUR-SUPABASE-URL.supabase.co';
const supabaseKey = 'YOUR-SUPABASE-ANON-KEY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

const form = document.getElementById('surveyForm');

// Get slider elements
const comfortSlider = document.getElementById('comfortSlider');
const vulnerabilitySlider = document.getElementById('vulnerabilitySlider');
const punctualitySlider = document.getElementById('punctualitySlider');

// Get value display elements
const comfortValue = document.getElementById('comfortValue');
const vulnerabilityValue = document.getElementById('vulnerabilityValue');
const punctualityValue = document.getElementById('punctualityValue');

// Update slider values on change
comfortSlider.oninput = function() {
    comfortValue.textContent = comfortSlider.value;
};

vulnerabilitySlider.oninput = function() {
    vulnerabilityValue.textContent = vulnerabilitySlider.value;
};

punctualitySlider.oninput = function() {
    punctualityValue.textContent = punctualitySlider.value;
};

// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get slider values
    const comfort = comfortSlider.value;
    const vulnerability = vulnerabilitySlider.value;
    const punctuality = punctualitySlider.value;

    // Insert data into Supabase
    const { data, error } = await supabase
        .from('survey_responses')  // Change this to your table name
        .insert([
            { comfort: comfort, vulnerability: vulnerability, punctuality: punctuality }
        ]);

    if (error) {
        console.error('Error inserting survey response:', error);
        alert('Error submitting the survey.');
    } else {
        alert('Survey submitted successfully!');
        form.reset(); // Reset form after submission
    }
});
