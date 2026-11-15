/* freenetsave French practice. Each item: question, right answer, wrong answers, why (optional). */
window.LEARN=(function(){
"use strict";
var G={},cur=0;
function E(s){return String(s).replace(/[&<>]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c];});}
function grade(g){cur=g;G[g]=[];}
function T(c,t,d,i,prompt,lesson,items){
  var qs=items.map(function(s){var p=s.split("|");var o=[p[1],p[2],p[3],p[4]].filter(function(x){return x!==undefined&&x!=="";});
    return {q:(p[0]?"<span>"+E(p[0])+"</span>":"")+(prompt?"<small>"+E(prompt)+"</small>":""),a:p[1],o:o,h:p[5]||""};});
  G[cur].push({c:c,t:t,d:d,i:i,l:lesson,n:qs.length,f:function(){var q=qs[Math.floor(Math.random()*qs.length)];return {q:q.q,a:q.a,o:q.o.slice(),h:q.h};}});
}

/* ===== Grade 1 ===== */
grade(1);
T("First words","Hello and thank you","Greetings and polite words","👋","What does this mean in English?",
 ["Bonjour means hello. Au revoir means goodbye.", "Merci means thank you. S'il vous plaît means please.", "Oui means yes. Non means no."],
 ["bonjour|hello|goodbye|thank you|please", "au revoir|goodbye|hello|good night|yes", "merci|thank you|please|sorry|hello", "s'il vous plaît|please|thank you|goodbye|no", "oui|yes|no|hello|please", "non|no|yes|goodbye|thank you", "salut|hi|sorry|please|night", "bonne nuit|good night|good morning|goodbye|thank you", "bonsoir|good evening|good night|hello friend|see you", "pardon|sorry|thank you|yes|hello"]);
T("Numbers","Numbers 1 to 10","Un, deux, trois …","123","Which number is this?",
 ["Un 1, deux 2, trois 3, quatre 4, cinq 5.", "Six 6, sept 7, huit 8, neuf 9, dix 10.", "Say them out loud in order to remember them."],
 ["un|1|2|7|10", "deux|2|10|12|3", "trois|3|13|6|8", "quatre|4|14|5|40", "cinq|5|15|6|50", "six|6|7|16|10", "sept|7|6|17|9", "huit|8|9|18|3", "neuf|9|8|19|4", "dix|10|2|6|12"]);
T("Words","Colours","Rouge, bleu, vert …","🎨","Which colour is this?",
 ["Rouge is red, bleu is blue, vert is green, jaune is yellow.", "Noir is black, blanc is white, gris is grey, brun is brown.", "Rose is pink, violet is purple and orange is orange."],
 ["rouge|red|blue|pink|green", "bleu|blue|black|white|brown", "vert|green|grey|red|purple", "jaune|yellow|orange|pink|green", "noir|black|white|blue|brown", "blanc|white|black|grey|yellow", "gris|grey|green|pink|red", "brun|brown|black|blue|orange", "rose|pink|red|purple|yellow", "violet|purple|blue|pink|grey"]);
T("Words","Animals","Le chat, le chien …","🐱","Which animal is this?",
 ["Le chat is the cat. Le chien is the dog. L'oiseau is the bird.", "Le poisson is the fish. Le cheval is the horse. La vache is the cow.", "Le lapin is the rabbit. La souris is the mouse. Le canard is the duck."],
 ["le chat|cat|dog|horse|cow", "le chien|dog|cat|duck|pig", "l'oiseau|bird|fish|mouse|rabbit", "le poisson|fish|bird|horse|cat", "le cheval|horse|cow|dog|duck", "la vache|cow|horse|pig|mouse", "le lapin|rabbit|duck|bird|fish", "le cochon|pig|cow|dog|rabbit", "la souris|mouse|cat|bird|horse", "le canard|duck|rabbit|pig|fish"]);

/* ===== Grade 2 ===== */
grade(2);
T("Numbers","Numbers 11 to 20","Onze, douze, treize …","20","Which number is this?",
 ["Onze 11, douze 12, treize 13, quatorze 14, quinze 15, seize 16.", "Dix-sept 17, dix-huit 18 and dix-neuf 19 are ten plus a number.", "Vingt is 20."],
 ["onze|11|1|12|16", "douze|12|2|10|20", "treize|13|3|16|30", "quatorze|14|4|15|40", "quinze|15|5|14|50", "seize|16|6|13|17", "dix-sept|17|7|16|70", "dix-huit|18|8|19|80", "dix-neuf|19|9|18|90", "vingt|20|12|10|2"]);
T("Time","Days of the week","Lundi, mardi, mercredi …","📅","Which day is this?",
 ["Lundi is Monday, mardi is Tuesday, mercredi is Wednesday, jeudi is Thursday.", "Vendredi is Friday, samedi is Saturday, dimanche is Sunday.", "In French the days do not start with a capital letter."],
 ["lundi|Monday|Tuesday|Sunday|Friday", "mardi|Tuesday|Monday|Thursday|Wednesday", "mercredi|Wednesday|Tuesday|Friday|Saturday", "jeudi|Thursday|Tuesday|Friday|Sunday", "vendredi|Friday|Thursday|Saturday|Wednesday", "samedi|Saturday|Sunday|Friday|Monday", "dimanche|Sunday|Saturday|Monday|Thursday", "aujourd'hui|today|tomorrow|yesterday|week", "demain|tomorrow|today|yesterday|Sunday", "hier|yesterday|today|tomorrow|night"]);
T("Words","Family","La mère, le père …","👪","Who is this?",
 ["La mère is the mother. Le père is the father.", "Le frère is the brother. La sœur is the sister.", "Le grand-père is the grandfather. La grand-mère is the grandmother."],
 ["la mère|mother|father|sister|aunt", "le père|father|mother|brother|uncle", "le frère|brother|sister|father|cousin", "la sœur|sister|brother|mother|aunt", "le grand-père|grandfather|grandmother|uncle|father", "la grand-mère|grandmother|grandfather|aunt|mother", "le bébé|baby|brother|boy|uncle", "l'oncle|uncle|aunt|cousin|father", "la tante|aunt|uncle|sister|mother", "la famille|family|friend|father|house"]);
T("Words","Food and drink","Le pain, le lait …","🍎","What is this?",
 ["Le pain is bread. Le lait is milk. L'eau is water.", "La pomme is the apple. La banane is the banana. Le fromage is cheese.", "Le poulet is chicken. Le riz is rice. L'œuf is the egg."],
 ["le pain|bread|milk|rice|egg", "le lait|milk|water|bread|cheese", "l'eau|water|milk|egg|apple", "la pomme|apple|banana|bread|cake", "le fromage|cheese|chicken|milk|rice", "le poulet|chicken|cheese|egg|bread", "le riz|rice|bread|milk|cake", "l'œuf|egg|water|apple|chicken", "le gâteau|cake|cheese|bread|banana", "la banane|banana|apple|cake|rice"]);

/* ===== Grade 3 ===== */
grade(3);
T("Time","Months of the year","Janvier, février, mars …","🗓","Which month is this?",
 ["Janvier, février, mars, avril, mai, juin are the first six months.", "Juillet, août, septembre, octobre, novembre, décembre are the last six.", "In French the months do not start with a capital letter."],
 ["janvier|January|June|July|February", "février|February|January|April|November", "mars|March|May|April|August", "avril|April|August|March|October", "mai|May|March|June|July", "juin|June|July|January|May", "juillet|July|June|January|August", "août|August|April|October|July", "septembre|September|December|November|October", "octobre|October|August|September|November", "novembre|November|September|December|February", "décembre|December|November|October|September"]);
T("Words","Parts of the body","La tête, la main …","🖐","Which part of the body is this?",
 ["La tête is the head. La main is the hand. Le pied is the foot.", "Le nez is the nose. La bouche is the mouth. Les yeux are the eyes.", "Le bras is the arm. La jambe is the leg. Les cheveux are the hair."],
 ["la tête|head|hand|foot|leg", "la main|hand|head|arm|mouth", "le pied|foot|hand|leg|nose", "le nez|nose|mouth|ear|eye", "la bouche|mouth|nose|head|hand", "les yeux|eyes|ears|hair|feet", "l'oreille|ear|eye|nose|arm", "le bras|arm|leg|hand|foot", "la jambe|leg|arm|foot|head", "les cheveux|hair|eyes|ears|hands"]);
T("Words","At school","Le livre, le crayon …","🎒","What is this?",
 ["Le livre is the book. Le crayon is the pencil. Le stylo is the pen.", "La table is the table. La chaise is the chair. Le sac is the bag.", "L'école is the school. Le cahier is the notebook. La règle is the ruler."],
 ["le livre|book|pencil|bag|chair", "le crayon|pencil|pen|book|ruler", "le stylo|pen|pencil|notebook|table", "la table|table|chair|bag|school", "la chaise|chair|table|book|ruler", "le sac|bag|book|pen|chair", "l'école|school|teacher|table|notebook", "le cahier|notebook|book|bag|pencil", "la règle|ruler|pen|chair|school", "l'élève|pupil|school|book|table"]);
T("Grammar","Le, la, l' and les","The four words for \"the\"","le","Which word for \"the\" goes in front?",
 ["Use le with a masculine word and la with a feminine word.", "Use l' before a word that starts with a vowel sound.", "Use les when there is more than one."],
 ["___ chien|le|la|l'|les", "___ pomme|la|le|l'|les", "___ école|l'|le|la|les", "___ livres|les|le|la|l'", "___ maison|la|le|l'|les", "___ livre|le|la|l'|les", "___ oiseau|l'|le|la|les", "___ chats|les|le|la|l'", "___ table|la|le|l'|les", "___ garçon|le|la|l'|les", "___ fille|la|le|l'|les", "___ arbre|l'|le|la|les"]);

/* ===== Grade 4 ===== */
grade(4);
T("Numbers","Numbers 20 to 100","Vingt, trente, quarante …","100","Which number is this?",
 ["Vingt 20, trente 30, quarante 40, cinquante 50, soixante 60.", "Soixante-dix is 70 (sixty-ten). Quatre-vingts is 80 (four twenties). Quatre-vingt-dix is 90.", "Cent is 100. Vingt et un is 21 and trente-deux is 32."],
 ["vingt|20|12|30|2", "trente|30|13|3|40", "quarante|40|14|4|50", "cinquante|50|15|5|60", "soixante|60|16|6|70", "soixante-dix|70|60|17|80", "quatre-vingts|80|24|40|90", "quatre-vingt-dix|90|80|49|70", "cent|100|10|1000|50", "vingt et un|21|12|31|20", "trente-deux|32|23|42|22", "quarante-cinq|45|54|55|35"]);
T("Words","The weather","Il fait chaud, il pleut …","⛅","What does this mean in English?",
 ["Il fait chaud means it is hot. Il fait froid means it is cold.", "Il pleut means it is raining. Il neige means it is snowing.", "Il fait beau means the weather is nice. Il y a du vent means it is windy."],
 ["Il fait chaud.|It is hot.|It is cold.|It is raining.|It is windy.", "Il fait froid.|It is cold.|It is hot.|It is snowing.|It is nice out.", "Il pleut.|It is raining.|It is snowing.|It is sunny.|It is cold.", "Il neige.|It is snowing.|It is raining.|It is windy.|It is hot.", "Il fait beau.|The weather is nice.|The weather is bad.|It is raining.|It is cold.", "Il y a du vent.|It is windy.|It is sunny.|It is snowing.|It is hot.", "Il y a du soleil.|It is sunny.|It is windy.|It is cloudy.|It is raining.", "Il fait mauvais.|The weather is bad.|The weather is nice.|It is hot.|It is sunny.", "Il y a des nuages.|It is cloudy.|It is sunny.|It is windy.|It is snowing."]);
T("Grammar","The verb être (to be)","Je suis, tu es, il est …","être","Which word fits?",
 ["Être means to be. Je suis, tu es, il est, elle est.", "Nous sommes, vous êtes, ils sont, elles sont.", "Match the verb to the person doing it."],
 ["Je ___ content.|suis|es|est|sommes", "Tu ___ mon ami.|es|suis|est|êtes", "Il ___ grand.|est|es|suis|sont", "Elle ___ petite.|est|es|sont|suis", "Nous ___ à l'école.|sommes|sont|êtes|suis", "Vous ___ en retard.|êtes|sommes|sont|es", "Ils ___ amis.|sont|sommes|est|êtes", "Elles ___ ici.|sont|est|êtes|sommes", "Le chat ___ noir.|est|sont|es|suis", "Les chiens ___ grands.|sont|est|sommes|êtes"]);
T("Grammar","The verb avoir (to have)","J'ai, tu as, il a …","avoir","Which word fits?",
 ["Avoir means to have. J'ai, tu as, il a, elle a.", "Nous avons, vous avez, ils ont, elles ont.", "French uses avoir for age: J'ai dix ans means I am ten years old."],
 ["J'___ un chien.|ai|as|a|ont", "Tu ___ un livre.|as|ai|a|avez", "Il ___ une sœur.|a|as|ai|ont", "Elle ___ un chat.|a|ai|avons|ont", "Nous ___ une maison.|avons|avez|ont|a", "Vous ___ un stylo.|avez|avons|ont|as", "Ils ___ deux frères.|ont|avons|a|avez", "Elles ___ faim.|ont|a|avez|as", "Mon ami ___ dix ans.|a|as|ai|ont", "Les enfants ___ soif.|ont|a|avons|avez"]);

/* ===== Grade 5 ===== */
grade(5);
T("Grammar","Verbs ending in -er","Je parle, tu parles, nous parlons …","-er","Which word fits?",
 ["Take off -er and add an ending: je -e, tu -es, il or elle -e.", "Nous -ons, vous -ez, ils or elles -ent.", "Parler: je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent."],
 ["Je ___ français. (parler)|parle|parles|parlons|parlez", "Tu ___ bien. (chanter)|chantes|chante|chantons|chantent", "Il ___ au parc. (jouer)|joue|joues|jouons|jouez", "Nous ___ la télé. (regarder)|regardons|regardez|regarde|regardent", "Vous ___ une pomme. (manger)|mangez|mangeons|mange|mangent", "Ils ___ à Paris. (habiter)|habitent|habite|habitons|habitez", "Elle ___ la musique. (aimer)|aime|aimes|aimons|aiment", "Nous ___ ensemble. (danser)|dansons|dansez|danse|dansent", "Tu ___ la porte. (fermer)|fermes|ferme|fermez|ferment", "Elles ___ le professeur. (écouter)|écoutent|écoute|écoutons|écoutez"]);
T("Grammar","Describing words that match","Petit, petite, petits, petites","adj","Which word fits?",
 ["A describing word matches the thing it describes.", "Add -e for a feminine word: petit becomes petite.", "Add -s when there is more than one: petits, petites."],
 ["Le chat est ___. (small)|petit|petite|petits|petites", "La maison est ___. (small)|petite|petit|petits|petites", "Les garçons sont ___. (small)|petits|petit|petite|petites", "Les filles sont ___. (small)|petites|petits|petite|petit", "Le chien est ___. (big)|grand|grande|grands|grandes", "La table est ___. (big)|grande|grand|grands|grandes", "Les arbres sont ___. (big)|grands|grand|grande|grandes", "Le livre est ___. (blue)|bleu|bleue|bleus|bleues", "La voiture est ___. (blue)|bleue|bleu|bleus|bleues", "Les fleurs sont ___. (pretty)|jolies|joli|jolie|jolis"]);
T("Words","Question words","Qui, où, quand, pourquoi …","?","What does this mean in English?",
 ["Qui means who. Où means where. Quand means when.", "Pourquoi means why. Comment means how.", "Combien means how many or how much. Que or quoi means what."],
 ["qui|who|what|where|why", "où|where|when|who|how", "quand|when|where|why|what", "pourquoi|why|how|when|who", "comment|how|why|what|where", "combien|how many|how|when|who", "quoi|what|who|why|when", "quel âge|what age|what time|which day|how far", "parce que|because|why|when|but"]);
T("Words","Places in town","La maison, le parc, la gare …","🏠","Which place is this?",
 ["La maison is the house. Le magasin is the shop. Le parc is the park.", "La gare is the train station. La bibliothèque is the library.", "L'hôpital is the hospital. La boulangerie is the bakery."],
 ["la maison|house|shop|park|school", "le magasin|shop|house|bank|library", "le parc|park|shop|station|church", "la gare|train station|library|bakery|hospital", "la bibliothèque|library|bookshop|school|bank", "l'hôpital|hospital|hotel|house|station", "la boulangerie|bakery|library|bank|park", "la banque|bank|bakery|shop|church", "l'église|church|school|hospital|house", "la rue|street|park|shop|house"]);

/* ===== Grade 6 ===== */
grade(6);
T("Grammar","The verb aller (to go)","Je vais, tu vas, il va …","aller","Which word fits?",
 ["Aller means to go. Je vais, tu vas, il va, elle va.", "Nous allons, vous allez, ils vont, elles vont.", "Aller plus another verb talks about the future: Je vais manger means I am going to eat."],
 ["Je ___ à l'école.|vais|vas|va|allons", "Tu ___ au parc.|vas|vais|va|allez", "Il ___ à la maison.|va|vas|vais|vont", "Nous ___ au magasin.|allons|allez|vont|va", "Vous ___ à Paris.|allez|allons|vont|vas", "Ils ___ à la gare.|vont|va|allons|allez", "Elle ___ à la banque.|va|vais|vont|vas", "Je ___ manger. (I am going to eat)|vais|va|allons|vont", "Nous ___ jouer. (We are going to play)|allons|allez|vais|vont", "Elles ___ chanter. (They are going to sing)|vont|va|allez|allons"]);
T("Grammar","Saying \"not\"","Ne … pas","ne pas","Which sentence says \"not\" correctly?",
 ["To say not, put ne before the verb and pas after it.", "Je parle becomes Je ne parle pas.", "Before a vowel, ne becomes n': Je n'aime pas."],
 ["Je parle.|Je ne parle pas.|Je pas parle.|Je ne pas parle.|Je parle ne pas.", "Il mange.|Il ne mange pas.|Il pas mange.|Il mange ne pas.|Il ne pas mange.", "Nous dansons.|Nous ne dansons pas.|Nous dansons ne pas.|Nous pas dansons.|Nous ne pas dansons.", "Tu chantes.|Tu ne chantes pas.|Tu ne pas chantes.|Tu chantes ne.|Tu pas chantes.", "Elle est ici.|Elle n'est pas ici.|Elle ne est pas ici.|Elle est ne pas ici.|Elle pas est ici.", "J'aime le lait.|Je n'aime pas le lait.|Je ne aime pas le lait.|J'aime ne pas le lait.|Je pas aime le lait.", "Ils jouent.|Ils ne jouent pas.|Ils jouent ne pas.|Ils ne pas jouent.|Ils pas jouent.", "Vous écoutez.|Vous n'écoutez pas.|Vous ne écoutez pas.|Vous écoutez ne pas.|Vous pas écoutez."]);
T("Words","Useful sentences","Things you say every day","💬","What does this mean in English?",
 ["Comment ça va ? means How are you? Ça va bien means I am fine.", "Je m'appelle … means My name is …", "Je ne comprends pas means I do not understand."],
 ["Comment ça va ?|How are you?|What is your name?|Where are you?|How old are you?", "Je m'appelle Léa.|My name is Léa.|I like Léa.|I see Léa.|Léa is my friend.", "Quel âge as-tu ?|How old are you?|How are you?|Where do you live?|What time is it?", "J'ai dix ans.|I am ten years old.|I have ten friends.|It is ten o'clock.|I want ten.", "Je ne comprends pas.|I do not understand.|I do not know you.|I cannot come.|I am not hungry.", "Où sont les toilettes ?|Where is the washroom?|Where is the school?|Who is there?|What is this?", "Je voudrais de l'eau.|I would like some water.|I have some water.|I see the water.|I do not want water.", "De rien.|You are welcome.|Nothing at all here.|No thank you.|See you later.", "À demain.|See you tomorrow.|See you soon.|Good night.|Until next week.", "Bonne chance !|Good luck!|Good night!|Well done!|Happy birthday!", "Ça va bien, merci.|I am fine, thank you.|It is going away, thanks.|I am leaving, thank you.|That is good bread."]);

return {subject:"French",site:"learn.freenetsave.com",grades:G};
})();
