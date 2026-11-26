
const E=(()=>{
const S=s=>new Set(s.trim().split(/\s+/));
const BE=S('is are was were am be been being'),BEF=S('is are was were am'),HAVE=S('has have had'),DO=S('do does did');
const MODAL=S('will would can could may might shall should must cannot');
const PDET=S('the a an its their our his her my your every no');
const DEMO=S('this that these those');
const QDET=S('each all both some any many much several few most more less other another such either neither one two three four five six seven eight nine ten');
const PREP=S('of in on at by for with from to into onto upon within without between among through throughout during under over above below against about across along around near toward towards via per than as despite including except regarding concerning beyond inside outside versus amid after before since until');
const SUB=S('although though because while whereas if unless when whenever where wherever once whether');
const REL=S('which that who whom whose');
const CONJ=S('and or but nor yet so');
const PRON=S('it they we i he she you them us him');
const ADV=S('not also never often still then thus therefore now only just already previously subsequently typically usually generally always frequently rarely further here there very too however moreover furthermore hence nevertheless nonetheless indeed instead again almost even ever quite rather well soon together');
const INTRO=S('however thus therefore moreover furthermore consequently nevertheless nonetheless hence additionally similarly conversely finally first second third next then here overall together indeed instead likewise accordingly meanwhile subsequently specifically notably importantly interestingly surprisingly');
const NOTLY=S('family assembly supply apply reply rely anomaly multiply imply comply early likely unlikely daily');
const SUBJP=S('we i they he she it you there this these those that one');
const SUBJP0=S('we i they he she it');
const POINT=S('this these those such it they its their both we our here');
const PLUR=S('data bacteria criteria phenomena mice children people media spectra nuclei fungi larvae genera species hypotheses analyses');
const POSTP=S('here above below previously earlier');
const NOT_ED=S('hundred sacred naked wicked biomed embed');
const NOUNISH=S('signal material mutant patient agent solvent component nutrient metric topic fabric antibiotic interval animal chemical mineral potential crystal metal trial proposal removal survival event content extent gradient coefficient constituent reagent recipient ingredient parent student accident incident variant constant determinant contaminant surfactant reactant participant plant implant transplant derivative objective alternative initiative perspective adhesive additive narrative representative relative journal terminal logic clinic statistic characteristic dynamic ceramic plastic critic epidemic mosaic traffic variable vegetable syllable current percent continent arrival approval renewal withdrawal reversal disposal denial capital hospital portal');
const ADJ=S('high low large small significant new novel recent previous major minor key main various different similar same rapid slow strong weak clear initial final early late total mean average overall specific general common normal direct single double multiple higher lower larger smaller greater lesser additional important possible likely unlikely primary secondary active inactive stable unstable free full whole short long deep wide broad narrow thin thick young old good poor best better worse wild mature complex simple pure crude fresh dry wet hot cold warm cool dense sparse rich acute chronic severe mild robust distinct unique entire apparent evident able unable due absent available consistent dependent independent');
const VERBS='accept access accompany account accumulate achieve acquire act activate adapt add address adhere adjust adopt affect agree aim align allow alter amplify analyze analyse apply appear approach argue arise arrange assemble assess assign assist associate assume attach attempt attribute avoid base become begin behave believe belong bind block break bring build calculate call capture carry catalyze cause change characterize check choose cite claim classify clear cleave collect combine come communicate compare compete complete comply compose comprise compute concentrate conclude conduct confirm connect conserve consider consist constitute constrain construct consume contain continue contribute control converge convert correct correlate correspond create culture decide decline decompose decrease define degrade demonstrate denote depend deplete deposit derive describe design destroy detect determine develop die differ differentiate diffuse diminish discuss disperse display disrupt dissolve distinguish distribute disturb diverge divide dominate drive drop elevate eliminate elucidate emerge emit employ enable encode encounter engage enhance enrich ensure enter establish estimate evaluate evolve examine exceed excite exclude exhibit exist expand expect explain explore expose express extend extract facilitate fail fall favor find fit follow form formulate function gain generate give go govern grow happen harvest help hold hybridize hydrolyze hypothesize identify illustrate implement imply improve include incorporate increase incubate indicate induce infect infer influence inhibit initiate inject insert integrate interact interfere interpret introduce invert investigate involve isolate keep know label lack lead leave lie limit link localize locate lose maintain make manage mark match measure mediate migrate minimize modify monitor move mutate need note observe obtain occur offer operate originate outline overcome oxidize participate perform permit persist place play point possess postulate precede precipitate predict prefer prepare present preserve prevent proceed process produce promote propagate propose protect prove provide publish purify quantify raise range reach react recognize recommend recruit reduce refer reflect regulate relate relax release rely remain remove repeat replace replicate report represent require resemble resist resolve respond restore restrict result retain retrieve reveal reverse revise rise run sample saturate say scale see seek seem select separate serve set share shift show shrink simulate solve specify spread stabilize start stimulate store study subject submit substitute suggest summarize support suppress survive synthesize take tend terminate test think tolerate transcribe transfer transform translate transmit transport treat trigger turn undergo underlie understand use utilize validate vary verify view wash withdraw yield receive slow absorb adsorb lower open close cover cross cut feed fill fix flow fold heat cool kill load map mix pass plot rest return rotate send shape sort split spend stain stop switch weigh work write draw accelerate attenuate abolish confer elicit impair perturb encode decay lay feel perceive assert contend acknowledge admit deny reject endorse oppose criticize criticise justify undermine erode strengthen weaken foster hinder impede encourage discourage motivate persuade convince mobilize mobilise organize organise negotiate cooperate collaborate enforce legislate elect appoint earn invest borrow lend buy sell hire educate teach learn attend enrol enroll settle assimilate discriminate marginalize marginalise live marry want intend ask remember conceptualize conceptualise operationalize operationalise theorize theorise hypothesise emphasize emphasise tackle fluctuate climb halve stagnate recover threaten punish subsidize subsidise stay stand speak tell hear meet win deserve join commute retire disagree doubt worsen deteriorate lessen broaden narrow deepen widen exacerbate mitigate alleviate reinforce legitimize legitimise get put try look matter model challenge survey interview vote campaign protest pay rent train graduate divorce care trust fear hope wish plan judge rate rank score code question answer reply recall experience witness face frame highlight stress focus target document trace track contrast double peak collapse cluster benefit harm damage risk cost burden reward sanction reform fund finance tax talk fight mean count stem grant award travel exit debate dispute undertake'.split(' ');
const AMBIG=S('access account act address aim approach attempt base block break call cause change check claim clear complete concentrate control correct culture decline decrease deposit design display drive drop estimate exhibit extract fall fit form function gain help hold increase influence isolate keep label lack lead lie limit link mark match measure move need note offer place play point precipitate present process range release report result reverse rise run sample scale separate set share shift show spread start store study subject support test transfer transport turn use view wash yield slow lower open close cover cross cut feed fill fix flow fold heat cool load map mix pass plot rest return shape sort stain stop switch work decay live doubt look matter model challenge survey interview vote campaign protest pay rent train graduate divorce care trust fear hope wish plan judge rate rank score code question answer reply recall experience witness face frame highlight stress focus target document trace track contrast double peak collapse cluster benefit harm damage risk cost burden reward sanction reform fund finance tax talk fight mean count stem grant award travel exit debate dispute');
const DBL=S('get put win stem enrol admit cut map plot split drop refer occur permit transfer control stop plan step tag scan trap strip spot fit run begin submit commit emit omit confer infer prefer deter incur recur compel propel expel equip set');
const IRR={undertake:'undertook undertaken',get:'got got',put:'put put',feel:'felt felt',lend:'lent lent',buy:'bought bought',sell:'sold sold',teach:'taught taught',stand:'stood stood',speak:'spoke spoken',tell:'told told',hear:'heard heard',meet:'met met',win:'won won',pay:'paid paid',cost:'cost cost',fight:'fought fought',mean:'meant meant',arise:'arose arisen',become:'became become',begin:'began begun',bind:'bound bound',break:'broke broken',bring:'brought brought',build:'built built',choose:'chose chosen',come:'came come',drive:'drove driven',fall:'fell fallen',find:'found found',give:'gave given',go:'went gone',grow:'grew grown',hold:'held held',keep:'kept kept',know:'knew known',lead:'led led',leave:'left left',lie:'lay lain',lose:'lost lost',make:'made made',rise:'rose risen',run:'ran run',say:'said said',see:'saw seen',seek:'sought sought',set:'set set',show:'showed shown',take:'took taken',think:'thought thought',undergo:'underwent undergone',underlie:'underlay underlain',understand:'understood understood',overcome:'overcame overcome',fit:'fit fit',shrink:'shrank shrunk',spread:'spread spread',withdraw:'withdrew withdrawn',cut:'cut cut',feed:'fed fed',lay:'laid laid',send:'sent sent',spend:'spent spent',split:'split split',write:'wrote written',draw:'drew drawn'};
const FORMS=new Map(), VSET=new Set(VERBS);
const putF=(w,b,k)=>{if(!FORMS.has(w))FORMS.set(w,{b,k});};
VERBS.forEach(b=>{
  putF(b,b,'base');
  const y=/[^aeiou]y$/.test(b),e=/e$/.test(b),stem=DBL.has(b)?b+b.slice(-1):b;
  putF(/(s|x|z|ch|sh|o)$/.test(b)?b+'es':y?b.slice(0,-1)+'ies':b+'s',b,'s');
  if(IRR[b]){const [p,pp]=IRR[b].split(' ');if(p===pp)putF(p,b,'past');else{putF(p,b,'pastx');putF(pp,b,'pp');}}
  else putF(e?b+'d':y?b.slice(0,-1)+'ied':stem+'ed',b,'past');
  putF(/ie$/.test(b)?b.slice(0,-2)+'ying':(e&&!/ee$/.test(b))?b.slice(0,-1)+'ing':stem+'ing',b,'ing');
});
putF('done','do','pp');
const isDet=l=>PDET.has(l)||DEMO.has(l)||QDET.has(l);
const FUNC=new Set([...PDET,...DEMO,...QDET,...PREP,...SUB,...REL,...CONJ,...PRON,...ADV,...BE,...HAVE,...DO,...MODAL,'there','s']);
const isFunc=l=>FUNC.has(l);
const isAdv=l=>ADV.has(l)||(l.length>4&&/ly$/.test(l)&&!NOTLY.has(l));
const adjLike=l=>{if(!l||FORMS.has(l)||NOUNISH.has(l))return false;if(ADJ.has(l))return true;if(l.length>6&&/(ous|ive|ical|able|ible|ful|less|ular)$/.test(l))return true;return l.length>4&&/(ic|al|ary|ant|[^m]ent)$/.test(l);};
const STOPX=S('using used use et al fig figure table e.g i.e etc respectively known shown suggest suggests suggested show shows showed');
const DUAL=S('as since after before until');
function stem(w){
  if(w.length>3){if(/ies$/.test(w))w=w.slice(0,-3)+'y';else if(/(ss|us|is)$/.test(w)){}else if(/(ch|sh|x|z)es$/.test(w))w=w.slice(0,-2);else if(/s$/.test(w))w=w.slice(0,-1);}
  if(w.length>5&&/ied$/.test(w))w=w.slice(0,-3)+'y';else if(w.length>5&&/ing$/.test(w))w=w.slice(0,-3);else if(w.length>4&&/[^e]ed$/.test(w))w=w.slice(0,-2);
  if(/(.)\1$/.test(w)&&!/(ss|ll|ee|oo|ff)$/.test(w))w=w.slice(0,-1);
  if(w.length>4&&/e$/.test(w))w=w.slice(0,-1);
  return w;
}
const isContent=tk=>tk.w&&!tk.cite&&/\p{L}/u.test(tk.t)&&(tk.l.length>2||/^[A-Z]{2}$/.test(tk.t))&&!isFunc(tk.l)&&!STOPX.has(tk.l);

/* nominalizations */
const NOMX={analysis:'analyze',synthesis:'synthesize',hydrolysis:'hydrolyze',comparison:'compare',description:'describe',transcription:'transcribe',absorption:'absorb',adsorption:'adsorb',reduction:'reduce',production:'produce',induction:'induce',introduction:'introduce',destruction:'destroy',assumption:'assume',consumption:'consume',recognition:'recognize',acquisition:'acquire',definition:'define',decomposition:'decompose',deposition:'deposit',repetition:'repeat',competition:'compete',expansion:'expand',extension:'extend',conversion:'convert',inversion:'invert',dispersion:'disperse',emission:'emit',transmission:'transmit',submission:'submit',division:'divide',decision:'decide',provision:'provide',revision:'revise',conclusion:'conclude',inclusion:'include',exclusion:'exclude',diffusion:'diffuse',resolution:'resolve',dissolution:'dissolve',evolution:'evolve',distribution:'distribute',contribution:'contribute',attribution:'attribute',substitution:'substitute',application:'apply',publication:'publish',variation:'vary',degradation:'degrade',observation:'observe',determination:'determine',examination:'examine',preparation:'prepare',combination:'combine',explanation:'explain',oxidation:'oxidize',occurrence:'occur',appearance:'appear',performance:'perform',maintenance:'maintain',emergence:'emerge',existence:'exist',persistence:'persist',interference:'interfere',acceptance:'accept',avoidance:'avoid',dependence:'depend',resistance:'resist',disturbance:'disturb',divergence:'diverge',convergence:'converge',adherence:'adhere',preference:'prefer',inference:'infer',tolerance:'tolerate',clearance:'clear',resemblance:'resemble',reliance:'rely',compliance:'comply',removal:'remove',survival:'survive',proposal:'propose',retrieval:'retrieve',withdrawal:'withdraw',reversal:'reverse',exposure:'expose',failure:'fail',growth:'grow',loss:'lose',discussion:'discuss',suppression:'suppress',expression:'express',inhibition:'inhibit'};
const ZERO=S('decrease increase change decline rise shift drop gain use');
const NOT_NOM=S('station nation question position condition section fraction function junction information population tradition motion notion portion proportion version dimension mission session solution equation location attention option emotion fiction lesion emulsion suspension direction addition concentration generation relation tension caution nutrition composition transition mutation radiation precision vision occasion exception duration foundation corporation ration region');
const LIGHT=S('perform carry conduct undertake make achieve accomplish undergo take'),INTRV=S('occur happen'),UPIN=S('decrease increase change decline rise shift drop gain reduction improvement growth'),UPOWN=S('decrease increase change decline rise shift drop gain growth'),UPTO=S('change modification alteration adjustment amendment improvement'),UPSUBJ={us:'we',them:'they',him:'he',her:'she',me:'I'},UPPOSS={their:'they',our:'we',his:'he',her:'she',its:'it',my:'I',your:'you'};
const WEAK=S('perform carry conduct undertake make achieve accomplish observe see find note obtain occur happen undergo exhibit show take give');
function nomBase(l){let w=l;if(!NOMX[w]&&!/(tion|sion|ment)$/.test(w)&&/s$/.test(w))w=w.slice(0,-1);return w;}
function verbFor(l){const w=nomBase(l);if(NOMX[w])return NOMX[w];if(SMV[w])return SMV[w];if(ZERO.has(w))return w;
  if(/ization$/.test(w))return w.slice(0,-5)+'e';if(/isation$/.test(w))return w.slice(0,-5)+'e';if(/ification$/.test(w))return w.slice(0,-7)+'y';
  if(/tion$/.test(w)){for(const c of[w.slice(0,-3)+'e',w.slice(0,-3),w.slice(0,-5)+'e',w.slice(0,-5)])if(VSET.has(c))return c;return null;}
  if(/ment$/.test(w)&&VSET.has(w.slice(0,-4)))return w.slice(0,-4);return null;}
function isNom(l){const w=nomBase(l);if(NOMX[w])return true;if(w.length>=7&&/(tion|sion)$/.test(w)&&!NOT_NOM.has(w))return true;return w.length>=8&&/ment$/.test(w)&&VSET.has(w.slice(0,-4));}

const CLUTTER=[
['in order to','to'],['so as to','to'],['due to the fact that','because'],['owing to the fact that','because'],['in spite of the fact that','although'],['despite the fact that','although'],['in the event that','if'],['at the present time','now'],['at this point in time','now'],['a large number of','many'],['a small number of','few'],['a number of','several'],['a majority of','most'],['the majority of','most'],['in the vicinity of','near'],['in close proximity to','near'],['has the ability to','can'],['have the ability to','can'],['has the capacity to','can'],['is able to','can'],['are able to','can'],['was able to','could'],['were able to','could'],
['it is important to note that',''],['it should be noted that',''],['it is worth noting that',''],['it is interesting to note that',''],['it is well known that','','If it is well known, say it. If it needs support, cite it.'],['it has been shown that','','Give the finding and cite who showed it.'],['it is clear that','clearly'],
['with regard to','about'],['with respect to','for'],['in regard to','about'],['for the purpose of','for'],['in the course of','during'],['during the course of','during'],['on the basis of','from'],['by means of','by'],['in the absence of','without'],['prior to','before'],['subsequent to','after'],['utilize','use'],['utilizes','uses'],['utilized','used'],['utilizing','using'],['utilization','use'],
['has an effect on','affects'],['have an effect on','affect'],['had an effect on','affected'],['has an impact on','affects'],['have an impact on','affect'],['had an impact on','affected'],['is dependent on','depends on'],['are dependent on','depend on'],['is indicative of','indicates'],['are indicative of','indicate'],['is in agreement with','agrees with'],['are in agreement with','agree with'],['make use of','use'],['makes use of','uses'],['made use of','used'],['take into consideration','consider'],['gives rise to','causes'],['give rise to','cause'],['gave rise to','caused'],['in the near future','soon'],['at a rapid rate','rapidly'],['whether or not','whether'],['in a manner similar to','like'],['as a consequence of','because of'],['on a daily basis','daily'],['time period','period'],['end result','result'],['completely eliminate','eliminate'],['absolutely essential','essential'],['first of all','first'],['each and every','every'],
['are of the same opinion','agree'],['in light of the fact that','because'],['for the reason that','because'],['in the majority of cases','usually'],['with the exception of','except'],['in excess of','more than'],['in order that','so that'],['a sufficient number of','enough'],['as it is well known','','If it is well known, say it. If it needs support, cite it.'],['it should be emphasized that',''],['it can be regarded that',''],['as it has been shown','','Give the finding and cite who showed it.'],['it is noteworthy that',''],['successful solutions','solutions'],['unexpected surprise','surprise'],['currently underway','underway'],['future plans','plans'],['past history','history'],['past experience','experience'],['final outcome','outcome'],['final conclusion','conclusion'],['new innovation','innovation'],['advance planning','planning'],['added bonus','bonus'],['basic fundamentals','fundamentals'],['exact same','same'],['general consensus','consensus'],['consensus of opinion','consensus'],['brief summary','summary'],['still remains','remains'],['reason why','reason'],['true facts','facts'],['period of time','period'],['small in size','small'],['large in size','large'],['few in number','few'],['join together','join'],['combine together','combine'],['repeat again','repeat'],['revert back','revert'],['plays a role in',null,'Name the role. Does it regulate, trigger, limit, enable?'],['play a role in',null,'Name the role. Do they regulate, trigger, limit, enable?'],['in terms of',null,'Usually a vague connector. Say how the two things relate.'],['in the case of',null,'Often just "for" or "in", or nothing at all.']
].map(([p,r,n])=>({re:new RegExp('\\b'+p.replace(/ /g,'\\s+')+'\\b','gi'),r,n}));
/* promotional adjectives reported by Millar, Batalo & Budgell (2022), in their eight groups */
const HYPE={importance:'compelling critical crucial essential foundational fundamental imperative important indispensable invaluable key major paramount pivotal significant strategic timely ultimate urgent vital',
 novelty:'creative emerging first groundbreaking innovative latest novel revolutionary unique unparalleled unprecedented',
 rigor:'accurate advanced careful cohesive detailed nuanced powerful quality reproducible rigorous robust scientific sophisticated strong systematic',
 scale:'ample biggest broad comprehensive considerable deeper diverse enormous expansive extensive fastest greatest huge immediate immense interdisciplinary international interprofessional largest massive multidisciplinary myriad overwhelming substantial top transdisciplinary tremendous vast',
 utility:'accessible actionable deployable durable easy effective efficacious efficient generalizable ideal impactful intuitive meaningful productive ready relevant rich safer scalable seamless sustainable synergistic tailored tangible transformative user-friendly',
 quality:'ambitious collegial dedicated exceptional experienced intellectual longstanding motivated premier prestigious promising qualified renowned senior skilled stellar successful talented vibrant',
 attitude:'attractive confident exciting incredible interesting intriguing notable outstanding remarkable surprising excellent',
 problem:'alarming daunting desperate devastating dire dismal elusive stark unanswered unmet'};
const HYPEOF=new Map();Object.keys(HYPE).forEach(k=>HYPE[k].split(' ').forEach(w=>HYPEOF.set(w,k)));
/* boosters and engagement markers: this page's own short lists, sorted by the categories of Hyland (2005) */
const BOOSTW=new Set('actually always certainly clearly conclusively decidedly definitely doubtless evidently indeed indisputably never obviously surely truly undeniably undoubtedly unquestionably incontrovertible undeniable indisputable unquestionable'.split(' '));
const BOOSTP=/\b(?:in fact|no doubt|without (?:a )?doubt|beyond (?:any |all )?doubt|it is (?:clear|certain|evident|obvious|well established) that|we (?:know|are certain|are confident) that|(?:prov|demonstrat|establish)(?:e|es|ed|en) that)\b/gi;
const DIRW=new Set('consider note see suppose assume recall compare imagine observe notice let remember'.split(' '));
const DIRP=/\((?:see|cf\.?|compare)\b|\bit is (?:important|necessary|essential|crucial|vital) to\b|\b(?:we|one|you|readers?|researchers) (?:must|should|need to|ought to)\b|\b(?:must|should) be (?:noted|remembered|stressed|emphasi[sz]ed|borne in mind)\b/gi;
const SHAREP=/\b(?:of course|naturally(?=,)|as (?:we|is) (?:all )?known?|it is (?:well|widely|generally|commonly) (?:known|accepted|agreed|recogni[sz]ed|understood)|as is well known)\b/gi;
/* common academic word sequences, this page's own short inventory, sorted by the three functions of Biber, Conrad & Cortes (2004) */
const FORMULA={ref:'in terms of|in the context of|in the case of|on the basis of|the extent to which|the nature of the|the role of the|as part of the|with respect to|with regard to|in relation to|as a function of|the degree to which|the way in which|the ways in which|a wide range of|a number of|the majority of|in the form of|at the level of|as well as the|at the same time|the fact that the|one of the most|in the absence of|in the presence of|the total number of|the relationship between the'.split('|'),
 stance:'it is possible that|it is likely that|it is important to|it is necessary to|it is clear that|it should be noted|it is difficult to|it is not clear|appears to be|is likely to be|are likely to|can be seen|it may be|we argue that|it is possible to|it can be argued|to the extent that|it has been suggested|there is no evidence'.split('|'),
 org:'on the other hand|as a result of|in addition to the|in this paper we|in the present study|as shown in|as can be seen|in other words|in contrast to|as a consequence|in order to|due to the fact|the purpose of this|the aim of this|in the next section|as discussed above|as noted above|in conclusion|with the exception of|first of all|as opposed to'.split('|')};
const HEDGE=S('may might could possibly perhaps probably likely apparently seemingly presumably potentially potential arguably somewhat relatively fairly rather roughly appear appears appeared seem seems seemed suggest suggests suggested tend tends tended possible plausible conceivably putative putatively');
const HEDGEP=/\bto (some|a certain) extent\b|\bmore or less\b|\bin some cases\b/gi;
const CHAINP=S('of in for on with by at from between among through during under over within into across against toward towards to');
const ABBR=S('e.g i.e al fig figs eq eqs ref refs vs cf approx ca dr prof mr mrs ms st viz resp sp spp var no');
const ACR_OK=S('DNA RNA USA UK EU UN OK TV AM PM AD BC ID');
const WEAK_END=/\b(to (?:some|a certain|a) degree|in part|more or less|among (?:others|other things)|on the whole|for the most part|in some (?:respects|ways)|overall|as well|too|also|however|though|respectively|etc|and so on|and so forth|in this (study|work|paper|report|article)|in the (literature|field)|previously|recently|to (some|a certain|a large|a great) extent|in (general|particular|nature|practice)|at all|so far|to date|in (many|some|most|these|such|both) cases|of (interest|importance|note)|(has|have|had) (also )?been (reported|observed|described|shown|found|noted|documented|demonstrated|investigated|studied|proposed|suggested|performed|used)|(is|are|was|were) (also )?(observed|seen|found|noted|obtained|reported|shown|performed|carried out|used|employed|measured|determined|investigated|studied|examined|detected|conducted|made|done)|it|them|this|that|these|those|here|there|elsewhere|(by|to|for|with|of) (us|them|it))$/;
const TRANS=/^(in contrast|by contrast|in addition|as a result|for example|for instance|on the other hand|in turn|in particular|taken together|to this end|in other words|at the same time)\b/i;


const CLAIMS=[
 {cat:'causal',re:/\b(caus(?:e|es|ed|ing)|driv(?:e|es|en)|drove|leads? to|led to|results? in|resulted in|responsible for|gives? rise to|gave rise to|due to|because of|underl(?:ies|ie|ying)|accounts? for|(?:is|are|was|were) required for|(?:necessary|sufficient) (?:for|to))\b/gi},
 {cat:'certain',re:/\b(prov(?:e|es|ed|en)|demonstrat(?:e|es|ed)|confirm(?:s|ed)?|establish(?:es|ed)? that|clearly|obviously|undoubtedly|unequivocally|definitively|conclusively|certainly|without (?:a )?doubt|beyond doubt)\b/gi},
 {cat:'absolute',re:/\b(always|never|invariably|universally|entirely|completely|none|in all cases|impossible|no evidence)\b/gi},
 {cat:'novel',re:/\b(novel|for the first time|first (?:report|evidence|demonstration|description|study)|the first to|unprecedented|unique|breakthrough|groundbreaking|paradigm shift|remarkabl[ey]|striking(?:ly)?|dramatic(?:ally)?)\b/gi}];
const EVID={
 causal:[['exp','A controlled experiment or intervention',true,'Causal wording fits a direct intervention.'],['corr','A correlation, or a comparison of groups',false,'A correlation supports “is associated with” or “varies with”. It cannot carry “{w}”.'],['model','A model or simulation',false,'A model supports “the model predicts” or “is consistent with”.'],['lit','Earlier work that I cite',null,''],['reason','My reasoning, not yet tested',false,'Untested reasoning supports “may” or “we propose that”.']],
 certain:[['rep','A direct test, repeated',true,'Strong wording fits direct evidence that has been repeated.'],['one','One experiment or dataset',false,'A single result supports “shows” or “indicates”.'],['ind','Indirect or partial evidence',false,'Indirect evidence supports “suggests” or “is consistent with”.'],['reason','My reasoning, not yet tested',false,'Untested reasoning supports “we propose that”.']],
 absolute:[['all','I checked every case in scope',true,'An absolute fits when every case was checked. Say what the scope was.'],['most','Most cases, or a sample',false,'A sample supports “in most cases” or “in all N samples tested”.'],['imp','A general impression',false,'An impression supports “often” or “typically”, and readers will want to know how often.']],
 novel:[['search','I searched, and I cite the closest earlier work',true,'A novelty claim holds up when the closest earlier work is cited beside it.'],['afaik','As far as I know',false,'Write “to our knowledge” and cite the closest earlier work, or drop the claim and let the result speak.']]};
const CATWHY={causal:'This wording says one thing produces another.',certain:'This wording says the matter is settled.',absolute:'This wording allows no exceptions.',novel:'This wording claims priority or exceptional importance.'};
const CATQ={causal:'What kind of evidence shows that one produces the other?',certain:'How direct is the evidence, and has it been repeated?',absolute:'How many of the cases did you check?',novel:'What is the closest earlier work, and do you cite it?'};
const CITE=/\[\d[\d,\s–-]*\]|\([^()]*\b(?:19|20)\d\d[a-z]?\b[^()]*\)|\bet al\b|(?<![\p{L}\p{N}._%+-])-?@(?!(?:fig|tbl|sec|eq|lst|thm|exm)-)[\p{L}_][\p{L}\p{N}_]|\\[a-zA-Z]*cite[a-zA-Z]*(?![a-zA-Z])/u;
const UNCITED=/\b(?:previous(?:ly)?|earlier|prior|recent|several|many|numerous|other) (?:stud(?:y|ies)|work|workers|research|reports?|authors|investigations|experiments)\b|\b(?:studies|research|reports|workers|authors) (?:have|has) (?:shown|found|reported|suggested|demonstrated|indicated)\b|\b(?:has|have) (?:long |previously |already )?been (?:shown|reported|demonstrated|suggested|established|documented|proposed)\b|\bit is (?:well |widely |generally )?known that\b|\b(?:is|are) (?:well |widely )?known to\b|\bin the literature\b|\bwidely (?:accepted|believed|recognized)\b/i;
const STAT=/\bp\s*[<>=≤]\s*0?\.\d|[<>=≤]\s*0?\.0\d|\b(?:t|F|r|z|d|U|H|W|R2|R²|χ2|χ²)\s*(?:\([^)]*\))?\s*=\s*-?\d|\bCI\b|confidence interval|±|\bn\s*=\s*\d|\b(?:ANOVA|t-test|regression|Mann|Wilcoxon|Tukey|Bonferroni|chi-square|Kruskal)\b/i;
const JOBS=[['context','Context'],['gap','Gap or problem'],['aim','Aim or approach'],['method','Method'],['result','Result'],['interp','Interpretation'],['implication','Implication'],['limit','Limitation']];
const CUES={
 gap:/\bhowever\b|remains? (?:unclear|unknown|elusive|poorly understood)|little is known|poorly understood|not (?:yet )?been|no stud(?:y|ies)|yet to be|unresolved|controversial|debated|lack of|(?:is|are) lacking|few studies|(?:little|less|scant) attention|overlooked|under-?(?:studied|explored|examined)|ha(?:s|ve) not been (?:examined|studied|explored|tested)|gaps? in/g,
 aim:/\bhere,? we\b|in this (?:study|paper|work|article)|we (?:aimed|asked|tested|hypothesi[sz]ed|set out|investigated|sought)|the (?:aim|goal|purpose|objective)|to (?:address|test) this|this (?:study|paper|article) (?:examines|investigates|explores|asks|tests|argues)|we (?:examine|investigate|explore|ask|test|argue)\b|research questions?/g,
 method:/\bw(?:as|ere) (?:measured|collected|sampled|calculated|analy[sz]ed|incubated|prepared|extracted|recorded|grown|harvested)|we (?:used|measured|collected|sampled|recorded)|according to|protocol|performed using|we (?:surveyed|interviewed|recruited|conducted|administered|coded|analy[sz]ed)|(?:participants|respondents) were|w(?:as|ere) (?:assessed|surveyed|interviewed|coded|administered|recruited|drawn from)|data were (?:collected|drawn)/g,
 result:/\bwe (?:found|observed|detected)|\b(?:increased|decreased|declined|rose|fell)\b|w(?:as|ere) (?:higher|lower|greater|reduced)|\bfig(?:ure)?s?\.?\s*\d|\btable\s*\d|significantly|we find\b|(?:results|findings|analys[ei]s) (?:show|showed|indicate|indicated|reveal|revealed)|w(?:as|ere) (?:positively |negatively )?(?:associated|correlated)/g,
 interp:/\bsuggests?\b|\bindicates?\b|consistent with|may (?:reflect|explain|be)|\blikely\b|\bimpl(?:y|ies)\b|\bexplains?\b|\btherefore\b/g,
 implication:/implications?|future (?:work|studies|research)|could be used|should (?:be|consider)|important for|provides? a (?:framework|basis)|more broadly/g,
 limit:/limitations?|caveats?|cannot (?:rule out|exclude)|small sample|further (?:work|study|research) is needed|we did not|was not (?:measured|tested)/g,
 context:/(?:is|are) (?:a |an |the )?(?:major|key|central|important|widespread|common)|ha(?:s|ve) (?:long )?been (?:shown|studied|known|recognized)|(?:is|are) (?:well |widely )?known|plays? a (?:key|central|major|critical|important) role|over the past|in recent years/g};
/* ---- statistics: recompute p from the reported test statistic (the statcheck idea, written from scratch) ---- */
function lgam(x){const c=[76.18009172947146,-86.50532032941677,24.01409824083091,-1.231739572450155,0.1208650973866179e-2,-0.5395239384953e-5];let y=x,t=x+5.5;t-=(x+0.5)*Math.log(t);let s=1.000000000190015;for(let j=0;j<6;j++)s+=c[j]/++y;return -t+Math.log(2.5066282746310005*s/x);}
function betacf(a,b,x){const FP=1e-300,qab=a+b,qap=a+1,qam=a-1;let c=1,d=1-qab*x/qap;if(Math.abs(d)<FP)d=FP;d=1/d;let h=d;
  for(let m=1;m<=400;m++){const m2=2*m;let aa=m*(b-m)*x/((qam+m2)*(a+m2));d=1+aa*d;if(Math.abs(d)<FP)d=FP;c=1+aa/c;if(Math.abs(c)<FP)c=FP;d=1/d;h*=d*c;
    aa=-(a+m)*(qab+m)*x/((a+m2)*(qap+m2));d=1+aa*d;if(Math.abs(d)<FP)d=FP;c=1+aa/c;if(Math.abs(c)<FP)c=FP;d=1/d;const del=d*c;h*=del;if(Math.abs(del-1)<3e-13)break;}return h;}
function ibeta(a,b,x){if(x<=0)return 0;if(x>=1)return 1;const bt=Math.exp(lgam(a+b)-lgam(a)-lgam(b)+a*Math.log(x)+b*Math.log(1-x));return x<(a+1)/(a+b+2)?bt*betacf(a,b,x)/a:1-bt*betacf(b,a,1-x)/b;}
function gammq(a,x){if(x<=0)return 1;const lg=lgam(a);
  if(x<a+1){let ap=a,sum=1/a,del=sum;for(let n=0;n<800;n++){ap++;del*=x/ap;sum+=del;if(Math.abs(del)<Math.abs(sum)*3e-13)break;}return 1-sum*Math.exp(-x+a*Math.log(x)-lg);}
  const FP=1e-300;let b=x+1-a,c=1/FP,d=1/b,h=d;for(let i=1;i<800;i++){const an=-i*(i-a);b+=2;d=an*d+b;if(Math.abs(d)<FP)d=FP;c=b+an/c;if(Math.abs(c)<FP)c=FP;d=1/d;const del=d*c;h*=del;if(Math.abs(del-1)<3e-13)break;}return Math.exp(-x+a*Math.log(x)-lg)*h;}
const pOf=(k,v,d1,d2)=>k==='t'?ibeta(d1/2,0.5,d1/(d1+v*v)):k==='F'?ibeta(d2/2,d1/2,d2/(d2+d1*v)):k==='chi'?gammq(d1/2,v/2):k==='z'?gammq(0.5,v*v/2):(v>=1?0:ibeta(d1/2,0.5,d1/(d1+v*v*d1/(1-v*v))));
const fmtP=p=>p<0.001?'< .001':'= '+p.toFixed(3).replace(/^0/,'');
function statCheck(k,g){const dec=(g.v.split('.')[1]||'').length,a=Math.abs(+g.v),h=0.5*Math.pow(10,-dec),p=pOf(k,a,g.d1,g.d2),pMax=pOf(k,Math.max(0,a-h),g.d1,g.d2),pMin=pOf(k,a+h,g.d1,g.d2);
  const pr=+g.p,dp=(g.p.split('.')[1]||'').length,hp=0.5*Math.pow(10,-dp),fits=(lo,hi)=>g.c==='='?(lo<=pr+hp&&hi>=pr-hp):g.c==='<'?lo<pr:hi>pr;
  const repSig=g.c==='>'?false:g.c==='<'?pr<=0.05:pr<0.05;
  return{p,ok:fits(pMin,pMax),one:fits(pMin/2,pMax/2),decision:(p<0.05)!==repSig};}
const PVR='\\s*,?\\s*p\\s*([<>=])\\s*(0?\\.\\d+)';
const STESTS=[
 {k:'t',re:new RegExp('\\bt\\s*\\(\\s*(\\d+(?:\\.\\d+)?)\\s*\\)\\s*=\\s*(-?\\d*\\.?\\d+)'+PVR,'g'),g:x=>({d1:+x[1],v:x[2],c:x[3],p:x[4]})},
 {k:'F',re:new RegExp('\\bF\\s*\\(\\s*(\\d+(?:\\.\\d+)?)\\s*,\\s*(\\d+(?:\\.\\d+)?)\\s*\\)\\s*=\\s*(\\d*\\.?\\d+)'+PVR,'g'),g:x=>({d1:+x[1],d2:+x[2],v:x[3],c:x[4],p:x[5]})},
 {k:'r',re:new RegExp('\\br\\s*\\(\\s*(\\d+)\\s*\\)\\s*=\\s*(-?0?\\.\\d+)'+PVR,'g'),g:x=>({d1:+x[1],v:x[2],c:x[3],p:x[4]})},
 {k:'chi',re:new RegExp('(?:χ2|χ²|Χ2|Χ²|[Cc]hi-squared?|X2|X²)\\s*\\(\\s*(\\d+)\\s*(?:,\\s*[Nn]\\s*=\\s*\\d+\\s*)?\\)\\s*=\\s*(\\d*\\.?\\d+)'+PVR,'g'),g:x=>({d1:+x[1],v:x[2],c:x[3],p:x[4]})},
 {k:'z',re:new RegExp('\\b[zZ]\\s*=\\s*(-?\\d*\\.?\\d+)'+PVR,'g'),g:x=>({v:x[1],c:x[2],p:x[3]})}];
const EFF=/(?:\b(?:d|g|OR|RR|HR|b|B|V)|η2|η²|ηp2|η2p|ω2|ω²|R2|R²|φ|β)\s*=\s*-?\d*\.?\d|\bCI\b|confidence interval|\bCohen|odds ratio|effect size/;
const MARGINAL=/\b(?:marginal(?:ly)? significan(?:t|ce)|approach(?:ed|ing|es)? (?:statistical )?significance|trend(?:ed|ing|s)? towards? (?:statistical )?significance|borderline significan(?:t|ce)|(?:nearly|almost) significant)\b/i;
const NEGSIG=/\b(?:not|no|never|without|fail(?:ed|s)? to|did not|does not|do not)\b[^.;]{0,30}\bsignifican|\b(?:non-?significan|insignifican)/i;
const PCT=[[/(\d[\d,]*)\s+(?:of|out of)\s+(?:the\s+)?(\d[\d,]*)\b[^.;()%]{0,40}\((\d+(?:\.\d+)?)\s?%\)/g,1,2,3],[/(\d+(?:\.\d+)?)\s?%\s*\(\s*(?:n\s*=\s*)?(\d[\d,]*)\s*\/\s*(\d[\d,]*)\s*\)/g,2,3,1],[/(\d[\d,]*)\s*\/\s*(\d[\d,]*)\s*[,(]\s*(\d+(?:\.\d+)?)\s?%/g,1,2,3]];
/* ---- vocabulary level: New General Service List 1.2 and New Academic Word List 1.2 (Browne, Culligan & Phillips), CC BY-SA 4.0 ---- */
const NGSL=new Set(NGSL_RAW.split(' ')),NAWL=new Set(NAWL_RAW.split(' '));
/* syllables: a rule that reads the spelling, then exceptions taken from the CMU Pronouncing Dictionary */
function sylGuess(x){x=x.toLowerCase().replace(/[^a-z]/g,'');if(!x||x.length<=3)return 1;
  let w=x.replace(/([aeiouy][^aeiouy]+)e(?=(?:ly|ments?|ful|fully|less|ness|ty)$)/,'$1');
  if(/[^aeiouyl]les?$/.test(w)||/[^aeiouyl]led$/.test(w)){if(/[sd]$/.test(w))w=w.slice(0,-1);}
  else if(/es$/.test(w))w=w.slice(0,/(?:[sxzcg]|ch|sh)es$/.test(w)?-1:-2);
  else if(/ed$/.test(w)){if(!/[td]ed$/.test(w))w=w.slice(0,-2);}
  else if(/e$/.test(w)&&!/[aeiouy]e$/.test(w))w=w.slice(0,-1);
  w=w.replace(/^y/,'');let n=(w.match(/[aeiouy]{1,2}/g)||[]).length;
  const m=w.match(/(?<![ct])ia(?=l)|(?<![ctg])ia(?=n)|ia(?![ln]|ge)|io$|ios$|^[^aeiouy]{0,2}io|io(?=[dt]$|[dt]s$)|iu|(?<![qg])ua|(?<![ct])ie(?=t|nc|nt)|(?<!p|th)eo(?!u)|^rea(?=ct)/g);if(m)n+=m.length;
  if(/[^aeiouy][eo]ing$/.test(x))n++;if(/isms?$/.test(x))n++;if(x.length>4&&/[^aeiouy]ea$/.test(x))n++;
  return n||1;}
const SYLX=new Map();(typeof SYL_RAW!=='undefined'?SYL_RAW:'').split('|').forEach(g=>{const i=g.indexOf(':');if(i<0)return;const k=+g.slice(0,i);g.slice(i+1).split(' ').forEach(w=>{if(w)SYLX.set(w,k);});});
function syl(x){const k=x.toLowerCase().replace(/[^a-z]/g,''),v=SYLX.get(k);return v!=null?v:sylGuess(k);}
/* general science jargon: the 2,138 words of Plaven-Sigray et al. (2017) */
const JARGON=new Set((typeof JARGON_RAW!=='undefined'?JARGON_RAW:'').split(' ').filter(Boolean));
/* optional lists: the New Dale-Chall familiar words, and the style words of Kobak et al. (2025) */
const DALE=new Set((typeof DALE_RAW!=='undefined'?DALE_RAW:'').split(' ').filter(Boolean)),EXCESS=new Set((typeof EXCESS_RAW!=='undefined'?EXCESS_RAW:'').split(' ').filter(Boolean));
const XTRA=S('one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty thirty forty fifty sixty seventy eighty ninety hundred thousand million billion zero first second third fourth fifth sixth seventh eighth ninth tenth monday tuesday wednesday thursday friday saturday sunday january february march april may june july august september october november december okay etc');
const UKUS=[[/our(s?)$/,'or$1'],[/is(e|es|ed|ing|ation|ations)$/,'iz$1'],[/ys(e|es|ed|ing)$/,'yz$1'],[/tre(s?)$/,'ter$1'],[/ogue(s?)$/,'og$1'],[/ence$/,'ense'],[/^programme/,'program'],[/^grey/,'gray'],[/ll(ed|ing|er|ers)$/,'l$1']];
const IRRF={};'was:be were:be been:be did:do done:do had:have went:go gone:go got:get gotten:get made:make said:say took:take taken:take came:come saw:see seen:see knew:know known:know gave:give given:give found:find thought:think told:tell became:become left:leave felt:feel brought:bring began:begin begun:begin kept:keep held:hold wrote:write written:write stood:stand heard:hear meant:mean met:meet ran:run paid:pay sat:sit spoke:speak spoken:speak laid:lay led:lead grew:grow grown:grow lost:lose fell:fall fallen:fall sent:send built:build understood:understand drew:draw drawn:draw broke:break broken:break spent:spend rose:rise risen:rise drove:drive driven:drive bought:buy wore:wear worn:wear chose:choose chosen:choose sought:seek threw:throw thrown:throw caught:catch dealt:deal won:win forgot:forget forgotten:forget shook:shake shaken:shake hung:hang struck:strike taught:teach sold:sell fought:fight slept:sleep ate:eat eaten:eat drank:drink drunk:drink sang:sing sung:sing swam:swim flew:fly flown:fly hid:hide hidden:hide bore:bear born:bear borne:bear beaten:beat shot:shoot bound:bind bred:breed fed:feed fled:flee froze:freeze frozen:freeze lent:lend rode:ride ridden:ride rang:ring rung:ring shone:shine shrank:shrink shrunk:shrink slid:slide spun:spin stole:steal stolen:steal stuck:stick swept:sweep swore:swear sworn:swear tore:tear torn:tear woke:wake woken:wake withdrew:withdraw withdrawn:withdraw arose:arise arisen:arise undertook:undertake undertaken:undertake underwent:undergo undergone:undergo overcame:overcome shown:show proven:prove women:woman men:man children:child feet:foot teeth:tooth mice:mouse lives:life phenomena:phenomenon hypotheses:hypothesis analyses:analysis crises:crisis'.split(' ').forEach(x=>{const q=x.split(':');IRRF[q[0]]=q[1];});
function lemmas(w){const c=[w],seen=new Set(c),add=x=>{if(x.length>1&&!seen.has(x)&&c.length<60){seen.add(x);c.push(x);}};
  UKUS.forEach(([re,r])=>{if(re.test(w))add(w.replace(re,r));});
  for(let q=0;q<c.length;q++){const b=c[q];
    if(/ies$/.test(b))add(b.slice(0,-3)+'y');if(/es$/.test(b))add(b.slice(0,-2));if(/s$/.test(b))add(b.slice(0,-1));
    if(/ied$/.test(b))add(b.slice(0,-3)+'y');if(/ed$/.test(b)){add(b.slice(0,-2));add(b.slice(0,-1));if(/(.)\1ed$/.test(b))add(b.slice(0,-3));}
    if(/ing$/.test(b)){add(b.slice(0,-3));add(b.slice(0,-3)+'e');if(/(.)\1ing$/.test(b))add(b.slice(0,-4));}
    if(/ly$/.test(b)){add(b.slice(0,-2));if(/ily$/.test(b))add(b.slice(0,-3)+'y');if(/ally$/.test(b))add(b.slice(0,-4));}
    if(/ness$/.test(b)){add(b.slice(0,-4));if(/iness$/.test(b))add(b.slice(0,-5)+'y');}
    if(/er$/.test(b)){add(b.slice(0,-2));add(b.slice(0,-1));}if(/est$/.test(b)){add(b.slice(0,-3));add(b.slice(0,-2));}
    if(/ier$/.test(b))add(b.slice(0,-3)+'y');if(/iest$/.test(b))add(b.slice(0,-4)+'y');if(/en$/.test(b)){add(b.slice(0,-2));add(b.slice(0,-2)+'e');}
    if(/ves$/.test(b)){add(b.slice(0,-3)+'f');add(b.slice(0,-3)+'fe');}if(/ses$/.test(b))add(b.slice(0,-2)+'is');if(IRRF[b])add(IRRF[b]);
    if(/^(un|re|non)-?./.test(b))add(b.replace(/^(un|re|non)-?/,''));}
  return c;}
function wordLevel(w){w=w.replace(/[’']s$/,'').replace(/[’']/g,'');let mx=-1;
  for(const p of w.split('-')){if(p.length<2||isFunc(p))continue;let lv=2;for(const c of lemmas(p)){if(NGSL.has(c)||XTRA.has(c)||isFunc(c)){lv=0;break;}if(NAWL.has(c))lv=1;}mx=Math.max(mx,lv);}return mx;}
/* ---- vague and worn words ---- */
/* abstract nouns that, after "this" or "these", name something already said ("this decline", "these findings"): this page's own list */
const SHELLN=S('approach approaches finding findings result results trend trends pattern patterns limitation limitations problem problems issue issues question questions argument arguments claim claims view views idea ideas assumption assumptions hypothesis hypotheses explanation explanations interpretation interpretations conclusion conclusions observation observations difference differences effect effects relationship relationships association associations change changes increase increases decrease decreases decline declines shift shifts rise fall growth loss gain gains process processes method methods technique techniques procedure procedures strategy strategies analysis analyses model models framework frameworks theory theories concept concepts notion notions distinction distinctions contrast example examples case cases situation situations context condition conditions factor factors reason reasons evidence fact facts phenomenon phenomena tendency tendencies outcome outcomes implication implications possibility possibilities point points aspect aspects feature features measure measures study studies gap gaps debate debates response responses decision decisions failure failures success paradox puzzle discrepancy inconsistency mechanism mechanisms account accounts estimate estimates figure figures number numbers step steps stage stages period event events development developments');
/* the action of a verb as a noun, for suggesting "this decline" after "trust declined" */
const NOUNOF={grow:'growth',fail:'failure',lose:'loss',differ:'difference',vary:'variation',respond:'response',choose:'choice',believe:'belief',argue:'argument',find:'finding',suggest:'suggestion',improve:'improvement',develop:'development',agree:'agreement',decide:'decision',explain:'explanation',expand:'expansion',exclude:'exclusion',conclude:'conclusion',observe:'observation',tend:'tendency',perceive:'perception',withdraw:'withdrawal',react:'reaction',resist:'resistance',depend:'dependence',exist:'existence',emerge:'emergence',occur:'occurrence',appear:'appearance',perform:'performance',prefer:'preference',compete:'competition',protect:'protection',predict:'prediction',interact:'interaction',contribute:'contribution',distribute:'distribution',restrict:'restriction',relate:'relationship',associate:'association',correlate:'correlation',collapse:'collapse',reform:'reform',protest:'protest',support:'support',control:'control',benefit:'benefit',fall:'fall',drop:'drop',report:'report',claim:'claim',attempt:'attempt',approach:'approach',result:'result',show:'finding',indicate:'finding',reveal:'finding',demonstrate:'finding',estimate:'estimate',measure:'measure',limit:'limit',contrast:'contrast',increase:'increase',decrease:'decrease',decline:'decline',rise:'rise',shift:'shift',change:'change',gain:'gain'};
/* clause openers beyond the relatives, and the prepositions that some noun-or-verb words govern as verbs */
const WHC=S('what how why');
const CAUS=S('make makes made making let lets letting help helps helped helping see sees saw seeing watch watches watched watching hear hears heard hearing');
const TEMPN=S('day days year years month months week weeks time times morning evening night moment summer winter spring autumn century decade hour hours minute minutes ago yesterday today tomorrow tonight');
const NOUNY=S('live doubt face look model survey interview vote campaign protest rate rank score code question answer experience frame target document cluster benefit risk cost burden reward sanction reform fund tax talk count grant award debate dispute plan judge challenge harm damage peak witness track trace train graduate');
const VPREP={focus:/^on$/,result:/^(?:from|in)$/,stem:/^from$/,account:/^for$/,control:/^for$/,point:/^to$/,lead:/^to$/,range:/^from$/,benefit:/^from$/,vote:/^(?:for|against)$/,care:/^(?:about|for)$/,talk:/^(?:about|to)$/,act:/^(?:on|as)$/,rest:/^on$/,work:/^(?:with|on|in|for)$/,contrast:/^with$/,campaign:/^(?:for|against)$/,protest:/^against$/,plan:/^(?:for|to)$/,hope:/^(?:for|to)$/,need:/^to$/,aim:/^(?:to|at)$/,attempt:/^to$/,claim:/^to$/,help:/^to$/,tend:/^to$/,lie:/^(?:in|with)$/,fall:/^(?:into|within|under)$/,rise:/^(?:to|from)$/,shift:/^(?:from|to|toward|towards)$/,return:/^to$/,move:/^(?:from|to|toward|towards|into)$/,fit:/^(?:into|with)$/,match:/^with$/,link:/^to$/,cluster:/^(?:in|around)$/,peak:/^(?:in|at)$/,count:/^(?:on|as)$/,call:/^for$/,reply:/^to$/,answer:/^to$/,experiment:/^with$/};
/* adjectives that look like passive participles. PADJ: a state of mind or a standing property. PADJP: a state only before the preposition given. */
const DEGREE=S('very more most less least quite so too rather somewhat fairly increasingly extremely');
const PADJ=S('interested worried tired excited convinced surprised scared disappointed satisfied dissatisfied pleased delighted annoyed bored confused embarrassed frightened frustrated depressed stressed relaxed amazed astonished shocked alarmed ashamed concerned married divorced widowed retired educated experienced skilled qualified talented motivated inclined accustomed opposed dedicated devoted pronounced biased sophisticated detailed complicated crowded');
const PADJP={divided:/^(?:on|over|about)$/,determined:/^to$/,limited:/^(?:to|in)$/,restricted:/^to$/,confined:/^to$/,related:/^to$/,associated:/^with$/,correlated:/^with$/,linked:/^(?:to|with)$/,connected:/^(?:to|with)$/,involved:/^(?:in|with)$/,based:/^(?:on|upon|in|at)$/,located:/^(?:in|at|on|near|within)$/,situated:/^(?:in|at|on|near|within)$/,composed:/^of$/,comprised:/^of$/,rooted:/^in$/,grounded:/^in$/,embedded:/^(?:in|within)$/,aimed:/^at$/,committed:/^to$/,engaged:/^(?:in|with)$/,prepared:/^(?:to|for)$/,supposed:/^to$/,used:/^to$/,known:/^(?:as|for)$/,characterized:/^by$/,characterised:/^by$/,faced:/^with$/,equipped:/^(?:with|to)$/,suited:/^(?:to|for)$/,meant:/^to$/};
/* a view attributed to nobody in particular */
const VAGUEATT=/\b(?:some|many|most|several|certain|a few|few) (?:people|researchers|scholars|scientists|experts|critics|authors|observers|commentators|theorists|analysts|writers|economists|sociologists|psychologists|historians|educators|practitioners) (?:would )?(?:argue|say|believe|claim|think|suggest|contend|maintain|hold|feel|assert|agree|have (?:argued|said|claimed|suggested|noted|questioned))\b|\b(?:critics|experts|scholars|researchers|scientists|observers|commentators|proponents|opponents|sceptics|skeptics|advocates) (?:argue|say|believe|claim|contend|maintain|agree|warn|have (?:long )?(?:argued|claimed|held|warned|maintained))\b|\bit (?:is|has been|was|has long been) (?:(?:widely|generally|commonly|often|sometimes|frequently|popularly|traditionally|usually) )?(?:believed|thought|said|argued|claimed|assumed|held|felt) (?:that|to)\b|\b(?:is|are|was|were) (?:widely|generally|commonly|often|usually|typically|traditionally|popularly) (?:believed|thought|said|considered|regarded|seen|viewed|assumed|held|acknowledged) (?:to|as|that)\b|\b(?:is|are) (?:thought|said|believed|reputed|alleged|rumou?red) to\b|\b(?:some|many) (?:would )?(?:argue|say|believe|claim|contend)\b|\bit (?:could|can|might|may) be (?:argued|said|claimed)\b|\bthere is (?:a |an )?(?:growing |widespread |general |broad |emerging |increasing )?(?:consensus|agreement|belief|concern|recognition|sense|view|perception) that\b|\bconventional wisdom\b|\bas (?:everyone|everybody) knows\b/gi;
/* words that gesture at an amount, and words that tell the reader how to react */
const VAGUEDEG=/\b(?:quite|mostly|largely|substantially|considerably|significantly|basically|essentially|virtually|practically|more or less|to a large extent|by and large)\b/gi;
const COMMENTW=/\b(?:interestingly|surprisingly|importantly|remarkably|strikingly|curiously|intriguingly|unfortunately|fortunately|notably|crucially|tellingly)\b/gi;
const INTENS=/\b(?:very|extremely|really|highly|incredibly|truly|hugely|vastly|immensely|totally|utterly)\b/gi;
const VAGUEQ=/\b(?:many|several|various|numerous|countless|a lot of|lots of|a variety of|a handful of)\s+(?:[a-z-]+\s+)?[a-z-]+s\b/gi;
const WORN=[[/\ba growing body of (?:literature|research|evidence|work|studies)\b/gi],[/\bin today[’']s (?:society|world)\b/gi],[/\bin this day and age\b/gi],[/\bsince the dawn of (?:time|history|civilization)\b/gi],[/\bthroughout history\b/gi],[/\bit goes without saying\b/gi],[/\bneedless to say\b/gi],[/\bat the end of the day\b/gi],[/\bthe tip of the iceberg\b/gi],[/\bshed(?:s|ding)? (?:new |some |further )?light on\b/gi],[/\bpav(?:e|es|ed|ing) the way\b/gi],[/\bfill(?:s|ed|ing)? (?:a|the|this|an important) gap in the literature\b/gi],[/\bhot topic\b/gi],[/\bcutting[- ]edge\b/gi],[/\bstate[- ]of[- ]the[- ]art\b/gi],[/\bdouble-edged sword\b/gi],[/\blast but not least\b/gi],[/\bfirst and foremost\b/gi],[/\bplays? an? (?:pivotal|vital|crucial|key|central|important|significant|major) role\b/gi],
 [/\b(?:more|further|additional|future) (?:research|work|stud(?:y|ies)) (?:is|are) (?:needed|required|warranted|necessary)\b/gi,'What research, exactly?','Every paper can end this way, so the sentence tells the reader nothing.','Name the next study: its question, its sample and its design.']];
/* ---- describing people (after the APA Style bias-free language guidelines) ---- */
const PEOPLE=[
 [/\b(?:the elderly|elderly (?:people|persons|adults|individuals|participants|patients|men|women)|the aged)\b/gi,'older adults, older people, or the age range','It treats older people as a group apart.'],
 [/\bsenior citizens?\b/gi,'the specific age range, such as people 65 years and older','It is not a uniformly recognized age group.'],
 [/\b(?:senile|senility)\b/gi,'dementia, naming the type when it is known','The word is outdated and has no agreed meaning.'],
 [/\bspecial needs\b/gi,'a person with a disability, or the specific condition','It is a euphemism that many disabled people reject.'],
 [/\b(?:physically|mentally) challenged\b/gi,'a person with a physical disability, or people with intellectual disabilities','It is a condescending euphemism.'],
 [/\bmentally retarded\b/gi,'people with intellectual disabilities','The term is outdated and offensive.'],
 [/\bthe mentally ill\b/gi,'people with a mental illness, or the specific condition','It labels people by a condition.'],
 [/\b(?:wheelchair[- ]bound|confined to a wheelchair)\b/gi,'wheelchair user','It frames the wheelchair as a restriction.'],
 [/\bAIDS victims?\b/gi,'a person with AIDS','“Victim” defines the person by the condition.'],
 [/\bbrain[- ]damaged\b/gi,'a person with a traumatic brain injury','It labels the person by an injury.'],
 [/\b(?:alcoholics|addicts|substance abusers|drug abusers)\b/gi,'people with alcohol use disorder, or people with substance use disorders','It labels people by a condition.'],
 [/\b(?:epileptics|paraplegics|schizophrenics|amnesiacs)\b/gi,'people with the condition, such as people with epilepsy','A condition used as a noun labels the whole person.'],
 [/\bhearing[- ]impaired\b/gi,'hard-of-hearing, or Deaf where people use that term','Many people in the community reject it.'],
 [/\b(?:high|low)[- ]functioning\b/gi,'a description of the person’s specific strengths and weaknesses','The label is imprecise and can be demeaning.'],
 [/\bCaucasians?\b/g,'White or European American','The term comes from a ranking of races.'],
 [/\bOrientals?\b/g,'Asian, or the specific nation or region','It is pejorative when applied to people.'],
 [/\b(?:Afro-Americans?|Negro(?:es)?)\b/g,'Black or African American','The terms are dated.'],
 [/\bEskimos?\b/g,'the specific name, such as Inuit or Iñupiat','It may be considered pejorative.'],
 [/\bminorities\b/gi,'racial or ethnic minorities, people of color, or the specific groups','On its own the word can imply “less than”.'],
 [/\bnon-?White\b/gi,'the specific group names','It makes White the standard of comparison.'],
 [/\b(?:males|females)\b/gi,'men, women, boys, girls or people (keep male and female as adjectives)','As nouns they reduce people to a category.'],
 [/\bmankind\b/gi,'people, humankind or human beings','It uses “man” to stand for everyone.'],
 [/\bmanpower\b/gi,'personnel, workforce or staff','It uses “man” to stand for everyone.'],
 [/\b(?:he or she|she or he|he\/she|s\/he|\(s\)he|his or her|him or her)\b/gi,'singular they','It leaves out people who use neither pronoun.'],
 [/\bopposite (?:sex|gender)\b/gi,'another sex or another gender','It overstates the difference between groups.'],
 [/\b(?:birth|natal) sex\b/gi,'sex assigned at birth','It implies sex is fixed and free of social influence.'],
 [/\bpreferred pronouns?\b/gi,'pronouns, or self-identified pronouns','“Preferred” implies a choice about gender.'],
 [/\btransgendered\b/gi,'transgender, as an adjective','The -ed form is not used.'],
 [/\b(?:chairman|policeman|policemen|housewife|housewives|stewardess|waitress|foreman|mailman)\b/gi,'a gender-neutral title, such as chair, police officer, homemaker or server','The title assumes a gender.'],
 [/\bthe poor\b/gi,'people living in poverty, or an income range','An adjective used as a noun labels the whole person.'],
 [/\bnormal (?:controls?|participants|subjects|children|adults|women|men|people|individuals|students)\b/gi,'a named comparison group, such as control participants','Calling one group normal implies the other is abnormal.']];
const SMV={review:'review',estimate:'estimate',summary:'summarize',survey:'survey',search:'search',test:'test',attempt:'attempt'};
function inflect(b,k){const y=/[^aeiou]y$/.test(b),e=/e$/.test(b),stem=DBL.has(b)?b+b.slice(-1):b;
  if(k==='base')return b;if(k==='s')return /(s|x|z|ch|sh|o)$/.test(b)?b+'es':y?b.slice(0,-1)+'ies':b+'s';
  if(k==='ing')return /ie$/.test(b)?b.slice(0,-2)+'ying':(e&&!/ee$/.test(b))?b.slice(0,-1)+'ing':stem+'ing';
  if(IRR[b]){const q=IRR[b].split(' ');return k==='pp'?q[1]:q[0];}
  return e?b+'d':y?b.slice(0,-1)+'ied':stem+'ed';}
const PB={intro:['Introducing work','introducing-work'],sources:['Referring to sources','referring-to-sources'],methods:['Describing methods','describing-methods'],results:['Reporting results','reporting-results'],discuss:['Discussing findings','discussing-findings'],concl:['Writing conclusions','writing-conclusions'],cautious:['Being cautious','using-cautious-language'],define:['Defining terms','writing-definitions'],cause:['Explaining causality','explaining-cause-and-effect'],transition:['Signalling transition','signalling-transition']};
const JOBPB={context:'intro',gap:'intro',aim:'intro',method:'methods',result:'results',interp:'discuss',limit:'discuss',implication:'concl'};
const MOVES={context:['Says why the topic matters','Says what is already known, with citations'],gap:['Names what is unknown, unresolved or disputed','Says why that gap matters'],aim:['States the question or hypothesis','Says in a line how you approached it'],method:['Says who took part, how many, and how they were recruited','Names each measure and what it captures','Says what was done, in the order it was done','Says how the data were analysed'],result:['Points the reader to the figure or table','States what was found, with numbers','Gives the test statistic, the exact p and an effect size'],interp:['Says what the result means','Compares it with earlier work','Offers an explanation'],implication:['Answers the question the introduction raised','Says what follows for the field or for practice'],limit:['Names the limitation','Says how it could affect the conclusion']};
const SIGTIP={gap:'Signals a gap: tells the reader something is missing, unknown or disputed.',aim:'Signals an aim: tells the reader what this work set out to do.',method:'Signals method: tells the reader what was done.',result:'Signals a result: tells the reader what was found.',interp:'Signals interpretation: tells the reader what a result means.',implication:'Signals an implication: tells the reader what follows.',limit:'Signals a limitation.',context:'Signals context: tells the reader what is already known, or why the topic matters.'};
const MOVEPRI=['aim','gap','result','method','interp','limit','implication','context'];
const MOVEMSG={context:['the context','Why does this topic matter, and what is already known about it?','opens by placing the work: why the topic matters and what is known.','Open with a sentence that names the topic and says why it matters.','intro'],
 gap:['a gap','What was unknown, unresolved or disputed before this work?','names what is missing or disputed in what is known.','State the gap in a sentence of its own, with words such as “however”, “little is known” or “few studies”.','intro'],
 aim:['your aim','What did you set out to do or to find out?','says what this work set out to do.','Say it outright: “In this study, we …” or “This paper examines …”.','intro'],
 method:['a method','How did you find it out?','says how the work was done.','Add a sentence on who or what was studied, and how.','methods'],
 result:['a result','What did you find?','reports what was found.','State the main finding in a sentence that says so: “We found …” or “The results show …”.','results'],
 interp:['what the results mean','What do the results mean?','says what the results mean.','Add a sentence that interprets the finding: “This suggests …”.','discuss'],
 implication:['an implication','Why does the finding matter beyond this study?','closes on what the finding means for the field or for practice.','End with what follows from the finding.','concl'],
 limit:['a limitation','What can this study not show?','names what the study cannot show.','Name the main limitation plainly.','discuss']};
const SIGNALS=Object.entries(CUES).map(([k,re])=>({k,re,move:true,tip:SIGTIP[k]})).concat([
 {k:'contrast',re:/\b(?:in contrast|by contrast|on the other hand|nevertheless|nonetheless|conversely|whereas|although|despite)\b/g,tip:'Transition: a contrast with what came before.'},
 {k:'consequence',re:/\b(?:thus|hence|consequently|as a result|accordingly)\b/g,tip:'Transition: a consequence of what came before.'},
 {k:'addition',re:/\b(?:moreover|furthermore|in addition|additionally|similarly|likewise)\b/g,tip:'Transition: adds to what came before.'},
 {k:'example',re:/\b(?:for example|for instance|such as|in particular|specifically|namely)\b/g,tip:'Transition: an example, or a narrowing.'},
 {k:'sequence',re:/\b(?:first|second|third|finally|next|subsequently)\b/g,tip:'Transition: a step in a sequence.'},
 {k:'summary',re:/\b(?:in summary|in conclusion|taken together|overall|in short|to conclude)\b/g,tip:'Transition: a summing-up.'}]);
const LV={causal:{corr:[['are associated with','is associated with','was associated with'],['vary with','varies with','varied with']],model:[['are predicted to cause','is predicted to cause','was predicted to cause'],['are consistent with','is consistent with','was consistent with']],reason:[['may cause','may cause','may have caused'],['could contribute to','could contribute to','could have contributed to']]},
 certain:{one:[['show','shows','showed'],['indicate','indicates','indicated']],ind:[['suggest','suggests','suggested'],['are consistent with the view','is consistent with the view','was consistent with the view']],reason:[['suggest','suggests','suggested'],['raise the possibility','raises the possibility','raised the possibility']]}};
const ABSALT={always:['usually','in most cases','often'],never:['rarely','seldom'],invariably:['usually','typically'],universally:['widely','commonly'],entirely:['largely','mostly'],completely:['largely','mostly'],none:['few'],'in all cases':['in most cases','in the cases examined'],impossible:['unlikely'],'no evidence':['little evidence']};
function ladder(cat,val,w){const lw=w.toLowerCase(),f0=lw.split(' ')[0],form=/^(is|was)$/.test(f0)?1:/^(are|were)$/.test(f0)?0:/(ed|en)$/.test(f0)||/^(drove|led|gave)$/.test(f0)?2:/[^s]s$/.test(f0)?1:0;
  if(cat==='causal'){if(val==='lit')return[];
    if(/^(due to|because of)$/.test(lw))return{corr:['in association with','alongside'],model:['consistent with'],reason:['possibly due to','perhaps because of']}[val]||[];
    if(/^(responsible|necessary|sufficient)/.test(lw)||/required/.test(lw)||/ing$/.test(f0))return val==='corr'?['associated with']:val==='model'?['consistent with']:['possibly '+lw];
    return(LV.causal[val]||[]).map(v=>v[form]);}
  if(cat==='certain'){if(/ly$|doubt$/.test(lw))return['','probably','apparently'];const tail=/ that$/.test(lw)?' that':'';return(LV.certain[val]||[]).map(v=>v[form]+tail);}
  if(cat==='absolute')return ABSALT[lw]||[];
  if(/first/.test(lw))return['to our knowledge, '+lw];
  return lw==='novel'?['','new']:[''];}
function pbFor(f){const t=f.title;switch(f.lens){
 case'claims':return f.claim.cat==='causal'?['cause','cautious']:['cautious'];
 case'hedge':return['cautious'];
 case'topic':return /characters/.test(t)?[]:['transition'];
 case'flow':case'signals':return['transition'];
 case'stats':return['results'];
 case'checks':return /Earlier work/.test(t)?['sources']:/statistic|Figure|Table/.test(t)?['results']:[];
 case'terms':case'acr':return['define'];
 case'tracer':return /opening/.test(t)?['intro']:/closing/.test(t)?['concl']:[];
 case'jobs':return /gap|aim/i.test(t)?['intro']:/so what/.test(t)?['discuss','concl']:[];}
 return[];}
const near=(a,b)=>{if(a===b)return true;const n=Math.min(a.length,b.length);if(n<5)return false;let p=0;while(p<n&&a[p]===b[p])p++;return p>=5&&p>=0.8*n;};
function Q(f){const t=f.title;switch(f.lens){
 case'sv':return'Which matters more to you here: the statement the subject and verb make, or what interrupts it?';
 case'topic':return /characters/.test(t)?'Whose story is this paragraph?':'What does the reader already hold that this sentence continues?';
 case'stress':return'What one thing do you want remembered from this sentence, and is it the last thing read?';
 case'flow':return'Which of these terms has the reader met before? Could the sentence start there?';
 case'action':return'What is actually happening here, and who or what does it?';
 case'rhythm':return /short sentences in a row/.test(t)?'How do these short sentences relate to one another?':/very long sentences in a row/.test(t)?'Where can the reader rest between these sentences?':/^(A run of|Little contrast)/.test(t)?'Which point in this paragraph deserves to stand out?':/before the main verb/.test(t)?'What must the reader hold in mind before the verb arrives?':/want remembered/.test(t)?'What would make this sentence stand apart from its neighbours?':'Where is the natural joint in this sentence?';
 case'clutter':return'Does the sentence lose anything without these words?';
 case'hedge':return'How sure are you? Which single hedge says exactly that?';
 case'dense':return /stack/.test(t)?'What acts on what inside this phrase?':'Is there a verb hiding in this chain?';
 case'openers':return /what\?/.test(t)?'Which noun does this word stand for?':'What is the real subject of this sentence?';
 case'voice':return'Whose story is this sentence: the thing acted on, or the agent?';
 case'acr':return'Will every reader you are writing for know this abbreviation?';}
 return'';}

/* A citation key in the style of pandoc, Quarto and R Markdown (@Marwick2026, [@a; @b, p. 3], -@a) is one token.
   Inside square brackets the key and its page reference are citation apparatus, so they do not count as words.
   Outside brackets the key stands for the author's name, so it counts as one word but never as a term. */
function tokenize(text){const T=[];const re=/`[^`\n]+`|\$(?=\S)[^$\n]{0,160}?(?<=\S)\$(?!\d)|\\\([^\n]*?\\\)|\\(?:[a-zA-Z]*cite[a-zA-Z]*|ref|eqref|autoref|cref|Cref|pageref|label|url)\*?(?:\[[^\]\n]*\])*\{[^{}\n]*\}|https?:\/\/[^\s)>\]]+|\]\([^)\s]+\)|(?<![\p{L}\p{N}._%+-])-?@[\p{L}_][\p{L}\p{N}_]*(?:[:.#$%&+?<>~\/-][\p{L}\p{N}_]+)*|[\p{L}\p{N}]+(?:[-'’.\/][\p{L}\p{N}]+)*%?|[^\s\p{L}\p{N}]/gu;let m,any=false;
  while((m=re.exec(text))){const t=m[0],ck=/^-?@./.test(t),mask=t.length>1&&/^(?:`|\$|\\[(a-zA-Z]|https?:|\]\()/.test(t);if(ck)any=true;T.push({t,l:t.toLowerCase().replace(/’/g,"'"),s:m.index,e:m.index+t.length,w:!mask&&/[\p{L}\p{N}]/u.test(t),cite:ck||(mask&&/^\\[a-zA-Z]*cite/.test(t))||undefined,mask:mask||undefined});}
  if(any)for(let i=0;i<T.length;i++){if(T[i].t!=='[')continue;let j=i+1,has=false;while(j<T.length&&T[j].t!==']'&&T[j].t!=='['){if(T[j].cite)has=true;j++;}
    if(has&&j<T.length&&T[j].t===']'){for(let q=i+1;q<j;q++){T[q].w=false;T[q].cite=true;}i=j;}}
  return T;}
/* Split the text into blocks. A block with head:true is shown but not analysed: a heading, or a stretch that is not the
   writer's prose (kind: yaml, code, math, markup, quote, refs). Offsets are kept, so nothing in the text is moved or removed. */
const REFHEAD=/^(?:#{1,6}\s*)?(?:\d+(?:\.\d+)*\.?\s+)?(?:references|reference list|bibliography|works cited|literature cited|sources cited)\s*:?\s*(?:\{[^}]*\})?\s*#*$/i;
const ENDREFS=/^(?:#{1,6}\s*)?(?:\d+(?:\.\d+)*\.?\s+)?(?:appendix|appendices|acknowledge?ments|notes|footnotes|endnotes|tables|figures|supplementary|supporting information|author|funding|data availability)\b/i;
function splitParas(raw){const out=[],lines=raw.split('\n');let cur=null,pos=0,mode=null,blk=null,refs=false,first=true;
  const flush=()=>{if(!cur)return;if(!cur.head){const t=raw.slice(cur.s,cur.e);
      const q=(t.match(/[“”"]/g)||[]).length;
      if(q===2&&/^[“"]/.test(t)&&/[”"]\s*(?:\([^()]*\)|\[[^\]]*\])?[.,;]?$/.test(t)&&t.split(/\s+/).length>=25){cur.head=true;cur.kind='quote';}}
    out.push(cur);cur=null;};
  for(let li=0;li<lines.length;li++){const line=lines[li],s=pos;pos+=line.length+1;const tr=line.trim(),ls=s+Math.max(0,line.search(/\S/)),le=s+line.replace(/\s+$/,'').length;let m;
    if(mode){if(tr)blk.e=le;if(mode.test(tr)){out.push(blk);mode=null;blk=null;}continue;}
    if(!tr){flush();continue;}
    const open=(kind,end,oneLine)=>{flush();blk={s:ls,e:le,head:true,kind};if(oneLine){out.push(blk);blk=null;}else mode=end;};
    if(first){first=false;if(tr==='---'){let close=false;for(let q=li+1;q<Math.min(lines.length,li+120);q++)if(/^(?:---|\.\.\.)\s*$/.test(lines[q])){close=true;break;}if(close){open('yaml',/^(?:---|\.\.\.)$/);continue;}}}
    if((m=tr.match(/^(`{3,}|~{3,})/))){open('code',new RegExp('^'+(m[1][0]==='`'?'`':'~')+'{'+m[1].length+',}\\s*$'));continue;}
    if(/^\$\$/.test(tr)){open('math',/\$\$\s*$/,tr.length>4&&/\$\$\s*$/.test(tr.slice(2)));continue;}
    if(/^\\\[/.test(tr)){open('math',/\\\]\s*$/,/\\\]\s*$/.test(tr));continue;}
    if((m=tr.match(/^\\begin\{(equation|align|gather|multline|eqnarray|displaymath|math|table|figure|tabular|verbatim|lstlisting|tikzpicture)\*?\}/))){
      open(/table|figure|tabular|tikz/.test(m[1])?'markup':/verbatim|lstlisting/.test(m[1])?'code':'math',new RegExp('\\\\end\\{'+m[1]+'\\*?\\}'),new RegExp('\\\\end\\{'+m[1]+'\\*?\\}').test(tr));continue;}
    if(/^:{3,}/.test(tr)||/^<!--.*-->$/.test(tr)||/^!\[[^\]]*\]\([^)]*\)(?:\{[^}]*\})?$/.test(tr)||/^\|.*\|$/.test(tr)||/^(?:-{3,}|\*{3,}|_{3,})$/.test(tr)||/^\\(?:label|includegraphics|caption|bibliography|bibliographystyle|printbibliography|maketitle|tableofcontents|newpage|clearpage|usepackage|documentclass|begin|end|input|include)\b/.test(tr)){open('markup',null,true);continue;}
    const mdH=/^#{1,6}\s+\S/.test(tr)||/^\\(?:(?:sub)*section|chapter|paragraph)\*?\{/.test(tr),rh=REFHEAD.test(tr);
    if(mdH||rh||(refs&&ENDREFS.test(tr))||(!refs&&!cur&&tr.length<70&&tr.split(/\s+/).length<=8&&!/[.!?:;,]["'”’)\]]*$/.test(tr))){flush();refs=rh;out.push({s:ls,e:le,head:true,kind:'heading',refhead:rh||undefined});continue;}
    if(refs){if(cur)cur.e=le;else cur={s:ls,e:le,head:true,kind:'refs'};continue;}
    if(/^>/.test(tr)){if(cur&&cur.kind==='quote')cur.e=le;else{flush();cur={s:ls,e:le,head:true,kind:'quote'};}continue;}
    if(cur&&cur.kind==='quote')flush();
    if(cur&&/[.!?]["'”’)\]]*$/.test(raw.slice(cur.s,cur.e)))flush();
    if(cur)cur.e=le;else cur={s:ls,e:le};}
  if(blk)out.push(blk);flush();return out;}
function splitSents(text){const out=[];let start=0;const re=/[.!?]+["'”’)\]]*\s+(?=["'“‘(\[]?(?:[A-Z0-9]|-?@[A-Za-z_]))/g;let m;
  while((m=re.exec(text))){const lastWord=(text.slice(start,m.index).match(/([A-Za-z.]+)$/)||[])[1]||'';
    if(text[m.index]==='.'&&(ABBR.has(lastWord.toLowerCase())||/(?:^|[\s(])(?:[A-Z]\.)*[A-Z]$/.test(text.slice(start,m.index))))continue;
    /* a page, chapter or section reference inside a citation: "p. 4", "pp. 12-15", "ch. 2" */
    if(text[m.index]==='.'&&m[0].charAt(1)!=='.'&&/^(?:p|pp|ch|chs|chap|chaps|sec|secs|vol|vols|para|paras|n|nn)$/i.test(lastWord)&&/^\d/.test(text.slice(m.index+m[0].length)))continue;
    out.push({s:start,e:m.index+m[0].replace(/\s+$/,'').length});start=m.index+m[0].length;}
  const rest=text.slice(start);if(rest.trim())out.push({s:start+rest.search(/\S/),e:start+rest.replace(/\s+$/,'').length});return out;}

function parse(text){
  const T=tokenize(text),N=T.length,st={T,N,text,marks:{}};
  const words=[],wpos=new Array(N).fill(-1),pre=new Array(N).fill(0);
  T.forEach((t,i)=>{if(t.w){wpos[i]=words.length;words.push(i);}pre[i]=words.length;});
  st.words=words;st.nW=words.length;st.wpos=wpos;st.pre=pre;
  const lw=i=>(i>=0&&i<N&&T[i].w)?T[i].l:'';
  const kindOf=l=>{const f=FORMS.get(l);if(f)return f;if(l.length>4&&/[^e]ed$/.test(l)&&!NOT_ED.has(l))return{b:l,k:'past',guess:true};if(l.length>6&&/(izes|ises|ifies)$/.test(l))return{b:l,k:'s'};return null;};
  const inAux=i=>{for(let j=i-1,c=0;j>=0&&c<4;j--,c++){const l=lw(j);if(!l)return false;if(BE.has(l)||HAVE.has(l)||MODAL.has(l)||DO.has(l))return true;if(!isAdv(l))return false;}return false;};
  const isPl=w=>!!w&&(PLUR.has(w)||(w.length>3&&/[^sui]s$/.test(w)&&!isFunc(w)));
  /* is the noun group before token i hung on a plural head by one or more prepositional phrases? */
  function ppPlural(i){let j=i-1;if(j<0||!T[j].w||isFunc(T[j].l))return false;
    for(let q=i-1;q>=0;q--){const t=T[q];if(!t.w){if(/^[,;:]$/.test(t.t))break;continue;}if(REL.has(t.l)||SUB.has(t.l)||CONJ.has(t.l))break;if(VK[q]||t.l==='to'||(kindOf(t.l)||{}).k==='ing')return false;}
    for(let hop=0;hop<3;hop++){while(j>=0&&T[j].w&&!PREP.has(T[j].l)&&(!isFunc(T[j].l)||isDet(T[j].l)))j--;
      if(j<1||!T[j].w||!PREP.has(T[j].l)||T[j].l==='to')return false;const h=j-1;if(!T[h].w||isFunc(T[h].l))return false;if(isPl(T[h].l))return true;j=h;}
    return false;}
  function vk(i){const tk=T[i];if(!tk.w)return null;const l=tk.l,pl=lw(i-1),nl=lw(i+1);
    if(BEF.has(l)||HAVE.has(l)||DO.has(l)||MODAL.has(l)){
      for(let j=i-1,c=0;j>=0&&c<3;j--,c++){const x=lw(j);if(!x)break;if(MODAL.has(x)||DO.has(x)||x==='to'||(HAVE.has(x)&&HAVE.has(l)))return null;if(!isAdv(x))break;}
      return{k:'aux',weak:false};}
    const f=kindOf(l);if(!f)return null;const k=f.k;
    if(k==='ing'||k==='pp')return null;
    if(inAux(i))return null;
    if(PDET.has(pl)||QDET.has(pl)||PREP.has(pl)||/^\d/.test(pl))return null;
    const amb=AMBIG.has(f.b),nAux=BEF.has(nl)||HAVE.has(nl)||MODAL.has(nl);
    if(k==='pastx')return{k:'fin',weak:false};
    if(k==='past'){
      if((DEMO.has(pl)||adjLike(pl))&&nl&&!isFunc(nl))return null;
      if(i>0&&VK[i-1]&&VK[i-1].k==='fin'&&/^(?:base|s)$/.test((kindOf(pl)||{}).k||'')&&nl&&!isFunc(nl))return null;
      if(!pl)return{k:'fin',weak:true};
      return{k:'fin',weak:!PRON.has(pl)&&!DEMO.has(pl)&&!REL.has(pl)&&(PREP.has(nl)||nl==='using'||nAux||POSTP.has(nl))};}
    if(k==='s'){
      if(!amb)return{k:'fin',weak:false};
      /* "rates", "scores", "surveys": far more often a plural noun, so a verb only on strong evidence */
      if(NOUNY.has(f.b)&&!(PRON.has(pl)||REL.has(pl)||DEMO.has(pl)||isDet(nl)||PRON.has(nl)||nl==='that'||nl==='how'||nl==='whether'))return null;
      if(!pl||nAux||nl==='of'||CONJ.has(pl)||adjLike(pl))return null;
      if(DEMO.has(pl))return(isDet(nl)||nl==='that'||nl==='in'||nl==='to'||nl==='from'||nl==='with')?{k:'fin',weak:true}:null;
      if(isFunc(pl)&&!PRON.has(pl)&&!REL.has(pl))return null;
      return{k:'fin',weak:true};}
    /* "making the atoms stay", "help people think": a bare infinitive after a verb of causing or perceiving is not the finite verb */
    for(let q=i-1,c=0;q>=0&&c<6;q--,c++){if(!T[q].w||VK[q])break;if(CAUS.has(T[q].l))return null;}
    const sp=isAdv(pl)&&lw(i-2)?lw(i-2):pl;
    if(sp==='we'||sp==='they'||sp==='i'||sp==='you'||sp==='who')return{k:'fin',weak:false};
    const plural=PLUR.has(sp)||sp==='these'||sp==='those'||sp==='which'||sp==='that'||(sp.length>3&&/[^sui]s$/.test(sp)&&!isFunc(sp));
    const far=!plural&&ppPlural(i);
    if((!plural&&!far)||nAux||(amb&&nl==='of'))return null;
    if(far&&pl&&adjLike(pl))return null;
    /* "test measures trust in": after a word that may itself be the verb, a preposition is weak evidence unless this verb governs it ("focus on") */
    if(amb&&PREP.has(nl)&&AMBIG.has((kindOf(pl)||{}).b)&&(kindOf(pl)||{}).k==='s'&&!(VPREP[f.b]&&VPREP[f.b].test(nl)))return null;
    /* "report mixed outcomes", "support higher trust": an adjective or a participle, then a noun */
    if(lw(i+2)&&!isFunc(lw(i+2))&&(adjLike(nl)||/(er|est)$/.test(nl)&&ADJ.has(nl.replace(/(er|est)$/,''))||(kindOf(nl)||{}).k==='past'))return{k:'fin',weak:true};
    if(isDet(nl)||nl==='that'||nl==='how'||nl==='whether'||nl==='not'||PREP.has(nl)||isAdv(nl)||PRON.has(nl)||/^\d/.test(nl))return{k:'fin',weak:true};
    return null;}
  const VK=[];for(let i=0;i<N;i++)VK.push(vk(i));st.VK=VK;
  const prevConj=i=>CONJ.has(lw(i-1))||(isAdv(lw(i-1))&&CONJ.has(lw(i-2)));
  function later(i,lim,sure){let pend=0,dp=0;
    for(let j=i+1;j<lim;j++){const tk=T[j];
      if(tk.t==='('||tk.t==='['){dp++;continue;}if(tk.t===')'||tk.t===']'){dp=Math.max(0,dp-1);continue;}if(dp)continue;
      if(!tk.w){if(tk.t===';'||tk.t===':')return false;continue;}
      if(CONJ.has(tk.l)&&T[j-1].t===','&&(isDet(lw(j+1))||PRON.has(lw(j+1))))return false;
      if(REL.has(tk.l)||SUB.has(tk.l)||WHC.has(tk.l)){pend++;continue;}
      if(!VK[j])continue;if(pend>0){pend--;continue;}
      if(sure&&VK[j].weak&&j!==i+1)continue;
      return!prevConj(j);}
    return false;}
  function findMain(from,lim){let pend=0,sub=false,dp=0,firstWeak=-1;
    for(let i=from;i<lim;i++){const tk=T[i];
      if(tk.t==='('||tk.t==='['){dp++;continue;}if(tk.t===')'||tk.t===']'){dp=Math.max(0,dp-1);continue;}if(dp)continue;
      if(!tk.w){if(tk.t===',')sub=false;if(tk.t===';'){pend=0;sub=false;}continue;}
      if(REL.has(tk.l)||SUB.has(tk.l)){pend++;continue;}
      const v=VK[i];if(!v)continue;
      if(pend>0){pend--;sub=true;continue;}
      if(sub&&prevConj(i))continue;
      if(v.weak){if(firstWeak<0)firstWeak=i;if(later(i,lim))continue;}
      return i;}
    return firstWeak;}
  function mainStart(from,depth){let w0=from;while(w0<N&&!T[w0].w)w0++;if(w0>=N||depth>3)return Math.min(w0,N-1);
    const l=T[w0].l,nx=T[w0+1];
    if(CONJ.has(l)&&nx)return mainStart(w0+1,depth+1);
    if(INTRO.has(l)||isAdv(l)){if(nx&&nx.t===',')return mainStart(w0+2,depth+1);if(INTRO.has(l)&&nx&&nx.w&&!VK[w0+1])return mainStart(w0+1,depth+1);}
    const introish=SUB.has(l)||PREP.has(l)||l==='given'||l==='based'||l==='compared'||l==='taken'||(/ing$/.test(l)&&l.length>4);
    if(!introish)return w0;
    let dp=0;const commas=[];
    for(let i=w0+1;i<N;i++){const t=T[i].t;if(t==='('||t==='[')dp++;else if(t===')'||t===']')dp=Math.max(0,dp-1);else if(t===','&&!dp)commas.push(i);}
    for(let c=0;c<commas.length&&c<4;c++){const i=commas[c],nl=lw(i+1);if(!nl||CONJ.has(nl)||(REL.has(nl)&&nl!=='that'))continue;
      if(SUB.has(l)){let hv=false;for(let j=w0;j<i;j++)if(VK[j])hv=true;if(!hv&&c<commas.length-1)continue;}
      else if(findMain(w0+1,i)>=0&&!DUAL.has(l))break;
      else if(c<commas.length-1){/* a list inside the opener: "with tenants, landlords and officials, the council …" */
        const j=commas[c+1];let cj=false;for(let q=i+1;q<j;q++)if(T[q].w&&(T[q].l==='and'||T[q].l==='or')){cj=true;break;}
        if(cj&&findMain(i+1,j)<0&&lw(j+1)&&!VK[j+1]&&!REL.has(lw(j+1))&&!CONJ.has(lw(j+1))&&!isAdv(lw(j+1))){const mv=findMain(j+1,N);let ok=mv>j+1;for(let q=j+1;ok&&q<mv;q++)if(!T[q].w)ok=false;if(ok)continue;}}
      let hv=false;for(let j=i+1;j<N;j++)if(VK[j])hv=true;if(!hv)break;
      return mainStart(i+1,depth+1);}
    for(let i=w0+1;i<N&&!VK[i];i++)if(SUBJP0.has(T[i].l)&&VK[i+1])return i;
    return w0;}
  function subjHead(m){
    if(SUBJP.has(T[m].l)&&m+1<N&&(VK[m+1]||(isAdv(lw(m+1))&&VK[m+2])))return m;
    let head=-1;
    for(let i=m;i<N;i++){const tk=T[i];
      if(!tk.w){if(/^[,(;:\[—–]$/.test(tk.t))break;continue;}
      if(i>m&&isAdv(tk.l))continue;
      if(i>m){if(PREP.has(tk.l)||REL.has(tk.l)||SUB.has(tk.l)||VK[i])break;
        if(/ing$/.test(tk.l)&&tk.l.length>5&&head>=0&&T[i-1].w&&!isFunc(T[i-1].l)&&!adjLike(T[i-1].l)&&(isDet(lw(i+1))||PREP.has(lw(i+1))))break;}
      head=i;}
    return head;}
  function groupEnd(v){if(VK[v].k!=='aux')return v;let e=v;
    for(let i=v+1;i<N&&T[i].w;i++){const l=T[i].l;
      if(BE.has(l)||HAVE.has(l)||MODAL.has(l)||DO.has(l)){e=i;continue;}
      if(isAdv(l))continue;
      const f=kindOf(l);if(f&&(f.k==='past'||f.k==='pp'||f.k==='ing'||(f.k==='base'&&(MODAL.has(lw(i-1))||DO.has(lw(i-1))||isAdv(lw(i-1))))))e=i;
      break;}
    return e;}
  /* a word that can be a noun or a verb ("results", "support") is a noun when a real verb follows it in the same clause */
  const opensClause=i=>{for(let j=i-1;j>=0;j--){const tk=T[j];if(!tk.w){if(/^[,;:]$/.test(tk.t))return false;continue;}if(VK[j])return false;if(REL.has(tk.l)||SUB.has(tk.l)||WHC.has(tk.l))return true;}return false;};
  const sureBefore=i=>{for(let j=i-1;j>=0;j--){const tk=T[j];if(!tk.w){if(/^[,;:(\[—–]$/.test(tk.t))return false;continue;}if(CONJ.has(tk.l)||REL.has(tk.l)||SUB.has(tk.l)||WHC.has(tk.l))return false;if(VK[j]&&VK[j].k==='fin'&&!VK[j].weak)return true;}return false;};
  for(let i=0;i<N;i++){const q=VK[i];if(!q||!q.weak||q.k!=='fin')continue;const f=kindOf(T[i].l);if(f&&(f.k==='s'||f.k==='base')&&AMBIG.has(f.b)&&!opensClause(i)&&(later(i,N,true)||sureBefore(i)))VK[i]=null;}
  let m=N?mainStart(0,0):-1,head=-1,v=-1,ve=-1,gap=0;
  if(m>=0&&m<N&&T[m].w){head=subjHead(m);if(head>=0)v=findMain(head+1,N);}
  /* no finite verb found: look for a base form that agrees with a plural subject, on looser evidence, and try again */
  if(v<0&&m>=0&&m<N&&T[m].w){let relPl=false;const cand=[];
    for(let i=m+1;i<N;i++){const tk=T[i];if(!tk.w){if(tk.t===';'||tk.t===':')break;continue;}
      if(REL.has(tk.l)){relPl=isPl(lw(i-1));continue;}
      if(VK[i])continue;const f=kindOf(tk.l);if(!f||f.k!=='base'||inAux(i))continue;
      const pl=lw(i-1),nl=lw(i+1),amb=AMBIG.has(f.b);if(!pl||PDET.has(pl)||QDET.has(pl)||DEMO.has(pl)||PREP.has(pl)||pl==='to'||CONJ.has(pl))continue;
      if(BEF.has(nl)||HAVE.has(nl)||MODAL.has(nl))continue;if(amb&&(!nl||nl==='of'||adjLike(pl)))continue;
      if(!(isPl(pl)||REL.has(pl)||ppPlural(i)||relPl))continue;
      cand.push(i);}
    cand.forEach(i=>{VK[i]={k:'fin',weak:true,rescued:true};});
    if(cand.length){head=subjHead(m);if(head>=0)v=findMain(head+1,N);}}
  if(v>0&&m>=0&&!/\?\s*$/.test(text)){const p1=lw(v-1),p2=v>=2?T[v-2]:null,simpleNP=(()=>{if(!isDet(T[m].l))return false;for(let q=m+1;q<=v-2;q++){if(!T[q].w||isFunc(T[q].l)||VK[q])return false;}return true;})(),redRel=SUBJP0.has(p1)&&p2&&p2.w&&v-2>m&&simpleNP&&!adjLike(p2.l)&&!isAdv(p2.l)&&!TEMPN.has(p2.l)&&!/^\d/.test(p2.l),whSubj=WHC.has(T[m].l);
    if(redRel||whSubj){const nx=findMain(groupEnd(v)+1,N);let clean=nx>=0&&!prevConj(nx);for(let q=v;clean&&q<nx;q++)if(T[q].t===';'||T[q].t===':'||(T[q].w&&CONJ.has(T[q].l)))clean=false;if(clean)v=nx;}}
  if(v>=0){for(let i=head+1;i<v;i++)if(T[i].t===';'||T[i].t===':'){v=-1;break;}}
  if(v>=0){ve=groupEnd(v);gap=pre[v-1]-pre[head];}
  Object.assign(st,{m,head,v,ve,gap});
  /* passives anywhere */
  st.passives=[];st.states=[];
  for(let i=0;i<N;i++){if(!T[i].w||!BE.has(T[i].l))continue;let j=i+1,c=0,deg=false;while(j<N&&T[j].w&&(isAdv(T[j].l)||DEGREE.has(T[j].l))&&c<2){if(DEGREE.has(T[j].l))deg=true;j++;c++;}
    if(j<N&&T[j].w){const f=kindOf(T[j].l);if(f&&(f.k==='past'||f.k==='pp')&&!BE.has(T[j].l)){
      /* "were interested in", "is very limited", "is related to", "was unaffected": a state, not an action done to the subject */
      {const w=T[j].l,nx=j+1<N&&T[j+1].w?T[j+1].l:'';if(deg||PADJ.has(w)||/^un[a-z]{3,}ed$/.test(w)||(PADJP[w]&&PADJP[w].test(nx))){st.states.push({a:i,b:j});i=j;continue;}}let by=-1;for(let q=j+1;q<Math.min(N,j+6);q++){if(!T[q].w)break;if(T[q].l==='by'&&T[q+1]&&T[q+1].w&&!/ing$/.test(T[q+1].l)){by=q;break;}}
      st.passives.push({a:i,b:j,by});i=j;}}}
  /* topic span */
  const first=words.length?words[0]:-1;
  let tb=head>=0?(v>=0&&gap<=3?v-1:head):(words.length?words[Math.min(words.length-1,4)]:-1);
  while(tb>first&&tb>=0&&!T[tb].w)tb--;
  st.topic=first>=0?[first,Math.max(first,tb)]:null;
  /* stress span */
  st.stress=null;st.cite=false;st.aside=false;
  (function(){let end=N-1;
    while(end>=0){const t=T[end];if(t.w)break;
      if(t.t===')'||t.t===']'){const open=t.t===')'?'(':'[';let o=end-1;while(o>=0&&T[o].t!==open)o--;if(o<0){end--;continue;}
        const inner=text.slice(T[o].e,t.s);
        if((open==='['&&/^[\d,\s–-]+$/.test(inner))||/(19|20)\d\d|et al|(?:^|[\s;\[-])@[\p{L}_]/u.test(inner)||/^\s*(figs?|figure|tables?|eqs?|refs?|see|supplementary|data not shown)\b/i.test(inner)){st.cite=true;end=o-1;continue;}
        if(inner.trim().split(/\s+/).length<=8||/[=<>±%]|\d/.test(inner)){st.aside=true;end=o-1;continue;}
        end--;continue;}
      end--;}
    if(end<0)return;const lastW=end,nW=wpos[lastW]+1;let start=-1,dp=0;
    for(let i=lastW;i>=0;i--){const t=T[i].t;if(t===')'||t===']')dp++;else if(t==='('||t==='[')dp=Math.max(0,dp-1);
      else if(!dp&&/^[,;:—–]$/.test(t)){const tail=pre[lastW]-pre[i];if(tail>=3&&tail<=10){start=i+1;break;}if(tail>10)break;}}
    if(start<0){const k=nW<8?2:Math.max(3,Math.min(8,Math.round(nW*0.25)));start=words[Math.max(0,wpos[lastW]-k+1)];
      for(let c=0;c<2&&start>0&&T[start-1].w&&(isDet(T[start-1].l)||PREP.has(T[start-1].l));c++)start--;}
    while(start<lastW&&!T[start].w)start++;
    st.stress=[start,lastW];
    st.tail=words.slice(Math.max(0,wpos[lastW]-5),wpos[lastW]+1).map(i=>T[i].l).join(' ');
  })();
  return st;
}

const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const clip=(s,n=70)=>s.length>n?s.slice(0,n-1).trimEnd()+'…':s;
/* ---- length and rhythm: fixed bands (Flesch 1948 scale), spread, neighbour contrast (nPVI, Grabe & Low 2002) ---- */
function npvi(a){if(a.length<2)return null;let s=0;for(let i=0;i<a.length-1;i++)s+=Math.abs(a[i]-a[i+1])/((a[i]+a[i+1])/2);return 100*s/(a.length-1);}
function rstat(ls,pv){const n=ls.length,bands=[0,0,0,0];if(!n)return{n:0,mean:0,median:null,min:0,max:0,sd:0,cv:0,npvi:null,bands,pre:null};
  const med=a=>a.length?(a.length%2?a[(a.length-1)/2]:(a[a.length/2-1]+a[a.length/2])/2):null,so=ls.slice().sort((a,b)=>a-b),mean=ls.reduce((a,b)=>a+b,0)/n,sd=n>1?Math.sqrt(ls.reduce((a,b)=>a+(b-mean)**2,0)/(n-1)):0;
  ls.forEach(w=>bands[w<=12?0:w<=22?1:w<=29?2:3]++);
  return{n,mean,median:med(so),min:so[0],max:so[n-1],sd,cv:mean?sd/mean:0,npvi:npvi(ls),bands,pre:med((pv||[]).filter(x=>x!=null).sort((a,b)=>a-b))};}
function analyze(raw,opts){opts=opts||{};let rPair=0,rPairN=0,flatN=0;
  const paras=splitParas(raw),sents=[],findings=[];
  const add=o=>{o.id=findings.length;const z=sents[o.s];o.key=o.lens+'|'+o.title+'|'+(z?z.text.slice(0,240):'')+'|'+(o.a!=null&&z?z.text.slice(o.a,o.b):'');findings.push(o);return o.id;};
  paras.forEach((p,pi)=>{p.sents=[];if(p.head)return;const pt=raw.slice(p.s,p.e);
    splitSents(pt).forEach(r=>{const st=parse(pt.slice(r.s,r.e));st.i=sents.length;st.p=pi;st.s=p.s+r.s;st.e=p.s+r.e;st.pfirst=p.sents.length===0;p.sents.push(st.i);sents.push(st);});});
  const seen=new Set(),hit=new Set();
  const met=k=>{if(seen.has(k)||hit.has(k))return true;for(const s of seen){const n=Math.min(s.length,k.length);if(n<5)continue;let p=0;while(p<n&&s[p]===k[p])p++;if(p>=5&&p>=0.8*n){hit.add(k);return true;}}return false;};
  sents.forEach((st,si)=>{const here=new Set();st.cw=[];st.shell=null;
    st.T.forEach((tk,i)=>{if(!isContent(tk))return;const k=stem(tk.l);st.cw.push({i,k,old:met(k)});here.add(k);});
    /* "this decline", "these findings": the noun is new as a word, but it names what the reader already has */
    if(si>0){const W=[];st.T.forEach((tk,i)=>{if(tk.w&&W.length<5)W.push(i);});let f=0;if(W.length>1&&(INTRO.has(st.T[W[0]].l)||CONJ.has(st.T[W[0]].l)))f=1;
      const d=W[f],n1=W[f+1],n2=W[f+2];
      if(d!=null&&/^(?:this|these|those|such)$/.test(st.T[d].l)){const hit=n1!=null&&SHELLN.has(st.T[n1].l)?n1:n1!=null&&n2!=null&&!isFunc(st.T[n1].l)&&SHELLN.has(st.T[n2].l)?n2:null;
        if(hit!=null){st.shell={d,i:hit};const c=st.cw.find(x=>x.i===hit);if(c){c.wasNew=!c.old;c.old=true;c.shell=true;}}}}
    here.forEach(k=>seen.add(k));});
  const acrCount=new Map(),acrFirst=new Map(),nvals=[],uniq=a=>[...new Set(a)],vc={n:0,l:[0,0,0],off:new Map()};
  {let ord=0;paras.forEach(p=>{if(!p.head&&p.sents.length)p.ord=ord++;});}
  const termMap=new Map(),claimTerms=[],titleTerms=[];
  tokenize(opts.title||'').forEach(tk=>{if(!isContent(tk))return;const k=stem(tk.l);if(!titleTerms.some(t=>t.k===k))titleTerms.push({k,w:tk.l,count:0,first:0,heads:0});});
  tokenize(opts.claim||'').forEach(tk=>{if(!isContent(tk))return;const k=stem(tk.l);if(!claimTerms.some(t=>t.k===k))claimTerms.push({k,w:tk.l,count:0,stress:0,paras:new Set()});});
  const groups=(opts.merges||[]).map(ks=>({ks,occ:[]})),mergeOf=new Map();groups.forEach(g=>g.ks.forEach(k=>mergeOf.set(k,g)));
  sents.forEach(st=>{
    const{T,N,text,words,wpos,pre,VK,head,v,ve,gap,m}=st;
    const L=k=>st.marks[k]||(st.marks[k]=[]);
    const mk=(k,a,b,cls,x)=>{if(a<0||b<a)return;L(k).push(Object.assign({a:T[a].s,b:T[b].e,cls},x||{}));};
    const tx=(a,b)=>text.slice(T[a].s,T[b].e);
    const lw=i=>(i>=0&&i<N&&T[i].w)?T[i].l:'';
    const first=words.length?words[0]:-1;if(first<0)return;
    const olds=st.cw.filter(c=>c.old),news=st.cw.filter(c=>!c.old);
    const uniq=a=>[...new Set(a)];
    const wl=(arr,n=3)=>uniq(arr.map(c=>T[c.i].t)).slice(0,n).map(w=>'“'+w+'”').join(', ');

    /* 1 subject → verb */
    if(head>=0&&v>=0){
      mk('sv',head,head,'ul st hu-amber');mk('sv',v,ve,'ul st hu-amber');
      if(gap>=3){let id=null;
        if(gap>=8){let c1=-1;for(let i=head+1;i<v;i++)if(T[i].t===','){c1=i;break;}
          const closed=T[v-1].t===','&&c1>=0&&c1<v-1,pred=text.slice(T[v].s).trim();let sketch,tip;
          if(closed){const keep=text.slice(T[m].s,T[c1].s).trim(),inter=text.slice(T[c1].e,T[v-1].s).trim();
            sketch=[['Subject and verb together',cap(keep+' '+pred)]];
            const r=inter.match(/^(which|who)\s+(\S+)/i),t2=T.findIndex(t=>t.s>=T[c1].e&&t.w);
            if(r&&(VK[t2+1]||BE.has(lw(t2+1)))){const pl=/[^su]s$/.test(T[head].l)||r[1].toLowerCase()==='who';sketch.push(['The interruption as its own sentence',(pl?'They ':'It ')+inter.replace(/^(which|who)\s+/i,'')+'.']);}
            else sketch.push(['Relocate or cut',inter]);
            tip='Close the gap. Then give the interrupting clause a place of its own: before the subject, after the verb, or in a separate sentence. If it never mattered, cut it.';}
          else{sketch=[['Subject and verb',cap(tx(m,head)+' … '+pred)],['What separates them',text.slice(T[head+1].s,T[v-1].e).trim()]];
            tip='The subject itself is carrying the load. Turn the sentence so a short subject meets its verb early and the detail follows the verb.';}
          id=add({lens:'sv',s:st.i,a:T[head+1].s,b:T[v-1].e,sev:gap>=12?3:2,title:gap>=12?'Subject and verb far apart':'Subject and verb separated',
            detail:gap+' words stand between the subject “'+T[head].t+'” and its verb “'+tx(v,ve)+'”. Readers treat what sits in that gap as an interruption and give it less weight.',tip,sketch});}
        mk('sv',head+1,v-1,(id!=null?'hl':'hl2')+' hb-amber',id!=null?{f:id,badge:gap+' words'}:null);}
    }
    /* 2 topic position */
    const[ta,tb]=st.topic;let tId=null;
    if(st.i>0&&!st.pfirst&&T[first].l!=='there'){
      const inT=olds.some(c=>c.i>=ta&&c.i<=tb);let ptr=false;for(let i=ta;i<=tb;i++)if(T[i].w&&POINT.has(T[i].l))ptr=true;
      const trans=INTRO.has(T[first].l)||TRANS.test(text);
      if(!inT&&!ptr&&!trans){
        if(olds.length){const c=olds[0];tId=add({lens:'topic',s:st.i,a:T[ta].s,b:T[tb].e,sev:2,title:'The backward link arrives late',
          detail:'The opening “'+clip(tx(ta,tb),48)+'” is new to the reader. The first familiar word, “'+T[c.i].t+'”, comes at word '+(wpos[c.i]+1)+' of '+st.nW+'.',
          tip:'Open with “'+T[c.i].t+'”, or with whatever ties this sentence to the one before, and let the new material follow it.',starters:uniq(olds.map(c=>T[c.i].t)).slice(0,4)});}
        else tId=add({lens:'topic',s:st.i,a:T[ta].s,b:T[tb].e,sev:2,title:'No visible link to what came before',
          detail:'Nothing in this sentence repeats or points back to earlier material, so the reader has to supply the connection.',
          tip:'Say how this follows. Start from a term already in play, or write in the step of logic that is missing.',starters:[]});}
    }
    mk('topic',ta,tb,'hl hb-blue',tId!=null?{f:tId}:null);
    olds.forEach(c=>{mk('topic',c.i,c.i,'dot hu-teal');mk('flow',c.i,c.i,'dot hu-teal',c.shell&&c.wasNew?{tip:'A noun that points back. With “'+T[st.shell.d].t.toLowerCase()+'” before it, it names something the reader already has, so it counts as old. The rules do not check that the name fits.'}:undefined);});
    news.forEach(c=>{mk('flow',c.i,c.i,'hl hb-amber');mk('stress',c.i,c.i,'dot hu-amber');});
    /* 3 stress position */
    if(st.stress){const[sa,sb]=st.stress;let sId=null;const why=[];
      const inS=st.cw.filter(c=>c.i>=sa&&c.i<=sb),wk=st.tail.match(WEAK_END);
      if(st.nW>=6){
        if(wk)why.push('It closes on “'+wk[0]+'”, which carries little weight.');
        if(!inS.length&&!/\d/.test(tx(sa,sb)))why.push('The closing words hold no content word.');
        else if(st.i>0&&inS.length&&inS.every(c=>c.old)&&news.filter(c=>c.i<sa).length>=2)why.push('Everything in the closing words is already familiar, while the new terms ('+wl(news.filter(c=>c.i<sa))+') sit earlier in the sentence.');
        if(why.length){if(st.cite)why.push('A citation follows, so readers take the words before it as the close.');else if(st.aside)why.push('A bracketed aside follows, so readers take the words before it as the close.');
          sId=add({lens:'stress',s:st.i,a:T[sa].s,b:T[sb].e,sev:2,title:'The stress position holds little',detail:why.join(' '),
            tip:'Decide what you most want remembered from this sentence and end on it. Trim or move whatever trails after.'});}}
      mk('stress',sa,sb,'hl hb-rose',sId!=null?{f:sId}:null);
      let dp=0;for(let i=0;i<sa;i++){const t=T[i].t;if(t==='(')dp++;else if(t===')')dp=Math.max(0,dp-1);else if(!dp&&(t===';'||t===':')&&pre[i]>=3)mk('stress',words[pre[i]-Math.min(4,pre[i])],i-1,'hl2 hb-rose');}
    }
    /* 4 old → new */
    if(st.i>0&&st.nW>=8&&news.length>=2&&olds.length){
      const mean=a=>a.reduce((x,c)=>x+wpos[c.i],0)/a.length/(st.nW-1),mn=mean(news),mo=mean(olds);
      if(mn+0.12<mo)add({lens:'flow',s:st.i,a:null,sev:2,title:'New before old',
        detail:'New terms ('+wl(news)+') arrive ahead of the familiar ('+wl(olds)+'). The reader gets the news before knowing what it attaches to.',
        tip:'Start from the familiar term and travel toward the new one. Switching between active and passive is a fair way to do it.'});}
    /* 5 action in verbs */
    const weakIdx=[];
    for(let i=0;i<N;i++){if(!T[i].w)continue;const f=FORMS.get(T[i].l);if(!f||!WEAK.has(f.b)||f.k==='ing')continue;
      let aux=false,a=i;for(let j=i-1,c=0;j>=0&&c<4;j--,c++){const l=lw(j);if(!l)break;if(BE.has(l)||HAVE.has(l)||MODAL.has(l)){aux=true;a=j;}else if(!isAdv(l))break;}
      if(VK[i]||aux){weakIdx.push({i,a});mk('action',a,i,'wav hu-ink');}}
    for(let i=0;i<N;i++){if(!T[i].w)continue;const l=T[i].l,zero=ZERO.has(nomBase(l))&&!VK[i],sm=!!SMV[nomBase(l)]&&!VK[i]&&/^(a|an|the)$/.test(lw(i-1));if(!isNom(l)&&!zero&&!sm)continue;
      if(PDET.has(l)||VK[i])continue;
      let w=null;for(const x of weakIdx){if(Math.abs(x.i-i)<=9||(i===head&&x.a>=v&&x.i<=ve)){if(!w||Math.abs(x.i-i)<Math.abs(w.i-i))w=x;}}
      const B=!sm&&i===head&&v>=0&&weakIdx.some(x=>x.a>=v&&x.i<=ve),C=w&&w.i<i&&i-w.i<=4,A=!zero&&!sm&&lw(i+1)==='of'&&w&&Math.abs(w.i-i)<=9;
      if(B)w=weakIdx.find(x=>x.a>=v&&x.i<=ve);
      if(A||B||C){const vb=verbFor(l);let fx=null;
        /* the parts a writer needs to turn the noun back into a verb: who acts is left for the writer */
        const unpackOf=()=>{const wf=FORMS.get(T[w.i].l);if(!wf||!vb)return null;
          let ns=i;const left=[];let det=false;for(let q=i-1,c=0;q>=0&&c<3&&!(w.i<i&&q<=w.i);q--,c++){const x=lw(q);if(!x)break;if(isDet(x)){ns=q;det=true;break;}if(VK[q]||isFunc(x)||(c===0&&x==='out'))break;left.unshift(T[q].t);ns=q;}
          const g=[];for(let q=w.a;q<=w.i;q++)if(T[q].w)g.push(T[q].l);
          const modal=g.find(x=>MODAL.has(x)),have=g.find(x=>HAVE.has(x)),be=g.find(x=>BE.has(x)),neg=g.includes('not')||(det&&lw(ns)==='no'),passive=!!be&&(wf.k==='past'||wf.k==='pp');
          if(!modal&&!have&&(be==='be'||be==='been'))return null;
          const pp=vb?inflect(vb,'pp'):'';let form='';
          if(vb){if(modal)form=(modal==='cannot'?modal:modal+(neg?' not':''))+(have?' have '+pp:' '+vb);
            else if(have)form=have+(neg?' not ':' ')+pp;
            else if(be&&g.includes('being'))form=(g.find(x=>BEF.has(x))||'is')+(neg?' not ':' ')+inflect(vb,'ing');
            else{const pastT=passive?/^(was|were)$/.test(be):/^p/.test(wf.k);form=neg?(pastT?'did not ':'does not ')+vb:pastT?inflect(vb,'past'):wf.k==='base'&&!passive?vb:inflect(vb,'s');}}
          for(let q=w.a;q<w.i;q++){const x=lw(q);if(x&&x!=='not'&&isAdv(x))left.push(T[q].t);}
          const o={nom:T[i].t,base:vb||'',verb:form,obj:'',actor:'',agent:false,own:false,poss:'',left,subj:''};
          if(w.i>i){const pv=lw(ns-1);if(pv&&!(SUB.has(pv)||REL.has(pv)||(CONJ.has(pv)&&!lw(ns-2))))return null;
            {const nx=lw(w.i+1),lt=LIGHT.has(wf.b);if(passive&&nx&&nx!=='out'&&!(PREP.has(nx)&&(nx!=='to'||lt))&&!isAdv(nx)&&!CONJ.has(nx)&&!SUB.has(nx)&&!REL.has(nx))return null;}
            if(det&&UPPOSS[lw(ns)]){o.actor=UPPOSS[lw(ns)];o.poss=T[ns].t;}
            for(let q=i+1;q<w.a;q++){if(VK[q])return null;if(!T[q].w&&T[q].t!==',')return null;}
            if(!(passive||INTRV.has(wf.b)||(wf.b==='take'&&lw(w.i+1)==='place')))return null;
            let e=w.i;if(wf.b==='carry'&&lw(e+1)==='out')e++;if(wf.b==='take'&&lw(e+1)==='place')e++;
            let oa=i+1,ob=w.a-1;while(ob>=oa&&(!T[ob].w||isAdv(lw(ob)))){if(T[ob].w)left.push(T[ob].t);ob--;}while(oa<=ob&&!T[oa].w)oa++;
            if(oa<=ob){if(pre[ob]-pre[oa]>13)return null;const p1=lw(oa),rest=oa+1<=ob?tx(oa+1,ob):'';
              if(p1==='of'||p1==='into'||(p1==='to'&&UPTO.has(nomBase(l))))o.obj=rest;else if(p1==='in'&&UPOWN.has(nomBase(l))&&!o.poss){o.actor=rest;o.own=true;}else if(p1==='in'&&UPIN.has(nomBase(l)))o.obj=rest;else o.obj=tx(oa,ob);}
            if(passive&&!o.own&&!o.poss&&lw(e+1)==='by'&&!/ing$/.test(lw(e+2))){let z=-1;for(let q=e+2;q<N;q++){if(!T[q].w)break;const x=lw(q);if(VK[q]||(q>e+2&&((x!=='of'&&PREP.has(x))||CONJ.has(x)||SUB.has(x)||REL.has(x))))break;z=q;}
              if(z>=e+2&&!(T[z+1]&&T[z+1].t==='.'&&z+1<N-1)){const a=tx(e+2,z);o.actor=UPSUBJ[a.toLowerCase()]||a;o.agent=true;e=z;}}
            o.kind='subj';o.s=st.s+T[ns].s;o.e=st.s+T[e].e;o.cap=ns===first;return o;}
          if(w.i<i&&!fx&&!passive&&LIGHT.has(wf.b)&&(det||!left.length)){for(let q=w.i+1;q<ns;q++)if(lw(q)!=='out')return null;
            let e=i;const p1=lw(i+1);
            if(p1==='of'||p1==='into'||(p1==='in'&&UPIN.has(nomBase(l)))||(p1==='to'&&UPTO.has(nomBase(l)))){let z=-1;for(let q=i+2;q<N;q++){if(!T[q].w)break;const x=lw(q);if(VK[q]||(x!=='of'&&PREP.has(x))||CONJ.has(x)||SUB.has(x)||REL.has(x))break;z=q;}if(z>=i+2){o.obj=tx(i+2,z);e=z;}}
            {const nf=FORMS.get(lw(e+1));if(VK[e+1]||(nf&&nf.k==='base'))return null;}if(head>=0&&w.a>=v&&w.i<=ve)o.subj=tx(st.m,head);
            o.kind='obj';o.s=st.s+T[w.a].s;o.e=st.s+T[e].e;o.cap=false;return o;}
          return null;};{const wk=FORMS.get(T[w.i].l),bt=[];for(let q=w.i+1;q<i;q++)bt.push(lw(q));if(C&&vb&&wk&&bt.every(z=>/^(a|an|the|out)$/.test(z))&&!BE.has(lw(w.i-1))){const iv=inflect(vb,wk.k);let e2=i;if(/^(of|to|in|on|for)$/.test(lw(i+1)))e2=i+1;if(iv)fx={s:st.s+T[w.i].s,e:st.s+T[e2].e,text:iv};}}const id=add({lens:'action',s:st.i,a:T[i].s,b:T[i].e,sev:2,title:'The action is in a noun',
          detail:'“'+T[i].t+'” names what happened, while the verb “'+tx(w.a,w.i)+'” only reports that something did.',
          tip:vb?'Make “'+vb+'” the verb, with whoever or whatever does it as the subject.':'Ask what is happening here and make that the verb.',fix:fx,unpack:unpackOf()});
        mk('action',i,i,'hl hb-violet',{f:id});}
      else if(!zero&&!sm)mk('action',i,i,'dot hu-violet');}
    /* rhythm */
    let rv=v;if(v>=0)for(let j=first;j<v;j++){if(!VK[j]||VK[j].weak)continue;let inSub=false;for(let q=j-1;q>=0;q--){if(!T[q].w){if(/^[,;:]$/.test(T[q].t))break;continue;}if(REL.has(T[q].l)||SUB.has(T[q].l)){inSub=true;break;}}if(!inSub){rv=j;break;}}
    st.preV=rv>=0?wpos[rv]:null;st.vTok=rv;st.joints=[];
    if(st.nW>=23){let dp=0,lastC=-1;
      const hasV=(a,b)=>{for(let j=Math.max(0,a);j<Math.min(N,b);j++)if(VK[j])return true;return false;};
      const J=(i,k,text,capN,label)=>{if(k>=N||pre[i]<5||st.nW-pre[k-1]<5)return;st.joints.push({s:st.s+T[i].s,e:st.s+T[k].s,text,cap:capN,label,w1:pre[i],w2:st.nW-pre[k-1]});
        mk('rhythm',i,k-1,'dot hu-olive',{tip:'A joint. A complete statement ends here, after '+pre[i]+' words, and about '+(st.nW-pre[k-1])+' more follow. The sentence could stop at this point.'});};
      for(let i=1;i<N-1;i++){const t=T[i].t;if(t==='('||t==='[')dp++;else if(t===')'||t===']')dp=Math.max(0,dp-1);if(dp||T[i].w)continue;
        const n1=lw(i+1),mainDone=v>=0&&v<i;
        if(t===';'){if(hasV(i+1,N)&&hasV(0,i))J(i,i+1,'. ',true,'at the semicolon');}
        else if(t===':'){if(hasV(i+1,N)&&mainDone)J(i,i+1,'. ',true,'at the colon');}
        else if(t===','){
          if(mainDone&&i+2<N&&T[i+2].w){
            if(/^(and|but|yet|so)$/.test(n1)){if(!VK[i+2]&&hasV(i+2,i+10)&&hasV(lastC+1,i))J(i,i+2,n1==='and'?'. ':n1==='so'?'. As a result, ':'. However, ',n1==='and','at “, '+n1+'”');}
            else if(n1==='which'){if(VK[i+2]||(isAdv(lw(i+2))&&VK[i+3]))J(i,i+2,'. This ',false,'at “, which”');}
            else if(n1==='whereas'){if(hasV(i+2,N))J(i,i+2,'. In contrast, ',false,'at “, whereas”');}
            else if(n1==='although'||n1==='though'){if(hasV(i+2,N))J(i,i+2,'. However, ',false,'at “, '+n1+'”');}
            else if(n1==='because'){if(hasV(i+2,N))J(i,i+2,'. This is because ',false,'at “, because”');}}
          lastC=i;}}}
    if(st.nW>35){const nj=st.joints.length;add({lens:'rhythm',s:st.i,a:null,sev:st.nW>50?3:2,title:st.nW+' words in one sentence',
      detail:'Research articles average about 25 to 27 words a sentence, and Flesch (1948) rated prose that averages 29 or more as very difficult. At '+st.nW+' words, this sentence offers several candidates for emphasis and only one stress position to put them in.'+(nj?' It has '+nj+(nj===1?' joint':' joints')+', underlined with dots, where a complete statement ends.':''),
      tip:nj?'Split it at a joint, so that each part ends on something worth stressing. A split below gives you a rough draft to repair.':'Find where one idea ends and the next begins, and end the sentence there. A colon or semicolon also gives you a second stress position.',splits:st.joints});}
    if(st.preV!=null&&st.preV>=12){const lastB=words[st.preV-1];
      add({lens:'rhythm',s:st.i,a:null,sev:2,title:st.preV+' words before the main verb',
        detail:'The reader holds '+st.preV+' words in mind before the main verb, “'+T[rv].t+'”, says what they are for. That is a whole short sentence’s worth. Memory-based accounts of reading predict this cost (Gibson 1998), and Coh-Metrix counts the same words as its measure of syntactic load (McNamara et al. 2010). The Subject & verb lens shows which of them separate the subject from its verb.',
        tip:'Move the opening material to after the verb, give it a sentence of its own, or shorten the subject. Experienced writers do front-load on purpose. If you mean to, mark this as checked.'});
      mk('rhythm',first,lastB,'ul hu-ink',{tip:st.preV+' words come before the main verb, “'+T[rv].t+'”. The reader has to hold all of them until it arrives. Twelve or more raises a note.'});}
    /* thread: which side of the main verb each content word sits on, and how the sentence links back (the four levels of SWAN) */
    {const lim=rv>=0?rv:tb+1;st.cw.forEach(c=>{c.side=c.i<lim?'L':'R';});
      const pv=st.i>0?sents[st.i-1]:null,K=st.link={type:pv?'disconnected':'start',via:[]};
      if(pv){const front=[],back=[],at=q=>pv.stress&&q.i>=pv.stress[0]?'close':pv.topic&&q.i<=pv.topic[1]?'opening':'middle';
        st.cw.forEach(c=>{const q=pv.cw.find(x=>near(x.k,c.k));if(q)(c.side==='L'?front:back).push({i:c.i,w:T[c.i].t,from:pv.i,pw:pv.T[q.i].t,at:at(q)});});
        let ptr=false;for(let i=ta;i<=tb;i++)if(T[i].w&&POINT.has(T[i].l))ptr=true;
        const trans=INTRO.has(T[first].l)||TRANS.test(text);
        if(front.length){K.type='fluid';K.via=front;}
        else if(ptr||trans){K.type='fluid';K.weak=st.shell?'named':ptr?'pointer':'transition';K.via=back;}
        else if(back.length){K.type='inverted';K.via=back;}
        else for(let j=st.i-2;j>=Math.max(0,st.i-6)&&K.type==='disconnected';j--){const far=[];st.cw.forEach(c=>{const q=sents[j].cw.find(x=>near(x.k,c.k));if(q)far.push({i:c.i,w:T[c.i].t,from:j,pw:sents[j].T[q.i].t,at:''});});if(far.length){K.type='outofsync';K.via=far;}}
        K.via.forEach(x=>mk('grid',x.i,x.i,'ul hu-teal',{tip:'Links back to “'+x.pw+'” in '+(x.at?'the '+x.at+' of ':'')+'sentence '+(x.from+1)+'.'}));}}
    /* clutter */
    CLUTTER.forEach(c=>{c.re.lastIndex=0;let x;while((x=c.re.exec(text))){const a=x.index,b=a+x[0].length;let fix=null;
      if(c.r!=null){if(c.r===''){let e=b;while(e<text.length&&/\s/.test(text[e]))e++;fix={s:st.s+a,e:st.s+e,text:'',capNext:a===T[first].s};}
        else fix={s:st.s+a,e:st.s+b,text:/^[A-Z]/.test(x[0])?cap(c.r):c.r};}
      const id=add({lens:'clutter',s:st.i,a,b,sev:2,title:'“'+x[0].replace(/\s+/g,' ')+'”',detail:c.n||(c.r===''?'A throat-clearing frame. The sentence starts after it.':'A stock phrase doing the work of a shorter one.'),
        tip:c.r?'Use “'+c.r+'”.':c.r===''?'Delete it and begin with the point.':'',fix});
      L('clutter').push({a,b,cls:'hl hb-olive',f:id});}});
    /* hedging */
    const hs=[];T.forEach((t,i)=>{if(t.w&&HEDGE.has(t.l)){hs.push(i);mk('hedge',i,i,'hl hb-olive');}});
    let hp=0,hx;HEDGEP.lastIndex=0;while((hx=HEDGEP.exec(text))){hp++;L('hedge').push({a:hx.index,b:hx.index+hx[0].length,cls:'hl hb-olive'});}
    const adj=hs.some((h,q)=>q>0&&h-hs[q-1]<=2);
    if(hs.length+hp>=3||adj)add({lens:'hedge',s:st.i,a:null,sev:2,title:hs.length+hp>=3?'Stacked hedges':'Double hedge',
      detail:(hs.length+hp)+' hedges in this sentence: '+uniq(hs.map(i=>T[i].t.toLowerCase())).join(', ')+(hp?', and a hedging phrase':'')+'.',
      tip:'Keep the one hedge that states your real confidence. Say what the evidence supports, then stop.'});
    /* dense phrases */
    const nounLike=i=>{const tk=T[i];if(!tk.w||!/\p{L}/u.test(tk.t))return false;const l=tk.l;
      if(isFunc(l)||(l.length<3&&!/^[A-Z]{2,}$/.test(tk.t))||isAdv(l)||adjLike(l)||VK[i]||/[^e]ed$/.test(l))return false;const f=FORMS.get(l);return!(f&&(f.k==='pp'||f.k==='pastx'));};
    for(let i=0;i<N;){if(!nounLike(i)){i++;continue;}let j=i;while(j+1<N&&nounLike(j+1))j++;
      if(j-i+1>=4){const id=add({lens:'dense',s:st.i,a:T[i].s,b:T[j].e,sev:2,title:'Noun stack',
          detail:(j-i+1)+' nouns in a row: “'+tx(i,j)+'”. The reader has to work out how each one relates to the next.',tip:'Unpack it with a preposition or a verb, so the phrase says what acts on what.'});
        mk('dense',i,j,'hl hb-olive',{f:id});}
      i=j+1;}
    {let chain=[];const flush=()=>{if(chain.length>=4){const a=chain[0];let b=chain[chain.length-1],c=0;while(b+1<N&&T[b+1].w&&c<3&&!VK[b+1]){b++;c++;}
          const id=add({lens:'dense',s:st.i,a:T[a].s,b:T[b].e,sev:2,title:'Chain of prepositions',detail:chain.length+' prepositional phrases in a row: '+chain.map(i=>T[i].l).join(' … ')+'.',
            tip:'Look for the action hiding in the chain and make it a verb. Most of the prepositions will go with it.'});mk('dense',a,b,'ul hu-olive',{f:id});}chain=[];};
      for(let i=0;i<N;i++){const tk=T[i];
        if(!tk.w){if(/^[;:()\[\]]$/.test(tk.t))flush();continue;}
        if(VK[i]||BE.has(tk.l)){flush();continue;}
        if(CHAINP.has(tk.l)&&!(tk.l==='to'&&FORMS.get(lw(i+1))&&FORMS.get(lw(i+1)).k==='base')){if(chain.length&&pre[i]-pre[chain[chain.length-1]]-1>4)flush();chain.push(i);}
        else if(chain.length&&pre[i]-pre[chain[chain.length-1]]>4)flush();}
      flush();}
    /* empty openers */
    {const lead=text.slice(T[first].s);let x;const off=T[first].s;
      if((x=lead.match(/^There\s+(is|are|was|were|has been|have been|exists?|remains?)\b/i))){const id=add({lens:'openers',s:st.i,a:off,b:off+x[0].length,sev:2,title:'Empty opener',
          detail:'“'+x[0]+'” fills the topic position without naming a topic.',tip:'Start with the real subject and give it a verb that does something.'});L('openers').push({a:off,b:off+x[0].length,cls:'hl hb-olive',f:id});}
      else if((x=lead.match(/^It\s+(?:is|was|has been|had been|should be|must be|can be|may be|might be|could be|seems|appears)\s+(?:[\w-]+\s+){0,3}?that\b/i))||(x=lead.match(/^It\s+(?:is|was|may be|might be|would be|will be)\s+(?:[\w-]+\s+)?(?:important|necessary|possible|difficult|easy|hard|essential|useful|interesting|reasonable|common|tempting|instructive|convenient|desirable|sufficient|impossible|helpful|crucial|critical)\s+to\b/i))){
        const id=add({lens:'openers',s:st.i,a:off,b:off+x[0].length,sev:2,title:'Empty opener',detail:'“'+x[0]+'” delays the real subject and puts nothing in the topic position.',
          tip:'State the claim directly. If the framing matters, name who knows it or found it.'});L('openers').push({a:off,b:off+x[0].length,cls:'hl hb-olive',f:id});}
      for(const q of uniq([first,m])){if(q<0||q>=N||!T[q].w||!DEMO.has(T[q].l))continue;const n1=q+1,ok=VK[n1]||(isAdv(lw(n1))&&VK[n1+1]);
        if(ok){const id=add({lens:'openers',s:st.i,a:T[q].s,b:T[q].e,sev:2,title:T[q].t+' what?',detail:'“'+T[q].t+'” stands alone, so the reader must guess which part of the previous sentence it points to.',
            tip:'Add the noun it stands for: “'+cap(T[q].l)+' increase…”, “'+cap(T[q].l)+' result…”.'});mk('openers',q,q,'hl hb-olive',{f:id});}}
    }
    /* voice */
    st.passives.forEach(p=>{if(p.by>=0){let e=p.by+1;if(T[e+1]&&T[e+1].w&&(isDet(T[e].l)||adjLike(T[e].l)))e++;
        const id=add({lens:'voice',s:st.i,a:T[p.a].s,b:T[e].e,sev:2,title:'Passive with its agent attached',detail:'The doer or means (“'+tx(p.by,e)+'”) is named, but it trails the verb.',
          tip:'If this sentence is that agent’s story, make the agent the subject. If the passive keeps a familiar topic up front, leave it alone. That is what the passive is for.'});
        mk('voice',p.a,e,'hl hb-olive',{f:id});}
      else mk('voice',p.a,p.b,'dot hu-olive');});
    /* acronyms */
    const here=new Set();
    T.forEach((t,i)=>{if(!/^[A-Z][A-Z0-9]{1,5}s?$/.test(t.t)||!/[A-Z].*[A-Z]/.test(t.t)||/^[IVXLC]+$/.test(t.t))return;const a=t.t.replace(/s$/,'');if(ACR_OK.has(a))return;
      here.add(a);acrCount.set(a,(acrCount.get(a)||0)+1);if(!acrFirst.has(a))acrFirst.set(a,{st,i});mk('acr',i,i,'dot hu-olive');});
    if(here.size>=4)add({lens:'acr',s:st.i,a:null,sev:2,title:'Acronym-heavy sentence',detail:here.size+' different abbreviations in one sentence: '+[...here].join(', ')+'.',tip:'Spell out the ones your reader meets least often.'});
    /* claim strength */
    CLAIMS.forEach(c=>{c.re.lastIndex=0;let x;while((x=c.re.exec(text))){const a=x.index,b=a+x[0].length,w=x[0].replace(/\s+/g,' ');
      const key='claims|'+c.cat+'|'+text.slice(0,240)+'|'+w+'|'+a,val=(opts.tags||{})[key],row=EVID[c.cat].find(r=>r[0]===val);let ok=null,why='';
      if(row){ok=row[2];why=row[3];if(ok===null){ok=CITE.test(text);why=ok?'The earlier work is cited in this sentence.':'You rely on earlier work, but this sentence cites none.';}}
      const o={lens:'claims',s:st.i,a,b,sev:2,ok:!!(row&&ok),claim:{key,cat:c.cat,val:val||''},q:CATQ[c.cat],
        title:!row?'“'+w+'”: what is the evidence?':ok?'“'+w+'” fits your evidence':'“'+w+'” is stronger than your evidence',
        detail:!row?CATWHY[c.cat]+' Choose the evidence that stands behind it.':why.replace('{w}',w),tip:(!row||ok)?'':'Step down to the wording your evidence earns, or add the evidence that would earn this one.'};
      if(row&&!ok)o.ladder=ladder(c.cat,val,w);const id=add(o);o.key=key;L('claims').push({a,b,cls:o.ok?'dot hu-rose':'hl hb-rose',f:id});}});
    /* mechanical checks, sentence level */
    {VAGUEATT.lastIndex=0;const x=VAGUEATT.exec(text);
      const u=text.match(UNCITED);st.vagueAtt=false;
      if(x&&!CITE.test(text)&&(!u||x.index<=u.index)){st.vagueAtt=true;const a=x.index,b=a+x[0].length,id=add({lens:'checks',s:st.i,a,b,sev:2,title:'A view with no one named: “'+x[0]+'”',q:'Who says so? Can you name them, or cite them?',detail:'The sentence gives a view to nobody in particular and cites no source, so the reader cannot check it or weigh it. Guides to writing call this a weasel phrase.',tip:'Name who holds the view and cite them. If the view is yours, state it as your own claim and support it.'});L('checks').push({a,b,cls:'hl hb-olive',f:id});}}
    {const x=text.match(UNCITED);
      if(x&&!CITE.test(text)&&!st.vagueAtt){const a=x.index,b=a+x[0].length,id=add({lens:'checks',s:st.i,a,b,sev:2,title:'Earlier work with no citation',q:'Which work do you mean, and can the reader find it?',detail:'“'+x[0]+'” points to earlier work, but the sentence cites none.',tip:'Cite the work here, or state the point as your own claim and support it.'});L('checks').push({a,b,cls:'hl hb-olive',f:id});}
      const sg=text.match(/\bsignifican(?:t|tly|ce)\b/i);
      if(sg&&!STAT.test(text)){const a=sg.index,b=a+sg[0].length,id=add({lens:'checks',s:st.i,a,b,sev:2,title:'“'+sg[0]+'” with no statistic',q:'Do you mean a test was passed, or that the effect is large?',detail:'Readers of science take this word to mean a statistical test was passed, and none is reported in this sentence.',tip:'Give the test and its value here, or point to where they are. If you mean large or important, say that instead.'});L('checks').push({a,b,cls:'hl hb-olive',f:id});}
      if(v>=0){const l=T[v].l,f=FORMS.get(l);
        st.tense=/^(was|were|had|did)$/.test(l)||(f&&(f.k==='past'||f.k==='pastx'))||(!f&&/ed$/.test(l))?'past':(/^(is|are|am|has|have|do|does)$/.test(l)||(f&&(f.k==='s'||f.k==='base'))||/(izes|ises|ifies)$/.test(l))?'present':null;
        if(st.tense)mk('checks',v,ve,'dot hu-olive');}}
    /* statistics reporting */
    {const LS=L('stats'),ps=[],pre2=/\bp\s*([<>=])\s*(0?\.\d+)/gi;let x,first=null;while((x=pre2.exec(text)))ps.push({c:x[1],v:+x[2],s:x[0]});
      STESTS.forEach(tt=>{tt.re.lastIndex=0;while((x=tt.re.exec(text))){const g=tt.g(x),a=x.index,b=a+x[0].length,r=statCheck(tt.k,g),shown=x[0].replace(/\s+/g,' ');if(!first&&tt.k!=='r')first={a,b,shown};
          if(r.ok){LS.push({a,b,cls:'dot hu-violet'});continue;}
          const id=add({lens:'stats',s:st.i,a,b,sev:r.decision&&!r.one?3:2,title:'“'+shown+'”: '+(r.one?'the p value fits only a one-tailed test':'the p value does not match'),q:r.one?'Was this test one-tailed?':'Which number is wrong: the statistic, the degrees of freedom, or p?',
            detail:'Recomputed from the statistic'+(tt.k==='z'?'':' and degrees of freedom')+', p '+fmtP(r.p)+' (two-tailed).'+(r.decision&&!r.one?' That falls on the other side of .05 from the value reported.':''),
            tip:r.one?'If the test was one-tailed, say so in the sentence, and say why.':'Check all three numbers against your output. One was probably mistyped or rounded the wrong way.'});LS.push({a,b,cls:'hl hb-violet',f:id});}});
      if(first&&!EFF.test(text)){const id=add({lens:'stats',s:st.i,a:first.a,b:first.b,sev:2,title:'A test result with no effect size',q:'How large is the effect?',detail:'The sentence gives a test statistic and a p value, but no effect size or confidence interval.',tip:'Add a standardized effect size (d, η², an odds ratio) and, where you can, a confidence interval. A p value says whether, not how much.'});LS.push({a:first.a,b:first.b,cls:'hl hb-violet',f:id});}
      if((x=text.match(/\bp\s*[=<]\s*0?\.000\b/i))){const id=add({lens:'stats',s:st.i,a:x.index,b:x.index+x[0].length,sev:2,title:'“'+x[0]+'”',q:'What did your output round to zero?',detail:'A p value is never exactly zero. Statistical software prints .000 when p is smaller than .0005.',tip:'Write p < .001.',fix:{s:st.s+x.index,e:st.s+x.index+x[0].length,text:'p < .001'}});LS.push({a:x.index,b:x.index+x[0].length,cls:'hl hb-violet',f:id});}
      else if((x=text.match(/\b[pr]\s*[<>=]\s*-?0\.\d+/))){const id=add({lens:'stats',s:st.i,a:x.index,b:x.index+x[0].length,sev:2,title:'A leading zero on a value that cannot exceed 1',q:'Does your style guide want the zero?',detail:'APA style writes p = .03 and r = .45, with no zero before the point, because these values cannot exceed 1.',tip:'Drop the zero if you follow APA style. Whichever you choose, do the same everywhere.'});LS.push({a:x.index,b:x.index+x[0].length,cls:'hl hb-violet',f:id});}
      if((x=text.match(MARGINAL))){const id=add({lens:'stats',s:st.i,a:x.index,b:x.index+x[0].length,sev:2,title:'“'+x[0]+'”',q:'Did the result pass your threshold, or not?',detail:'This wording describes a result that missed the threshold as if it nearly counted.',tip:'Report the exact p, the effect size and its confidence interval, and let the reader judge the evidence.'});LS.push({a:x.index,b:x.index+x[0].length,cls:'hl hb-violet',f:id});}
      else if(ps.length&&(x=text.match(/\bsignifican(?:t|tly|ce)\b/i))){const neg=NEGSIG.test(text),allNon=ps.every(p=>p.c==='>'||(p.c==='='&&p.v>=0.05)),allSig=ps.every(p=>p.c!=='>'&&(p.c==='<'?p.v<=0.05:p.v<0.05));
        if((!neg&&allNon)||(neg&&allSig&&!/\b(?:but|whereas|while|although)\b/i.test(text))){const id=add({lens:'stats',s:st.i,a:x.index,b:x.index+x[0].length,sev:3,title:(neg?'Called not significant':'Called significant')+' with '+ps[0].s.replace(/\s+/g,' '),q:'Do the words and the number agree?',detail:'The sentence describes the result as '+(neg?'not ':'')+'significant, but the p value it reports is '+(neg?'below':'at or above')+' .05.',tip:'Correct whichever is wrong, or state the threshold you used if it is not .05.'});LS.push({a:x.index,b:x.index+x[0].length,cls:'hl hb-violet',f:id});}}
      PCT.forEach(([re,ia,ib,ic])=>{re.lastIndex=0;while((x=re.exec(text))){const n=+x[ia].replace(/,/g,''),d=+x[ib].replace(/,/g,''),z=+x[ic],dc=(x[ic].split('.')[1]||'').length;if(!d||n>d)continue;const real=100*n/d,a=x.index,b=a+x[0].length;
          if(Math.abs(real-z)<=0.5*Math.pow(10,-dc)+1e-9){LS.push({a,b,cls:'dot hu-violet'});continue;}
          const id=add({lens:'stats',s:st.i,a,b,sev:2,title:n+' of '+d+' is '+real.toFixed(dc)+'%, not '+x[ic]+'%',q:'Which is right: the count or the percentage?',detail:'The count and the percentage in this sentence do not agree.',tip:'Check both against your data. If the percentage uses a different denominator, say which.'});LS.push({a,b,cls:'hl hb-violet',f:id});}});
      const nre=/\bN\s*=\s*(\d[\d,]*)/g;while((x=nre.exec(text)))nvals.push({v:+x[1].replace(/,/g,''),st,a:x.index,b:x.index+x[0].length});
      if(/^\d/.test(text)&&st.nW>3){const mm=text.match(/^\S+/),id=add({lens:'checks',s:st.i,a:0,b:mm[0].length,sev:2,title:'The sentence opens with a numeral',q:'Can the sentence start with a word?',detail:'APA style, like most others, does not begin a sentence with a numeral.',tip:'Reword so the number comes later, or spell it out.'});L('checks').push({a:0,b:mm[0].length,cls:'hl hb-olive',f:id});}}
    /* vague and worn words */
    {const LW=L('worn');let x;const ins=[];INTENS.lastIndex=0;while((x=INTENS.exec(text)))ins.push({a:x.index,b:x.index+x[0].length,w:x[0].toLowerCase()});
      if(ins.length){const id=add({lens:'worn',s:st.i,a:ins[0].a,b:ins[0].b,sev:2,title:(ins.length>1?'Intensifiers: ':'Intensifier: ')+uniq(ins.map(q=>q.w)).join(', '),q:'Does the sentence say less without '+(ins.length>1?'them':'it')+'?',detail:'An intensifier asks the reader to feel more than the facts have shown.',tip:'Cut the word, or replace it with the measurement that justifies it.'});ins.forEach(q=>LW.push({a:q.a,b:q.b,cls:'hl hb-olive',f:id}));}
      {const stat=/\bp\s*[<=>]|\bstatistically\b/i.test(text),grp=(re,skip)=>{const o=[];re.lastIndex=0;while((x=re.exec(text))){const w=x[0].toLowerCase();if(skip&&skip(w))continue;if(LW.some(m=>m.a<x.index+x[0].length&&x.index<m.b))continue;o.push({a:x.index,b:x.index+x[0].length,w});}return o;};
        const dg=grp(VAGUEDEG,w=>w==='significantly'&&stat),cm=grp(COMMENTW);
        if(dg.length){const id=add({lens:'worn',s:st.i,a:dg[0].a,b:dg[0].b,sev:2,title:'Vague degree: '+uniq(dg.map(q=>q.w)).join(', '),q:'How much? Can you give the size, the share or the exceptions?',detail:'The word points at an amount or an exception without giving it. Guides to writing call this a weasel word.',tip:'Give the number or the range, or say what the exceptions are. If the amount does not matter, cut the word.'});dg.forEach(q=>LW.push({a:q.a,b:q.b,cls:'hl hb-olive',f:id}));}
        if(cm.length){const id=add({lens:'worn',s:st.i,a:cm[0].a,b:cm[0].b,sev:2,title:'Comment word: '+uniq(cm.map(q=>q.w)).join(', '),q:'Why? Can the sentence show the reason instead of naming the reaction?',detail:'The word tells the reader how to react and leaves out what makes the point interesting, surprising or important.',tip:'Say what makes it so, such as what was expected or what depends on it. Or cut the word and let the finding speak.'});cm.forEach(q=>LW.push({a:q.a,b:q.b,cls:'hl hb-olive',f:id}));}}
      VAGUEQ.lastIndex=0;while((x=VAGUEQ.exec(text))){const a=x.index,b=a+x[0].length,id=add({lens:'worn',s:st.i,a,b,sev:2,title:'Vague quantity: “'+x[0]+'”',q:'How many? Can you give the number, or name them?',detail:'The reader cannot tell whether this means three or three hundred.',tip:'Give the count or the range, or cite the cases you mean.'});LW.push({a,b,cls:'hl hb-olive',f:id});}
      WORN.forEach(([re,q,d,t])=>{re.lastIndex=0;while((x=re.exec(text))){const a=x.index,b=a+x[0].length,id=add({lens:'worn',s:st.i,a,b,sev:2,title:'Worn phrase: “'+x[0]+'”',q:q||'What would you write if this phrase did not exist?',detail:d||'Readers have met this phrase so often that it no longer carries meaning.',tip:t||'Say the specific thing it stands for.'});LW.push({a,b,cls:'hl hb-olive',f:id});}});
      for(let i=0;i+1<N;i++){const p=T[i],n=T[i+1];if(p.w&&n.w&&p.l===n.l&&/^[a-z]+$/.test(p.l)&&p.l!=='had'&&p.l!=='that'&&/^\s+$/.test(text.slice(p.e,n.s))){const id=add({lens:'worn',s:st.i,a:p.s,b:n.e,sev:2,title:'Repeated word: “'+p.t+' '+n.t+'”',q:'Is the repeat intended?',detail:'The eye skips a doubled word, so it survives proofreading.',tip:'Delete one.',fix:{s:st.s+p.e,e:st.s+n.e,text:''}});LW.push({a:p.s,b:n.e,cls:'hl hb-olive',f:id});}}}
    /* vocabulary level */
    {const LV2=L('vocab'),off=[];let nc=0;
      T.forEach((t,i)=>{if(!t.w||!/^[A-Za-z][A-Za-z'’-]*$/.test(t.t)||t.l.length<3)return;if(/[A-Z]/.test(t.t.slice(1))||(i!==first&&/^[A-Z]/.test(t.t)))return;
        const lv=wordLevel(t.l);if(lv<0)return;nc++;vc.n++;vc.l[lv]++;
        if(lv===1)LV2.push({a:t.s,b:t.e,cls:'dot hu-teal',tip:'A general academic word, on the New Academic Word List.'});
        if(lv===2){off.push(i);vc.off.set(t.l,(vc.off.get(t.l)||0)+1);LV2.push({a:t.s,b:t.e,cls:'hl hb-teal',tip:'On neither word list: a specialist term, or a rare word.'});}});
      const ow=[...new Set(off.map(i=>T[i].l))];
      if(ow.length>=5||(ow.length>=3&&ow.length/nc>=0.3)){const i0=off[0],id=add({lens:'vocab',s:st.i,a:T[i0].s,b:T[i0].e,sev:2,title:ow.length+' words outside the common lists',q:'Which of these would a reader outside your specialty know?',detail:'On neither the everyday list nor the academic list: '+ow.join(', ')+'. They may be terms of your field, or simply rare words.',tip:'Define a technical term where it first appears, and use the plainer word where one says the same thing. Terms your whole audience knows can stay: mark this note as checked.'});off.forEach(i=>LV2.push({a:T[i].s,b:T[i].e,cls:'hl hb-teal',f:id}));}}
    /* describing people */
    PEOPLE.forEach(([re,pref,why])=>{re.lastIndex=0;let x;while((x=re.exec(text))){const a=x.index,b=a+x[0].length,id=add({lens:'people',s:st.i,a,b,sev:2,title:'“'+x[0]+'”',q:'Is there a more specific or more respectful way to name the people you mean?',detail:'APA style advises against this term. '+why,tip:'Consider '+pref+'. Where you can, use the term the people themselves use.'});L('people').push({a,b,cls:'hl hb-olive',f:id});}});
    /* signal phrases */
    {const low=text.toLowerCase();st.sig={};
      SIGNALS.forEach(g=>{g.re.lastIndex=0;let x;while((x=g.re.exec(low))){if(!x[0])break;L('signals').push({a:x.index,b:x.index+x[0].length,cls:g.move?'hl hb-teal':'dot hu-teal',tip:g.tip});st.sig[g.k]=(st.sig[g.k]||0)+1;}});
      st.move=null;let bn=0;MOVEPRI.forEach(k=>{const n=st.sig[k]||0;if(n>bn){bn=n;st.move=k;}});}
    /* terms, claim tracer, merged names */
    st.cw.forEach(c=>{
      if(nounLike(c.i)){let t=termMap.get(c.k);if(!t)termMap.set(c.k,t={k:c.k,forms:new Map(),count:0,sents:[],subj:0});const w=T[c.i].l;t.forms.set(w,(t.forms.get(w)||0)+1);t.count++;if(t.sents[t.sents.length-1]!==st.i)t.sents.push(st.i);if(c.i===head)t.subj++;(t.occ||(t.occ=[])).push([st.i,c.side||'R']);}
      const ct=claimTerms.find(t=>near(t.k,c.k));
      if(ct){ct.count++;ct.paras.add(st.p);if(st.stress&&c.i>=st.stress[0]&&c.i<=st.stress[1])ct.stress++;mk('tracer',c.i,c.i,'hl hb-blue');}
      const tt=titleTerms.find(t=>near(t.k,c.k));if(tt){tt.count++;if(paras[st.p].ord===0)tt.first++;if(!ct)mk('tracer',c.i,c.i,'dot hu-blue',{tip:'A word from your title.'});}
      const g=mergeOf.get(c.k);if(g)g.occ.push({st,i:c.i,k:c.k});});
  });
  acrFirst.forEach(({st,i},a)=>{if(new RegExp('\\(\\s*'+a+'s?\\s*[);,]|\\b'+a+'s?\\s+\\([a-z]').test(raw)){const n2=acrCount.get(a),t2=st.T[i];if(n2<=2){const id2=add({lens:'acr',s:st.i,a:t2.s,b:t2.e,sev:2,title:'“'+a+'” is used only '+(n2===1?'once':'twice'),detail:'It is defined, but the reader has to learn it for '+(n2===1?'a single use':'two uses')+'.',tip:'Spell it out each time. An abbreviation earns its place when it saves many repetitions.'});st.marks.acr.push({a:t2.s,b:t2.e,cls:'hl hb-olive',f:id2});}return;}const n=acrCount.get(a),t=st.T[i];
    const id=add({lens:'acr',s:st.i,a:t.s,b:t.e,sev:2,title:'“'+a+'” is never defined',detail:'Used '+n+(n===1?' time':' times')+', with no expansion found in this text.',tip:n<3?'It appears so rarely that spelling it out costs nothing.':'Define it where it first appears.'});
    st.marks.acr.push({a:t.s,b:t.e,cls:'hl hb-olive',f:id});});
  /* paragraph-level */
  paras.forEach(p=>{if(p.head||!p.sents.length)return;const ss=p.sents.map(i=>sents[i]);
    p.topics=ss.map(st=>st.head>=0?st.T[st.head].t:'·');
    if(ss.length>=4){const fresh=ss.slice(1).filter(st=>st.head>=0&&!SUBJP.has(st.T[st.head].l)&&st.cw.some(c=>c.i===st.head&&!c.old)).length;
      if(fresh>=2&&fresh>=(ss.length-1)*0.6)add({lens:'topic',s:ss[0].i,a:null,sev:2,title:'New characters keep taking the topic position',
        detail:'The grammatical subjects in this paragraph run: '+p.topics.join(' → ')+'. '+fresh+' of them are things the reader has not met before.',tip:'Decide whose story the paragraph tells and put that character, or something already familiar, at the head of most of its sentences.'});
}
    /* rhythm: runs, neighbour contrast, emphasis */
    {const ls=ss.map(st=>st.nW),n=ls.length,R=p.rhythm=rstat(ls,ss.map(st=>st.preV)),run=new Array(n).fill(null),runs=[],num=k=>ss[k].i+1,
      span=(a,b)=>'Sentences '+num(a)+' to '+num(b),lens=(a,b)=>ls.slice(a,b+1).join(', '),setRun=(a,b,type)=>{for(let k=a;k<=b;k++)run[k]=type;runs.push([a,b,type]);};
      for(let k=0;k<n-1;k++){rPair+=Math.abs(ls[k]-ls[k+1])/((ls[k]+ls[k+1])/2);rPairN++;}
      for(let i=0;i<n;){if(ls[i]<=12){let j=i;while(j+1<n&&ls[j+1]<=12)j++;if(j-i>=2)setRun(i,j,'chop');i=j+1;}else i++;}
      for(let i=0;i<n;){if(ls[i]>=30){let j=i;while(j+1<n&&ls[j+1]>=30)j++;if(j-i>=1)setRun(i,j,'long');i=j+1;}else i++;}
      for(let i=0;i<n;){if(run[i]){i++;continue;}let j=i,lo=ls[i],hi=ls[i];
        while(j+1<n&&!run[j+1]){const lo2=Math.min(lo,ls[j+1]),hi2=Math.max(hi,ls[j+1]);if(hi2-lo2>Math.max(4,0.25*(lo2+hi2)/2))break;lo=lo2;hi=hi2;j++;}
        if(j-i>=3){setRun(i,j,'even');i=j+1;}else i++;}
      runs.forEach(([a,b,type])=>{const k=b-a+1;let id;
        if(type==='chop'){let bi=a;for(let q=a;q<b;q++)if(ls[q]+ls[q+1]<ls[bi]+ls[bi+1])bi=q;
          id=add({lens:'rhythm',para:true,s:ss[a].i,a:null,sev:2,title:k+' short sentences in a row',
            detail:span(a,b)+' run '+lens(a,b)+' words. Each is 12 words or fewer, about the average Flesch (1948) found in easy prose. One short sentence after longer ones reads as emphasis. Several in a row give every point the same weight and leave the reader to work out how the points connect.',
            tip:'Join two of them and say how they relate: and, but, so, because. Keep a short sentence for the point that matters most.',join:ss[bi].i});flatN+=k;}
        else if(type==='long')id=add({lens:'rhythm',para:true,s:ss[a].i,a:null,sev:2,title:k+' very long sentences in a row',
            detail:span(a,b)+' run '+lens(a,b)+' words. Each is 30 words or more, above the 25 to 27 words that research articles average. Back to back, they give the reader no shorter sentence to rest on.',
            tip:'Split one of them at a joint, or put a short sentence between them that says where the argument has got to.'});
        else{id=add({lens:'rhythm',para:true,s:ss[a].i,a:null,sev:2,title:'A run of '+k+' sentences of near-equal length',
            detail:span(a,b)+' run '+lens(a,b)+' words. Equal lengths give every sentence equal weight, so nothing stands out. That suits a list of parallel steps. It does not suit an argument that has one main point.',
            tip:'Decide which sentence carries the point. Shorten it, or lengthen a neighbour by joining it to the sentence after it.'});flatN+=k;}
        for(let q=a;q<=b;q++)ss[q].run={type,f:id,n:k,from:num(a),to:num(b)};});
      if(n>=4&&R.npvi<20&&!runs.some(r=>r[2]!=='long'))add({lens:'rhythm',para:true,s:ss[0].i,a:null,sev:2,title:'Little contrast between neighbouring sentences',
        detail:'Neighbour contrast is '+Math.round(R.npvi)+' on a scale of 0 to 200: on average each sentence differs from the next by '+Math.round(R.npvi)+'% of their mean length (the lengths run '+ls.join(', ')+' words). Sentences in random order from prose with an ordinary spread of lengths score about 40 to 60, so this paragraph is unusually level.',
        tip:'Let the point that matters most stand in a short sentence that follows a longer one.'});
      const pts=[];if(n>=3){const mn=Math.min(...ls);if(mn<=0.6*R.median&&ls.filter(x=>x===mn).length===1)pts.push([ls.indexOf(mn),'short']);
        for(let k=1;k<n;k++)if(ls[k-1]>=15&&ls[k]<=0.5*ls[k-1]&&!pts.some(q=>q[0]===k))pts.push([k,'drop']);}
      pts.forEach(([k,t])=>{ss[k].emph=t;});p.emphPts=pts.map(q=>q[0]);
      const pk=p.ord!=null?+((opts.emph||[])[p.ord]||0):0;p.pick=pk>=1&&pk<=n?pk-1:null;
      if(p.pick!=null){const st=ss[p.pick];st.picked=true;
        if(n>=3&&!st.emph){const o=pts[0],w=st.nW,md=R.median;
          add({lens:'rhythm',s:st.i,a:null,sev:2,title:'The sentence you want remembered is not set apart',
            detail:'You chose sentence '+(st.i+1)+' as the one to remember. It has '+w+' words, in a paragraph whose median is '+(Math.round(md*10)/10)+'. '+(o?'By length, the paragraph points instead at sentence '+num(o[0])+' ('+ls[o[0]]+' words), '+(o[1]==='short'?'its shortest':'which follows a much longer sentence')+'.':'No sentence in this paragraph stands apart by length: they run '+ls.join(', ')+' words.')+(w>=30?' At '+w+' words it is also long enough for its point to be buried.':''),
            tip:'Cut it to its core claim, so that it is clearly shorter than its neighbours, and move its qualifications into the sentence before or after. A sentence stands out when it is the shortest in the paragraph, or half the length of the one before it.'});}}
    }
  });
  /* ---------- whole-draft passes ---------- */
  const body=paras.filter(p=>p.ord!=null),pm=(st,o)=>(st.marks.checks||(st.marks.checks=[])).push(o);
  if(sents.length&&claimTerms.length>=2){
    paras.forEach((p,pi)=>{if(p.ord==null)return;p.hits=claimTerms.filter(t=>t.paras.has(pi)).map(t=>t.w);
      if(!p.hits.length)add({lens:'tracer',s:p.sents[0],a:null,sev:2,title:'This paragraph never touches your claim',q:'What is this paragraph doing for your claim?',detail:'None of the claim’s terms ('+claimTerms.map(t=>t.w).join(', ')+') appears in it.',tip:'If the paragraph supports the claim, say how, in the claim’s own words. If it does not, ask whether it belongs.'});});
    claimTerms.filter(t=>!t.count).forEach(t=>add({lens:'tracer',s:0,a:null,sev:2,title:'“'+t.w+'” is in your claim but not in your draft',q:'Do you use a different word for this in the draft?',detail:'Readers connect a claim to its support through shared words. This one never appears in the text.',tip:'Use the same word in the claim and in the draft.'}));
    if(body.length>=2)[[body[0],'opening'],[body[body.length-1],'closing']].forEach(([p,w])=>{if(p.hits.length&&p.hits.length<claimTerms.length/2)add({lens:'tracer',s:p.sents[w==='opening'?0:p.sents.length-1],a:null,sev:2,title:'The '+w+' paragraph holds '+p.hits.length+' of your claim’s '+claimTerms.length+' terms',q:'Would a reader who saw only this paragraph know what you are claiming?',detail:'Present: '+p.hits.join(', ')+'. Missing: '+claimTerms.filter(t=>!p.hits.includes(t.w)).map(t=>t.w).join(', ')+'.',tip:'Readers look for the claim at the start and at the end. State it there in full.'});});
  }
  const tracer={terms:claimTerms.map(t=>({w:t.w,k:t.k,count:t.count,stress:t.stress}))};
  /* title words, traced the way SWAN tests a title against its abstract and headings */
  {const heads=paras.filter(p=>p.head&&(!p.kind||p.kind==='heading'));
    heads.forEach(p=>tokenize(raw.slice(p.s,p.e)).forEach(tk=>{if(!isContent(tk))return;const k=stem(tk.l);titleTerms.forEach(t=>{if(near(t.k,k))t.heads++;});}));
    tracer.title={terms:titleTerms.map(t=>({w:t.w,count:t.count,first:t.first,heads:t.heads})),heads:heads.length};
    if(sents.length&&titleTerms.length){
      titleTerms.filter(t=>!t.count).forEach(t=>add({lens:'tracer',s:0,a:null,sev:2,title:'“'+t.w+'” is in your title but not in your text',q:'Would a reader who came for this word find it?',detail:'A title is a promise about what the text contains. This word from the title never appears in the text. SWAN, a rule-based checker for scientific papers, tests a title against its abstract in the same way.',tip:'Use the title’s word in the text, or change the title to the word the text uses.'}));
      const got=titleTerms.filter(t=>t.count),inFirst=got.filter(t=>t.first).length;
      if(body.length>=2&&got.length>=2&&inFirst<got.length/2)add({lens:'tracer',para:true,s:body[0].sents[0],a:null,sev:2,title:'The opening paragraph holds '+inFirst+' of your title’s '+titleTerms.length+' words',q:'Would a reader recognise the paper they chose from its first paragraph?',detail:'Missing from the opening paragraph: '+got.filter(t=>!t.first).map(t=>t.w).join(', ')+'.',tip:'Bring the title’s words into the opening, so the reader sees at once that this is the paper the title promised.'});
      if(heads.length>=2&&!titleTerms.some(t=>t.heads))add({lens:'tracer',para:true,s:0,a:null,sev:2,title:'No heading carries a word from your title',q:'Could a reader find your contribution from the headings alone?',detail:'The draft has '+heads.length+' headings, and none of them uses a word from the title. Readers who skim go from the title to the headings.',tip:'Let one or two headings name what the title names.'});}}
  /* key sentences: ranked by the words each shares with the rest of the draft (the TextRank idea) */
  tracer.key=[];
  if(sents.length>=6&&sents.length<=400){const S=sents.map(s=>[...new Set(s.cw.map(c=>c.k))]),n=S.length,W=S.map(()=>new Float32Array(n)),out=new Float32Array(n);
    for(let i=0;i<n;i++){if(S[i].length<2)continue;const si=new Set(S[i]);for(let j=i+1;j<n;j++){if(S[j].length<2)continue;let c=0;for(const k of S[j])if(si.has(k))c++;if(c){const w=c/(Math.log(S[i].length)+Math.log(S[j].length));W[i][j]=W[j][i]=w;out[i]+=w;out[j]+=w;}}}
    let sc=new Float32Array(n).fill(1);
    for(let it=0;it<30;it++){const nx=new Float32Array(n).fill(0.15);for(let j=0;j<n;j++){if(!out[j])continue;const f=0.85*sc[j]/out[j],r=W[j];for(let i=0;i<n;i++)if(r[i])nx[i]+=f*r[i];}sc=nx;}
    const top=[...sc.keys()].filter(i=>out[i]>0).sort((a,b)=>sc[b]-sc[a]||a-b).slice(0,Math.max(3,Math.min(5,Math.ceil(n/8))));
    top.forEach((i,r)=>{sents[i].key=r+1;});tracer.key=top;
    if(claimTerms.length>=2&&top.length){const miss=claimTerms.filter(t=>!top.some(i=>sents[i].cw.some(c=>near(t.k,c.k))));
      if(miss.length>claimTerms.length/2)add({lens:'tracer',para:true,s:top[0],a:null,sev:2,title:'The draft’s most connected sentences carry '+(claimTerms.length-miss.length)+' of your claim’s '+claimTerms.length+' terms',q:'If a reader remembered only these sentences, would they know your claim?',detail:'Sentences '+top.slice().sort((a,b)=>a-b).map(i=>i+1).join(', ')+' share the most words with the rest of the draft, so by vocabulary the draft is built around them. Missing from them: '+miss.map(t=>t.w).join(', ')+'.',tip:'Bring the claim’s own words into the sentences the draft keeps returning to, or rebuild the draft around the sentence that states the claim.'});}}
  /* topic grid: recurring terms by sentence, before or after the main verb */
  const wordOf=t=>{let w='',c=0;t.forms.forEach((n,f)=>{if(n>c||(n===c&&f.length<w.length)){w=f;c=n;}});return w;};
  const gT=[...termMap.values()].filter(t=>t.sents.length>=2).sort((a,b)=>b.sents.length-a.sents.length||b.count-a.count).slice(0,14);
  const grid={terms:gT.map(t=>{const cells={};let nL=0;(t.occ||[]).forEach(([s,side])=>{if(side==='L'||!cells[s])cells[s]=side;});Object.values(cells).forEach(v=>{if(v==='L')nL++;});return{k:t.k,w:wordOf(t),count:t.count,n:t.sents.length,first:t.sents[0],cells,nL};}),links:{}};
  /* referential distance and persistence of each term, counted in sentences (after Givon 1983, who counted clauses) */
  grid.terms.forEach(g=>{const ss=Object.keys(g.cells).map(Number).sort((a,b)=>a-b);let sum=0,mx=0,at=-1,ps=0;
    for(let i=0;i<ss.length;i++){if(i){const d=ss[i]-ss[i-1];sum+=Math.min(d,20);if(d>mx){mx=d;at=ss[i];}}let r=0;while(i+r+1<ss.length&&ss[i+r+1]===ss[i]+r+1)r++;ps+=r;}
    g.rd=ss.length>1?sum/(ss.length-1):null;g.rdMax=mx;g.rdAt=at;g.pers=ss.length?ps/ss.length:0;});
  sents.forEach(s=>{const k=s.link?s.link.type:'start';grid.links[k]=(grid.links[k]||0)+1;});
  grid.terms.slice(0,3).forEach(g=>{if(g.nL===0&&g.n>=3)add({lens:'grid',para:true,s:g.first,a:null,sev:2,title:'“'+g.w+'” is in '+g.n+' sentences and never before the verb',q:'Is this what the draft is about? Then should some sentences start from it?',detail:'It is one of the terms the draft uses most, yet each time it comes after the main verb. Readers take what comes before the verb as what a sentence is about, and what comes after as the news about it (Gopen & Swan 1990).',tip:'If the draft is about “'+g.w+'”, make it the subject of some of its sentences.'});});
  grid.terms.sort((a,b)=>a.first-b.first);
  {const pk=paras.map(()=>new Set());termMap.forEach(t=>t.sents.forEach(s=>pk[sents[s].p].add(t.k)));
    body.forEach((p,bi)=>{if(!bi||p.sents.length<2)return;const a=pk[paras.indexOf(p)],b=pk[paras.indexOf(body[bi-1])];if(!a.size||!b.size)return;let sh=false;a.forEach(k=>{if(b.has(k))sh=true;});
      if(!sh)add({lens:'grid',para:true,s:p.sents[0],a:null,sev:2,title:'This paragraph shares no term with the one before it',q:'What connects this paragraph to the last one?',detail:'None of the nouns in this paragraph appears in the paragraph before, so by vocabulary the subject changes completely here.',tip:'Open the paragraph with a term the reader already has, or with a sentence that says how the subject is changing.',pb:['transition']});});}
  /* moves signalled, against what this kind of text usually contains */
  const kind=opts.kind||'',exp={abstract:['context','aim','method','result','implication'],intro:['context','gap','aim'],paper:['context','gap','aim','method','result','interp','limit']}[kind]||[],firstOf={};
  sents.forEach(s=>Object.keys(s.sig||{}).forEach(k=>{if(CUES[k]&&firstOf[k]==null)firstOf[k]=s.i;}));
  const movesOut={kind,exp,first:firstOf,missing:exp.filter(k=>firstOf[k]==null)};
  if(exp.length&&sents.length>=3){const KN={abstract:'An abstract',intro:'An introduction',paper:'A research paper'}[kind];
    movesOut.missing.forEach(k=>{const m=MOVEMSG[k];add({lens:'signals',para:true,s:0,a:null,sev:2,title:'No sentence signals '+m[0],q:m[1],detail:KN+' usually '+m[2]+' No sentence in this text carries a phrase that signals it. The lens looks only for cue phrases, so a move made in other words goes unseen. If the move is there, mark this note as checked.',tip:m[3],pb:[m[4]]});});
    if(kind!=='abstract'&&firstOf.aim!=null&&firstOf.gap!=null&&firstOf.aim<firstOf.gap)add({lens:'signals',s:firstOf.aim,a:null,sev:2,title:'The aim is signalled before the gap',q:'Does the reader know what was missing before you say what you set out to do?',detail:'Sentence '+(firstOf.aim+1)+' signals an aim, and the first signal of a gap comes later, in sentence '+(firstOf.gap+1)+'. Introductions usually run from what is known, to what is missing, to what this work does (Swales 1990).',tip:'State the gap first, then the aim that answers it.',pb:['intro']});}
  const terms=[...termMap.values()].map(t=>{let w='',c=0;t.forms.forEach((n,f)=>{if(n>c||(n===c&&f.length<w.length)){w=f;c=n;}});return{k:t.k,w,count:t.count,sents:t.sents,subj:t.subj};}).sort((a,b)=>b.count-a.count||a.w.localeCompare(b.w));
  groups.forEach(g=>{const by=new Map();g.occ.forEach(o=>{if(!by.has(o.k))by.set(o.k,[]);by.get(o.k).push(o);});if(by.size<2)return;
    const names=[...by.entries()].map(([k,os])=>({w:(terms.find(t=>t.k===k)||{w:k}).w,os})).sort((a,b)=>b.os.length-a.os.length),f0=names[1].os[0];
    const id=add({lens:'terms',s:f0.st.i,a:f0.st.T[f0.i].s,b:f0.st.T[f0.i].e,sev:2,title:names.length+' names for one thing: '+names.map(n=>'“'+n.w+'”').join(', '),q:'Which name will you keep?',
      detail:names.map(n=>'“'+n.w+'” appears '+n.os.length+(n.os.length===1?' time':' times')).join('; ')+'.',tip:'Readers take a new word to mean a new thing. Use “'+names[0].w+'” throughout, or whichever name your field expects.'});
    names.forEach((n,q)=>n.os.forEach(o=>(o.st.marks.terms||(o.st.marks.terms=[])).push(q?{a:o.st.T[o.i].s,b:o.st.T[o.i].e,cls:'hl hb-amber',f:id}:{a:o.st.T[o.i].s,b:o.st.T[o.i].e,cls:'dot hu-amber'})));});
  {const re=/\b(Fig(?:ure)?s?\.?|Tables?)\s*(S?)(\d+)/gi,seq={};let x;
    while((x=re.exec(raw))){const type=(x[2]?'Supplementary ':'')+(/^t/i.test(x[1])?'Table':'Figure'),nums=[+x[3]],more=raw.slice(re.lastIndex).match(/^[A-Za-z]?\s*(?:(?:–|-|to)\s*S?(\d+)|(?:,|and|&)\s*S?(\d+))/);
      if(more){if(more[1])for(let n=nums[0]+1;n<=+more[1]&&n<nums[0]+30;n++)nums.push(n);else if(more[2])nums.push(+more[2]);}
      const st=sents.find(s=>s.s<=x.index&&s.e>x.index);if(!st)continue;const q=seq[type]||(seq[type]=new Map());
      nums.forEach(n=>{if(!q.has(n))q.set(n,{st,a:x.index-st.s,b:x.index-st.s+x[0].length});});}
    Object.entries(seq).forEach(([type,q])=>{const seen=new Set(),max=Math.max(...q.keys()),lc=type.toLowerCase();
      q.forEach((loc,n)=>{const skipped=[];for(let k=1;k<n;k++)if(!seen.has(k)&&q.has(k))skipped.push(k);seen.add(n);
        if(skipped.length){const id=add({lens:'checks',s:loc.st.i,a:loc.a,b:loc.b,sev:2,title:type+' '+n+' is cited before '+type+' '+skipped.join(', '),q:'Should the '+lc+'s be renumbered, or the text reordered?',detail:'Readers expect '+lc+'s to be cited in the order they are numbered.',tip:'Renumber so the first one cited is 1, or move the earlier citation up.'});pm(loc.st,{a:loc.a,b:loc.b,cls:'hl hb-olive',f:id});}});
      const miss=[];for(let k=1;k<max;k++)if(!q.has(k))miss.push(k);
      if(miss.length&&max<40){const loc=q.get(max),id=add({lens:'checks',s:loc.st.i,a:loc.a,b:loc.b,sev:2,title:type+' '+miss.join(', ')+(miss.length>1?' are':' is')+' never cited',q:'Is it cited somewhere outside this excerpt?',detail:type+'s up to '+max+' are cited here, but not '+miss.join(', ')+'.',tip:'Cite every figure and table at the point where the reader needs it.'});pm(loc.st,{a:loc.a,b:loc.b,cls:'hl hb-olive',f:id});}});}
  const jl=opts.jobs||[],JN=Object.fromEntries(JOBS);
  paras.forEach(p=>{if(p.ord==null)return;const ss=p.sents.map(i=>sents[i]),nw=ss.reduce((a,s)=>a+s.nW,0);
    const ts=ss.filter(s=>s.tense);let sw=0;for(let i=1;i<ts.length;i++)if(ts[i].tense!==ts[i-1].tense)sw++;const np=ts.filter(s=>s.tense==='past').length;
    if(sw>=3&&np>=2&&ts.length-np>=2)add({lens:'checks',s:ss[0].i,a:null,sev:2,title:'Tense changes '+sw+' times in this paragraph',q:'Which of these statements report what you did or found, and which state general truths?',detail:'The main verbs run: '+ts.map(s=>s.tense).join(', ')+'.',tip:'A common convention is past tense for what you did and found, and present tense for established knowledge and for what your results mean. Change tense only when you cross that line.'});
    if(ss.length===1&&body.length>1&&nw<40)add({lens:'outline',s:ss[0].i,a:null,sev:2,title:'A one-sentence paragraph',q:'Is this a paragraph, or a sentence that belongs with its neighbour?',detail:'A paragraph usually raises an issue and then makes a point about it. One sentence can rarely do both.',tip:'Join it to the paragraph it serves, or develop it.'});
    if(ss.length>9||nw>260)add({lens:'outline',s:ss[0].i,a:null,sev:2,title:'A long paragraph: '+ss.length+' sentences, '+nw+' words',q:'Does this paragraph make one point, or two?',detail:'Long paragraphs often hold two points, and the second is hard to find.',tip:'Look for the place where the subject changes and start a new paragraph there.'});
    if(ss.length>=4){const a=ss[0].cw.map(c=>c.k);if(!ss[ss.length-1].cw.some(c=>a.some(k=>near(k,c.k))))add({lens:'outline',s:ss[ss.length-1].i,a:null,sev:2,title:'First and last sentence share no terms',q:'Read the first and last sentence together. Do they belong to the same paragraph?',detail:'By vocabulary alone, this paragraph ends somewhere unrelated to where it began.',tip:'State the paragraph’s point in the terms its opening set up, or split the paragraph where the subject changes.'});}
    const low=raw.slice(p.s,p.e).toLowerCase();let best=null,second=0;
    Object.entries(CUES).forEach(([job,re])=>{const ms=low.match(re)||[];if(!best||ms.length>best.n){second=best?best.n:0;best={job,n:ms.length,words:[...new Set(ms)].slice(0,3)};}else if(ms.length>second)second=ms.length;});
    p.cue=best&&best.n>=2&&best.n>second?best:null;p.job=jl[p.ord]||'';
    if(p.job&&p.cue&&p.cue.job!==p.job)add({lens:'jobs',s:ss[0].i,a:null,sev:2,title:'Labeled “'+JN[p.job]+'”, worded like “'+JN[p.cue.job]+'”',q:'What is this paragraph’s job, and would a reader see that from its first sentence?',detail:'Its wording carries cues that usually signal '+JN[p.cue.job].toLowerCase()+': '+p.cue.words.map(w=>'“'+w.trim()+'”').join(', ')+'.',tip:'If your label is right, open the paragraph with a sentence that announces the job. If the cue is right, relabel.'});});
  {const labeled=body.filter(p=>p.job),fr=body.findIndex(p=>p.job==='result');
    if(fr>=0)body.forEach((p,i)=>{if(i>fr&&(p.job==='gap'||p.job==='aim'))add({lens:'jobs',s:p.sents[0],a:null,sev:2,title:'The '+(p.job==='gap'?'gap':'aim')+' arrives after results',q:'Does the reader know which question the results answer before reading them?',detail:'Paragraph '+(i+1)+' is labeled “'+JN[p.job]+'”, but paragraph '+(fr+1)+' has already given a result.',tip:'Move this paragraph ahead of the results, or state the question briefly before them.'});});
    if(body.length>=3&&labeled.length===body.length){const has=j=>body.some(p=>p.job===j),s0=body[0].sents[0];
      if(!has('gap'))add({lens:'jobs',s:s0,a:null,sev:2,title:'No paragraph states the gap',q:'Where does the reader learn what was missing or unknown before your work?',detail:'None of your paragraphs is labeled “Gap or problem”.',tip:'A sentence or two on what was not known gives the reader a reason to want your result.'});
      if(!has('aim'))add({lens:'jobs',s:s0,a:null,sev:2,title:'No paragraph states your aim',q:'Where do you say what you set out to do?',detail:'None of your paragraphs is labeled “Aim or approach”.',tip:'State the aim just after the gap it answers.'});
      if(has('result')&&!has('interp')&&!has('implication'))add({lens:'jobs',s:body[body.length-1].sents[0],a:null,sev:2,title:'Results with no “so what”',q:'What should the reader conclude from these results?',detail:'You labeled results, but no paragraph interprets them or draws an implication.',tip:'End by saying what the results mean for the question you opened with.'});}
    var jobsOut={seq:body.map(p=>p.job),unlabeled:body.length-labeled.length,n:body.length};}
  paras.forEach(p=>{if(p.ord==null)return;const ss=p.sents.map(i=>sents[i]),tot={};ss.forEach(s=>Object.entries(s.sig||{}).forEach(([k,n])=>{tot[k]=(tot[k]||0)+n;}));p.signals=tot;
    if(ss.length>=3&&!Object.keys(tot).length)add({lens:'signals',s:ss[0].i,a:null,sev:2,title:'This paragraph announces nothing',q:'What is this paragraph doing, and which words tell the reader so?',detail:'None of its '+ss.length+' sentences carries a phrase that signals a move (a gap, an aim, a result, a meaning) or a transition.',tip:'Open with a few words that say what the paragraph is for.'});});
  {const vs=[...new Set(nvals.map(n=>n.v))];if(vs.length>1){const n2=nvals.find(n=>n.v!==nvals[0].v),id=add({lens:'stats',s:n2.st.i,a:n2.a,b:n2.b,sev:2,title:'Different totals: N = '+vs.join(', N = '),q:'Which is the sample, and why do the totals differ?',detail:'The draft reports '+vs.length+' different values of N (sentences '+uniq(nvals.map(n=>n.st.i+1)).join(', ')+').',tip:'If participants were excluded, say how many and why. If one of the numbers is a slip, correct it everywhere, including tables and the abstract.'});(n2.st.marks.stats||(n2.st.marks.stats=[])).push({a:n2.a,b:n2.b,cls:'hl hb-violet',f:id});}}
  body.forEach((p,i)=>{const mv=(opts.moves||[])[p.ord];if(!p.job||!mv||mv.job!==p.job)return;const list=MOVES[p.job]||[],v=mv.v||[];let last=-1,lastName='';
    list.forEach((name,k)=>{const x=v[k];
      if(x==='no')add({lens:'jobs',s:p.sents[0],a:null,sev:2,title:'Paragraph '+(i+1)+' lacks a usual move: '+name.charAt(0).toLowerCase()+name.slice(1),q:'Where does the reader get this?',detail:'You labeled this paragraph “'+JN[p.job]+'” and marked this move as not in it: '+name+'.',tip:'Add a sentence that does it, or check whether a neighbouring paragraph already does.',pb:[JOBPB[p.job]]});
      else if(x!==''&&x!=null){const n=Math.min(+x,p.sents.length-1);
        if(n<last)add({lens:'jobs',s:p.sents[n],a:null,sev:2,title:'Moves out of their usual order in paragraph '+(i+1),q:'Would the paragraph read more easily with these two the other way round?',detail:'“'+name+'” (sentence '+(p.sents[n]+1)+') comes before “'+lastName+'”.',tip:'The usual order is the order of the checklist. Depart from it only on purpose.',pb:[JOBPB[p.job]]});
        else{last=n;lastName=name;}}});});
  /* ---------- research measures, all by fixed rules ---------- */
  /* reference list against the citations in the text: first author's surname and year, author-date style only */
  let refCheck=null;
  {const rb=paras.filter(p=>p.kind==='refs');
    if(rb.length){const lines=[];rb.forEach(p=>raw.slice(p.s,p.e).split('\n').forEach(l=>{if(l.trim())lines.push(l.trim());}));
      const START=/^(?:\[\d+\]\s*|\d+\.\s+|[-*•]\s+)?(\p{Lu}[\p{L}'’-]+(?:\s\p{Lu}[\p{L}'’-]+)?)(?=,|\s+\p{Lu}\.|\s+(?:et al|and|&)\b|\s+\()/u,YR=/\b((?:19|20)\d\d)[a-z]?\b/,ents=[];
      lines.forEach(l=>{const m=l.match(START),last=ents[ents.length-1];if(m&&(!last||last.text.match(YR)))ents.push({name:m[1],text:l});else if(last)last.text+=' '+l;else ents.push({name:'',text:l});});
      ents.forEach(e=>{const y=e.text.match(/\(((?:19|20)\d\d)[a-z]?\)/)||e.text.match(YR);e.year=y?y[1]:null;e.key=e.name.toLowerCase();e.cited=false;});
      const SKIP=S('see cf also for in table tables figure figures fig appendix study wave model panel section chapter eq equation january february march april may june july august september october november december and the as but if when while since although though because however thus'),
        cites=new Map(),same=(a,b)=>a===b||a.split(' ').pop()===b||b.split(' ').pop()===a;
      const note=(name,year,st,a,b)=>{const k=name.toLowerCase()+'|'+year;if(!cites.has(k))cites.set(k,{name,year,key:name.toLowerCase(),s:st.i,a,b});};
      sents.forEach(st=>{const text=st.text;let m;
        const P=/\(([^()]*\b(?:19|20)\d\d[a-z]?\b[^()]*)\)/g;
        while((m=P.exec(text))){let off=m.index+1;m[1].split(';').forEach(part=>{const nm=[...part.matchAll(/\p{Lu}[\p{L}'’-]+/gu)].map(x=>x[0]).find(w=>!SKIP.has(w.toLowerCase())),ys=part.match(/\b(?:19|20)\d\d\b/g);
          if(nm&&ys)ys.forEach(y=>note(nm,y,st,off+part.search(/\S/),off+part.replace(/\s+$/,'').length));off+=part.length+1;});}
        const Nr=/(\p{Lu}[\p{L}'’-]+)(?:\s+(?:and|&)\s+\p{Lu}[\p{L}'’-]+|,?\s+et al\.?)?(?:[’']s)?\s+\(((?:19|20)\d\d)[a-z]?((?:[,;]\s*(?:19|20)\d\d[a-z]?)*)(?:,[^()]*)?\)/gu;
        while((m=Nr.exec(text))){if(SKIP.has(m[1].toLowerCase()))continue;[m[2]].concat((m[3].match(/(?:19|20)\d\d/g)||[])).forEach(y=>note(m[1],y,st,m.index,m.index+m[0].length));}});
      let missing=0;
      cites.forEach(c=>{const hit=ents.filter(e=>e.key&&same(e.key,c.key));const ok=hit.find(e=>e.year===c.year);if(ok){hit.forEach(e=>{if(e.year===c.year)e.cited=true;});return;}
        missing++;hit.forEach(e=>{e.near=true;});if(missing>15)return;const st=sents[c.s],others=hit.map(e=>e.year).filter(Boolean);
        const id=add({lens:'checks',s:c.s,a:c.a,b:c.b,sev:2,title:(others.length?'The year differs from the reference list: ':'Not in the reference list: ')+c.name+' '+c.year,q:others.length?'Which year is right?':'Is this source in your reference list?',
          detail:'The text cites “'+c.name+' '+c.year+'”. '+(others.length?'The reference list has '+c.name+' with '+[...new Set(others)].join(' and ')+'.':'No entry in the reference list begins with that name and carries that year.')+' Only the first author’s surname and the year are compared.',
          tip:others.length?'Correct the year in the text or in the list so that the two agree.':'Add the entry to the list, or correct the name or the year so that the two agree.'});
        (st.marks.checks||(st.marks.checks=[])).push({a:c.a,b:c.b,cls:'hl hb-olive',f:id});});
      const un=cites.size?ents.filter(e=>e.key&&!e.cited&&!e.near):[];
      if(un.length&&sents.length){const last=sents[sents.length-1];add({lens:'checks',para:true,s:last.i,a:null,sev:2,title:un.length+(un.length===1?' entry':' entries')+' in the reference list '+(un.length===1?'is':'are')+' never cited',q:'Should each of these be cited in the text, or removed from the list?',
        detail:'No citation in the text matches: '+un.slice(0,10).map(e=>e.name+(e.year?' '+e.year:'')).join('; ')+(un.length>10?'; and '+(un.length-10)+' more':'')+'. Only author-and-year citations are read, so a source cited another way will show here.',tip:'Cite the source where you use it, or take the entry out of the list.'});}
      refCheck={entries:ents.filter(e=>e.key).length,cited:cites.size,missing,uncited:un.length,checked:cites.size>0};}}
  const research=(()=>{
    const body=paras.filter(p=>p.ord!=null),R={},n=sents.length,r1=v=>Math.round(v*10)/10;
    const sset=sents.map(st=>new Set(st.cw.map(c=>c.k))),wOf=new Map(),freq=new Map();
    sents.forEach(st=>st.cw.forEach(c=>{if(!wOf.has(c.k))wOf.set(c.k,st.T[c.i].l);freq.set(c.k,(freq.get(c.k)||0)+1);}));
    const shares=(a,b)=>{for(const k of a)if(b.has(k))return true;return false;};
    /* overlap: neighbouring sentences, all sentence pairs, neighbouring paragraphs */
    let lp=0,lh=0,gp=null,gh=null;for(let i=1;i<n;i++){lp++;if(shares(sset[i],sset[i-1]))lh++;}
    if(n<=600){gp=0;gh=0;for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){gp++;if(shares(sset[i],sset[j]))gh++;}}
    const pset=body.map(p=>{const s=new Set();p.sents.forEach(i=>sset[i].forEach(k=>s.add(k)));return s;}),pairs=[];
    body.forEach((p,q)=>{if(!q){p.carry=null;return;}const sh=[...pset[q]].filter(k=>pset[q-1].has(k)).sort((a,b)=>freq.get(b)-freq.get(a));p.carry={n:sh.length,words:sh.slice(0,6).map(k=>wOf.get(k))};pairs.push(p.carry);});
    R.over={lp,lh,gp,gh,pp:pairs.length,ph:pairs.filter(c=>c.n).length};
    /* connectives by type */
    const CONN={add:/\b(?:also|moreover|furthermore|in addition|additionally|besides|similarly|likewise|as well as|for example|for instance|in particular|in other words|that is(?=,)|namely)\b/gi,
      con:/\b(?:but|however|although|though|whereas|nevertheless|nonetheless|in contrast|by contrast|on the other hand|conversely|instead|despite|in spite of|rather than|on the contrary|alternatively|unlike|(?<=^|[,;] )yet)\b/gi,
      cau:/\b(?:because|therefore|thus|hence|consequently|as a result|as a consequence|so that|due to|owing to|thereby|accordingly|for this reason|given that|it follows that|(?<=, )so(?! far| much| many|-))\b/gi,
      tem:/\b(?:then|after|before|when|once|until|while|meanwhile|subsequently|previously|afterwards?|later|earlier|finally|eventually|at the same time|at first|first(?=,)|second(?=,)|third(?=,)|next(?=,))\b/gi};
    const cby={add:0,con:0,cau:0,tem:0};let cn=0;
    sents.forEach(st=>{st.conn=[];Object.keys(CONN).forEach(t=>{const re=CONN[t];re.lastIndex=0;let m;while((m=re.exec(st.text))){st.conn.push({a:m.index,b:m.index+m[0].length,type:t,w:m[0].toLowerCase()});cby[t]++;cn++;}});st.conn.sort((x,y)=>x.a-y.a);});
    const nWd=sents.reduce((a,s)=>a+s.nW,0),per=v=>nWd?1000*v/nWd:0;
    R.conn={n:cn,per:per(cn),by:cby};
    /* givenness */
    const PRN=S("i we you he she it they me us him her them"),NEGW=S("not no never neither none nothing nobody nowhere without cannot");
    let cwN=0,cwOld=0,pron=0,negN=0,pasN=0,pasA=0;
    sents.forEach(st=>{st.cw.forEach(c=>{cwN++;if(c.old)cwOld++;});st.T.forEach(tk=>{if(!tk.w)return;if(PRN.has(tk.l))pron++;if(NEGW.has(tk.l)||/n't$/.test(tk.l))negN++;});(st.passives||[]).forEach(p=>{pasN++;if(!(p.by>=0))pasA++;});});
    R.given={cw:cwN,old:cwOld,pron,per100:nWd?100*pron/nWd:0};
    let once=0;freq.forEach(v=>{if(v===1)once++;});R.once={types:freq.size,once};
    /* tense repetition */
    {let tp=0,ts=0;for(let i=1;i<n;i++){const a=sents[i-1].tense,b=sents[i].tense;if(a&&b){tp++;if(a===b)ts++;}}R.tense={pairs:tp,same:ts};}
    /* lexical diversity: MTLD (both directions) and MATTR (50-word window), on word forms */
    {const w=[];sents.forEach(st=>st.T.forEach(tk=>{if(tk.w&&/[a-z]/.test(tk.l))w.push(tk.l);}));
      const one=a=>{let f=0,ty=new Set(),c=0;for(const x of a){ty.add(x);c++;if(ty.size/c<0.72){f++;ty=new Set();c=0;}}if(c)f+=(1-ty.size/c)/(1-0.72);return f>0?a.length/f:null;};
      const fw=one(w),bw=one(w.slice().reverse()),W=50;let mattr=null;
      if(w.length>=W){const cnt=new Map();let ty=0,sum=0,k=0;for(let i=0;i<w.length;i++){const x=w[i];cnt.set(x,(cnt.get(x)||0)+1);if(cnt.get(x)===1)ty++;if(i>=W){const y=w[i-W],c=cnt.get(y)-1;cnt.set(y,c);if(!c)ty--;}if(i>=W-1){sum+=ty/W;k++;}}mattr=sum/k;}
      R.lex={n:w.length,mtld:w.length>=50&&fw&&bw?(fw+bw)/2:null,mattr};}
    /* words before the main verb */
    {const pv=sents.filter(s=>s.preV!=null).map(s=>s.preV).sort((a,b)=>a-b);let mx=-1,mi=-1;sents.forEach(s=>{if(s.preV!=null&&s.preV>mx){mx=s.preV;mi=s.i;}});
      R.pre={n:pv.length,median:pv.length?(pv.length%2?pv[(pv.length-1)/2]:(pv[pv.length/2-1]+pv[pv.length/2])/2):null,max:mx<0?null:mx,maxI:mi};}
    /* readability formulas. The text is cleaned first, as Plaven-Sigray et al. (2017) did: bracketed citations, numbers, abbreviations and
       stray single letters are dropped and hyphenated words are split. Sentences left with one word are not counted. */
    {const famil=l=>{l=l.replace(/[’'.]/g,'');if(DALE.has(l))return true;for(const c of lemmas(l))if(DALE.has(c))return true;return false;};
      const CR=/\([^()]*(?:\b(?:19|20)\d\d[a-z]?\b|\bet al\b)[^()]*\)|\[\d[\d,\s–-]*\]|\\[a-zA-Z]*cite[a-zA-Z]*\*?(?:\[[^\]]*\])*\{[^}]*\}/g;let cut=0;
      const prop=(tk,i,fw)=>tk.l!=='i'&&(/[A-Z]/.test(tk.t.slice(1))||(i!==fw&&/^[A-Z]/.test(tk.t)));
      const prose=st=>{const out=[],skip=[];let m,fw=-1;CR.lastIndex=0;while((m=CR.exec(st.text)))skip.push([m.index,m.index+m[0].length]);
        st.T.forEach((tk,i)=>{if(!tk.w){if(tk.cite&&/^-?@/.test(tk.t))cut++;return;}if(fw<0)fw=i;if(tk.cite||skip.some(([a,b])=>tk.s>=a&&tk.e<=b)||/\d/.test(tk.t)||/\./.test(tk.t)||/^[A-Z]{2,}s?$/.test(tk.t)){cut++;return;}
          const proper=prop(tk,i,fw);let any=false;tk.t.replace(/%$/,'').split(/[-\/]/).forEach(p=>{if(!/\p{L}/u.test(p))return;if(p.length===1&&!/^[aAI]$/.test(p))return;any=true;out.push({t:p,l:p.toLowerCase(),proper});});if(!any)cut++;});return out;};
      const typed=st=>{const out=[];let fw=-1;st.T.forEach((tk,i)=>{if(!tk.w)return;if(fw<0)fw=i;out.push({t:tk.t,l:tk.l,proper:prop(tk,i,fw)});});return out;};
      const calc=(lists,minW)=>{let ns=0,nw=0,sy=0,poly=0,ch=0,lett=0,long=0,dhard=0;const hardW=new Map();
        lists.forEach(W=>{if(W.length<minW)return;ns++;W.forEach(w=>{nw++;const k=syl(w.t);sy+=k;if(k>=3)poly++;ch+=(w.t.match(/[\p{L}\p{N}]/gu)||[]).length;const L=(w.t.match(/\p{L}/gu)||[]).length;lett+=L;if(L>6)long++;
          if(DALE.size&&!(/\d/.test(w.t)||w.proper||famil(w.l)||(w.l.indexOf('-')>0&&w.l.split('-').every(famil)))){dhard++;hardW.set(w.l,(hardW.get(w.l)||0)+1);}});});
        if(!ns||!nw)return null;const asl=nw/ns,asw=sy/nw,fk=0.39*asl+11.8*asw-15.59,ari=4.71*(ch/nw)+0.5*asl-21.43,smog=1.043*Math.sqrt(poly*30/ns)+3.1291,
          cl=0.0588*(100*lett/nw)-0.296*(100*ns/nw)-15.8,fog=0.4*(asl+100*poly/nw),lix=asl+100*long/nw,pdw=100*dhard/nw;
        return{fre:206.835-1.015*asl-84.6*asw,fk,ari,smog,cl,fog,lix,long:100*long/nw,
          dale:DALE.size?{pdw,score:0.1579*pdw+0.0496*asl+(pdw>5?3.6365:0),n:nw,hard:[...hardW.entries()].sort((x,y)=>y[1]-x[1]||x[0].localeCompare(y[0])).slice(0,12)}:null,
          lo:Math.min(fk,ari,smog,cl,fog),hi:Math.max(fk,ari,smog,cl,fog),n:ns,words:nw};};
      const X=calc(sents.map(prose),2),raw=calc(sents.map(typed),1);
      if(X){X.cut=cut;X.skipped=n-X.n;X.dict=SYLX.size;X.raw=raw?{fre:raw.fre,fk:raw.fk,ari:raw.ari,smog:raw.smog,cl:raw.cl,fog:raw.fog,lix:raw.lix,lo:raw.lo,hi:raw.hi,words:raw.words}:null;}
      R.read=X||raw||null;}
    /* negation: density, litotes with a plain form, and two negatives in one clause */
    const LIT={uncommon:'common',unlikely:'likely',unusual:'usual',unreasonable:'reasonable',unimportant:'important',unrelated:'related',unlike:'like',infrequent:'frequent',infrequently:'often',inconsiderable:'considerable',inconsistent:'consistent',impossible:'possible',implausible:'plausible',improbable:'probable',dissimilar:'similar',unaware:'aware',unwilling:'willing',unexpected:'expected',unfamiliar:'familiar',unjustified:'justified',irrelevant:'relevant',unhelpful:'helpful',unwelcome:'welcome',without:'with'};
    const LITRE=new RegExp('\\bnot ('+Object.keys(LIT).join('|')+')\\b','gi');let stack=0;
    sents.forEach(st=>{const text=st.text,T=st.T,LC=st.marks.clutter||(st.marks.clutter=[]),took=[];let m;LITRE.lastIndex=0;
      while((m=LITRE.exec(text))){const a=m.index,b=a+m[0].length,pos=LIT[m[1].toLowerCase()];stack++;took.push([a,b]);
        const id=add({lens:'clutter',s:st.i,a,b,sev:2,neg:true,title:'Two negatives for one positive: “'+m[0]+'”',q:'Do you mean “'+pos+'”, or something weaker than that?',detail:'“Not” and “'+m[1]+'” cancel, and the reader has to do the cancelling.',tip:'Say “'+pos+'”. If you mean less than that, hedge it openly: “fairly '+pos+'”, “'+pos+' in some cases”.',fix:{s:st.s+a,e:st.s+b,text:pos}});LC.push({a,b,cls:'hl hb-olive',f:id});}
      const ng=[];T.forEach((tk,i)=>{if(tk.w&&(NEGW.has(tk.l)||/n't$/.test(tk.l))&&!(tk.l==='not'&&T[i+1]&&T[i+1].l==='only')&&!(tk.l==='no'&&T[i+1]&&(T[i+1].t==='.'||T[i+1].l==='longer'||/^\d/.test(T[i+1].t)))&&!(tk.l==='not'&&T[i-1]&&T[i-1].l==='or'))ng.push(i);});
      for(let q=1;q<ng.length;q++){const i=ng[q-1],j=ng[q];if(j-i>10||j-i<2)continue;const mid=T.slice(i+1,j);if(mid.some(tk=>/^[,;:()—–]$/.test(tk.t)||tk.l==='and'||tk.l==='or'||tk.l==='nor'||tk.l==='but'||/^(?:who|whom|whose|which|where|when|while|because|although|if)$/.test(tk.l)))continue;
        const a=T[i].s,b=T[j].e;if(took.some(([x,y])=>a<y&&b>x))continue;stack++;took.push([a,b]);
        const id=add({lens:'clutter',s:st.i,a,b,sev:2,neg:true,title:'Two negatives in one clause: “'+T[i].t+' … '+T[j].t+'”',q:'What are you asserting? Can you say it in the positive?',detail:'The reader has to reverse the meaning twice to find what you claim.',tip:'State what is the case. “No participant failed to finish” becomes “Every participant finished”.'});LC.push({a,b,cls:'hl hb-olive',f:id});break;}});
    R.neg={n:negN,per:per(negN),stack};R.pas={n:pasN,agentless:pasA,states:sents.reduce((a,s)=>a+(s.states||[]).length,0)};
    /* mechanical slips: a few fixed patterns chosen so that a flag is nearly always right */
    let slips=0;const keep=(m,t)=>/^[A-Z]/.test(m)?t.charAt(0).toUpperCase()+t.slice(1):t;
    const CONF=[[/\b(could|should|would|must|might) of\b/gi,m=>m.replace(/ of$/i,' have')],[/\balot\b/gi,()=>'a lot'],[/\bits'(?!\w)/g,()=>'its'],
      [/\b(?:an?|the|no|any|little|main|interaction|treatment|causal|direct|indirect|significant) affects?(?= on\b)/gi,m=>m.replace(/affect/i,'effect')],[/\baffect sizes?\b/gi,m=>m.replace(/affect/i,'effect')],
      [/\bet\. al\.?|\bet al(?![.\w])/g,()=>'et al.'],
      [/\b(?:more|less|fewer|greater|higher|lower|larger|smaller|better|worse|rather|other|older|younger|longer|shorter|stronger|weaker) then\b/gi,m=>m.replace(/then$/i,'than')],
      [/\bprinciple (?:components?|investigators?)\b/gi,m=>m.replace(/principle/i,'principal')],
      [/\bcasual (?:relationships?|effects?|inference|mechanisms?|links?|pathways?|claims?|models?|identification|impact)\b/gi,m=>m.replace(/casual/i,'causal')],
      [/\bstatically significant\b/gi,m=>m.replace(/statically/i,'statistically')],
      [/\bpubic (?:policy|policies|health|opinion|sector|goods?|services?|schools?|administration|sphere|spending|trust|support|housing)\b/gi,m=>m.replace(/pubic/i,'public')],
      [/\b(?:randomi[sz]ed|controlled|clinical|field|pilot) trails?\b/gi,m=>m.replace(/trail/i,'trial')],[/\bmartial status\b/gi,m=>m.replace(/martial/i,'marital')],
      [/\b(?:central|core|basic|key|main|fundamental) tenants? of\b/gi,m=>m.replace(/tenant/i,'tenet')],[/\birregardless\b/gi,()=>'regardless'],
      [/\bdependant variables?\b/gi,m=>m.replace(/dependant/i,'dependent')],[/\bthere (?:findings|study|sample|analysis|participants|own|respective)\b/gi,m=>m.replace(/there/i,'their')]];
    const ABBR=S('pp vs al cf eg ie etc fig figs eq eqs no nos vol ed eds approx ca dr mr mrs ms prof inc ltd co st jr sr ch sec resp viz est min max dept univ et');
    const LOW=S('the this these those we it they there in on at for however our their its he she as when while although because if after before thus therefore moreover furthermore additionally finally');
    const LAB=/^(?:panels?|figures?|figs?|tables?|groups?|parts?|types?|models?|columns?|items?|options?|conditions?|stud(?:y|ies)|sections?|appendix|equations?|steps?|plots?|vitamin|hepatitis|grades?|class(?:es)?|plans?|points?|cases?|scenarios?|versions?|forms?|levels?|categor(?:y|ies))$/i;
    sents.forEach(st=>{const text=st.text,T=st.T,LK=st.marks.checks||(st.marks.checks=[]);let m;
      const slip=(a,b,title,q,detail,tip,fx,lab)=>{slips++;const id=add({lens:'checks',s:st.i,a,b,sev:2,slip:true,title,q,detail,tip,fix:fx==null?undefined:{s:st.s+a,e:st.s+b,text:fx,lab}});LK.push({a,b,cls:'hl hb-olive',f:id});};
      let re=/(\S)( +)([,;!?]|\.(?![\d.]| \.))/g;
      while((m=re.exec(text))){if(m[1]==='.'||m[1]==='…')continue;const a=m.index+1,b=a+m[2].length+1;slip(a,b,'A space before “'+m[3]+'”','Is the space meant?','Punctuation sits against the word before it.','Delete the space.',m[3],'close the gap');}
      re=/[,;](?=[A-Za-z])/g;
      while((m=re.exec(text))){const a=m.index,run=(text.slice(0,a).match(/\S*$/)||[''])[0]+(text.slice(a).match(/^\S*/)||[''])[0];if(/:\/\/|@|www\./.test(run))continue;slip(a,a+2,'No space after “'+m[0]+'”','Is a space missing?','A comma or semicolon is followed by a space.','Add the space.',m[0]+' '+text.charAt(a+1),'add a space');}
      re=/,,|;;|(?<![.…])\.\.(?![.…])/g;
      while((m=re.exec(text))){slip(m.index,m.index+2,'Doubled punctuation: “'+m[0]+'”','Is one of these a slip of the finger?','The same mark is typed twice.','Delete one.',m[0].charAt(0),'keep one');}
      re=/([a-z]{2,})\. +([a-z]+)\b/g;
      while((m=re.exec(text))){if(ABBR.has(m[1])||!LOW.has(m[2]))continue;const a=m.index+m[0].length-m[2].length;slip(a,a+m[2].length,'A full stop, then a lower-case “'+m[2]+'”','Does a new sentence start here?','After a full stop the next sentence starts with a capital. If this is an abbreviation, mark the note as checked.','Capitalise the word, or change the full stop to a comma.',m[2].charAt(0).toUpperCase()+m[2].slice(1),'capitalise it');}
      for(let i=0;i+1<T.length;i++){const tk=T[i],nx=T[i+1];if(!tk.w||!nx.w||!/^\s+$/.test(text.slice(tk.e,nx.s)))continue;
        if(tk.l==='a'&&/^[aeio][a-z]{3,}$/.test(nx.l)&&!/^(?:one|once|eu|ewe|oui|oaxa)/.test(nx.l)&&!isFunc(nx.l)&&!(T[i-1]&&T[i-1].w&&LAB.test(T[i-1].t))&&!(T[i-1]&&T[i-1].t==='('))slip(tk.s,nx.e,'“'+tk.t+' '+nx.t+'”','Should this be “an”?','“An” comes before a vowel sound.','Change “a” to “an”.',keep(tk.t,'an')+' '+nx.t,'change to “an”');
        else if(tk.l==='an'&&!(tk.t==='An'&&i>0)&&/^[bcdfgjklmnpqrstvwyz][a-z]{2,}$/.test(nx.l)&&(nx.t===nx.l||nx.t===nx.l.charAt(0).toUpperCase()+nx.l.slice(1))&&!(tk.t==='An'&&/^[A-Z]/.test(nx.t)))slip(tk.s,nx.e,'“'+tk.t+' '+nx.t+'”','Should this be “a”?','“A” comes before a consonant sound. If the next word is spelled out letter by letter, mark the note as checked.','Change “an” to “a”.',keep(tk.t,'a')+' '+nx.t,'change to “a”');}
      CONF.forEach(([rx,fn])=>{rx.lastIndex=0;while((m=rx.exec(text))){const to=keep(m[0],fn(m[0]));slip(m.index,m.index+m[0].length,'Likely slip: “'+m[0].trim()+'”','Did you mean “'+to.trim()+'”?','Both words are real, so a spelling checker passes this.','Change it, or mark the note as checked if you meant what you wrote.',to,'change to “'+to.trim()+'”');}});});
    body.forEach(p=>{const t=raw.slice(p.s,p.e),at=pos=>sents.find(st=>st.s<=pos&&pos<st.e)||sents[p.sents[0]];
      const flag=(pos,title,detail)=>{const st=at(pos),a=pos-st.s;if(a<0||a>=st.text.length)return;slips++;const id=add({lens:'checks',s:st.i,a,b:a+1,sev:2,slip:true,title,q:'Where should its partner go?',detail,tip:'Add the missing mark, or delete this one.'});(st.marks.checks||(st.marks.checks=[])).push({a,b:a+1,cls:'hl hb-olive',f:id});};
      [['(',')'],['[',']'],['“','”']].forEach(([o,c])=>{const stk=[];let bad=-1;for(let i=0;i<t.length;i++){const ch=t[i];if(ch===o)stk.push(i);else if(ch===c){if(stk.length)stk.pop();else if(bad<0&&!(c===')'&&/(?:^|\s)[A-Za-z0-9]{1,3}$/.test(t.slice(Math.max(0,i-4),i))))bad=i;}}
        if(bad>=0)flag(p.s+bad,'A “'+c+'” with no “'+o+'” before it','This paragraph closes a bracket or quotation that it never opened.');else if(stk.length)flag(p.s+stk[0],'A “'+o+'” that is never closed','This paragraph opens a bracket or quotation and does not close it.');});
      const dq=[];for(let i=0;i<t.length;i++)if(t[i]==='"')dq.push(i);if(dq.length%2)flag(p.s+dq[dq.length-1],'An odd number of quotation marks','This paragraph has '+dq.length+' straight quotation '+(dq.length===1?'mark':'marks')+', so one has no partner.');
      if(p.sents.length>=2){const st=sents[p.sents[p.sents.length-1]],tt=st.text.replace(/\s+$/,'');if(st.nW>=8&&!/[.!?:;”"’')\]…]$/.test(tt)){slips++;const a=tt.length-1,id=add({lens:'checks',s:st.i,a,b:a+1,sev:2,slip:true,title:'The paragraph ends with no full stop',q:'Is the sentence finished?',detail:'The last sentence of this paragraph has no closing punctuation.',tip:'Add the full stop.',fix:{s:st.s+tt.length-1,e:st.s+tt.length,text:tt.charAt(tt.length-1)+'.',lab:'add a full stop'}});(st.marks.checks||(st.marks.checks=[])).push({a,b:a+1,cls:'hl hb-olive',f:id});}}});
    R.slips=slips;
    /* the point of each paragraph, in the writer's words: is it at an edge? */
    let pg=0,pok=0;
    body.forEach(p=>{p.point=null;const txt=((opts.points||[])[p.ord]||'').trim();if(!txt||!p.sents.length)return;const ks=[];tokenize(txt).forEach(tk=>{if(!isContent(tk))return;const k=stem(tk.l);if(!ks.some(x=>x.k===k))ks.push({k,w:tk.l});});if(!ks.length)return;
      const f=sents[p.sents[0]],l=sents[p.sents[p.sents.length-1]],has=(st,k)=>st.cw.some(c=>near(c.k,k)),o=ks.filter(x=>has(f,x.k)).length/ks.length,c=ks.filter(x=>has(l,x.k)).length/ks.length,any=ks.filter(x=>!p.sents.some(i=>has(sents[i],x.k))).map(x=>x.w);
      p.point={text:txt,n:ks.length,open:o,close:c,ok:o>=0.5||c>=0.5,missing:any};pg++;if(p.point.ok)pok++;
      else add({lens:'outline',s:f.i,a:null,sev:2,title:'The point you named is not at either edge of paragraph '+(p.ord+1),q:'If a reader took in only the first and last sentences, would they get this point?',detail:'You wrote that the point is “'+(txt.length>90?txt.slice(0,88)+'…':txt)+'”. Fewer than half of its content words are in the opening sentence, and fewer than half are in the last.'+(any.length?' Not in the paragraph at all: '+any.join(', ')+'.':''),tip:'Open the paragraph with the point, or close on it. Use the same words for it that you used in the box.'});});
    R.points={given:pg,ok:pok,of:body.length};
    /* phrase load, nominalisations and plain counts */
    {let stacks=0,chains=0,noms=0,nomNotes=0,letters=0,p1=0,p2=0,p3=0;const P1=S('i me my mine myself we us our ours ourselves'),P2=S('you your yours yourself yourselves'),P3=S('he him his she her hers it its they them their theirs himself herself itself themselves');
      findings.forEach(f=>{if(f.lens==='dense'){if(f.title==='Noun stack')stacks++;else if(f.title==='Chain of prepositions')chains++;}else if(f.lens==='action'&&f.title==='The action is in a noun')nomNotes++;});
      sents.forEach(st=>st.T.forEach(tk=>{if(!tk.w)return;if(isNom(tk.l))noms++;letters+=(tk.t.match(/\p{L}/gu)||[]).length;if(P1.has(tk.l))p1++;else if(P2.has(tk.l))p2++;else if(P3.has(tk.l))p3++;}));
      R.phrase={stacks,chains,per:nWd?100*(stacks+chains)/nWd:0,noms,nomNotes,nomPer:nWd?100*noms/nWd:0};
      R.simple={lpw:nWd?letters/nWd:0,spp:body.length?n/body.length:0,wpp:body.length?nWd/body.length:0,p1,p2,p3};}
    /* the writer's own word list: lines to track, and lines starting with - to avoid */
    {const mine=[];(opts.list||'').split(/[\n,]/).slice(0,200).forEach(raw0=>{let w=raw0.trim(),avoid=false;if(/^[-!]/.test(w)){avoid=true;w=w.slice(1).trim();}if(!w||w.length>80||!/[\p{L}\p{N}]/u.test(w))return;
        const body2=w.split(/\s+/).map(x=>x.replace(/[.+?^${}()|[\]\\]/g,'\\$&').replace(/\*/g,"[\\p{L}\\p{N}'’-]*")).join('\\s+');let re;try{re=new RegExp('(?<![\\p{L}\\p{N}])'+body2+'(?![\\p{L}\\p{N}])','giu');}catch(e){return;}
        mine.push({w,avoid,re,count:0,sents:[]});});
      if(mine.length)sents.forEach(st=>{const LT=st.marks.terms||(st.marks.terms=[]);mine.forEach(e=>{e.re.lastIndex=0;let m;while((m=e.re.exec(st.text))){if(!m[0]){e.re.lastIndex++;continue;}const a=m.index,b=a+m[0].length;e.count++;if(!e.sents.includes(st.i))e.sents.push(st.i);
          if(e.avoid){const id=add({lens:'terms',s:st.i,a,b,sev:2,title:'On your avoid list: “'+m[0]+'”',q:'You listed this as wording to avoid. What would you write instead?',detail:'It matches “'+e.w+'” on your own word list.',tip:'Replace it, or mark the note as checked if it belongs here.'});LT.push({a,b,cls:'hl hb-amber',f:id});}
          else LT.push({a,b,cls:'ul hu-violet',tip:'On your word list: “'+e.w+'”.'});}});});
      R.mine=mine.map(e=>({w:e.w,avoid:e.avoid,count:e.count,sents:e.sents}));}
    /* overlap with a source the writer pastes: runs of shared words, and the source's key terms */
    {const SN=5,stx=(opts.source||'').trim();R.source=null;
      if(stx){const sT=tokenize(stx),sw=sT.filter(t=>t.w).map(t=>t.l),grams=new Set();for(let i=0;i+SN<=sw.length;i++)grams.add(sw.slice(i,i+SN).join(' '));
        let shared=0,runs=0,quoted=0;
        if(grams.size)sents.forEach(st=>{const W=[];st.T.forEach((tk,i)=>{if(tk.w)W.push(i);});const cov=new Array(W.length).fill(false);
          for(let i=0;i+SN<=W.length;i++){let key='';for(let k=0;k<SN;k++)key+=(k?' ':'')+st.T[W[i+k]].l;if(grams.has(key))for(let k=0;k<SN;k++)cov[i+k]=true;}
          let i=0;while(i<W.length){if(!cov[i]){i++;continue;}let j=i;while(j+1<W.length&&cov[j+1])j++;const a=st.T[W[i]].s,b=st.T[W[j]].e,len=j-i+1;shared+=len;
            const bef=st.text.slice(0,a).replace(/\s+$/,'').slice(-1),aft=st.text.slice(b).replace(/^[\s.,;:!?]+/,'').charAt(0),q=/[“"‘]/.test(bef)&&/[”"’]/.test(aft),LT=st.marks.terms||(st.marks.terms=[]);
            if(q){quoted++;LT.push({a,b,cls:'ul hu-teal',tip:len+' words match your source, inside quotation marks.'});}
            else{runs++;const tx=st.text.slice(a,b),id=add({lens:'terms',s:st.i,a,b,sev:2,title:len+' words in a row match your source',q:'Are you quoting here?',detail:'“'+(tx.length>110?tx.slice(0,108)+'…':tx)+'” appears word for word in the source you pasted.',tip:'If you are quoting, use quotation marks and cite the source. If not, put the source away and say the point in a sentence of your own, with your own structure.'});LT.push({a,b,cls:'hl hb-amber',f:id});}
            i=j+1;}});
        const sf=new Map(),s0=new Map();sT.forEach(tk=>{if(!isContent(tk))return;const k=stem(tk.l);sf.set(k,(sf.get(k)||0)+1);if(!s0.has(k))s0.set(k,tk.l);});
        const dk=[...freq.keys()],key=[...sf.entries()].filter(x=>x[1]>=2).sort((x,y)=>y[1]-x[1]).slice(0,12).map(([k,c])=>({w:s0.get(k),c,used:freq.has(k)||dk.some(d=>near(d,k))}));
        R.source={n:sw.length,N:SN,shared,share:nWd?shared/nWd:0,runs,quoted,key};}}

    /* general science jargon (Plaven-Sigray et al. 2017): word forms, matched as typed */
    {const cnt=new Map(),first=new Map();let jn=0,jw=0;if(JARGON.size)sents.forEach(st=>st.T.forEach(tk=>{if(!tk.w||!/^\p{L}/u.test(tk.t))return;jw++;if(!JARGON.has(tk.l))return;jn++;cnt.set(tk.l,(cnt.get(tk.l)||0)+1);if(!first.has(tk.l))first.set(tk.l,st.i);}));
      R.jargon=JARGON.size?{n:jn,of:jw,share:jw?jn/jw:0,types:cnt.size,list:JARGON.size,words:[...cnt.entries()].sort((x,y)=>y[1]-x[1]||x[0].localeCompare(y[0])).slice(0,16).map(([w,c])=>({w,c,s:first.get(w)}))}:null;}
    /* running-word coverage by the two word lists; proper nouns are counted apart (Nation 2006) */
    {let cn0=0,cg=0,ca=0,co=0,cp=0;
      sents.forEach(st=>{let fw=-1;st.T.forEach((tk,i)=>{if(!tk.w)return;if(fw<0)fw=i;if(!/^\p{L}[\p{L}'’-]*$/u.test(tk.t))return;cn0++;
        if(tk.l!=='i'&&(/[A-Z]/.test(tk.t.slice(1))||(i!==fw&&/^[A-Z]/.test(tk.t)))){cp++;return;}
        const lv=wordLevel(tk.l);if(lv<=0)cg++;else if(lv===1)ca++;else co++;});});
      R.cover={n:cn0,ngsl:cg,nawl:ca,off:co,proper:cp,share:cn0?(cg+ca)/cn0:0,shareP:cn0?(cg+ca+cp)/cn0:0};}
    /* thematic progression: where the opening of each sentence comes from (Danes 1974) */
    {const BACK=S('it they this these those he she such both each'),tot={constant:0,linear:0,ret:0,named:0,ref:0,fresh:0};let tn=0;
      const split=st=>{const th=new Set(),rh=new Set(),v=st.vTok!=null&&st.vTok>=0?st.vTok:(st.topic?st.topic[1]+1:0);st.cw.forEach(c=>{(c.i<v?th:rh).add(c.k);});let fw=null;for(const tk of st.T){if(tk.w){fw=tk.l;break;}}
        return{th,rh,named:!!st.shell,back:fw!=null&&BACK.has(fw),we:fw==='we'||fw==='i'||fw==='our'||fw==='my'};};
      const hit=(a,b)=>{for(const k of a)if(b.has(k))return k;return null;};
      body.forEach(p=>{p.prog=null;if(p.sents.length<2)return;const parts=p.sents.map(i=>split(sents[i])),seq=[],cnt={constant:0,linear:0,ret:0,named:0,ref:0,fresh:0};
        for(let q=1;q<parts.length;q++){const c=parts[q],pv=parts[q-1];let kind='fresh',k=null;
          if((k=hit(c.th,pv.th))||(c.we&&pv.we&&!c.th.size))kind='constant';else if((k=hit(c.th,pv.rh)))kind='linear';
          else{for(let z=q-2;z>=0&&!k;z--)k=hit(c.th,parts[z].th)||hit(c.th,parts[z].rh);if(k)kind='ret';else if(c.named)kind='named';else if(c.back)kind='ref';}
          seq.push({i:p.sents[q],kind,w:k?wOf.get(k)||k:null});cnt[kind]++;tot[kind]++;tn++;sents[p.sents[q]].prog=kind;}
        const m=seq.length;p.prog={seq,cnt,label:cnt.constant>=m/2&&cnt.constant>cnt.linear?'constant':cnt.linear>=m/2&&cnt.linear>cnt.constant?'linear':cnt.fresh>m/2?'fresh':'mixed'};});
      R.prog=Object.assign({n:tn},tot);}
    /* where the connective sits: before the main verb, after it, or absent */
    {let b=0,a=0,z=0;sents.forEach(st=>{if(!st.conn.length){z++;st.trans='none';return;}const v=st.vTok!=null&&st.vTok>=0?st.T[st.vTok].s:Infinity;if(st.conn.some(c=>c.a<v)){b++;st.trans='before';}else{a++;st.trans='after';}});R.trans={before:b,after:a,none:z,n};}
    /* words on the excess-vocabulary list of Kobak et al. (2025): style words only, function words set aside */
    {const cnt=new Map();let xn=0;const XS=[...EXCESS].filter(w=>!isFunc(w)&&w.length>3);const XSet=new Set(XS);
      if(XSet.size)sents.forEach(st=>{const LW=st.marks.worn||(st.marks.worn=[]);st.T.forEach(tk=>{if(!tk.w||!XSet.has(tk.l))return;xn++;cnt.set(tk.l,(cnt.get(tk.l)||0)+1);
        if(wordLevel(tk.l)===2&&!LW.some(m=>m.a<tk.e&&tk.s<m.b))LW.push({a:tk.s,b:tk.e,cls:'ul hu-ink',tip:'On the list of words that became much more common in research abstracts in 2023 and 2024 (Kobak et al. 2025). The word itself is fine. Ask whether it is the word you would have chosen.'});});});
      R.excess=XSet.size?{n:xn,per:per(xn),types:cnt.size,list:XSet.size,words:[...cnt.entries()].sort((x,y)=>y[1]-x[1]||x[0].localeCompare(y[0])).slice(0,14)}:null;}
    /* promotional adjectives, in the eight groups of Millar, Batalo & Budgell (2022) */
    {const by={},cnt=new Map();let hn=0;Object.keys(HYPE).forEach(k=>{by[k]=0;});
      sents.forEach(st=>{const LC=st.marks.claims||(st.marks.claims=[]),stat=/\bp\s*[<=>]|\bstatistically\b|\bsignificance\b/i.test(st.text);st.T.forEach((tk,i)=>{if(!tk.w)return;const cat=HYPEOF.get(tk.l);if(!cat)return;
        if(tk.l==='significant'&&stat)return;if(tk.l==='first'){const nx=st.T[i+1];if(!nx||!nx.w||!/^(?:study|studies|evidence|report|demonstration|time|to|systematic|comprehensive|direct|empirical|large-scale)$/.test(nx.l))return;}
        if((tk.l==='key'||tk.l==='quality'||tk.l==='top'||tk.l==='major'||tk.l==='senior'||tk.l==='ready'||tk.l==='rich'||tk.l==='strong'||tk.l==='broad'||tk.l==='international'||tk.l==='scientific'||tk.l==='immediate')&&!(st.T[i+1]&&st.T[i+1].w&&!isFunc(st.T[i+1].l)))return;
        hn++;by[cat]++;cnt.set(tk.l,(cnt.get(tk.l)||0)+1);
        if(!LC.some(m=>m.a<tk.e&&tk.s<m.b))LC.push({a:tk.s,b:tk.e,cls:'ul hu-amber',tip:'An adjective that often promotes (group: '+cat+'; Millar, Batalo & Budgell 2022). Could you delete it, or swap in a neutral word, and lose no information?'});});});
      R.hype={n:hn,per:per(hn),by,words:[...cnt.entries()].sort((x,y)=>y[1]-x[1]||x[0].localeCompare(y[0])).slice(0,14).map(([w,c])=>[w,c,HYPEOF.get(w)])};}
    /* stance and engagement, in the categories of Hyland (2005); the word lists are this page's own */
    {let hd=0,bo=0,you=0,dir=0,qn=0,shared=0;
      sents.forEach(st=>{const text=st.text,LH=st.marks.hedge||(st.marks.hedge=[]);let m,fw=null;const put=(a,b,cls,tip)=>{if(!LH.some(x=>x.a<b&&a<x.b))LH.push({a,b,cls,tip});};
        st.T.forEach(tk=>{if(!tk.w)return;if(fw==null)fw=tk;if(HEDGE.has(tk.l))hd++;else if(BOOSTW.has(tk.l)){bo++;put(tk.s,tk.e,'ul hu-amber','A booster: a word that raises the certainty of the claim (Hyland 2005).');}else if(tk.l==='you'||tk.l==='your'||tk.l==='yours'){you++;put(tk.s,tk.e,'ul hu-blue','This addresses the reader directly (Hyland 2005).');}});
        HEDGEP.lastIndex=0;while((m=HEDGEP.exec(text)))hd++;
        BOOSTP.lastIndex=0;while((m=BOOSTP.exec(text))){bo++;put(m.index,m.index+m[0].length,'ul hu-amber','A booster: wording that raises the certainty of the claim (Hyland 2005).');}
        if(fw&&DIRW.has(fw.l)&&/^[A-Z]/.test(fw.t)){dir++;put(fw.s,fw.e,'ul hu-blue','A directive: it tells the reader to do something (Hyland 2005).');}
        DIRP.lastIndex=0;while((m=DIRP.exec(text))){dir++;put(m.index,m.index+m[0].length,'ul hu-blue','A directive: it tells the reader what to do or what matters (Hyland 2005).');}
        SHAREP.lastIndex=0;while((m=SHAREP.exec(text))){shared++;put(m.index,m.index+m[0].length,'ul hu-blue','An appeal to shared knowledge: it treats the point as something the reader already accepts (Hyland 2005).');}
        if(/\?["”’)]*\s*$/.test(text))qn++;});
      R.stance={hedge:hd,boost:bo,hper:per(hd),bper:per(bo),eng:{you,dir,q:qn,shared}};}
    /* word sequences: four-word runs the draft repeats, and common academic formulas by function (Biber, Conrad & Cortes 2004) */
    {const g4=new Map(),fc={ref:0,stance:0,org:0},found=new Map();
      sents.forEach(st=>{const W=st.T.filter(t=>t.w).map(t=>t.l);for(let i=0;i+4<=W.length;i++){const k=W.slice(i,i+4).join(' ');g4.set(k,(g4.get(k)||0)+1);}
        const low=' '+W.join(' ')+' ';Object.keys(FORMULA).forEach(f=>FORMULA[f].forEach(ph=>{let at=low.indexOf(' '+ph+' ');while(at>=0){fc[f]++;found.set(ph,(found.get(ph)||0)+1);at=low.indexOf(' '+ph+' ',at+1);}}));});
      const rep=[...g4.entries()].filter(x=>x[1]>=2).sort((x,y)=>y[1]-x[1]||x[0].localeCompare(y[0])),pick=[];
      rep.forEach(([k,c])=>{if(pick.length>=8)return;const w=k.split(' ');if(pick.some(([q])=>{const v=q.split(' ');return v.slice(1).join(' ')===w.slice(0,3).join(' ')||w.slice(1).join(' ')===v.slice(0,3).join(' ');}))return;pick.push([k,c]);});
      const fn=fc.ref+fc.stance+fc.org;R.bundles={rep:rep.length,grams:pick,form:fc,n:fn,per:per(fn),found:[...found.entries()].sort((x,y)=>y[1]-x[1]||x[0].localeCompare(y[0])).slice(0,10)};}
    /* GRIM: can a mean of whole-number scores from N people come out at this value? (Brown & Heathers 2017) */
    {let gt=0,gf=0;const NRE=/\b[Nn]\s*=\s*(\d{1,4})\b|\b(\d{1,4})\s+(?:participants|respondents|students|people|subjects|children|adults|patients|women|men|teachers|employees|workers|pupils|interviewees|learners|users|voters|nurses|individuals)\b/g,
        MRE=/\b(?:M|[Mm]ean(?: [a-z-]+){0,3}?|[Aa]verage(?: [a-z-]+){0,3}?)\s*(?:=|:|of|was|is)\s*(\d+\.(\d{1,2}))(?!\d)/g;
      sents.forEach(st=>{const text=st.text,Ns=new Set();let m;NRE.lastIndex=0;while((m=NRE.exec(text)))Ns.add(+(m[1]||m[2]));if(Ns.size!==1)return;const N=[...Ns][0];if(N<2)return;
        MRE.lastIndex=0;while((m=MRE.exec(text))){const d=m[2].length,mean=parseFloat(m[1]);if(N>=Math.pow(10,d))continue;gt++;const x=mean*N,tol=0.5*Math.pow(10,-d)+1e-9,lo=Math.floor(x),hi=Math.ceil(x);
          if(Math.abs(lo/N-mean)<=tol||Math.abs(hi/N-mean)<=tol)continue;gf++;
          const a=m.index+m[0].length-m[1].length,b=m.index+m[0].length,nr=[...new Set([lo/N,hi/N].map(v=>v.toFixed(d)))].join(' and ');
          const id=add({lens:'checks',s:st.i,a,b,sev:2,title:'A mean of '+m[1]+' with N = '+N,q:'Is each score a whole number, and did all '+N+' people give one?',
            detail:'If '+N+' people each give a whole-number score, their mean is a whole number divided by '+N+'. No such mean rounds to '+m[1]+'. The nearest are '+nr+'. This is the GRIM test (Brown & Heathers 2017). A mean from a scale that averages several items, or from fewer people than the N in this sentence, can still be right.',
            tip:'Check the mean and the N against your data. If the scores are not whole numbers, or the scale averages several items, mark the note as checked.'});
          (st.marks.checks||(st.marks.checks=[])).push({a,b,cls:'hl hb-olive',f:id});}});
      R.grim={tested:gt,flagged:gf};}
    /* sentence-by-sentence series for the load map, and lexical density: the share of words that carry content (Ure 1971) */
    {const ser={len:[],pre:[],ld:[],long:[],fresh:[],nom:[],conn:[],pas:[]};let cwT=0;
      sents.forEach(st=>{let lg=0,nm=0;st.longI=[];st.nomI=[];st.T.forEach((tk,ti)=>{if(!tk.w||tk.cite)return;if((tk.t.match(/\p{L}/gu)||[]).length>6){lg++;st.longI.push(ti);}if(isNom(tk.l)){nm++;st.nomI.push(ti);}});
        const nw=st.nW||1,fr=st.cw.filter(c=>!c.old).length;st.ld=st.cw.length/nw;cwT+=st.cw.length;
        ser.len.push(st.nW);ser.pre.push(st.preV==null?null:st.preV);ser.ld.push(st.nW>=5?100*st.ld:null);ser.long.push(st.nW>=5?100*lg/nw:null);ser.fresh.push(st.cw.length?100*fr/st.cw.length:null);ser.nom.push(nm);ser.conn.push(st.conn.length);ser.pas.push((st.passives||[]).length);});
      body.forEach(p=>{let c=0,w=0;p.sents.forEach(i=>{c+=sents[i].cw.length;w+=sents[i].nW;});p.ld=w?c/w:0;});
      const v=ser.ld.filter(x=>x!=null).sort((a,b)=>a-b);let mi=-1,mx=-1;ser.ld.forEach((x,i)=>{if(x!=null&&x>mx){mx=x;mi=i;}});
      R.ld={all:nWd?100*cwT/nWd:0,median:v.length?v[Math.floor(v.length/2)]:null,min:v.length?v[0]:null,max:mx<0?null:mx,maxI:mi};R.series=ser;}
    R.refs=refCheck;R.blocks={};paras.forEach(p=>{if(p.head&&p.kind&&p.kind!=='heading')R.blocks[p.kind]=(R.blocks[p.kind]||0)+1;});
    R.point={named:sents.filter(s=>s.shell).length,bare:findings.filter(f=>/ what\?$/.test(f.title)).length};
    return R;})();
  findings.forEach(f=>{if(!f.q)f.q=Q(f);f.para=!!f.para||/^(outline|tracer|jobs|signals)$/.test(f.lens)||/^(New characters|Every sentence|Tense changes)/.test(f.title);f.sig=f.lens==='sv'?'sv':f.claim?'claims|'+f.title.split('”')[0]:f.lens+'|'+f.title;if(!f.pb)f.pb=pbFor(f);const pv=f.s>0?sents[f.s-1]:null,pw=pv?[...new Set(pv.cw.map(c=>pv.T[c.i].t).filter(w=>!/(ed|ly)$/i.test(w)))].slice(-4):[];if(f.starters&&!f.starters.length){f.starters=pw;f.prevTerms=true;}if(f.lens==='openers'&&/what\?$/.test(f.title)){const dm=f.title.split(' ')[0],plural=/^(these|those)$/i.test(dm),ns=[];
      /* the action of the sentence before, as a noun: "trust declined" gives "this decline" */
      if(pv&&!plural){const vi=pv.ve>=0?pv.ve:pv.v,fm=vi>=0?FORMS.get(pv.T[vi].l):null,b=fm?fm.b:null;let n=b?(NOUNOF[b]||null):null;if(!n&&b)for(const k in NOMX)if(NOMX[k]===b){n=k;break;}if(n)ns.push(n);}
      pw.slice().reverse().forEach(w=>{const fm=FORMS.get(w.toLowerCase());if(fm&&!AMBIG.has(fm.b))return;if(ns.length<4&&!ns.some(x=>x.toLowerCase()===w.toLowerCase())&&(!plural||/s$/.test(w))&&(plural||!/[^s]s$/.test(w)))ns.push(w);});
      f.nouns=ns;if(ns.length)f.tip='Add the noun it stands for. From the sentence before: '+ns.slice(0,2).map(n=>'“'+dm+' '+n.toLowerCase()+'…”').join(', ')+'.';}});
  /* lens moves: empty openers sit with clutter; typing slips and source matches have lenses of their own */
  {const isRep=f=>f&&f.lens==='worn'&&/^Repeated word/.test(f.title),isSrc=f=>f&&f.lens==='terms'&&/match your source$/.test(f.title);
    sents.forEach(st=>{const M=st.marks,mv=(from,to,test)=>{if(!M[from])return;const keep=[];M[from].forEach(m=>{if(test(m))(M[to]||(M[to]=[])).push(m);else keep.push(m);});M[from]=keep;};
      mv('openers','clutter',()=>true);mv('checks','slips',m=>m.f!=null&&findings[m.f]&&!!findings[m.f].slip);mv('worn','slips',m=>m.f!=null&&isRep(findings[m.f]));
      mv('terms','source',m=>(m.f!=null&&isSrc(findings[m.f]))||(m.tip&&/match your source/.test(m.tip)));});
    findings.forEach(f=>{const to=f.lens==='openers'?'clutter':f.slip||isRep(f)?'slips':isSrc(f)?'source':null;if(to){f.from=f.lens;f.lens=to;}});
    if(research)research.slips=findings.filter(f=>f.lens==='slips').length;}
  findings.sort((a,b)=>a.s-b.s||(a.a==null?-1:a.a)-(b.a==null?-1:b.a));
  const nW=sents.reduce((a,s)=>a+s.nW,0);
  const vocabOut={n:vc.n,l:vc.l,top:[...vc.off.entries()].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).slice(0,40)};
  const rAll=rstat(sents.map(s=>s.nW),sents.map(s=>s.preV));rAll.npvi=rPairN?100*rPair/rPairN:null;
  return{paras,sents,findings,tracer,terms,jobs:jobsOut,vocab:vocabOut,grid,moves:movesOut,research,rhythm:{all:rAll,flat:flatN},stats:{nS:sents.length,nW,avg:sents.length?nW/sents.length:0,max:sents.reduce((a,s)=>Math.max(a,s.nW),0)}};
}
/* what kind of change a rewrite made: wording only, or content added and removed (after Faigley & Witte 1981) */
function revKind(a,b){const ks=t=>{const m=new Map();tokenize(t).forEach(tk=>{if(isContent(tk)){const k=stem(tk.l);if(!m.has(k))m.set(k,tk.l);}});return m;},A=ks(a),B=ks(b),
  has=(M,k)=>{if(M.has(k))return true;for(const x of M.keys())if(near(x,k))return true;return false;},added=[],removed=[];
  B.forEach((w,k)=>{if(!has(A,k))added.push(w);});A.forEach((w,k)=>{if(!has(B,k))removed.push(w);});
  return{kind:!added.length&&!removed.length?'surface':added.length&&removed.length?'both':added.length?'add':'cut',added,removed};}
/* optional word norms. The files are read as published; nothing in them is changed. */
function parseNorms(src){const N={conc:new Map(),aoa:new Map(),zipf:new Map(),prev:new Map()},lines=t=>(t||'').replace(/^﻿/,'').split(/\r?\n/).slice(1);
  const phi=z=>{const t=1/(1+0.2316419*Math.abs(z)),d=0.3989423*Math.exp(-z*z/2),p=d*t*(0.3193815+t*(-0.3565638+t*(1.781478+t*(-1.821256+t*1.330274))));return z>=0?1-p:p;};
  lines(src.conc).forEach(l=>{const c=l.split('\t');if(c.length>2&&c[1]==='0'){const v=+c[2];if(v)N.conc.set(c[0].toLowerCase(),v);}});
  lines(src.aoa).forEach(l=>{const c=l.split(','),v=+c[4];if(c[0]&&v)N.aoa.set(c[0].toLowerCase(),v);});
  lines(src.freq).forEach(l=>{const c=l.split(','),v=+c[c.length-1];if(c[0]&&v)N.zipf.set(c[0].toLowerCase(),v);});
  lines(src.prev).forEach(l=>{const c=l.split('\t');if(c[0]&&c[1]!==undefined&&c[1]!=='')N.prev.set(c[0].toLowerCase(),phi(+c[1]));});
  return N;}
function norms(A,N){const look=(M,l)=>{let v=M.get(l);if(v!=null)return v;for(const c of lemmas(l)){v=M.get(c);if(v!=null)return v;}return null;};
  const acc=()=>({n:0,sum:0,miss:0}),C=acc(),Ao=acc(),Z=acc(),P=acc(),seen=new Map(),per=[],perA=[];let lowP=0,rare=0;
  A.sents.forEach(st=>{let fw=-1,sc=0,sn=0,sa=0,an=0;const cwI=new Set(st.cw.map(c=>c.i));
    st.T.forEach((tk,i)=>{if(!tk.w)return;if(fw<0)fw=i;if(!/^[a-z][a-z'’-]*$/i.test(tk.t))return;if(tk.l!=='i'&&(/[A-Z]/.test(tk.t.slice(1))||(i!==fw&&/^[A-Z]/.test(tk.t))))return;
      const l=tk.l.replace(/[’']s$/,'').replace(/[’']/g,''),zz=look(N.zipf,l);if(zz!=null){Z.n++;Z.sum+=zz;if(zz<3)rare++;}else{Z.miss++;rare++;}
      if(!cwI.has(i))return;let e=seen.get(l);if(!e){e={w:l,c:0,conc:look(N.conc,l),aoa:look(N.aoa,l),prev:look(N.prev,l),zipf:zz,s:st.i};seen.set(l,e);}e.c++;
      if(e.conc!=null){C.n++;C.sum+=e.conc;sc+=e.conc;sn++;}else C.miss++;
      if(e.aoa!=null){Ao.n++;Ao.sum+=e.aoa;sa+=e.aoa;an++;}else Ao.miss++;
      if(e.prev!=null){P.n++;P.sum+=e.prev;if(e.prev<0.9)lowP++;}else P.miss++;});
    per.push(sn>=3?sc/sn:null);perA.push(an>=3?sa/an:null);});
  const W=[...seen.values()],top=(f,dir,k)=>W.filter(e=>e[f]!=null).sort((a,b)=>dir*(a[f]-b[f])||a.w.localeCompare(b.w)).slice(0,k).map(e=>({w:e.w,v:e[f],s:e.s})),mean=a=>a.n?a.sum/a.n:null;
  return{conc:{mean:mean(C),n:C.n,miss:C.miss,low:top('conc',1,8)},aoa:{mean:mean(Ao),n:Ao.n,miss:Ao.miss,high:top('aoa',-1,8)},zipf:{mean:mean(Z),n:Z.n,miss:Z.miss,rare,low:top('zipf',1,8)},
    prev:{mean:mean(P),n:P.n,miss:P.miss,under90:lowP,low:top('prev',1,8)},abstract:per.map((v,i)=>({i,v})).filter(x=>x.v!=null).sort((a,b)=>a.v-b.v).slice(0,3),hardest:perA.map((v,i)=>({i,v})).filter(x=>x.v!=null).sort((a,b)=>b.v-a.v).slice(0,3),sent:per,sentAoa:perA};}
/* ---------- a Word file, written here without a library ----------
   A .docx is a ZIP of small XML parts. The parts are stored uncompressed, so the only arithmetic is a CRC.
   blocks: [{style, text, marks:[{a,b,id}]}]   style is Normal, Title, Heading1 to Heading6, Quote or Code
   comments: [{id, lines:[{t, b, i}]}]         each line is one paragraph of the comment; b bold, i italic */
const CRCT=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0;}return t;})();
const crc32=u=>{let c=0xFFFFFFFF;for(let i=0;i<u.length;i++)c=CRCT[(c^u[i])&255]^(c>>>8);return(c^0xFFFFFFFF)>>>0;};
function zipStore(files){const enc=new TextEncoder(),parts=[],cd=[];let off=0;
  files.forEach(f=>{const nm=enc.encode(f.name),d=typeof f.data==='string'?enc.encode(f.data):f.data,crc=crc32(d),lh=new Uint8Array(30+nm.length),v=new DataView(lh.buffer);
    v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint16(6,0x0800,true);v.setUint16(12,0x21,true);v.setUint32(14,crc,true);v.setUint32(18,d.length,true);v.setUint32(22,d.length,true);v.setUint16(26,nm.length,true);lh.set(nm,30);
    const ch=new Uint8Array(46+nm.length),c=new DataView(ch.buffer);c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x0800,true);c.setUint16(14,0x21,true);c.setUint32(16,crc,true);c.setUint32(20,d.length,true);c.setUint32(24,d.length,true);c.setUint16(28,nm.length,true);c.setUint32(42,off,true);ch.set(nm,46);
    parts.push(lh,d);cd.push(ch);off+=lh.length+d.length;});
  const cdLen=cd.reduce((a,x)=>a+x.length,0),end=new Uint8Array(22),e=new DataView(end.buffer);e.setUint32(0,0x06054b50,true);e.setUint16(8,files.length,true);e.setUint16(10,files.length,true);e.setUint32(12,cdLen,true);e.setUint32(16,off,true);
  const all=parts.concat(cd,[end]),out=new Uint8Array(all.reduce((a,x)=>a+x.length,0));let p=0;all.forEach(x=>{out.set(x,p);p+=x.length;});return out;}
function docx(blocks,comments,meta){meta=meta||{};comments=comments||[];
  const X=t=>String(t).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F￾￿]/g,'').replace(/[\t\n\r]/g,' ').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'),XA=t=>X(t).replace(/"/g,'&quot;');
  const W='xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"',HEAD='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';
  const run=(t,pr)=>t?'<w:r>'+(pr?'<w:rPr>'+pr+'</w:rPr>':'')+'<w:t xml:space="preserve">'+X(t)+'</w:t></w:r>':'',ids=new Set(comments.map(c=>c.id)),used=new Set();
  const para=b=>{const text=b.text||'',n=text.length,ms=(b.marks||[]).filter(m=>ids.has(m.id)).map(m=>({id:m.id,a:Math.max(0,Math.min(n,m.a)),b:Math.max(0,Math.min(n,m.b))})).filter(m=>m.b>m.a),cuts=(ms.forEach(m=>used.add(m.id)),0)||[...new Set([0,n].concat(...ms.map(m=>[m.a,m.b])))].sort((x,y)=>x-y);
    let h='<w:p>'+(b.style&&b.style!=='Normal'?'<w:pPr><w:pStyle w:val="'+XA(b.style)+'"/></w:pPr>':'');
    cuts.forEach((x,k)=>{ms.filter(m=>m.b===x).forEach(m=>{h+='<w:commentRangeEnd w:id="'+m.id+'"/><w:r><w:rPr><w:rStyle w:val="CommentReference"/></w:rPr><w:commentReference w:id="'+m.id+'"/></w:r>';});
      ms.filter(m=>m.a===x).forEach(m=>{h+='<w:commentRangeStart w:id="'+m.id+'"/>';});if(k<cuts.length-1)h+=run(text.slice(x,cuts[k+1]));});
    return h+'</w:p>';};
  const doc=HEAD+'<w:document '+W+'><w:body>'+blocks.map(para).join('')+'<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>';
  const when=XA(meta.date||'2026-01-01T00:00:00Z'),who=XA(meta.author||'Topic & Emphasis');
  const cm=HEAD+'<w:comments '+W+'>'+comments.filter(c=>used.has(c.id)).map(c=>'<w:comment w:id="'+c.id+'" w:author="'+who+'" w:date="'+when+'" w:initials="'+XA(meta.initials||'TE')+'">'+c.lines.filter(l=>l&&l.t).map((l,k)=>'<w:p><w:pPr><w:pStyle w:val="CommentText"/></w:pPr>'+(k?'':'<w:r><w:rPr><w:rStyle w:val="CommentReference"/></w:rPr><w:annotationRef/></w:r>')+run(l.t,(l.b?'<w:b/>':'')+(l.i?'<w:i/>':''))+'</w:p>').join('')+'</w:comment>').join('')+'</w:comments>';
  const hs=[32,28,26,24,24,24].map((sz,i)=>'<w:style w:type="paragraph" w:styleId="Heading'+(i+1)+'"><w:name w:val="heading '+(i+1)+'"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="'+(i?200:320)+'" w:after="120"/><w:outlineLvl w:val="'+i+'"/></w:pPr><w:rPr><w:b/>'+(i>2?'<w:i/>':'')+'<w:sz w:val="'+sz+'"/><w:szCs w:val="'+sz+'"/></w:rPr></w:style>').join('');
  const styles=HEAD+'<w:styles '+W+'><w:docDefaults><w:rPrDefault><w:rPr><w:sz w:val="24"/><w:szCs w:val="24"/><w:lang w:val="en-GB"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="160" w:line="360" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>'+
    '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style><w:style w:type="character" w:default="1" w:styleId="DefaultParagraphFont"><w:name w:val="Default Paragraph Font"/><w:uiPriority w:val="1"/><w:semiHidden/></w:style>'+
    '<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:after="240"/></w:pPr><w:rPr><w:b/><w:sz w:val="40"/><w:szCs w:val="40"/></w:rPr></w:style>'+hs+
    '<w:style w:type="paragraph" w:styleId="Quote"><w:name w:val="Quote"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:ind w:left="720" w:right="720"/></w:pPr></w:style>'+
    '<w:style w:type="paragraph" w:styleId="Code"><w:name w:val="Code"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr><w:rPr><w:rFonts w:ascii="Courier New" w:hAnsi="Courier New" w:cs="Courier New"/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:style>'+
    '<w:style w:type="paragraph" w:styleId="CommentText"><w:name w:val="annotation text"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="60" w:line="240" w:lineRule="auto"/></w:pPr><w:rPr><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:style>'+
    '<w:style w:type="character" w:styleId="CommentReference"><w:name w:val="annotation reference"/><w:rPr><w:sz w:val="16"/><w:szCs w:val="16"/></w:rPr></w:style></w:styles>';
  const R='http://schemas.openxmlformats.org/officeDocument/2006/relationships',CT='application/vnd.openxmlformats-officedocument.wordprocessingml.';
  return zipStore([{name:'[Content_Types].xml',data:HEAD+'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="'+CT+'document.main+xml"/><Override PartName="/word/styles.xml" ContentType="'+CT+'styles+xml"/><Override PartName="/word/comments.xml" ContentType="'+CT+'comments+xml"/></Types>'},
    {name:'_rels/.rels',data:HEAD+'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="'+R+'/officeDocument" Target="word/document.xml"/></Relationships>'},
    {name:'word/document.xml',data:doc},{name:'word/styles.xml',data:styles},{name:'word/comments.xml',data:cm},
    {name:'word/_rels/document.xml.rels',data:HEAD+'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="'+R+'/styles" Target="styles.xml"/><Relationship Id="rId2" Type="'+R+'/comments" Target="comments.xml"/></Relationships>'}]);}
return{analyze,parse,stem,isFunc,lemmas,revKind,parseNorms,norms,syl,sylGuess,docx,crc32,HYPE,EVID,JOBS,PB,JOBPB,MOVES};
})();
