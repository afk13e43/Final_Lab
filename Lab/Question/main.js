var check=0;
var first=0;
$(function(){//儲存目前作答到第幾題
    var currentQuiz=null;//當按鈕按下後，要做的事情
    $("#startButton").on("click",function(){
        if(currentQuiz==null){
            
            $("#returnButton").show();
            currentQuiz=0;//顯示題目
            $("#question").text(questions[0].question);//將選項區清空(可以試著先不寫)
            $("#options").empty();//將選項逐個加入
            questions[0].answers.forEach(function(element,index,array){
                $("#options").append(`<input name='options' type='radio' value='${index}'><label>${element[0]}</label><br><br>`);
            });//將按鈕上的文字換成Next
            $("#startButton").attr("value","下一題");
            if(first==0)
            {
                $("body").append('<br><br><br><br><br><input id="returnButton" type="Button" value="重新開始">');
                $("#returnButton").on("click",function(){
                    currentQuiz=null;
                    $("#question").text("");//將選項區清空(可以試著先不寫)
                    $("#options").empty();//將選項逐個加入
                    $("#startButton").attr("value","開始作答");
                    $("#returnButton").hide();
                })
            }
            first=1;
        }
        else{   
            //已經開始作答從這邊繼續
            //巡訪哪一個選項有被選取
            $.each($(":radio"),function(i,val){
                if(val.checked){
                    check=1;
                    //是否已走到最後要產生結果(A~D)
                    if(currentQuiz==29)
                    {
                        $("#returnButton").hide();
                        ans.push(questions[currentQuiz].answers[i][1]);
                        var score=[];
                        score.push(ans[4]+ans[9]+ans[13]+ans[17]+ans[23]+ans[29]);
                        score.push(ans[2]+ans[5]+ans[12]+ans[19]+ans[21]+ans[28]);
                        score.push(ans[1]+ans[7]+ans[14]+ans[16]+ans[24]+ans[27]);
                        score.push(ans[0]+ans[6]+ans[10]+ans[15]+ans[20]+ans[25]);
                        score.push(ans[3]+ans[8]+ans[11]+ans[18]+ans[22]+ans[26]);
                        currentQuiz=currentQuiz+1;
                        
                        //通往最終結果
                        var finalResult=questions[currentQuiz].question;//顯示最終結果的標題
                        $("#question").text(finalResult);//將選項區域清空
                        $("#options").empty();//顯示最終結果內容
                        finalAnswers[0].answers.forEach(function(element,index,array){
                            $("#options").append(`<label>${element[0]}</label><label> ：</label>&nbsp&nbsp<label>${element[1]}</label>&nbsp&nbsp<label>${score[index]}</label><label>分</label><br><br>`);
                        });
                        currentQuiz=null;
                        $("#startButton").attr("value","重新開始");

                    }
                    else{
                        console.log(questions[currentQuiz].answers[i][1]);
                        ans.push(questions[currentQuiz].answers[i][1]);
                        //指定下一題，原始資料從1開始，所以要-1
                        currentQuiz=currentQuiz+1;//顯示新的題目
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function(element,index,array){
                            $("#options").append(`<input name='options'type='radio' value='${index}'><label>${element[0]}</label><br><br>`);
                        });
                    }
                    return false;//跳離迴圈的方式
                }
            }
            );
            if(check==0)
            {
                alert("尚未選擇答案!");
            }
            check=0;
        }
    });
});  
