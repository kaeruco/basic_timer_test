var min = document.getElementById("min_display");
var sec = document.getElementById("sec_display");
var start_stop = document.getElementById("start_stop_button");
var reset = document.getElementById("reset_button");

// start_stop_buttonが押されたときの関数
document.getElementById("start_stop_button").onclick = () => {
  let base = performance.now();
  let count = count_and_buttons();
  countdown(count, base);  
};

// displayの秒換算とボタン制御の関数
let count_and_buttons = () => {
  min_int = integer(min);
  sec_int = integer(sec);

  if (min_int === 0 && sec_int === 0){
    ;
  } else {
    start_stop.textContent = "stop";
    reset.disabled = true;
    return  min_int * 60 + sec_int;
  }
};

// inputされた要素を整数化する関数
let integer = (time_element) => {
  if (time_element.value === ''){
    return 0;
  } else {
    return parseInt(time_element.value);
  }
};

// タイマーでカウントダウンをする関数
let countdown = async (count_time, base_time) => {
  for(var i = count_time; i >= 0; i--){
    if (i === count_time) {
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
      console.log('total_time:', end_time - base_time); //製作用
    }
  }
};

// 一定時間処理を止める関数(sleep関数)
let sleep = time => new Promise(resolve => setTimeout(resolve, time));

// 秒のみから、分・秒表示に戻す関数
let min_sec_display = (time) => {
  document.getElementById("min_display").value = (time/60|0);
  document.getElementById("sec_display").value = (time%60);
};

