let wordList=["Adult","Aeroplane","Air","Airforce","Airport","Album","Alphabet","Apple","Arm","Army","Baby","Baby","Backpack","Balloon","Banana","Bank","Barbecue","Bathroom","Bathtub","Bed","Bed","Bee","Bible","Bible","Bird","Bomb","Book","Boss","Bottle","Bowl","Box","Boy","Brain","Bridge","Butterfly","Button","Cappuccino","Car","Carpet","Carrot","Cave","Chair","Chief","Child","Chisel","Chocolates","Church","Church","Circle","Circus","Circus","Clock","Clown","Coffee","Comet","Compass","Computer","Crystal","Cup","Cycle","Desk","Diamond","Dress","Drill","Drink","Drum","Dung","Ears","Earth","Egg","Electricity","Elephant","Eraser","Explosive","Eyes","Family","Fan","Feather","Festival","Film","Finger","Fire","Floodlight","Flower","Foot","Fork","Freeway","Fruit","Fungus","Game","Garden","Gas","Gate","Gemstone","Girl","Gloves","God","Grapes","Guitar","Hammer","Hat","Hieroglyph","Highway","Horoscope","halwa","Horse","Hose","Ice","Insect","Junk","Kaleidoscope","Kitchen","Knife","Leg","Library","Liquid","Magnet","Man","Map","Maze","Meat","Meteor","Microscope","Milk","Milkshake","Mist","Monster","Mosquito","Mouth","Nail","Navy","Necklace","Needle","Onion","PaintBrush","Pants","Parachute","Passport","Pebble","Pendulum","Pepper","Perfume","Pillow","Plane","Planet","Pocket","postoffice","Potato","Printer","Prison","Pyramid","Radar","Rainbow","Record","Restaurant","Rifle","Ring","Robot","Rock","Rocket","Roof","Room","Rope","Saddle","Salt","Sandpaper","Sandwich","Satellite","School","Sex","Ship","Shoes","Shop","Shower","Signature","Skeleton","Slave","Snail","Software","Solid","Space","Shuttle","Spectrum","Sphere","Spice","Spiral","Spoon","spotLight","Square","Staircase","Star","Stomach","Sun","Sunglasses","Surveyor","Swimming","Pool","Sword","Table","Tapestry","Teeth","Telescope","Television","Tennis","racquet","Thermometer","Tiger","Toilet","Tongue","Torch","Torpedo","Train","Treadmill","Triangle","Tunnel","Typewriter","Umbrella","Vacuum","Vampire","Videotape","Vulture","Water","Weapon","Web","Wheelchair","Window","Woman","Worm"];(function(){function a(){this.B=function(a){for(var b=0;24>b;b++)this[String.fromCharCode(97+b)]=a[b]||0;.01>this.c&&(this.c=.01),a=this.b+this.c+this.e,.18>a&&(a=.18/a,this.b*=a,this.c*=a,this.e*=a)}}var b=new function(){this.A=new a;var i,j,o,B,J,O,W,_,ha,ia,ja,ka;this.reset=function(){var a=this.A;B=100/(a.f*a.f+.001),J=100/(a.g*a.g+.001),O=1-.01*a.h*a.h*a.h,W=1E-6*-a.i*a.i*a.i,a.a||(ja=.5-a.n/2,ka=5E-5*-a.o),_=0<a.l?1-.9*a.l*a.l:1+10*a.l*a.l,ha=0,ia=1==a.m?0:2E4*(1-a.m)*(1-a.m)+32},this.D=function(){this.reset();var a=this.A;return i=1E5*a.b*a.b,j=1E5*a.c*a.c,o=1E5*a.e*a.e+10,0|i+j+o},this.C=function(d,c){var e=this.A,f=1!=e.s||e.v,g=.1*e.v*e.v,l=1+3E-4*e.w,m=.1*e.s*e.s*e.s,z=1+1E-4*e.t,A=1!=e.s,K=e.x*e.x,L=e.g,M=e.q||e.r,N=.2*e.r*e.r*e.r,P=e.q*e.q*(0>e.q?-1020:1020),Q=e.p?(0|2E4*(1-e.p)*(1-e.p))+32:0,R=e.d,S=e.j/2,T=.01*e.k*e.k,X=e.a,E=i,Y=1/i,Z=1/j,$=1/o,e=5/(1+20*e.u*e.u)*(.01+m);.8<e&&(e=.8);for(var aa,ba,ca,da,ea,e=1-e,fa=!1,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=Array(1024),C=Array(32),y=va.length;y--;)va[y]=0;for(y=C.length;y--;)C[y]=2*Math.random()-1;for(y=0;y<c;y++){if(fa)return y;if(Q&&++ta>=Q&&(ta=0,this.reset()),ia&&++ha>=ia&&(ia=0,B*=_),O+=W,B*=O,B>J&&(B=J,0<L&&(fa=!0)),ba=B,0<S&&(ua+=T,ba*=1+Math.sin(ua)*S),ba|=0,8>ba&&(ba=8),X||(ja+=ka,0>ja?ja=0:.5<ja&&(ja=.5)),++ma>E)switch(ma=0,++la){case 1:E=j;break;case 2:E=o;}0==la?na=ma*Y:1==la?na=1+2*(1-ma*Z)*R:2==la?na=1-ma*$:3==la?(na=0,fa=!0):void 0,M&&(P+=N,ca=0|P,0>ca?ca=-ca:1023<ca&&(ca=1023)),f&&l&&(g*=l,1E-5>g?g=1E-5:.1<g&&(g=.1)),ea=0;for(var wa=8;wa--;){if(ra++,ra>=ba&&(ra%=ba,3==X))for(aa=C.length;aa--;)C[aa]=2*Math.random()-1;0===X?da=ra/ba<ja?.5:-.5:1===X?da=1-2*(ra/ba):2===X?(da=ra/ba,da=.5<da?6.28318531*(da-1):6.28318531*da,da=0>da?1.27323954*da+.405284735*da*da:1.27323954*da-.405284735*da*da,da=0>da?.225*(da*-da-da)+da:.225*(da*da-da)+da):3===X?da=C[Math.abs(0|32*ra/ba)]:void 0,f&&(aa=qa,m*=z,0>m?m=0:.1<m&&(m=.1),A?(pa+=(da-qa)*m,pa*=e):(qa=da,pa=0),qa+=pa,oa+=qa-aa,da=oa*=1-g),M&&(va[sa%1024]=da,da+=va[(sa-ca+1024)%1024],sa++),ea+=da}ea=.125*ea*na*K,d[y]=1<=ea?32767:-1>=ea?-32768:0|32767*ea}return c}};window.jsfxr=function(a){b.A.B(a);var c=b.D();a=new Uint8Array(4*(0|(c+1)/2)+44);var c=2*b.C(new Uint16Array(a.buffer,44),c),h=new Uint32Array(a.buffer,0,44);h[0]=1179011410,h[1]=c+36,h[2]=1163280727,h[3]=544501094,h[4]=16,h[5]=65537,h[6]=44100,h[7]=88200,h[8]=1048578,h[9]=1635017060,h[10]=c;for(var c=c+44,h=0,i="data:audio/wav;base64,";h<c;h+=3)var j=a[h]<<16|a[h+1]<<8|a[h+2],i=i+("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[j>>18]+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[63&j>>12]+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[63&j>>6]+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[63&j]);return h-=c,i.slice(0,i.length-h)+"==".slice(0,h)}})();var styles=getComputedStyle(document.documentElement);const PIXEL_SIZE=parseInt(styles.getPropertyValue("--zoom").trim(),0);let sprites=[];const FPS=30,FRAME_DELAY=1e3/30;let lastUpdateTime=Date.now();const W=~~(window.innerWidth/7),H=~~(Math.min(500,window.innerHeight)/7);stageEl.style.width=`${W}px`,stageEl.style.height=`${H}px`;const TREE_COUNT=10,timeColors=["hsl(50, 69%, 61%)","hsl(197, 71%, 60%)","hsl(208, 51%, 55%)","hsl(214, 46%, 35%)","hsl(219, 48%, 13%)"],Colors={VICTORY:"limegreen",BOO:"indianred"};let timeIndex=0,currentWord="";const playerWords=["",""],playerScores=[0,0],sounds={},compilableClasses={},GameStates={TYPE_SELECTION:"state-type-selection",TYPE_1_GAME:"state-type1-game",TYPE_2_GAME:"state-type2-game"};let gameState;var synth=window.speechSynthesis,utterThis=new SpeechSynthesisUtterance("");utterThis.rate=4;function speak(a){utterThis.text=a,synth.speak(utterThis)}function addSound(b,a){sounds[b]=[],a.forEach(function(c){var d=new Audio;d.src=jsfxr(c),sounds[b].push(d)})}function play(a){sounds[a]&&sounds[a][random(0,sounds[a].length-1)].play()}function registerCompilableClass(a){compilableClasses[a.name]=a}class Word{constructor(a){this.isActive=!0,this.word=a;var b=document.createElement("Sentence");b.setAttribute("word",a),b.setAttribute("classes","sprite"),stageEl.appendChild(b),this.el=compile("Sentence")[0],this.el.appendChild(createNode("div",["pointer","pointer-1"])),this.el.appendChild(createNode("div",["pointer","pointer-2"])),this.x=W/2-3*a.length,this.y=0,this.w=this.el.offsetWidth,this.h=this.el.offsetHeight}destroy(){this.isActive=!1,this.el.remove()}update(){if(this.isActive&&(this.y+=.5,this.y+this.h>H)){this.isActive=!1;const a=this.el.getBoundingClientRect();blastAround(a),play("explosion"),gameState===GameStates.TYPE_1_GAME&&(changeGameState(GameStates.TYPE_SELECTION),setTimeout(()=>{this.destroy()},2e3))}}render(){this.el.style.left=`${pixelize(this.x)}px`,this.el.style.top=`${this.y}px`}}class Ufo{constructor(a){this.isActive=!0,this.creationTime=Date.now(),this.x=0,this.y=0,this.speedX="bird"===a?random(1,3):random(1,2);var b=createNode("div",["sprite",a]);stageEl.appendChild(b),this.el=b}update(){this.isActive&&(this.x+=this.speedX,this.x>W&&(this.isActive=!1,this.el.remove()))}render(){this.el.style.left=`${pixelize(this.x)}px`,this.el.style.bottom=`${this.y}px`}}class Particle{constructor(a,b,c="#fff"){this.isActive=!0,this.x=a,this.y=b,this.size=random(1,5),this.speedX=random(-5,5),this.speedY=random(-5,5),this.drag=.92,this.wander=.15,this.theta=random(0,360)*Math.PI/180;var d=createNode("div",["particle"]);document.body.appendChild(d),this.el=d,this.el.style.backgroundColor=c}update(){this.isActive&&(this.x+=this.speedX,this.y+=this.speedY,this.speedX*=this.drag,this.speedY*=this.drag,this.theta+=random(-.5,.5),this.speedX+=.1*Math.sin(this.theta),this.speedY+=.1*Math.cos(this.theta),this.size*=.8,.1>this.size&&(this.isActive=!1,this.el.remove()))}render(){this.el.style.left=`${pixelize(this.x)}px`,this.el.style.top=`${pixelize(this.y)}px`,this.el.style.transform=`scale(${this.size})`}}function pixelize(a){return Math.floor(a/PIXEL_SIZE)*PIXEL_SIZE}function random(c,a){return c+~~(Math.random()*(a-c))}function incrementTime(){stageEl.style.backgroundColor=timeColors[++timeIndex%timeColors.length]}function createNode(a,b){const c=document.createElement(a);return b.filter(a=>a).forEach(a=>c.classList.add(a)),c}function blast(a,b,c){for(let d=6;d--;){const d=new Particle(a+random(-10,10),b+random(-10,10),c);sprites.push(d)}}function blastAround({left:a,top:b,width:c,height:d},e){for(let f=4;f--;)setTimeout(()=>{blast(a+random(0,c),b+random(0,d),e)},random(0,600))}function update(){if(.005>Math.random()&&incrementTime(),.01>Math.random()){const a=new Ufo("bird");a.y=random(15,H),sprites.push(a)}if(.003>Math.random()){const a=new Ufo("cloud");a.y=random(5,H),sprites.push(a)}sprites.forEach(a=>a.update()),sprites=sprites.filter(a=>a.isActive)}function render(){sprites.forEach(a=>a.render())}function loop(){requestAnimationFrame(loop);Date.now()-lastUpdateTime<FRAME_DELAY||(lastUpdateTime=Date.now(),update(),render())}function updateScoreUi(){p1ScoreEl.setAttribute("class",`number number-${playerScores[0]}`),p2ScoreEl.setAttribute("class",`number number-${playerScores[1]}`)}function checkWin(){var a=!1;playerWords[0]===currentWord.word?a=0:playerWords[1]===currentWord.word&&(a=1),!1!==a&&(playerScores[a]++,updateScoreUi(),play("coin"),gameState===GameStates.TYPE_2_GAME&&speak(`Player ${a+1} gets 1 point`),playerWords[0]=playerWords[1]="",document.documentElement.style.setProperty(`--p1-pointer`,0),document.documentElement.style.setProperty(`--p2-pointer`,0),startNewWord())}function startNewWord(){currentWord&&currentWord.destroy();const a=wordList[random(0,wordList.length)];speak(`new word is, ${a}`),currentWord=new Word(a.toLowerCase()),sprites.push(currentWord)}function startGame(a){document.documentElement.style.setProperty(`--p1-pointer`,0),document.documentElement.style.setProperty(`--p2-pointer`,0),wordList=wordList.sort(()=>.5<Math.random()?1:-1),0===a?changeGameState(GameStates.TYPE_1_GAME):changeGameState(GameStates.TYPE_2_GAME),playerScores[0]=playerScores[1]=0,playerWords[0]=playerWords[1]="",updateScoreUi(),startNewWord()}function gameTypeBtnClickHandler(a){const b=parseInt(a.currentTarget.dataset.type,10);startGame(b)}function compile(a){const b=document.querySelectorAll(a),c=[];return b.forEach(b=>{const d=[...b.attributes].reduce((a,b)=>(a[b.name]=b.value,a),{});b.parentElement.insertBefore(document.createElement("div"),b),b.previousElementSibling.innerHTML=compilableClasses[a].render(d),b.parentElement.insertBefore(b.previousElementSibling.children[0],b.previousElementSibling),b.previousElementSibling.remove(),new compilableClasses[a](b.previousElementSibling,d),c.push(b.previousElementSibling),b.remove()}),c}function changeGameState(a){gameState=a,document.body.setAttribute("class",a)}function init(){changeGameState(GameStates.TYPE_SELECTION);const a=.5<Math.random();for(let b=TREE_COUNT;b--;){const b=createNode("div",["sprite","tree",a?"cactus":""]);b.style.left=`${random(10,W-10)}px`,stageEl.appendChild(b)}window.addEventListener("click",a=>{blast(a.pageX,a.pageY)}),window.addEventListener("keyup",a=>{gameState===GameStates.TYPE_SELECTION&&(38===a.which||40===a.which)&&(document.activeElement?"BUTTON"===document.activeElement.nextElementSibling.tagName?document.activeElement.nextElementSibling.focus():document.activeElement.previousElementSibling.focus():document.querySelector("button").focus())}),window.addEventListener("controllerinput",a=>{if(gameState===GameStates.TYPE_1_GAME||gameState===GameStates.TYPE_2_GAME){if(0===currentWord.word.indexOf(playerWords[a.playerId]+a.letter)){play("powerup"),playerWords[a.playerId]+=a.letter,document.documentElement.style.setProperty(`--p${a.playerId+1}-pointer`,playerWords[a.playerId].length);const b=window[`p${a.playerId+1}`].getBoundingClientRect(),c=window[`p${(1^a.playerId)+1}`].getBoundingClientRect();(gameState!==GameStates.TYPE_1_GAME||0===a.playerId)&&blastAround(b,Colors.VICTORY),gameState===GameStates.TYPE_2_GAME&&blastAround(c,Colors.BOO)}else{play("damage");const b=window[`p${a.playerId+1}`].getBoundingClientRect();blastAround(b,Colors.BOO)}checkWin()}}),loop()}init();const KEYPAD_THROTTLE=80;class Controller{constructor(a,b){var c=String.fromCharCode;this.el=a,this.props=b,this.alphabet=97,this.lastKeypressTime=Date.now(),window.addEventListener("keypress",a=>{if(gameState===GameStates.TYPE_1_GAME){if(1==+this.props.id)return;const b=new Event("controllerinput");return b.letter=c(a.which),b.playerId=+this.props.id,window.dispatchEvent(b),void this.cycleAlphabet(0,c(a.which))}if(a.which===+this.props.enterkey){const a=new Event("controllerinput");return a.letter=c(this.alphabet),a.playerId=+this.props.id,void window.dispatchEvent(a)}if(a.which===+this.props.leftkey||a.which===+this.props.rightkey){if(Date.now()-this.lastKeypressTime<KEYPAD_THROTTLE)return;this.lastKeypressTime=Date.now(),this.cycleAlphabet(a.which===+this.props.leftkey?-1:1)}})}static render(a){return`
            <div class="controller ${a.class}">
                <div class="sprite"><div class="alphabet alphabet-a"></div>
            </div>
        `}cycleAlphabet(a,b){this.alphabet+=a,122<this.alphabet&&(this.alphabet=97),97>this.alphabet&&(this.alphabet=122);const c=this.el.querySelector(".alphabet");c.setAttribute("class",`alphabet alphabet-${b||String.fromCharCode(this.alphabet)}`)}}registerCompilableClass(Controller);class Sentence{constructor(a){this.el=a}static render({classes:a,word:b}){const c=b.toLowerCase().split("").map(a=>parseInt(a,10)?"<div class=\"number number-"+(" "===a?"":a)+"\"></div>":"<div class=\"alphabet alphabet-"+(" "===a?"":a)+"\"></div>").join("");return`
            <div class="word ${a}">
                ${c}
            </div>
        `}}registerCompilableClass(Sentence),addSound("coin",[[2,,.0547,.5447,.1704,.5662,,,,,,,,,,,,,1,,,,,.5],[2,,.0236,.3286,.2658,.6069,,,,,,.2147,.5666,,,,,,1,,,,,.5],[2,,.0143,.5022,.26,.5323,,,,,,.3248,.5518,,,,,,1,,,,,.5]]),addSound("powerup",[[2,,.2307,,.4397,.3404,,.1526,,.0544,.4236,,,.3724,,,,,1,,,,,.5],[2,,.3894,,.3024,.4107,,.1792,,,,,,.0228,,.5141,,,1,,,,,.5]]),addSound("explosion",[[3,,.3417,.4126,.2799,.0141,,.1053,,,,.239,.612,,,,.4363,-.2564,1,,,,,.5]]),addSound("hit",[[3,,.0518,,.1308,.7519,,-.6506,,,,,,,,,,,1,,,.0323,,.5]]),addSound("damage",[[3,,.0138,,.2701,.4935,,-.6881,,,,,,,,,,,1,,,,,.25],[0,,.0639,,.2425,.7582,,-.6217,,,,,,.4039,,,,,1,,,,,.25],[3,,.0948,,.2116,.7188,,-.6372,,,,,,,,,,,1,,,.2236,,.25],[3,,.1606,.5988,.2957,.1157,,-.3921,,,,,,,,,.3225,-.2522,1,,,,,.25],[3,,.1726,.2496,.2116,.0623,,-.2096,,,,,,,,,.2665,-.1459,1,,,,,.25],[3,,.1645,.7236,.3402,.0317,,,,,,,,,,,,,1,,,,,.25]]),addSound("button",[[0,,.1882,,.1329,.2456,,,,,,,,.132,,,,,1,,,.1,,.5]]);