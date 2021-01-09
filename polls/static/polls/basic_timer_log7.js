var button_count = 0;
var count_for_reset = 0;

var min_dis = document.getElementById("min_display");
var sec_dis = document.getElementById("sec_display");
var start_stop_btn = document.getElementById("start_stop_button");
var reset_btn = document.getElementById("reset_button");


// start_stop_buttonの関数
start_stop_btn.onclick = () => {
  button_count ++;

  if (button_count % 2 === 1) {
    let base = performance.now();
    console.log('button_count = ki:', button_count);
    let count = count_sec_and_buttons();

    if (button_count === 1) {
      min_dis.disabled = true;
      sec_dis.disabled = true;
      count_for_reset = count;
    }

    countdown(count, base);
  } else {
    console.log('button_count = gu:', button_count)
  }
};

// reset_buttonの関数
reset_btn.onclick = () => {
  min_sec_display(count_for_reset);
  button_count = 0;
  min_dis.disabled = false;
  sec_dis.disabled = false;
};

// カウントダウン関数
let countdown = async (count_time, base_time) => {
  for (var i = count_time; i >= 0; i--) {
    if (button_count % 2 === 0) {
      clearTimeout(id);

      console.log('stop');
      end_time = performance.now(); //製作用
      console.log('total_time:', end_time - base_time); //製作用
      break;
    } else if (i === count_time) {
      var id = await sleep(1000);
      console.log('i = count:', i); //製作用
    } else if (i > 0) {
      min_sec_display(i)
      var id = await sleep(1000);
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





// displayの秒換算とボタン制御の関数
let count_sec_and_buttons = () => {
  min_int = integer(min_dis);
  sec_int = integer(sec_dis);

  if (min_int === 0 && sec_int === 0) {
    ;
  } else {
    start_stop_btn.textContent = "stop";
    reset_btn.disabled = true;
    return  min_int * 60 + sec_int;
  }
};

// inputされた要素を整数化する関数
let integer = (time_element) => {
  if (time_element.value === '') {
    return 0;
  } else {
    return parseInt(time_element.value);
  }
};

// 秒のみから、分・秒表示に戻す関数
let min_sec_display = (time) => {
  min_dis.value = (time/60|0);
  sec_dis.value = (time%60);
};

