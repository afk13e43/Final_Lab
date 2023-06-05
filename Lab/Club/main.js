var todate
var count=0;

$(function(){
    $("#submit").attr('disabled',true);
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");
    let topicCount = topic.length;
//一秒鐘有1000毫秒
//每分鐘60秒、每小時60分鐘、每天24小時
    let millisecsPerDay = 24*60*60*1000;
    for(var x=0;x<topicCount;x++){
        todate = (new Date(startDate.getTime()+7*x*millisecsPerDay)).toLocaleDateString().substring(5)
        if(stopD.indexOf(todate)!=-1)
        {
            $("#courseTable").append("<tr>"
            +`<td style="color:gray">${x+1}</td>`
            +`<td>`+`<input id="${"day"+x}" type="text" value="${todate}" style="color:gray" class="temp"></td>`
            +`<td>`+`<input id="${"topic"+x}" type="text" value="${topic[x]}" style="color:gray" class="temp"></td>`
            +"</tr>");
        }
        else
        {
            if(x%2==0)
        {
            $("#courseTable").append(
                "<tr>"+`<td style="color:lightgreen">${x+1}</td>`
                +`<td>`+`<input id="${"day"+x}" type="text" value="${todate}" style="color:gray" class="temp"></td>`
                +`<td>`+`<input id="${"topic"+x}" type="text" value="${topic[x]}" style="color:gray" class="temp"></td>`
                +"</tr>");
        }
        else{
            $("#courseTable").append(
                "<tr>"
                +`<td style="color:blue">${x+1}</td>`
                +`<td>`+`<input id="${"day"+x}" type="text" value="${todate}" style="color:gray" class="temp"></td>`
                +`<td>`+`<input id="${"topic"+x}" type="text" value="${topic[x]}" style="color:gray" class="temp"></td>`
                +"</tr>");
            }
    
    }
}
$("div2 input").on("change",function(){
    if($("div1 input").val()==='')
    {
        alert("請先輸入要規劃天數！");
        $("div2 input").val("");
        return;
    }
    $("#submit").attr('disabled',false);
    $("#courseTable").html("");
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");
    let topicCount = $("div1 input").val();
//一秒鐘有1000毫秒
//每分鐘60秒、每小時60分鐘、每天24小時
    let millisecsPerDay = 24*60*60*1000;
    for(var x=0;x<topicCount;x++){
        var newdate=document.getElementById("inputdate").value.split('-');
        var newDate= new Date(newdate[0],newdate[1]-1,newdate[2]);
        nDate = (new Date(newDate.getTime()+7*x*millisecsPerDay)).toLocaleDateString().substring(5)
        if(stopD.indexOf(nDate)!=-1)
        {
            if(topic[x]===undefined)
            {
                $("#courseTable").append("<tr>"
                +`<td style="color:gray">${x+1}</td>`
                +`<td>`+`<input id="${"day"+x}" type="text" value="${nDate}" style="color:gray" class="temp"></td>`
                +`<td>`+`<input id="${"topic"+x}" type="text" placeholder="請設定自訂主題" style="color:gray" class="temp"></td>`
                +"</tr>");
            }
            else
            {
                $("#courseTable").append("<tr>"
                +`<td style="color:gray">${x+1}</td>`
                +`<td>`+`<input id="${"day"+x}" type="text" value="${nDate}" style="color:gray" class="temp"></td>`
                +`<td>`+`<input id="${"topic"+x}" type="text" value="${topic[x]}" style="color:gray" class="temp"></td>`
                +"</tr>");
            }
        }
        else
        {
            if(x%2==0)
        {
            if(topic[x]===undefined)
            {
                $("#courseTable").append("<tr>"
                +`<td style="color:lightgreen">${x+1}</td>`
                +`<td>`+`<input id="${"day"+x}" type="text" value="${nDate}" style="color:gray" class="temp"></td>`
                +`<td>`+`<input id="${"topic"+x}" type="text" placeholder="請設定自訂主題" style="color:gray" class="temp"></td>`
                +"</tr>");
            }
            else
            {
                $("#courseTable").append("<tr>"
                +`<td style="color:lightgreen">${x+1}</td>`
                +`<td>`+`<input id="${"day"+x}" type="text" value="${nDate}" style="color:gray" class="temp"></td>`
                +`<td>`+`<input id="${"topic"+x}" type="text" value="${topic[x]}" style="color:gray" class="temp"</td>`
                +"</tr>");
            }
        }
        else
        {
            if(topic[x]===undefined)
            {
                $("#courseTable").append("<tr>"
                +`<td style="color:blue">${x+1}</td>`
                +`<td>`+`<input id="${"day"+x}" type="text" value="${nDate}" style="color:gray" class="temp"></td>`
                +`<td>`+`<input id="${"topic"+x}" type="text" placeholder="請設定自訂主題" style="color:gray" class="temp"></td>`
                +"</tr>"
                );
            }
            else
            {
                $("#courseTable").append("<tr>"
                +`<td style="color:blue">${x+1}</td>`
                +`<td>`+`<input id="${"day"+x}" type="text" value="${nDate}" style="color:gray" class="temp"></td>`
                +`<td>`+`<input id="${"topic"+x}" type="text" value="${topic[x]}" style="color:gray" class="temp"></td>`
                +"</tr>"
                );
            }
        }
    }
    }
    })

    $(".temp").on("change",function(){
        // alert($("div1 input").val());
        // alert($("div2 input").val());
        if($("div1 input").val()===''||$("div2 input").val()==='')
        {
            return;
        }
        else
        {
            $("#submit").attr('disabled',false);
        }
    });
    $("div3 input").on("click",function(){
        if($("div1 input").val()==''||$("div2 input").val()=='')
        {
            alert("請完整輸入！")
            return;
        }    
        $("#submit").attr('disabled',true);
        $("#courseTable_set").html("");
        $("#courseTable_set").append("<tr><th></th><th><h1>公布時程</h1></th><th></th></tr>");
        $("#courseTable_set").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");
        let topicCount = $("div1 input").val();
    //一秒鐘有1000毫秒
    //每分鐘60秒、每小時60分鐘、每天24小時
        let millisecsPerDay = 24*60*60*1000;
        for(var x=0;x<topicCount;x++){
            var newdate=document.getElementById("inputdate").value.split('-');
            var newDate= new Date(newdate[0],newdate[1]-1,newdate[2]);
            nDate = (new Date(newDate.getTime()+7*x*millisecsPerDay)).toLocaleDateString().substring(5)
            if(stopD.indexOf(nDate)!=-1)
        {
            if(topic[x]===undefined)
            {
                $("#courseTable_set").append(
                    "<tr>"
                    +`<td style="color:lightgreen">${x+1}</td>`
                    +`<td style="color:gray">${$("#day"+x).val()}</td>`
                    +`<td style="color:gray">${$("#topic"+x).val()}</td>`
                    +"</tr>"
                    );
            }
            else
            {
                $("#courseTable_set").append("<tr>"
                +`<td style="color:blue">${x+1}</td>`
                +`<td style="color:gray">${$("#day"+x).val()}</td>`
                +`<td style="color:gray">${$("#topic"+x).val()}</td>`
                +"</tr>");
            }
        }
        else {if(x%2==0)
            {
                $("#courseTable_set").append(
                    "<tr>"
                    +`<td style="color:lightgreen">${x+1}</td>`
                    +`<td style="color:green">${$("#day"+x).val()}</td>`
                    +`<td style="color:gray">${$("#topic"+x).val()}</td>`
                    +"</tr>"
                    );
            }
            else
            {
                $("#courseTable_set").append("<tr>"
                +`<td style="color:blue">${x+1}</td>`
                +`<td style="color:#3399ff">${$("#day"+x).val()}</td>`
                +`<td style="color:#990000">${$("#topic"+x).val()}</td>`
                +"</tr>");
            }
        }}
    })
});
