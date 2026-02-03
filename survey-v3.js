console.log("✅ script.js loaded");

// 🔹 Supabase credentials
const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_PUBLIC_ANON_KEY";

// 🔹 Create Supabase client
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// 🔹 Sliders
const comfortSlider = document.getElementById("comfortSlider");
const vulnerabilitySlider = document.getElementById("vulnerabilitySlider");
const punctualitySlider = document.getElementById("punctualitySlider");

// 🔹 Value labels
const comfortValue = document.getElementById("comfortValue");
const vulnerabilityValue = document.getElementById("vulnerabilityValue");
const punctualityValue = document.getElementById("punctualityValue");

// 🔹 Live display
comfortSlider.addEventListener("input", () => {
  comfortValue.textContent = comfortSlider.value;
});
vulnerabilitySlider.addEventListener("input", () => {
  vulnerabilityValue.textContent = vulnerabilitySlider.value;
});
punctualitySlider.addEventListener("input", () => {
  punctualityValue.textContent = punctualitySlider.value;
});

// 🔹 Submit handler
document.getElementById("surveyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const response = {
    comfort: Number(comfortSlider.value),
    vulnerability: Number(vulnerabilitySlider.value),
    punctuality: Number(punctualitySlider.value),
  };

  const { error } = await supabaseClient
    .from("survey_responses")
    .insert([response]);

  if (error) {
    console.error("❌ Supabase error:", error);
    alert("Error saving survey");
  } else {
    console.log("✅ Survey saved", response);
    alert("Survey submitted successfully!");
  }
});
