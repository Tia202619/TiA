console.log("✅ script.js loaded");

// 🔹 Supabase config
const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_PUBLIC_ANON_KEY";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// 🔹 Generate one session per visitor
const sessionId = crypto.randomUUID();

// 🔹 Elements
const comfortSlider = document.getElementById("comfortSlider");
const vulnerabilitySlider = document.getElementById("vulnerabilitySlider");
const punctualitySlider = document.getElementById("punctualitySlider");

const comfortValue = document.getElementById("comfortValue");
const vulnerabilityValue = document.getElementById("vulnerabilityValue");
const punctualityValue = document.getElementById("punctualityValue");

// 🔹 Create initial row
(async function createSession() {
  const { error } = await supabaseClient
    .from("survey_responses")
    .insert([{
      session_id: sessionId,
      comfort: comfortSlider.value,
      vulnerability: vulnerabilitySlider.value,
      punctuality: punctualitySlider.value
    }]);

  if (error) {
    console.error("❌ Session create error:", error);
  } else {
    console.log("✅ Session started:", sessionId);
  }
})();

// 🔹 Update function (LIVE)
async function updateSurvey() {
  const { error } = await supabaseClient
    .from("survey_responses")
    .update({
      comfort: Number(comfortSlider.value),
      vulnerability: Number(vulnerabilitySlider.value),
      punctuality: Number(punctualitySlider.value)
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
