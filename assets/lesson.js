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
    if(isTest&&pass&&window.FNS_HELPER)window.FNS_HELPER.pass();if(isTest&&pass){var nb=$("#nextbox");if(nb){nb.hidden=false;nb.scrollIntoView({block:"nearest"});}}}
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

// ---- Printable lesson and worksheet (for teachers, parents and students) ----
function seeded(str){var h=2166136261;for(var i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);}return function(){h^=h<<13;h^=h>>>17;h^=h<<5;return ((h>>>0)%100000)/100000;};}
function sshuf(a,r){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(r()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
var LET="abcd",SUB={science:"Science",english:"English",french:"French",geography:"Geography",history:"History"};

var FR=!!(L&&L.subject==="french");
function wcount(t){return (t.match(/[\p{L}\p{N}'’-]+/gu)||[]).length;}
function scount(t){return t.split(/[.!?]+(?:\s|$)/).filter(function(x){return wcount(x)>=2;}).length;}
function autoCheck(txt,w){
  var T=FR?{ok:"Bien!",no:"À revoir",sent:"phrases",words:"mots",empty:"Écris ta réponse d'abord, puis vérifie.",cap:"Commence chaque phrase par une majuscule et termine par un point.",note:"La vérification automatique regarde la longueur, les mots demandés et les erreurs fréquentes. Compare aussi avec la réponse modèle."}
           :{ok:"Good",no:"Check this",sent:"sentences",words:"words",empty:"Write your answer first, then check it.",cap:"Start each sentence with a capital letter and end with a period.",note:"The automatic check looks at length, required words and common mistakes. Also compare with the model answer."};
  var t=String(txt||"").replace(/’/g,"'").trim();if(wcount(t)<3)return {html:'<p class="wq-x">'+T.empty+'</p>',tick:[]};
  var lines=[],tick=[],rules=(w[3]||[]).slice(),need=0;
  var m=String(w[0]).match(/(\d+)\s*(?:(?:–|-|to|or|ou)\s*(\d+)\s*)?(sentences|phrases|répliques|lines|lignes|steps|étapes|questions)/i);
  var ns=scount(t),nw=wcount(t);
  if(m){need=+m[1];var u=/répliques|lines|lignes|steps|étapes|questions/i.test(m[3]);var have=u?Math.max(ns,t.split(/\n|\s\/\s|—|–\s/).filter(function(x){return wcount(x)>=2;}).length):ns;
    lines.push([have>=need,(FR?"Longueur : ":"Length: ")+have+" "+(u?m[3]:T.sent)+" ("+(FR?"objectif ":"goal ")+need+(m[2]?"–"+m[2]:"")+")"]);}
  else{var mw=(L&&L.g<=2)?10:(L&&L.g<=4)?15:25;lines.push([nw>=mw,(FR?"Longueur : ":"Length: ")+nw+" "+T.words+(nw<mw?(FR?" — ajoute des détails.":" — add more detail."):"")]);}
  var caps=t.split(/(?<=[.!?])\s+/).filter(function(x){return x.length>1;}),bad=caps.filter(function(x){return /^[a-zà-ÿ]/.test(x);}).length;
  lines.push([bad===0&&/[.!?»"]\s*$/.test(t),T.cap]);
  rules.forEach(function(r){
    if(r[0]==="words"){var low=t.toLowerCase(),f=r[2].filter(function(x){return new RegExp("(^|[^\\p{L}])"+x.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"(?=[^\\p{L}]|$)","iu").test(low);});var ok=f.length>=r[3];
      lines.push([ok,r[1]+" : "+f.length+"/"+r[3]+(f.length?" ("+f.join(", ")+")":"")]);if(ok&&r[4]!=null)tick.push(r[4]);}
    else if(r[0]==="rx"){var mm=t.match(new RegExp(r[2],"giu"))||[];var ok2=mm.length>=r[3];lines.push([ok2,r[1]+" : "+mm.length+"/"+r[3]]);if(ok2&&r[4]!=null)tick.push(r[4]);}
    else if(r[0]==="avoid"){var hit=t.match(new RegExp(r[1],"iu"));if(hit)lines.push([false,"« "+hit[0].trim()+" » — "+r[2]]);}
  });
  if(m&&lines[0][0]&&w[2].length&&/phrases|sentences|répliques|lines|steps|étapes/i.test(w[2][0]))tick.push(0);
  var good=lines.filter(function(x){return x[0];}).length;
  var html='<p class="wq-rh">'+(good===lines.length?"✅ ":"📝 ")+good+" / "+lines.length+(FR?" vérifications réussies":" checks passed")+'</p><ul>'+lines.map(function(x){return '<li class="'+(x[0]?"ok":"no")+'">'+(x[0]?"✓ ":"✗ ")+esc(x[1])+'</li>';}).join("")+'</ul><p class="wq-n">'+T.note+'</p>';
  return {html:html,tick:tick};
}
function written(root){if(!root||!L.written||!L.written.length)return;var seen=0;
  L.written.forEach(function(w,n){var c=el("div","wq"),q=el("p","wq-q","<b>"+(n+1)+".</b> "+esc(w[0])),ta=el("textarea");ta.rows=4;ta.placeholder="Write your answer here…";ta.setAttribute("aria-label","Your answer to question "+(n+1));
    var b=el("button","btn2 alt","Show model answer");b.type="button";var out=el("div","wq-a");out.hidden=true;
    out.innerHTML='<p class="wq-m"><b>Model answer:</b> '+esc(w[1])+'</p><p class="wq-k">Tick the key points you included:</p>'+w[2].map(function(k,i){return '<label class="wq-c"><input type="checkbox"> '+esc(k)+'</label>';}).join("")+'<p class="wq-s" aria-live="polite"></p>';
    var sc=out.querySelector(".wq-s");function upd(){var t=out.querySelectorAll("input:checked").length;sc.textContent="You covered "+t+" of "+w[2].length+" key points."+(t===w[2].length?" Excellent!":"");}
    var ck=el("button","btn2","Check my answer");ck.type="button";var res=el("div","wq-r");res.hidden=true;res.setAttribute("aria-live","polite");
    ck.onclick=function(){var r=autoCheck(ta.value,w);res.hidden=false;res.innerHTML=r.html;
      if(r.tick.length){if(out.hidden)b.onclick();var bx=out.querySelectorAll("input");r.tick.forEach(function(i){if(bx[i])bx[i].checked=true;});upd();}};
    out.addEventListener("change",upd);b.onclick=function(){out.hidden=!out.hidden;b.textContent=out.hidden?"Show model answer":"Hide model answer";if(!out.hidden&&!c.dataset.s){c.dataset.s=1;seen++;upd();if(seen===L.written.length)mark("write",true);}};
    var bar=el("div","wq-btns");bar.appendChild(ck);bar.appendChild(b);[q,ta,bar,res,out].forEach(function(x){c.appendChild(x);});root.appendChild(c);});}
function label(root){var D=L.label;if(!root||!D||!D.parts)return;var names=D.parts.map(function(p){return p[1];});
  root.innerHTML='<div class="fig lbl-fig">'+D.svg+'</div>'+(D.title?'<p class="lbl-t">'+esc(D.title)+'</p>':'');var g=el("div","lbl-g"),opts=shuffle(names);
  D.parts.forEach(function(p){var r=el("label","lbl-r","<b>"+esc(p[0])+"</b>"),s=el("select");s.innerHTML='<option value="">Choose…</option>'+opts.map(function(x){return '<option>'+esc(x)+'</option>';}).join("");s.dataset.a=p[1];r.appendChild(s);g.appendChild(r);});
  root.appendChild(g);var b=el("button","btn2","Check my labels"),fb=el("div","fb");b.type="button";fb.setAttribute("aria-live","polite");root.appendChild(b);root.appendChild(fb);
  b.onclick=function(){var ok=0,S=g.querySelectorAll("select");[].forEach.call(S,function(s){var r=s.value===s.dataset.a;s.parentNode.classList.toggle("ok",r);s.parentNode.classList.toggle("no",!r);if(r)ok++;});
    fb.className="fb "+(ok===S.length?"ok":"no");fb.innerHTML=ok===S.length?"<b>All correct!</b> Great labelling.":"<b>"+ok+" of "+S.length+" correct.</b> Fix the red ones and check again.";if(ok===S.length)mark("label",true);};}
function printView(withAns,noPrint){var r=seeded(L.slug+L.g),old=document.getElementById("fnsPrint");if(old)old.remove();
  var d=el("div");d.id="fnsPrint";var subj=SUB[L.subject]||"",h1=($("main h1")||{}).textContent||L.topic,lede=($("main .lede")||{}).textContent||"";
  var h='<div class="pv-top"><span><b class="pv-brand">freenetsave.com</b> · Grade '+L.g+' '+subj+'</span><span>Name: ______________________  Date: ____________</span></div><h1>'+esc(h1)+'</h1><p class="pv-lede">'+esc(lede)+'</p>';
  var ln=$("#learn");if(ln){var c=ln.cloneNode(true);c.querySelectorAll(".fnsL,small").forEach(function(x){x.remove();});c.removeAttribute("id");h+='<div class="pv-sec">'+c.innerHTML.replace(/<h2[^>]*>.*?<\/h2>/,"<h2>Learn</h2>")+'</div>';}
  var se=$("#see .seebox");if(se)h+='<div class="pv-sec"><h2>Real-life examples</h2>'+se.innerHTML+'</div>';
  var Q=(L.items||[]).map(parse),key=[];
  h+='<div class="pv-sec pv-q"><h2>Questions <small>Circle the best answer.</small></h2><ol>';
  Q.forEach(function(q,n){var o=sshuf(q.o,r);key.push({n:n+1,l:LET[o.indexOf(q.a)],a:q.a,h:q.h});h+='<li><p>'+esc(q.q)+'</p><div class="pv-opts">'+o.map(function(x,k){return '<span>'+LET[k]+') '+esc(x)+'</span>';}).join("")+'</div></li>';});
  h+='</ol></div>';
  var mk=[];if(L.pairs){var R=sshuf(L.pairs.map(function(p,i){return {t:p[1],i:i};}),r);
    h+='<div class="pv-sec pv-m"><h2>Match <small>Write the letter of the match on the line.</small></h2><div class="pv-cols"><ol>'+L.pairs.map(function(p){return '<li>'+esc(p[0])+' <span class="pv-line">____</span></li>';}).join("")+'</ol><ol type="A">'+R.map(function(x){return '<li>'+esc(x.t)+'</li>';}).join("")+'</ol></div></div>';
    L.pairs.forEach(function(p,i){mk.push((i+1)+" → "+"ABCDEFGHIJ".charAt(R.findIndex(function(x){return x.i===i;})));});}
  if(L.written&&L.written.length){h+='<div class="pv-sec pv-q"><h2>Short answer <small>Answer in full sentences.</small></h2><ol>'+L.written.map(function(w){return '<li><p>'+esc(w[0])+'</p><div class="pv-lines"><i></i><i></i><i></i><i></i></div></li>';}).join("")+'</ol></div>';}
  if(L.label&&L.label.parts){h+='<div class="pv-sec pv-lab"><h2>Label the diagram <small>Write the name of each numbered part.</small></h2><div class="fig">'+L.label.svg+'</div><ol class="pv-lab-l">'+L.label.parts.map(function(p){return '<li><b>'+esc(p[0])+'</b> ______________________</li>';}).join("")+'</ol></div>';}
  var ck=[];if(L.challenge){h+='<div class="pv-sec pv-q"><h2>Challenge <small>Choose an answer, then explain your thinking.</small></h2><ol>';
    L.challenge.map(parse).forEach(function(q,n){var o=sshuf(q.o,r);ck.push({n:n+1,l:LET[o.indexOf(q.a)],a:q.a,h:q.h});h+='<li><p>'+esc(q.q)+'</p><div class="pv-opts">'+o.map(function(x,k){return '<span>'+LET[k]+') '+esc(x)+'</span>';}).join("")+'</div><div class="pv-write">Explain: ____________________________________________________________<br>____________________________________________________________________</div></li>';});h+='</ol></div>';}
  if(withAns){h+='<div class="pv-key"><h2>Answer key: '+esc(h1)+'</h2><h3>Questions</h3><ol class="pv-k">'+key.map(function(k){return '<li><b>'+k.l+') '+esc(k.a)+'</b>'+(k.h?' — '+esc(k.h):'')+'</li>';}).join("")+'</ol>';
    if(mk.length)h+='<h3>Match</h3><p>'+mk.join(" · ")+'</p>';
    if(L.written&&L.written.length)h+='<h3>Short answer: model answers</h3><ol class="pv-k">'+L.written.map(function(w){return '<li>'+esc(w[1])+' <i>Key points: '+w[2].map(esc).join('; ')+'.</i></li>';}).join("")+'</ol>';
    if(L.label&&L.label.parts)h+='<h3>Label the diagram</h3><p>'+L.label.parts.map(function(p){return esc(p[0])+" "+esc(p[1]);}).join(" · ")+'</p>';
    if(ck.length)h+='<h3>Challenge</h3><ol class="pv-k">'+ck.map(function(k){return '<li><b>'+k.l+') '+esc(k.a)+'</b>'+(k.h?' — '+esc(k.h):'')+'</li>';}).join("")+'</ol>';h+='</div>';}
  h+='<p class="pv-foot">© freenetsave.com · Free lesson from learn.freenetsave.com/'+esc(L.unit)+'/'+esc(L.slug)+'/ · Free to print for home and classroom use. Reposting online or sharing on other websites or apps is not allowed.</p>';
  d.innerHTML=h;
  if(!noPrint){var fr=document.getElementById("fnsPF");if(fr)fr.remove();fr=document.createElement("iframe");fr.id="fnsPF";fr.setAttribute("aria-hidden","true");fr.style.cssText="position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden";document.body.appendChild(fr);
    var dc=fr.contentWindow.document;dc.open();dc.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>'+esc(h1)+' · freenetsave.com</title><link rel="stylesheet" href="/assets/lesson.css?v=6"><style>body{margin:0;background:#fff}'+PCSS+'#fnsPrint{display:block;font-family:Georgia,"Times New Roman",serif;color:#000;font-size:11.5pt;line-height:1.45}</style></head><body>'+d.outerHTML+'</body></html>');dc.close();
    var go=function(){try{fr.contentWindow.focus();fr.contentWindow.print();}catch(e){window.print();}};if(dc.readyState==="complete")setTimeout(go,300);else fr.onload=function(){setTimeout(go,200);};return;}
  document.body.appendChild(d);document.documentElement.classList.add("fnsPrinting");
  var done=function(){document.documentElement.classList.remove("fnsPrinting");window.removeEventListener("afterprint",done);};window.addEventListener("afterprint",done);
}
var PCSS='@page{margin:14mm 14mm 16mm;@bottom-left{content:"© freenetsave.com · Free for home and class use · Do not repost on other websites";font:8pt system-ui,sans-serif;color:#555}@bottom-right{content:"Page " counter(page) " of " counter(pages);font:8pt system-ui,sans-serif;color:#555}}#fnsPrint .pv-brand{color:#2563eb;font-family:system-ui,sans-serif;font-size:12pt}html.fnsPrinting body>*:not(#fnsPrint){display:none!important}html.fnsPrinting,html.fnsPrinting body{height:auto!important;min-height:0!important;padding:0!important;margin:0!important;overflow:visible!important;background:#fff!important}html.fnsPrinting body::before,html.fnsPrinting body::after{display:none!important;content:none!important}#fnsPrint>:last-child{margin-bottom:0!important;padding-bottom:0!important}html.fnsPrinting #fnsPrint{display:block!important;font-family:Georgia,"Times New Roman",serif;color:#000;font-size:11.5pt;line-height:1.45}'+
  '#fnsPrint h1{font-size:22pt;margin:6pt 0 2pt;color:#000}#fnsPrint h2{font-size:15pt;margin:14pt 0 6pt;border-bottom:1.5pt solid #000;padding-bottom:2pt;color:#000}#fnsPrint h2 small{font-size:10.5pt;font-weight:400;margin-left:6pt}#fnsPrint h3{font-size:12.5pt;margin:10pt 0 4pt}'+
  '#fnsPrint .pv-top{display:flex;justify-content:space-between;font-size:10.5pt;border-bottom:1pt solid #999;padding-bottom:4pt}#fnsPrint .pv-lede{font-style:italic;margin:0 0 6pt}#fnsPrint .key{border:1.2pt solid #000;border-radius:6pt;padding:4pt 8pt;margin:6pt 0;background:none!important}'+
  '#fnsPrint .fig svg{max-width:100%;max-height:230pt;display:block;margin:6pt auto}#fnsPrint .cards{display:grid!important;grid-template-columns:1fr 1fr;gap:4pt 12pt}#fnsPrint .cards>*{border:none!important;background:none!important;box-shadow:none!important;padding:0!important;display:block}#fnsPrint .seebox{display:block}#fnsPrint .ex{margin:4pt 0;border:none;background:none;padding:0}#fnsPrint .ex .q{display:block;font-size:12pt!important;font-weight:700;color:#000;margin:0}#fnsPrint .ex p{color:#000;margin:0 0 4pt}#fnsPrint h2,#fnsPrint h3{break-after:avoid}#fnsPrint .pv-m{break-inside:avoid}#fnsPrint .words li{color:#000}#fnsPrint .words b{color:#000}'+
  '#fnsPrint .pv-q ol{padding-left:18pt}#fnsPrint .pv-q li{break-inside:avoid;margin:0 0 8pt}#fnsPrint .pv-q p{margin:0 0 2pt}#fnsPrint .pv-opts{display:grid;grid-template-columns:1fr 1fr;gap:1pt 14pt;padding-left:6pt}#fnsPrint .pv-write{margin-top:4pt;color:#333;line-height:2}'+
  '#fnsPrint .pv-cols{display:grid;grid-template-columns:1fr 1fr;gap:20pt}#fnsPrint .pv-cols li{margin:0 0 7pt}#fnsPrint .pv-key{break-before:page}#fnsPrint .pv-k li{margin:0 0 3pt;font-size:10.5pt}#fnsPrint .pv-lines i{display:block;border-bottom:0.8pt solid #888;height:18pt}#fnsPrint .pv-lab-l{columns:2;padding-left:4pt;list-style:none}#fnsPrint .pv-lab-l li{margin:0 0 8pt}#fnsPrint .pv-lab{break-inside:avoid}#fnsPrint .pv-foot{margin-top:16pt;font-size:9pt;color:#444;border-top:1pt solid #999;padding-top:4pt}#fnsPrint a{color:#000;text-decoration:none}';
function printBar(){var lede=$("main .lede");if(!lede||!L.items)return;
  var st=el("style");st.textContent='.pbar{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 14px}.pbar button{font:inherit;font-size:14.5px;font-weight:750;border:2px solid #dde5f2;background:#fff;color:#1d4ed8;border-radius:999px;padding:6px 14px;cursor:pointer}.pbar button:hover{border-color:#2563eb}#fnsPrint{display:none}'+
  '@media print{'+PCSS+'}';
  document.head.appendChild(st);var b=el("div","pbar"),b1=el("button","","🖨 Print lesson and worksheet"),b2=el("button","","🖨 Print with answer key");b1.type=b2.type="button";
  b1.onclick=function(){printView(false);};b2.onclick=function(){printView(true);};b.appendChild(b1);b.appendChild(b2);lede.parentNode.insertBefore(b,lede.nextSibling);
  window.addEventListener("beforeprint",function(){if(!document.documentElement.classList.contains("fnsPrinting")){printView(false,true);}});}
function init(){if(L){printBar();see();quiz($("#try"),false);match($("#play"));quiz($("#test"),true);challenge($("#challenge"));written($("#write"));label($("#label"));var r=load()[id()]||{};if(r.test>=8){var nb=$("#nextbox");if(nb)nb.hidden=false;}mark("learn",true);}else unit();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
