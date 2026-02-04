const SUPABASE_URL = "https://rititbdxdwwlienthlws.supabase.co";
const SUPABASE_KEY = "YOUR_ANON_KEY_HERE";

let supa = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Anonymous session ID (one per survey)
const session_id = crypto.randomUUID();

// Slider references
const comfortSlider = document.getElementById("comfort");
const vulnerabilitySlider = document.getElementById("vulnerability");
const punctualitySlider = document.getElementById("punctuality");

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", async () => {

  const response = {
    session_id: session_id,

    comfort_value: parseInt(comfortSlider.value),
    comfort_id: "comfort",

    vulnerability_value: parseInt(vulnerabilitySlider.value),
    vulnerability_id: "vulnerability",

    punctuality_value: parseInt(punctualitySlider.value),
    punctuality_id: "punctuality"
  };

  const { error } = await supa
    .from("survey_responses")
    .insert(response);

  if (error) {
    console.error("Error saving response:", error);
    alert("Error saving response. Check console.");
  } else {
    alert("Thank you! Your response has been recorded.");
  }
});
