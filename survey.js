const SUPABASE_URL = "https://zuzufciobmzjfcaujpet.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1enVmY2lvYm16amZjYXVqcGV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3OTg3ODAsImV4cCI6MjA4NTM3NDc4MH0.Md56UoBCOUjOTu5qEvJsMYG0TZvgAFmWU6jPgTgTAn4";

let supa = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// One anonymous session per page load
const session_id = crypto.randomUUID();

// Slider references
const sliders = ["comfort", "vulnerability", "punctuality"];

function adjust(id, step) {
  const slider = document.getElementById(id);
  let value = parseInt(slider.value) + step;

  // Expand range dynamically
  if (value < parseInt(slider.min)) {
    slider.min = value;
    document.getElementById(id + "_min").innerText = value;
  }

  if (value > parseInt(slider.max)) {
    slider.max = value;
    document.getElementById(id + "_max").innerText = value;
  }

  slider.value = value;
  updateDisplay(id);
  logResponse();
}

function updateDisplay(id) {
  const slider = document.getElementById(id);
  document.getElementById(id + "_value").innerText = slider.value;
}

// Listen to manual slider movement
sliders.forEach(id => {
  const slider = document.getElementById(id);

  slider.addEventListener("input", () => {
    updateDisplay(id);

    // Auto expand if user drags beyond limits (future proof)
    if (parseInt(slider.value) <= parseInt(slider.min)) {
      slider.min = parseInt(slider.value) - 10;
      document.getElementById(id + "_min").innerText = slider.min;
    }

    if (parseInt(slider.value) >= parseInt(slider.max)) {
      slider.max = parseInt(slider.value) + 10;
      document.getElementById(id + "_max").innerText = slider.max;
    }

    logResponse();
  });
});

async function logResponse() {
  const data = {
    session_id: session_id,

    comfort_value: parseInt(document.getElementById("comfort").value),
    comfort_id: "comfort",

    vulnerability_value: parseInt(document.getElementById("vulnerability").value),
    vulnerability_id: "vulnerability",

    punctuality_value: parseInt(document.getElementById("punctuality").value),
    punctuality_id: "punctuality"
  };

  const { error } = await supa
    .from("survey_responses")
    .insert(data);

  if (error) {
    console.error("Supabase insert error:", error);
  }
}
