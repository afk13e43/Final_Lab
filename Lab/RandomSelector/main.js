window.onload = function(){
    //document.write("Hello JavaScript");
};
$("#Fsubmit").attr('disabled',true);
var before;
var dinner_type = 1;
var makingColorCode = '0123456789ABCDEF';
$(function(){
    $("#sele").on("click",function(){
        $("#food").show();
        if($('input[name=dinner_type]:checked').val()==1)
        {
            var numberOfListItem = tai.length;
            var randomChildNumber= Math.floor(Math.random()*numberOfListItem);
            if(before == randomChildNumber)
            {
                while(true)
                {
                    randomChildNumber= Math.floor(Math.random()*numberOfListItem);
                    if(randomChildNumber!= before)
                    {
                        break;
                    }
                }
            }
            $("h1").text($("li").eq(randomChildNumber).text());
            var obj = document.getElementById("food");
            console.log(randomChildNumber);
            before = randomChildNumber;
            if(randomChildNumber===0)
            {obj.src="tai_dinner/robaban.jpg";}
            else if( randomChildNumber ===1)
            {obj.src="tai_dinner/waterju.jpg";}
            else if (randomChildNumber===2)
            {obj.src="tai_dinner/beefnoodle.jpg";}
            else if (randomChildNumber===3)
            {obj.src="tai_dinner/Din.jpg";}
        }
        else if($('input[name=dinner_type]:checked').val()==2)
        {
            var numberOfListItem = jap.length;
            var randomChildNumber= Math.floor(Math.random()*numberOfListItem);
            if(before == randomChildNumber)
            {
                while(true)
                {
                    randomChildNumber= Math.floor(Math.random()*numberOfListItem);
                    if(randomChildNumber!= before)
                    {
                        break;
                    }
                }
            }
            $("h1").text($("li").eq(randomChildNumber).text());
            var obj = document.getElementById("food");
            console.log(randomChildNumber);
            before = randomChildNumber;
            if(randomChildNumber===0)
            {obj.src="jap_dinner/raman.jpeg";}
            else if( randomChildNumber ===1)
            {obj.src="jap_dinner/sushi.jpg";}
            else if (randomChildNumber===2)
            {obj.src="jap_dinner/kazui.jpg";}

        }else if($('input[name=dinner_type]:checked').val()==3)
        {
            $("#food").hide();
            var finalCode="#000000";
            while(finalCode=="#000000"|finalCode=="#FFFFFF")
            {
                finalCode = '#';
                for (var counter = 0; counter < 6; counter++) {
                    finalCode =finalCode+ makingColorCode[Math.floor(Math.random() * 16)];
                }
            }
            var numberOfListItem = other.length;
            var randomChildNumber= Math.floor(Math.random()*numberOfListItem);
            if(before == randomChildNumber)
            {
                while(true)
                {
                    randomChildNumber= Math.floor(Math.random()*numberOfListItem);
                    if(randomChildNumber!= before)
                    {
                        break;
                    }
                }
            }
            if(other[randomChildNumber].indexOf("Pizza")!=-1|other[randomChildNumber].indexOf("pizza")!=-1|other[randomChildNumber].indexOf("披薩")!=-1)//It's Pizza Time!
            {
                $("#food").show();
                $("#food").attr("src","pizza_time/pizzatime.jpg");
            }
            $("font").text($("li").eq(randomChildNumber).text());
            $("#othername").css("color",finalCode);
            var obj = document.getElementById("food");
            console.log(randomChildNumber);
            before = randomChildNumber;
        }

    });
    $("#tai").on("click",function(){

        $("h1").text("台式晚餐");
        var i =0;
        $("#othername").hide();
        $("#food").attr("src","");
        $("#food").show();
        $("#Finput").hide();
        $("#Fsubmit").hide();
        while(i<tai.length)
        {
            $('#set'+i).text(tai[i]);
            i++;
        }
        while(i<10)
        {
            $('#set'+i).text("");
            i++;
        }
    });
    $("#other").on("click",function(){
        $("h1").text("我的最愛");
        var i =0;
        $("#food").attr("src","");
        $("#othername").show();
        $("#food").hide();
        $("#Finput").show();
        $("#Fsubmit").show();
        $("#Fsubmit").on("click",function(){
            $("#Fsubmit").attr('disabled',true);
            var newfood=$("#Finput").val();
            var temp =[];
            other.push(newfood);
            if(other.length>10)
            {
                other.shift();
            }
            var i =0;
            while(i<other.length)
            {
                $('#set'+i).text(other[i]);
                i++;
            }
            while(i<10)
            {
                $('#set'+i).text("");
                i++;
            }
        });
        var origin=$("#Finput").val();
        $("#Finput").on("keyup",function(){
            if($("#Finput").val!=origin)
            {
                $("#Fsubmit").attr('disabled',false);
            }
        });
        while(i<other.length)
        {
            $('#set'+i).text(other[i]);
            i++;
        }
        while(i<10)
        {
            $('#set'+i).text("");
            i++;
        }
    });
    $("#jap").on("click",function(){
        $("h1").text("日式晚餐");
        $("#food").attr("src","");
        var i =0;
        $("#othername").hide();
        $("#food").show();
        $("#Finput").hide();
        $("#Fsubmit").hide();
        while(i<jap.length)
        {
            $('#set'+i).text(jap[i]);
            i++;
        }
        while(i<10)
        {
            $('#set'+i).text("");
            i++;
        }
    });
});