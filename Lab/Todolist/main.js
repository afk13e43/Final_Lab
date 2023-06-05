$(function()
{
    $("[type='checkbox']").on("change",updateProgress);
    $("progress").attr("min",0);
    $("progress").attr("max", $("[type='checkbox']").length);
    $("progress").attr("value", 0);
});

function updateProgress()
{
    let hasChecked=0;
    for(let x=0;x<$("[type='checkbox']").length;x++)
    {
        var u=$("[type='checkbox']")[x];
        var v=$("span")[x];
        if(u.checked)
        {
            hasChecked+=1;
            v.style.color="red";
            v.className="t0";
            console.log(v.class)
        }
        else
        {
            v.className="t1";
            v.style.color = "black";
        }
    }
    $("meter").attr("max", $("[type='checkbox']").length);
    $("meter").attr("value", hasChecked);

    $("progress").attr("min",0);
    $("progress").attr("max", $("[type='checkbox']").length);
    $("progress").attr("value", hasChecked);
}