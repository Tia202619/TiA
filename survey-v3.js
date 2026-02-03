console.log("✅ script.js loaded");

// 🔹 Supabase config
const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_PUBLIC_ANON_KEY";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// 🔹 One session per user
const sessionId = crypto.randomUUID();

// 🔹 Sliders
const comfortSlider = document.getElementById("comfortSlider");
const vulnerabilitySlider = document.getElementById("vulnerabilitySlider");
const punctualitySlider = document.getElementById("punctualitySlider");

// 🔹 Labels
const comfortValue = document.getElementById("comfortValue");
const vulnerabilityValue = document.getElementById("vulnerabilityValue");
const punctualityValue = document.getElementById("punctualityValue");

// 🔹 Create initial row
(async function createRow() {
  const { error } = await supabaseClient
    .from("survey_responses")
    .insert([{
      session_id: sessionId,
      comfort_value: Number(comfortSlider.value),
      comfort_id: "comfort",
      vulnerability_value: Number(vulnerabilitySlider.value),
      vulnerability_id: "vulnerability",
      punctuality_value: Number(punctualitySlider.value),
      punctuality_id: "punctuality"
    }]);

  if (error) {
    console.error("❌ Insert error:", error);
  } else {
    console.log("✅ Survey session created:", sessionId);
  }
})();

// 🔹 Live update function
async function updateSurvey() {
  const { error } = await supabaseClient
    .from("survey_responses")
    .update({
      comfort_value: Number(comfortSlider.value),
      vulnerability_value: Number(vulnerabilitySlider.value),
      punctuality_value: Number(punctualitySlider.value)
    })
    .eq("session_id", sessionId);

  if (error) {
    console.error("❌ Update error:", error);
  } else {
    console.log("🔄 Survey updated");
  }
}

// 🔹 Live listeners
comfortSlider.addEventListener("input", () => {
  comfortValue.textContent = comfortSlider.value;
  updateSurvey();
});

vulnerabilitySlider.addEventListener("input", () => {
  vulnerabilityValue.textContent = vulnerabilitySlider.value;
  updateSurvey();
});

punctualitySlider.addEventListener("input", () => {
  punctualityValue.textContent = punctualitySlider.value;
  updateSurvey();
});
