const SUPABASE_URL="https://zuzufciobmzjfcaujpet.supabase.co"
const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1enVmY2lvYm16amZjYXVqcGV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3OTg3ODAsImV4cCI6MjA4NTM3NDc4MH0.Md56UoBCOUjOTu5qEvJsMYG0TZvgAFmWU6jPgTgTAn4"

const supa = supabase.createClient(SUPABASE_URL,SUPABASE_KEY)

const session_id = crypto.randomUUID()

const sliders={
  task:{value:50},
  vulnerability:{value:50}
}

// =======================
// UPDATE UI
// =======================
function updateSlider(id){

  const s=sliders[id]

  const thumb=document.getElementById(id+"_thumb")
  const bubble=document.getElementById(id+"_bubble")
  const fill=document.getElementById(id+"_fill")

  const label0=document.getElementById(id+"_label_0")
  const label100=document.getElementById(id+"_label_100")

  let value = s.value
  let percent = Math.max(0, Math.min(100, value))

  thumb.style.left = percent + "%"
  bubble.style.left = percent + "%"
  fill.style.width = percent + "%"

  bubble.innerText = Math.round(value)

  label0.style.left = "0%"
  label100.style.left = "100%"
}

// =======================
// BUTTONS
// =======================
function adjust(id,step){
  sliders[id].value += step
  updateSlider(id)
  logResponse()
}

// =======================
// DRAG
// =======================
function setupDrag(id){

  const track=document.getElementById(id+"_track")
  const thumb=document.getElementById(id+"_thumb")

  let dragging=false
  let startValue=0

  function startDrag(clientX){
    dragging=true
    startValue = sliders[id].value
    moveAt(clientX)
  }

  function moveAt(clientX){
    const rect=track.getBoundingClientRect()
    let percent = ((clientX - rect.left) / rect.width) * 100
    percent = Math.max(0, Math.min(100, percent))

    sliders[id].value = percent
    updateSlider(id)
  }

  function stopDrag(){
    if(!dragging) return
    dragging=false

    // ✅ SAVE ONLY IF VALUE CHANGED
    if(startValue !== sliders[id].value){
      logResponse()
    }
  }

  // MOUSE
  thumb.addEventListener("mousedown",(e)=>{
    e.preventDefault()
    startDrag(e.clientX)
  })

  document.addEventListener("mousemove",(e)=>{
    if(dragging) moveAt(e.clientX)
  })

  document.addEventListener("mouseup",stopDrag)

  // TOUCH
  thumb.addEventListener("touchstart",(e)=>{
    startDrag(e.touches[0].clientX)
  })

  document.addEventListener("touchmove",(e)=>{
    if(dragging) moveAt(e.touches[0].clientX)
  })

  document.addEventListener("touchend",stopDrag)
}

// =======================
// INIT
// =======================
Object.keys(sliders).forEach(id=>{
  setupDrag(id)
  updateSlider(id)
})

// =======================
// DATABASE
// =======================
async function logResponse(){

  const data={
    session_id:session_id,
    task_value:sliders.task.value,
    vulnerability_value:sliders.vulnerability.value
  }

  console.log("Saving:", data) // 🔍 DEBUG

  const {error}=await supa
    .from("survey_responses")
    .insert(data)

  if(error){
    console.error("Supabase ERROR:", error)
  } else {
    console.log("Saved successfully")
  }
}
