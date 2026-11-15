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
function cards(items,badge){var box=$("topics");box.innerHTML="";items.forEach(function(it,k){var b=document.createElement("button");b.type="button";b.className="c"+(k%5);var ic=document.createElement("i");ic.textContent=it.t.i||"Aa";ic.setAttribute("aria-hidden","true");var w=document.createElement("span");w.className="tx";var s=document.createElement("b");s.textContent=it.t.t;var e=document.createElement("span");e.textContent=(badge?"Grade "+it.g+" · ":"")+it.t.d;w.appendChild(s);w.appendChild(e);b.appendChild(ic);b.appendChild(w);b.onclick=function(){sel={pool:[items[k]],label:"Grade "+items[k].g+" · "+items[k].t.t,list:items,pos:k};go();};box.appendChild(b);});$("none").style.display=items.length?"none":"block";}
function render(){var q=$("find").value.trim().toLowerCase();$("grades").style.display=q?"none":"";$("pickLab").textContent=q?"Topics that match":"Pick a grade";
  if(q){$("cats").style.display="none";$("mix").style.display="none";cards(ALL.filter(function(it){return (it.t.t+" "+it.t.d+" "+it.t.c+" grade "+it.g).toLowerCase().indexOf(q)>-1;}).slice(0,40),true);return;}
  [].forEach.call($("grades").children,function(b){b.setAttribute("aria-pressed",String(+b.dataset.g===grade));});
  var inG=ALL.filter(function(it){return it.g===grade;}),cats=[];inG.forEach(function(it){if(cats.indexOf(it.t.c)<0)cats.push(it.t.c);});if(cats.indexOf(band)<0)band=cats[0];
  chips($("cats"),cats,band,function(c){band=c;render();});cards(inG.filter(function(it){return it.t.c===band;}),false);
  $("mix").style.display=mode==="learn"?"none":"";$("mix").textContent="Or mix all of Grade "+grade;$("mix").onclick=function(){sel={pool:inG,label:"Grade "+grade+" · Mix of everything",list:[],pos:-1};go();};
  try{history.replaceState(null,"","#g"+grade);}catch(e){}}
var MD={learn:"See how it works, step by step, with examples.",practice:"Tap the right answer. Each one is explained.",challenge:"60 seconds on the clock. How many can you get?",sheet:"A printable page of questions with an answer key."};
function setMode(m){mode=m;[].forEach.call($("modes").children,function(b){b.setAttribute("aria-pressed",String(b.dataset.m===m));});$("mdesc").textContent=MD[m];$("plen").style.display=m==="practice"?"":"none";render();}
function go(){if(mode==="learn"&&sel.pool.length===1)openLearn();else if(mode==="sheet")openSheet();else if(mode==="challenge")startCh();else startPractice();}
function screen(name){stopClock();$("pick").style.display=name==="pick"?"":"none";["play","done","sheetwrap","learn"].forEach(function(s){$(s).classList.toggle("on",s===name||(s==="sheetwrap"&&name==="sheet"));});document.body.classList.toggle("playing",name==="play");
  var nx=sel.pos>-1&&sel.pos<sel.list.length-1?sel.list[sel.pos+1]:null;$("nextT").style.display=nx?"":"none";if(nx)$("nextT").textContent="Next topic: "+nx.t.t;
  var el=$({pick:"pick",play:"play",done:"done",sheet:"sheetwrap",learn:"learn"}[name]);window.scrollTo({top:name==="pick"?0:el.getBoundingClientRect().top+window.pageYOffset-10,behavior:"auto"});}
/* learn */
function fillSteps(ol,it){ol.innerHTML="";(it.t.l||[]).forEach(function(s){var li=document.createElement("li");li.textContent=s;ol.appendChild(li);});}
function examples(){var box=$("lex");box.innerHTML="";many(3).forEach(function(q){var d=document.createElement("div");d.className="ex";d.innerHTML='<div class="exq">'+q.q+"</div><p><b>Answer: "+E(q.a)+"</b></p>"+(q.h?"<p>"+E(q.h)+"</p>":"");box.appendChild(d);});}
function openLearn(){var it=sel.pool[0];$("ltag").textContent="Grade "+it.g+" · "+it.t.c;$("ltitle").textContent=it.t.t;fillSteps($("lsteps"),it);examples();screen("learn");}
function setHelp(on){var ok=!ch.on&&cur&&cur.it&&(cur.it.t.l||[]).length>0;$("help").style.display=ok?"":"none";on=on&&ok;$("help").setAttribute("aria-expanded",String(on));$("helpbox").style.display=on?"block":"none";if(on)fillSteps($("helpbox"),cur.it);}
/* questions */
function putQ(){var el=$("q");el.innerHTML=cur.q;el.classList.toggle("long",cur.q.replace(/<[^>]+>/g,"").length>42);var box=$("opts");box.innerHTML="";
  cur.o.forEach(function(o){var b=document.createElement("button");b.type="button";b.textContent=o;b.onclick=function(){answer(b,o);};box.appendChild(b);});
  $("fb").className="fb";$("fb").innerHTML="";$("next").classList.remove("on");locked=false;setHelp(false);}
function mark(btn,o){[].forEach.call($("opts").children,function(b){b.disabled=true;if(b.textContent===cur.a)b.classList.add("right");});var ok=o===cur.a;if(!ok)btn.classList.add("wrong");return ok;}
function feedback(ok,head,body){var fb=$("fb");fb.className="fb "+(ok?"ok":"no");fb.innerHTML="";var b=document.createElement("b");b.textContent=head;fb.appendChild(b);if(body){var s=document.createElement("span");s.textContent=body;fb.appendChild(s);}}
function answer(btn,o){if(locked)return;locked=true;var ok=mark(btn,o);
  if(ch.on){if(ok){right++;ch.streak++;ch.best=Math.max(ch.best,ch.streak);ch.score+=10+Math.min(ch.streak-1,5)*2;}else{ch.streak=0;missed.push(cur);}hud();ch.wait=setTimeout(function(){ch.wait=null;if(ch.on&&ch.timer)nextCh();},ok?350:1300);return;}
  results[idx]=ok;if(ok)right++;else missed.push(cur);feedback(ok,ok?pick(["Correct!","Right!","Well done!","Yes!","Nice work!"]):"Not quite. The answer is: "+cur.a,cur.h);
  $("next").textContent=idx===N-1?"See score":"Next";$("next").classList.add("on");$("next").focus();dots();}
function dots(){var d=$("dots");d.innerHTML="";d.classList.toggle("many",N>10);for(var i=0;i<N;i++){var e=document.createElement("i");if(results[i]===true)e.className="ok";else if(results[i]===false)e.className="no";else if(i===idx)e.className="now";d.appendChild(e);}}
function startPractice(){ch.on=false;idx=0;right=0;results=[];missed=[];list=many(N);N=Math.min(N,list.length)||N;$("play").classList.remove("ch");$("tag").textContent=sel.label;screen("play");showQ();}
function showQ(){cur=list[idx];$("qn").textContent="Question "+(idx+1)+" of "+list.length;putQ();dots();}
function nextQ(){idx++;if(idx<list.length){showQ();return;}var pc=right/list.length;stars(pc===1?3:(pc>=.8?2:(pc>=.5?1:0)));$("score").textContent=right+" / "+list.length;$("doneMsg").textContent=pc===1?"Perfect score!":(pc>=.8?"Great work!":(pc>=.5?"Good effort!":"Keep practising!"));$("doneSub").textContent=sel.label+". Questions are shuffled every round.";review();screen("done");$("again").focus();if(pc>=.8)confetti();}
function stars(k){var s="";for(var i=0;i<3;i++)s+=i<k?"★":"<i>★</i>";$("stars").innerHTML=s;}
function review(){var box=$("review");box.innerHTML="";if(!missed.length)return;var h=document.createElement("h3");h.textContent="Have another look at these";box.appendChild(h);missed.slice(0,30).forEach(function(q){var d=document.createElement("div");d.innerHTML=q.q.replace(/<br>/g," &nbsp; ").replace(/<small>/g," <small>");var e=document.createElement("em");e.textContent="Answer: "+q.a+(q.h?". "+q.h:"");d.appendChild(e);box.appendChild(d);});}
/* challenge */
function stopClock(){if(ch.timer){clearInterval(ch.timer);ch.timer=null;}if(ch.wait){clearTimeout(ch.wait);ch.wait=null;}}
function hud(){$("clock").textContent=ch.left;$("pts").textContent=ch.score;$("streak").textContent=ch.streak>=2?ch.streak+" in a row!":"";$("barIn").style.width=(ch.left/60*100)+"%";}
function nextCh(){cur=gen();ch.count++;$("qn").textContent="Question "+ch.count;putQ();}
function startCh(){ch.on=true;ch.left=60;ch.score=0;ch.streak=0;ch.best=0;ch.count=0;right=0;missed=[];$("play").classList.add("ch");$("tag").textContent=sel.label;screen("play");hud();nextCh();ch.end=Date.now()+60000;
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
function toTopics(){screen("pick");}
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
