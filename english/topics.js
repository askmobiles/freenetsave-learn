/* freenetsave English practice, Grades 1 to 6. Each item: "question|right answer|wrong|wrong|wrong|why (optional)". */
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

/* ================= Grade 1 ================= */
grade(1);
T("Letters & sounds","Beginning sounds","The first sound in a word","Aa","What letter does this word start with?",
 ["Say the word slowly.","Listen for the very first sound.","Pick the letter that makes that sound."],
 ["sun|s|m|t|b","dog|d|b|g|p","fish|f|v|s|h","moon|m|n|w|r","ball|b|d|p|l","hat|h|a|t|n","pig|p|b|g|d","cat|c|s|t|a","red|r|w|d|l","leg|l|g|i|r","net|n|m|t|e","top|t|d|p|o","van|v|f|n|b","wig|w|v|m|g","jam|j|g|m|y","kite|k|t|g|h"]);
T("Letters & sounds","Rhyming words","Words that end with the same sound","♪","Which word rhymes with this word?",
 ["Rhyming words sound the same at the end.","Say both words out loud.","Cat and hat rhyme. Cat and dog do not."],
 ["cat|hat|dog|cup|pen","dog|log|cat|sun|bed","sun|run|sat|pin|moon","bed|red|bad|dog|bee","pig|big|pen|bag|dot","cake|lake|cat|cook|kite","tree|bee|toy|top|trip","ball|tall|bell|bat|bowl","star|car|sit|stop|sun","fish|dish|fan|shop|five","book|look|back|boat|bike","night|light|nine|net|note","ring|sing|rain|run|rock","hop|top|hat|hip|hen"]);
T("Letters & sounds","Vowels","The letters a, e, i, o, u","aeiou","Which letter in this word is a vowel?",
 ["The vowels are a, e, i, o and u.","All the other letters are consonants.","Look for a, e, i, o or u in the word."],
 ["bat|a|b|t","pen|e|p|n","sit|i|s|t","hop|o|h|p","sun|u|s|n","map|a|m|p","red|e|r|d","big|i|b|g","dog|o|d|g","cup|u|c|p","jam|a|j|m","web|e|w|b"]);
T("Letters & sounds","ABC order","Which word comes first","ABC","Which word comes first in ABC order?",
 ["Look at the first letter of each word.","Say the alphabet: a, b, c, d …","The word whose first letter comes earliest goes first."],
 ["cat, apple, ball|apple|cat|ball","dog, fish, egg|dog|fish|egg","sun, moon, tree|moon|sun|tree","hat, jam, ice|hat|jam|ice","pig, owl, queen|owl|pig|queen","zoo, yes, wet|wet|zoo|yes","lamp, kite, nest|kite|lamp|nest","van, up, red|red|van|up","goat, frog, hen|frog|goat|hen","box, car, ant|ant|box|car"]);
T("Words","Spelling common words","Words you see a lot","abc","Which word fits and is spelled right?",
 ["Some words do not follow the sound rules. You learn them by sight.","Read the sentence and think of the word that fits.","Pick the spelling that looks right."],
 ["She ___ hello to me.|said|sed|siad|sayd","I ___ a red ball.|have|hav|haf|hive","___ are my friends.|They|Thay|Tey|Thei","We ___ at the park.|were|wer|wur|wher","What ___ you like?|do|doo|du|dou","I like ___ dog.|the|teh|thu|da","Come ___ me.|with|wiht|whit|wif","Look at ___ cat.|that|thet|taht|dat","I ___ go now.|can|kan|cen|cann","Do you ___ a pen?|want|wont|wunt|wantt","He ___ very tall.|is|iz|si|ise","This is ___ book.|my|mi|mye|miy"]);
T("Words","Opposites","Words that mean the reverse","↔","What is the opposite of this word?",
 ["Opposites are words that mean very different things.","Hot and cold are opposites.","Think: what is the reverse of this word?"],
 ["hot|cold|warm|sun|fire","big|small|large|tall|huge","up|down|over|top|high","happy|sad|glad|funny|nice","day|night|sun|noon|light","fast|slow|quick|run|speed","open|closed|door|wide|in","wet|dry|rain|water|damp","in|out|into|on|at","full|empty|lots|more|heavy","on|off|up|over|at","hard|soft|rock|tough|strong"]);
T("Words","Naming words","People, places and things","N","Which word names a person, place or thing?",
 ["A naming word is called a noun.","It names a person, a place or a thing.","Dog, school and teacher are nouns. Run and happy are not."],
 ["run, dog, happy|dog|run|happy","jump, big, ball|ball|jump|big","teacher, sing, red|teacher|sing|red","fast, park, eat|park|fast|eat","sleep, soft, bed|bed|sleep|soft","book, read, funny|book|read|funny","swim, wet, fish|fish|swim|wet","tall, tree, climb|tree|tall|climb","baby, cry, little|baby|cry|little","hop, green, frog|frog|hop|green"]);
T("Sentences","Capital letters","How a sentence starts","A","Which sentence is written correctly?",
 ["A sentence starts with a capital letter.","It ends with a mark, like a period.","The word I is always a capital letter."],
 ["|The cat is big.|the cat is big.|The cat is big|the Cat is big.","|I like my dog.|i like my dog.|I like my dog|I Like my dog","|We go to school.|we go to school.|We go to school|we Go to school.","|My hat is red.|my hat is red.|My hat is red|my Hat is red.","|She can run fast.|she can run fast.|She can run fast|she Can run fast","|Tom and I play.|Tom and i play.|tom and I play.|Tom and I play","|It is a sunny day.|it is a sunny day.|It is a sunny day|it is a Sunny day.","|He has a blue bike.|he has a blue bike.|He has a blue bike|he has a blue Bike."]);
T("Sentences","End marks","Period or question mark","?","Which mark goes at the end?",
 ["A telling sentence ends with a period.","An asking sentence ends with a question mark.","A sentence with strong feeling ends with an exclamation mark."],
 ["Where is my hat|?|.|,","I have a dog|.|?|,","What is your name|?|.|,","The sun is hot|.|?|,","Can you help me|?|.|,","We like to play|.|?|,","How old are you|?|.|,","My cat is black|.|?|,","Who is at the door|?|.|,","She reads a book|.|?|,","Do you like milk|?|.|,","Look out|!|?|,"]);
T("Sentences","More than one","Adding s","+s","Which word finishes it?",
 ["To show more than one, add s to most words.","One cat, two cats.","One dog, three dogs."],
 ["one cat, two ___|cats|cat|cates|catz","one dog, three ___|dogs|dog|doges|dogz","one book, two ___|books|book|bookes|bookz","one hat, four ___|hats|hat|hates|hatz","one car, two ___|cars|car|cares|carz","one tree, five ___|trees|tree|treeses|treez","one bird, two ___|birds|bird|birdes|birdz","one ball, six ___|balls|ball|balles|ballz","one hand, two ___|hands|hand|handes|handz","one star, ten ___|stars|star|stares|starz"]);

/* ================= Grade 2 ================= */
grade(2);
T("Kinds of words","Find the noun","People, places, things","N","Which word is the noun?",
 ["A noun names a person, place, thing or animal.","Ask: can I see it, touch it or go there?","The dog barked: dog is the noun."],
 ["The dog barked loudly.|dog|barked|loudly|The","My sister sings well.|sister|sings|well|My","The red kite flew high.|kite|red|flew|high","We played at the park.|park|played|We|at","A small bird sang.|bird|small|sang|A","The teacher smiled kindly.|teacher|smiled|kindly|The","He kicked the ball hard.|ball|kicked|hard|He","The baby cried all night.|baby|cried|all|The","She ate a sweet apple.|apple|ate|sweet|She","The old bus stopped.|bus|old|stopped|The"]);
T("Kinds of words","Find the verb","Action words","V","Which word is the verb?",
 ["A verb is an action word.","It tells what someone or something does.","The dog runs: runs is the verb."],
 ["The dog runs fast.|runs|dog|fast|The","Birds sing in the morning.|sing|Birds|morning|in","My mom cooks dinner.|cooks|mom|dinner|My","The frog jumped away.|jumped|frog|away|The","We read a funny book.|read|We|funny|book","The baby sleeps quietly.|sleeps|baby|quietly|The","I draw a big house.|draw|I|big|house","The boys play outside.|play|boys|outside|The","She kicked the red ball.|kicked|She|red|ball","Fish swim in the pond.|swim|Fish|pond|in"]);
T("Kinds of words","Describing words","Adjectives","Adj","Which word describes something?",
 ["A describing word is called an adjective.","It tells what something is like: its size, colour or feel.","A red ball: red is the adjective."],
 ["The big dog barked.|big|dog|barked|The","I have a red hat.|red|have|hat|I","She has soft hair.|soft|has|hair|She","The cold wind blew.|cold|wind|blew|The","We saw a tall tree.|tall|saw|tree|We","He ate a sweet plum.|sweet|ate|plum|He","The tiny ant walked.|tiny|ant|walked|The","A loud bell rang.|loud|bell|rang|A","I like funny stories.|funny|like|stories|I","The happy girl smiled.|happy|girl|smiled|The"]);
T("Kinds of words","a or an","Before a vowel sound, use an","a/an","Which word goes in the blank?",
 ["Use an before a word that starts with a vowel sound: a, e, i, o, u.","Use a before other sounds.","An apple, a banana."],
 ["___ apple|an|a","___ dog|a|an","___ egg|an|a","___ orange|an|a","___ book|a|an","___ umbrella|an|a","___ cat|a|an","___ igloo|an|a","___ tree|a|an","___ elephant|an|a","___ ant|an|a","___ house|a|an"]);
T("Word endings","More than one: es","Words ending in s, x, ch, sh","+es","Which is the right way to show more than one?",
 ["Most words just add s.","Words that end in s, x, ch or sh add es.","One box, two boxes. One dish, two dishes."],
 ["box|boxes|boxs|boxies|boxen","dish|dishes|dishs|dishies|dishen","bus|buses|buss|busies|busen","fox|foxes|foxs|foxies|foxen","peach|peaches|peachs|peachies|peachen","brush|brushes|brushs|brushies|brushen","glass|glasses|glasss|glassies|glassen","lunch|lunches|lunchs|lunchies|lunchen","wish|wishes|wishs|wishies|wishen","dress|dresses|dresss|dressies|dressen"]);
T("Word endings","It already happened: ed","Past tense","-ed","Which word fits?",
 ["To show something already happened, add ed to most action words.","Today I jump. Yesterday I jumped.","If the word ends in e, just add d: bake, baked."],
 ["Yesterday I ___ over the log. (jump)|jumped|jump|jumping|jumps","Last night we ___ a film. (watch)|watched|watch|watching|watches","She ___ the door. (open)|opened|open|opening|opens","We ___ in the park. (play)|played|play|playing|plays","He ___ his teeth. (brush)|brushed|brush|brushing|brushes","Mom ___ a cake. (bake)|baked|bake|baking|bakes","The dog ___ at me. (bark)|barked|bark|barking|barks","I ___ my room. (clean)|cleaned|clean|cleaning|cleans","They ___ to school. (walk)|walked|walk|walking|walks","The baby ___ at us. (smile)|smiled|smile|smiling|smiles"]);
T("Word endings","Contractions","Two words made into one","’","Which is the short way to write it?",
 ["A contraction joins two words into one shorter word.","An apostrophe goes where letters are left out.","Do not becomes don't. The apostrophe takes the place of o."],
 ["do not|don't|do'nt|dont|don,t","I am|I'm|Im|I'am|Iam'","is not|isn't|is'nt|isnt|isn,t","can not|can't|ca'nt|cant|cann't","it is|it's|its'|i'ts|itis","we are|we're|were|we'are|wer'e","he is|he's|hes|he'is|hes'","I will|I'll|Ill|I'will|Il'l","did not|didn't|did'nt|didnt|didn,t","you are|you're|your|youre|you'are","she will|she'll|shell|she'will|shel'l","are not|aren't|are'nt|arent|arn't"]);
T("Word meanings","Compound words","Two words joined together","+","Which word joins with it to make a new word?",
 ["A compound word is two small words joined together.","Rain + coat makes raincoat.","Try each choice and see which one makes a real word."],
 ["rain + ?|coat|chair|green|happy|raincoat","sun + ?|flower|table|jump|blue|sunflower","foot + ?|ball|milk|sky|run|football","bed + ?|room|tree|fast|cup|bedroom","tooth + ?|brush|door|sing|hot|toothbrush","snow + ?|man|desk|walk|red|snowman","cup + ?|cake|sock|swim|tall|cupcake","butter + ?|fly|shoe|read|wet|butterfly","play + ?|ground|spoon|cold|eat|playground","pop + ?|corn|bird|sad|write|popcorn","star + ?|fish|lamp|hop|soft|starfish","book + ?|shelf|grass|sleep|big|bookshelf"]);
T("Word meanings","Same meaning","Synonyms","=","Which word means the same?",
 ["Synonyms are words that mean the same or nearly the same.","Big and large are synonyms.","Swap the word in a sentence. If it still makes sense, it is a synonym."],
 ["big|large|small|tiny|short","happy|glad|sad|angry|tired","small|little|huge|tall|wide","fast|quick|slow|late|lazy","begin|start|end|stop|finish","shout|yell|whisper|sing|listen","pretty|beautiful|ugly|plain|dull","angry|mad|calm|kind|glad","tired|sleepy|awake|lively|busy","smart|clever|silly|slow|lazy","jump|leap|sit|crawl|rest","close|shut|open|lift|push"]);
T("Word meanings","Opposite meaning","Antonyms","↔","Which word means the opposite?",
 ["Antonyms are words with opposite meanings.","Early and late are antonyms.","Think of the reverse of the word."],
 ["early|late|soon|first|fast","loud|quiet|noisy|big|strong","clean|dirty|neat|fresh|shiny","strong|weak|tough|brave|big","young|old|new|small|little","push|pull|shove|lift|press","win|lose|play|score|beat","above|below|over|on|near","always|never|often|daily|still","heavy|light|large|thick|strong","inside|outside|into|within|under","remember|forget|recall|think|learn"]);
T("Sentences","is or are","One or more than one","is/are","Which word fits?",
 ["Use is when you talk about one.","Use are when you talk about more than one, and with you.","The dog is barking. The dogs are barking."],
 ["The dogs ___ barking.|are|is|am|be","My cat ___ asleep.|is|are|am|be","We ___ friends.|are|is|am|be","The sky ___ blue.|is|are|am|be","You ___ very kind.|are|is|am|be","The apples ___ red.|are|is|am|be","My brother ___ tall.|is|are|am|be","They ___ at school.|are|is|am|be","This book ___ funny.|is|are|am|be","The children ___ playing.|are|is|am|be"]);
T("Sentences","Syllables","Beats in a word","1-2-3","How many syllables (beats) does this word have?",
 ["A syllable is one beat in a word.","Clap as you say the word. Each clap is one syllable.","Ba-na-na has three claps."],
 ["banana|3|2|4|1","cat|1|2|3|4","rabbit|2|1|3|4","elephant|3|2|4|1","pencil|2|1|3|4","dog|1|2|3|4","butterfly|3|2|4|1","water|2|1|3|4","computer|3|2|4|1","watermelon|4|3|2|5","sun|1|2|3|4","tomato|3|2|4|1"]);

/* ================= Grade 3 ================= */
grade(3);
T("Word forms","Tricky plurals","Words that change","pl","What is the word for more than one?",
 ["Some words do not add s. They change.","One child, two children. One foot, two feet.","These have to be learned by heart."],
 ["child|children|childs|childes|childrens","foot|feet|foots|feets|footes","tooth|teeth|tooths|teeths|toothes","mouse|mice|mouses|mices|mouse's","man|men|mans|mens|manes","woman|women|womans|womens|womanes","goose|geese|gooses|geeses|goosen","leaf|leaves|leafs|leafes|leavs","knife|knives|knifes|knifs|knivs","sheep|sheep|sheeps|sheepes|shoop","wolf|wolves|wolfs|wolfes|wolvs","person|people|persones|peoples|persen"]);
T("Word forms","Tricky past tense","Verbs that change","past","Which word shows it already happened?",
 ["Most verbs add ed for the past. Some change completely.","Today I go. Yesterday I went.","These have to be learned by heart."],
 ["go|went|goed|gone|wented","eat|ate|eated|eaten|aten","see|saw|seed|seen|sawed","run|ran|runned|runed|rans","take|took|taked|taken|tooked","come|came|comed|camed|comes","buy|bought|buyed|buyd|boughted","write|wrote|writed|written|wroted","swim|swam|swimmed|swum|swimed","think|thought|thinked|thunk|thoughted","bring|brought|bringed|brang|broughted","teach|taught|teached|teacht|taughted"]);
T("Word forms","Comparing","er and est","-er","Which word finishes it?",
 ["Add er to compare two things: taller.","Add est to compare three or more: tallest.","Good and bad change: good, better, best. Bad, worse, worst."],
 ["tall, taller, ___|tallest|most tall|tallerest|more tall","big, ___, biggest|bigger|more big|biger|biggest","fast, faster, ___|fastest|most fast|fasterest|more fast","good, better, ___|best|goodest|bestest|most good","bad, ___, worst|worse|badder|more bad|worser","small, ___, smallest|smaller|more small|smaler|smallerer","happy, happier, ___|happiest|happyest|most happy|happierest","Ali is ___ than Sam.|taller|tallest|tall|more tall","This is the ___ day of the year.|hottest|hotter|hot|more hot","A snail is ___ than a rabbit.|slower|slowest|slow|more slow"]);
T("Kinds of words","Pronouns","Words that stand in for nouns","he/she","Which word fits?",
 ["A pronoun takes the place of a noun.","He, she, it, we and they are pronouns.","Maria likes soccer. She plays every day."],
 ["Maria likes soccer. ___ plays every day.|She|He|It|They","The boys are late. ___ missed the bus.|They|He|It|She","My dad is tall. ___ can reach the shelf.|He|She|It|They","The book is old. ___ has no cover.|It|He|She|They","Sam and I are friends. ___ play together.|We|They|He|It","I saw Anna. I waved to ___.|her|she|him|they","The dog wagged ___ tail.|its|it's|their|her","Tom lost ___ hat.|his|he|him|their","The girls rode ___ bikes.|their|there|her|its","Give the ball to ___.|me|I|my|mine"]);
T("Kinds of words","Adverbs","Words that tell how","-ly","Which word tells how it was done?",
 ["An adverb tells how, when or where something happens.","Many adverbs end in ly.","The turtle walked slowly: slowly tells how."],
 ["The turtle walked slowly.|slowly|turtle|walked|The","She sang beautifully.|beautifully|She|sang","He quickly ate his lunch.|quickly|ate|lunch|He","The baby slept quietly.|quietly|baby|slept|The","We carefully crossed the road.|carefully|crossed|road|We","The rain fell softly.|softly|rain|fell|The","Dad spoke loudly.|loudly|Dad|spoke","The cat jumped suddenly.|suddenly|cat|jumped|The","They waited patiently.|patiently|They|waited","She smiled happily at me.|happily|smiled|She|me"]);
T("Tricky words","to, too, two","Words that sound the same","2","Which word fits?",
 ["Two is the number 2.","Too means also, or more than enough.","To is used for everything else: go to school, want to play."],
 ["I have ___ cats.|two|to|too","We went ___ the park.|to|too|two","This soup is ___ hot.|too|to|two","Can I come ___?|too|to|two","She has ___ brothers.|two|to|too","I want ___ read.|to|too|two","It is ___ late to play.|too|to|two","Give it ___ me.|to|too|two","He ate ___ apples.|two|to|too","I like pizza ___.|too|to|two"]);
T("Tricky words","there, their, they're","Words that sound the same","th","Which word fits?",
 ["There is a place: over there.","Their shows something belongs to them: their dog.","They're is short for they are."],
 ["Put the box over ___.|there|their|they're","The kids lost ___ ball.|their|there|they're","___ going to the zoo.|They're|Their|There","___ is a bird in the tree.|There|Their|They're","I like ___ new house.|their|there|they're","___ very happy today.|They're|Their|There","We will go ___ tomorrow.|there|their|they're","The birds built ___ nest.|their|there|they're","I think ___ late.|they're|their|there","Is anyone ___?|there|their|they're"]);
T("Word parts","Prefixes","un, re, pre, mis","un-","What does this word mean?",
 ["A prefix is a word part added to the front of a word.","Un means not. Re means again. Pre means before. Mis means wrongly.","Unhappy means not happy."],
 ["unhappy|not happy|very happy|happy again|happy before","redo|do again|not do|do before|do badly","unlock|open the lock|lock again|lock before|lock badly","preheat|heat before|heat again|not heat|heat badly","misspell|spell wrongly|spell again|spell before|not spell","rewrite|write again|not write|write before|write badly","unkind|not kind|kind again|very kind|kind before","preview|see before|see again|not see|see badly","unsafe|not safe|safe again|very safe|safe before","replay|play again|not play|play before|play badly","mislead|lead the wrong way|lead again|lead first|not lead","unfair|not fair|fair again|very fair|fair before"]);
T("Word parts","Suffixes","er, ful, less, ly","-ful","Which word fits?",
 ["A suffix is a word part added to the end of a word.","Er can mean a person who does it. Ful means full of. Less means without.","Someone who teaches is a teacher."],
 ["Someone who teaches is a ___.|teacher|teaching|teachful|teachless","Full of hope means ___.|hopeful|hopeless|hoper|hoping","Without fear means ___.|fearless|fearful|fearer|fearing","Someone who paints is a ___.|painter|painting|paintful|paintless","Full of care means ___.|careful|careless|carer|caring","Without a home means ___.|homeless|homeful|homer|homely","In a quick way means ___.|quickly|quicker|quickful|quickless","Full of joy means ___.|joyful|joyless|joyer|joying","Without use means ___.|useless|useful|user|using","Someone who sings is a ___.|singer|singing|singful|singless"]);
T("Sentences","Verbs that match","He walks, they walk","s","Which word fits?",
 ["The verb has to match who is doing the action.","With he, she, it or one person or thing, add s: she walks.","With I, you, we, they or more than one, no s: they walk."],
 ["My sister ___ to school.|walks|walk|walking|walken","The dogs ___ loudly.|bark|barks|barking|barkes","He ___ his bike every day.|rides|ride|riding|rided","We ___ soccer on Fridays.|play|plays|playing|playes","The bird ___ a nest.|builds|build|building|builded","They ___ pizza.|like|likes|liking|likeing","She ___ three books a week.|reads|read|reading|readed","I ___ my teeth at night.|brush|brushes|brushing|brushs","The sun ___ in the east.|rises|rise|rising|rised","My friends ___ next door.|live|lives|living|liveing"]);
T("Sentences","Capitals for names","Proper nouns","Ab","Which sentence uses capital letters correctly?",
 ["Names of people, places, days and months start with a capital letter.","These are called proper nouns.","We visited Toronto on Monday."],
 ["|We visited Toronto on Monday.|We visited toronto on monday.|we visited Toronto on Monday.|We Visited Toronto On Monday.","|My friend Sara lives in Canada.|My friend sara lives in canada.|My Friend Sara lives in canada.|my friend Sara lives in Canada.","|School starts in September.|School starts in september.|school starts in September.|School Starts In September.","|I saw Dr. Lee on Friday.|I saw dr. lee on friday.|I saw Dr. lee on Friday.|i saw Dr. Lee on friday.","|We swam in Lake Ontario.|We swam in lake ontario.|We swam in Lake ontario.|we swam in Lake Ontario.","|My birthday is in March.|My birthday is in march.|my birthday is in March.|My Birthday is in March.","|Ben and Maya went to Paris.|Ben and maya went to paris.|ben and Maya went to Paris.|Ben And Maya Went To Paris.","|Is Mr. Khan here on Tuesday?|Is mr. khan here on tuesday?|is Mr. Khan here on Tuesday?|Is Mr. khan here on Tuesday?"]);

return {subject:"English",site:"learn.freenetsave.com",grades:G};
})();
