let player;
let currentPlay=Math.floor(Math.random()*3);
function onYouTubeIframeAPIReady(){
    console.log("yt ready!");
    currentPlay=Math.floor(Math.random()*3);
    console.log(currentPlay);
    player=new YT.Player("player",{
       height:"390",
       width:"640",
       videoId:playList[currentPlay],
       playerVars:{
           autoplay:0,//是否自動撥放
           controls:0,//是否顯示控制項
           start:playTime[currentPlay][0],//開始秒數
           end:playTime[currentPlay][1],//結束秒數
           iv_load_policy:5,
           showinfo: 0
       },
       events:{
           onReady:onPlayerReady,
           onStateChange:onPlayerStateChange
       }
   });
function onPlayerReady(event){
    // $("#playButton").on("click",function(){
    //     $("h2").text(player.getVideoData().title);
        // player.playVideo();
    // });
}
//PlayerStateChange
function onPlayerStateChange(event){
    // if(Math.floor(player.getCurrentTime())==playTime[currentPlay][1]){
    //     if(currentPlay<playList.length-1){
    //         currentPlay++;
    //         player.loadVideoById({
    //             videoId:playList[currentPlay],
    //             startSeconds:playTime[currentPlay][0],
    //             endSeconds:playTime[currentPlay][1],
    //             suggestedQuality:"large"
    //         });
    //     }
    //     else{
    //         currentPlay=0;
    //         player.cueVideoById({
    //             videoId:playList[currentPlay],
    //             startSeconds:playTime[currentPlay][0],
    //             endSeconds:playTime[currentPlay][1],
    //             suggestedQuality:"large"});
    //         }
    //      }
    //      if(event.data==1){
    //         $("h2").text(player.getVideoData().title);
    //     }

}
}