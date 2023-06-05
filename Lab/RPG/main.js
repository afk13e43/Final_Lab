let mapArray,ctx,currentImgMain,enemyImgMain;
let imgMountain,imgMain,imgEnemy;
let gameover = 3;
let cutImagePositionX,cutImagePositionY;
let enemy_cutImagePositionX,enemy_cutImagePositionY;
let targetImg;
let gamestart=0;
let spider_web_count=5;
var int;

let time_str;
let spider_web_stack=[
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//20*10
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];
let spider_web_setcount=0;
targetImg={
    //主角的目標座標
    "x":-1,
    "y":-1
};
var time = new Date();
var nowTime = time.getTime(); 
var endTime = time.getTime();
//mapArray-決定地圖中每個格子的元素
//ctx-HTML5Canvas用
//currentImgMainX,currentImgMainY-決定主角所在座標
//imgMountain,imgMain,imgEnemy-障礙物,主角,敵人的圖片物件
const gridLength=70;
//網頁載入完成後初始化動作
$(function(){
    function loadImages(sources, callback) {
        $("#timer").text("120");
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for(var src in sources) {
          numImages++;
        }
        for(var src in sources) {
          images[src] = new Image();
          images[src].onload = function() {
            if(++loadedImages >= numImages) {
              callback(images);
            }
          };
          images[src].src = sources[src];
        }
      }
      var sources = {
        mountain: "images/material.png",
        enemy: "images/Enemy.png",
        background:"images/background.webp",//左上h=100,w=60，素材本人100*100，gap=10
        Venom:"images/Venom.png"
        // sources:"images/somesource.png"
      };
        mapArray=[//0-可走,1-障礙,2-終點,3-敵人,7-蜘蛛絲
        [0,1,1,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0],//20*10
        [0,0,0,0,1,1,1,1,1,0,1,0,1,0,0,0,0,0,1,0],
        [0,1,1,0,0,0,0,0,1,0,1,0,1,0,1,1,1,0,1,0],
        [0,1,1,0,1,1,0,0,1,0,1,0,1,0,0,0,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,1],
        [0,1,1,1,1,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0],
        [0,1,0,1,0,0,0,1,1,1,0,1,1,1,0,1,0,5,5,0],
        [0,1,0,1,1,1,0,1,0,0,0,0,0,0,0,1,0,5,5,0],
        [0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,5,5,0],
        [0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0],
        ];
        spider_web_stack=[
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//20*10
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            ];
    ctx=$("#myCanvas")[0].getContext("2d");
    imgMain=new Image();
    imgMain.src="images/Spiderparker.png";
    enemy=new Image();
    enemy.src="images/Venom.png";
    spiderslik=new Image();
    spiderslik.src="images/spiderslik.png";
    currentImgMain={
        "x":0,
        "y":0
    };
    enemyImgMain={
        "x":19*gridLength,
        "y":9*gridLength
    };
    gamestart=0;
    let draw5=0;
    $("#talkBox").text("P1為左方玩家(WASD控制)，P2為右方玩家(上下左右控制)，P1不被P2抓到持續兩分鐘即獲勝，按Enter開始遊戲");
    loadImages(sources,function(images)
    {
        for(var x in mapArray){
            for(var y in mapArray[x]){
                if(mapArray[x][y]==1){
                    ctx.drawImage(images.mountain,32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                 }
                 else if(mapArray[x][y]==5&&draw5==0){
                     ctx.drawImage(images.mountain,32,65,32,32,y*gridLength,x*gridLength,gridLength*2,gridLength*3);
                        draw5=1;
                 }

            }
        }
    });
    imgMain.onload=function(){
        ctx.drawImage(imgMain,48,0,48,48,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
        ctx.drawImage(enemy,0,48,48,48,enemyImgMain.x,enemyImgMain.y,gridLength,gridLength);
    };
});


function clock()
{
    if(gameover==0)
    {
    if(time_str==0)
    {
        gameover=2;
        return;
    }
    time_str=endTime-nowTime;
    endTime=endTime-1;
    $("#timer").text(time_str);}
    
}
$(document).on("keydown",function(event){
    if(gameover==1)
    {
        event.preventDefault();
        switch(event.code){
            case "Escape":
                gameover=0;
                ctx.clearRect(enemyImgMain.x,enemyImgMain.y,gridLength,gridLength);
                mapArray[enemyImgMain.y/70][enemyImgMain.x/70]=0;
                
                mapArray[currentImgMain.y/70][currentImgMain.x/70]=0;
                ctx.clearRect(currentImgMain.x,currentImgMain.y,gridLength,gridLength);
                currentImgMain={
                    "x":0,
                    "y":0
                };
                enemyImgMain={
                    "x":19*gridLength,
                    "y":9*gridLength
                };   
                $("#talkBox").text("重新開始");
                gameover=3;
                this.location.reload();
        }    
    }
    else if (gameover==2)
    {
        $("#talkBox").text("P1獲勝。");
        const boxes = document.getElementById("myCanvas");
        const result = boxes.getBoundingClientRect();
        console.log(result);
        $("#player").css({"top":result.top+"px"});
        $("#player").css({"left":result.left+"px"});
        $("#player").toggle();
        $("#timer").text("遊戲結束，撥放廣告，按Esc即可跳出");
        event.preventDefault();
        player.playVideo();
        switch(event.code){
            case "Escape":
                gameover=0;
                ctx.clearRect(enemyImgMain.x,enemyImgMain.y,gridLength,gridLength);
                mapArray[enemyImgMain.y/70][enemyImgMain.x/70]=0;
                mapArray[currentImgMain.y/70][currentImgMain.x/70]=0;
                ctx.clearRect(currentImgMain.x,currentImgMain.y,gridLength,gridLength);
                currentImgMain={
                    "x":0,
                    "y":0
                };
                enemyImgMain={
                    "x":19*gridLength,
                    "y":9*gridLength
                };   
                $("#talkBox").text("重新開始");
                gameover=3;
                this.location.reload();
        }    

    }
    else if (gameover==3)
    {
        event.preventDefault();
        switch(event.code){
            case "Enter":
                gameover=0;
        };
        return;
    }
    else
    {
        if(gamestart==0)
        { 
            gamestart=1;
        nowTime = time.getTime(); 
        endTime = time.getTime()+120;
        int = self.setInterval("clock()",1000);
        }
        $("#talkBox").text("P1按E可發射蜘蛛網來阻擋P2(生命值：6)，次數剩餘："+spider_web_count+"；P2可連續撞擊摧毀蜘蛛網");
        for(var x in mapArray){  
            for(var y in mapArray[x]){
                if(mapArray[x][y]==7){
                    ctx.drawImage(spiderslik,0,0,70,70,y*gridLength,x*gridLength,gridLength,gridLength);
                 }
            } 
        }
    }
}
); 


//P2
$(document).on("keydown",function(event){
    if(gameover==0)
    {let targetImg,targetBlock;//cutImagePositionX-決定主角臉朝向哪個方向
    targetImg={
        //p2的目標座標
        "x":-1,
        "y":-1
    };
    targetBlock={//p2的目標(對應2維陣列)
        "x":-1,
        "y":-1
    }
    event.preventDefault();
    switch(event.code){
        case "ArrowLeft":
            targetImg.x=enemyImgMain.x-gridLength;
            targetImg.y=enemyImgMain.y;
            enemy_cutImagePositionX=0;//臉朝左
            enemy_cutImagePositionY=48;
            break;
        case "ArrowUp":
            targetImg.x=enemyImgMain.x;
            targetImg.y=enemyImgMain.y-gridLength;
            enemy_cutImagePositionX=0;//臉朝上
            enemy_cutImagePositionY=48*3;
            break;
        case "ArrowRight":
            targetImg.x=enemyImgMain.x+gridLength;
            targetImg.y=enemyImgMain.y;
            enemy_cutImagePositionX=48*2;//臉朝右
            enemy_cutImagePositionY=48*2;
            break;
        case "ArrowDown":
            targetImg.x=enemyImgMain.x;
            targetImg.y=enemyImgMain.y+gridLength;
            enemy_cutImagePositionX=0;//臉朝下
            enemy_cutImagePositionY=0;
            break;
        default://其他按鍵不處理
            return;
    }
    if(event.code =="ArrowLeft"||event.code =="ArrowRight"||event.code =="ArrowUp"||event.code =="ArrowDown")
    {//確認目標位置不會超過地圖
    if(targetImg.x<=1340&&targetImg.x>=0&&targetImg.y<=640&&targetImg.y>=0){
        targetBlock.x=targetImg.y/gridLength;
        targetBlock.y=targetImg.x/gridLength;
    }
    else{
        targetBlock.x=-1;
        targetBlock.y=-1;
    }
    if(targetBlock.x!=-1&&targetBlock.y!=-1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0://一般道路(可移動)
                // $("#talkBox").text("");
                //清空p2原本所在的位置
                ctx.clearRect(enemyImgMain.x,enemyImgMain.y,gridLength,gridLength);
                mapArray[enemyImgMain.y/70][enemyImgMain.x/70]=0;
                enemyImgMain.x=targetImg.x;
                enemyImgMain.y=targetImg.y;
                console.log(enemyImgMain.x);
                console.log(enemyImgMain.y);
                mapArray[enemyImgMain.y/70][enemyImgMain.x/70]=3;
                break;
            case 1://有障礙物(不可移動)
                // $("#talkBox").text("有山");
                break;
            case 2://終點(可移動)
                
                //清空p2原本所在的位置
                ctx.clearRect(enemyImgMain.x,enemyImgMain.y,gridLength,gridLength);
                mapArray[enemyImgMain.y/70][enemyImgMain.x/70]=0;
                // $("#talkBox").text("抵達終點");
                enemyImgMain.x=targetImg.x;
                enemyImgMain.y=targetImg.y;
                
                console.log(enemyImgMain.x);
                console.log(enemyImgMain.y);
                mapArray[enemyImgMain.y/70][enemyImgMain.x/70]=3;
                break;
            case 3://敵人(不可移動)
                $("#talkBox").text("哈摟");
                break;
            case 4:
                //清空p2原本所在的位置
                ctx.clearRect(enemyImgMain.x,enemyImgMain.y,gridLength,gridLength);
                mapArray[enemyImgMain.y/70][enemyImgMain.x/70]=0;
                $("#talkBox").text("抓到你囉，P2勝利，按Esc重新開始");
                const boxes = document.getElementById("myCanvas");
                const result = boxes.getBoundingClientRect();
                console.log(result);
                enemyImgMain.x=targetImg.x;
                enemyImgMain.y=targetImg.y;
                console.log(enemyImgMain.x);
                console.log(enemyImgMain.y);
                mapArray[enemyImgMain.y/70][enemyImgMain.x/70]=3;
                ctx.drawImage(enemy,enemy_cutImagePositionX,enemy_cutImagePositionY,48,48,enemyImgMain.x,enemyImgMain.y,gridLength,gridLength);
                gameover=1;
                $("#player").css({"top":result.top+"px"});
                $("#player").css({"left":result.left+"px"});
                $("#player").toggle();
                $("#timer").text("遊戲結束，撥放廣告，按Esc即可跳出");
                player.playVideo();
                break;
            case 7:
                if(mapArray[targetBlock.x][targetBlock.y]==7)
                {
                    $("#talkBox").text("衝撞Spider Web");
                    spider_web_stack[targetBlock.x][targetBlock.y]=spider_web_stack[targetBlock.x][targetBlock.y]-1;
                    if(spider_web_stack[targetBlock.x][targetBlock.y]==0)
                    {
                        
                        mapArray[targetBlock.x][targetBlock.y]=0;
                        ctx.clearRect(targetBlock.x,targetBlock.y,gridLength,gridLength);
                    }
                }
            }
        }
        else{
            // $("#talkBox").text("邊界");
        }//重新繪製主角
        ctx.drawImage(enemy,enemy_cutImagePositionX,enemy_cutImagePositionY,48,48,enemyImgMain.x,enemyImgMain.y,gridLength,gridLength);
    }
}}

); 
//處理使用者按下按鍵
$(document).on("keydown",function(event){
    if(gameover==0){
    console.log(event.code);
    let targetBlock;//cutImagePositionX-決定主角臉朝向哪個方向

    targetBlock={//主角的目標(對應2維陣列)
        "x":-1,
        "y":-1
    }
    event.preventDefault();
    switch(event.code){
        case "KeyA":
            targetImg.x=currentImgMain.x-gridLength;
            targetImg.y=currentImgMain.y;
            cutImagePositionX=0;//臉朝左
            cutImagePositionY=48;
            break;
        case "KeyW":
            targetImg.x=currentImgMain.x;
            targetImg.y=currentImgMain.y-gridLength;
            cutImagePositionX=0;//臉朝上
            cutImagePositionY=48*3;
            break;
        case "KeyD":
            targetImg.x=currentImgMain.x+gridLength;
            targetImg.y=currentImgMain.y;
            cutImagePositionX=48*2;//臉朝右
            cutImagePositionY=48*2;
            break;
        case "KeyS":
            targetImg.x=currentImgMain.x;
            targetImg.y=currentImgMain.y+gridLength;
            cutImagePositionX=0;//臉朝下
            cutImagePositionY=0;
            break;
        case "KeyE":
            // $("#talkBox").text("Spider Web Set");
            if(spider_web_count>0)
            {if(cutImagePositionX==0&&cutImagePositionY==0&&(targetImg.x<=1340&&targetImg.x>=0&&targetImg.y+gridLength<=640&&targetImg.y+gridLength>=0))
            {
                if( mapArray[(targetImg.y+gridLength)/70][targetImg.x/70]==0)
               { $("#talkBox").text("Spider Web Set");
                ctx.drawImage(spiderslik,0,0,70,70,targetImg.x,targetImg.y+gridLength,gridLength,gridLength);
                mapArray[(targetImg.y+gridLength)/70][targetImg.x/70]=7;
            spider_web_count--;
            spider_web_stack[(targetImg.y+gridLength)/70][targetImg.x/70]=6;

            }
            }
            else if(cutImagePositionX==48*2&&cutImagePositionY==48*2&&(targetImg.x+gridLength<=1340&&targetImg.x+gridLength>=0&&targetImg.y<=640&&targetImg.y>=0))
            {
                if( mapArray[targetImg.y/70][(targetImg.x+gridLength)/70]==0)
                {$("#talkBox").text("Spider Web Set");
                ctx.drawImage(spiderslik,0,0,70,70,targetImg.x+gridLength,targetImg.y,gridLength,gridLength);
                mapArray[targetImg.y/70][(targetImg.x+gridLength)/70]=7;
                spider_web_count--;
                spider_web_stack[targetImg.y/70][(targetImg.x+gridLength)/70]=6;
            }
            }
            else if(cutImagePositionX==0&&cutImagePositionY==48*3&&(targetImg.x<=1340&&targetImg.x>=0&&targetImg.y-gridLength<=640&&targetImg.y-gridLength>=0))
            {
                if( mapArray[(targetImg.y-gridLength)/70][targetImg.x/70]==0)
                {$("#talkBox").text("Spider Web Set");
                ctx.drawImage(spiderslik,0,0,70,70,targetImg.x,targetImg.y-gridLength,gridLength,gridLength);
                mapArray[(targetImg.y-gridLength)/70][targetImg.x/70]=7;
                spider_web_count--;
                spider_web_stack[(targetImg.y-gridLength)/70][targetImg.x/70]=6;
            }
            }
            else if(cutImagePositionX==0&&cutImagePositionY==48&&(targetImg.x-gridLength<=1340&&targetImg.x-gridLength>=0&&targetImg.y<=640&&targetImg.y>=0))
            {
                if( mapArray[targetImg.y/70][(targetImg.x-gridLength)/70]==0)
               { $("#talkBox").text("Spider Web Set");
                ctx.drawImage(spiderslik,0,0,70,70,targetImg.x-gridLength,targetImg.y,gridLength,gridLength);
                mapArray[targetImg.y/70][(targetImg.x-gridLength)/70]=7;
                spider_web_count--;
                spider_web_stack[targetImg.y/70][(targetImg.x-gridLength)/70]=6;
            }
            }}
            break;
        default://其他按鍵不處理
            return;
    }
    if(event.code =="KeyA"||event.code =="KeyW"||event.code =="KeyS"||event.code =="KeyD")
    {//確認目標位置不會超過地圖
    if(targetImg.x<=1340&&targetImg.x>=0&&targetImg.y<=640&&targetImg.y>=0){
        targetBlock.x=targetImg.y/gridLength;
        targetBlock.y=targetImg.x/gridLength;
    }
    else{
        targetBlock.x=-1;
        targetBlock.y=-1;
    }
    if(targetBlock.x!=-1&&targetBlock.y!=-1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0://一般道路(可移動)
                // $("#talkBox").text("");
                //清空主角原本所在的位置
                if(mapArray[currentImgMain.y/70][currentImgMain.x/70]!=7)
                {mapArray[currentImgMain.y/70][currentImgMain.x/70]=0;}
                ctx.clearRect(currentImgMain.x,currentImgMain.y,gridLength,gridLength);
                currentImgMain.x=targetImg.x;
                currentImgMain.y=targetImg.y;
                mapArray[currentImgMain.y/70][currentImgMain.x/70]=4;
                break;
            case 1://有障礙物(不可移動)
                // $("#talkBox").text("有山");
                break;
            case 2://終點(可移動)
                // $("#talkBox").text("抵達終點");
                //清空主角原本所在的位置
                if(mapArray[currentImgMain.y/70][currentImgMain.x/70]!=7)
                {mapArray[currentImgMain.y/70][currentImgMain.x/70]=0;}
                ctx.clearRect(currentImgMain.x,currentImgMain.y,gridLength,gridLength);
                currentImgMain.x=targetImg.x;
                currentImgMain.y=targetImg.y;
                mapArray[currentImgMain.y/70][currentImgMain.x/70]=4;
                break;
            case 3://敵人(不可移動)
                $("#talkBox").text("哈摟");
                break;
            case 7:
                            //清空主角原本所在的位置
                if(mapArray[currentImgMain.y/70][currentImgMain.x/70]!=7)
                {mapArray[currentImgMain.y/70][currentImgMain.x/70]=0;}
                ctx.clearRect(currentImgMain.x,currentImgMain.y,gridLength,gridLength);
                currentImgMain.x=targetImg.x;
                currentImgMain.y=targetImg.y;
                break;
            }
        }
        else{
            // $("#talkBox").text("邊界");
        }//重新繪製主角
        for(var x in mapArray){
            for(var y in mapArray[x]){
                if(mapArray[x][y]==7){
                    ctx.drawImage(spiderslik,0,0,70,70,y*gridLength,x*gridLength,gridLength,gridLength);
                 }
            }
        }
        ctx.drawImage(imgMain,cutImagePositionX,cutImagePositionY,48,48,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
        }
    }
}
);