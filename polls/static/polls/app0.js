timer = new Array; //配列オブジェクトの作成
count = 0;


// 独自の関数1
// timer-buttonが押されたときに動く関数
document.getElementById("timer-button").onclick = ()=>{
    // getElementById...指定したid値(timer_input)を持つ要素をElementオブジェクトとして返すメソッド
    let output = document.getElementById("timer_input");
    // Elementオブジェクトであるoutputから、（入力欄の）値を取り出す
    let sec = output.value;
    // ブロックスコープ ... ブロック（{}）ごとに作られるスコープ
    // let ... 再宣言NG　再代入OK ブロックの外側からののアクセス不可
    // var ... 再宣言OK　再代入OK ブロックの外側からののアクセス可
    //         おそらく今回は、style.cssの#warning.is-activeからのアクセスを可能にするため。
    var message = document.getElementById("warning");

    // 入力欄が空欄だったら
    if(sec === ""){
        // .classList.add 新しいクラスをつくる
        // 基本的にクラスはhtmlでつくるが、javascriptからつくれる？
        // 今回追加されるクラスの名前は warning.is-active
        message.classList.add("is-active");
        // output.value を空欄にする（なくても問題ないと思う）
        output.value="";
        // このifのイベントを止めるが、document.getElementById("timer-button").onclickのイベントは止めない
        return false;
    }

    // 入力欄が0以下の数字だったら
    if(sec <= 0){
        // .classList.add 新しいクラスをつくる
        // 基本的にクラスはhtmlでつくるが、javascriptからつくれる？
        // 今回追加されるクラスの名前は warning.is-active
        message.classList.add("is-active");
        // output.value を空欄にする
        output.value="";
        // このifのイベントを止めるが、document.getElementById("timer-button").onclickのイベントは止めない
        return false;
    }

    // 上記のifでつくったwarning.is-active クラスを消す
    message.classList.remove("is-active");

    // 現在の日時のオブジェクトを作成する
    nowDate = new Date();
    // 現在の日時+sec秒のオブジェクトを作成する
    endDate = new Date(nowDate.getTime() + sec * 1000);


    count = sec;
    // 最初の「あと〇秒です」コメントのみこの行から出力
    document.getElementById("time").textContent = "あと" + sec + "秒です";

    // 配列の存在チェック
    // ここでは、配列が既に存在したらタイマーを止めるということ
    // 配列が空のほうが望ましいということ

    // おそらく、タイマー作動中にもう一度数値を入れてtimer-buttonを押したときの対策
    // 作動中のタイマーをストップし、新しいタイマーを動かす。
    if(timer.length >= 1){
        stopTimer(); //stopTimer...独自の関数 3
    }

    // setInterval(function, 指定時間)は指定時間ごとにfunctionを繰り返す。
    // pushは配列の末尾に1つ以上の要素を追加することが出来る。

    // push(setInterval略)を使う理由は、おそらくtimer.shift()をするため。
    // タイマー作動中にもう一度数値を入れてtimer-buttonを押したときの対策だと思われる。
    // clearIntervalはsetInterval実行時の戻り値を渡すことで処理を止めることができる。
    // （ちなみに、関数setTimerにはreturnがないのでundefinedが返る）
    // pushを使わない場合はsetInterval実行時の戻り値を一つ（最後に実行されたもの）しか保持していない。
    // pushを使えば、戻り値を全て保持出来る。
    // 参考
    // https://qiita.com/kokosack/items/51f17fc423bfa33edcfa
    // https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q1063499895

    timer.push(setInterval(setTimer,1000)); //stopTimer...独自の関数 2
    output.value="";
};

// 独自の関数 2
const setTimer = ()=>{
    // count - 1 = count
    count--;
    // 2回目以降の「あと〇秒です」コメントを出力
    document.getElementById("time").textContent = "あと" + count + "秒です";
    nowDate = new Date();

    // 終了時間になったら
    if(nowDate.getTime() >= endDate.getTime()){
        // 終了時の「時間になりました」コメントを出力
        document.getElementById("time").textContent = "時間になりました";
        stopTimer(); //stopTimer...独自の関数 3
        // document.getElementById("sound").play();
    }
};

// 独自の関数 3
const stopTimer = ()=>{
    // clearInterval()は、setInterval()でセットしたタイマーを解除する際に使用する。
    // shift()...配列から最初の要素を取り除き、その要素を返す。
    clearInterval(timer.shift());
}

