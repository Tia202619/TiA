// Initialize Supabase client
const supabaseUrl = 'https://YOUR-SUPABASE-URL.supabase.co';
const supabaseKey = 'YOUR-SUPABASE-ANON-KEY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

const form = document.getElementById('surveyForm');

// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get selected radio button values
    const comfort = document.querySelector('input[name="comfort"]:checked')?.value;
    const vulnerability = document.querySelector('input[name="vulnerability"]:checked')?.value;
    const punctuality = document.querySelector('input[name="punctuality"]:checked')?.value;

    // Check if all questions are answered
    if (!comfort || !vulnerability || !punctuality) {
        alert("Please answer all questions.");
        return;
    }

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
