let current_step = 1;

window.addEventListener('load', fn, false );
function fn() {
    let nxt = document.getElementById("next_btn");
    let prv = document.getElementById("previous_btn");


    nxt.addEventListener('click', () => {
        if (current_step == 1) {
            current_step++
            document.getElementById(`step_${current_step}`).classList.add("active")
            document.getElementById(`connector_${current_step}`).classList.add("active")
            prv.classList.add("clickable");  
        }
        else if (current_step < 3) {
            current_step++
            document.getElementById(`step_${current_step}`).classList.add("active")
            document.getElementById(`connector_${current_step}`).classList.add("active")
        }
        else if (current_step == 3) {
            current_step++
            document.getElementById(`step_${current_step}`).classList.add("active")
            document.getElementById(`connector_${current_step}`).classList.add("active")
            nxt.classList.remove("clickable");
        }
    });
    prv.addEventListener('click', () => {
        if (current_step == 4) {
            document.getElementById(`step_${current_step}`).classList.remove("active")
            document.getElementById(`connector_${current_step}`).classList.remove("active")
            current_step--
            nxt.classList.add("clickable");  
        }
        else if (current_step > 2) {
            document.getElementById(`step_${current_step}`).classList.remove("active")
            document.getElementById(`connector_${current_step}`).classList.remove("active")
            current_step--
        }
        else if (current_step == 2) {
            document.getElementById(`step_${current_step}`).classList.remove("active")
            document.getElementById(`connector_${current_step}`).classList.remove("active")
            current_step--
            prv.classList.remove("clickable");
        }
    });
};