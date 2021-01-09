let count = 0;
let base_time; //必要な文

// start_stop_buttonが押されたときの関数
document.getElementById("start_stop_button").onclick = () => {
  base_time = performance.now();

  let min_only = document.getElementById("min_display");
  if (min_only.value === ''){
    min_only_int = 0;
  } else {
    min_only_int = parseInt(min_only.value);
  }

  let sec_only = document.getElementById("sec_display");
  if (sec_only.value === ''){
    sec_only_int = 0;
  } else {
    sec_only_int = parseInt(sec_only.value);
  }

  if (min_only_int === 0 && sec_only_int === 0){
    ;
  } else {
    document.getElementById("start_stop_button").textContent = "stop";

    let sec = min_only_int * 60 + sec_only_int;

    count = sec;

    countdown();
  }

};

// タイマーでカウントダウンをする関数
var countdown = async () => {
  for(var i = count; i >= 0; i--){
    if (i === count) {
      await sleep(1000);

      console.log('i = count:', i); //製作用
    } else if (i > 0) {
      min_sec_display(i)
      await sleep(1000);

      console.log('i > 0:', i); //製作用
    } else {
      min_sec_display(i)

      console.log('i = 0:', i); //製作用

      end_time = performance.now(); //製作用
      console.log(end_time - base_time); //製作用
    }
  }
};

// 一定時間処理を止める関数
let sleep = time => new Promise(resolve => setTimeout(resolve, time));

// 分・秒表示に戻す関数
let min_sec_display = (time) =>{
  document.getElementById("min_display").value = (time/60|0);
  document.getElementById("sec_display").value = (time%60);
};
