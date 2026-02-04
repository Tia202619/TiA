const SUPABASE_URL = "https://zuzufciobmzjfcaujpet.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1enVmY2lvYm16amZjYXVqcGV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3OTg3ODAsImV4cCI6MjA4NTM3NDc4MH0.Md56UoBCOUjOTu5qEvJsMYG0TZvgAFmWU6jPgTgTAn4";

let supa = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// One anonymous session per page load
const session_id = crypto.randomUUID();

// Slider references
const comfort = document.getElementById("comfort");
const vulnerability = document.getElementById("vulnerability");
const punctuality = document.getElementById("punctuality");

async function logResponse() {
  const data = {
    session_id: session_id,

    comfort_value: parseInt(comfort.value),
    comfort_id: "comfort",

    vulnerability_value: parseInt(vulnerability.value),
    vulnerability_id: "vulnerability",

    punctuality_value: parseInt(punctuality.value),
    punctuality_id: "punctuality"
  };

  const { error } = await supa
    .from("survey_responses")
    .insert(data);

  if (error) {
    console.error("Supabase insert error:", error);
  }
}

// Log immediately when slider position changes
comfort.addEventListener("input", logResponse);
vulnerability.addEventListener("input", logResponse);
punctuality.addEventListener("input", logResponse);
