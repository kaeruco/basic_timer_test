var count = 0;

document.getElementById("start-stop-button").onclick = ()=>{
  document.getElementById("start-stop-button").textContent = "stop"

  let min_only = document.getElementById("min_input");
  let sec_only = document.getElementById("sec_input");
  let sec = parseInt(min_only.value) * 60 + parseInt(sec_only.value);

  count = sec;

  countdown();
};




var countdown = async () => {
  for(var i = count; i >= 0; i--){
    /// １秒間だけ待つ
    await sleep(1000);
    document.getElementById("min_input").value = (i/60|0);
    document.getElementById("sec_input").value = (i%60);
  }
}

var sleep = time => new Promise(resolve => setTimeout(resolve, time));

