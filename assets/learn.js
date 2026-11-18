/* freenetsave learning engine: Learn, Practice, Fun challenge, Worksheet. Runs on the visitor's device; nothing is saved or sent. */
(function(){
"use strict";
var D=window.LEARN,G=D.grades,$=function(i){return document.getElementById(i);};
function R(a,b){return a+Math.floor(Math.random()*(b-a+1));}
function pick(a){return a[R(0,a.length-1)];}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=R(0,i),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function E(s){return String(s).replace(/[&<>]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c];});}
var grade=+Object.keys(G)[0],mode="practice",band=null,N=10,sel={pool:[],label:"",list:[],pos:-1};
var list=[],idx=0,right=0,cur=null,locked=false,results=[],missed=[];
var ch={on:false,left:60,score:0,streak:0,best:0,count:0,timer:null,wait:null,end:0},sessionBest={};
var ALL=[];Object.keys(G).forEach(function(g){G[g].forEach(function(t){ALL.push({g:+g,t:t});});});
function gen(){var it=pick(sel.pool),q=it.t.f();q.it=it;q.o=shuffle(q.o);return q;}
function many(k){var seen={},out=[],tries=0;while(out.length<k&&tries<k*40){var q=gen();tries++;var key=q.q+"|"+q.a;if(seen[key]&&tries<k*30)continue;seen[key]=1;out.push(q);}return out;}
function confetti(){if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches)return;var b=document.createElement("div");b.className="confetti";var col=["#2563eb","#f97316","#16a34a","#a855f7","#ec4899","#facc15"];for(var i=0;i<40;i++){var s=document.createElement("i");s.style.left=R(0,100)+"%";s.style.background=col[i%6];s.style.animationDelay=(R(0,60)/100)+"s";s.style.animationDuration=(R(140,260)/100)+"s";b.appendChild(s);}document.body.appendChild(b);setTimeout(function(){b.remove();},3400);}
/* picker */
function chips(box,names,curN,fn){box.innerHTML="";names.forEach(function(c){var b=document.createElement("button");b.type="button";b.textContent=c;b.setAttribute("aria-pressed",String(c===curN));b.onclick=function(){fn(c);};box.appendChild(b);});box.style.display=names.length>1?"":"none";}
function catCards(box,cats,curN,inG,fn){box.innerHTML="";box.style.display="";box.className="cats big";cats.forEach(function(c,k){var ts=inG.filter(function(it){return it.t.c===c;}),b=document.createElement("button");b.type="button";b.className="k"+(k%12);b.setAttribute("aria-pressed",String(c===curN));var ic=document.createElement("i");ic.textContent=ts[0].t.i||"Aa";if(/^[\x20-\x7e]{3,}$/.test(ic.textContent))ic.className=ic.textContent.length>4?"xs":"sm";ic.setAttribute("aria-hidden","true");var w=document.createElement("span");w.className="tx";var s=document.createElement("b");s.textContent=c;var e=document.createElement("span");e.textContent=ts.slice(0,3).map(function(it){return it.t.t;}).join(", ")+(ts.length>3?" and more":"");w.appendChild(s);w.appendChild(e);var ar=document.createElement("em");ar.textContent="›";ar.setAttribute("aria-hidden","true");b.appendChild(ic);b.appendChild(w);b.appendChild(ar);b.onclick=function(){fn(c);};box.appendChild(b);});}
/* page layout: banner, topic group cards, work tiles (built here so every subject page gets it) */
(function(){var hero=$("hero"),h1=hero.querySelector("h1"),p=hero.querySelector("p"),sy=hero.querySelector(".syms");if(!h1||$("catH"))return;
  var tx=document.createElement("div");tx.className="hero-tx";h1.id="heroH";tx.appendChild(h1);if(p)tx.appendChild(p);
  var ul=document.createElement("ul");ul.className="ticks";["Short lessons","Practice questions","Timed challenges","Printable worksheets"].forEach(function(t){var li=document.createElement("li");li.textContent=t;ul.appendChild(li);});tx.appendChild(ul);
  hero.insertBefore(tx,hero.firstChild);if(sy)hero.appendChild(sy);hero.className="hero v2";
  var cats=$("cats"),lab=cats.previousElementSibling;if(lab&&lab.className==="lab")lab.id="tLab";
  var th=document.createElement("div");th.className="thead";th.id="thead";th.innerHTML='<div><h2 id="catH"></h2><p>Choose a topic group to learn, practice and test your skills.</p></div><span class="count" id="catN"></span>';
  var mLab=$("mLab"),after=mLab.previousElementSibling;after.parentNode.insertBefore(th,mLab);th.parentNode.insertBefore(cats,mLab);
  var tg=$("topics");if(lab)tg.parentNode.insertBefore(lab,tg);
  var co=document.createElement("div");co.className="cont";co.id="cont";co.style.display="none";co.innerHTML='<span class="ci" aria-hidden="true">🚀</span><div><h3>Continue practising</h3><p><b id="contT"></b> <span id="contS"></span></p></div><button type="button" class="btn p" id="contB">Continue →</button>';th.parentNode.insertBefore(co,th);
  mLab.textContent="Choose how you want to work";
  var IC={learn:'<path d="M4 6c3-1.5 5.5-1.5 8 0v13c-2.5-1.5-5-1.5-8 0z M12 6c2.5-1.5 5-1.5 8 0v13c-3-1.5-5.5-1.5-8 0"/>',practice:'<path d="M5 19l1-4L16 5l3 3L9 18z M14 7l3 3"/>',challenge:'<circle cx="12" cy="13.5" r="7"/><path d="M12 13.5V9.5 M10 3h4"/>',sheet:'<path d="M7 9V4h10v5 M7 17H5v-7h14v7h-2 M7 14h10v6H7z"/>'};
  [].forEach.call($("modes").children,function(b){if(IC[b.dataset.m])b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+IC[b.dataset.m]+'</svg>'+b.textContent;});$("modes").className="modes v2";
  var n=document.querySelector("p.note");if(n){var t=document.createElement("ul");t.className="note trust";t.innerHTML="<li><b>100% free</b><span>No account needed</span></li><li><b>Safe and private</b><span>Your progress stays on this device only. Nothing is sent to us. <button type=\"button\" id=\"pclr\">Clear my progress</button></span></li><li><b>Learn at your own pace</b><span>Questions are shuffled every time</span></li>";n.parentNode.replaceChild(t,n);}
  /* question screen: tabs, topic list on the left, progress bar, feedback row, tip */
  var play=$("play"),main=play.firstElementChild;main.className="pmain";play.classList.add("v3");
  var side=document.createElement("aside");side.className="side";side.id="side";play.insertBefore(side,main);
  var top=main.querySelector(".top");top.appendChild($("qn"));
  var pg=document.createElement("div");pg.className="prog";pg.innerHTML='<i id="progIn"></i>';top.parentNode.insertBefore(pg,top.nextSibling);
  var row=document.createElement("div");row.className="fbrow";var op=$("opts");op.parentNode.insertBefore(row,op.nextSibling);row.appendChild($("fb"));row.appendChild($("next"));
  var tip=document.createElement("div");tip.className="tip";tip.id="tip";row.parentNode.insertBefore(tip,row.nextSibling);
  var tabs=document.createElement("div");tabs.className="ptabs";tabs.id="ptabs";tabs.setAttribute("role","group");tabs.setAttribute("aria-label","Ways to work");
  var TI={pick:'<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',learn:IC.learn,play:IC.practice,sheet:IC.sheet,game:'<path d="M7 8h10a4 4 0 0 1 4 4v3a2.5 2.5 0 0 1-4.6 1.4L15 15H9l-1.4 1.4A2.5 2.5 0 0 1 3 15v-3a4 4 0 0 1 4-4z M8 11v3 M6.5 12.5h3 M16 12h.01 M18 13.5h.01"/>'};
  [["pick","Topics"],["learn","Lessons"],["play","Practice"],["sheet","Worksheets"],["game","Games"]].forEach(function(t){var b=document.createElement("button");b.type="button";b.dataset.t=t[0];b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+TI[t[0]]+'</svg>'+t[1];tabs.appendChild(b);});
  play.parentNode.insertBefore(tabs,play);
  var cr=document.createElement("div");cr.className="crumb";cr.id="crumb";main.insertBefore(cr,main.firstChild);
  var rs=document.createElement("aside");rs.className="rside";rs.id="rside";rs.innerHTML='<div class="rc"><h3>📊 Your progress</h3><p class="rp"><span id="rpT"></span><b id="rpP"></b></p><div class="prog"><i id="rpIn"></i></div><p class="rb" id="rpB"></p></div><div class="rc" id="hintC"><h3>💡 Hint</h3><p class="hint" id="hintT"></p></div><div class="rc" id="lfC"><h3>📖 Learn first</h3><p id="lfT"></p><button type="button" class="btn p" id="lfB">Read lesson →</button></div>';play.appendChild(rs);
})();
if($("lfB"))$("lfB").onclick=function(){oneTopic();openLearn();};
if($("pclr"))$("pclr").onclick=function(){if(this.dataset.sure){pclear();this.textContent="Progress cleared";delete this.dataset.sure;}else{this.dataset.sure="1";this.textContent="Tap again to clear";}};
function oneTopic(){var it=(cur&&cur.it)||sel.pool[0];var inC=ALL.filter(function(z){return z.g===it.g&&z.t.c===it.t.c;});sel={pool:[it],label:"Grade "+it.g+" · "+it.t.t,list:inC,pos:inC.indexOf(it)};}
if($("ptabs"))$("ptabs").onclick=function(e){var b=e.target.closest("button");if(!b||!sel)return;var t=b.dataset.t;if(t==="pick")toTopics();else if(t==="learn"){oneTopic();openLearn();}else if(t==="play")startPractice();else if(t==="sheet")openSheet();else startCh();};
function sideList(){var s=$("side");if(!s||!sel)return;var it=sel.pool[0],g=it.g,inG=ALL.filter(function(z){return z.g===g;}),cats=[];inG.forEach(function(z){if(cats.indexOf(z.t.c)<0)cats.push(z.t.c);});
  var one=sel.pool.length===1||sel.pool.every(function(z){return z.t.c===it.t.c;}),curC=one?it.t.c:"";
  s.innerHTML="";var h=document.createElement("h3");h.textContent="Grade "+g+" "+D.subject+" Topics";s.appendChild(h);
  cats.forEach(function(c){var ts=inG.filter(function(z){return z.t.c===c;}),b=document.createElement("button");b.type="button";b.setAttribute("aria-pressed",String(c===curC));var ic=document.createElement("i");ic.textContent=ts[0].t.i||"Aa";if(/^[\x20-\x7e]{3,}$/.test(ic.textContent))ic.className="sm";ic.setAttribute("aria-hidden","true");var sp=document.createElement("span");sp.textContent=c;var em=document.createElement("em");em.textContent="›";b.appendChild(ic);b.appendChild(sp);b.appendChild(em);
    b.onclick=function(){sel=ts.length===1?{pool:ts,label:"Grade "+g+" · "+ts[0].t.t,list:ts,pos:0}:{pool:ts,label:"Grade "+g+" · "+c,list:[],pos:-1};if(ch.on)startCh();else startPractice();};s.appendChild(b);});}
function ptitle(){var t=$("tag");if(!$("side")||!cur)return;var ic=(cur.it&&cur.it.t.i)||"";t.innerHTML="";if(ic&&!/^[\x20-\x7e]{3,}$/.test(ic)){var i=document.createElement("i");i.textContent=ic;i.setAttribute("aria-hidden","true");t.appendChild(i);}t.appendChild(document.createTextNode(sel.label.replace(/^Grade \d+ · /,"")));}
function prog(done){var p=$("progIn");if(!p)return;var k=idx+(done?1:0),pc=Math.round(k/list.length*100);p.style.width=pc+"%";if($("rpIn")){$("rpIn").style.width=pc+"%";$("rpT").textContent=k+" of "+list.length+" answered";$("rpP").textContent=pc+"%";var o=cur&&cur.it&&PG[pkey(cur.it)],bs=$("rpB");if(bs)bs.textContent=o?"Your best on this topic: "+o.b+" of "+o.of:"";}}
function rside(){if(!$("rside")||!cur||!cur.it)return;var t=cur.it.t,ls=t.l||[];$("hintC").style.display=ls.length?"":"none";if(ls.length)$("hintT").textContent=ls[0];$("lfC").style.display=ls.length?"":"none";$("lfT").textContent="Read a short lesson on "+t.t+".";
  var c=$("crumb");c.innerHTML="";var a=document.createElement("button");a.type="button";a.textContent=D.subject;a.onclick=toTopics;c.appendChild(a);c.appendChild(document.createTextNode(" › Grade "+cur.it.g+" › "));var b=document.createElement("b");b.textContent=t.t;c.appendChild(b);}
var H0=$("heroH")?$("heroH").textContent:"";
/* banner pictures in assets/banners: <subject>.jpg (Grades 1 to 5) and <subject>-older.jpg (Grades 6 to 12); younger.jpg and older.jpg are used when a subject has none */
var BN={},bnSet=function(){};
(function(){var h=$("hero");if(!h)return;function load(k,f){var u="../assets/banners/"+f+".jpg?v=1",im=new Image();im.onload=function(){BN[k]=u;bnSet();};im.src=u;}
  bnSet=function(){var u=grade>=6?(BN.subOld||BN.old||BN.sub||BN.young):(BN.sub||BN.young||BN.old);if(!u)return;h.style.backgroundImage="url("+u+")";h.classList.add("pic");};
  var sj=String(D.subject).toLowerCase();load("young","younger");load("old","older");load("sub",sj);load("subOld",sj+"-older");})();
/* progress: kept only in this browser, on this device, until the person clears it */
var PK="fns-prog-"+String(D.subject).toLowerCase(),PG={};try{PG=JSON.parse(localStorage.getItem(PK)||"{}")||{};}catch(e){PG={};}
function pkey(it){return it.g+"|"+it.t.t;}
function psave(){try{localStorage.setItem(PK,JSON.stringify(PG));}catch(e){}}
function precord(it,r,n){var k=pkey(it),o=PG[k]||{b:0,n:0,of:n};var pc=r/n;if(pc>=o.b/(o.of||n)){o.b=r;o.of=n;}o.n++;PG[k]=o;PG._last=k;psave();}
function pclear(){PG={};try{localStorage.removeItem(PK);}catch(e){}render();}
function contBox(){var c=$("cont");if(!c)return;var k=PG._last,it=null;if(k)ALL.forEach(function(z){if(pkey(z)===k)it=z;});c.style.display=it?"":"none";if(!it)return;var o=PG[k]||{};$("contT").textContent=it.t.t+" · Grade "+it.g;$("contS").textContent="Best so far: "+o.b+" of "+o.of;$("contB").onclick=function(){var inC=ALL.filter(function(z){return z.g===it.g&&z.t.c===it.t.c;});grade=it.g;sel={pool:[it],label:"Grade "+it.g+" · "+it.t.t,list:inC,pos:inC.indexOf(it)};startPractice();};}
function cards(items,badge){var box=$("topics");box.innerHTML="";items.forEach(function(it,k){var b=document.createElement("button");b.type="button";b.className="c"+(k%5);var ic=document.createElement("i");ic.textContent=it.t.i||"Aa";ic.setAttribute("aria-hidden","true");var w=document.createElement("span");w.className="tx";var s=document.createElement("b");s.textContent=it.t.t;var e=document.createElement("span");e.textContent=(badge?"Grade "+it.g+" · ":"")+it.t.d;w.appendChild(s);w.appendChild(e);b.appendChild(ic);b.appendChild(w);var pr=PG[pkey(it)];if(pr){var bd=document.createElement("em");bd.className="pb"+(pr.b===pr.of?" full":"");bd.textContent=(pr.b===pr.of?"★ ":"✓ ")+pr.b+"/"+pr.of;bd.setAttribute("aria-label","Best score "+pr.b+" of "+pr.of);b.appendChild(bd);}b.onclick=function(){sel={pool:[items[k]],label:"Grade "+items[k].g+" · "+items[k].t.t,list:items,pos:k};go();};box.appendChild(b);});$("none").style.display=items.length?"none":"block";}
function render(){var q=$("find").value.trim().toLowerCase();$("grades").style.display=q?"none":"";$("pickLab").textContent=q?"Topics that match":"Pick a grade";bnSet();var mo=$("more");if(mo){var mu=!q&&D.more&&D.more[grade];mo.style.display=mu?"block":"none";if(mu){if(typeof mu==="string")mu=[["canada-quiz.com",mu]];mo.innerHTML="Full lesson, quiz and printable worksheets on canada-quiz.com: "+mu.map(function(x){return '<a href="'+x[1]+'" target="_blank" rel="noopener">'+E(x[0])+"</a>";}).join(" · ");}}
  if($("thead")){$("thead").style.display=q?"none":"";$("tLab").textContent=q?"":"Pick a topic";$("heroH").innerHTML=q?E(H0):'<span class="gp">Grade '+grade+'</span> '+E(D.subject);}
  if(q){$("cats").style.display="none";$("mix").style.display="none";cards(ALL.filter(function(it){return (it.t.t+" "+it.t.d+" "+it.t.c+" grade "+it.g).toLowerCase().indexOf(q)>-1;}).slice(0,40),true);return;}
  [].forEach.call($("grades").children,function(b){b.setAttribute("aria-pressed",String(+b.dataset.g===grade));});
  var inG=ALL.filter(function(it){return it.g===grade;}),cats=[];inG.forEach(function(it){if(cats.indexOf(it.t.c)<0)cats.push(it.t.c);});if(cats.indexOf(band)<0)band=cats[0];
  var inB=inG.filter(function(it){return it.t.c===band;});
  if($("thead")){catCards($("cats"),cats,band,inG,function(c){band=c;render();try{$("mLab").scrollIntoView({behavior:"smooth",block:"start"});}catch(e){}});$("catH").textContent="Grade "+grade+" "+D.subject+" Topics";var dn=inG.filter(function(it){return PG[pkey(it)];}).length;$("catN").textContent=dn?dn+" of "+inG.length+" topics done":cats.length+" topic group"+(cats.length>1?"s":"")+" · "+inG.length+" topics";contBox();$("tLab").textContent=band+" · "+inB.length+" topic"+(inB.length>1?"s":"");}
  else chips($("cats"),cats,band,function(c){band=c;render();});
  cards(inB,false);
  $("mix").style.display=mode==="learn"?"none":"";$("mix").textContent="Mixed review: all of Grade "+grade;$("mix").onclick=function(){sel={pool:inG,label:"Grade "+grade+" · Mix of everything",list:[],pos:-1};go();};
  try{history.replaceState(null,"","#g"+grade);}catch(e){}}
var MD={learn:"See how it works, step by step, with examples.",practice:"Tap the right answer. Each one is explained.",challenge:"60 seconds on the clock. How many can you get?",sheet:"A printable page of questions with an answer key."};
function setMode(m){mode=m;[].forEach.call($("modes").children,function(b){b.setAttribute("aria-pressed",String(b.dataset.m===m));});$("mdesc").textContent=MD[m];$("plen").style.display=m==="practice"?"":"none";render();}
function go(){if(mode==="learn"&&sel.pool.length===1)openLearn();else if(mode==="sheet")openSheet();else if(mode==="challenge")startCh();else startPractice();}
var onPick=true;function histStep(name){var p=name==="pick";try{if(!p&&onPick)history.pushState({fnsAct:1},"",location.href);}catch(e){}onPick=p;}
function screen(name){stopClock();histStep(name);$("pick").style.display=name==="pick"?"":"none";["play","done","sheetwrap","learn"].forEach(function(s){$(s).classList.toggle("on",s===name||(s==="sheetwrap"&&name==="sheet"));});document.body.classList.toggle("playing",name==="play");document.body.classList.toggle("inside",name!=="pick");if($("ptabs")){var tn=name==="play"?(ch.on||$("play").classList.contains("ch")?"game":"play"):name;[].forEach.call($("ptabs").children,function(b){b.setAttribute("aria-pressed",String(b.dataset.t===tn));});}
  var nx=sel.pos>-1&&sel.pos<sel.list.length-1?sel.list[sel.pos+1]:null;$("nextT").style.display=nx?"":"none";if(nx)$("nextT").textContent="Next topic: "+nx.t.t;
  var el=$({pick:"pick",play:"play",done:"done",sheet:"sheetwrap",learn:"learn"}[name]);window.scrollTo({top:name==="pick"?0:el.getBoundingClientRect().top+window.pageYOffset-10,behavior:"auto"});}
/* learn */
function fillSteps(ol,it){ol.innerHTML="";(it.t.l||[]).forEach(function(s){var li=document.createElement("li");li.textContent=s;ol.appendChild(li);});}
function examples(){var box=$("lex");box.innerHTML="";many(3).forEach(function(q){var d=document.createElement("div");d.className="ex";d.innerHTML='<div class="exq">'+q.q+"</div><p><b>Answer: "+E(q.a)+"</b></p>"+(q.h?"<p>"+E(q.h)+"</p>":"");box.appendChild(d);});}
function openLearn(){var it=sel.pool[0];$("ltag").textContent="Grade "+it.g+" · "+it.t.c;$("ltitle").textContent=it.t.t;fillSteps($("lsteps"),it);examples();screen("learn");}
function setHelp(on){var ok=!ch.on&&cur&&cur.it&&(cur.it.t.l||[]).length>0;$("help").style.display=ok?"":"none";on=on&&ok;$("help").setAttribute("aria-expanded",String(on));$("helpbox").style.display=on?"block":"none";if(on)fillSteps($("helpbox"),cur.it);}
/* questions */
function plain(s){return String(s).replace(/<small>[\s\S]*?<\/small>/g,"").replace(/<[^>]+>/g," ").replace(/\([^)]*\)/g," ").replace(/[^\p{L}\p{N}\s'’.,?!_-]/gu," ").replace(/\s+/g," ").trim();}
function sayText(after){if(!cur||!cur.v)return "";var q=plain(cur.q);if(!after)return (cur.v==="q"||cur.v==="qa")?q:"";if(cur.v==="a"||cur.v==="qa")return plain(cur.a);if(cur.v==="f")return q.replace(/_+/,plain(cur.a));return q;}
function say(t){try{var S=window.speechSynthesis;if(!S||!D.voice||!t)return;S.cancel();var u=new SpeechSynthesisUtterance(t);u.lang=D.voice;u.rate=0.85;S.speak(u);}catch(e){}}
function hearBtn(after){var b=$("hear");if(!b){b=document.createElement("button");b.type="button";b.id="hear";b.className="hear";$("q").parentNode.insertBefore(b,$("q").nextSibling);}var t=(D.voice&&window.speechSynthesis)?sayText(after):"";b.style.display=t?"":"none";b.textContent="🔈 Hear it";b.onclick=function(){say(t);};return t;}
function putQ(){var el=$("q");el.innerHTML=cur.q;el.classList.toggle("long",cur.q.replace(/<[^>]+>/g,"").length>42);var box=$("opts");box.innerHTML="";
  cur.o.forEach(function(o){var b=document.createElement("button");b.type="button";b.textContent=o;if(!/[A-Za-z0-9]/.test(o)&&o.length<=10)b.className="emo";b.onclick=function(){answer(b,o);};box.appendChild(b);});
  $("fb").className="fb";$("fb").innerHTML="";$("next").classList.remove("on");if($("tip"))$("tip").className="tip";ptitle();rside();box.classList.toggle("list",cur.o.some(function(o){return o.length>16;}));locked=false;setHelp(false);var ht=hearBtn(false);if(ht&&SND&&!ch.on)say(ht);}
function mark(btn,o){[].forEach.call($("opts").children,function(b){b.disabled=true;if(b.textContent===cur.a)b.classList.add("right");});var ok=o===cur.a;if(!ok)btn.classList.add("wrong");return ok;}
var SND=true,AC=null,run=0;
function snd(ok){if(!SND)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();if(AC.state==="suspended")AC.resume();var t=AC.currentTime;(ok?[660,880,1320]:[220,165]).forEach(function(f,i){var o=AC.createOscillator(),g=AC.createGain();o.type=ok?"triangle":"sine";o.frequency.value=f;g.gain.setValueAtTime(0.0001,t+i*0.09);g.gain.exponentialRampToValueAtTime(0.16,t+i*0.09+0.02);g.gain.exponentialRampToValueAtTime(0.0001,t+i*0.09+0.22);o.connect(g);g.connect(AC.destination);o.start(t+i*0.09);o.stop(t+i*0.09+0.25);});}catch(e){}}
function praise(){run++;var p=pick(["Correct! ⭐","Great job! 🎉","You got it! 👍","Super! 🌟","Well done! 👏","Yes! 😀","Nice work! 💪"]);return run>=3?run+" in a row! 🔥 "+p:p;}
(function(){var b=document.createElement("button");b.type="button";b.className="fns-snd";b.textContent="🔊";b.setAttribute("aria-label","Sound on. Tap to turn sound off.");b.style.cssText="position:fixed;right:14px;bottom:14px;z-index:99980;width:46px;height:46px;border-radius:50%;border:0;background:#fff;box-shadow:0 3px 12px rgba(23,32,51,.25);font-size:22px;cursor:pointer";b.onclick=function(){SND=!SND;b.textContent=SND?"🔊":"🔇";b.setAttribute("aria-label",SND?"Sound on. Tap to turn sound off.":"Sound off. Tap to turn sound on.");};function add(){document.body.appendChild(b);}if(document.body)add();else document.addEventListener("DOMContentLoaded",add);})();
function feedback(ok,head,body){snd(ok);if(!ok)run=0;var fb=$("fb");fb.className="fb "+(ok?"ok":"no");fb.innerHTML="";var b=document.createElement("b");b.textContent=head;fb.appendChild(b);if(body){var s=document.createElement("span");s.textContent=body;fb.appendChild(s);}}
function answer(btn,o){if(locked)return;locked=true;var ok=mark(btn,o);var ht=hearBtn(true);if(ht&&SND&&!ch.on&&cur.v!=="q")setTimeout(function(){say(ht);},450);
  if(ch.on){snd(ok);if(ok){right++;ch.streak++;ch.best=Math.max(ch.best,ch.streak);ch.score+=10+Math.min(ch.streak-1,5)*2;}else{ch.streak=0;missed.push(cur);}hud();ch.wait=setTimeout(function(){ch.wait=null;if(ch.on&&ch.timer)nextCh();},ok?350:1300);return;}
  results[idx]=ok;if(ok)right++;else missed.push(cur);feedback(ok,ok?praise():"Not quite. The answer is: "+cur.a,cur.h);
  $("next").textContent=idx===N-1?"See score":"Next question →";$("next").classList.add("on");$("next").focus();dots();prog(true);
  var tp=$("tip"),ls=(cur.it&&cur.it.t.l)||[];if(tp&&ls.length){var l0=ls[idx%ls.length];tp.innerHTML="";var tb=document.createElement("b");tb.textContent="💡 Tip: ";tp.appendChild(tb);tp.appendChild(document.createTextNode(l0));tp.className="tip on";}}
function dots(){var d=$("dots");d.innerHTML="";d.classList.toggle("many",N>10);for(var i=0;i<N;i++){var e=document.createElement("i");if(results[i]===true)e.className="ok";else if(results[i]===false)e.className="no";else if(i===idx)e.className="now";d.appendChild(e);}}
function startPractice(){ch.on=false;idx=0;right=0;results=[];missed=[];list=many(N);N=Math.min(N,list.length)||N;$("play").classList.remove("ch");$("tag").textContent=sel.label;screen("play");sideList();showQ();}
function showQ(){cur=list[idx];$("qn").textContent="Question "+(idx+1)+" of "+list.length;putQ();dots();prog(false);}
function nextQ(){idx++;if(idx<list.length){showQ();return;}var pc=right/list.length;if(sel.pool.length===1)precord(sel.pool[0],right,list.length);stars(pc===1?3:(pc>=.8?2:(pc>=.5?1:0)));$("score").textContent=right+" / "+list.length;$("doneMsg").textContent=pc===1?"Perfect score!":(pc>=.8?"Great work!":(pc>=.5?"Good effort!":"Keep practising!"));$("doneSub").textContent=sel.label+". Questions are shuffled every round.";review();screen("done");$("again").focus();if(pc>=.8)confetti();}
function stars(k){var s="";for(var i=0;i<3;i++)s+=i<k?"★":"<i>★</i>";$("stars").innerHTML=s;}
function review(){var box=$("review");box.innerHTML="";if(!missed.length)return;var h=document.createElement("h3");h.textContent="Have another look at these";box.appendChild(h);missed.slice(0,30).forEach(function(q){var d=document.createElement("div");d.innerHTML=q.q.replace(/<br>/g," &nbsp; ").replace(/<small>/g," <small>");var e=document.createElement("em");e.textContent="Answer: "+q.a+(q.h?". "+q.h:"");d.appendChild(e);box.appendChild(d);});}
/* challenge */
function stopClock(){if(ch.timer){clearInterval(ch.timer);ch.timer=null;}if(ch.wait){clearTimeout(ch.wait);ch.wait=null;}}
function hud(){$("clock").textContent=ch.left;$("pts").textContent=ch.score;$("streak").textContent=ch.streak>=2?ch.streak+" in a row!":"";$("barIn").style.width=(ch.left/60*100)+"%";}
function nextCh(){cur=gen();ch.count++;$("qn").textContent="Question "+ch.count;putQ();}
function startCh(){ch.on=true;ch.left=60;ch.score=0;ch.streak=0;ch.best=0;ch.count=0;right=0;missed=[];$("play").classList.add("ch");$("tag").textContent=sel.label;screen("play");sideList();hud();nextCh();ch.end=Date.now()+60000;
  ch.timer=setInterval(function(){ch.left=Math.max(0,Math.ceil((ch.end-Date.now())/1000));hud();if(ch.left<=0)endCh();},250);}
function endCh(){stopClock();ch.on=false;var prev=sessionBest[sel.label]||0,isBest=ch.score>prev&&prev>0;if(ch.score>prev)sessionBest[sel.label]=ch.score;stars(ch.score>=150?3:(ch.score>=80?2:(ch.score>=30?1:0)));$("score").textContent=ch.score;
  $("doneMsg").textContent=isBest?"New best this visit!":(ch.score>=150?"Lightning fast!":(ch.score>=80?"Great speed!":(ch.score>=30?"Nice run!":"Good try. Go again!")));$("doneSub").textContent=right+" correct in 60 seconds · best streak "+ch.best+". "+sel.label+".";review();screen("done");$("again").focus();if(ch.score>=80)confetti();}
/* worksheet */
var sheetQs=[];
function openSheet(){screen("sheet");buildSheet(true);}
function buildSheet(fresh){var k=+$("sn").value;if(fresh||!sheetQs.length)sheetQs=many(k);var title=D.subject+": "+sel.label.replace(" · ",": "),L="abcd";
  var h='<div class="sh-top"><h2></h2><span>'+E(D.site)+'</span></div><div class="sh-meta"><span>Name<i></i></span><span>Date<i></i></span><span>Score<i class="sm"></i>/ '+sheetQs.length+'</span></div><ol class="sh-q">';
  sheetQs.forEach(function(q,i){h+="<li><b>"+(i+1)+".</b><span>"+q.q+'<small class="ch">'+q.o.map(function(o,j){return "("+L[j]+") "+E(o);}).join(" &nbsp; ")+"</small></span><u></u></li>";});h+="</ol>";
  if($("skey").checked){h+='<div class="sh-key"><h3>Answer key: '+E(title)+"</h3><ol>";sheetQs.forEach(function(q,i){h+="<li><b>"+(i+1)+".</b> ("+L[q.o.indexOf(q.a)]+") "+E(q.a)+"</li>";});h+="</ol></div>";}
  h+='<p class="sh-foot">Free to print and copy for home and classroom use · '+E(D.site)+"</p>";$("sheet").innerHTML=h;$("sheet").querySelector("h2").textContent=title;}
/* wiring */
function rawTopics(){screen("pick");render();}
function toTopics(){var st=null;try{st=history.state;}catch(e){}if(!onPick&&st&&st.fnsAct){history.back();return;}rawTopics();}
window.addEventListener("popstate",function(){if(!onPick)rawTopics();});
(function(){var box=$("grades");Object.keys(G).forEach(function(g){var b=document.createElement("button");b.type="button";b.textContent=g;b.dataset.g=g;b.setAttribute("aria-label","Grade "+g);b.setAttribute("aria-pressed","false");b.onclick=function(){grade=+g;band=null;render();};box.appendChild(b);});})();
$("find").addEventListener("input",render);
$("modes").addEventListener("click",function(e){var b=e.target.closest("button");if(b)setMode(b.dataset.m);});
$("plen").addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;N=+b.dataset.n;[].forEach.call($("plen").querySelectorAll("button"),function(x){x.setAttribute("aria-pressed",String(x===b));});});
$("next").onclick=nextQ;$("help").onclick=function(){setHelp($("help").getAttribute("aria-expanded")!=="true");};
$("back").onclick=toTopics;$("other").onclick=toTopics;$("sback").onclick=toTopics;$("lback").onclick=toTopics;
$("again").onclick=function(){if(mode==="challenge")startCh();else startPractice();};$("toSheet").onclick=openSheet;$("nextT").onclick=function(){var k=sel.pos+1;sel={pool:[sel.list[k]],label:"Grade "+sel.list[k].g+" · "+sel.list[k].t.t,list:sel.list,pos:k};go();};
$("lmore").onclick=examples;$("lprac").onclick=startPractice;$("lsheet").onclick=openSheet;
$("sn").onchange=function(){buildSheet(true);};$("skey").onchange=function(){buildSheet(false);};$("snew").onclick=function(){buildSheet(true);};$("sprint").onclick=function(){window.print();};
document.addEventListener("keydown",function(e){if(!$("play").classList.contains("on")||locked)return;var k="1234abcd".indexOf(e.key.toLowerCase());if(k>-1){var b=$("opts").children[k%4];if(b)b.click();}});
var m=location.hash.match(/^#g(\d+)$/);if(m&&G[+m[1]])grade=+m[1];setMode("practice");
})();
