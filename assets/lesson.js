(function(){
"use strict";
var L=window.LESSON,KEY="fns_learn_lessons";
function $(s,r){return (r||document).querySelector(s);}
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;}
function load(){try{return JSON.parse(localStorage.getItem(KEY)||"{}")||{};}catch(e){return {};}}
function save(o){try{localStorage.setItem(KEY,JSON.stringify(o));}catch(e){}}
function id(){return L.unit+"/"+L.slug;}
function mark(k,v){var o=load(),i=id();o[i]=o[i]||{};if(v===true||!(o[i][k]>=v))o[i][k]=v;save(o);paint();}
function paint(){var o=load();document.querySelectorAll("[data-done]").forEach(function(a){var p=a.getAttribute("data-done").split("|"),r=o[p[0]]||{};a.classList.toggle("isdone",p[1]==="test"?r.test>=8:!!r[p[1]]);});}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function esc(s){return String(s).replace(/[&<>]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c];});}
function parse(s){var p=s.split("|");return {q:p[0],a:p[1],o:[p[1],p[2],p[3],p[4]].filter(function(x){return x;}),h:p[5]||""};}
var POOL=(L&&L.items||[]).map(parse);
function deal(n){var out=[],bag=[];while(out.length<n){if(!bag.length)bag=shuffle(POOL);out.push(bag.pop());}return out;}

function quiz(root,isTest){if(!root||!POOL.length)return;var N=10,i=0,ok=0,qs=[],log=[],ui={};
  function start(){qs=deal(N);i=0;ok=0;log=[];root.innerHTML="";ui.cnt=el("div","cnt");ui.bar=el("div","bar","<i></i>");ui.q=el("div","qq");ui.opts=el("div","mc");ui.fb=el("div");ui.fb.setAttribute("aria-live","polite");ui.go=el("button","btn2","Next question");ui.go.type="button";ui.go.hidden=true;ui.go.onclick=nx;
    [ui.cnt,ui.bar,ui.q,ui.opts,ui.fb,ui.go].forEach(function(x){root.appendChild(x);});show();}
  function show(){var q=qs[i];ui.cnt.textContent="Question "+(i+1)+" of "+N+(isTest?"":"   ·   "+ok+" right so far");ui.bar.firstChild.style.width=(i/N*100)+"%";ui.q.innerHTML=esc(q.q);ui.opts.innerHTML="";ui.fb.className="";ui.fb.innerHTML="";ui.go.hidden=true;
    shuffle(q.o).forEach(function(o){var b=el("button","",esc(o));b.type="button";b.onclick=function(){pick(b,o);};ui.opts.appendChild(b);});}
  function pick(b,o){var q=qs[i],r=o===q.a;if(r)ok++;log.push({q:q,y:o,r:r});
    [].forEach.call(ui.opts.children,function(x){x.disabled=true;if(!isTest&&x.textContent===q.a)x.classList.add("hit");});
    if(isTest)b.classList.add("sel");else if(!r)b.classList.add("miss");
    ui.fb.className="fb "+(isTest?"":(r?"ok":"no"));ui.fb.innerHTML=isTest?"<b>Answer saved.</b>You will see the right answers at the end.":"<b>"+(r?"Correct!":"Not quite. The answer is: "+esc(q.a))+"</b>"+esc(q.h);
    if(window.FNS_HELPER)window.FNS_HELPER.react(isTest?null:r,q.h);
    ui.go.textContent=i+1>=N?"See my result":"Next question";ui.go.hidden=false;ui.go.focus({preventScroll:true});}
  function nx(){i++;if(i>=N)return end();show();}
  function end(){mark(isTest?"test":"try",ok);var pass=ok>=8,h='<div class="end"><b>'+ok+" out of "+N+"</b>";
    if(isTest)h+=pass?"You passed. This lesson is complete.":"You need 8 to pass. Read the Learn part again, practise, then retake the test.";else h+=ok>=8?"Strong work. You are ready for the test.":"Keep going. Read the Learn part again, then try another set.";
    h+="</div>";if(isTest||ok<N){h+='<ul class="rev">';log.forEach(function(x,k){if(isTest||!x.r)h+="<li><b>"+(k+1)+". "+esc(x.q.q)+"</b> "+(x.r?"✓ ":"✗ You chose "+esc(x.y)+". ")+"Answer: "+esc(x.q.a)+". "+esc(x.q.h)+"</li>";});h+="</ul>";}
    root.innerHTML=h;var b=el("button","btn2 alt",isTest?"Take the test again":"Practise 10 more");b.type="button";b.style.marginTop="12px";b.onclick=start;root.appendChild(b);
    if(isTest&&pass){var nb=$("#nextbox");if(nb){nb.hidden=false;nb.scrollIntoView({block:"nearest"});}}}
  var s=el("button","btn2"+(isTest?" or":""),isTest?"Start the test":"Start practising");s.type="button";s.onclick=start;root.appendChild(s);}

function match(root){if(!root||!L.pairs)return;
  function start(){root.innerHTML="";var A=el("div"),B=el("div"),sel=null,left=L.pairs.length,grid=el("div","mt"),msg=el("p");msg.setAttribute("aria-live","polite");msg.style.marginTop="10px";
    function mk(txt,k,side){var b=el("button","",esc(txt));b.type="button";b.onclick=function(){if(b.classList.contains("hit"))return;
        if(!sel||sel.side===side){if(sel)sel.b.classList.remove("sel");sel={b:b,k:k,side:side};b.classList.add("sel");return;}
        if(sel.k===k){[b,sel.b].forEach(function(x){x.classList.remove("sel");x.classList.add("hit");x.disabled=true;});left--;msg.textContent=left?left+" to go.":"All matched. Well done!";if(window.FNS_HELPER)window.FNS_HELPER.react(true);if(!left){mark("play",true);var r=el("button","btn2 alt","Play again");r.type="button";r.style.marginTop="10px";r.onclick=start;root.appendChild(r);}}
        else{var o=sel.b;[b,o].forEach(function(x){x.classList.add("miss");});setTimeout(function(){[b,o].forEach(function(x){x.classList.remove("miss","sel");});},500);msg.textContent="Not a match. Try again.";}
        sel=null;};return b;}
    shuffle(L.pairs.map(function(p,k){return [p[0],k];})).forEach(function(p){A.appendChild(mk(p[0],p[1],"a"));});
    shuffle(L.pairs.map(function(p,k){return [p[1],k];})).forEach(function(p){B.appendChild(mk(p[0],p[1],"b"));});
    grid.appendChild(A);grid.appendChild(B);root.appendChild(grid);root.appendChild(msg);}
  start();}

function challenge(root){if(!root||!L.challenge)return;var solved=0,C=L.challenge.map(parse);
  C.forEach(function(c,k){var d=el("div","ch"),p=el("p","q",(k+1)+". "+esc(c.q)),opts=el("div","mc"),fb=el("div");fb.setAttribute("aria-live","polite");d.appendChild(p);d.appendChild(opts);d.appendChild(fb);
    shuffle(c.o).forEach(function(o){var b=el("button","",esc(o));b.type="button";b.onclick=function(){var r=o===c.a;
      if(r){[].forEach.call(opts.children,function(x){x.disabled=true;});b.classList.add("hit");fb.className="fb ok";fb.innerHTML="<b>Correct!</b>"+esc(c.h);if(!d.ok){d.ok=1;solved++;if(solved===C.length)mark("challenge",true);}}
      else{b.classList.add("miss");b.disabled=true;fb.className="fb no";fb.innerHTML="<b>Not yet.</b>"+(d.tries?esc(c.h)+" The answer is: "+esc(c.a)+".":"Think about what you learned and try again.");d.tries=1;}
      if(window.FNS_HELPER)window.FNS_HELPER.react(r);};opts.appendChild(b);});
    root.appendChild(d);});}

function see(){var b=$("#seeMore"),out=$("#seeOut");if(!b)return;var n=0;b.onclick=function(){var q=deal(1)[0];out.innerHTML='<div class="ex"><b class="q">'+esc(q.q)+'</b><p class="exans">Answer: '+esc(q.a)+'</p><p>'+esc(q.h)+'</p></div>';if(++n>=1)mark("see",true);};}

function unit(){var o=load();document.querySelectorAll(".ul a[data-id]").forEach(function(a){var r=o[a.getAttribute("data-id")]||{};if(r.test>=8){a.classList.add("isdone");var n=a.querySelector(".num");if(n)n.textContent="✓";var s=a.querySelector(".d");if(s)s.textContent+="  ·  Complete (best test score "+r.test+" out of 10)";}});}
function init(){if(L){see();quiz($("#try"),false);match($("#play"));quiz($("#test"),true);challenge($("#challenge"));var r=load()[id()]||{};if(r.test>=8){var nb=$("#nextbox");if(nb)nb.hidden=false;}mark("learn",true);}else unit();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
