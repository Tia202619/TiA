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

  // visual position still limited to bar
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
// DRAG (pointer events)
// =======================
function setupDrag(id){

  const track=document.getElementById(id+"_track")
  const thumb=document.getElementById(id+"_thumb")

  let dragging=false
  let startX=0
  let startValue=0

  function move(clientX){
    const rect = track.getBoundingClientRect()
    let deltaX = clientX - startX
    let percentMove = deltaX / rect.width * 100

    sliders[id].value = startValue + percentMove
    updateSlider(id)
  }

  thumb.addEventListener("pointerdown",(e)=>{
    dragging = true
    startX = e.clientX
    startValue = sliders[id].value
    thumb.setPointerCapture(e.pointerId)
  })

  thumb.addEventListener("pointermove",(e)=>{
    if(!dragging) return
    move(e.clientX)
  })

  thumb.addEventListener("pointerup",(e)=>{
    if(!dragging) return

    dragging = false
    thumb.releasePointerCapture(e.pointerId)

    logResponse() // ✅ save on release
  })

  thumb.addEventListener("pointercancel",()=>{
    dragging=false
  })
}

// =======================
// INIT
// =======================
Object.keys(sliders).forEach(id=>{
  setupDrag(id)
  updateSlider(id)
})

// =======================
// DATABASE (ROUNDED)
// =======================
async function logResponse(){

  const data = {
    session_id: session_id,
    task_value: Math.round(sliders.task.value),
    vulnerability_value: Math.round(sliders.vulnerability.value)
  }

  console.log("Saving:", data)

  const {error}=await supa
    .from("survey_responses")
    .insert(data)

  if(error){
    console.error("Supabase ERROR:", error)
  } else {
    console.log("Saved successfully")
  }
}
