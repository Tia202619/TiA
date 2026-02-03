// Initialize Supabase client
const supabaseUrl = 'https://YOUR-SUPABASE-URL.supabase.co';
const supabaseKey = 'YOUR-SUPABASE-ANON-KEY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Get slider elements
const comfortSlider = document.getElementById('comfortSlider');
const vulnerabilitySlider = document.getElementById('vulnerabilitySlider');
const punctualitySlider = document.getElementById('punctualitySlider');

// Get value display elements
const comfortValue = document.getElementById('comfortValue');
const vulnerabilityValue = document.getElementById('vulnerabilityValue');
const punctualityValue = document.getElementById('punctualityValue');

// Update slider values on input and automatically save to Supabase
comfortSlider.oninput = function() {
    comfortValue.textContent = comfortSlider.value;
    recordSurveyData();
};

vulnerabilitySlider.oninput = function() {
    vulnerabilityValue.textContent = vulnerabilitySlider.value;
    recordSurveyData();
};

punctualitySlider.oninput = function() {
    punctualityValue.textContent = punctualitySlider.value;
    recordSurveyData();
};

// Function to record survey data
async function recordSurveyData() {
    const comfort = comfortSlider.value;
    const vulnerability = vulnerabilitySlider.value;
    const punctuality = punctualitySlider.value;

    // Insert data into Supabase
    const { data, error } = await supabase
        .from('survey_responses')  // Change this to your table name
        .upsert([
            { comfort: comfort, vulnerability: vulnerability, punctuality: punctuality }
        ]);

    if (error) {
        console.error('Error inserting survey response:', error);
    } else {
        console.log('Survey data recorded:', data);
    }
}
