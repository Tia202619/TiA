const SUPABASE_URL = "https://zuzufciobmzjfcaujpet.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1enVmY2lvYm16amZjYXVqcGV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3OTg3ODAsImV4cCI6MjA4NTM3NDc4MH0.Md56UoBCOUjOTu5qEvJsMYG0TZvgAFmWU6jPgTgTAn4";

let supa = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const session_id = crypto.randomUUID();

const sliders = ["comfort", "vulnerability", "punctuality"];

function updateDisplay(id) {
  const slider = document.getElementById(id);
  document.getElementById(id + "_value").innerText = slider.value;
}

function updateMarkers(id) {
  const slider = document.getElementById(id);
  const zeroMarker = document.getElementById(id + "_zero");
  const hundredMarker = document.getElementById(id + "_hundred");

  const min = parseInt(slider.min);
  const max = parseInt(slider.max);
  const range = max - min;

  const zeroPercent = ((0 - min) / range) * 100;
  const hundredPercent = ((100 - min) / range) * 100;

  zeroMarker.style.left = zeroPercent + "%";
  hundredMarker.style.left = hundredPercent + "%";
}

function adjust(id, step) {
  const slider = document.getElementById(id);
  let value = parseInt(slider.value) + step;

  if (value < parseInt(slider.min)) {
    slider.min = value;
  }

  if (value > parseInt(slider.max)) {
    slider.max = value;
  }

  slider.value = value;

  updateDisplay(id);
  updateMarkers(id);
  logResponse();
}

sliders.forEach(id => {
  const slider = document.getElementById(id);

  slider.addEventListener("input", () => {

    const value = parseInt(slider.value);

    if (value <= parseInt(slider.min)) {
      slider.min = value - 10;
    }

    if (value >= parseInt(slider.max)) {
      slider.max = value + 10;
    }

    updateDisplay(id);
    updateMarkers(id);
    logResponse();
  });

  updateDisplay(id);
  updateMarkers(id);
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
