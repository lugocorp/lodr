/*
  Lodr is a JavaScript library that allows you to create cool load screens
  It works on any browser without any additional JS libraries
*/

const lodr={}; // Lodr container object
lodr.goal=0; // The number of progress() calls you'll need to dispell the loading screen
lodr.progression=0; // The number of progress() calls you've made

/*
  Function to call when you progress through loading script
*/
lodr.progress=function(){
  if(!lodr.root){
    throw "Cannot progress before you've initialized the loading screen";
  }
  lodr.progression++;
  let percent=Math.round(100*lodr.progression/lodr.goal);
  lodr.root.querySelector("span").innerHTML=lodr.getText(percent);
  if(lodr.progression>=lodr.goal){
    let timer;
    function fadeOut(){
      let opacity=Number(window.getComputedStyle(lodr.root).getPropertyValue("opacity"));
      if(opacity>0.2){
        lodr.root.style["opacity"]=opacity-0.2;
      }else{
        lodr.root.style["display"]="none";
        clearInterval(timer);
      }
    }
    timer=setInterval(fadeOut,100);
  }
}

/*
  Function to call when you add another goal for the loading process
*/
lodr.goalpost=function(){
  if(lodr.progression){
    throw "Cannot add a goal after Lodr progress has started";
  }
  lodr.goal++;
}

/*
  Function to initialize the loading screen
*/
lodr.load=function(options){

  // Add basic loading div with css properties
  let div=document.createElement("div");
  div.style["background-color"]=options.background || 0xffffff;
  if(options.fontFamily) div.style["font-family"]=options.fontFamily;
  if(options.fontStyle) div.style["font-style"]=options.fontStyle;
  if(options.fontSize) div.style["font-size"]=options.fontSize;
  if(options.color) div.style["color"]=options.color;
  div.style["text-align"]="center";
  div.style["position"]="fixed";
  div.style["height"]="100vh";
  div.style["width"]="100vw";
  div.style["left"]=0;
  div.style["top"]=0;

  // Add image
  if(options.image){
    let img=document.createElement("img");
    img.style["margin-bottom"]="15px";
    img.src=options.image;
    div.append(img);
    div.append(document.createElement("br"));
    let ratio=img.height/img.width;
    let maxw=window.innerWidth*0.8;
    let maxh=window.innerHeight*0.3;
    if(maxw*ratio>maxh){
      img.width=maxh/ratio;
      img.height=maxh;
    }else if(maxh/ratio>maxw){
      img.height=maxw*ratio;
      img.width=maxw;
    }
  }

  // Handle text mode
  if(options.mode==="text"){
    lodr.getText=options.text || (percent => `${percent}%`);
    let text=document.createElement("span");
    text.innerHTML=lodr.getText(0);
    div.append(text);
  }

  // Handle bar mode
  if(options.mode==="bar"){

  }

  // Add to document body
  document.body.append(div);
  lodr.root=div;
}
