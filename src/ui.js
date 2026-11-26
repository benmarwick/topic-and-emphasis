
/* ---------- interface ---------- */
/* the first text a new user meets: six sentences with four easy things to fix */
const SAMPLE=`Retirement removes daily contact with colleagues. Many retired people joined community groups in order to replace that contact. Our survey of 120 retired teachers, which ran for two years, asked how often they met former colleagues. Their contact with former colleagues had fallen by more than half within two years. We carried out a comparison of the teachers who joined a group and the teachers who stayed at home. Those who joined a group recovered most of their lost contact within a year, however.`;
const SAMPLE_CLAIM='Community groups replace the contact that retirement removes.';
/* the harder example: every kind of problem */
const SAMPLE2=`The association between daily social media use and loneliness among the elderly, which we assessed in three annual waves of a community panel using the short loneliness scale described by earlier workers, weakened sharply after retirement. It is well known that retirement has an effect on social contact. An investigation of the response of the size of the support network of the retirees to the loss of workplace ties was performed in order to test this. A 60% decrease in weekly contact within two years of leaving work was observed (Fig. 2).

Volunteering was reduced by retirement as well. This suggests that daily routine may possibly be a potential explanation, and it could perhaps account for the decline to some extent. Neighborhood senior center program attendance rates increased significantly during the same period (Fig. 1). The increase was larger among women, t(28) = 2.20, p = .01. There are many studies reporting similar increases in the literature [4, 12]. Loneliness was very high in 45 of 120 respondents (41%). UCLA scores were also collected by us in the second wave due to the fact that the first scale was shortened. These results clearly demonstrate that losing workplace ties causes the rise in loneliness.`;
const SAMPLE2_CLAIM='Retirement increases loneliness by removing workplace ties.';
const REASONS=['It is intentional','The rule misread this sentence','It is a standard term in my field','It does not apply to this excerpt'];

const LENSES=[
 {k:'overview',n:'Overview',hue:'ink',g:1,src:'All lenses',why:'Every open note from every lens, underlined. Tap a sentence to open it for rewriting. Pick a lens to see the whole structure it reads, including the parts that are working. The guided pass walks you through the notes one at a time.',fix:'',legend:[]},
 {k:'sv',n:'Subject → verb',hue:'amber',g:1,src:'Gopen & Swan · principle 1',why:'Readers wait for the verb. Until it arrives they hold the subject in suspense, and whatever sits in between reads as an interruption that carries less weight.',fix:'Bring the verb up to its subject. Material that matters gets its own clause or sentence. Material that does not can go.',legend:[['ul st hu-amber','subject and verb'],['hl hb-amber','what separates them']]},
 {k:'topic',n:'Topic position',hue:'blue',g:1,src:'Gopen & Swan · principles 3, 4',why:'The opening of a sentence tells readers whose story this is and how it connects to what they just read. Familiar material belongs there.',fix:'Open with something the reader has already met: a term, a pronoun, a phrase that sums up the last sentence. Keep one character at the head of most sentences in a paragraph.',legend:[['hl hb-blue','topic position'],['dot hu-teal','already met']]},
 {k:'stress',n:'Stress position',hue:'rose',g:1,src:'Gopen & Swan · principles 2, 7',why:'Readers give the most emphasis to whatever closes a sentence, or whatever comes just before a colon or semicolon. The new information you most want remembered belongs there.',fix:'Look at your last few words. If they are familiar, filler or a citation, move the news to the end, or trim the tail so the news lands last.',legend:[['hl hb-rose','stress position'],['dot hu-amber','new to the reader']]},
 {k:'flow',n:'Old → new',hue:'teal',g:1,src:'Gopen & Swan · principles 4, 6',why:'A sentence reads easily when it starts from what the reader already holds and travels toward what is new. News delivered before its context has nothing to attach to.',fix:'Reorder so familiar terms come first and new ones last. A passive verb is often the right tool for the job.',legend:[['dot hu-teal','old: seen earlier'],['hl hb-amber','new: first appearance']]},
 {k:'action',n:'Action in verbs',hue:'violet',g:1,src:'Gopen & Swan · principle 5',why:'Readers expect the verb to say what is happening. When the action is packed into a noun and the verb only reports that something was performed or occurred, they have to dig for it.',fix:'Find the buried action, make it the verb, and let its agent or its object be the subject.',legend:[['hl hb-violet','action held in a noun'],['dot hu-violet','other nominalizations'],['wav hu-ink','verb that only reports']]},
 {k:'rhythm',n:'Length & rhythm',hue:'olive',g:2,src:'',why:'Colour places each sentence on a fixed scale of length: short (1 to 12 words), medium (13 to 22), long (23 to 29) and very long (30 or more). The edges sit on Flesch’s 1948 reading-ease scale, and research articles average about 25 words a sentence. Length is something you spend. A short sentence after longer ones reads as emphasis, and a long one asks the reader to hold more before its point arrives.',fix:'For each paragraph, tell the lens which sentence you most want remembered, then see whether its length sets it apart. Split very long sentences at a joint, join short ones that belong together, and break up runs of equal length.',legend:[['lb lb0','Short · 1–12'],['lb lb1','Medium · 13–22'],['lb lb2','Long · 23–29'],['lb lb3','Very long · 30+'],['dot hu-olive','Joint'],['ul hu-ink','Before the main verb'],['rn rn-even','Level run'],['rn rn-chop','Choppy run'],['rn rn-long','Long run']]},
 {k:'clutter',n:'Clutter',hue:'olive',g:2,src:'Zinsser · Strunk & White · Orwell',why:'Stock phrases spend the reader’s attention on words that carry nothing. Each one also pushes your real subject or your news further from where the reader looks for it.',fix:'Replace the phrase with the short word, or delete it.',legend:[['hl hb-olive','phrase with a shorter equivalent']]},
 {k:'hedge',n:'Hedging',hue:'olive',g:2,src:'Hyland · Pinker',why:'One hedge states your confidence honestly. Several in a row make it hard to tell what you are claiming at all.',fix:'Keep the single hedge that matches your evidence.',legend:[['hl hb-olive','hedge']]},
 {k:'dense',n:'Dense phrases',hue:'olive',g:2,src:'Williams · Lanham’s Paramedic Method',why:'Long stacks of nouns and chains of prepositions leave the reader to work out relations you did not state. They usually hide a verb.',fix:'Unpack the phrase so it says what acts on what.',legend:[['hl hb-olive','noun stack'],['ul hu-olive','chain of prepositions']]},
 {k:'openers',n:'Empty openers',hue:'olive',g:2,src:'Williams · Sword',why:'“There is”, “It is … that” and a bare “This” occupy the topic position without naming a topic.',fix:'Start with the real subject. Give a bare “this” its noun.',legend:[['hl hb-olive','opener that names nothing']]},
 {k:'voice',n:'Voice',hue:'olive',g:2,src:'Gopen & Swan’s caveat · Williams',why:'Passive is not a fault. It is the right choice when it moves familiar material to the front of the sentence. It costs something when it pushes a needed agent to the back.',fix:'Check each passive against the topic position: does it put the right thing first?',legend:[['dot hu-olive','passive'],['hl hb-olive','passive with a “by” agent']]},
 {k:'acr',n:'Acronyms',hue:'olive',g:2,src:'Pinker · the curse of knowledge',why:'Each abbreviation is a lookup the reader has to perform. One that is never defined stops them.',fix:'Define at first use, and spell out any abbreviation used only once or twice.',legend:[['dot hu-olive','abbreviation'],['hl hb-olive','never defined here']]},
 {k:'worn',n:'Vague & worn words',hue:'olive',g:2,src:'',why:'Intensifiers, vague quantities and worn phrases take up the space where a specific fact should be.',fix:'Replace each with the number, the name or the plain statement it stands in for.',legend:[['hl hb-olive','vague or worn wording']]},
 {k:'people',n:'Describing people',hue:'olive',g:2,src:'',why:'Research in the social sciences is about people, and the words used for them carry judgments. This lens marks terms that APA style advises against.',fix:'Be specific, and use the terms people use for themselves. Where a community’s preference is clear, follow it.',legend:[['hl hb-olive','term APA style advises against']]},
 {k:'vocab',n:'Vocabulary level',hue:'teal',g:2,src:'',why:'Every content word is looked up in two open word lists: the 2,809 most useful everyday English words, and 957 words common across academic writing. A word on neither list is a specialist term or a rare word, and each one is a small cost to a reader outside your specialty.',fix:'Define specialist terms at first use, and prefer the listed word where it says the same thing.',legend:[['dot hu-teal','general academic word'],['hl hb-teal','on neither list']]},
 {k:'outline',n:'Reverse outline',hue:'ink',g:3,src:'Paragraph level · a revision classic',why:'Only the first and last sentence of each paragraph are shown. Read them straight through. A reader who skims sees roughly this, so your argument should survive it.',fix:'If the outline does not hold, rewrite the openings and closes so each paragraph states its issue first and its point last.',legend:[]},
 {k:'tracer',n:'Claim tracer',hue:'blue',g:3,src:'Argument level · you supply the claim',why:'Write your central claim in one sentence. Its key terms are traced through the draft, so you can see which paragraphs carry the claim and which never touch it. Add your title and its words are traced as well. The panel also lists the sentences the draft is built around, to set beside your claim.',fix:'Bring the claim’s own words into the paragraphs that support it, and into your opening and your close.',legend:[['hl hb-blue','a term from your claim']]},
 {k:'claims',n:'Claim strength',hue:'rose',g:3,src:'Argument level · you supply the evidence',why:'Causal, certain, absolute and first-ever wording is marked. For each one, say what evidence stands behind it. A fixed table then tells you whether the wording fits.',fix:'Where the wording outruns the evidence, step down to the verb the evidence earns.',legend:[['hl hb-rose','strong wording to check'],['dot hu-rose','fits the evidence you named']]},
 {k:'jobs',n:'Paragraph jobs',hue:'teal',g:3,src:'Paragraph level · you label, the rules check the order',why:'Give each paragraph one job. The sequence of jobs is the shape of your argument.',fix:'A paragraph that needs two labels is two paragraphs. A job that is missing is a question your reader will ask.',legend:[]},
 {k:'signals',n:'Signal phrases',hue:'teal',g:3,src:'',why:'Phrases that announce what a stretch of text is doing: stating a gap, an aim, a result or a meaning, or turning from one point to the next. Readers use them to follow the argument. Each sentence is tagged with the move its wording signals. Say what kind of text this is, and the lens checks for the moves that kind usually makes.',fix:'A paragraph with no signal leaves the reader to work out its job. Add a few words that announce it.',legend:[['hl hb-teal','announces a move'],['dot hu-teal','transition word']]},
 {k:'terms',n:'Term tracker',hue:'amber',g:3,src:'Draft level · Williams on consistent terms',why:'Every recurring noun and where it appears. Readers take a new word to mean a new thing, so two names for one thing read as two things.',fix:'Tap a term to see it in the text. Select names that mean the same thing, mark them, then keep one.',legend:[['hl hb-amber','selected term, or a second name']]},
 {k:'stats',n:'Statistics reporting',hue:'violet',g:3,src:'',why:'Reported test results are checked by arithmetic. Each p value is recomputed from its test statistic and degrees of freedom, percentages are recomputed from their counts, and the wording around a result is checked against the numbers.',fix:'Correct the number that is wrong, and report an effect size and an exact p with every test.',legend:[['dot hu-violet','result that checks out'],['hl hb-violet','result to check']]},
 {k:'checks',n:'Mechanical checks',hue:'olive',g:3,src:'Draft level · fixed rules',why:'Figures and tables cited out of order or not at all, earlier work mentioned with no citation, “significant” with no statistic, and tense that switches back and forth within a paragraph.',fix:'Each of these is a small promise to the reader that the text has not kept.',legend:[['hl hb-olive','check this'],['dot hu-olive','main verb, for tense']]},
 {k:'grid',n:'Topic grid',hue:'teal',g:3,src:'',why:'Each row is a term the draft keeps using, and each column is a sentence. A filled dot means the term comes before the main verb, where readers look for what a sentence is about. A ring means it comes after, as news. Rows that run on carry the argument, and a row that stops is a topic dropped. Each sentence also gets a label for how it links to the one before.',fix:'Where a sentence is labelled “no link”, or a paragraph shares nothing with the one before, start it from a term the reader already has.',legend:[['hl hb-teal','Term before the main verb'],['hl2 hb-teal','Term after it'],['ul hu-teal','Word that links back']]},
 {k:'skeleton',n:'Skeleton read',hue:'blue',g:3,src:'',why:'Only the opening and the close of each sentence are shown, and the middles are hidden. The opening says what a sentence is about and ties it to the one before. The close is what the reader is left holding. Read straight down the page. If the argument still comes through, the structure is carrying it.',fix:'Where the thread breaks, open that sentence and move the missing idea into its opening or its close.',legend:[['hl hb-blue','Opening'],['hl hb-rose','Close']],ba:false},
 {k:'compare',n:'Before & after',hue:'ink',g:3,src:'Your revision so far',why:'A receipt of the revising you have done, then the text you started from against the text as it stands, with the number of open notes in each lens before and now.',fix:'',legend:[],ba:false},
 {k:'practice',n:'Practice',hue:'violet',g:3,src:'',why:'Short drills on the principles the lenses read for. One set uses sentences written for this page. Two sets are built from your own draft, so they change as you revise.',fix:'',legend:[],ba:false}
];
{const i=LENSES.findIndex(l=>l.k==='openers');if(i>=0)LENSES.splice(i,1);}
LENSES.push(
 {k:'slips',n:'Typing slips',hue:'olive',g:6,src:'',why:'Small errors of typing and word choice that survive proofreading, because the eye skips them or because both words are real: a doubled word, a space before a comma, “a” where “an” belongs, a bracket never closed, “casual” for “causal”.',fix:'Each note offers the correction where there is one. Preview it, then accept it or mark the note as checked.',legend:[['hl hb-olive','likely slip']]},
 {k:'source',n:'Source overlap',hue:'amber',g:6,src:'',why:'For a summary, a review, or any passage that leans on one text. Paste that text below and the lens marks every run of five or more words your draft shares with it, and shows which of its key terms you kept.',fix:'A matching run is either a quotation, which needs quotation marks and a citation, or wording to make your own. Put the source away and rewrite those sentences from what you remember.',legend:[['hl hb-amber','words matching the source'],['ul hu-teal','a match inside quotation marks']]});
{const C=LENSES.find(l=>l.k==='clutter');C.why='Words that carry nothing. Stock phrases spend the reader’s attention and push your real subject or your news further from where the reader looks for it. Empty openers (“There is”, “It is … that”, a bare “This”) fill the topic position without naming a topic.';C.fix='Replace the phrase with the short word, or delete it. Start the sentence with its real subject, and give a bare “this” its noun.';C.legend=[['hl hb-olive','phrase to shorten, or opener that names nothing']];
 const K=LENSES.find(l=>l.k==='checks');K.why='Figures and tables cited out of order or not at all, earlier work mentioned with no citation, “significant” with no statistic, a sentence that opens with a numeral, and tense that switches back and forth within a paragraph.';
 const T=LENSES.find(l=>l.k==='terms');T.fix='Tap a term to see it in the text. Select names that mean the same thing, mark them, then keep one. Add your own list of words to keep in view or to avoid.';}
LENSES.push({k:'mviews',n:'Meaning views',hue:'violet',g:3,src:'',ba:false,why:'Pictures of the whole draft, drawn by the optional meaning model: a thread showing where the subject jumps, a quilt of every sentence against every other, the draft’s topics as a band of colour, a map, a place to try a new order of paragraphs, a search of your own text, and two drills.',fix:'Each view is a way of seeing where the draft holds together and where it does not. Tap any dot, square or bar to open the sentence behind it.',legend:[]});
LENSES.push({k:'guide',n:'Guide',hue:'ink',g:0,src:'',ba:false,why:'Every lens on one page: what it reads, what its marks mean, how to revise, what the research says, what the meaning model adds, where its limits are, and its sources in full. Search it, browse it, or open any lens from it.',fix:'',legend:[]});
const LORD=['overview','guide','sv','topic','stress','flow','action','outline','jobs','tracer','claims','hedge','grid','signals','skeleton','mviews','rhythm','dense','voice','clutter','worn','vocab','terms','acr','people','stats','checks','slips','source','compare','practice'];
LENSES.sort((a,b)=>LORD.indexOf(a.k)-LORD.indexOf(b.k));
const LBY=Object.fromEntries(LENSES.map(l=>[l.k,l])),LIDX=Object.fromEntries(LENSES.map((l,i)=>[l.k,i]));
/* the rail: Gopen & Swan first, then four plain questions, then progress */
const GRP={overview:0,guide:0,sv:1,topic:1,stress:1,flow:1,action:1,outline:2,jobs:2,tracer:2,claims:2,hedge:2,grid:3,signals:3,skeleton:3,mviews:3,rhythm:4,dense:4,voice:4,clutter:4,worn:5,vocab:5,terms:5,acr:5,people:5,stats:6,checks:6,slips:6,source:6,compare:7,practice:7};
LENSES.forEach(l=>{l.g=GRP[l.k]!=null?GRP[l.k]:l.g;});
const FOLD=new Set(['clutter','hedge','dense','voice','acr','worn','people','claims','stats','checks','slips','source']);
const SRC={
 overview:['All lenses'],
 sv:[['gs','Gopen & Swan'],'principle 1',['gibson','Gibson']],
 topic:[['gs','Gopen & Swan'],'principles 3, 4',['williams','Williams']],
 stress:[['gs','Gopen & Swan'],'principles 2, 7'],
 flow:[['gs','Gopen & Swan'],'principles 4, 6',['haviland','Haviland & Clark']],
 action:[['gs','Gopen & Swan'],'principle 5',['williams','Williams'],['biber','Biber & Gray']],
 rhythm:[['flesch','Flesch'],['deveci','Deveci'],['gibson','Gibson'],['mcnamara','McNamara et al.'],['grabe','Grabe & Low'],['provost','Provost'],['coleman','Coleman & Liau'],['mac22','Mac et al.']],
 clutter:[['zinsser','Zinsser'],['strunk','Strunk & White'],['orwell','Orwell']],
 hedge:[['hyland','Hyland'],['pinker','Pinker'],['hyland05','Hyland 2005']],
 dense:[['williams','Williams'],['lanham','Lanham'],['biber','Biber & Gray']],
 openers:[['williams','Williams'],['sword','Sword']],
 voice:[['gs','Gopen & Swan'],['williams','Williams']],
 acr:[['pinker','Pinker'],['camerer','Camerer et al.'],['barnett','Barnett & Doubleday']],
 outline:[['mensh','Mensh & Kording'],['williams','Williams']],
 tracer:[['toulmin','Toulmin'],['mensh','Mensh & Kording'],['goodstory','good-story']],
 claims:[['toulmin','Toulmin'],['haber','Haber et al.'],['vinkers','Vinkers et al.'],['goodstory','good-story'],['millar22','Millar et al.']],
 jobs:[['swales','Swales'],['mensh','Mensh & Kording'],['goodstory','good-story']],
 terms:[['williams','Williams'],['pinker','Pinker']],
 checks:[['wasserstein','Wasserstein & Lazar'],'fixed rules',['grim17','Brown & Heathers']],
 skeleton:[['gs','Gopen & Swan'],'principles 2, 3'],
 grid:[['gs','Gopen & Swan'],'principles 3, 4, 6',['swan','Kinnunen et al.'],['ontopic','OnTopic'],['danes74','Daneš'],['givon83','Givón']],
 practice:[['gs','Gopen & Swan'],['swan','Kinnunen et al.']],
 compare:['Your revision so far',['faigley81','Faigley & Witte']]};
/* [key, citation, DOI, other link] */
const REFS=[
 ['gs','Gopen, G. D., & Swan, J. A. (1990). The science of scientific writing. <i>American Scientist</i>, 78(6), 550–558.','','https://www.americanscientist.org/node/924'],
 ['williams','Williams, J. M. (1990). <i>Style: Toward clarity and grace</i>. University of Chicago Press.','',''],
 ['gibson','Gibson, E. (1998). Linguistic complexity: Locality of syntactic dependencies. <i>Cognition</i>, 68(1), 1–76.','10.1016/S0010-0277(98)00034-1',''],
 ['haviland','Haviland, S. E., & Clark, H. H. (1974). What’s new? Acquiring new information as a process in comprehension. <i>Journal of Verbal Learning and Verbal Behavior</i>, 13(5), 512–521.','10.1016/S0022-5371(74)80003-4',''],
 ['biber','Biber, D., & Gray, B. (2010). Challenging stereotypes about academic writing: Complexity, elaboration, explicitness. <i>Journal of English for Academic Purposes</i>, 9(1), 2–20.','10.1016/j.jeap.2010.01.001',''],
 ['lanham','Lanham, R. A. (2007). <i>Revising prose</i> (5th ed.). Pearson Longman.','',''],
 ['sword','Sword, H. (2012). <i>Stylish academic writing</i>. Harvard University Press.','10.4159/harvard.9780674065093',''],
 ['zinsser','Zinsser, W. (2006). <i>On writing well: The classic guide to writing nonfiction</i> (30th anniversary ed.). HarperCollins.','',''],
 ['strunk','Strunk, W., Jr., & White, E. B. (2000). <i>The elements of style</i> (4th ed.). Allyn & Bacon.','',''],
 ['orwell','Orwell, G. (1946). Politics and the English language. <i>Horizon</i>, 13(76), 252–265.','',''],
 ['hyland','Hyland, K. (1996). Talking to the academy: Forms of hedging in science research articles. <i>Written Communication</i>, 13(2), 251–281.','','http://hdl.handle.net/10722/130132'],
 ['pinker','Pinker, S. (2014). <i>The sense of style: The thinking person’s guide to writing in the 21st century</i>. Viking.','',''],
 ['camerer','Camerer, C., Loewenstein, G., & Weber, M. (1989). The curse of knowledge in economic settings: An experimental analysis. <i>Journal of Political Economy</i>, 97(5), 1232–1254.','10.1086/261651',''],
 ['barnett','Barnett, A., & Doubleday, Z. (2020). The growth of acronyms in the scientific literature. <i>eLife</i>, 9, e60080.','10.7554/eLife.60080',''],
 ['provost','Provost, G. (1985). <i>100 ways to improve your writing</i>. New American Library.','',''],
 ['flesch','Flesch, R. (1948). A new readability yardstick. <i>Journal of Applied Psychology</i>, 32(3), 221–233.','10.1037/h0057532',''],
 ['plaven','Plavén-Sigray, P., Matheson, G. J., Schiffler, B. C., & Thompson, W. H. (2017). The readability of scientific texts is decreasing over time. <i>eLife</i>, 6, e27725.','10.7554/eLife.27725',''],
 ['swan','Kinnunen, T., Leisma, H., Machunik, M., Kakkonen, T., & Lebrun, J.-L. (2012). SWAN – Scientific Writing AssistaNt: A tool for helping scholars to write reader-friendly manuscripts. In <i>Proceedings of the Demonstrations at the 13th Conference of the European Chapter of the Association for Computational Linguistics</i> (pp. 20–24). Association for Computational Linguistics.','','https://aclanthology.org/E12-2005/'],
 ['ontopic','Kaufer, D., & Ishizaki, S. OnTopic and DocuScope [revision tools that show topics across a text and on either side of the main verb]. Carnegie Mellon University, Department of English.','','https://www.cmu.edu/dietrich/english/research-and-publications/docuscope.html'],
 ['acawriter','Knight, S., Shibani, A., Abel, S., Gibson, A., Ryan, P., Sutton, N., Wight, R., Lucas, C., Sándor, Á., Kitto, K., Liu, M., Vijay Mogarkar, R., & Buckingham Shum, S. (2020). AcaWriter: A learning analytics tool for formative feedback on academic writing. <i>Journal of Writing Research</i>, 12(1), 141–186.','10.17239/jowr-2020.12.01.06',''],
 ['textrank','Mihalcea, R., & Tarau, P. (2004). TextRank: Bringing order into texts. In <i>Proceedings of the 2004 Conference on Empirical Methods in Natural Language Processing</i> (pp. 404–411). Association for Computational Linguistics.','','https://aclanthology.org/W04-3252/'],
 ['deveci','Deveci, T. (2019). Sentence length in education research articles: A comparison between Anglophone and Turkish authors. <i>The Linguistics Journal</i>, 13(1), 73 ff.','',''],
 ['rudnicka','Rudnicka, K. (2018). Variation of sentence length across time and genre. In R. J. Whitt (Ed.), <i>Diachronic corpora, genre, and language change</i> (pp. 220–240). John Benjamins.','','https://arxiv.org/abs/2502.04321'],
 ['gross','Gross, A. G., Harmon, J. E., & Reidy, M. (2002). <i>Communicating science: The scientific article from the 17th century to the present</i>. Oxford University Press. Its sentence-length figures are quoted here as Rudnicka (2018) reports them.','',''],
 ['mcnamara','McNamara, D. S., Crossley, S. A., & McCarthy, P. M. (2010). Linguistic features of writing quality. <i>Written Communication</i>, 27(1), 57–86.','10.1177/0741088309351547',''],
 ['futrell','Futrell, R., Mahowald, K., & Gibson, E. (2015). Large-scale evidence of dependency length minimization in 37 languages. <i>Proceedings of the National Academy of Sciences</i>, 112(33), 10336–10341.','10.1073/pnas.1502134112',''],
 ['mikk','Mikk, J. (2008). Sentence length for revealing the cognitive load reversal effect in text comprehension. <i>Educational Studies</i>, 34(2).','10.1080/03055690701811164',''],
 ['weinberger','Weinberger, C. J., Evans, J. A., & Allesina, S. (2015). Ten simple (empirical) rules for writing science. <i>PLOS Computational Biology</i>, 11(4), e1004205.','10.1371/journal.pcbi.1004205',''],
 ['grabe','Grabe, E., & Low, E. L. (2002). Durational variability in speech and the rhythm class hypothesis. In C. Gussenhoven & N. Warner (Eds.), <i>Laboratory phonology 7</i> (pp. 515–546). Mouton de Gruyter.','',''],
 ['patel','Patel, A. D., & Daniele, J. R. (2003). An empirical comparison of rhythm in language and music. <i>Cognition</i>, 87(1), B35–B45.','10.1016/S0010-0277(02)00187-7',''],
 ['goldshtein','Goldshtein, M., Alhashim, A. G., & Roscoe, R. D. (2024). An NLP-based exploration of variance in student writing and syntax: Implications for automated writing evaluation. <i>Computers</i>, 13(7), 160.','10.3390/computers13070160',''],
 ['drozdz','Drożdż, S., Oświęcimka, P., Kulig, A., Kwapień, J., Bazarnik, K., Grabska-Gradzińska, I., Rybicki, J., & Stanuszek, M. (2015). Quantifying origin and character of long-range correlations in narrative texts. arXiv:1412.8319.','','https://arxiv.org/abs/1412.8319'],
 ['zeng','Zeng, Y., Cui, J., & Li, L. (2025). Fractal illusions: An experimental study of long-range sentence-length correlations in randomly generated natural language texts. arXiv:2508.19782.','','https://arxiv.org/abs/2508.19782'],
 ['mensh','Mensh, B., & Kording, K. (2017). Ten simple rules for structuring papers. <i>PLoS Computational Biology</i>, 13(9), e1005619.','10.1371/journal.pcbi.1005619',''],
 ['toulmin','Toulmin, S. E. (2003). <i>The uses of argument</i> (updated ed.). Cambridge University Press.','10.1017/CBO9780511840005',''],
 ['swales','Swales, J. M. (1990). <i>Genre analysis: English in academic and research settings</i>. Cambridge University Press.','',''],
 ['haber','Haber, N., Smith, E. R., Moscoe, E., et al. (2018). Causal language and strength of inference in academic and media articles shared in social media (CLAIMS): A systematic review. <i>PLoS ONE</i>, 13(5), e0196346.','10.1371/journal.pone.0196346',''],
 ['vinkers','Vinkers, C. H., Tijdink, J. K., & Otte, W. M. (2015). Use of positive and negative words in scientific PubMed abstracts between 1974 and 2014: Retrospective analysis. <i>BMJ</i>, 351, h6467.','10.1136/bmj.h6467',''],
 ['wasserstein','Wasserstein, R. L., & Lazar, N. A. (2016). The ASA’s statement on p-values: Context, process, and purpose. <i>The American Statistician</i>, 70(2), 129–133.','10.1080/00031305.2016.1154108',''],
 ['goodstory','Rimagination. <i>good-story</i> [open-source agent skill for building a defensible paper storyline]. GitHub.','','https://github.com/Rimagination/good-story']];
REFS.push(['phrasebank','Morley, J. <i>Academic Phrasebank</i>. University of Manchester.','','https://www.phrasebank.manchester.ac.uk/']);
SRC.signals=[['swales','Swales'],['phrasebank','Academic Phrasebank']];['hedge','claims','jobs'].forEach(k=>SRC[k].push(['phrasebank','Academic Phrasebank']));
REFS.push(['sciwrite','Barba, L. A. <i>sciwrite</i> [agent skill for reviewing manuscripts, based on K. Sainani’s course Writing in the Sciences]. GitHub. CC BY 4.0.','','https://github.com/labarba/sciwrite'],
 ['nuijten','Nuijten, M. B., Hartgerink, C. H. J., van Assen, M. A. L. M., Epskamp, S., & Wicherts, J. M. (2016). The prevalence of statistical reporting errors in psychology (1985–2013). <i>Behavior Research Methods</i>, 48(4), 1205–1226.','10.3758/s13428-015-0664-2',''],
 ['appelbaum','Appelbaum, M., Cooper, H., Kline, R. B., Mayo-Wilson, E., Nezu, A. M., & Rao, S. M. (2018). Journal article reporting standards for quantitative research in psychology: The APA Publications and Communications Board task force report. <i>American Psychologist</i>, 73(1), 3–25.','10.1037/amp0000191',''],
 ['apa','American Psychological Association. <i>Bias-free language guidelines</i>. APA Style.','','https://apastyle.apa.org/style-grammar-guidelines/bias-free-language'],
 ['writegood','Ford, B. <i>write-good</i> [open-source prose linter]. GitHub. MIT licence.','','https://github.com/btford/write-good'],
 ['proselint','Amperser Labs. <i>proselint</i> [open-source prose linter]. GitHub. BSD-3-Clause licence.','','https://github.com/amperser/proselint']);
REFS.push(['ngsl','Browne, C., Culligan, B., & Phillips, J. (2013). <i>The New General Service List</i> (version 1.2) and <i>The New Academic Word List</i> (version 1.2). Both lists are included in this page under a Creative Commons Attribution-ShareAlike 4.0 licence.','','https://www.newgeneralservicelist.com/'],
 ['rakedzon','Rakedzon, T., Segev, E., Chapnik, N., Yosef, R., & Baram-Tsabari, A. (2017). Automatic jargon identifier for scientists engaging with the public and science communication educators. <i>PLoS ONE</i>, 12(8), e0181742.','10.1371/journal.pone.0181742','']);
SRC.vocab=[['ngsl','Browne, Culligan & Phillips'],['rakedzon','Rakedzon et al.']];
SRC.stats=[['nuijten','Nuijten et al.'],['appelbaum','Appelbaum et al.'],['wasserstein','Wasserstein & Lazar'],['sciwrite','sciwrite']];
SRC.worn=[['zinsser','Zinsser'],['writegood','write-good'],['proselint','proselint']];
SRC.people=[['apa','APA bias-free language guidelines']];
['action','clutter','rhythm','acr','terms'].forEach(k=>SRC[k].push(['sciwrite','sciwrite']));SRC.jobs.push(['appelbaum','Appelbaum et al.']);
const MTIP={
 sv:[['ul st','Subject or main verb. Once readers have the subject, they wait for the verb.'],['hb-amber','These words stand between the subject and its verb. Readers treat them as an interruption.']],
 topic:[['hb-blue','Topic position: the opening of the sentence, where readers look for whose story this is and for a link to what they just read.'],['hu-teal','Already met: this word, or a close relative of it, appeared earlier in the draft.']],
 stress:[['hb-rose','Stress position: the close of the sentence, or the words before a colon or semicolon. Readers weight it most.'],['hu-amber','New to the reader: this word appears here for the first time.']],
 flow:[['hu-teal','Old: this word, or a close relative of it, appeared earlier in the draft.'],['hb-amber','New: this word appears here for the first time.']],
 action:[['hb-violet','A noun that holds the action of this sentence.'],['hu-violet','A nominalization: a noun made from a verb. Fine when it names a known thing, costly when it hides the action.'],['hu-ink','A verb that only reports that something happened.']],
 clutter:[['hb-olive','A stock phrase with a shorter equivalent.']],
 hedge:[['hb-olive','A hedge: a word that lowers the certainty of the claim.']],
 dense:[['hb-olive','A stack of nouns with nothing to show how they relate.'],['hu-olive','A chain of prepositional phrases.']],
 openers:[['hb-olive','An opener that fills the topic position without naming a topic.']],
 voice:[['hb-olive','A passive verb with its agent attached after it.'],['hu-olive','A passive verb. Not a fault in itself.']],
 acr:[['hb-olive','An abbreviation that this text never defines.'],['hu-olive','An abbreviation.']],
 tracer:[['hb-blue','A term from your central claim.']],
 claims:[['hb-rose','Strong wording. Name the evidence behind it in the note.'],['hu-rose','Strong wording that fits the evidence you named.']],
 terms:[['hb-amber','A term you selected, or a second name for something you marked as one thing.'],['hu-amber','The most used name for something you marked as one thing.']],
 checks:[['hb-olive','A mechanical check. Open the note for detail.'],['hu-olive','The main verb, underlined so you can follow the tense through the paragraph.']]};
MTIP.signals=[['hb-teal','A phrase that announces a move.'],['hu-teal','A transition word.']];
MTIP.hedge.push(['hu-amber','A booster: wording that raises the certainty of the claim.'],['hu-blue','Engagement: wording that addresses the reader, such as a directive or an appeal to shared knowledge.']);MTIP.claims.push(['hu-amber','An adjective that often promotes. Could you delete it and lose no information?']);(MTIP.worn=MTIP.worn||[]).push(['hu-ink','A word that became much more common in research abstracts in 2023 and 2024. The word itself is fine.']);
MTIP.vocab=[['hb-teal','On neither word list: a specialist term, or a rare word.'],['hu-teal','A general academic word, on the New Academic Word List.']];MTIP.stats=[['hb-violet','A reported result whose numbers or wording should be checked.'],['hu-violet','A reported result. Its numbers agree with each other.']];MTIP.worn=[['hb-olive','Vague or worn wording.']];MTIP.people=[['hb-olive','A term for people that APA style advises against.']];
MTIP.rhythm=[
 ['lb0','Short: 1 to 12 words. Flesch (1948) found that prose averaging 11 words a sentence reads as “easy”, and 8 or fewer as “very easy”. Research prose averages about 25, so a short sentence stands out. Spend it on a point you want remembered.'],
 ['lb1','Medium: 13 to 22 words. This spans Flesch’s “fairly easy” (14 words), “standard” (17) and “fairly difficult” (21) averages. Recent non-fiction averages about 20 (Rudnicka 2018). The working length for most statements.'],
 ['lb2','Long: 23 to 29 words. Flesch rated prose averaging 25 words as “difficult”. It is also the usual length in research articles: about 25 words in education journals (Deveci 2019) and 27 in science (Gross et al. 2002). Fine when the structure is clear.'],
 ['lb3','Very long: 30 words or more. Flesch rated prose averaging 29 or more as “very difficult”. One such sentence is no fault, but it holds many candidates for emphasis and a single stress position. Look for a joint.'],
 ['hu-olive','A joint: a semicolon, a colon, or a comma followed by and, but, so, which, whereas, although or because, at a point where a complete statement has ended. The sentence could stop here.'],
 ['hu-ink','The words a reader must hold before the main verb arrives. Twelve or more raises a note. Memory-based accounts of reading predict the cost (Gibson 1998), and Coh-Metrix counts the same words as its measure of syntactic load (McNamara et al. 2010).'],
 ['rn-even','A level run: four or more sentences in a row whose lengths stay within about a quarter of each other (or within four words). Nothing in the run stands out.'],
 ['rn-chop','A choppy run: three or more short sentences (12 words or fewer) in a row. Every point gets the same weight, and the links between them go unstated.'],
 ['rn-long','A long run: two or more very long sentences (30 words or more) back to back, with no shorter sentence for the reader to rest on.']];
MTIP.grid=[['hl hb-teal','A recurring term that comes before the main verb here: on the topic side of the sentence, where readers look for what it is about.'],['hl2 hb-teal','A recurring term that comes after the main verb here: on the news side of the sentence.'],['hu-teal','A word that links this sentence back to an earlier one.']];
SRC.signals.push(['acawriter','Knight et al.'],['swan','Kinnunen et al.']);SRC.vocab.push(['nation06','Nation']);SRC.worn.push(['kobak25','Kobak et al.']);SRC.signals.push(['biber04','Biber et al.']);SRC.tracer.push(['swan','Kinnunen et al.'],['textrank','Mihalcea & Tarau']);MTIP.tracer.push(['hu-blue','A word from your title.']);
const LINK={start:['start','The first sentence of the draft, so there is nothing for it to link back to.'],
 fluid:['fluid','Fluid: it picks up something from the sentence before, and does so before its own main verb. The reader knows at once how it follows.'],
 inverted:['late link','Late link: it does share a word with the sentence before, but that word comes after the main verb. The reader meets the new material first. SWAN calls this an inverted topic.'],
 outofsync:['far link','Far link: it shares nothing with the sentence before, and connects only to a sentence further back. SWAN calls this out of sync.'],
 disconnected:['no link','No link: it shares no content word with any of the six sentences before it, and has no pointing word or transition. SWAN calls this disconnected.']};
const MOVEN={context:'context',gap:'gap',aim:'aim',method:'method',result:'result',interp:'meaning',implication:'implication',limit:'limit'};
const KINDS=[['','Not sure, or another kind of text'],['abstract','An abstract'],['intro','An introduction'],['paper','A whole paper']];
const noText=l=>l==='compare'||l==='practice'||l==='guide';
function chipLab(st){const l=state.lens,mm=MEAN.M&&MEAN.M.sent[st.i];return l==='grid'&&mm&&mm.only?(st.i+1)+' · meaning only':l==='grid'&&st.link?(st.i+1)+' · '+LINK[st.link.type][0]:l==='signals'&&st.move?(st.i+1)+' · '+MOVEN[st.move]:l==='tracer'&&st.key?(st.i+1)+' · key':st.i+1;}
function chipTip(st){const l=state.lens;
  if(l==='grid'&&MEAN.M&&MEAN.M.sent[st.i]&&MEAN.M.sent[st.i].only)return 'It repeats no word from what came before, but the meaning model places it close to the sentence before it. The link is in the meaning and not yet on the page. ';
  if(l==='grid'&&st.link){const K=st.link,v=K.via[0];return LINK[K.type][1]+(K.weak?' Here the link is a '+(K.weak==='pointer'?'pointing word such as “this” or “it”':'transition word')+' in its opening.':v?' Here it picks up “'+v.pw+'” from sentence '+(v.from+1)+'.':'')+' ';}
  if(l==='signals')return st.move?'Its wording signals this move: '+(Object.fromEntries(E.JOBS)[st.move]||st.move).toLowerCase()+'. ':'No phrase in it signals a move. ';
  if(l==='tracer'&&st.key)return 'Key sentence, rank '+st.key+': it shares more words with the rest of the draft than most sentences do. ';
  return '';}
MTIP.skeleton=[['hb-blue','The opening of the sentence, its topic position: what the sentence says it is about, and its link back to the one before.'],['hb-rose','The close of the sentence, its stress position: what the reader is left holding.']];
const BAND=[['Short','1 to 12 words','olive'],['Medium','13 to 22 words','olive'],['Long','23 to 29 words','olive'],['Very long','30 words or more','olive']];
const LCLS={'🟢':'l-ok','🟠':'l-warn','🔴':'l-bad','⚪':'l-none'},LNAME={'🟢':'green','🟠':'amber','🔴':'red','⚪':'none'};
const lightH=(v,pop)=>'<span class="light '+(LCLS[v]||'')+(pop?' pop':'')+'" role="img" aria-label="'+(LNAME[v]||'')+' light"></span>';
const bandOf=n=>n<=12?0:n<=22?1:n<=29?2:3;
const FLESCH=[[8,'very easy'],[11,'easy'],[14,'fairly easy'],[17,'standard'],[21,'fairly difficult'],[25,'difficult'],[29,'very difficult']];
const fleschOf=m=>FLESCH.reduce((x,y)=>Math.abs(y[0]-m)<Math.abs(x[0]-m)?y:x);
const JOINS=[['It adds to the first',', and '],['It contrasts with it',', but '],['It follows from it',', so '],['It gives the reason for it',' because '],['It spells it out',': ']];
const CONTRAST=v=>v<20?['level','Under 20 counts as level: neighbouring sentences are close to the same length.']:v<40?['gentle','Between 20 and 40: some movement, but less than sentences in random order would show.']:['varied','40 or more: about what sentences in random order would show, or more.'];
const NPVITIP='Neighbour contrast: the average difference in length between one sentence and the next, as a percentage of the pair’s mean. 0 means every sentence is the same length, and 200 is the ceiling. It is the normalised pairwise variability index (nPVI) from speech-rhythm research (Grabe & Low 2002), applied here to sentence lengths.';
const rf=(k,t)=>'<a href="#ref-'+k+'" data-ref="'+k+'">'+t+'</a>';
const RGUIDE='<details class="rguide"><summary>How to read this lens, and what the research says</summary>'+
 '<p><b>Where the bands come from.</b> '+rf('flesch','Flesch (1948)')+' tested his reading-ease formula against graded comprehension passages and published a scale of average sentence lengths: 8 words or fewer for very easy prose, 11 for easy, 14 fairly easy, 17 standard, 21 fairly difficult, 25 difficult, and 29 or more very difficult. The band edges here (12, 22 and 29) sit on that scale. His figures are averages for a whole passage, and his formula also counts syllables, so one 30-word sentence is not “very difficult” on its own. The colour only places each sentence on a fixed ruler. The same sentence gets the same colour in any draft.</p>'+
 '<p><b>What is usual in research writing.</b> Sentences in scientific articles averaged about 33 words in 1876–1900 and 27 in 1976–2000 ('+rf('gross','Gross et al. 2002')+', as reported by '+rf('rudnicka','Rudnicka 2018')+'). A sample of 100 education research articles averaged 24.7 words ('+rf('deveci','Deveci 2019')+'). Recent non-fiction averages about 20 words and fiction about 12 ('+rf('rudnicka','Rudnicka 2018')+'). Research abstracts have become steadily harder to read since 1881 ('+rf('plaven','Plavén-Sigray et al. 2017')+'). A draft that is mostly “long” is therefore typical of the genre, which is a different thing from easy to read.</p>'+
 '<p><b>Shorter is not automatically better.</b> In 120 student essays, average sentence length did not separate the high-rated from the low-rated (19.4 against 18.9 words). What did was the number of words before the main verb and the range of vocabulary: the better essays were the more complex ones ('+rf('mcnamara','McNamara et al. 2010')+'). For 17- and 18-year-old readers, sentences of about 130 to 150 characters suited comprehension best ('+rf('mikk','Mikk 2008')+'). Across about a million abstracts, the shorter ones were cited less ('+rf('weinberger','Weinberger et al. 2015')+'). So this lens sets no target length.</p>'+
 '<p><b>Words before the main verb.</b> A reader holds the opening of a sentence in memory until the verb says what to do with it, and the cost grows with the distance ('+rf('gibson','Gibson 1998')+'). Speakers of 37 languages keep related words closer together than chance would ('+rf('futrell','Futrell et al. 2015')+'). In the chart, the darker lower part of each bar counts these words. Twelve or more, a whole short sentence’s worth, raises a note. That figure is this tool’s working threshold and not a published norm.</p>'+
 '<p><b>Runs.</b> Three patterns are underlined in the text. A level run is four or more sentences in a row whose lengths stay within about a quarter of each other. A choppy run is three or more short sentences in a row. A long run is two or more very long sentences back to back. No study fixes the number at which sameness starts to tire a reader. The advice comes from teachers of writing ('+rf('provost','Provost 1985')+'), and these counts are this tool’s rules for applying it.</p>'+
 '<p><b>Measuring monotony.</b> The table reports two numbers. Spread is the standard deviation of the lengths divided by their mean. It says how different the lengths are overall and ignores their order: a paragraph that climbs steadily from 8 to 35 words has a wide spread and still reads smoothly. Contrast looks at neighbours. It is the normalised pairwise variability index, which phoneticians devised to measure rhythm in speech ('+rf('grabe','Grabe & Low 2002')+') and others then applied to music ('+rf('patel','Patel & Daniele 2003')+'). For each pair of neighbouring sentences, take the difference in length, divide by the pair’s mean, then average over all pairs and multiply by 100. Lengths of 22, 20, 24, 21 and 23 words score 13. Lengths of 8, 14, 20, 27 and 35 score 36 in that rising order, and 90 when shuffled to 20, 8, 35, 14, 27. In a simulation written for this tool, sentences drawn at random from prose with an ordinary spread (0.4 to 0.6) scored between 40 and 60 on average. A paragraph under 20 is therefore much more level than chance would leave it, and it raises a note. Applying this index to sentence length is this tool’s adaptation, and 20 is a working value.</p>'+
 '<p><b>Emphasis.</b> A diamond (◆) marks a sentence that its length sets apart: the single shortest sentence of a paragraph, if it is no more than 60% of the paragraph’s median, or any sentence no more than half as long as the one before it. Choose the sentence you most want remembered and the lens checks whether it carries a diamond. The rule turns craft advice into something countable ('+rf('provost','Provost 1985')+'), in line with what '+rf('gs','Gopen & Swan (1990)')+' say about where readers look for emphasis. None of the sources below tests it by experiment.</p>'+
 '<p><b>What the research does not show.</b> Sequences of sentence lengths in novels show long-range patterns, which some read as a writer alternating long and short on purpose ('+rf('drozdz','Drożdż et al. 2015')+'). Text punctuated at random shows similar patterns ('+rf('zeng','Zeng et al. 2025')+'). In student essays, variation in syntax explained about a tenth of the variation in scores, and the authors conclude that such patterns are neither good nor bad in themselves ('+rf('goldshtein','Goldshtein et al. 2024')+'). There is no score to aim for here. Variety is a way to place emphasis, and the test that matters is whether the sentence you chose stands out.</p></details>';
const TILETIP={opening:'Opening: the words before the subject.',subject:'Subject: who or what the sentence is grammatically about.',interruption:'Words that stand between the subject and its verb.',verb:'The main verb.',middle:'The middle: between the verb and the close.',close:'Close: the stress position, which readers weight most.'};
const tipA=s=>s?' data-tip="'+esc(s)+'"':'';
const markTip=(lens,cls)=>{const ts=cls.split(' '),r=(MTIP[lens]||[]).find(x=>x[0].split(' ').every(t=>ts.includes(t)));return r?r[1]:'';};
const lensTip=l=>l.why.split(/(?<=\.)\s/)[0]+(l.k==='compare'||l.k==='skeleton'||l.k==='practice'||l.k==='mviews'||l.k==='guide'?'':l.ba===false?' The number counts open notes.':' The number counts open notes; “5→3” means 5 in your starting text and 3 now.');
const srcHTML=k=>(SRC[k]||[]).map(p=>Array.isArray(p)?'<a href="#ref-'+p[0]+'" data-ref="'+p[0]+'" data-tip="Jump to the full reference.">'+esc(p[1])+'</a>':esc(p)).join(' · ');
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const store={get(k){try{return localStorage.getItem(k);}catch(e){return null;}},set(k,v){try{localStorage.setItem(k,v);}catch(e){}}};
const state={raw:'',base:'',lens:'overview',sel:null,tab:'notes',hot:null,editing:false,isSample:false,A:null,A0:null,bc:{},baseOf:null,guide:null,
  claim:'',tags:{},dismissed:{},jobs:[],merges:[],moves:[],emph:[],vers:{},miles:{},hist:{},kind:'',title:'',gridSel:null,gridP:null,pr:null,termSel:new Set(),open:new Set(),pick:{news:new Set(),who:new Set()},markOut:'',tiles:null,tend:'.',tsrc:'',picked:-1,tid:0,dc:null,wasText:''};
const reduced=()=>window.matchMedia('(prefers-reduced-motion:reduce)').matches;
let saveT=0;
function save(){clearTimeout(saveT);saveT=setTimeout(()=>store.set('ts.v2',JSON.stringify({raw:state.isSample?'':state.raw,base:state.isSample?'':state.base,lens:state.lens,claim:state.isSample?'':state.claim,tags:state.tags,dismissed:state.dismissed,jobs:state.jobs,merges:state.merges,moves:state.moves,emph:state.emph,points:state.points,mylist:state.mylist||'',source:(state.source||'').slice(0,30000),vers:state.vers,miles:state.miles,kind:state.kind,title:state.isSample?'':state.title})),250);}

const active=f=>!f.dis&&!f.ok;
const inView=f=>state.lens==='overview'||f.lens===state.lens;
const opts=()=>({claim:state.claim,tags:state.tags,jobs:state.jobs,merges:state.merges,moves:state.moves,emph:state.emph,kind:state.kind,title:state.title,points:state.points,list:state.mylist,source:state.source});
function baseline(){const key=state.base+'\u0001'+state.claim+'\u0001'+JSON.stringify([state.jobs,state.merges,state.moves,state.emph,state.kind,state.title,state.points,state.mylist,state.source]);if(state.baseOf!==key){state.baseOf=key;state.A0=E.analyze(state.base,{claim:state.claim,jobs:state.jobs,merges:state.merges,moves:state.moves,emph:state.emph,kind:state.kind,title:state.title,points:state.points,list:state.mylist,source:state.source});state.bc={};state.A0.findings.forEach(f=>{state.bc[f.lens]=(state.bc[f.lens]||0)+1;});}return state.bc;}
function run(){const t0=performance.now();const A=state.A=E.analyze(state.raw,opts());meanSync(A);state.cost=performance.now()-t0;A.byId={};A.findings.forEach(f=>{A.byId[f.id]=f;f.dis=state.dismissed[f.key]||'';});state.pv=null;state.fxNew=false;settle();detectFx();state.typing=false;miles();renderDynamic();}
/* ---------- progress: what counts as resolved, what has settled ---------- */
const nsig=f=>f.sig.replace(/\d+/g,'#');
function stems(t){const out=[];(t.toLowerCase().match(/[a-z][a-z’'-]{2,}/g)||[]).forEach(w=>{if(!E.isFunc(w))out.push(E.stem(w));});return out;}
const nearS=(a,b)=>{if(a===b)return true;const n=Math.min(a.length,b.length);if(n<4)return false;let p=0;while(p<n&&a[p]===b[p])p++;return p>=4&&p>=0.75*n;};
function keptShare(was,now){const a=[...new Set(stems(was))],b=stems(now);if(!a.length)return 1;return a.filter(x=>b.some(y=>nearS(x,y))).length/a.length;}
const KEEP=0.4;
const fxOn=i=>!!(state.fx&&state.fx.ids.has(i)&&performance.now()-state.fx.at<1500);
const fxS=i=>fxOn(i)?'--fx:-'+Math.round(performance.now()-state.fx.at)+'ms;':'';
function settle(){const A=state.A,open=new Set(),S=new Set(),now=performance.now();baseline();if(!state.had)state.had=new Set();if(!state.setAt)state.setAt={};
  A.findings.forEach(f=>{const s=A.sents[f.s];if(!s)return;if(active(f))open.add(s.p);state.had.add(f.lens+'|'+s.p);});
  if(state.A0)state.A0.findings.forEach(f=>{const s=state.A0.sents[f.s];if(s)state.had.add(f.lens+'|'+s.p);});
  A.paras.forEach((p,pi)=>{if(p.ord!=null&&!open.has(pi))S.add(pi);});
  if(state.setP)S.forEach(pi=>{if(!state.setP.has(pi))state.setAt[pi]=now;});state.setP=S;}
function detectFx(){const sel=state.sel;if(state.fx&&performance.now()-state.fx.at>1500)state.fx=null;
  if(!sel){state.fxPrev=null;state.keptNow=null;return;}
  const A=state.A,ids=new Set(spanSents().map(s=>s.i)),cur=new Map(),text=state.raw.slice(sel.s,sel.e);
  A.findings.forEach(f=>{if(ids.has(f.s)&&active(f)&&!f.para)cur.set(nsig(f),f);});
  const w=wasInfo();state.keptNow=!w||!!w.fresh||keptShare(w.text,text)>=KEEP;
  const p=state.fxPrev;
  if(p&&p.key===sel.s&&p.text!==text&&state.keptNow){const gone=new Set([...p.map.keys()].filter(k=>!cur.has(k)));
    if(gone.size){state.fxNew=true;asideFor([...gone].map(k=>p.map.get(k)));state.fx={ids,at:performance.now(),text:state.wbAllText||'',ghosts:(state.wbAll||[]).filter(m=>m.sig&&gone.has(m.sig)).map(m=>({a:m.a,b:m.b,cls:'gone hb-'+LBY[m.lens].hue,lens:m.lens,tip:'Resolved. '+m.tip}))};}}
  if(!state.scrubbing){const hk=vKey(),H=(state.hist||(state.hist={}))[hk]||(state.hist[hk]=[]),t=Date.now();
    if(!H.length||H[H.length-1]!==text){if(H.length>1&&p&&p.key===sel.s&&state.typing&&state.histTyped&&t-(state.histAt||0)<900)H[H.length-1]=text;else H.push(text);state.histTyped=!!state.typing;state.histAt=t;if(H.length>80)H.shift();}}
  state.fxPrev={key:sel.s,text,map:cur};}
function remap(marks,o,n){let p=0;const L=Math.min(o.length,n.length);while(p<L&&o[p]===n[p])p++;let s=0;while(s<L-p&&o[o.length-1-s]===n[n.length-1-s])s++;const d=n.length-o.length;
  return marks.map(m=>{let a=m.a<=p?m.a:m.a>=o.length-s?m.a+d:p,b=m.b<=p?m.b:m.b>=o.length-s?m.b+d:n.length-s;
    if(b<=a){a=Math.min(a,n.length);b=a;while(a>0&&/\S/.test(n[a-1]))a--;while(b<n.length&&/\S/.test(n[b]))b++;}
    return Object.assign({},m,{a,b});}).filter(m=>m.b>m.a);}
function ledger(){baseline();const A0=state.A0,A=state.A,d=docDiff(),mapB=new Array(d.A.length).fill(-1);
  d.ops.forEach(op=>{if(op.k==='eq')for(let j=op.a0;j<op.a1;j++)mapB[j]=op.b0+j-op.a0;});
  const insOf=new Array(d.A.length).fill(null);d.ops.forEach((op,qi)=>{const nx=d.ops[qi+1];if(op.k==='del'&&nx&&nx.k==='ins'&&nx.b0===op.b0)for(let j=op.a0;j<op.a1;j++)insOf[j]=nx;});
  const L={n0:A0.findings.length,open:A.findings.filter(active).length,dis:A.findings.filter(f=>f.dis).length,res:0,cutN:0,fresh:0,rew:0,cut:0,added:0,same:0,pairs:[],kinds:{surface:0,add:0,cut:0,both:0}},baseSig=new Map();let ti=0;
  A0.sents.forEach(bs=>{while(ti<d.A.length&&d.A[ti].e<=bs.s)ti++;let lo=-1,hi=-1;for(let k=ti;k<d.A.length&&d.A[k].s<bs.e;k++){const b=mapB[k];if(b>=0){if(lo<0)lo=b;hi=b;}}
    if(lo<0)for(let k=ti;k<d.A.length&&d.A[k].s<bs.e;k++){const x=insOf[k];if(x){if(lo<0)lo=x.b0;hi=Math.max(hi,x.b1-1);}}
    const cs=lo<0?[]:A.sents.filter(s=>s.s<d.B[hi].e&&s.e>d.B[lo].s),now=cs.map(s=>s.text).join(' '),ok=cs.length>0&&keptShare(bs.text,now)>=KEEP,same=cs.length===1&&cs[0].text.trim()===bs.text.trim();
    let kind=null;if(same)L.same++;else if(ok){L.rew++;kind=E.revKind(bs.text,now);L.kinds[kind.kind]++;}else L.cut++;L.pairs.push({b:bs.i,ids:cs.map(s=>s.i),same,kind});
    const sig0=new Set(A0.findings.filter(f=>f.s===bs.i&&!f.para).map(nsig)),ids=new Set(cs.map(s=>s.i)),sigN=new Set(A.findings.filter(f=>ids.has(f.s)&&!f.para).map(nsig));
    sig0.forEach(s=>{if(!sigN.has(s)){if(ok)L.res++;else L.cutN++;}});
    if(ok||same)cs.forEach(s=>{let m=baseSig.get(s.i);if(!m)baseSig.set(s.i,m=new Set());sig0.forEach(x=>m.add(x));});});
  A.sents.forEach(s=>{const m=baseSig.get(s.i);if(!m)L.added++;A.findings.forEach(f=>{if(f.s===s.i&&!f.para&&active(f)&&!(m&&m.has(nsig(f))))L.fresh++;});});
  return L;}
function receipt(){const L=ledger(),A0=state.A0,A=state.A,R0=A0.rhythm.all,R1=A.rhythm.all,f1=v=>v==null?'–':String(Math.round(v*10)/10),mx=X=>X.sents.reduce((a,s)=>Math.max(a,s.preV||0),0),np=A.paras.filter(p=>p.ord!=null).length;
  return ['Revision receipt · Topic & Emphasis · '+new Date().toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}),'',
    'Sentences rewritten: '+L.rew+' of '+A0.sents.length+(L.cut?' · cut: '+L.cut:'')+(L.added?' · added: '+L.added:''),
    ...(L.rew?['  of these: wording only '+L.kinds.surface+' · content added '+L.kinds.add+' · content removed '+L.kinds.cut+' · both '+L.kinds.both]:[]),
    'Notes resolved by rewriting: '+L.res,
    'Notes weighed and kept as they are: '+L.dis,
    'Notes that went with cut text (not counted): '+L.cutN,
    'New notes the edits brought in: '+L.fresh,
    'Open notes: '+L.n0+' at the start, '+L.open+' now',
    'Paragraphs settled: '+(state.setP?state.setP.size:0)+' of '+np,'',
    'Words before the main verb: median '+f1(R0.pre)+' → '+f1(R1.pre)+', longest '+mx(A0)+' → '+mx(A),
    'Words per sentence: mean '+f1(R0.mean)+' → '+f1(R1.mean)+', longest '+R0.max+' → '+R1.max,''].concat(A0.research&&A.research?(()=>{const a=resRows(A0),b=resRows(A),pick=['Paragraph links','Sentence links','Connectives','Word variety','Readability formulas','Typing slips'];return ['Research profile, start → now'].concat(a.map((r,i)=>pick.includes(r.n)?'  '+r.n+(r.n==='Connectives'?' per 1,000 words':'')+': '+r.v+' → '+b[i].v:null).filter(Boolean),['']);})():[]).concat([
    'Counted by fixed rules, with no AI. A rewrite counts only when it keeps at least four in ten of the sentence’s content words.']).join('\n');}
function newDoc(text,sample){state.raw=text;state.base=text;state.isSample=!!sample;state.sel=null;state.guide=null;state.hot=null;state.tags={};state.dismissed={};state.jobs=[];state.merges=[];state.moves=[];state.emph=[];state.points=[];state.source='';state.connSel=null;state.vers={};state.miles={};state.hist={};state.pass=null;state.passDone=null;state.asideN=0;state.asideUsed=null;state.aside=null;state.pv=null;state.clean=false;state.undo=[];state.redo=[];toastQ.length=0;clearTimeout(toastT);{const te=document.getElementById('toast');if(te)te.hidden=true;}state.kind='';state.title='';state.gridSel=null;state.gridP=null;state.pr=null;state.fx=null;state.fxPrev=null;state.setP=null;state.setAt={};state.had=new Set();state.termSel=new Set();state.open=new Set();state.claim=sample?(text===SAMPLE2?SAMPLE2_CLAIM:SAMPLE_CLAIM):'';const c=$('#claimIn');if(c)c.value=state.claim;save();}
function similar(a,b){const A=new Set(a.toLowerCase().match(/[a-z]{3,}/g)||[]),B=new Set(b.toLowerCase().match(/[a-z]{3,}/g)||[]);if(!A.size||!B.size)return 0;let c=0;A.forEach(w=>{if(B.has(w))c++;});return c/Math.min(A.size,B.size);}

/* ---------- diff ---------- */
function toks(s){const out=[],re=/\S+/g;let m;while((m=re.exec(s)))out.push({t:m[0],s:m.index,e:m.index+m[0].length});return out;}
function diff(A,B){const n=A.length,m=B.length,ops=[];let p=0;while(p<n&&p<m&&A[p].t===B[p].t)p++;let x=0;while(x<n-p&&x<m-p&&A[n-1-x].t===B[m-1-x].t)x++;
  const push=(k,a0,a1,b0,b1)=>{const l=ops[ops.length-1];if(l&&l.k===k&&l.a1===a0&&l.b1===b0){l.a1=a1;l.b1=b1;}else ops.push({k,a0,a1,b0,b1});};
  if(p)push('eq',0,p,0,p);const an=n-p-x,bn=m-p-x;
  if(an&&bn&&an*bn<=4e6){const w=bn+1,dp=new Uint16Array((an+1)*w);
    for(let i=an-1;i>=0;i--)for(let j=bn-1;j>=0;j--)dp[i*w+j]=A[p+i].t===B[p+j].t?dp[(i+1)*w+j+1]+1:Math.max(dp[(i+1)*w+j],dp[i*w+j+1]);
    let i=0,j=0;while(i<an&&j<bn){if(A[p+i].t===B[p+j].t){push('eq',p+i,p+i+1,p+j,p+j+1);i++;j++;}else if(dp[(i+1)*w+j]>=dp[i*w+j+1]){push('del',p+i,p+i+1,p+j,p+j);i++;}else{push('ins',p+i,p+i,p+j,p+j+1);j++;}}
    if(i<an)push('del',p+i,p+an,p+j,p+j);if(j<bn)push('ins',p+an,p+an,p+j,p+bn);}
  else{if(an)push('del',p,p+an,p,p);if(bn)push('ins',p+an,p+an,p,p+bn);}
  if(x)push('eq',n-x,n,m-x,m);return ops;}
function docDiff(){const d=state.dc;if(d&&d.base===state.base&&d.raw===state.raw)return d;const A=toks(state.base),B=toks(state.raw);return state.dc={base:state.base,raw:state.raw,A,B,ops:diff(A,B)};}
function diffHTML(a,b){const A=toks(a),B=toks(b);let h='',cur=0,del=false;
  diff(A,B).forEach(op=>{if(op.k==='del'){h+=(h&&!/\s$/.test(h)?' ':'')+'<del>'+esc(a.slice(A[op.a0].s,A[op.a1-1].e))+'</del>';del=true;return;}
    const txt=b.slice(B[op.b0].s,B[op.b1-1].e),gap=esc(b.slice(cur,B[op.b0].s))||(del?' ':'');cur=B[op.b1-1].e;del=false;h+=gap+(op.k==='ins'?'<ins>'+esc(txt)+'</ins>':esc(txt));});
  return h+esc(b.slice(cur));}

/* ---------- marks ---------- */
function renderMarks(text,marks,plain){
  if(!marks.length)return esc(text);
  const cuts=new Set([0,text.length]);marks.forEach(m=>{cuts.add(m.a);cuts.add(m.b);});
  const pts=[...cuts].sort((x,y)=>x-y),byId=state.A.byId;let h='';
  for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1],seg=text.slice(a,b),ms=marks.filter(m=>m.a<=a&&m.b>=b);
    if(!ms.length){h+=esc(seg);continue;}
    const pick=state.lens==='overview'&&!plain?[ms.reduce((x,y)=>(y.b-y.a)<(x.b-x.a)?y:x)]:ms;
    const cls=[...new Set(pick.flatMap(m=>m.cls.split(' ')))].join(' '),f=pick.find(m=>m.f!=null),fo=f?byId[f.f]:null;
    h+='<span class="mk '+cls+(fo&&fo.key===state.hot?' hot':'')+'"'+(f?' data-f="'+f.f+'"':'')+(plain?'':tipA(fo?(state.lens==='overview'?LBY[fo.lens].n+': ':'')+fo.title+(/[.?!]$/.test(fo.title)?'':'.')+' Tap to open the note.':((pick.find(m=>m.tip)||{}).tip||markTip(state.lens,cls))))+'>'+esc(seg)+'</span>';
    ms.forEach(m=>{if(m.badge&&m.b===b)h+='<span class="bdg '+(m.cls.match(/hb-\w+/)||[''])[0]+'"'+tipA('How many words stand between the subject and its verb.')+'>'+esc(m.badge)+'</span>';});}
  return h;
}
function marksFor(st){const A=state.A,l=state.lens;
  if(l==='outline'||l==='jobs'||l==='compare'||l==='skeleton'||(state.setP&&state.setP.has(st.p)))return[];
  if(l==='grid'){const sel=state.gridSel,ks=new Map(A.grid.terms.filter(g=>!sel||g.k===sel).map(g=>[g.k,g]));
    return st.cw.filter(c=>ks.has(c.k)&&ks.get(c.k).cells[st.i]).map(c=>({a:st.T[c.i].s,b:st.T[c.i].e,cls:c.side==='L'?'hl hb-teal':'hl2 hb-teal',tip:'“'+ks.get(c.k).w+'” is in '+ks.get(c.k).n+' sentences. Here it comes '+(c.side==='L'?'before the main verb, on the topic side of the sentence.':'after the main verb, on the news side of the sentence.')})).concat(st.marks.grid||[]);}
  if(l==='overview')return A.findings.filter(f=>f.s===st.i&&f.a!=null&&active(f)).map(f=>({a:f.a,b:f.b,cls:'fl hb-ink',f:f.id}));
  let ms=(st.marks[l]||[]).map(m=>{if(m.f==null)return m;const f=A.byId[m.f];return f&&f.dis?{a:m.a,b:m.b,cls:m.cls.replace(/\bhl\b/,'hl2')}:m;});
  if(l==='signals'&&state.connSel&&st.conn)ms=ms.concat(st.conn.filter(c=>c.type===state.connSel).map(c=>({a:c.a,b:c.b,cls:'hl hb-amber',tip:CNAME[c.type][0]+' connective: “'+c.w+'”.'})));
  if(l==='terms'&&state.termSel.size)ms=ms.concat(st.cw.filter(c=>state.termSel.has(c.k)).map(c=>({a:st.T[c.i].s,b:st.T[c.i].e,cls:'hl hb-amber'})));
  return ms;}
const spanSents=()=>{const s=state.sel;return s?state.A.sents.filter(st=>st.s<s.e&&st.e>s.s):[];};

/* ---------- rail, card, strip ---------- */

/* ---------- research measures: publications, one box per host lens, and the profile ---------- */
const TOOLS={
 taaco:['Crossley et al. 2016','taaco','Crossley, Kyle & McNamara (2016), the paper that introduced TAACO, a set of cohesion counts, and tested them against human ratings of 313 essays. Tap for the full reference.'],
 cm:['McNamara et al. 2014','cmbook','McNamara, Graesser, McCarthy & Cai (2014), the book that sets out the Coh-Metrix measures of cohesion and language. Tap for the full reference.'],
 mtld:['McCarthy & Jarvis 2010','mtld','McCarthy & Jarvis (2010), the validation study of MTLD, a measure of lexical diversity. Tap for the full reference.'],
 mattr:['Covington & McFall 2010','mattr','Covington & McFall (2010), the paper that introduced the moving-average type-token ratio. Tap for the full reference.'],
 arte:['Choi & Crossley 2021','arte','Choi & Crossley (2021), a preprint describing a tool that runs eight readability formulas side by side. Tap for the full reference.'],
 gamet:['Crossley et al. 2019','gamet','Crossley, Bradfield & Bustamante (2019), who checked automatic flags for errors of grammar and mechanics against human judgement. Tap for the full reference.'],
 itell:['Morris et al. 2025','itell','Morris, Crossley, Holmes, Ou, Dascalu & McNamara (2025), on feedback for summaries that readers write at the end of each section of an interactive textbook. Tap for the full reference.'],
 nation:['Nation 2006','nation06','Nation (2006), who asked how many words a reader needs to know for 98% of a text to be familiar. Tap for the full reference.'],
 danes:['Daneš 1974','danes74','Daneš (1974), who described how the opening of each sentence can be drawn from the text before it. Tap for the full reference.'],
 givon:['Givón 1983','givon83','Givón (1983), who measured how continuous a topic is by the distance back to its last mention and by how long it persists. Tap for the full reference.'],
 biber04:['Biber et al. 2004','biber04','Biber, Conrad & Cortes (2004), on the frequent word sequences they call lexical bundles and the functions they serve. Tap for the full reference.'],
 afl:['Simpson-Vlach & Ellis 2010','afl10','Simpson-Vlach & Ellis (2010), who built the Academic Formulas List. The list is not included in this page. Tap for the full reference.'],
 grim:['Brown & Heathers 2017','grim17','Brown & Heathers (2017), who introduced the GRIM test of whether a reported mean is possible for its sample size. Tap for the full reference.'],
 hyland05:['Hyland 2005','hyland05','Hyland (2005), a model of how academic writers express stance and engage readers. Tap for the full reference.'],
 millar:['Millar et al. 2022','millar22','Millar, Batalo & Budgell (2022), who traced promotional adjectives in the abstracts of funded grant applications. Tap for the full reference.'],
 kobak:['Kobak et al. 2025','kobak25','Kobak, González-Márquez, Horvát & Lause (2025), who listed the words that became unexpectedly common in biomedical abstracts. Tap for the full reference.'],
 faigley:['Faigley & Witte 1981','faigley81','Faigley & Witte (1981), who sorted revisions into those that change the surface and those that change the content. Tap for the full reference.'],
 mac:['Mac et al. 2022','mac22','Mac, Ayre, Bell, McCaffery & Muscat (2022), who showed how far readability calculators disagree on the same text. Tap for the full reference.'],
 conc:['Brysbaert et al. 2014','conc14','Brysbaert, Warriner & Kuperman (2014), concreteness ratings for about 40,000 English words. Tap for the full reference.'],
 aoa:['Kuperman et al. 2012','aoa12','Kuperman, Stadthagen-Gonzalez & Brysbaert (2012), ratings of the age at which about 30,000 English words are learned. Tap for the full reference.'],
 subtlex:['Brysbaert & New 2009','subtlex09','Brysbaert & New (2009), word frequencies counted from film and television subtitles. Tap for the full reference.'],
 prev:['Brysbaert et al. 2019','prev19','Brysbaert, Mandera, McCormick & Keuleers (2019), the share of people who know each of about 62,000 English words. Tap for the full reference.']};
const toolA=t=>'<a class="tool" href="#ref-'+TOOLS[t][1]+'" data-ref="'+TOOLS[t][1]+'"'+tipA(TOOLS[t][2])+'>'+TOOLS[t][0]+'</a>';
const CNAME={add:['Additive','also, moreover, in addition, for example'],con:['Contrastive','but, however, although, whereas'],cau:['Causal','because, therefore, thus, as a result'],tem:['Temporal','then, after, before, while']};
REFS.push(
 ['coleman','Coleman, M., & Liau, T. L. (1975). A computer readability formula designed for machine scoring. <i>Journal of Applied Psychology</i>, 60(2), 283–284.','10.1037/h0076540',''],
 ['bjornsson','Björnsson, C. H. (1968). <i>Läsbarhet</i>. Stockholm: Liber. [The source of the LIX index.]','',''],
 ['anderson83','Anderson, J. (1983). Lix and Rix: Variations on a little-known readability index. <i>Journal of Reading</i>, 26(6), 490–496.','','https://www.jstor.org/stable/40031755'],
 ['gunning','Gunning, R. (1952). <i>The Technique of Clear Writing</i>. New York: McGraw-Hill. [The source of the Fog index.]','',''],
 ['dalechall48','Dale, E., & Chall, J. S. (1948). A formula for predicting readability: Instructions. <i>Educational Research Bulletin</i>, 27(2), 37–54.','','https://www.jstor.org/stable/1473169'],
 ['challdale95','Chall, J. S., & Dale, E. (1995). <i>Readability Revisited: The New Dale-Chall Readability Formula</i>. Cambridge, MA: Brookline Books. [The list of familiar words used here is the copy in the open-source package dale-chall, MIT licence.]','','https://github.com/words/dale-chall'],
 ['mac22','Mac, O., Ayre, J., Bell, K., McCaffery, K., & Muscat, D. M. (2022). Comparison of readability scores for written health information across formulas using automated vs manual measures. <i>JAMA Network Open</i>, 5(12), e2246051.','','https://pmc.ncbi.nlm.nih.gov/articles/PMC9856555/'],
 ['quanteda','Benoit, K., Watanabe, K., Wang, H., Nulty, P., Obeng, A., Müller, S., & Matsuo, A. (2018). quanteda: An R package for the quantitative analysis of textual data. <i>Journal of Open Source Software</i>, 3(30), 774.','10.21105/joss.00774',''],
 ['nation06','Nation, I. S. P. (2006). How large a vocabulary is needed for reading and listening? <i>The Canadian Modern Language Review</i>, 63(1), 59–82.','','https://www.wgtn.ac.nz/__data/assets/pdf_file/0018/1626120/2006-How-large-a-vocab.pdf'],
 ['danes74','Daneš, F. (1974). Functional sentence perspective and the organization of the text. In F. Daneš (Ed.), <i>Papers on Functional Sentence Perspective</i> (pp. 106–128). Prague: Academia.','','https://www.coli.uni-saarland.de/~korbay/Courses/esslli04/Scans/danes74.pdf'],
 ['givon83','Givón, T. (Ed.). (1983). <i>Topic Continuity in Discourse: A Quantitative Cross-Language Study</i>. Amsterdam: John Benjamins.','10.1075/tsl.3',''],
 ['witte83','Witte, S. P. (1983). Topical structure and revision: An exploratory study. <i>College Composition and Communication</i>, 34(3), 313–341.','',''],
 ['connor90','Connor, U., & Farmer, M. (1990). The teaching of topical structure analysis as a revision strategy for ESL writers. In B. Kroll (Ed.), <i>Second Language Writing: Research Insights for the Classroom</i> (pp. 126–139). Cambridge University Press.','10.1017/CBO9781139524551.013',''],
 ['barzilay08','Barzilay, R., & Lapata, M. (2008). Modeling local coherence: An entity-based approach. <i>Computational Linguistics</i>, 34(1), 1–34.','10.1162/coli.2008.34.1.1',''],
 ['biber04','Biber, D., Conrad, S., & Cortes, V. (2004). If you look at …: Lexical bundles in university teaching and textbooks. <i>Applied Linguistics</i>, 25(3), 371–405.','10.1093/applin/25.3.371',''],
 ['afl10','Simpson-Vlach, R., & Ellis, N. C. (2010). An Academic Formulas List: New methods in phraseology research. <i>Applied Linguistics</i>, 31(4), 487–512. [Link: the authors’ prepublication copy.]','','https://public.websites.umich.edu/~ncellis/NickEllis/Publications_files/AFL_paper_AppLinxPrepub.pdf'],
 ['grim17','Brown, N. J. L., & Heathers, J. A. J. (2017). The GRIM test: A simple technique detects numerous anomalies in the reporting of results in psychology. <i>Social Psychological and Personality Science</i>, 8(4), 363–369.','10.1177/1948550616673876',''],
 ['hyland05','Hyland, K. (2005). Stance and engagement: A model of interaction in academic discourse. <i>Discourse Studies</i>, 7(2), 173–192.','10.1177/1461445605050365',''],
 ['millar22','Millar, N., Batalo, B., & Budgell, B. (2022). Trends in the use of promotional language (hype) in abstracts of successful National Institutes of Health grant applications, 1985–2020. <i>JAMA Network Open</i>, 5(8), e2228676.','10.1001/jamanetworkopen.2022.28676',''],
 ['kobak25','Kobak, D., González-Márquez, R., Horvát, E.-Á., & Lause, J. (2025). Delving into LLM-assisted writing in biomedical publications through excess vocabulary. <i>Science Advances</i>, 11(27), eadt3813. [Word list: github.com/berenslab/llm-excess-vocab, MIT licence.]','10.1126/sciadv.adt3813',''],
 ['faigley81','Faigley, L., & Witte, S. (1981). Analyzing revision. <i>College Composition and Communication</i>, 32(4), 400–414.','',''],
 ['conc14','Brysbaert, M., Warriner, A. B., & Kuperman, V. (2014). Concreteness ratings for 40 thousand generally known English word lemmas. <i>Behavior Research Methods</i>, 46(3), 904–911.','10.3758/s13428-013-0403-5',''],
 ['aoa12','Kuperman, V., Stadthagen-Gonzalez, H., & Brysbaert, M. (2012). Age-of-acquisition ratings for 30,000 English words. <i>Behavior Research Methods</i>, 44(4), 978–990.','10.3758/s13428-012-0210-4',''],
 ['subtlex09','Brysbaert, M., & New, B. (2009). Moving beyond Kučera and Francis: A critical evaluation of current word frequency norms and the introduction of a new and improved word frequency measure for American English. <i>Behavior Research Methods</i>, 41(4), 977–990.','10.3758/BRM.41.4.977',''],
 ['zipf14','van Heuven, W. J. B., Mandera, P., Keuleers, E., & Brysbaert, M. (2014). SUBTLEX-UK: A new and improved word frequency database for British English. <i>Quarterly Journal of Experimental Psychology</i>, 67(6), 1176–1190. [The source of the Zipf scale.]','10.1080/17470218.2013.850521',''],
 ['prev19','Brysbaert, M., Mandera, P., McCormick, S. F., & Keuleers, E. (2019). Word prevalence norms for 62,000 English lemmas. <i>Behavior Research Methods</i>, 51(2), 467–479.','10.3758/s13428-018-1077-9',''],
 ['taaco','Crossley, S. A., Kyle, K., & McNamara, D. S. (2016). The tool for the automatic analysis of text cohesion (TAACO): Automatic assessment of local, global, and text cohesion. <i>Behavior Research Methods</i>, 48(4), 1227–1237.','10.3758/s13428-015-0651-7',''],
 ['taaco2','Crossley, S. A., Kyle, K., & Dascalu, M. (2019). The Tool for the Automatic Analysis of Cohesion 2.0: Integrating semantic similarity and text overlap. <i>Behavior Research Methods</i>, 51(1), 14–27.','10.3758/s13428-018-1142-4',''],
 ['taaled','Kyle, K., Crossley, S. A., & Jarvis, S. (2021). Assessing the validity of lexical diversity indices using direct judgements. <i>Language Assessment Quarterly</i>, 18(2), 154–170.','10.1080/15434303.2020.1844205',''],
 ['gamet','Crossley, S. A., Bradfield, F., & Bustamante, A. (2019). Using human judgments to examine the validity of automated grammar, syntax, and mechanical errors in writing. <i>Journal of Writing Research</i>, 11(2), 251–270.','10.17239/jowr-2019.11.02.01',''],
 ['arte','Choi, J. S., & Crossley, S. A. (2021). <i>Readability assessment tool for English texts</i> (EasyChair Preprint 6190).','','https://easychair.org/publications/preprint/pgb8'],
 ['itell','Morris, W., Crossley, S., Holmes, L., Ou, C., Dascalu, M., & McNamara, D. (2025). Formative feedback on student-authored summaries in intelligent textbooks using large language models. <i>International Journal of Artificial Intelligence in Education</i>, 35, 1022–1043.','10.1007/s40593-024-00395-0',''],
 ['cohmetrix','Graesser, A. C., McNamara, D. S., Louwerse, M. M., & Cai, Z. (2004). Coh-Metrix: Analysis of text on cohesion and language. <i>Behavior Research Methods, Instruments, & Computers</i>, 36(2), 193–202.','10.3758/BF03195564',''],
 ['cmbook','McNamara, D. S., Graesser, A. C., McCarthy, P. M., & Cai, Z. (2014). <i>Automated evaluation of text and discourse with Coh-Metrix</i>. Cambridge University Press.','10.1017/CBO9780511894664',''],
 ['mtld','McCarthy, P. M., & Jarvis, S. (2010). MTLD, vocd-D, and HD-D: A validation study of sophisticated approaches to lexical diversity assessment. <i>Behavior Research Methods</i>, 42(2), 381–392.','10.3758/BRM.42.2.381',''],
 ['mattr','Covington, M. A., & McFall, J. D. (2010). Cutting the Gordian knot: The moving-average type–token ratio (MATTR). <i>Journal of Quantitative Linguistics</i>, 17(2), 94–100.','',''],
 ['kincaid','Kincaid, J. P., Fishburne, R. P., Jr., Rogers, R. L., & Chissom, B. S. (1975). <i>Derivation of new readability formulas (Automated Readability Index, Fog Count and Flesch Reading Ease Formula) for Navy enlisted personnel</i> (Research Branch Report 8-75). Chief of Naval Technical Training, Naval Air Station Memphis.','','https://apps.dtic.mil/sti/pdfs/ADA006655.pdf'],
 ['ari','Smith, E. A., & Senter, R. J. (1967). <i>Automated Readability Index</i> (AMRL-TR-66-220). Aerospace Medical Research Laboratories, Wright-Patterson Air Force Base.','','https://apps.dtic.mil/sti/pdfs/AD0667273.pdf'],
 ['smog','McLaughlin, G. H. (1969). SMOG grading: A new readability formula. <i>Journal of Reading</i>, 12(8), 639–646.','',''],
 ['halliday','Halliday, M. A. K., & Hasan, R. (1976). <i>Cohesion in English</i>. Longman.','','']);
[['grid',['taaco','Crossley, Kyle & McNamara'],['cmbook','McNamara, Graesser et al.']],['signals',['cmbook','McNamara, Graesser et al.'],['taaco','Crossley, Kyle & McNamara']],['flow',['taaco','Crossley, Kyle & McNamara']],['terms',['taaco','Crossley, Kyle & McNamara']],['vocab',['mtld','McCarthy & Jarvis'],['mattr','Covington & McFall']],['sv',['cmbook','McNamara, Graesser et al.']],['clutter',['cmbook','McNamara, Graesser et al.']],['voice',['cmbook','McNamara, Graesser et al.']],['rhythm',['arte','Choi & Crossley'],['kincaid','Kincaid et al.']],['checks',['cmbook','McNamara, Graesser et al.'],['gamet','Crossley, Bradfield & Bustamante']],['outline',['itell','Morris et al.']]].forEach(a=>{(SRC[a[0]]||(SRC[a[0]]=[])).push(...a.slice(1));});
const rpc=(a,b)=>b?Math.round(100*a/b)+'%':'–',rr1=v=>v==null?'–':String(Math.round(v*10)/10),rgr=v=>String(Math.max(0,Math.round(v)));
const RESB={
 grid:(A,R)=>{const O=R.over;return{t:['taaco','cm'],
  fig:(O.pp?'<b>'+O.ph+' of '+O.pp+'</b> paragraph '+(O.pp===1?'join carries':'joins carry')+' a content word across. ':'')+(O.lp?'<b>'+rpc(O.lh,O.lp)+'</b> of neighbouring sentences share one'+(O.gp?', and <b>'+rpc(O.gh,O.gp)+'</b> of all sentence pairs do.':'.'):'Overlap needs at least two sentences.'),
  found:'In 313 student essays, word overlap between neighbouring paragraphs went with higher ratings of coherence and of overall quality. Overlap between neighbouring sentences did not ('+rf('taaco','Crossley, Kyle & McNamara 2016')+'). In an earlier study of 120 essays, none of thirteen measures of overlap between sentences separated the higher-rated from the lower-rated ('+rf('mcnamara','McNamara, Crossley & McCarthy 2010')+'). So read the paragraph figure first. The line above each paragraph in the text names the words it carries over.',
  here:'Words are matched by their stems. There is no lemmatiser, no synonym list and no model of meaning. The published measures also use latent semantic analysis ('+rf('cohmetrix','Graesser et al. 2004')+') and word-vector similarity ('+rf('taaco2','Crossley, Kyle & Dascalu 2019')+').'};},
 signals:(A,R)=>{const C=R.conn,b=C.by;return{t:['cm','taaco'],
  fig:'<b>'+C.n+'</b> '+(C.n===1?'connective':'connectives')+', or <b>'+rr1(C.per)+'</b> per 1,000 words. Tap a type to see them in the text.',
  extra:'<div class="chips">'+Object.keys(CNAME).map(k=>'<button type="button" class="chip'+(state.connSel===k?' on':'')+(b[k]?'':' zero')+'" id="cn-'+k+'" data-conn="'+k+'" aria-pressed="'+(state.connSel===k)+'"'+tipA(CNAME[k][0]+' connectives, such as '+CNAME[k][1]+'. Tap to highlight them in the text, and again to clear.')+'>'+CNAME[k][0]+' <b>'+b[k]+'</b></button>').join('')+'</div>',
  found:'A connective states the relation between two ideas outright, so the reader does not have to infer it. Coh-Metrix counts connectives by type ('+rf('cmbook','McNamara et al. 2014')+'), and the four types here are the classes of conjunction in '+rf('halliday','Halliday & Hasan (1976)')+'. More is not better. Connective counts had little or no relation to rated coherence in '+rf('taaco','Crossley et al. (2016)')+', and none of thirteen connective measures separated higher-rated essays in '+rf('mcnamara','McNamara et al. (2010)')+'. A type with a count of zero is still worth a look: a draft that argues with no “because” or “therefore” may be leaving its reasoning unstated.',
  here:'These are fixed word lists, shorter than the published ones. Bare “and” and “or” are left out. So are “since” and “as”, which can be causal or temporal. “While” is counted as temporal even where it marks a contrast.'};},
 flow:(A,R)=>({t:['taaco'],
  fig:'<b>'+rpc(R.given.old,R.given.cw)+'</b> of content words were already used in an earlier sentence. <b>'+rr1(R.given.per100)+'</b> personal pronouns per 100 words.',
  found:'Crossley, Kyle & McNamara call this givenness: how much of each sentence the reader can recover from what came before. It is the idea behind putting old information before new ('+rf('haviland','Haviland & Clark 1974')+'). In their study, essays with a higher ratio of pronouns to nouns were rated lower in quality ('+rf('taaco','Crossley et al. 2016')+'). A pronoun is given information only if the reader can tell what it points to.',
  here:'This page has no part-of-speech tagger, so it cannot count nouns. It reports pronouns per 100 words where the study used pronouns per noun, and it counts only I, we, you, he, she, it, they and their object forms.'}),
 terms:(A,R)=>({t:['taaco'],
  fig:'<b>'+R.once.once+' of '+R.once.types+'</b> different content words appear only once.',
  found:'Essays with a higher type-token ratio (more different words, fewer repeated ones) were rated lower in quality ('+rf('taaco','Crossley, Kyle & McNamara 2016')+'). A term that comes back keeps its topic in view. A term used once is a detail, or it is a second name for something you have already named.',
  here:'Counted on the stems of all content words, while the lists below cover nouns only. The type-token ratio itself is not shown, because it falls as any text gets longer.'}),
 vocab:(A,R)=>{const X=R.lex;return{t:['mtld','mattr'],
  fig:X.mtld==null?'Word variety needs at least 50 words. This draft has '+X.n+'.':'Word variety: <b>MTLD '+Math.round(X.mtld)+'</b> · <b>MATTR '+X.mattr.toFixed(2)+'</b>.'+(X.n<100?' Under 100 words, read both as rough.':''),
  found:'MTLD is the average number of words the text runs before its share of new words falls below a set level ('+rf('mtld','McCarthy & Jarvis 2010')+'). MATTR is the average share of different words in every stretch of 50 ('+rf('mattr','Covington & McFall 2010')+'). Both were designed so that the score does not simply fall as a text gets longer, as the plain type-token ratio does. In 120 student essays the higher-rated group averaged an MTLD of 79 and the lower-rated group 73 ('+rf('mcnamara','McNamara et al. 2010')+'). Human ratings of how varied an essay’s wording is track the plain number of different words more closely than any ratio ('+rf('taaled','Kyle, Crossley & Jarvis 2021')+'). A research paper is a different case: repeating your key terms exactly is good practice, so a low figure is not a fault.',
  here:'Counted on word forms, not lemmas, so “study” and “studies” are two words. A count made on lemmas would come out a little lower.'};},
 sv:(A,R)=>({t:['cm'],
  fig:R.pre.median==null?'No main verb found yet.':'Median <b>'+rr1(R.pre.median)+'</b> words before the main verb. Longest wait: <b>'+R.pre.max+'</b> words, in sentence '+(R.pre.maxI+1)+'.',
  found:'Coh-Metrix counts the words before the main verb as a measure of syntactic complexity ('+rf('cmbook','McNamara et al. 2014')+'). Holding a subject in mind until its verb arrives costs working memory ('+rf('gibson','Gibson 1998')+'). In 120 student essays this was the strongest of three measures that separated the higher-rated from the lower-rated, and the better essays had <i>more</i> words before the main verb: 4.9 on average against 4.1 ('+rf('mcnamara','McNamara et al. 2010')+'). A long wait is a cost to weigh against what the opening does. It is not an error.',
  here:'The main verb is found by rules, not by a parser, so an unusual sentence can be misread. Open the sentence and check which verb is marked.'}),
 clutter:(A,R)=>({t:['cm'],
  fig:'<b>'+R.neg.n+'</b> negation '+(R.neg.n===1?'word':'words')+', or <b>'+rr1(R.neg.per)+'</b> per 1,000 words. <b>'+R.neg.stack+'</b> stacked.',
  found:'Coh-Metrix reports negation density among its measures of syntax ('+rf('cmbook','McNamara et al. 2014')+'). One negative is plain enough. Two in a clause make the reader reverse the meaning twice, and those are the ones this lens puts a note on.',
  here:'It counts not, no, never, neither, none, nothing, without, cannot and contractions in n’t. Negative prefixes such as un- and in- are seen only in a fixed list of pairs like “not uncommon”.'}),
 voice:(A,R)=>({t:['cm'],
  fig:(R.pas.n?'<b>'+R.pas.agentless+' of '+R.pas.n+'</b> '+(R.pas.n===1?'passive names':'passives name')+' no agent.':'No passives found.')+' Pronouns: <b>'+R.simple.p1+'</b> first person (I, we), <b>'+R.simple.p2+'</b> second (you), <b>'+R.simple.p3+'</b> third (it, they).',
  found:'Coh-Metrix counts agentless passives as a measure of their own ('+rf('cmbook','McNamara et al. 2014')+'). '+rf('gs','Gopen and Swan')+' do not object to the passive, which is often the way to put old information first. The question for each one is whether the reader needs to know who acted. Where the actor is you, the first person names it in one word: “we measured”.',
  here:'A passive is found from a form of “be” followed by a participle, and an agent from a “by” phrase after it. A passive whose participle the rules do not know is missed.'}),
 rhythm:(A,R)=>{const X=R.read;return{t:['arte','mac'],
  fig:!X?'':'The classic formulas put this draft between <b>US grade '+rgr(X.lo)+' and '+rgr(X.hi)+'</b>: Flesch-Kincaid '+rgr(X.fk)+', ARI '+rgr(X.ari)+', SMOG '+rgr(X.smog)+', Coleman-Liau '+rgr(X.cl)+', Gunning Fog '+rgr(X.fog)+'. Flesch reading ease <b>'+Math.round(X.fre)+'</b> out of 100. LIX <b>'+Math.round(X.lix)+'</b>'+(X.dale?' · Dale-Chall <b>'+rr1(X.dale.score)+'</b>, with <b>'+Math.round(X.dale.pdw)+'%</b> of words off its list of familiar words':'')+'. Plain counts: <b>'+rr1(R.simple.lpw)+'</b> letters per word, <b>'+rr1(R.simple.spp)+'</b> sentences and <b>'+Math.round(R.simple.wpp)+'</b> words per paragraph.',
  found:rf('arte','Choi & Crossley (2021)')+' built a tool that runs eight readability formulas side by side. The formulas rarely agree, which is why this is a range. Each is built from sentence length and word length alone ('+rf('flesch','Flesch 1948')+'; '+rf('kincaid','Kincaid et al. 1975')+'; '+rf('ari','Smith & Senter 1967')+'; '+rf('smog','McLaughlin 1969')+'). Coleman-Liau ('+rf('coleman','Coleman & Liau 1975')+') and LIX ('+rf('bjornsson','Björnsson 1968')+'; '+rf('anderson83','Anderson 1983')+') count letters where the others count syllables, and Gunning’s Fog index ('+rf('gunning','Gunning 1952')+') counts words of three syllables or more. LIX is not a school grade: it is the average sentence length plus the percentage of words longer than six letters, and higher means harder. The Dale-Chall formula ('+rf('dalechall48','Dale & Chall 1948')+') uses the share of words missing from a list of about 3,000 familiar words; the list here is the 1995 revision ('+rf('challdale95','Chall & Dale 1995')+'). On its authors’ table a score of 8.0 to 8.9 is grades 11 and 12, and 9.0 to 9.9 is college. When '+rf('mac22','Mac et al. (2022)')+' ran the same health texts through different calculators, one formula gave results up to 12.9 grades apart, and 2.1 grades apart once every text was prepared in the same way. The formulas were fitted to school reading passages and military training material, not to research articles, and they are blind to order, cohesion and meaning. Grade 13 and above means college level. Plain counts are not to be looked down on: a handful of them predicted essay scores about as well as a far larger set of measures ('+rf('sinlp','Crossley, Allen, Kyle & McNamara 2014')+').',
  here:'Syllables are estimated from spelling, so Flesch-Kincaid, SMOG and Fog can each be off by about a grade. Coleman-Liau, ARI and LIX need no syllables, so they are exact for this text. The Dale-Chall figure applies the 1948 equation to the 1995 list, as most calculators do, and matches inflected forms to the list by rule. The repository holds a fixed set of test passages and a script that records what two other calculators give for them (tests/readability). SMOG was designed for samples of 30 sentences'+(X&&X.n<30?', and this draft has '+X.n:'')+'. Newer readability measures rely on trained models and are not reproduced here.'};},
 checks:(A,R)=>({t:['cm'],
  fig:R.tense.pairs?'<b>'+rpc(R.tense.same,R.tense.pairs)+'</b> of neighbouring sentences keep the same tense.':'Tense repetition needs two sentences with a readable tense.',
  found:'Coh-Metrix scores temporal cohesion as how often tense and aspect repeat from one sentence to the next ('+rf('cmbook','McNamara et al. 2014')+'). The strip above each paragraph shows the tense of every main verb, so a change you did not intend stands out. A change is right when you move from what you did (past) to what holds in general (present).',
  here:'Tense is read from the main verb by rule, and aspect is not read. A verb the rules cannot read shows as “?”.'}),
 slips:(A,R)=>({t:['gamet'],
  fig:'<b>'+R.slips+'</b> likely '+(R.slips===1?'slip':'slips')+' flagged.',
  found:rf('gamet','Crossley, Bradfield & Bustamante (2019)')+' checked automatic flags for errors of grammar and mechanics against human judgement. What was flagged was mostly right, and many errors were missed, punctuation most of all. Expect the same here: trust a flag, and do not trust the absence of one.',
  here:'These are about two dozen fixed patterns, chosen so that a flag is nearly always right. There is no dictionary, so misspellings are not found, and no grammar is parsed.'}),
 outline:(A,R)=>({t:['itell'],
  fig:R.points.given?'<b>'+R.points.ok+' of '+R.points.given+'</b> '+(R.points.given===1?'point you stated sits':'points you stated sit')+' in the opening or the close of '+(R.points.given===1?'its':'their')+' paragraph.':'Write the point of each paragraph in the box above it. None stated yet, of '+R.points.of+'.',
  found:'In the interactive textbooks studied by '+rf('itell','Morris et al. (2025)')+', readers write a summary in their own words at the end of each section. The same move works on your own draft. Say what a paragraph is for, then check that the paragraph says it where readers look: at its opening or its close ('+rf('gs','Gopen & Swan 1990')+').',
  here:'In that study trained language models score each summary. Here a fixed rule checks only whether at least half of your point’s content words appear in the first sentence or in the last. Nothing judges whether the point is a good one.'})};
Object.assign(TOOLS,{
 taassc:['Kyle & Crossley 2018','taassc','Kyle & Crossley (2018), who compared sentence-level, clause-level and phrase-level measures of syntactic complexity as predictors of rated essay quality. Tap for the full reference.'],
 biber:['Biber & Gray 2010','biber','Biber & Gray (2010), on how academic writing compresses meaning into noun phrases. Tap for the full reference.'],
 sinlp:['Crossley et al. 2014','sinlp','Crossley, Allen, Kyle & McNamara (2014), who found that a few simple counts predicted essay scores about as well as a much larger set of measures. Tap for the full reference.'],
 crat:['Crossley et al. 2016 (EDM)','crat','Crossley, Kyle, Davenport & McNamara (2016), a conference paper on scoring written answers partly by their overlap with the material learned. Tap for the full reference.'],
 cla:['Kyle et al. 2015','cla','Kyle, Crossley & Kim (2015), the study cited for the method of counting words from a list the researcher defines. Tap for the full reference.']});
REFS.push(
 ['taassc','Kyle, K., & Crossley, S. A. (2018). Measuring syntactic complexity in L2 writing using fine-grained clausal and phrasal indices. <i>The Modern Language Journal</i>, 102(2), 333–349.','10.1111/modl.12468',''],
 ['sinlp','Crossley, S. A., Allen, L. K., Kyle, K., & McNamara, D. S. (2014). Analyzing discourse processing using a simple natural language processing tool. <i>Discourse Processes</i>, 51(5–6), 511–534.','10.1080/0163853X.2014.910723',''],
 ['crat','Crossley, S., Kyle, K., Davenport, J., & McNamara, D. S. (2016). Automatic assessment of constructed response data in a chemistry tutor. In <i>Proceedings of the 9th International Conference on Educational Data Mining</i> (pp. 336–340).','',''],
 ['cla','Kyle, K., Crossley, S. A., & Kim, Y. J. (2015). Native language identification and writing proficiency. <i>International Journal of Learner Corpus Research</i>, 1(2), 187–209.','10.1075/ijlcr.1.2.01kyl','']);
SRC.dense.push(['taassc','Kyle & Crossley']);SRC.action.push(['taassc','Kyle & Crossley']);SRC.terms.push(['cla','Kyle, Crossley & Kim'],['crat','Crossley, Kyle, Davenport & McNamara']);SRC.rhythm.push(['sinlp','Crossley, Allen et al.']);
RESB.dense=(A,R)=>({t:['taassc','biber'],
  fig:'<b>'+R.phrase.stacks+'</b> noun '+(R.phrase.stacks===1?'stack':'stacks')+' and <b>'+R.phrase.chains+'</b> preposition '+(R.phrase.chains===1?'chain':'chains')+', or <b>'+rr1(R.phrase.per)+'</b> per 100 words.',
  found:'In essays by second-language writers, measures of complexity inside the phrase predicted rated quality better than measures of the sentence or the clause ('+rf('taassc','Kyle & Crossley 2018')+'). Academic prose packs its meaning into noun phrases more than into clauses ('+rf('biber','Biber & Gray 2010')+'). So the phrase is where density lives. A stack or a chain is compact for the writer, and slow for a reader who does not already know how its nouns relate.',
  here:'Kyle and Crossley used a parser to measure every noun phrase. This page counts only the two patterns its rules can find: nouns stacked in a row before a head noun, and prepositional phrases in a row.'});
RESB.action=(A,R)=>({t:['biber','taassc'],
  fig:'<b>'+R.phrase.noms+'</b> '+(R.phrase.noms===1?'nominalisation':'nominalisations')+', or <b>'+rr1(R.phrase.nomPer)+'</b> per 100 words. <b>'+R.phrase.nomNotes+'</b> '+(R.phrase.nomNotes===1?'holds':'hold')+' the action of '+(R.phrase.nomNotes===1?'its':'their')+' sentence.',
  found:'Nouns made from verbs are a main way academic prose compresses ('+rf('biber','Biber & Gray 2010')+'), and phrase-level measures were the better predictors of rated quality in '+rf('taassc','Kyle & Crossley (2018)')+'. So a high count is not a fault. '+rf('gs','Gopen and Swan')+'’s fifth principle is narrower: the trouble starts when the noun holds the action and the verb is left empty. Those are the ones with a note.',
  here:'A nominalisation is found by its ending (-tion, -sion, -ment) and a fixed list, so some are missed, and a few words that only look like one are counted.'});
function termsMore(){const A=state.A,R=A.research||{},M=R.mine||[],X=R.source,keep=M.filter(e=>!e.avoid),av=M.filter(e=>e.avoid),
    mchip=e=>'<span class="chip'+(e.count?'':' zero')+'"'+tipA(e.count?'Found '+e.count+(e.count===1?' time':' times')+', in sentence'+(e.sents.length>1?'s ':' ')+e.sents.map(i=>i+1).join(', ')+'.':'Not in the draft.')+'>'+esc(e.w)+' <b>'+e.count+'</b></span>';
  let h='<div class="panel"><label class="cap" for="myList"'+tipA('Words and phrases you choose. The lens counts them, underlines them in the text, and puts a note on any you marked to avoid. The list stays in this browser and is kept from one draft to the next.')+'>Your own word list <span class="rtools">'+toolA('cla')+' '+toolA('sinlp')+'</span></label>'+
    '<p>One word or phrase to a line. End with * to catch any ending: <span class="mono">particip*</span>. Start a line with - for wording you want to avoid: <span class="mono">-prove*</span>. The list is read when you leave the box.</p>'+
    '<textarea id="myList" class="listin" rows="4" spellcheck="false" placeholder="social capital&#10;particip*&#10;-very&#10;-prove*">'+esc(state.mylist||'')+'</textarea>'+
    (keep.length?'<span class="cap sub">To keep in view</span><div class="chips">'+keep.map(mchip).join('')+'</div>':'')+
    (av.length?'<span class="cap sub">To avoid</span><div class="chips">'+av.map(mchip).join('')+'</div>':'')+
    '<p><b>Where this comes from.</b> Counting the words on a list you define yourself is the method cited to '+rf('cla','Kyle, Crossley & Kim (2015)')+'. Simple counts of this kind predicted essay scores about as well as a much larger set of measures ('+rf('sinlp','Crossley, Allen, Kyle & McNamara 2014')+'). Here the list is yours: the terms your course or your argument depends on, and the words a supervisor has asked you to drop.</p>'+
    '<p><b>How this count differs.</b> It matches spelling only, ignoring capitals. It does not know that “analysis” and “analyses” are one word unless you write <span class="mono">analys*</span>.</p></div>';
  return h;}
function sourcePanel(){const A=state.A,R=A.research||{},X=R.source;
  let h='<div class="panel"><label class="cap" for="srcText"'+tipA('For a summary, a review or any passage that leans on one text. Paste that text and the lens shows the strings of words you share with it and which of its key terms you kept. The source stays in this browser and is cleared when you start a new draft.')+'>Overlap with a source <span class="rtools">'+toolA('crat')+'</span></label>'+
    '<p>Paste the passage you are summarising or drawing on. It is read when you leave the box.</p>'+
    '<textarea id="srcText" class="listin" rows="4" spellcheck="false" placeholder="Paste the source passage here">'+esc(state.source||'')+'</textarea>';
  if(X){const ku=X.key.filter(q=>q.used).length;
    h+='<p class="rfig"><b>'+X.runs+'</b> '+(X.runs===1?'run':'runs')+' of '+X.N+' or more words '+(X.runs===1?'matches':'match')+' the source word for word'+(X.quoted?', and <b>'+X.quoted+'</b> more '+(X.quoted===1?'sits':'sit')+' inside quotation marks':'')+'. Together they make up <b>'+Math.round(100*X.share)+'%</b> of your words.'+(X.key.length?' <b>'+ku+' of '+X.key.length+'</b> key source terms appear in your draft.':'')+'</p>'+
      (X.key.length?'<span class="cap sub"'+tipA('Content words the source uses at least twice, most used first. A tick means your draft uses the word too.')+'>Key terms of the source</span><div class="chips">'+X.key.map(q=>'<span class="chip'+(q.used?'':' zero')+'"'+tipA('The source uses this '+q.c+' times. '+(q.used?'Your draft uses it too.':'Your draft does not use it.'))+'>'+(q.used?'✓ ':'')+esc(q.w)+'</span>').join('')+'</div>':'')+
      (X.n<X.N?'<p>The source is shorter than '+X.N+' words, so there is nothing to compare yet.</p>':'');}
  h+='<p><b>What the research found.</b> When written answers were scored automatically in '+rf('crat','Crossley, Kyle, Davenport & McNamara (2016)')+', the more accurate answers overlapped more with the content the students had learned. Sharing a source’s terms shows you are talking about the same thing. Sharing its strings of words is a different matter: a matching run is either a quotation, which needs quotation marks and a citation, or wording to make your own.</p>'+
    '<p><b>How this count differs.</b> It compares exact words, so a close paraphrase that keeps the source’s sentence structure is not seen. Five words in a row is this page’s working value, not a published threshold. This is not a plagiarism check, and a clean result does not show that a passage is properly attributed.</p></div>';
  return h;}
SRC.clutter.push(['williams','Williams'],['sword','Sword']);MTIP.clutter=(MTIP.clutter||[]).concat(MTIP.openers||[]);
SRC.slips=[['gamet','Crossley, Bradfield & Bustamante'],'fixed rules'];MTIP.slips=[['hb-olive','A likely slip of typing or word choice.']];
SRC.source=[['crat','Crossley, Kyle, Davenport & McNamara'],'fixed rules'];MTIP.source=[['hb-amber','Words that match your source word for word.'],['hu-teal','A match with the source that sits inside quotation marks.']];
SRC.checks=SRC.checks.filter(p=>!(Array.isArray(p)&&p[0]==='gamet'));SRC.terms=SRC.terms.filter(p=>!(Array.isArray(p)&&p[0]==='crat'));

/* ---------- meaning model (optional): sentence embeddings computed in the browser ----------
   Off by default. When switched on, the page loads a small sentence-embedding model from the model/ folder beside it,
   turns each sentence into a vector, and compares vectors. Nothing is generated and nothing leaves the browser. */
const MEAN={on:false,st:'off',err:'',pipe:null,vec:new Map(),gen:0,M:null};
REFS.push(
 ['kjell','Kjell, O., Giorgi, S., & Schwartz, H. A. (2023). The text-package: An R-package for analyzing and visualizing human language using natural language processing and transformers. <i>Psychological Methods</i>, 28(6), 1478–1498.','10.1037/met0000542',''],
 ['sbert','Reimers, N., & Gurevych, I. (2019). Sentence-BERT: Sentence embeddings using Siamese BERT-networks. In <i>Proceedings of the 2019 Conference on Empirical Methods in Natural Language Processing</i> (pp. 3982–3992). Association for Computational Linguistics.','10.18653/v1/D19-1410',''],
 ['minilm','Wang, W., Wei, F., Dong, L., Bao, H., Yang, N., & Zhou, M. (2020). MiniLM: Deep self-attention distillation for task-agnostic compression of pre-trained transformers. In <i>Advances in Neural Information Processing Systems 33</i>.','','https://papers.nips.cc/paper/2020/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html']);
const MPARA=0.7,MPAIR=0.45,MGEN=new Set(['people','person','somebody','someone','thing','things','way','ways','time','times','part','parts','use','work','year','years','number','case','cases','kind','type','lot','place','point','fact','group']),MLENS=['grid','outline','tracer','source','compare','terms','mviews'];
const cosv=(a,b)=>{let s=0;for(let i=0;i<a.length;i++)s+=a[i]*b[i];return s;};
function vmean(vs){const n=vs[0].length,o=new Float32Array(n);vs.forEach(v=>{for(let i=0;i<n;i++)o[i]+=v[i];});let q=0;for(let i=0;i<n;i++)q+=o[i]*o[i];q=Math.sqrt(q)||1;for(let i=0;i<n;i++)o[i]/=q;return o;}
const mkey=s=>s.replace(/\s+/g,' ').trim();
function srcSents(){const s=state.source||'';if(MEAN.srcOf===s)return MEAN.src;MEAN.srcOf=s;MEAN.src=s.split(/(?<=[.!?]["”’)\]]?)\s+(?=["“‘(\[]?[A-Z0-9])|\n+/).map(mkey).filter(t=>t.length>=25).slice(0,150);return MEAN.src;}
const meanTerms=A=>(A.terms||[]).filter(t=>t.w&&t.w.length>2&&!MGEN.has(t.w.toLowerCase())).slice(0,50);
function meanTexts(A){const t=A.sents.map(s=>mkey(s.text));A.paras.forEach(p=>{if(p.point&&p.point.text)t.push(mkey(p.point.text));});
  if(state.claim&&state.claim.trim())t.push(mkey(state.claim));srcSents().forEach(x=>t.push(x));
  if(state.base!==state.raw){baseline();if(state.A0)state.A0.sents.forEach(s=>t.push(mkey(s.text)));}
  meanTerms(A).forEach(x=>t.push(mkey(x.w)));absSents().forEach(x=>t.push(x));return t;}
async function meanLoad(){if(MEAN.pipe){MEAN.st='ready';meanUI();meanRun();return;}if(MEAN.st==='loading')return;MEAN.st='loading';MEAN.err='';meanUI();
  try{const base=new URL('model/',location.href).href,T=await import(base+'lib/transformers.min.js');
    T.env.allowRemoteModels=false;T.env.allowLocalModels=true;T.env.localModelPath=base;T.env.backends.onnx.wasm.wasmPaths=base+'lib/';T.env.backends.onnx.wasm.numThreads=1;
    MEAN.pipe=await T.pipeline('feature-extraction','all-MiniLM-L6-v2',{dtype:'q8',device:'wasm'});MEAN.st='ready';}
  catch(e){MEAN.st='unavail';MEAN.err=String(e&&e.message||e);MEAN.on=false;store.set('ts.mean','');}
  meanUI();if(MEAN.st==='ready')meanRun();}
async function meanEmbed(texts){const need=[...new Set(texts)].filter(t=>t&&!MEAN.vec.has(t));if(MEAN.vec.size>6000)MEAN.vec.clear();
  for(let i=0;i<need.length;i+=8){const b=need.slice(i,i+8),E2=await MEAN.pipe(b,{pooling:'mean',normalize:true}),d=E2.dims[1],data=E2.data;b.forEach((t,k)=>MEAN.vec.set(t,Float32Array.from(data.subarray(k*d,(k+1)*d))));await new Promise(r=>setTimeout(r,0));}}
async function meanRun(){if(!MEAN.on||MEAN.st!=='ready')return;const gen=++MEAN.gen,A=state.A;
  try{await meanEmbed(meanTexts(A));}catch(e){MEAN.st='error';MEAN.err=String(e&&e.message||e);meanUI();return;}
  if(gen!==MEAN.gen||A!==state.A)return;MEAN.M=meanMeasure(A);renderDynamic();}
function meanSync(A){MEAN.M=null;if(!MEAN.on||MEAN.st!=='ready')return;const m=meanMeasure(A);if(m)MEAN.M=m;else setTimeout(meanRun,0);}
function meanMeasure(A){const S=A.sents,n=S.length;if(n<2)return null;if(meanTexts(A).some(t=>t&&!MEAN.vec.has(t)))return null;const V=S.map(s=>MEAN.vec.get(mkey(s.text))),G=t=>MEAN.vec.get(mkey(t));
  const all=[];for(let i=0;i<n;i++)for(let j=i+1;j<n&&j-i<=60;j++)all.push(cosv(V[i],V[j]));all.sort((a,b)=>a-b);
  const q=p=>all[Math.min(all.length-1,Math.floor(p*all.length))],q75=q(0.75),med=q(0.5);
  const sent=S.map((s,i)=>{const adj=i?cosv(V[i],V[i-1]):null,close=i>0&&n>=4&&adj>=q75;return{adj,close,only:close&&!!s.link&&s.link.type==='disconnected'};});
  const body=A.paras.filter(p=>p.ord!=null&&p.sents.length),pv=body.map(p=>vmean(p.sents.map(i=>V[i]))),para={};let wk=-1,wv=2;
  body.forEach((p,k)=>{const o={join:k?cosv(pv[k],pv[k-1]):null,weakest:false,cen:null,point:null};
    if(k&&o.join<wv){wv=o.join;wk=p.ord;}
    if(p.sents.length>=3){const c=p.sents.map((i,x)=>cosv(V[i],vmean(p.sents.filter((j,y)=>y!==x).map(j=>V[j]))));let b=0,w=0;c.forEach((v,x)=>{if(v>c[b])b=x;if(v<c[w])w=x;});
      o.cen={best:p.sents[b],pos:b===0?'open':b===c.length-1?'close':'middle',worst:p.sents.length>=4?p.sents[w]:null};}
    if(p.point&&p.point.text){const v=MEAN.vec.get(mkey(p.point.text));if(!v)o.point=false;else{let b=0,bv=-2;p.sents.forEach((i,x)=>{const c=cosv(v,V[i]);if(c>bv){bv=c;b=x;}});o.point={best:p.sents[b],pos:b===0?'open':b===p.sents.length-1?'close':'middle'};}}
    para[p.ord]=o;});
  if(Object.values(para).some(o=>o.point===false))return null;
  if(body.length>=3&&wk>=0)para[wk].weakest=true;
  /* the claim: which sentence states it most directly, and how close each paragraph is to it */
  let claim=null,cs=null;if(state.claim&&state.claim.trim()&&body.length){const c=G(state.claim);cs=S.map((s,i)=>cosv(c,V[i]));let bi=0,bv=-2;S.forEach((s,i)=>{const x=cosv(c,V[i]);if(x>bv){bv=x;bi=i;}});
    const ps=body.map((p,k)=>cosv(c,pv[k]));let far=0,near=0;ps.forEach((x,k)=>{if(x<ps[far])far=k;if(x>ps[near])near=k;});const bp=Math.max(0,body.findIndex(p=>p.sents.includes(bi)));
    claim={best:bi,where:bp===0?'first':bp===body.length-1?'last':'middle',ord:body[bp].ord,far:body.length>=3?body[far].ord:null,near:body.length>=3?body[near].ord:null};body.forEach((p,k)=>{para[p.ord].claim=ps[k];});}
  /* a pasted source: close paraphrases, and the parts of the source the draft says least about */
  let src=null;const SS=srcSents();if(SS.length){const SV=SS.map(G),flagged=new Set(A.findings.filter(f=>f.lens==='source').map(f=>f.s)),quoted=i=>(S[i].marks.source||[]).some(m=>/hu-teal/.test(m.cls));
    const near=S.map((s,i)=>{let b=0,bv=-2;SV.forEach((v,k)=>{const x=cosv(v,V[i]);if(x>bv){bv=x;b=k;}});return{k:b,v:bv};});
    const cover=SS.map((t,k)=>{let bv=-2,bi=0;V.forEach((v,i)=>{const x=cosv(SV[k],v);if(x>bv){bv=x;bi=i;}});return{k,v:bv,i:bi};}).sort((x,y)=>x.v-y.v);
    src={n:SS.length,near,top:near.map((x,i)=>({i,v:x.v})).filter(x=>!flagged.has(x.i)&&!quoted(x.i)).sort((x,y)=>y.v-x.v).slice(0,3),para:near.map((x,i)=>x.v>=MPARA&&!flagged.has(i)&&!quoted(i)?i:-1).filter(i=>i>=0),least:cover.slice(0,Math.min(3,Math.max(1,Math.floor(SS.length/3))))};}
  /* rewrites: how far each rewritten sentence has moved from the one it replaced */
  let rev=null;if(state.base!==state.raw&&state.A0){const L=ledger(),A0=state.A0,rows=[];(L.pairs||[]).forEach(pr=>{if(pr.same||!pr.ids.length)return;const bv=G(A0.sents[pr.b].text);if(!bv)return;rows.push({i:pr.ids[0],n:pr.ids.length,v:cosv(bv,vmean(pr.ids.map(i=>V[i]))),was:A0.sents[pr.b].text});});rows.sort((x,y)=>x.v-y.v);rev={rows};}
  /* terms: pairs of names that are close in meaning, and so may be two names for one thing */
  const TT=meanTerms(A),tv=TT.map(t=>G(t.w)),pairs=[];for(let i=0;i<TT.length;i++)for(let j=i+1;j<TT.length;j++){if(!tv[i]||!tv[j]||TT[i].k.slice(0,4)===TT[j].k.slice(0,4)||state.merges.some(g=>g.includes(TT[i].k)&&g.includes(TT[j].k)))continue;const x=cosv(tv[i],tv[j]);if(x>=MPAIR)pairs.push({a:TT[i],b:TT[j],v:x});}
  pairs.sort((x,y)=>y.v-x.v);
  return{sent,para,q75,med,nClose:sent.filter(x=>x.close).length,only:sent.map((x,i)=>x.only?i:-1).filter(i=>i>=0),joins:body.length-1,claim,src,rev,pairs:pairs.slice(0,8),V,pv,cs};}
function meanToggle(){if(MEAN.on){MEAN.on=false;MEAN.M=null;MEAN.gen++;if(MEAN.st!=='unavail')MEAN.st='off';store.set('ts.mean','');meanUI();return;}
  MEAN.on=true;store.set('ts.mean','1');meanLoad();}
function meanUI(){const b=$('#btnMean'),f=$('#factAI'),on=MEAN.on&&MEAN.st==='ready';
  if(b){b.setAttribute('aria-pressed',String(MEAN.on));b.textContent=MEAN.st==='loading'?'Meaning model: loading…':on?'Meaning model: on':'Meaning model: off';}
  if(f){f.textContent=on?'Rules · meaning model on':'Deterministic · no AI';f.setAttribute('data-tip',on?'The marks and notes still come from fixed rules. The meaning model you switched on is a small trained language model, which is a kind of AI. It runs inside this browser tab, generates no text, and gives the same result for the same text. Switch it off under the lens description to return to rules only.':'Every mark comes from a fixed rule written into this page. The same text always gets the same marks. No AI model is involved.');}
  renderDynamic();}
const MEANNOTE='<p><b>What this is.</b> A small language model (all-MiniLM-L6-v2: '+rf('sbert','Reimers & Gurevych 2019')+'; '+rf('minilm','Wang et al. 2020')+') turns each sentence into a list of 384 numbers, and sentences with similar meaning get similar lists ('+rf('kjell','Kjell, Giorgi & Schwartz 2023')+'). It is a trained model, so unlike the rest of this page it is AI. It runs in this browser tab, writes nothing, and gives the same result for the same text.</p><p><b>What it cannot see.</b> Negation and logic: “X increases Y” and “X does not increase Y” look almost the same to it. It was trained on general text, so specialist terms may be misjudged. Its scores only rank things inside one draft, which is why nothing here is given as a pass or a fail.</p>';
function meanBox(l){if(!MLENS.includes(l))return'';const A=state.A;if(!A.sents.length)return'';
  const head='<div class="panel res mean"><span class="cap"'+tipA('An optional layer on top of the rules: a small language model that compares sentences by meaning. Off unless you switch it on.')+'>Meaning model <span class="rtools"><span class="tool">optional · AI</span></span></span>';
  const sw=t=>'<div class="tilebar"><button type="button" class="btn sm" data-mean="1" id="meanSw-'+l+'">'+t+'</button></div>';
  const OFF=MOFF;const OFF0={grid:'The rules above only see repeated words. Switch the model on to also see which sentences and paragraphs are close in meaning, including the ones that share no word.',outline:'Switch the model on to see which sentence in each paragraph is closest in meaning to the rest, and where the point you stated is carried.',tracer:'The tracer above follows the words of your claim. Switch the model on to see where the draft states the claim in other words, and which paragraphs are furthest from it.',source:'The rule above finds copied strings of words. Switch the model on to also find sentences that restate a source sentence in different words, and the parts of the source your draft says least about.',compare:'Switch the model on to see how far each rewritten sentence has moved in meaning from the one it replaced.',terms:'Switch the model on to see pairs of terms that are close in meaning and may be two names for one thing.',mviews:'These views are drawn from the meaning model, so they need it switched on.'};
  if(MEAN.st==='loading')return head+'<p>Loading the model. The first time, this is a download of about 45 MB; after that the browser keeps it.</p></div>';
  if(MEAN.st==='unavail')return head+'<p>The meaning model is not available in this copy of the page, because the model files are not beside it. It runs in the copy at <a href="https://benmarwick.github.io/topic-and-emphasis/" target="_blank" rel="noopener">benmarwick.github.io/topic-and-emphasis</a>.</p>'+sw('Try again')+'</div>';
  if(MEAN.st==='error')return head+'<p>The model stopped with an error: '+esc(MEAN.err)+'</p>'+sw('Switch it off')+'</div>';
  if(!MEAN.on)return head+'<p>'+OFF[l]+' The first use downloads about 45 MB.</p>'+sw('Switch on the meaning model')+'</div>';
  const M=MEAN.M;if(!M)return head+'<p>Reading the draft…</p></div>';
  const open=(i,tip)=>'<button type="button" class="btn sm" data-bar="'+i+'" id="mo-'+l+'-'+i+'"'+(tip?tipA(tip):'')+'>Sentence '+(i+1)+'</button>',cut=(t,n)=>t.length>n?t.slice(0,n-2).trimEnd()+'…':t,f2=v=>v.toFixed(2);let h=head;
  if(l==='grid'){const n=A.sents.length-1;
    h+=A.sents.length<4?'<p>Meaning links need at least four sentences.</p>':'<p class="rfig"><b>'+M.nClose+' of '+n+'</b> sentences sit closer in meaning to the sentence before than most pairs of sentences in this draft do. <b>'+M.only.length+'</b> of them '+(M.only.length===1?'repeats':'repeat')+' no word from what came before.</p>'+
      (M.only.length?'<div class="tilebar"><span class="hint">Linked in meaning only:</span>'+M.only.map(i=>open(i)).join('')+'</div><p>In these the link exists in your head and in the meaning, and not yet on the page. Open the sentence with a word from the one before it, or name the thing both are about.</p>':'')+
      (M.joins>=2?'<p>The line above each paragraph in the text now also says how close it is in meaning to the paragraph before, and marks the weakest join in the draft.</p>':'');}
  else if(l==='outline'){const ps=A.paras.filter(p=>p.ord!=null&&M.para[p.ord]&&M.para[p.ord].cen),edge=ps.filter(p=>M.para[p.ord].cen.pos!=='middle'),mid=ps.filter(p=>M.para[p.ord].cen.pos==='middle');
    h+=!ps.length?'<p>The central sentence needs a paragraph of at least three sentences.</p>':'<p class="rfig">In <b>'+edge.length+' of '+ps.length+'</b> '+(ps.length===1?'paragraph':'paragraphs')+' the sentence closest in meaning to the rest sits at the opening or the close.</p>'+
      (mid.length?'<div class="tilebar"><span class="hint">Central sentence in the middle:</span>'+mid.map(p=>open(M.para[p.ord].cen.best)).join('')+'</div><p>A sentence that sums up its paragraph is a candidate for the opening or the close, where readers look for the point. It may also be fine where it is: the model measures closeness, and cannot tell a summary from a typical sentence.</p>':'');}
  else if(l==='tracer'){const C=M.claim;
    h+=!C?'<p>Write your claim in the box above. The model will then show where the draft states it, in your words or in others.</p>':'<p class="rfig">By meaning, your claim is stated most directly in <b>sentence '+(C.best+1)+'</b>, in '+(C.where==='first'?'the first paragraph':C.where==='last'?'the last paragraph':'paragraph '+(C.ord+1)+', in the middle of the draft')+'.</p><div class="tilebar">'+open(C.best)+'</div>'+
      (C.where==='middle'?'<p>Readers look for the claim at the start of a text and again at its end. Consider stating it in both places, in the terms you used in the box.</p>':'')+
      '<p>The line above each paragraph in the text now shows how close that paragraph is to your claim'+(C.far!=null?', and marks the closest and the furthest. For the furthest, ask what it is doing for the claim. It may be background the reader needs, or it may belong in another paper.':'.')+'</p>';}
  else if(l==='source'){const X=M.src,SS=srcSents();
    h+=!X?'<p>Paste a source in the box below. The model will then compare each of your sentences with each of its sentences.</p>':'<p class="rfig"><b>'+X.para.length+'</b> '+(X.para.length===1?'sentence restates':'sentences restate')+' a source sentence closely without sharing a run of five words.</p>'+
      (X.top.length?'<span class="cap sub"'+tipA('Your sentences that are closest in meaning to some sentence of the source, leaving out those already marked for a copied run or sitting inside quotation marks.')+'>Your sentences closest to the source</span><div class="tblwrap"><table class="cmp"><thead><tr><th>Yours</th><th'+tipA('1 would be identical in meaning to the source sentence, 0 unrelated.')+'>Closeness</th><th>Source sentence</th></tr></thead><tbody>'+X.top.map(t=>'<tr><td>'+open(t.i)+'</td><td class="n">'+f2(t.v)+(t.v>=MPARA?' <span class="hint">close</span>':'')+'</td><td>'+esc(cut(SS[X.near[t.i].k],130))+'</td></tr>').join('')+'</tbody></table></div><p>A sentence that restates a source sentence needs a citation as much as a quotation does. If its structure also follows the source, rewrite it from your own understanding.</p>':'')+
      '<span class="cap sub"'+tipA('The source sentences whose closest match in your draft is weakest. For a summary, these are the parts you have said least about. That may be a deliberate choice.')+'>Parts of the source your draft says least about</span><ul class="obs">'+X.least.map(c=>'<li>“'+esc(cut(SS[c.k],160))+'”</li>').join('')+'</ul>'+
      '<p>“Close” here means a score of '+MPARA.toFixed(2)+' or more, where 1 is identical in meaning. That figure is this page’s working value. It is not a published threshold, and this is not a plagiarism check.</p>';}
  else if(l==='compare'){const R=M.rev;
    h+=!R||!R.rows.length?'<p>No rewritten sentences to compare yet. Rewrite a sentence, then come back.</p>':'<p class="rfig">How close each rewritten sentence is in meaning to the one it replaced, lowest first.</p><div class="tblwrap"><table class="cmp"><thead><tr><th>Now</th><th'+tipA('1 would be identical in meaning to the original sentence, 0 unrelated.')+'>Closeness</th><th>It replaced</th></tr></thead><tbody>'+R.rows.slice(0,6).map(r=>'<tr><td><button type="button" class="btn sm" data-mgo="'+r.i+'" id="mgo-'+r.i+'"'+tipA('Opens this sentence in the Overview.')+'>Sentence '+(r.i+1)+'</button>'+(r.n>1?' <span class="hint">and '+(r.n-1)+' more</span>':'')+'</td><td class="n">'+f2(r.v)+'</td><td>'+esc(cut(r.was,110))+'</td></tr>').join('')+'</tbody></table></div><p>A low figure means the rewrite moved furthest from what the sentence said before. That may be the correction you intended, or a drift to check. A high figure does not prove the meaning was kept: “cut their grants” and “doubled their grants” score as close, because both are about the same things. The revision receipt above is still counted by the rules alone.</p>';}
  else if(l==='mviews'){h+=mviewsHTML(A,M);}
  else if(l==='terms'){
    h+=!M.pairs.length?'<p>No two of your terms are close enough in meaning to suggest as a pair.</p>':'<p class="rfig">The closest pairs in meaning among your terms. Is any pair two names for one thing?</p><div class="chips">'+M.pairs.map((p,q)=>'<button type="button" class="chip" id="mpair-'+q+'" data-mpair="'+esc(p.a.k)+'|'+esc(p.b.k)+'"'+tipA('Closeness '+f2(p.v)+'. Tap to select both terms above. Then choose “These name the same thing” if they do.')+'>'+esc(p.a.w)+' · '+esc(p.b.w)+'</button>').join('')+'</div><p>Readers take a new word to mean a new thing. If a pair names one thing, pick one name and keep to it. If the two differ, the difference may be worth a sentence. Most pairs here will be related things, not the same thing: the model is better at judging whole sentences than single words, so treat the list as a prompt to check.</p>';}
  return h+MEANNOTE+sw('Switch off the meaning model')+'</div>';}
function meanAdorn(p,l){const M=MEAN.M;if(!M||p.ord==null||!M.para[p.ord])return'';const o=M.para[p.ord],f2=v=>v.toFixed(2);let h='';
  if(l==='grid'&&o.join!=null)h+='<div class="padorn mjoin"><span class="pn">¶'+p.ord+' → ¶'+(p.ord+1)+'</span><span class="'+(o.weakest?'miss':'')+'"'+tipA('How close this paragraph is in meaning to the one before, from the meaning model: 1 would be identical, 0 unrelated. The figure only ranks the joins in this draft against each other.'+(o.weakest?' This is the lowest in the draft, so it is the biggest change of subject.':''))+'>by meaning: '+f2(o.join)+(o.weakest?' · the weakest join in this draft':'')+'</span></div>';
  if(l==='tracer'&&o.claim!=null){const C=M.claim,tag=C&&C.far===p.ord?' · the furthest from your claim':C&&C.near===p.ord?' · the closest to your claim':'';h+='<div class="padorn mjoin"><span class="pn">¶'+(p.ord+1)+'</span><span class="'+(C&&C.far===p.ord?'miss':C&&C.near===p.ord?'hit':'')+'"'+tipA('How close this paragraph is in meaning to the claim you wrote, from the meaning model: 1 would be identical, 0 unrelated. The figure only ranks the paragraphs of this draft against each other.')+'>by meaning: '+f2(o.claim)+' to your claim'+tag+'</span></div>';}
  if(l==='outline'){const nm=i=>'sentence '+(i+1),where=q=>q==='open'?'the opening':q==='close'?'the close':'the middle';
    if(o.cen)h+='<div class="padorn mcen"><span class="'+(o.cen.pos==='middle'?'miss':'hit')+'"'+tipA('From the meaning model: the sentence in this paragraph that is closest in meaning to all the others taken together.')+'>'+(o.cen.pos==='middle'?'By meaning, '+nm(o.cen.best)+', in the middle, is closest to the rest of this paragraph':'✓ By meaning, '+where(o.cen.pos)+' is closest to the rest of this paragraph')+'</span>'+(o.cen.pos==='middle'?'<button type="button" class="btn sm" data-bar="'+o.cen.best+'" id="mc-'+p.ord+'">Open it</button>':'')+(o.cen.worst!=null&&o.cen.worst!==o.cen.best?'<span'+tipA('From the meaning model: the sentence furthest in meaning from the others in this paragraph. Ask whether it belongs here. It may be a deliberate turn.')+'>furthest from the rest: '+nm(o.cen.worst)+'</span>':'')+'</div>';
    if(o.point)h+='<div class="padorn mcen"><span class="'+(o.point.pos==='middle'?'miss':'hit')+'"'+tipA('From the meaning model: the sentence closest in meaning to the point you wrote, whether or not it uses your words.')+'>'+(o.point.pos==='middle'?'By meaning, your point is carried best by '+nm(o.point.best)+', in the middle':'✓ By meaning, your point is carried best by '+where(o.point.pos))+'</span>'+(o.point.pos==='middle'?'<button type="button" class="btn sm" data-bar="'+o.point.best+'" id="mp-'+p.ord+'">Open it</button>':'')+'</div>';}
  return h;}

/* ---------- meaning views: pictures of the draft drawn from the model's sentence vectors ---------- */
const mvS=()=>state.mv||(state.mv={tab:'thread',cell:null,order:null,q:'',abs:store.get('ts.abs')||'',odd:null,seq:[],dp:0});
const MVTABS=[['thread','Thread'],['quilt','Quilt'],['stripe','Topics'],['map','Map'],['order','Reorder'],['ask','Ask'],['checks','Abstract & ending'],['drill','Drills']];
const MVHUE=['blue','amber','teal','rose'];
const splitS=s=>(s||'').split(/(?<=[.!?]["”’)\]]?)\s+(?=["“‘(\[]?[A-Z0-9])|\n+/).map(mkey).filter(t=>t.length>=25).slice(0,150);
function absSents(){const s=mvS().abs||'';if(MEAN.absOf===s)return MEAN.abs;MEAN.absOf=s;MEAN.abs=splitS(s);return MEAN.abs;}
const mvCut=(t,n)=>t.length>n?t.slice(0,n-2).trimEnd()+'…':t;
const mvOpen=(i,id)=>'<button type="button" class="btn sm" data-bar="'+i+'" id="'+id+'-'+i+'">Sentence '+(i+1)+'</button>';
function mvKmeans(V){const n=V.length,k=n<6?2:n<14?3:4,cen=[V[0]];
  while(cen.length<k){let b=0,bv=2;V.forEach((v,i)=>{const m=Math.max(...cen.map(c=>cosv(c,v)));if(m<bv){bv=m;b=i;}});cen.push(V[b]);}
  let as=new Array(n).fill(0);for(let it=0;it<12;it++){as=V.map(v=>{let b=0,bv=-2;cen.forEach((c,q)=>{const x=cosv(c,v);if(x>bv){bv=x;b=q;}});return b;});for(let q=0;q<k;q++){const m=V.filter((v,i)=>as[i]===q);if(m.length)cen[q]=vmean(m);}}
  const seen=[],lab=as.map(a=>{let q=seen.indexOf(a);if(q<0){seen.push(a);q=seen.length-1;}return q;}),typ=seen.map((a,q)=>{let b=-1,bv=-2;V.forEach((v,i)=>{if(lab[i]!==q)return;const x=cosv(cen[a],v);if(x>bv){bv=x;b=i;}});return b;});
  return{k:seen.length,lab,typ};}
function mvPCA(V){const n=V.length,d=V[0].length,mu=new Float32Array(d);V.forEach(v=>{for(let i=0;i<d;i++)mu[i]+=v[i]/n;});const X=V.map(v=>{const o=new Float32Array(d);for(let i=0;i<d;i++)o[i]=v[i]-mu[i];return o;});
  let tot=0;X.forEach(x=>{for(let i=0;i<d;i++)tot+=x[i]*x[i];});const pcs=[],lam=[];
  for(let c=0;c<2;c++){let v=new Float32Array(d);for(let i=0;i<d;i++)v[i]=((i*37+c*11)%17)/17-0.5;
    for(let it=0;it<40;it++){const w=new Float32Array(d);X.forEach(x=>{let s=0;for(let i=0;i<d;i++)s+=x[i]*v[i];for(let i=0;i<d;i++)w[i]+=s*x[i];});pcs.forEach(p=>{let s=0;for(let i=0;i<d;i++)s+=w[i]*p[i];for(let i=0;i<d;i++)w[i]-=s*p[i];});let q=0;for(let i=0;i<d;i++)q+=w[i]*w[i];q=Math.sqrt(q)||1;for(let i=0;i<d;i++)v[i]=w[i]/q;}
    pcs.push(v);let l=0;X.forEach(x=>{let s=0;for(let i=0;i<d;i++)s+=x[i]*v[i];l+=s*s;});lam.push(l);}
  const proj=v=>pcs.map(p=>{let s=0;for(let i=0;i<d;i++)s+=(v[i]-mu[i])*p[i];return s;});
  return{proj,share:tot?(lam[0]+lam[1])/tot:0};}
function mvOrderInfo(A,M){const body=A.paras.filter(p=>p.ord!=null&&p.sents.length),V=M.V,st=mvS();let ord=st.order&&st.order.length===body.length&&st.order.every(o=>body.some(p=>p.ord===o))?st.order:body.map(p=>p.ord);
  const by=o=>body.find(p=>p.ord===o),join=(a,b)=>{const pa=by(a),pb=by(b);return cosv(V[pa.sents[pa.sents.length-1]],V[pb.sents[0]]);},sm=o=>o.length<2?0:o.slice(1).reduce((s,x,i)=>s+join(o[i],x),0)/(o.length-1);
  return{body,ord,by,join,sm,draft:body.map(p=>p.ord)};}
function mviewsHTML(A,M){const st=mvS(),S=A.sents,n=S.length,V=M.V,f2=v=>v.toFixed(2),sim=(i,j)=>cosv(V[i],V[j]);
  let h='<div class="mvtabs" role="tablist">'+MVTABS.map(([k,t])=>'<button type="button" role="tab" class="btn sm'+(st.tab===k?' on':'')+'" id="mvt-'+k+'" data-mvt="'+k+'" aria-selected="'+(st.tab===k)+'">'+t+'</button>').join('')+'</div>';
  if(n<4)return h+'<p>These views need at least four sentences.</p>';
  if(st.tab==='thread'){const W=600,H=190,L=30,R=12,T=44,B=22,adj=M.sent.map(x=>x.adj),vals=adj.slice(1),mx=Math.max(0.8,...vals,...(M.cs||[])),X=i=>L+(n>1?i/(n-1):0.5)*(W-L-R),Y=v=>H-B-Math.max(0,v)/mx*(H-T-B);
    const srt=vals.slice().sort((a,b)=>a-b),q25=srt[Math.floor(0.25*srt.length)],q75=srt[Math.min(srt.length-1,Math.floor(0.75*srt.length))];
    const shifts=[],fused=[];for(let i=1;i<n;i++){const inside=S[i].p===S[i-1].p;if(inside&&n>=6&&adj[i]<=q25&&(i===1||adj[i]<=adj[i-1])&&(i===n-1||adj[i]<=adj[i+1]))shifts.push(i);if(!inside&&n>=6&&adj[i]>=q75)fused.push(i);}
    shifts.sort((a,b)=>adj[a]-adj[b]);const reps=[];for(let i=0;i<n;i++)for(let j=i+3;j<n;j++){const x=sim(i,j);if(x>=0.75)reps.push({i,j,v:x});}reps.sort((a,b)=>b.v-a.v);const rp=reps.slice(0,5);
    let g='';[0,0.25,0.5,0.75].forEach(t=>{if(t<=mx)g+='<line class="mvgrid" x1="'+L+'" x2="'+(W-R)+'" y1="'+Y(t)+'" y2="'+Y(t)+'"/><text class="mvax" x="'+(L-5)+'" y="'+(Y(t)+3)+'" text-anchor="end">'+t+'</text>';});
    for(let i=1;i<n;i++)if(S[i].p!==S[i-1].p)g+='<line class="mvpb" x1="'+((X(i)+X(i-1))/2)+'" x2="'+((X(i)+X(i-1))/2)+'" y1="'+T+'" y2="'+(H-B)+'"/>';
    rp.forEach(r=>{const a=X(r.i),b=X(r.j);g+='<path class="mvarc" d="M'+a+' '+(T-4)+' Q'+((a+b)/2)+' '+(T-4-Math.min(34,8+(r.j-r.i)*2.2))+' '+b+' '+(T-4)+'"/>';});
    if(M.cs)g+='<polyline class="mvline claim" points="'+M.cs.map((v,i)=>X(i)+','+Y(v)).join(' ')+'"/>';
    g+='<polyline class="mvline" points="'+vals.map((v,q)=>X(q+1)+','+Y(v)).join(' ')+'"/>';
    for(let i=1;i<n;i++)g+='<circle class="mvdot'+(shifts.includes(i)?' low':'')+'" cx="'+X(i)+'" cy="'+Y(adj[i])+'" r="'+(n>60?2.5:4)+'" data-bar="'+i+'"'+tipA('Sentence '+(i+1)+' · closeness to the sentence before: '+f2(adj[i])+(M.cs?' · to your claim: '+f2(M.cs[i]):'')+'. Tap to open it.')+'/>';
    h+='<div class="mvfig"><svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Closeness of each sentence to the one before it, across the draft">'+g+'</svg></div>'+
      '<p class="mvkey"><span class="k1">━</span> closeness to the sentence before'+(M.cs?' · <span class="k2">┅</span> closeness to your claim':'')+' · dashed uprights are paragraph breaks'+(rp.length?' · arcs join distant sentences that say nearly the same thing':'')+'</p>'+
      '<p>Read it left to right. A dip is a jump in subject. '+(M.cs?'The dashed line shows where the draft is on its claim and where it wanders. ':'Write a claim in Claim tracer to add a second line showing where the draft is on its point. ')+'</p>'+
      (shifts.length?'<div class="tilebar"><span class="hint"'+tipA('Sentences in the lowest quarter for closeness to the one before, inside a paragraph. A paragraph break may belong here, or a linking phrase.')+'>A jump inside a paragraph:</span>'+shifts.slice(0,3).map(i=>mvOpen(i,'mvsh')).join('')+'</div>':'')+
      (fused.length?'<div class="tilebar"><span class="hint"'+tipA('Paragraphs whose first sentence is in the top quarter for closeness to the sentence before it. The break may not mark a real change of subject.')+'>A paragraph break with no jump:</span>'+fused.slice(0,3).map(i=>mvOpen(i,'mvfu')).join('')+'</div>':'')+
      (rp.length?'<div class="tilebar"><span class="hint"'+tipA('Sentences at least three apart that score 0.75 or more for closeness, which is this page’s working value. One of each pair may be a repeat you can cut, or a deliberate return.')+'>Said twice?</span>'+rp.map(r=>'<span class="mvpair">'+mvOpen(r.i,'mvra')+' and '+mvOpen(r.j,'mvrb')+'</span>').join('')+'</div>':'');}
  else if(st.tab==='quilt'){const c=st.cell&&st.cell[0]<n&&st.cell[1]<n?st.cell:null;
    h+='<div class="mvfig"><canvas id="mvQuilt" role="img" aria-label="A grid of every sentence against every other, shaded by closeness in meaning" tabindex="0"></canvas></div>'+
      '<p>Each square compares two sentences: the darker it is, the closer they are in meaning. The diagonal runs from the first sentence at top left to the last at bottom right, and the lines mark paragraphs. A paragraph that holds together shows as a dark block on the diagonal. A dark patch far from the diagonal is an idea that comes back. Tap a square to read the two sentences.</p>'+
      (c?'<div class="mvcmp"><p><b>Sentence '+(c[0]+1)+'</b> and <b>sentence '+(c[1]+1)+'</b> · closeness '+f2(sim(c[0],c[1]))+'</p><p>'+esc(mvCut(S[c[0]].text,220))+'</p><p>'+esc(mvCut(S[c[1]].text,220))+'</p><div class="tilebar">'+mvOpen(c[0],'mvqa')+(c[1]!==c[0]?mvOpen(c[1],'mvqb'):'')+'</div></div>':'');}
  else if(st.tab==='stripe'){const K=mvKmeans(V);let sw=0;for(let i=1;i<n;i++)if(K.lab[i]!==K.lab[i-1])sw++;
    h+='<div class="mvstripe" role="img" aria-label="Each sentence coloured by its topic">'+S.map((s,i)=>'<button type="button" class="mvs hb-'+MVHUE[K.lab[i]]+(i&&S[i].p!==S[i-1].p?' pb':'')+'" data-bar="'+i+'" id="mvs-'+i+'"'+tipA('Sentence '+(i+1)+' · topic '+'ABCD'[K.lab[i]]+'. Tap to open it.')+' aria-label="Sentence '+(i+1)+', topic '+'ABCD'[K.lab[i]]+'"></button>').join('')+'</div>'+
      '<p class="rfig">The model sorts your sentences into <b>'+K.k+'</b> topics, and the topic changes <b>'+sw+'</b> '+(sw===1?'time':'times')+' along the draft. The fewest possible is '+(K.k-1)+'.</p>'+
      '<ul class="mvtop">'+K.typ.map((i,q)=>'<li><span class="mvsw hb-'+MVHUE[q]+'"></span><span><b>Topic '+'ABCD'[q]+'</b> · '+K.lab.filter(x=>x===q).length+' sentences · most typical: “'+esc(mvCut(S[i].text,120))+'” '+mvOpen(i,'mvty')+'</span></li>').join('')+'</ul>'+
      '<p>Long runs of one colour mean a topic is dealt with in one place. Colours that alternate mean topics are interleaved, which makes a reader switch back and forth. The topics are the model’s grouping, not yours: if a group makes no sense to you, ignore it.</p>';}
  else if(st.tab==='map'){const P=mvPCA(V),pts=V.map(P.proj),W=600,H=380,pad=26,all=pts.slice(),ex=[];
    if(state.claim&&state.claim.trim()&&MEAN.vec.get(mkey(state.claim))){ex.push({t:'claim',p:P.proj(MEAN.vec.get(mkey(state.claim)))});}
    const trail=(M.rev?M.rev.rows:[]).map(r=>({i:r.i,p:MEAN.vec.get(mkey(r.was))?P.proj(MEAN.vec.get(mkey(r.was))):null})).filter(r=>r.p);
    ex.forEach(e=>all.push(e.p));trail.forEach(t=>all.push(t.p));
    const xs=all.map(p=>p[0]),ys=all.map(p=>p[1]),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys),X=v=>pad+(x1>x0?(v-x0)/(x1-x0):0.5)*(W-2*pad),Y=v=>pad+(y1>y0?(v-y0)/(y1-y0):0.5)*(H-2*pad),r=n>120?4:n>50?7:10;
    const ords=[...new Set(S.map(s=>s.p))];let g='<polyline class="mvwalk" points="'+pts.map(p=>X(p[0])+','+Y(p[1])).join(' ')+'"/>';
    trail.forEach(t=>{g+='<line class="mvtrail" x1="'+X(t.p[0])+'" y1="'+Y(t.p[1])+'" x2="'+X(pts[t.i][0])+'" y2="'+Y(pts[t.i][1])+'"/><circle class="mvwas" cx="'+X(t.p[0])+'" cy="'+Y(t.p[1])+'" r="'+(r*0.6)+'"'+tipA('Where sentence '+(t.i+1)+' was before you rewrote it.')+'/>';});
    pts.forEach((p,i)=>{g+='<g class="mvpt hb-'+MVHUE[ords.indexOf(S[i].p)%4]+'" data-bar="'+i+'"'+tipA('Sentence '+(i+1)+', paragraph '+(ords.indexOf(S[i].p)+1)+': '+mvCut(S[i].text,110)+' Tap to open it.')+'><circle cx="'+X(p[0])+'" cy="'+Y(p[1])+'" r="'+r+'"/>'+(r>=7?'<text x="'+X(p[0])+'" y="'+(Y(p[1])+3.5)+'" text-anchor="middle">'+(i+1)+'</text>':'')+'</g>';});
    ex.forEach(e=>{g+='<text class="mvstar" x="'+X(e.p[0])+'" y="'+(Y(e.p[1])+6)+'" text-anchor="middle"'+tipA('Your claim, placed on the same map.')+'>★</text>';});
    h+='<div class="mvfig"><svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="A map of the sentences, with sentences close in meaning drawn close together">'+g+'</svg></div>'+
      '<p class="mvkey">Each dot is a sentence, numbered and coloured by paragraph · the line joins them in reading order'+(ex.length?' · ★ is your claim':'')+(trail.length?' · hollow dots show where rewritten sentences were':'')+'</p>'+
      '<p>Sentences close in meaning sit close together. A tight cluster is a topic. A dot off on its own is a sentence unlike the rest. A line that doubles back means the draft returns to a subject it had left.</p>'+
      '<p><b>Read this one with care.</b> The model places sentences in 384 dimensions and this map shows two. Here the two carry '+Math.round(100*P.share)+'% of the spread, so most of the detail is flattened away, and two dots can look close when they are not. The Thread and the Quilt use the full measure.</p>';}
  else if(st.tab==='order'){const O=mvOrderInfo(A,M),body=O.body;
    if(body.length<3)h+='<p>Reordering needs at least three paragraphs.</p>';
    else{const ord=O.ord,changed=ord.join()!==O.draft.join(),heads=A.paras.some(p=>p.head);
      h+='<p class="rfig">Smoothness of this order: <b>'+f2(O.sm(ord))+'</b>'+(changed?' · your draft: <b>'+f2(O.sm(O.draft))+'</b>':'')+'</p><ol class="mvord">'+ord.map((o,q)=>{const p=O.by(o);return (q?'<li class="mvjoin"'+tipA('Closeness between the last sentence of the paragraph above and the first sentence of the paragraph below.')+'>join '+f2(O.join(ord[q-1],o))+'</li>':'')+'<li class="mvrow"><span class="mvmv"><button type="button" class="btn sm" data-mvup="'+q+'" id="mvup-'+q+'" aria-label="Move paragraph '+(o+1)+' up"'+(q?'':' disabled')+'>▲</button><button type="button" class="btn sm" data-mvdn="'+q+'" id="mvdn-'+q+'" aria-label="Move paragraph '+(o+1)+' down"'+(q<ord.length-1?'':' disabled')+'>▼</button></span><span><b>¶'+(o+1)+'</b> '+esc(mvCut(S[p.sents[0]].text,90))+'</span></li>';}).join('')+'</ol>'+
        '<div class="tilebar"><button type="button" class="btn sm" id="mvGreedy"'+tipA('Keeps your first paragraph first, then at each step picks the remaining paragraph whose opening is closest to the close of the one before. It is a comparison, not a recommendation: the model knows nothing of logic or chronology.')+'>Show the model’s smoothest order</button><button type="button" class="btn sm" id="mvReset"'+(changed?'':' disabled')+'>Back to the draft’s order</button><button type="button" class="btn sm" id="mvApply"'+(changed&&!heads?'':' disabled')+tipA(heads?'Not available while the draft has headings, because a heading would be separated from its paragraphs.':'Rearranges the paragraphs in your text. Undo brings the old order back.')+'>Use this order in the draft</button></div>'+
        '<p>Move paragraphs with the arrows and watch the joins. Smoothness is the average of the joins: the closeness between the end of one paragraph and the start of the next. A smoother order is easier to follow from one paragraph to the next. It is not always the better argument.</p>';}}
  else if(st.tab==='ask'){const q=mkey(st.q||''),qv=q&&MEAN.vec.get(q),res=qv?S.map((s,i)=>({i,v:cosv(qv,V[i])})).sort((a,b)=>b.v-a.v).slice(0,5):[];
    h+='<label class="cap sub" for="mvQ">Ask your draft a question, or paste a reader’s comment</label><div class="mvask"><input type="text" class="pointin" id="mvQ" value="'+esc(st.q||'')+'" placeholder="Where do I define loneliness?" autocomplete="off"><button type="button" class="btn sm" id="mvAskBtn">Find</button></div>'+
      (q&&!qv?'<p>Looking…</p>':res.length?'<ol class="mvres">'+res.map(r=>'<li>'+mvOpen(r.i,'mvas')+' <span class="hint">'+f2(r.v)+'</span> '+esc(mvCut(S[r.i].text,150))+'</li>').join('')+'</ol><p>These are the five sentences closest in meaning to what you typed, closest first. If none of them answers the question, the draft may not answer it yet.</p>':'<p>The model finds the sentences of your draft closest in meaning to what you type. It does not write an answer.</p>');}
  else if(st.tab==='checks'){const body=A.paras.filter(p=>p.ord!=null&&p.sents.length),pv=M.pv,AB=absSents(),av=AB.map(t=>MEAN.vec.get(t));
    if(body.length>=3){const last=body.length-1,sims=body.slice(0,last).map((p,k)=>({k,v:cosv(pv[k],pv[last])})).sort((a,b)=>b.v-a.v),rank=sims.findIndex(x=>x.k===0)+1;
      h+='<span class="cap sub">Does the ending return to the opening?</span><p class="rfig">'+(rank===1?'✓ Your last paragraph is closer in meaning to your first than to any other paragraph.':'Your last paragraph is closest in meaning to <b>¶'+(body[sims[0].k].ord+1)+'</b>. Your first paragraph ranks <b>'+rank+' of '+sims.length+'</b>.')+'</p><p>Readers expect an ending to answer the opening. If yours is closer to a middle paragraph, check that it returns to the question you began with.</p>';}
    else h+='<p>The ending check needs at least three paragraphs.</p>';
    h+='<label class="cap sub" for="mvAbs">Does the abstract cover the draft?</label><p>Paste your abstract. It is read when you leave the box.</p><textarea id="mvAbs" class="listin" rows="4" spellcheck="false" placeholder="Paste the abstract here">'+esc(st.abs||'')+'</textarea>';
    if(AB.length&&av.every(Boolean)&&body.length){const cov=body.map((p,k)=>Math.max(...av.map(a=>cosv(a,pv[k]))));let lo=0;cov.forEach((v,k)=>{if(v<cov[lo])lo=k;});
      h+='<div class="mvbars">'+body.map((p,k)=>'<div class="mvbar"><span>¶'+(p.ord+1)+'</span><span class="mbar"><i style="width:'+Math.round(100*Math.max(0,Math.min(1,cov[k])))+'%"></i></span><b>'+f2(cov[k])+'</b>'+(k===lo&&body.length>=3?'<span class="miss">least covered</span>':'')+'</div>').join('')+'</div><p>Each bar is how close a paragraph is to the nearest sentence of your abstract. The paragraph with the shortest bar is the part of the draft the abstract says least about. That may be right: an abstract does not cover everything.</p>';}}
  else if(st.tab==='drill'){const cands=A.paras.filter(p=>p.ord!=null&&p.sents.length>=4&&p.sents.length<=9&&M.para[p.ord]&&M.para[p.ord].cen);
    if(!cands.length)h+='<p>The drills need a paragraph of four to nine sentences.</p>';
    else{const p=cands[st.dp%cands.length],ids=p.sents,worst=M.para[p.ord].cen.worst,L=ids.length,shuf=ids.slice().sort((a,b)=>((a-ids[0])*7+3)%L-((b-ids[0])*7+3)%L),seq=(st.seq||[]).filter(i=>ids.includes(i));
      h+='<div class="tilebar"><span class="hint">Working on paragraph '+(p.ord+1)+'</span>'+(cands.length>1?'<button type="button" class="btn sm" id="mvNextP">Another paragraph</button>':'')+'</div>'+
        '<span class="cap sub">Drill 1 · Which sentence belongs least?</span><div class="mvlist">'+ids.map(i=>'<button type="button" class="mvsent'+(st.odd===i?' on':'')+'" data-mvodd="'+i+'" id="mvodd-'+i+'">'+(i+1)+' · '+esc(mvCut(S[i].text,140))+'</button>').join('')+'</div>'+
        (st.odd!=null&&ids.includes(st.odd)?'<p class="rfig">'+(st.odd===worst?'The model agrees: sentence '+(worst+1)+' is the furthest in meaning from the rest of this paragraph.':'You chose sentence '+(st.odd+1)+'. The model places sentence '+(worst+1)+' furthest from the rest.')+'</p><p>Neither answer is the right one. If you and the model differ, say to yourself why your sentence belongs less. That reason is what a reader would need.</p>':'')+
        '<span class="cap sub">Drill 2 · Put the paragraph back in order</span><p>Tap the sentences in the order you think reads best.</p><div class="mvlist">'+shuf.filter(i=>!seq.includes(i)).map(i=>'<button type="button" class="mvsent" data-mvseq="'+i+'" id="mvseq-'+i+'">'+esc(mvCut(S[i].text,140))+'</button>').join('')+'</div>'+
        (seq.length?'<ol class="mvres">'+seq.map(i=>'<li>'+esc(mvCut(S[i].text,140))+'</li>').join('')+'</ol><div class="tilebar"><button type="button" class="btn sm" id="mvSeqReset">Start again</button></div>':'')+
        (seq.length===L?(()=>{const sm=o=>o.slice(1).reduce((s,x,q)=>s+sim(o[q],x),0)/(o.length-1),same=seq.filter((x,q)=>x===ids[q]).length;return '<p class="rfig"><b>'+same+' of '+L+'</b> sentences are where the draft has them. Smoothness of your order: <b>'+f2(sm(seq))+'</b> · of the draft’s order: <b>'+f2(sm(ids))+'</b>.</p><p>If your order differs from the draft and reads better to you, that is worth trying in the text. Smoothness is the average closeness between neighbours, by the model’s measure.</p>';})():'');}}
  return h;}
function mvDraw(){const cv=document.getElementById('mvQuilt');if(!cv||!MEAN.M)return;const M=MEAN.M,V=M.V,n=V.length,S=state.A.sents,box=cv.parentElement.clientWidth||320,size=Math.min(box,560),dpr=window.devicePixelRatio||1,cs=getComputedStyle(document.documentElement),col=cs.getPropertyValue('--violet').trim()||'#6A3FD0',ink=cs.getPropertyValue('--ink').trim()||'#000',sheet=cs.getPropertyValue('--sheet').trim()||'#fff';
  cv.style.width=size+'px';cv.style.height=size+'px';cv.width=Math.round(size*dpr);cv.height=Math.round(size*dpr);const g=cv.getContext('2d');g.scale(dpr,dpr);g.fillStyle=sheet;g.fillRect(0,0,size,size);const c=size/n,lo=Math.max(0,M.med-0.1),hi=0.85;g.fillStyle=col;
  for(let i=0;i<n;i++)for(let j=0;j<n;j++){const v=i===j?1:cosv(V[i],V[j]),t=Math.max(0,Math.min(1,(v-lo)/(hi-lo)));if(t<=0.02)continue;g.globalAlpha=Math.pow(t,1.3);g.fillRect(j*c,i*c,Math.ceil(c)+0.5,Math.ceil(c)+0.5);}
  g.globalAlpha=0.55;g.strokeStyle=ink;g.lineWidth=1;for(let i=1;i<n;i++)if(S[i].p!==S[i-1].p){const p=Math.round(i*c)+0.5;g.beginPath();g.moveTo(p,0);g.lineTo(p,size);g.moveTo(0,p);g.lineTo(size,p);g.stroke();}
  const sel=mvS().cell;if(sel&&sel[0]<n&&sel[1]<n){g.globalAlpha=1;g.lineWidth=2;g.strokeStyle=ink;g.strokeRect(sel[1]*c,sel[0]*c,Math.max(c,3),Math.max(c,3));}g.globalAlpha=1;cv._n=n;cv._size=size;}
function mvAskGo(q){const st=mvS();st.q=q||'';const k=mkey(st.q);if(!k||!MEAN.pipe){renderDynamic();return;}renderDynamic();meanEmbed([k]).then(renderDynamic,()=>{});}
function wbMeter(){const el=$('#wbMeter');if(!el)return;const M=MEAN.M,ss=state.sel?spanSents():[];if(!M||!ss.length){if(!(MEAN.on&&MEAN.st==='ready'&&state.sel))el.hidden=true;return;}
  const i=ss[0].i,x=M.sent[i],bar=v=>'<span class="mbar"><i style="width:'+Math.round(100*Math.max(0,Math.min(1,v)))+'%"></i></span>';el.hidden=false;
  el.innerHTML='<span class="tool"'+tipA('From the optional meaning model. These two gauges update as you rewrite the sentence.')+'>meaning model</span>'+(x.adj!=null?'<span'+tipA('How close this sentence is in meaning to the one before it: 1 would be identical, 0 unrelated. Repeating a word or an idea from the sentence before raises it.')+'>to the sentence before '+bar(x.adj)+'<b>'+x.adj.toFixed(2)+'</b></span>':'<span>the first sentence of the draft</span>')+(M.cs?'<span'+tipA('How close this sentence is in meaning to the claim you wrote in Claim tracer.')+'>to your claim '+bar(M.cs[i])+'<b>'+M.cs[i].toFixed(2)+'</b></span>':'')+'<span class="hint"'+tipA('The middle value for all pairs of sentences in this draft, for comparison.')+'>typical pair in this draft '+M.med.toFixed(2)+'</span>';}
SRC.mviews=[['kjell','Kjell, Giorgi & Schwartz'],['sbert','Reimers & Gurevych']];

/* ---------- the guide: every lens on one page, built from the same definitions the lenses use ---------- */
const MOFF={grid:'The rules above only see repeated words. Switch the model on to also see which sentences and paragraphs are close in meaning, including the ones that share no word.',outline:'Switch the model on to see which sentence in each paragraph is closest in meaning to the rest, and where the point you stated is carried.',tracer:'The tracer above follows the words of your claim. Switch the model on to see where the draft states the claim in other words, and which paragraphs are furthest from it.',source:'The rule above finds copied strings of words. Switch the model on to also find sentences that restate a source sentence in different words, and the parts of the source your draft says least about.',compare:'Switch the model on to see how far each rewritten sentence has moved in meaning from the one it replaced.',terms:'Switch the model on to see pairs of terms that are close in meaning and may be two names for one thing.',mviews:'These views are drawn from the meaning model, so they need it switched on.'};
const MDOC={grid:'Sentences the rules label “no link” are relabelled “meaning only” when they are close in meaning to the sentence before. The line above each paragraph adds how close it is to the paragraph before, and marks the weakest join in the draft.',outline:'Each paragraph shows which sentence is closest in meaning to the rest, whether that sentence sits at an edge, and which sentence is furthest from the rest. If you typed the paragraph’s point, it shows which sentence carries that point best.',tracer:'It names the sentence that states your claim most directly, in your words or in others, and shows how close each paragraph is to the claim.',source:'A table of your sentences closest in meaning to a source sentence, including restatements that share no run of words, and the parts of the source your draft says least about.',compare:'A table of rewritten sentences with how close each is to the one it replaced, lowest first. It can show drift. It cannot confirm that a meaning was kept.',terms:'The closest pairs in meaning among your terms, as candidates for two names for one thing. The model judges single words less well than sentences, so treat the list as a prompt.',mviews:'Eight views. Thread: closeness of each sentence to the one before, and to your claim. Quilt: every sentence against every other. Topics: the model’s grouping of sentences, as a band of colour. Map: sentences as dots on a flat map. Reorder: move paragraphs and watch the joins. Ask: find the sentences closest to a question. Abstract & ending: what the abstract covers, and whether the ending returns to the opening. Drills: two exercises built from your draft.'};
const LIMITS={sv:'The subject and the main verb are found by rules, not by a parser. A long or unusual sentence can be misread, so check which words are marked before acting on a note.',topic:'The lens sees what opens a sentence. It cannot tell whether that opening is the right topic for your argument.',stress:'It judges the close by familiar words, filler and citations. It cannot tell whether what you ended on is the point you meant to stress.',flow:'“Old” means a word used in an earlier sentence, matched by its stem. A synonym or a pronoun counts as new.',action:'Nominalisations are found by their endings and a fixed list. Some are missed, and some nouns that end like one are legitimate terms.',outline:'It shows first and last sentences and checks the words of the point you type. It does not judge whether the point is a good one.',jobs:'You supply the labels. The lens checks what you tell it against the usual order of moves, which a good paragraph may depart from.',tracer:'Claim words are matched by their stems, so a claim restated in other words is not seen unless the meaning model is on.',claims:'Strong wording is found from fixed lists. The lens cannot read your evidence. It compares the wording with the kind of evidence you name.',hedge:'Hedges are found from a fixed list. One hedge may be exactly right. The lens notices when several pile up.',grid:'Links are judged by repeated words, matched by stem. Two sentences can be tightly connected and share no word.',signals:'Moves are tagged from fixed cue phrases, so a move made in other words is not seen.',skeleton:'A way of reading, with no notes of its own.',rhythm:'The length bands are fixed. The rules for runs and for contrast between neighbours are this tool’s working values, not published norms.',dense:'Noun stacks and chains of prepositions are found by rules. A settled technical term can look like a stack.',voice:'A passive is found from a form of “be” and a participle. A participle the rules do not know is missed.',clutter:'Stock phrases come from a fixed list. A phrase on the list is sometimes the right one.',worn:'The lists are fixed and general. A word flagged as vague may be precise in your field.',vocab:'The two word lists cover general English. Every field has ordinary terms outside them, so an unlisted word is not an error.',terms:'Terms are nouns found by rule and matched by stem. The lens cannot know that two different words name one thing until you tell it.',acr:'It recognises abbreviations by their capitals and looks for a definition nearby. An abbreviation defined in an unusual way may be reported as undefined.',people:'It applies general advice from a fixed list. Preferred terms differ between communities and change over time.',stats:'Only results reported in the usual form, such as t(28) = 2.20, p = .036, are rechecked. A result written another way is not checked.',checks:'Fixed patterns only. No mark does not mean no problem.',slips:'About two dozen patterns, chosen to be nearly always right. There is no dictionary, so misspellings are not found.',source:'It compares exact words. A close paraphrase is not seen unless the meaning model is on, and this is not a plagiarism check.',mviews:'Everything in this lens comes from the model, which does not see negation or logic, and whose scores only rank things inside one draft.',compare:'The receipt counts notes by rule. A rewrite counts only when it keeps at least four in ten of the sentence’s content words.',practice:'The drills have fixed answers for the built-in sentences. Drills built from your own draft use the lenses’ rules, with their limits.'};
const GNAME={1:['Gopen & Swan’s principles','The lenses built on the principles in Gopen and Swan’s article. Start here.'],2:['Is the argument clear?','The argument as a whole: what each paragraph is for, and how strongly each claim is worded.'],3:['Does it flow?','How sentences and paragraphs connect.'],4:['Is each sentence easy to read?','Single sentences: their length, their density, their voice, and the words to cut.'],5:['Are the words well chosen?','Single words: vague ones, rare ones, the names you give things, and the words you use for people.'],6:['Is it polished?','Proofreading: statistics, citations and figures, typing slips, and overlap with a source.'],7:['Your progress','What you have changed so far, and drills to practise on.']};
function guideHTML(){const A=state.A,R=A.research;
  const refFull=k=>{const r=REFS.find(x=>x[0]===k);return r?'<li>'+r[1]+(r[2]?' <a href="https://doi.org/'+r[2]+'" target="_blank" rel="noopener">https://doi.org/'+r[2]+'</a>':r[3]?' <a href="'+r[3]+'" target="_blank" rel="noopener">'+esc(r[3].replace(/^https?:\/\//,''))+'</a>':'')+'</li>':'';};
  const sec=l=>{const keys=[...new Set((SRC[l.k]||[]).filter(Array.isArray).map(p=>p[0]))];let rb=null;try{rb=RESB[l.k]&&R&&A.sents.length?RESB[l.k](A,R):null;}catch(e){}
    return '<section class="gsec" id="guide-'+l.k+'"><h3>'+esc(l.n)+' <button type="button" class="link" data-k="'+l.k+'" id="gopen-'+l.k+'">Open this lens</button></h3><p>'+esc(l.why)+'</p>'+(l.fix?'<p><b>To revise.</b> '+esc(l.fix)+'</p>':'')+
      (l.legend.length?'<p><b>Marks in the text.</b></p><ul class="gmarks">'+l.legend.map(([c,t])=>'<li><span class="mk '+c+'">Aa</span> <b>'+esc(t)+'.</b> '+esc(markTip(l.k,c)||'')+'</li>').join('')+'</ul>':'')+
      (rb?'<p><b>Research measure.</b> '+rb.found+'</p><p><b>How the count differs from the published one.</b> '+rb.here+'</p>':'')+
      (MDOC[l.k]?'<p><b>With the meaning model on.</b> '+esc(MDOC[l.k])+'</p>':'')+
      (LIMITS[l.k]?'<p><b>Limits.</b> '+esc(LIMITS[l.k])+'</p>':'')+
      (keys.length?'<p><b>Sources.</b></p><ul class="grefs">'+keys.map(refFull).join('')+'</ul>':'')+'</section>';};
  let h='<div class="panel gdoc"><label class="cap" for="guideQ">Search the guide</label><div class="mvask"><input type="search" class="pointin" id="guideQ" value="'+esc(state.guideQ||'')+'" placeholder="passive, citation, paragraph, hedge…" autocomplete="off"><span class="hint" id="guideN" aria-live="polite"></span></div>'+
    '<section class="gsec" id="guide-how"><h3>How the page works</h3>'+
    '<p><b>Lenses.</b> A lens reads the draft for one thing and marks it in the text. Pick a lens from the list, or type in the box above the list to find one. The Overview shows every open note at once.</p>'+
    '<p><b>Notes.</b> A note starts with a question about the sentence. The advice and any suggested change come after it. Where a note offers a change, preview it first: the preview shows which notes it would clear and any it would bring in. A note is not an order. “I checked this” is a valid answer, and it counts as work done.</p>'+
    '<p><b>The rewrite box.</b> Tap a sentence to open it under its paragraph. Marks from every open note show inside the box and update as you type. Undo and Redo work on the whole text.</p>'+
    '<p><b>Research measures.</b> Most lenses carry a box headed “Research measure”: a count that writing researchers use, recomputed here by a fixed rule, with what the research found and how this count differs from the published one. The Research profile on the Overview gathers them. None is a score and none has a target.</p>'+
    '<p><b>The meaning model.</b> Off unless you switch it on. It is a small language model that compares sentences by meaning, in your browser. It is the only part of the page that is AI, and its results are always labelled. It never creates notes and never changes the revision receipt.</p>'+
    '<p><b>What the page cannot do.</b> The rules read structure and have no idea what your sentences mean. There is no parser and no dictionary. When a rule is wrong about a sentence, say so with “I checked this” and move on.</p></section>';
  [1,2,3,4,5,6,7].forEach(g=>{const ls=LENSES.filter(l=>l.g===g);h+='<div class="ggrp" id="guide-g'+g+'"><h2>'+esc(GNAME[g][0])+'</h2><p>'+esc(GNAME[g][1])+'</p></div>'+ls.map(sec).join('');});
  return h+'<p class="hint" id="guideNone" hidden>Nothing in the guide matches. Try a shorter word.</p></div>';}
function guideFilter(){const q=(state.guideQ||'').trim().toLowerCase(),secs=[...document.querySelectorAll('.gdoc .gsec')];if(!secs.length)return;let n=0;
  secs.forEach(s=>{const ok=!q||s.textContent.toLowerCase().includes(q);s.hidden=!ok;if(ok)n++;});
  document.querySelectorAll('.gdoc .ggrp').forEach(g=>{let e=g.nextElementSibling,any=false;while(e&&e.classList.contains('gsec')){if(!e.hidden)any=true;e=e.nextElementSibling;}g.hidden=!any;});
  const N=$('#guideN'),Z=$('#guideNone');if(N)N.textContent=q?n+' of '+secs.length+' sections':'';if(Z)Z.hidden=n>0;}
/* optional word norms: four published files, fetched from data/norms/ when asked for. Nothing in them is changed. */
const NORMF={conc:'Concreteness_ratings_Brysbaert_et_al_BRM.txt',aoa:'AoA_ratings_Kuperman_et_al_BRM.csv',freq:'SUBTLEX-US_frequency_list_with_PoS_and_Zipf.csv',prev:'word_prevalence_Brysbaert_et_al_2019.txt'};
const NORMS={st:'off',N:null,err:''};
async function normsLoad(){if(NORMS.st==='loading'||NORMS.st==='ready')return;NORMS.st='loading';renderDynamic();
  try{const src={};await Promise.all(Object.keys(NORMF).map(async k=>{const r=await fetch('data/norms/'+NORMF[k]);if(!r.ok)throw new Error(NORMF[k]+': '+r.status);src[k]=await r.text();}));
    NORMS.N=E.parseNorms(src);if(!NORMS.N.conc.size||!NORMS.N.zipf.size)throw new Error('the files could not be read');NORMS.st='ready';store.set('ts.norms','1');}
  catch(e){NORMS.st='unavail';NORMS.err=String(e&&e.message||e);store.set('ts.norms','');}
  renderDynamic();}
function normsPanel(A){const cap='<span class="cap"'+tipA('Ratings that psychologists collected for tens of thousands of English words, looked up for the words of this draft. Optional, loaded only when you ask. A lookup, with no AI. It raises no notes and does not change the revision receipt.')+'>Word norms · optional data <span class="rtools">'+['conc','aoa','subtlex','prev'].map(toolA).join(' ')+'</span></span>';let body;
  if(NORMS.st==='ready'){const M=E.norms(A,NORMS.N),f2=v=>v==null?'–':v.toFixed(2),ch=(a,fmt,tip)=>a.length?'<div class="chips">'+a.map(e=>'<button type="button" class="chip" data-mgo="'+e.s+'"'+tipA(tip+' First used in sentence '+(e.s+1)+'. Tap to open that sentence.')+'>'+esc(e.w)+' <span class="hint">'+fmt(e.v)+'</span></button>').join('')+'</div>':'<p class="hint">None rated.</p>';
    body='<p class="rfig">Content words: concreteness <b>'+f2(M.conc.mean)+'</b> out of 5 · learned at about age <b>'+rr1(M.aoa.mean)+'</b> · known to <b>'+(M.prev.mean==null?'–':Math.round(100*M.prev.mean)+'%')+'</b> of people on average, with <b>'+M.prev.under90+'</b> known to fewer than nine in ten. All words: frequency <b>'+f2(M.zipf.mean)+'</b> on the Zipf scale, with <b>'+M.zipf.rare+'</b> rare (under 3, or not in the list).</p>'+
      '<p><b>Most abstract.</b></p>'+ch(M.conc.low,v=>v.toFixed(1),'Concreteness, from 1 (abstract) to 5 (concrete).')+
      '<p><b>Learned latest.</b></p>'+ch(M.aoa.high,v=>'age '+Math.round(v),'The age at which people say they learned the word.')+
      '<p><b>Least widely known.</b></p>'+ch(M.prev.low,v=>Math.round(100*v)+'%','The share of people who know the word.')+
      '<p><b>Rarest.</b></p>'+ch(M.zipf.low,v=>v.toFixed(1),'Frequency on the Zipf scale, where 1 to 3 is rare and 4 to 7 is common.')+
      (M.abstract.length?'<p><b>Most abstract sentences.</b> '+M.abstract.map(x=>'<button type="button" class="chip" data-mgo="'+x.i+'"'+tipA('The content words of this sentence average '+x.v.toFixed(1)+' out of 5 for concreteness. Tap to open it.')+'>sentence '+(x.i+1)+'</button>').join(' ')+'</p>':'')+
      '<details><summary>How to read these</summary><p>Each figure is a mean over the words that have a rating: '+M.conc.n+' of '+(M.conc.n+M.conc.miss)+' content words for concreteness, '+M.aoa.n+' for age of acquisition, '+M.prev.n+' for prevalence. Specialist terms are often missing, which makes the draft look more familiar than it is.</p>'+
      '<p><b>Concreteness</b> runs from 1 (abstract: “extent”) to 5 (concrete: “table”). Research prose is abstract by nature. The use of the list is to find a sentence with nothing concrete in it and ask whether an example would help ('+rf('conc14','Brysbaert, Warriner & Kuperman 2014')+').</p>'+
      '<p><b>Age of acquisition</b> is the age at which adults say they learned a word ('+rf('aoa12','Kuperman et al. 2012')+'). <b>Prevalence</b> is the share of people who know a word at all ('+rf('prev19','Brysbaert et al. 2019')+'). A word that few people know needs a definition where it first appears, however short it is.</p>'+
      '<p><b>Frequency</b> is how often a word occurs in film and television subtitles ('+rf('subtlex09','Brysbaert & New 2009')+'), on the Zipf scale ('+rf('zipf14','van Heuven et al. 2014')+'). A word can be rare in subtitles and standard in your field.</p>'+
      '<p>Words are matched to their base forms by rule. The ratings are for words out of context, so a common word used in a technical sense is rated as the common word.</p></details>';}
  else if(NORMS.st==='loading')body='<p>Loading four files…</p>';
  else if(NORMS.st==='unavail')body='<p>The word-norm files could not be loaded in this copy of the page ('+esc(NORMS.err)+'). They load when the page is opened from its GitHub Pages address, or from a local copy served over http with the <code>data</code> folder beside it.</p>';
  else body='<p>Four published sets of word ratings can be looked up for the words of this draft: how concrete each word is, the age at which it is learned, how many people know it, and how often it is used. About 9.6 MB, fetched once from this site. Your text is not sent anywhere.</p><div class="tilebar"><button type="button" class="btn sm" data-norms="1"'+tipA('Fetch the four files and look up the words of this draft. Rule-based: a lookup, with no AI.')+'>Load word norms</button></div>';
  return '<div class="panel res">'+cap+body+'</div>';}
const RESB2={
 vocab:[(A,R)=>{const C=R.cover;if(!C||!C.n)return null;return{t:['nation'],
  fig:'<b>'+rpc(C.ngsl+C.nawl,C.n)+'</b> of the running words are on the two word lists'+(C.proper?', or <b>'+rpc(C.ngsl+C.nawl+C.proper,C.n)+'</b> when the '+C.proper+' proper '+(C.proper===1?'noun is':'nouns are')+' counted as known':'')+'. On neither list: <b>'+C.off+'</b> of '+C.n+'.',
  found:rf('nation06','Nation (2006)')+' asked how many word families a reader must know for 98% of the running words in a text to be familiar, the level he took as enough to read without help. For written text the answer was 8,000 to 9,000 families, with proper nouns counted as known.',
  here:'The two lists here hold about 2,800 general words and about 960 academic ones, far fewer than 8,000 families, so this figure is not a test against the 98% level. It shows how much of the draft rests on common words. Research writing falls short of 98% as a matter of course, because its specialist terms are on neither list. Words are matched to their base forms by rule, and a name is recognised only by its capital letter.'};},
  (A,R)=>normsPanel(A)],
 grid:[(A,R)=>{const P=R.prog;if(!P||!P.n)return null;const T=A.grid.terms.filter(g=>g.rd!=null).slice(0,8);return{t:['danes','givon'],
  fig:'Of <b>'+P.n+'</b> sentences that follow another in their paragraph, <b>'+P.constant+'</b> keep the topic of the sentence before, <b>'+P.linear+'</b> open from where it closed, <b>'+P.ret+'</b> return to an earlier sentence, <b>'+P.ref+'</b> open with a pronoun alone and <b>'+P.fresh+'</b> open on words new to the paragraph.',
  extra:T.length?'<div class="tblwrap"><table class="cmp"><thead><tr><th>Term</th><th'+tipA('How many sentences use the term.')+'>Sentences</th><th'+tipA('Referential distance: the average number of sentences from one mention back to the one before it. 1 means it is in neighbouring sentences.')+'>Average gap</th><th'+tipA('The longest stretch the reader goes without the term before it comes back.')+'>Longest gap</th><th'+tipA('Persistence: after a mention, the average number of following sentences in a row that use the term again.')+'>Stays for</th></tr></thead><tbody>'+T.map(g=>'<tr><td>'+esc(g.w)+'</td><td class="n">'+g.n+'</td><td class="n">'+rr1(g.rd)+'</td><td class="n">'+(g.rdAt>=0?'<button type="button" class="linkish" data-mgo="'+g.rdAt+'"'+tipA('It comes back in sentence '+(g.rdAt+1)+'. Tap to open that sentence.')+'>'+g.rdMax+'</button>':g.rdMax)+'</td><td class="n">'+rr1(g.pers)+'</td></tr>').join('')+'</tbody></table></div>':'',
  found:rf('danes74','Daneš (1974)')+' described how the opening of a sentence, its theme, can be drawn from the text before it. Successive sentences can keep one theme. Each sentence can open from what the one before ended on. Or the themes can derive from one overall topic. Studies of how students revise use three similar patterns, called parallel, sequential and extended parallel progression ('+rf('witte83','Witte 1983')+'; '+rf('connor90','Connor & Farmer 1990')+'). '+rf('givon83','Givón (1983)')+' measured how continuous a topic is in two ways: referential distance, the gap back to its last mention, and persistence, how long it stays once mentioned. '+rf('barzilay08','Barzilay & Lapata (2008)')+' laid the same information out as a grid of entities by sentences, which is the idea behind the grid in this lens.',
  here:'The opening is taken as the words before the main verb, and words are matched by their stems. A pronoun is not resolved to what it stands for, so “opens with a pronoun” is a group of its own. A theme derived from an overall topic cannot be found by rule, so such sentences fall under “new to the paragraph”. Givón counted clauses and capped the distance at 20. This page counts sentences. No pattern is better than another, and most good paragraphs mix them. A run of “new” openings is the one to look at. The strip above each paragraph shows the pattern sentence by sentence.'};}],
 signals:[(A,R)=>{const B=R.bundles,T=R.trans;if(!B||!T)return null;return{t:['biber04','afl'],
  fig:'<b>'+T.before+'</b> of '+T.n+' sentences have a connective before the main verb, <b>'+T.after+'</b> only after it and <b>'+T.none+'</b> have none. Common academic word sequences: <b>'+B.n+'</b> ('+rr1(B.per)+' per 1,000 words): referential '+B.form.ref+', stance '+B.form.stance+', discourse organising '+B.form.org+'.',
  extra:(B.found.length?'<p><b>Sequences found.</b> '+B.found.map(([w,c])=>'“'+esc(w)+'”'+(c>1?' ×'+c:'')).join(' · ')+'</p>':'')+'<p><b>Four-word runs this draft repeats.</b> '+(B.grams.length?B.grams.map(([w,c])=>'“'+esc(w)+'” ×'+c).join(' · ')+(B.rep>B.grams.length?' · and '+(B.rep-B.grams.length)+' more':''):'None.')+'</p>',
  found:rf('biber04','Biber, Conrad & Cortes (2004)')+' call the most frequent word sequences in a register lexical bundles. Most are neither complete structures nor idioms, yet they work as building blocks of discourse, and they sort into three functions: stance, discourse organising and referential. '+rf('afl10','Simpson-Vlach & Ellis (2010)')+' built an Academic Formulas List from academic speech and writing. They ranked each sequence by a score that combines how frequent it is with how strongly its words belong together, and sorted the list by the same three functions.',
  here:'The Academic Formulas List is published in a journal with no open licence, so it is not included. The sequences counted here are a short inventory written for this page, about 70 common ones, sorted by the same three functions. A bundle in the research sense is frequent across a whole corpus. A run repeated within one draft is only a repeat, shown so you can decide whether it is a term you mean to repeat or a habit. Where a connective sits is read against the main verb found by rule.'};}],
 checks:[(A,R)=>{const G=R.grim;if(!G)return null;return{t:['grim'],
  fig:G.tested?'<b>'+G.flagged+'</b> of '+G.tested+' reported '+(G.tested===1?'mean':'means')+' that could be tested cannot come from whole-number scores.':'No mean here is reported in the same sentence as a single sample size under 100, so none could be tested.',
  found:rf('grim17','Brown & Heathers (2017)')+' pointed out that a mean of whole-number scores from N people must equal a whole number divided by N. When a mean is reported to two decimals, that can be checked for any N under 100. They call the check GRIM. Of 260 psychology articles they sampled, 71 reported means that could be tested, and 36 of those had at least one mean that failed.',
  here:'A mean that fails is a question, not a finding of error. The rule takes the only sample size in the sentence as the N behind the mean, which is wrong if some people did not answer or if the mean belongs to a subgroup. Means of scales that average several items, and means of quantities measured in decimals, need not pass.'};}],
 hedge:[(A,R)=>{const X=R.stance;if(!X)return null;const G=X.eng;return{t:['hyland05'],
  fig:'<b>'+X.hedge+'</b> '+(X.hedge===1?'hedge':'hedges')+' and <b>'+X.boost+'</b> '+(X.boost===1?'booster':'boosters')+' ('+rr1(X.hper)+' and '+rr1(X.bper)+' per 1,000 words). Addressed to the reader: <b>'+G.you+'</b> “you”, <b>'+G.dir+'</b> '+(G.dir===1?'directive':'directives')+', <b>'+G.q+'</b> '+(G.q===1?'question':'questions')+', <b>'+G.shared+'</b> '+(G.shared===1?'appeal':'appeals')+' to shared knowledge.',
  found:rf('hyland05','Hyland (2005)')+' describes two ways in which academic writers manage their relation to readers. Stance is the writer’s position toward what the text says, carried by hedges, boosters, attitude markers and self-mention. Engagement is how the writer brings readers into the argument, through reader pronouns, directives, questions, appeals to shared knowledge and asides.',
  here:'The lists of boosters, directives and shared-knowledge phrases were written for this page and are short. They are not Hyland’s inventories. Hedges come from the list this lens already used. “We” is not counted as a reader pronoun, because rules cannot tell the “we” that includes the reader from the “we” of the authors. There is no right ratio: fields differ, and a booster on a well-supported claim is fine. No note is raised.'};}],
 claims:[(A,R)=>{const H=R.hype;if(!H)return null;const by=Object.keys(H.by).filter(k=>H.by[k]).map(k=>k+' '+H.by[k]);return{t:['millar'],
  fig:'<b>'+H.n+'</b> '+(H.n===1?'adjective':'adjectives')+' from the list ('+rr1(H.per)+' per 1,000 words)'+(by.length?': '+by.join(' · '):'')+'.',
  extra:H.words.length?'<p>'+H.words.map(([w,c])=>esc(w)+(c>1?' ×'+c:'')).join(' · ')+'</p>':'',
  found:rf('millar22','Millar, Batalo & Budgell (2022)')+' read the abstracts of funded NIH grant applications from 1985 to 2020 and found 139 adjectives used to promote the work. They counted an adjective as promotional when more than three in ten of its uses could be deleted, or swapped for a neutral word, with no loss of information. Of the 139, 130 became more frequent over the period. They sorted them into eight groups: importance, novelty, rigor, scale, utility, quality, attitude and problem.',
  here:'The words are those reported in the article. Many are ordinary adjectives that promote only some of the time. “Significant” is skipped in a sentence that reports a statistical test, and a few common ones, such as “key”, “major” and “strong”, are counted only when another content word follows. The rest are counted wherever they occur, so read each in its sentence and apply the authors’ own test. The study was of grant abstracts, not of student papers. No note is raised.'};}],
 worn:[(A,R)=>{const X=R.excess;if(!X)return null;return{t:['kobak'],
  fig:'<b>'+X.n+'</b> '+(X.n===1?'use':'uses')+' of <b>'+X.types+'</b> '+(X.types===1?'word':'words')+' on the list ('+rr1(X.per)+' per 1,000 words).',
  extra:X.words.length?'<p>'+X.words.map(([w,c])=>esc(w)+(c>1?' ×'+c:'')).join(' · ')+'</p>':'',
  found:rf('kobak25','Kobak, González-Márquez, Horvát & Lause (2025)')+' compared the words of biomedical abstracts in each year with what earlier years predicted, and listed the 900 words that became unexpectedly common between 2013 and 2024. They labelled each as a content word, such as the vocabulary of the pandemic, or a style word. From the excess of style words in 2024 they estimated that at least 13.5% of that year’s abstracts had been processed with a language model.',
  here:'Only the '+X.list+' style words are used, with function words set aside. A word on the list is no sign that a model wrote the sentence: people used every one of these words before 2023, and the list comes from biomedical abstracts. It is shown because readers have begun to notice these words. Underlined in the text are the ones on neither word list. No note is raised.'};}],
 compare:[(A,R)=>{if(state.base===state.raw||!state.A0)return null;const L=ledger(),rw=(L.pairs||[]).filter(p=>p.kind);if(!rw.length)return null;const K=L.kinds,LAB={surface:'wording only',add:'content added',cut:'content removed',both:'content added and removed'};
  return{t:['faigley'],
  fig:'Of <b>'+rw.length+'</b> rewritten '+(rw.length===1?'sentence':'sentences')+': <b>'+K.surface+'</b> changed the wording only, <b>'+K.add+'</b> added content, <b>'+K.cut+'</b> removed content and <b>'+K.both+'</b> did both.',
  extra:'<div class="tblwrap"><table class="cmp"><thead><tr><th>Sentence</th><th>Change</th><th>Content words added</th><th>Removed</th></tr></thead><tbody>'+rw.slice(0,40).map(p=>'<tr><td><button type="button" class="linkish" data-mgo="'+p.ids[0]+'"'+tipA('Open the sentence as it is now.')+'>'+(p.ids[0]+1)+'</button></td><td>'+LAB[p.kind.kind]+'</td><td>'+(p.kind.added.slice(0,6).map(esc).join(', ')||'–')+'</td><td>'+(p.kind.removed.slice(0,6).map(esc).join(', ')||'–')+'</td></tr>').join('')+'</tbody></table></div>',
  found:rf('faigley81','Faigley & Witte (1981)')+' sorted revisions into surface changes, which leave the content as it was, and text-base changes, which add or remove content. In their study the inexperienced student writers made mostly surface changes, and the more experienced writers changed content more often.',
  here:'A rewrite is labelled “wording only” when it keeps every content word of the sentence it replaced and adds none, matched by stems. A synonym therefore counts as one content word removed and another added. The label describes the change. It does not say the change was good.'};}]};
function resRows2(A){const R=A.research,rows=[],P=R.prog,C=R.cover,X=R.stance,H=R.hype,Z=R.excess;
  if(P&&P.n)rows.push({k:'grid',n:'Sentence openings',v:rpc(P.n-P.fresh,P.n),r:'pick up the paragraph so far · '+P.constant+' same topic · '+P.linear+' from the close · '+P.fresh+' new',
   h:'How the opening of each sentence is tied to the sentences before it in its paragraph. No pattern is the right one. Look at any run of openings on words new to the paragraph, and ask whether the reader can tell why the topic moved.',t:['danes']});
  if(C&&C.n)rows.push({k:'vocab',n:'Running words on the lists',v:rpc(C.ngsl+C.nawl,C.n),r:C.off+' of '+C.n+' on neither list'+(C.proper?' · '+C.proper+' proper '+(C.proper===1?'noun':'nouns'):''),
   h:'The share of all the words in the draft that are on the general or the academic word list. It is not a test against the 98% that Nation took as enough for easy reading, because these two lists are far shorter than the 8,000 to 9,000 word families he found that takes.',t:['nation']});
  if(X)rows.push({k:'hedge',n:'Hedges and boosters',v:X.hedge+' : '+X.boost,r:'hedges to boosters · '+(X.eng.you+X.eng.dir+X.eng.q+X.eng.shared)+' reader-engagement markers',
   h:'A hedge lowers the certainty of a claim and a booster raises it. There is no right ratio. Check that each booster sits on a claim the evidence supports, and that hedges have not piled up on one claim.',t:['hyland05']});
  if(H)rows.push({k:'claims',n:'Promotional adjectives',v:rr1(H.per),r:'per 1,000 words · '+H.n+' in all',
   h:'Adjectives that a study of grant abstracts found were often used to promote. Many are ordinary words. For each, ask whether deleting it would lose information.',t:['millar']});
  if(Z)rows.push({k:'worn',n:'Excess-vocabulary words',v:rr1(Z.per),r:'per 1,000 words · '+Z.types+' different words',
   h:'Words that became much more common in research abstracts in 2023 and 2024. Being on the list is no sign of anything about how a sentence was written. It is shown because readers have begun to notice these words.',t:['kobak']});
  return rows;}
function resBox(k){const A=state.A;if(!A.research||!A.sents.length)return'';return (RESB[k]?resOne(RESB[k](A,A.research)):'')+(RESB2[k]||[]).map(fn=>{const b=fn(A,A.research);return b?(typeof b==='string'?b:resOne(b)):'';}).join('');}
function resOne(b){
  return '<div class="panel res"><span class="cap"'+tipA('A count that writing researchers use to describe a text, reproduced here by fixed rules. It describes the draft. It has no target and it is not a score.')+'>Research measure <span class="rtools">'+b.t.map(toolA).join(' ')+'</span></span>'+(b.fig?'<p class="rfig">'+b.fig+'</p>':'')+(b.extra||'')+'<p><b>What the research found.</b> '+b.found+'</p><p><b>How this count differs.</b> '+b.here+'</p></div>';}
function resRows(A){return resRows0(A).concat(resRows2(A));}
function resRows0(A){const R=A.research,O=R.over,b=R.conn.by,rows=[],gap=O.pp-O.ph,zero=Object.keys(CNAME).filter(k=>!b[k]).map(k=>CNAME[k][0].toLowerCase());
  rows.push({k:'grid',n:'Paragraph links',v:O.pp?O.ph+' of '+O.pp:'–',r:O.pp?(gap?gap+(gap===1?' paragraph starts':' paragraphs start')+' with no word carried over from the one before':'every paragraph carries a word over from the one before'):'needs at least two paragraphs',
   h:'The one overlap count that went with better-rated essays. '+(gap?'A paragraph that carries nothing over starts cold: give it a word from the paragraph before, or check that a heading marks the break.':'Nothing to do here. The line above each paragraph in Topic grid shows which words do the carrying.'),t:['taaco']});
  rows.push({k:'grid',n:'Sentence links',v:rpc(O.lh,O.lp),r:'of neighbouring sentences share a content word'+(O.gp?' · '+rpc(O.gh,O.gp)+' of all sentence pairs do':''),
   h:'Neither high nor low is better: this count did not go with essay quality in either direction. A low figure means the reader gets few repeated words to hold on to. Use it to find the breaks, which Topic grid labels “no link”, and do not try to raise it for its own sake.',t:['taaco','cm']});
  rows.push({k:'signals',n:'Connectives',v:rr1(R.conn.per),r:'per 1,000 words · additive '+b.add+', contrastive '+b.con+', causal '+b.cau+', temporal '+b.tem,
   h:'More is not better. Read the four counts, not the rate. '+(zero.length?'This draft has no '+zero.join(' or ')+' connective. If it argues, compares or narrates, check that the reader can still tell how its sentences relate.':'All four types are present, so the relations between your sentences are being stated somewhere.'),t:['cm','taaco']});
  rows.push({k:'flow',n:'Given words',v:rpc(R.given.old,R.given.cw),r:'of content words were used in an earlier sentence · '+rr1(R.given.per100)+' pronouns per 100 words',
   h:'The share climbs as a draft stays on its subject, and it is lower in a short draft, where little has come before. For the pronouns, more per noun went with lower-rated essays, so check that each one has a clear referent.',t:['taaco']});
  rows.push({k:'terms',n:'Words used once',v:R.once.once+' of '+R.once.types,r:'different content words appear a single time',
   h:'Most words in any text appear once, so this share is always high. What matters is which words they are. A key term should not be among them: Term tracker lists the once-only names.',t:['taaco']});
  rows.push({k:'vocab',n:'Word variety',v:R.lex.mtld==null?'–':'MTLD '+Math.round(R.lex.mtld),r:R.lex.mtld==null?'needs at least 50 words':'MATTR '+R.lex.mattr.toFixed(2)+' · both rise with more varied wording',
   h:'Higher means more varied wording. For scale, student essays in one study averaged an MTLD of 73 to 79. Research writing that holds its key terms steady scores lower, and a fall after you settle on one name for each thing is the result you want.',t:['mtld','mattr']});
  rows.push({k:'sv',n:'Wait for the verb',v:R.pre.median==null?'–':rr1(R.pre.median)+' words',r:R.pre.median==null?'no main verb found':'median before the main verb · longest '+R.pre.max+', in sentence '+(R.pre.maxI+1),
   h:'The median is your typical sentence, and the longest is the one to open. For scale, student essays averaged 4 to 5 words, and the better-rated ones had slightly more. This page puts a note on a wait of 12 or more.',t:['cm']});
  rows.push({k:'rhythm',n:'Readability formulas',v:R.read?'grade '+(rgr(R.read.lo)===rgr(R.read.hi)?rgr(R.read.lo):rgr(R.read.lo)+'–'+rgr(R.read.hi)):'–',r:R.read?'US school grade by three formulas · Flesch reading ease '+Math.round(R.read.fre):'',
   h:'A lower grade means shorter sentences and shorter words, and nothing more. A wide range means the formulas disagree, so trust none of them alone. Grade 13 and above is college level. Do not revise toward a grade.',t:['arte']});
  rows.push({k:'voice',n:'Passives with no agent',v:R.pas.n?R.pas.agentless+' of '+R.pas.n:'0',r:R.pas.n?(R.pas.n===1?'passive leaves':'passives leave')+' out who acted':'no passives found',
   h:'This is not a count of faults. For each one, ask whether the reader needs to know who acted. If so, name them. If not, leave it.',t:['cm']});
  rows.push({k:'clutter',n:'Negatives',v:rr1(R.neg.per),r:'negation words per 1,000 words · '+R.neg.stack+' stacked',
   h:'The rate has no norm to compare with. The stacked count is the one to act on: '+(R.neg.stack?'each has a note in Clutter asking for the positive form.':'none here.'),t:['cm']});
  rows.push({k:'checks',n:'Tense kept',v:R.tense.pairs?rpc(R.tense.same,R.tense.pairs):'–',r:R.tense.pairs?'of neighbouring sentences keep the same tense':'needs two sentences with a readable tense',
   h:'A low figure means many switches. Moving between the past (what you did) and the present (what holds in general) is normal in research writing, so look at the strip above each paragraph in Mechanical checks for the switches you did not intend.',t:['cm']});
  rows.push({k:'slips',n:'Typing slips',v:String(R.slips),r:R.slips?'flagged by fixed patterns, each with a note':'none of the fixed patterns matched',
   h:'Each is a likely slip of typing or word choice, with a note in Typing slips and usually a one-tap fix. Zero does not mean the draft is clean: the checks are few, and built to avoid false alarms.',t:['gamet']});
  rows.push({k:'outline',n:'Paragraph points',v:R.points.given?R.points.ok+' of '+R.points.given:'–',r:R.points.given?'points you stated sit in the opening or close':'not stated yet · write them in Reverse outline',
   h:R.points.given?'A point at neither edge has a note. Move it to the opening or the close, in the words you used for it.':'Open Reverse outline and write each paragraph’s point in a sentence. If you cannot state one, that is the finding.',t:['itell']});
  rows.push({k:'dense',n:'Phrase load',v:rr1(R.phrase.per),r:'noun stacks and preposition chains per 100 words · '+R.phrase.stacks+(R.phrase.stacks===1?' stack':' stacks')+', '+R.phrase.chains+(R.phrase.chains===1?' chain':' chains'),
   h:'There is no norm to compare with. '+(R.phrase.stacks+R.phrase.chains?'Each one has a note in Dense phrases. Unpack those a reader new to your topic could not parse, and keep those that are settled terms in your field.':'None found, so nothing to unpack.'),t:['taassc','biber']});
  rows.push({k:'action',n:'Nominalisations',v:rr1(R.phrase.nomPer),r:'nouns made from verbs, per 100 words · '+R.phrase.noms+' in all, '+R.phrase.nomNotes+' holding the action',
   h:'Academic writing uses many, so a high figure is expected. The ones to change are those where the noun holds the action and the verb is left empty: '+(R.phrase.nomNotes?'Action in verbs has a note on each.':'there are none here.'),t:['biber','taassc']});
  rows.push({k:'rhythm',n:'Plain counts',v:rr1(R.simple.lpw)+' letters',r:'per word · '+rr1(R.simple.spp)+' sentences and '+Math.round(R.simple.wpp)+' words per paragraph',
   h:'Plain counts carry more than they seem to: in one study a handful of them predicted essay scores about as well as a far larger set of measures. Long words and long paragraphs are costs to notice, not errors.',t:['sinlp']});
  {const X=R.source,ku=X?X.key.filter(q=>q.used).length:0;rows.push({k:'source',n:'Source overlap',v:X?String(X.runs):'–',r:X?(X.runs===1?'run':'runs')+' of '+X.N+' or more words matching your source'+(X.key.length?' · '+ku+' of '+X.key.length+' key source terms used':''):'no source pasted · add one in the Source overlap lens',
   h:X?'Each run outside quotation marks has a note: quote it and cite it, or rewrite it with your own structure. Sharing the source’s key terms is a good sign, and sharing its strings of words is not. This is not a plagiarism check.':'If this draft summarises or leans on one text, paste that text in the Source overlap lens to see what you kept and what you copied.',t:['crat']});}
  return rows;}
function profileHTML(){const A=state.A;if(!A.research||!A.sents.length)return'';const rows=resRows(A),B=state.base!==state.raw&&state.A0&&state.A0.research&&state.A0.sents.length?resRows(state.A0):null,nS=A.sents.length,small=nS<10||A.stats.nW<150;
  return '<div class="panel rprof"><span class="cap"'+tipA('Counts that writing researchers use to describe a text, each reproduced here by a fixed rule.')+'>Research profile</span>'+
    '<p>These counts come from published research on cohesion, vocabulary, syntax, readability and mechanical errors ('+rf('cmbook','McNamara et al. 2014')+'; '+rf('taaco','Crossley, Kyle & McNamara 2016')+'; and the sources named on each row). Each is recomputed here by a fixed rule. They describe your draft and do not grade it.</p>'+
    '<details class="rguide" open><summary>How to read the profile</summary>'+
    '<p><b>No figure has a pass mark.</b> The studies behind these counts looked at student essays, and no norms for research articles are built in. Where a study found that a count went with better-rated writing, the line under that row says so, and says which way.</p>'+
    '<p><b>Treat each figure as a pointer to a place.</b> A figure is a summary of particular sentences and paragraphs. Tap the name of a measure to open its lens, which shows the ones that produced it.</p>'+
    '<p><b>Compare the draft with itself.</b> Once you revise, each row also shows what the figure was. A change you meant to make is the useful signal. A figure that moved when you did not expect it to is worth a look.</p>'+
    '<p><b>Short drafts swing.</b> The percentages are shares of sentence pairs. '+(nS>1?'This draft has '+nS+' sentences, so changing one of them can move a percentage by about '+Math.max(1,Math.round(100/(nS-1)))+(Math.round(100/(nS-1))===1?' point':' points')+'.'+(small?' Read the figures as rough.':''):'This draft has one sentence, so most of the figures cannot be worked out yet.')+'</p></details>'+
    '<div class="prows">'+rows.map((r,i)=>'<div class="prow"><button type="button" class="link pk" id="rp-'+i+'" data-k="'+r.k+'"'+tipA('Open '+LBY[r.k].n+', the lens that carries this measure.')+'>'+r.n+'</button><span class="rv"><b>'+esc(r.v)+'</b>'+(B&&B[i].v!==r.v?' <s'+tipA('The figure for your starting text.')+'>was '+esc(B[i].v)+'</s>':'')+' <span>'+esc(r.r)+'</span></span><span class="rtools">'+r.t.map(toolA).join(' ')+'</span><span class="rh">'+esc(r.h)+'</span></div>').join('')+'</div></div>';}
function renderRail(){
  const A=state.A,bc=baseline(),now={};A.findings.filter(active).forEach(f=>{now[f.lens]=(now[f.lens]||0)+1;});
  const tot=o=>Object.values(o).reduce((a,b)=>a+b,0);
  const btn=l=>{let n=l.k==='overview'?tot(now):(now[l.k]||0),b=l.k==='overview'?null:bc[l.k]||0,c='';
    if(l.k==='compare'||l.k==='skeleton'||l.k==='practice'||l.k==='mviews'||l.k==='guide')c='';else if(l.ba!==false&&b!=null&&b!==n&&state.base!==state.raw)c='<s>'+b+'→</s>'+n+(n===0?' ✓':'');else c=String(n);
    return '<button class="lens hb-'+l.hue+(RESB[l.k]||l.k==='source'?' res':'')+'" type="button" id="lens-'+l.k+'" data-k="'+l.k+'" aria-pressed="'+(state.lens===l.k)+'"'+tipA(lensTip(l)+(RESB[l.k]||l.k==='source'?' The small ring means this lens also carries a research measure.':''))+'><i></i><span>'+esc(l.n)+'</span><b>'+c+'</b></button>';};
  const RA=state.railAll||(state.railAll={});
  const q=(state.lensQ||'').trim().toLowerCase(),qre=q?new RegExp('(?:^|[^a-z])'+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')):null,hit=l=>!q||l.n.toLowerCase().includes(q)||qre.test(l.why.toLowerCase());let any=0;
  [0,1,2,3,4,5,6,7].forEach(g=>{const ls=LENSES.filter(l=>l.g===g&&hit(l)),quiet=q?[]:ls.filter(l=>FOLD.has(l.k)&&l.k!==state.lens&&!(now[l.k]>0)),show=RA[g]?ls:ls.filter(l=>!quiet.includes(l));any+=ls.length;const sec=g>=2?$('#g'+g):g===1?$('#railH1'):null;if(sec)sec.hidden=!ls.length;
    $('#rail'+g).innerHTML=show.map(btn).join('')+(quiet.length?'<button type="button" class="railmore" id="rm-'+g+'" data-rmore="'+g+'"'+tipA('Lenses with no open notes on this draft are folded away to keep the list short. Their marks are still there if you want to look.')+'>'+(RA[g]?'Fold away the '+quiet.length+' with nothing open':'+ '+quiet.length+' with nothing open')+'</button>':'');});
  const nn=$('#railNone');if(nn)nn.hidden=!!any;
}
function renderLensCard(){
  const l=LBY[state.lens];
  $('#lensCard').className='lenscard hb-'+l.hue;
  $('#lensCard').innerHTML='<div class="src">'+srcHTML(l.k)+'</div><h2>'+esc(l.n)+'</h2><p>'+esc(l.why)+'</p>'+(l.fix?'<p><b>To revise.</b> '+esc(l.fix)+'</p>':'')+
    (l.k==='tracer'?'<label class="cap" for="claimIn">Your central claim, in one sentence</label><textarea id="claimIn" rows="2" placeholder="What is the one thing this paper shows?">'+esc(state.claim)+'</textarea><label class="cap" for="titleIn"'+tipA('Optional. The words of your title are traced through the text, its opening paragraph and its headings.')+'>Your title, if you have one</label><textarea id="titleIn" rows="1" placeholder="The title of the paper">'+esc(state.title)+'</textarea>':'')+
    (l.legend.length?'<div class="legend">'+l.legend.map(([c,t])=>'<span'+tipA(markTip(l.k,c))+'><span class="mk '+c+'">Aa</span> '+esc(t)+'</span>').join('')+'</div>':'');
}
function renderStrip(){
  const A=state.A,S=A.stats,rh=state.lens==='rhythm',max=rh?50:Math.max(40,S.max),fs=A.findings.filter(f=>inView(f)&&active(f)),hue=LBY[state.lens].hue,cmp=noText(state.lens);
  $('.stripwrap').hidden=cmp;if(cmp)return;
  const ov=state.lens==='overview',rate=ov?fs.length/(S.nS||1):new Set(fs.map(f=>f.s)).size/(S.nS||1),light=!fs.length?'🟢':ov?(rate>2?'🔴':rate>0.75?'🟠':'🟢'):(rate>0.5?'🔴':rate>0.2?'🟠':'🟢');
  const bc0=baseline(),was=ov?Object.values(bc0).reduce((a,b)=>a+b,0):(bc0[state.lens]||0),showWas=state.base!==state.raw&&LBY[state.lens].ba!==false&&was!==fs.length;
  const pop=state.dl&&state.dl.k===state.lens&&state.dl.v!==light;state.dl={k:state.lens,v:light};
  $('#readout').innerHTML='<span'+tipA('Sentences found in the draft. Headings are not counted.')+'>'+S.nS+' sentences</span><span>'+S.nW+' words</span><span'+tipA(rh?'Mean sentence length. For comparison: research articles average about 25 words (Deveci 2019), recent non-fiction about 20 (Rudnicka 2018), and prose that Flesch (1948) called “standard” 17.':'Mean sentence length. The dashed line in the chart marks 30 words.')+'>'+S.avg.toFixed(1)+' words per sentence</span>'+
    '<span class="status"'+tipA(ov?'Traffic light for the whole draft. Green: fewer than 0.75 open notes per sentence. Orange: up to 2. Red: more than 2. Notes you mark as checked do not count.':'Traffic light for this lens. Green: at most one sentence in five has an open note. Orange: up to half. Red: more than half. Notes you mark as checked do not count.')+'>'+lightH(light,pop)+''+fs.length+(fs.length===1?' open note':' open notes')+(showWas?' (was '+was+')':'')+'</span>'+
    '<button type="button" class="help" aria-label="How to read this chart"'+tipA(rh?'Each bar is one sentence on a fixed scale of 0 to 50 words; a bar with a notched top runs past 50. The dashed lines mark the band edges at 12, 22 and 29 words, and colour shows the band. The darker lower part of a bar counts the words before the main verb, so a bar that is mostly dark keeps the reader waiting. An outlined bar has an open note. Gaps separate paragraphs.':'Each bar below is one sentence, and its height is the sentence’s word count. Gaps separate paragraphs. A coloured bar has an open note in this lens. Tap a bar to open that sentence.')+'>?</button>'+
    '<button type="button" class="btn sm" id="btnClean" aria-pressed="'+!!state.clean+'"'+tipA(state.clean?'Bring the marks, numbers and panels back.':'Hide every mark, number and panel, and just read the text as a reader would.')+'>'+(state.clean?'Show the marks':'Clean view')+'</button>'+
    (fs.length?'<button type="button" class="btn sm" id="btnGuide"'+tipA('Walk through the open notes one at a time. Each starts with a question, and the advice stays hidden until you ask for it.')+'>'+(state.guide?'Guided pass running':'Start guided pass')+'</button>':'');
  $('#strip').classList.toggle('tall',rh);
  let h=rh?[12,22,29].map(w=>'<div class="ref" style="--y:'+(w/max*100).toFixed(1)+'%"><span>'+w+'</span></div>').join(''):'<div class="ref" style="--y:'+(30/max*100).toFixed(1)+'%"><span>30 words</span></div>';
  A.paras.forEach(p=>{if(p.head||!p.sents.length)return;h+='<div class="pg" style="flex:'+p.sents.length+' 1 0">';
    p.sents.forEach(i=>{const st=A.sents[i],on=fs.some(f=>f.s===i),sel=state.sel&&st.s<state.sel.e&&st.e>state.sel.s,xc=(state.setP&&state.setP.has(st.p)?' calm':'')+(fxOn(i)?' settle':'')+(state.lens==='grid'&&st.link?' lk-'+st.link.type:'');
      if(rh){const b=bandOf(st.nW),pv=st.preV;
        h+='<button type="button" class="bar rb bn'+b+' hb-'+BAND[b][2]+(on?' on':'')+(sel?' sel':'')+(st.nW>50?' over':'')+xc+'" data-bar="'+i+'" style="'+fxS(i)+'--h:'+Math.max(4,Math.min(st.nW,50)/max*100).toFixed(1)+'%;--p:'+(pv!=null&&st.nW?Math.round(100*pv/st.nW):0)+'%"'+tipA('Sentence '+(i+1)+' · '+st.nW+' words · '+BAND[b][0].toLowerCase()+'.'+(pv!=null?' '+pv+(pv===1?' word comes':' words come')+' before the main verb (the darker part).':'')+(st.emph?' ◆ Set apart by its length.':'')+(on?' Has an open note.':'')+' Tap to open it.')+' aria-label="Sentence '+(i+1)+', '+st.nW+' words, '+BAND[b][0].toLowerCase()+'"></button>';return;}
      h+='<button type="button" class="bar hb-'+hue+(on?' on':'')+(sel?' sel':'')+xc+'" data-bar="'+i+'" style="'+fxS(i)+'--h:'+Math.max(4,st.nW/max*100).toFixed(1)+'%"'+tipA('Sentence '+(i+1)+' · '+st.nW+' words'+(on?' · has an open note in this lens':'')+'. Tap to open it.')+' aria-label="Sentence '+(i+1)+', '+st.nW+' words"></button>';});
    h+='</div>';});
  $('#strip').innerHTML=h;
}

/* ---------- lens panels ---------- */
function renderExtra(){
  const A=state.A,l=state.lens,x=$('#extra');let h='';
  if(l==='overview')h=overviewHTML();
  else if(l==='tracer'){const t=A.tracer.terms;
    h=t.length<2?'<div class="panel"><p>Write your claim above. Its nouns and verbs become the terms that are traced.</p></div>':
      '<div class="panel"><span class="cap">Claim terms, and how often the draft uses them</span><div class="chips">'+t.map(q=>'<span class="chip'+(q.count?'':' zero')+'"'+tipA(q.count?'The draft uses this claim term '+q.count+(q.count===1?' time.':' times.'):'The draft never uses this claim term.')+'>'+esc(q.w)+' <b>'+q.count+'</b></span>').join('')+'</div><p>'+t.filter(q=>q.stress).length+' of '+t.length+' terms land in a stress position somewhere in the draft.</p></div>';
    h+=tracerMore();}
  else if(l==='grid')h=gridHTML();
  else if(l==='signals')h=movesPanel();
  else if(l==='guide')h=guideHTML();
  else if(l==='source')h=sourcePanel();
  else if(l==='practice')h=practiceHTML();
  else if(l==='jobs'){const J=Object.fromEntries(E.JOBS),q=A.jobs;
    h='<div class="panel"><span class="cap">The shape of your argument</span><div class="seq">'+q.seq.map((j,i)=>(i?'→':'')+'<span class="'+(j?'':'none')+'">¶'+(i+1)+' '+esc(j?J[j]:'?')+'</span>').join('')+'</div><p>'+(q.unlabeled?'Label '+q.unlabeled+' more '+(q.unlabeled===1?'paragraph':'paragraphs')+' below. The checks on missing jobs run once every paragraph has a label.':'Every paragraph is labeled.')+'</p></div>';}
  else if(l==='terms'){const sel=state.termSel,T=A.terms,chip=t=>'<button type="button" class="chip'+(sel.has(t.k)?' on':'')+'" id="tm-'+esc(t.k)+'" data-term="'+esc(t.k)+'"'+tipA('Appears '+t.count+(t.count===1?' time':' times')+'. Tap to highlight every use in the text.')+'>'+esc(t.w)+' <b>'+t.count+'</b></button>',
      rec=T.filter(t=>t.count>=2),subj=T.filter(t=>t.count===1&&t.subj),once=T.filter(t=>t.count===1&&!t.subj),name=k=>(T.find(t=>t.k===k)||{w:k}).w;
    h='<div class="panel"><span class="cap">Recurring terms</span><div class="chips">'+(rec.map(chip).join('')||'<p>No noun appears more than once yet.</p>')+'</div>'+
      (sel.size?'<p>'+[...sel].map(k=>{const t=T.find(q=>q.k===k);return t?'“'+esc(t.w)+'”: sentence'+(t.sents.length>1?'s ':' ')+t.sents.map(i=>i+1).join(', '):'';}).filter(Boolean).join(' · ')+'</p>':'')+
      '<div class="tilebar"><button type="button" class="btn sm" id="termMerge"'+(sel.size>=2?'':' disabled')+tipA('Mark the selected names as one thing. The less used names are then flagged in the text.')+'>These name the same thing</button><button type="button" class="btn sm" id="termClear"'+(sel.size?'':' disabled')+'>Clear selection</button></div>'+
      state.merges.map((ks,i)=>'<p>Marked as one thing: '+ks.map(k=>'“'+esc(name(k))+'”').join(', ')+'. <button type="button" class="link" data-unmerge="'+i+'">Undo</button></p>').join('')+
      (subj.length?'<details><summary>Used once, as the subject of a sentence ('+subj.length+')</summary><div class="chips">'+subj.map(chip).join('')+'</div></details>':'')+
      (once.length?'<details><summary>Used once elsewhere ('+once.length+')</summary><div class="chips">'+once.map(chip).join('')+'</div></details>':'')+'</div>'+termsMore();}
  else if(l==='vocab'){const v=A.vocab,pc=i=>v.n?Math.round(100*v.l[i]/v.n):0;
    h='<div class="panel"><span class="cap">Where your content words come from</span><div class="vbar" role="img" aria-label="Share of content words on each list"><i class="v0" style="flex:'+v.l[0]+' 1 0"'+tipA('Everyday English: words on the New General Service List.')+'></i><i class="v1" style="flex:'+v.l[1]+' 1 0"'+tipA('General academic words: on the New Academic Word List.')+'></i><i class="v2" style="flex:'+v.l[2]+' 1 0"'+tipA('On neither list: specialist terms and rare words.')+'></i></div><p>'+pc(0)+'% everyday · '+pc(1)+'% general academic · '+pc(2)+'% on neither list, of '+v.n+' content words. Names, numbers and abbreviations are not counted.</p>'+(v.top.length?'<span class="cap">On neither list, most used first</span><div class="chips">'+v.top.map(([w,n])=>'<span class="chip"'+tipA('Used '+n+(n===1?' time.':' times.'))+'>'+esc(w)+' <b>'+n+'</b></span>').join('')+'</div>':'')+'</div>';}
  else if(l==='rhythm'){const R=A.rhythm.all,pc=i=>R.n?Math.round(100*R.bands[i]/R.n):0,f1=v=>v==null?'–':String(Math.round(v*10)/10),
      B=state.base!==state.raw&&state.A0&&state.A0.rhythm&&state.A0.rhythm.all.n?state.A0.rhythm.all:null,fl=fleschOf(R.mean),
      row=(name,r,c)=>'<tr'+(c?' class="'+c+'"':'')+'><td>'+name+'</td><td class="n">'+r.n+'</td><td class="n">'+f1(r.median)+'</td><td class="n">'+r.min+'–'+r.max+'</td><td class="n">'+(r.n>1?r.cv.toFixed(2):'–')+'</td><td class="n">'+(r.npvi==null?'–':Math.round(r.npvi))+'</td><td class="n">'+f1(r.pre)+'</td></tr>';
    h=!R.n?'':'<div class="panel"><span class="cap">Sentence lengths on a fixed scale</span>'+
      '<div class="vbar lbar" role="img" aria-label="Share of sentences in each length band">'+BAND.map((b,i)=>'<i class="b'+i+'" style="flex:'+R.bands[i]+' 1 0"'+tipA(R.bands[i]+(R.bands[i]===1?' sentence is ':' sentences are ')+b[0].toLowerCase()+' ('+b[1]+'). '+markTip('rhythm','lb'+i).replace(/^[^.]*\.\s/,''))+'></i>').join('')+'</div>'+
      '<p>'+BAND.map((b,i)=>pc(i)+'% '+b[0].toLowerCase()).join(' · ')+', of '+R.n+(R.n===1?' sentence.':' sentences.')+'</p>'+
      '<p>The mean is '+f1(R.mean)+' words a sentence. The nearest point on Flesch’s 1948 scale is “'+fl[1]+'”, which is prose averaging '+fl[0]+(fl[0]===8?' words or fewer':fl[0]===29?' words or more':' words')+'. His scale also counts syllables, which this lens does not, so read this as half of a reading-ease score. Research articles average about 25 words.</p>'+
      '<div class="tblwrap"><table class="cmp rt"><thead><tr><th>Part</th><th'+tipA('Number of sentences.')+'>Sent.</th><th'+tipA('Median length in words: half the sentences are shorter and half are longer. Less swayed by one very long sentence than the mean.')+'>Median</th><th'+tipA('The shortest and the longest sentence, in words.')+'>Range</th><th'+tipA('Spread: the standard deviation of the lengths divided by their mean (the coefficient of variation). 0 means all the same length. About 0.4 to 0.6 is an ordinary spread. It ignores the order of the sentences.')+'>Spread</th><th'+tipA(NPVITIP+' Under 20 is level, 20 to 40 gentle, 40 or more varied. These cut-offs are this tool’s working values.')+'>Contrast</th><th'+tipA('Median number of words before the main verb. Readers hold these in memory until the verb arrives (Gibson 1998). Twelve or more in one sentence raises a note.')+'>Before verb</th></tr></thead><tbody>'+
      (B?row('Starting text',B,'r-was'):'')+row(B?'Draft now':'Whole draft',R,'r-all')+A.paras.filter(p=>p.ord!=null&&p.rhythm).map(p=>row('¶'+(p.ord+1),p.rhythm)).join('')+'</tbody></table></div>'+
      '<p'+tipA('Sentences that sit inside a level run (four or more of near-equal length) or a choppy run (three or more short ones). A plain count of how much of the draft moves at one pace.')+'>'+A.rhythm.flat+' of '+R.n+' sentences ('+Math.round(100*A.rhythm.flat/R.n)+'%) sit inside a level or choppy run.</p>'+RGUIDE+'</div>';}
  else if(l==='skeleton'){let shown=0,tot=0;A.sents.forEach(st=>{tot+=st.nW;const tp=st.topic,sp=st.stress,wc=(a,b)=>st.pre[b]-(a>0?st.pre[a-1]:0);if(!tp||!sp||st.T[sp[0]].s<st.T[tp[1]].e)shown+=st.nW;else shown+=wc(0,tp[1])+wc(sp[0],st.N-1);});
    h='<div class="panel"><span class="cap">How to read the skeleton</span><p>Read straight down the page, skipping the dots. Blue is the opening of each sentence: what it says it is about, and its link to the sentence before. Rose is the close: what it leaves the reader holding. If you can still follow the argument, the structure is carrying it. Where you lose the thread, the idea you needed is hidden in a middle.</p><p>Showing '+shown+' of '+tot+' words ('+(tot?Math.round(100*shown/tot):0)+'%). Tap any sentence to see all of it and rewrite it.</p></div>';}
  else if(l==='compare'){const bc=baseline(),now={};A.findings.filter(active).forEach(f=>{now[f.lens]=(now[f.lens]||0)+1;});
    const rows=LENSES.filter(q=>q.k!=='overview'&&q.ba!==false).map(q=>{const b=bc[q.k]||0,n=now[q.k]||0;return b||n?'<tr><td>'+esc(q.n)+'</td><td class="n">'+b+'</td><td class="n">'+n+'</td><td class="n '+(n<b?'dn':n>b?'up':'')+'">'+(n===b?'':(n<b?'−':'+')+Math.abs(n-b))+'</td></tr>':'';}).join('');
    const same=state.base===state.raw;
    const any=!same||Object.keys(state.dismissed).length>0,rc=any?receipt():'';
    h=(any?'<div class="panel"><span class="cap"'+tipA('A plain account of the revising done since your starting text. It is worked out from the two texts each time, so it cannot be inflated by deleting sentences.')+'>Revision receipt</span>'+(state.passDone?'<p><b>Your '+state.passDone.min+'-minute pass is over.</b> This is what your revising has changed so far.</p>':'')+'<textarea readonly class="rcpt" id="rcText" rows="'+rc.split('\n').length+'" aria-label="Revision receipt">'+esc(rc)+'</textarea><div class="tilebar"><button type="button" class="btn sm" id="rcCopy"'+tipA('Copy the receipt as plain text, to keep or to hand in.')+'>Copy the receipt</button><span class="hint" id="rcMsg" aria-live="polite"></span></div>'+
      '<p>A note counts as resolved only when the rewritten sentence keeps at least four in ten of the content words it started with. Notes that vanish because the text was cut are listed apart and earn nothing. Notes you marked “I checked this” count as work done, because weighing a note and keeping your sentence is a real decision.</p></div>':'<div class="panel"><span class="cap">Revision receipt</span>'+(state.passDone?'<p><b>Your '+state.passDone.min+'-minute pass is over.</b></p>':'')+'<p>Nothing to report yet. Rewrite a sentence or mark a note as checked, and a receipt of your revising appears here.</p></div>')+
      '<div class="panel"><span class="cap">Open notes, before and now</span><div class="tblwrap"><table class="cmp"><thead><tr><th>Lens</th><th>Before</th><th>Now</th><th>Change</th></tr></thead><tbody>'+rows+'</tbody></table></div>'+
      '<p>'+(same?'You have not changed the text yet. Tap a sentence in any lens and rewrite it, then come back.':'Notes you marked as checked are not counted under Now. In the text below, struck-through red was removed and green was added.')+'</p>'+
      (same?'':'<div class="tilebar"><button type="button" class="btn sm" id="setBase"'+tipA('Later comparisons will start from the text as it is now.')+'>Make the current text the new starting point</button></div>')+'</div>'+
      (same?'':'<div class="diff">'+diffHTML(state.base,state.raw)+'</div>');}
  if(l==='overview')h=profileHTML()+h;else if(l!=='guide')h=resBox(l)+meanBox(l)+h;
  x.innerHTML=h;$('#startBox').innerHTML=l==='overview'?state.startH||'':'';if(l==='mviews')mvDraw();if(l==='guide')guideFilter();
}

function tracerMore(){const A=state.A,T=A.tracer.title,K=A.tracer.key;let h='';
  if(T&&T.terms.length)h+='<div class="panel"><span class="cap"'+tipA('Each word of your title, and how often the text uses it. A title word the text never uses is a promise the text does not keep.')+'>Title words, and how often the text uses them</span><div class="chips">'+T.terms.map(q=>'<span class="chip'+(q.count?'':' zero')+'"'+tipA(q.count?'Used '+q.count+(q.count===1?' time':' times')+' in the text, '+q.first+' of them in the opening paragraph'+(T.heads?', and in '+q.heads+' of '+T.heads+' headings':'')+'.':'The text never uses this title word.')+'>'+esc(q.w)+' <b>'+q.count+'</b></span>').join('')+'</div></div>';
  if(K&&K.length){const ct=A.tracer.terms;
    h+='<div class="panel"><span class="cap"'+tipA('Sentences ranked by how many content words each shares with the other sentences, weighted by how well connected those are in turn. This is the TextRank idea (Mihalcea & Tarau 2004). It counts shared words and reads no meaning.')+'>The sentences this draft is built around</span><ol class="keys">'+K.map(i=>{const st=A.sents[i],n=ct.filter(t=>st.cw.some(c=>nearS(t.k,c.k))).length;return '<li><button type="button" class="link" data-bar="'+i+'" id="key-'+i+'">Sentence '+(i+1)+'</button> '+esc(st.text.length>150?st.text.slice(0,148).trimEnd()+'…':st.text)+(ct.length>=2?' <span class="kn">'+n+' of '+ct.length+' claim terms</span>':'')+'</li>';}).join('')+'</ol><p>By shared vocabulary, these are the sentences everything else connects to. Ask whether they are the ones you would choose. If your claim is not among them, the draft is organised around something else.</p></div>';}
  else if(A.sents.length<6)h+='<div class="panel"><p>Key sentences are worked out once the draft has six sentences or more.</p></div>';
  return h;}
function gridHTML(){const A=state.A,G=A.grid,S=A.sents;if(!G.terms.length)return '<div class="panel"><p>No noun appears in more than one sentence yet, so there is nothing to chart.</p></div>';
  const body=A.paras.filter(p=>p.ord!=null),wide=S.length>40,cols=[];
  body.forEach(p=>{if(!wide||state.gridP===p.ord)p.sents.forEach((i,q)=>cols.push({lab:String(i+1),s:[i],pb:q===0,ord:p.ord,tip:'Sentence '+(i+1)+', in paragraph '+(p.ord+1)+'.'}));else cols.push({lab:'¶'+(p.ord+1),s:p.sents,pb:true,ord:p.ord,para:true,tip:'Paragraph '+(p.ord+1)+': sentences '+(p.sents[0]+1)+' to '+(p.sents[p.sents.length-1]+1)+'. Tap to open it into sentences.'});});
  const cell=(g,c)=>{let L=0,R=0;c.s.forEach(i=>{const v=g.cells[i];if(v==='L')L++;else if(v==='R')R++;});return L?'<td class="gl'+(c.pb?' pb':'')+'"'+tipA('“'+g.w+'” comes before the main verb'+(c.para?' in '+L+(L===1?' sentence':' sentences')+' of this paragraph.':' in sentence '+c.lab+'.'))+'>●</td>':R?'<td class="gr'+(c.pb?' pb':'')+'"'+tipA('“'+g.w+'” comes after the main verb'+(c.para?' in this paragraph, and never before it.':' in sentence '+c.lab+'.'))+'>○</td>':'<td'+(c.pb?' class="pb"':'')+'></td>';};
  const LK=G.links,lk=k=>'<span class="lkc lk-'+k+'"'+tipA(LINK[k][1])+'>'+(LK[k]||0)+' '+LINK[k][0]+'</span>';
  return '<div class="panel"><span class="cap">Terms the draft keeps using, sentence by sentence</span><div class="tblwrap"><table class="gridt"><thead><tr><th></th>'+cols.map(c=>'<th class="'+(c.pb?'pb':'')+'"'+tipA(c.tip)+'>'+(c.para||(wide&&state.gridP===c.ord&&c.pb)?'<button type="button" class="link" data-gp="'+c.ord+'" id="gp-'+c.ord+'-'+c.lab+'">'+c.lab+'</button>':c.lab)+'</th>').join('')+'</tr></thead><tbody>'+
    G.terms.map(g=>'<tr><th><button type="button" class="chip'+(state.gridSel===g.k?' on':'')+'" id="gt-'+esc(g.k)+'" data-gterm="'+esc(g.k)+'"'+tipA('In '+g.n+' sentences, '+g.nL+' of them before the main verb. Tap to show only this term in the text.')+'>'+esc(g.w)+'</button></th>'+cols.map(c=>cell(g,c)).join('')+'</tr>').join('')+'</tbody></table></div>'+
    '<p>● before the main verb, where readers look for the topic · ○ after it, as news · rows are in order of first use'+(wide?' · columns are paragraphs; tap one to open it into sentences':'')+'.</p>'+
    '<span class="cap"'+tipA('How each sentence connects to what came before, using the four levels of SWAN (Kinnunen et al. 2012). The label is on each sentence’s number in the text and on its bar in the chart.')+'>How each sentence links back</span><div class="lks">'+['fluid','inverted','outofsync','disconnected'].map(lk).join('')+'</div>'+
    '<details class="rguide"><summary>How to read the grid, and where it comes from</summary>'+
    '<p><b>The grid.</b> Readers treat what comes before the main verb as what a sentence is about, and what comes after as the news ('+rf('gs','Gopen & Swan 1990')+'). A row of filled dots is a topic the draft stays with. A row that is all rings is a term the draft keeps mentioning and never makes its subject. A row that stops is a topic dropped, and a row that starts late is one introduced late. Showing topics across a text on either side of the main verb is the design of '+rf('ontopic','OnTopic')+' at Carnegie Mellon. This version is built from this page’s own rules: it charts nouns that occur in at least two sentences, up to fourteen of them, and matches words by their stems.</p>'+
    '<p><b>The link labels.</b> '+rf('swan','SWAN')+', a rule-based checker for scientific papers, sorts sentences into four levels. Fluid: the sentence keeps its connection with the one before. Inverted topic: it connects, but only at its end. Out of sync: it connects to an earlier sentence, with unrelated sentences between. Disconnected: it connects to nothing before it, or too much lies between. Here “connects” means sharing a content word by its stem, or opening with a pointing word or a transition, and “too much” is more than six sentences. SWAN’s authors note that a person judging the links does better than the rules, so treat a label as a question.</p>'+
    '<p><b>What it cannot see.</b> Synonyms and pronouns in mid-sentence. Two sentences can be tightly connected in meaning and share no word. Where that is so, the label is wrong, and it still tells you the reader has no repeated word to hold on to.</p></details></div>';}
function movesPanel(){const A=state.A,M=A.moves,J=Object.fromEntries(E.JOBS),seq=A.sents.filter(s=>s.move);
  return '<div class="panel"><label class="cap" for="kindSel"'+tipA('Each kind of text usually makes certain moves. Choose one and the lens notes any of them that no sentence signals. Leave it unset and the lens only tags the sentences.')+'>What kind of text is this?</label><select id="kindSel">'+KINDS.map(([k,n])=>'<option value="'+k+'"'+(state.kind===k?' selected':'')+'>'+n+'</option>').join('')+'</select>'+
    (M.exp.length?'<div class="chips">'+M.exp.map(k=>'<span class="chip'+(M.first[k]!=null?'':' zero')+'"'+tipA(M.first[k]!=null?'First signalled in sentence '+(M.first[k]+1)+'.':'No sentence carries a phrase that signals this move.')+'>'+(M.first[k]!=null?'✓ ':'')+esc(J[k])+'</span>').join('')+'</div><p>'+(M.missing.length?'Not signalled anywhere: '+M.missing.map(k=>J[k].toLowerCase()).join(', ')+'. '+(M.missing.length===1?'It has a note.':'Each has a note.'):'Every move this kind of text usually makes is signalled somewhere.')+'</p>':'')+
    '<span class="cap"'+tipA('Each sentence whose wording signals a move, in order. The tag is the move with the most cue phrases in that sentence.')+'>Moves signalled, in order</span>'+(seq.length?'<div class="seq">'+seq.map((s,i)=>(i?'→':'')+'<span>'+(s.i+1)+' '+MOVEN[s.move]+'</span>').join('')+'</div>':'<p>No sentence carries a phrase that signals a move.</p>')+
    '<p>'+(A.sents.length-seq.length)+' of '+A.sents.length+' sentences carry no move signal. The tags come from fixed lists of cue phrases, in the manner of '+rf('acawriter','AcaWriter')+', so a move made in other words is not seen. The expected moves follow '+rf('swales','Swales')+' for introductions and the five parts '+rf('swan','SWAN')+' looks for in an abstract.</p></div>';}
/* ---------- overview: where to start, the draft at a glance, your own model, the finish ---------- */
function ptRow(label,tip,cells,sq){return '<div class="pt-row"><span'+tipA(tip)+'>'+label+'</span><div class="pt-bars'+(sq?' sqs':'')+'">'+cells+'</div></div>';}
function portraitHTML(A,title,live){const S=A.sents,cnt={},pb=i=>i>0&&S[i].p!==S[i-1].p?' pb':'',wh=i=>'Sentence '+(i+1)+(live?'':' of your starting text');A.findings.forEach(f=>{if(!f.para&&!f.ok&&!(live&&f.dis))(cnt[f.s]=cnt[f.s]||[]).push(f.title);});
  return '<div class="portrait"><span class="cap">'+title+'</span>'+
    ptRow('Length','One bar for each sentence. Height is its word count, up to 50. Teal is short (1 to 12 words), grey medium, amber long (23 to 29), rose very long (30 or more). Point at a bar for its numbers.',S.map((s,i)=>{const b=bandOf(s.nW);return '<i class="b'+b+pb(i)+'" style="--h:'+Math.max(8,Math.min(s.nW,50)*2)+'%"'+tipA(wh(i)+': '+s.nW+(s.nW===1?' word':' words')+'. '+BAND[b][0]+' ('+BAND[b][1]+').')+'></i>';}).join(''))+
    ptRow('Wait for verb','Height is the number of words before the main verb, up to 25. Amber is eight or more, rose twelve or more. Point at a bar for its numbers.',S.map((s,i)=>{const w=s.preV||0;return '<i class="'+(w>=12?'w3':w>=8?'w2':'w1')+pb(i)+'" style="--h:'+Math.max(8,Math.min(w,25)*4)+'%"'+tipA(wh(i)+': '+(s.preV==null?'no main verb was found.':w+(w===1?' word comes':' words come')+' before the main verb'+(w>=12?', enough to raise a note.':w>=8?', which is a long wait.':'.')))+'></i>';}).join(''))+
    ptRow('Link back','How each sentence connects to the one before. Teal is fluid, amber a late or far link, rose no link. Point at a square for the detail.',S.map((s,i)=>{const k=s.link?s.link.type:'start';return '<i class="sq lk-'+k+pb(i)+'"'+tipA(wh(i)+'. '+LINK[k][1])+'></i>';}).join(''),1)+
    ptRow('Open notes','Open notes on each sentence. Pale teal is none, grey one or two, amber three or four, rose five or more. Point at a square to see which.',S.map((s,i)=>{const t=cnt[s.i]||[],n=t.length;return '<i class="sq n'+(n>=5?3:n>=3?2:n>=1?1:0)+pb(i)+'"'+tipA(wh(i)+': '+(n?n+(n===1?' open note: ':' open notes: ')+t.slice(0,5).join(' · ')+(n>5?' · and '+(n-5)+' more':'')+'.':'no open notes.'))+'></i>';}).join(''),1)+'</div>';}
function observe(A){const S=A.sents,w=S.filter(s=>(s.preV||0)>=12).length,nl=S.filter(s=>s.link&&(s.link.type==='disconnected'||s.link.type==='outofsync')).length,lg=S.reduce((a,s)=>s.nW>a.nW?s:a,S[0]);
  return [w?w+' of '+S.length+' sentences make the reader hold twelve or more words before the main verb.':'No sentence makes the reader hold twelve or more words before its main verb.',
    nl?nl+(nl===1?' sentence picks':' sentences pick')+' up nothing from the sentence before.':'Every sentence picks up something from the one before it, or opens with a pointing word.',
    'The longest sentence is sentence '+(lg.i+1)+', at '+lg.nW+' words. The mean is '+(Math.round(A.stats.avg*10)/10)+'.'];}
function modelHTML(){const A=state.A,body=A.paras.filter(p=>p.ord!=null&&p.sents.length>=3);if(body.length<2)return'';
  const cnt=p=>A.findings.filter(f=>active(f)&&p.sents.includes(f.s)).length,rate=p=>cnt(p)/p.sents.length,all=A.findings.filter(active).length/(A.sents.length||1);
  const best=body.slice().sort((a,b)=>rate(a)-rate(b)||b.sents.length-a.sents.length)[0],r=rate(best);if(r>all*0.7&&r>0.5)return'';
  const ss=best.sents.map(i=>A.sents[i]),good=[],mw=Math.max(...ss.map(s=>s.preV||0));
  if(ss.slice(1).every(s=>s.link&&s.link.type==='fluid'))good.push('each sentence picks up something from the one before it');
  if(mw<=6)good.push('the main verb arrives within '+Math.max(mw,1)+(mw<=1?' word':' words')+' in every sentence');
  if(ss.every(s=>s.head>=0&&s.v>=0&&s.gap<=2))good.push('subjects and verbs sit together');
  if(ss.every(s=>s.nW<30))good.push('no sentence runs past 29 words');
  if(!A.findings.some(f=>active(f)&&f.lens==='action'&&best.sents.includes(f.s)))good.push('the actions are in verbs');
  if(!good.length)return'';
  return '<div class="panel"><span class="cap"'+tipA('The paragraph of three or more sentences with the fewest open notes for its length. It is picked by counting, and shows what your own writing already does well.')+'>Your own model</span><p>Paragraph '+(best.ord+1)+' has the fewest open notes for its length: '+cnt(best)+' across '+best.sents.length+' sentences, against '+(Math.round(all*10)/10)+' a sentence in the draft as a whole. In it, '+good.slice(0,3).join('; ')+'. When another paragraph resists, read this one first. The standard is already in your own writing.</p><div class="tilebar"><button type="button" class="btn sm" id="goModel" data-bar="'+best.sents[0]+'">Go to paragraph '+(best.ord+1)+'</button></div></div>';}
function overviewHTML(){const A=state.A,S=A.sents;state.startH='';if(!S.length)return'';
  const open=A.findings.filter(active),by={},per={};open.forEach(f=>{by[f.lens]=(by[f.lens]||0)+1;if(!f.para)per[f.s]=(per[f.s]||0)+1;});
  const np=A.paras.filter(p=>p.ord!=null).length,touched=state.base!==state.raw||Object.keys(state.dismissed).length>0,done=np>0&&touched&&state.setP&&state.setP.size===np;
  const G1=['sv','topic','stress','flow','action'],rank=ks=>ks.filter(k=>by[k]&&LBY[k]).sort((a,b)=>by[b]-by[a]||LIDX[a]-LIDX[b]),top=rank(G1).slice(0,3);rank(Object.keys(by).filter(k=>!G1.includes(k))).forEach(k=>{if(top.length<3)top.push(k);});
  const first=Object.keys(per).map(Number).sort((a,b)=>per[b]-per[a]||a-b)[0],easy=state.isSample&&state.base===SAMPLE;let h='';
  if(done){const rc=receipt();h='<div class="panel start"><h3 class="starth">Every paragraph is settled</h3><p>No open notes remain in any lens. Each one was resolved by rewriting or weighed and kept. Read the draft through once more as a reader would, with nothing marked.</p><div class="tilebar"><button type="button" class="btn sm primary" id="btnClean2">'+(state.clean?'Show the marks':'Read it clean')+'</button></div><textarea readonly class="rcpt" id="rcText" rows="'+rc.split('\n').length+'" aria-label="Revision receipt">'+esc(rc)+'</textarea><div class="tilebar"><button type="button" class="btn sm" id="rcCopy">Copy the receipt</button><span class="hint" id="rcMsg" aria-live="polite"></span></div></div>';}
  else if(open.length){const P=state.pass,left=P?Math.max(0,Math.ceil((P.until-Date.now())/60000)):0;
    h='<div class="panel start"><h3 class="starth"'+tipA('A suggested way in. The lenses listed are the ones with the most open notes on this draft, with Gopen and Swan’s principles first.')+'>Start here</h3><p>'+(easy?'This is the built-in example: six sentences with '+open.length+' things to fix, each of them quick. Open a sentence, read its note, and rewrite it in the box. ':'')+open.length+(open.length===1?' open note':' open notes')+' across '+Object.keys(by).length+(Object.keys(by).length===1?' lens':' lenses')+'. You do not need to clear them all. Begin with the '+(top.length===1?'lens that has':'lenses that have')+' most to say about this draft:</p>'+
      '<div class="row">'+top.map((k,q)=>'<button type="button" class="btn sm'+(q?'':' primary')+'" id="st-'+k+'" data-k="'+k+'"'+tipA(lensTip(LBY[k]))+'>'+esc(LBY[k].n)+' · '+by[k]+'</button>').join('')+'</div>'+
      (first!=null?'<div class="row"><span>Or open the sentence with the most notes:</span><button type="button" class="btn sm" id="st-first" data-bar="'+first+'">Sentence '+(first+1)+' · '+per[first]+(per[first]===1?' note':' notes')+'</button></div>':'')+
      (P?'<div class="row"><span>Timed pass running: '+P.ids.length+' sentences, '+(left?left+' min left':'time is up')+'.</span><button type="button" class="btn sm primary" id="passResume">Carry on</button><button type="button" class="btn sm" id="passEnd">End the pass</button></div>':
        '<div class="row"><span'+tipA('A pass has an end. It walks you through the sentences with the most notes, three for five minutes, six for ten and twelve for twenty, then shows what changed.')+'>Or take a timed pass:</span>'+[5,10,20].map(m=>'<button type="button" class="btn sm" id="pass-'+m+'" data-pass="'+m+'">'+m+' min</button>').join('')+'</div>')+
      '<div class="row"><span>Or look somewhere new:</span><button type="button" class="btn sm" id="btnSurprise"'+tipA('Opens a lens you have not looked at yet, on one sentence, with one question.')+'>Surprise me</button></div>'+(state.isSample?'<div class="row"><span>'+(easy?'When this one feels easy:':'For a gentler start:')+'</span><button type="button" class="btn sm" id="btnHard" data-ex="'+(easy?'2':'1')+'"'+tipA(easy?'Twelve sentences written to contain every kind of problem the lenses read for.':'Six sentences with four quick things to fix.')+'>'+(easy?'Load the harder example':'Load the easier example')+'</button></div>':'')+'</div>';}
  const B=state.base!==state.raw&&state.A0&&state.A0.sents.length?state.A0:null;
  state.startH=h;h='';
  h+='<div class="panel"><span class="cap"'+tipA('Four small charts of the whole draft, one mark for each sentence, with gaps between paragraphs.')+'>The draft at a glance</span><div class="portraits">'+(B?portraitHTML(B,'Your starting text',false):'')+portraitHTML(A,B?'Now':'This draft',true)+'</div><ul class="obs">'+observe(A).map(o=>'<li>'+o+'</li>').join('')+'</ul></div>';
  return h+modelHTML();}
/* ---------- timed pass, surprise, shared causes, previews, milestones ---------- */
function passLab(){const P=state.pass;if(!P)return'';const left=P.until-Date.now();return left<=0?'Time is up. Finish this sentence, then end the pass · ':'Timed pass · '+Math.ceil(left/60000)+' min left · ';}
function startPass(min){const per={};state.A.findings.forEach(f=>{if(active(f)&&!f.para)per[f.s]=(per[f.s]||0)+1;});
  const ids=Object.keys(per).map(Number).sort((a,b)=>per[b]-per[a]||a-b).slice(0,{5:3,10:6,20:12}[min]||3).sort((a,b)=>a-b);if(!ids.length)return;
  state.pass={ids,min,until:Date.now()+min*60000};state.passDone=null;if(state.lens!=='overview')setLens('overview');state.guide={cur:[-1,-1,-1],done:false};guideGo(1);}
function endPass(){const P=state.pass;if(!P)return;state.passDone={min:P.min};state.pass=null;state.guide=null;state.hot=null;state.sel=null;setLens('compare');window.scrollTo({top:0,behavior:reduced()?'auto':'smooth'});}
function surprise(){const A=state.A,seen=state.seen||(state.seen=new Set()),by={};A.findings.forEach(f=>{if(active(f))(by[f.lens]=by[f.lens]||[]).push(f);});
  let ks=Object.keys(by).filter(k=>LBY[k]&&!seen.has(k));if(!ks.length)ks=Object.keys(by).filter(k=>LBY[k]&&k!==state.lens);if(!ks.length)return;
  const k=ks[Math.floor(Math.random()*ks.length)],f=by[k].slice().sort((a,b)=>a.s-b.s)[0];setLens(k);openWb(f.s,{hot:f.key,scroll:true});}
function causeOf(fs){const has=(l,re)=>fs.find(f=>f.lens===l&&(!re||re.test(f.title))),names=a=>a.map(f=>'“'+esc(f.title)+'”').join(', ');
  const sv=has('sv'),wait=has('rhythm',/before the main verb/),long=has('rhythm',/words in one sentence/),dense=has('dense'),act=has('action'),voice=has('voice'),clut=has('clutter'),top=has('topic'),flow=has('flow'),opn=has('openers');
  if(sv||wait){const lead=sv||wait,o=[sv&&wait?wait:null,dense,long].filter(Boolean);if(o.length)return{lead,text:'Several of these notes share one cause: the reader waits a long time for the main verb. Bringing the subject and its verb together early often clears '+names(o)+' as well.'};}
  if(act){const o=[voice,clut,dense].filter(Boolean);if(o.length)return{lead:act,text:'Several of these notes share one cause: the action sits in a noun and not in the verb. Making it the verb often clears '+names(o)+' as well.'};}
  if(top||flow){const lead=top||flow,o=[top&&flow?flow:null,opn].filter(Boolean);if(o.length)return{lead,text:'Several of these notes share one cause: the sentence does not open with something the reader already has. Starting from a familiar term often clears '+names(o)+' as well.'};}
  const PRI=['sv','rhythm','action','topic','flow','stress','openers','dense','voice','clutter'],pr=f=>{const i=PRI.indexOf(f.lens);return i<0?99:i;};
  return{lead:fs.slice().sort((a,b)=>pr(a)-pr(b))[0],text:''};}
function sigBag(A){const m=new Map();A.findings.forEach(f=>{if(f.ok||f.para||state.dismissed[f.key])return;const k=nsig(f),v=m.get(k);if(v)v.n++;else m.set(k,{n:1,t:f.title});});return m;}
function pvSet(key,fid,ed){if(state.pv&&state.pv.key===key){state.pv=null;renderDynamic();return;}
  const A2=E.analyze(state.raw.slice(0,ed.s)+ed.text+state.raw.slice(ed.e),opts()),a=sigBag(state.A),b=sigBag(A2),gone=[],came=[];
  a.forEach((v,k)=>{const d=v.n-(b.has(k)?b.get(k).n:0);for(let i=0;i<d;i++)gone.push(v.t);});b.forEach((v,k)=>{const d=v.n-(a.has(k)?a.get(k).n:0);for(let i=0;i<d;i++)came.push(v.t);});
  state.pv=Object.assign({key,fid,gone,came},ed);renderDynamic();}
function pvBox(f){const p=state.pv;if(!p||p.fid!==f.id)return'';
  return '<div class="pv"><span class="cap">If you make this change</span><p>'+(p.gone.length?'It clears '+p.gone.length+(p.gone.length===1?' note: ':' notes: ')+esc(p.gone.join(' · '))+'.':'It clears no notes.')+(p.came.length?' It brings in '+p.came.length+': '+esc(p.came.join(' · '))+'.':'')+' The result is a rough draft to read over.</p><div class="tilebar"><button type="button" class="btn sm primary" data-pvgo="1">Make the change</button><button type="button" class="btn sm" data-pvno="1">Leave it</button></div></div>';}
const ASIDE={sv:['readers hold a subject in mind until its verb arrives, and treat whatever comes between as an interruption','gs','Gopen & Swan 1990'],
 topic:['readers take the opening of a sentence as its link to what they have just read','gs','Gopen & Swan 1990'],
 stress:['readers give most weight to whatever comes last in a sentence','gs','Gopen & Swan 1990'],
 flow:['a reader needs something familiar to attach new information to','haviland','Haviland & Clark 1974'],
 action:['readers expect to find the action of a sentence in its verb','gs','Gopen & Swan 1990'],
 rhythm:['a reader keeps the opening words in memory until the verb says what they are for','gibson','Gibson 1998']};
function asideFor(fs){if((state.asideN||0)>=2)return;const used=state.asideUsed||(state.asideUsed=new Set()),f=fs.find(x=>x&&ASIDE[x.lens]&&!used.has(x.lens));if(!f)return;used.add(f.lens);state.asideN=(state.asideN||0)+1;const a=ASIDE[f.lens];state.aside='Why that helps: '+a[0]+' ('+rf(a[1],a[2])+').';}
let toastT=0;const toastQ=[];
function hideToast(){clearTimeout(toastT);toastT=0;$('#toast').hidden=true;if(toastQ.length)showToast();}
function showToast(){const el=$('#toast');if(!el.hidden||!toastQ.length)return;el.textContent='✓ '+toastQ.shift();el.hidden=false;toastT=setTimeout(hideToast,6000);}
function award(id,text){if(!state.miles)state.miles={};if(state.miles[id])return;state.miles[id]=1;save();toastQ.push(text);showToast();}
function miles(){const A=state.A,A0=state.A0;if(!A0||(state.base===state.raw&&!Object.keys(state.dismissed).length))return;
  if(state.fxNew)award('firstFix','First note resolved by rewriting.');
  const n0=A0.findings.length,open=A.findings.filter(active).length;if(n0>=6&&open<=n0/2)award('half','Half of the notes you started with are gone.');
  if(state.setAt&&Object.keys(state.setAt).length)award('firstSettled','A paragraph is settled: no open notes left in it.');
  const body=A.paras.filter(p=>p.ord!=null),b0=A0.paras.filter(p=>p.ord!=null),ss=(X,p)=>p.sents.map(i=>X.sents[i]),fl=a=>a.length>=3&&a.slice(1).every(s=>s.link&&s.link.type==='fluid'),sv=a=>a.length>=3&&a.every(s=>s.head>=0&&s.v>=0&&s.gap<=1);
  if(body.length===b0.length)body.forEach((p,i)=>{const a=ss(A,p),b=ss(A0,b0[i]);if(fl(a)&&!fl(b))award('fluid','In paragraph '+(p.ord+1)+', every sentence now links to the one before.');if(sv(a)&&!sv(b))award('sv','In paragraph '+(p.ord+1)+', every subject now meets its verb at once.');});
  if(body.length&&state.setP&&state.setP.size===body.length)award('all','Every paragraph is settled.');}
/* ---------- next note, reading comfort, walkthrough ---------- */
function nextNote(){const fs=state.A.findings.filter(f=>inView(f)&&active(f)).sort((a,b)=>a.s-b.s||(a.a==null?-1:a.a)-(b.a==null?-1:b.a));if(!fs.length)return;
  const cur=state.sel?spanSents().map(x=>x.i):[],mx=cur.length?Math.max(...cur):-1,f=fs.find(x=>x.s>mx)||fs[0];openWb(f.s,{hot:f.key,scroll:true});}
const FS=[100,112,125,140];
function applyRead(){const R=state.read||(state.read={fs:0,sp:false,rc:false}),de=document.documentElement;de.style.fontSize=FS[R.fs]+'%';de.classList.toggle('sp',!!R.sp);de.classList.toggle('rc',!!R.rc);
  $('#fsVal').textContent=FS[R.fs]+'%';$('#fsDown').disabled=R.fs<=0;$('#fsUp').disabled=R.fs>=FS.length-1;$('#rsSpace').checked=!!R.sp;$('#rsColour').checked=!!R.rc;store.set('ts.read',JSON.stringify(R));if(state.sel)autosize();}
const TOUR=[{t:'Tap sentence 2 in the text below. Its number is coloured because a lens has a note on it.',sel:'.sent[data-s="1"]'},
 {t:'This is the workbench. You rewrite in the box, and the note under it starts with a question, with the advice below.',sel:'#pNotes .note',next:1},
 {t:'Tap “Preview” in the note to see what the suggested change would do. Then choose “Make the change”.',sel:'#pNotes [data-fix]'},
 {t:'The mark has gone and the light has changed. That is the whole loop: open a sentence, read its note, rewrite. The other notes are yours to try.',sel:'#wbStatus',done:1}];
function startTour(){if(!(state.isSample&&state.base===SAMPLE&&state.raw===SAMPLE))loadEx(SAMPLE);state.sel=null;state.tour={i:0};renderDynamic();$('#ms').scrollIntoView({block:'center',behavior:reduced()?'auto':'smooth'});}
function endTour(){state.tour=null;store.set('ts.tour','1');renderDynamic();}
function tourSync(){const el=$('#tour'),T=state.tour;document.querySelectorAll('.tour-target').forEach(x=>x.classList.remove('tour-target'));
  if(T&&state.base!==SAMPLE){state.tour=null;store.set('ts.tour','1');}
  if(!state.tour||state.editing){el.hidden=true;return;}
  if(T.i===0&&state.sel&&spanSents().some(x=>x.i===1))T.i=1;if(T.i<3&&state.raw!==state.base)T.i=3;
  if(state.lens!=='overview'&&T.i<3){el.hidden=true;return;}
  const S=TOUR[T.i];el.hidden=false;$('#tourText').textContent='Step '+(T.i+1)+' of '+TOUR.length+'. '+S.t;$('#tourNext').hidden=!(S.next||S.done);$('#tourNext').textContent=S.done?'Done':'Next';$('#tourSkip').hidden=!!S.done;
  const tg=document.querySelector(S.sel);if(tg)tg.classList.add('tour-target');}
/* ---------- practice ---------- */
const DRILLS=[
 {p:'Principle 1 · subject and verb',q:'Tap the main verb: the word that says what the subject did.',t:'The decline in volunteering that followed the closure of the community centre surprised the researchers.',need:['surprised'],why:'Ten words separate the subject, “decline”, from its verb. Until “surprised” arrives, the reader is holding all of them. Compare: “The researchers were surprised when volunteering declined after the community centre closed.”'},
 {p:'Principle 1 · subject and verb',q:'Tap the subject: the one word the main verb is about.',t:'Interviews with thirty retired teachers in two cities revealed a consistent pattern.',need:['interviews'],why:'The verb “revealed” belongs to “Interviews”. Seven words stand between them, and the reader carries each one while waiting.'},
 {p:'Principle 2 · the stress position',q:'Tap the words this sentence stresses: the ones a reader is left with.',t:'Trust in local government fell sharply after the merger.',need:['merger'],ok:['after','the'],why:'Readers give most weight to the end of a sentence. Here that is “after the merger”. If the news is how far trust fell, the sentence should end there: “After the merger, trust in local government fell sharply.”'},
 {p:'Principles 3 and 4 · old before new',q:'Tap the words in the second sentence that link back to the first.',lead:'Retirement removes daily contact with colleagues.',t:'A sharp rise in loneliness follows this loss of contact.',need:['contact'],ok:['this','loss','of'],why:'The link, “this loss of contact”, comes last, so the reader meets the new idea, a rise in loneliness, before knowing what it attaches to. Start from the familiar: “This loss of contact is followed by a sharp rise in loneliness.”'},
 {p:'Principle 5 · action in verbs',q:'Tap the nouns that are hiding an action.',t:'The committee made a decision to conduct a review of the policy.',need:['decision','review'],why:'“Made” and “conduct” say only that something happened. The actions are in the nouns. Put them in verbs: “The committee decided to review the policy.”'},
 {p:'Principle 3 · the topic position',q:'Tap the words that tell the reader whose story this sentence is.',t:'In the second wave of the survey, respondents who had moved reported weaker ties to neighbours.',need:['respondents'],ok:['who','had','moved'],why:'The opening phrase sets the scene. The story belongs to the grammatical subject, “respondents who had moved”, and readers expect the next sentences to stay with them.'}];
const WRE=/[\p{L}\p{N}]+(?:[-'’][\p{L}\p{N}]+)*/gu,wordsOf=t=>t.match(WRE)||[];
function prState(){return state.pr||(state.pr={set:'bank',i:0,picks:new Set(),out:null,pick:null,right:{bank:0,wait:0,next:0}});}
function prItems(set){const A=state.A;if(set==='bank')return DRILLS;
  if(set==='wait'){const c=A.sents.filter(s=>s.preV!=null&&s.nW>=8&&s.nW<=45).sort((a,b)=>b.preV-a.preV||a.i-b.i),out=[];for(let k=0;k<Math.floor(c.length/2)&&out.length<5;k++){const hi=c[k],lo=c[c.length-1-k];if(hi.preV-lo.preV>=5)out.push(k%2?[lo,hi]:[hi,lo]);}return out;}
  const out=[];A.paras.forEach(p=>{if(p.ord==null)return;for(let q=0;q<p.sents.length-1;q++){const a=A.sents[p.sents[q]],b=A.sents[p.sents[q+1]];if(a.cw.length>=3&&b.cw.length>=2&&a.nW<=45)out.push([a,b]);}});
  return out.length>6?Array.from({length:6},(_,k)=>out[Math.floor(k*out.length/6)]):out;}
function tokBtns(text,picks,lock){let h='',c=0,i=0,m;WRE.lastIndex=0;while((m=WRE.exec(text))){h+=esc(text.slice(c,m.index))+'<button type="button" class="tk hb-violet'+(picks.has(i)?' on':'')+'" id="pw-'+i+'" data-pw="'+i+'"'+(lock?' disabled':'')+'>'+esc(m[0])+'</button>';c=m.index+m[0].length;i++;}return '<p class="toks">'+h+esc(text.slice(c))+'</p>';}
function practiceHTML(){const P=prState(),items=prItems(P.set),n=items.length;if(P.i>=n)P.i=0;
  let h='<div class="panel pr"><div class="chips">'+[['bank','Find the structure'],['wait','Which keeps the reader waiting?'],['next','What comes next?']].map(([k,t])=>'<button type="button" class="chip'+(P.set===k?' on':'')+'" id="ps-'+k+'" data-pset="'+k+'"'+tipA(k==='bank'?'Six sentences written for this page, one or two for each principle.':k==='wait'?'Pairs of sentences from your own draft. Pick the one whose main verb comes later.':'A sentence from your own draft. Say which of its words the next sentence will pick up, then see.')+'>'+t+'</button>').join('')+'</div>';
  if(!n)return h+'<p>'+(P.set==='wait'?'This drill needs sentences of eight words or more whose main verbs arrive at clearly different points. This draft does not have a pair yet.':'This drill needs a paragraph with at least two sentences.')+'</p></div>';
  const nav='<button type="button" class="btn sm" id="pNext">'+(P.i+1<n?'Next':'Start again')+'</button>';
  h+='<span class="cap">'+(P.set==='bank'?esc(items[P.i].p):'From your draft')+' · '+(P.i+1)+' of '+n+(P.right[P.set]?' · '+P.right[P.set]+' right':'')+'</span>';
  if(P.set==='bank'){const d=items[P.i];h+='<p class="askq">'+esc(d.q)+'</p>'+(d.lead?'<p class="prlead">'+esc(d.lead)+'</p>':'')+tokBtns(d.t,P.picks,!!P.out)+(P.out||'')+'<div class="tilebar">'+(P.out?'':'<button type="button" class="btn sm primary" id="pCheck"'+(P.picks.size?'':' disabled')+'>Check</button>')+nav+'</div>';}
  else if(P.set==='wait'){const pr=items[P.i];h+='<p class="askq">Which of these two sentences from your draft makes the reader wait longer for its main verb? Tap it.</p>'+pr.map((s,k)=>'<button type="button" class="prcard'+(P.pick===k?' on':'')+'" id="pab-'+k+'" data-pab="'+k+'"'+(P.out?' disabled':'')+'><b>'+'AB'[k]+'</b>'+esc(s.text)+'</button>').join('')+(P.out||'')+'<div class="tilebar">'+nav+'</div>';}
  else{const[a]=items[P.i];h+='<p class="askq">This is sentence '+(a.i+1)+' of your draft. Tap the word or words you expect the next sentence to pick up.</p>'+tokBtns(a.text,P.picks,!!P.out)+(P.out||'')+'<div class="tilebar">'+(P.out?'':'<button type="button" class="btn sm primary" id="pCheck"'+(P.picks.size?'':' disabled')+'>Show the next sentence</button>')+nav+'</div>';}
  return h+'<p class="hint">'+(P.set==='bank'?'These sentences were written for this page. The answers are fixed, and the explanation shows one way to revise.':P.set==='wait'?'The count is the lens’s own reading of each sentence, and it can misjudge a verb. If it looks wrong, trust your reading.':'Adapted from the continuity test in SWAN (Kinnunen et al. 2012): if you, the author, cannot say what the next sentence will pick up, a reader will not be able to either.')+'</p></div>';}
function prCheck(ab){const P=prState(),items=prItems(P.set),it=items[P.i];if(!it||P.out)return;const yes=t=>'<p class="prout ok">✓ '+t+'</p>',no=t=>'<p class="prout no">'+t+'</p>';
  if(P.set==='bank'){const ws=wordsOf(it.t).map(w=>w.toLowerCase()),got=[...P.picks].map(i=>ws[i]),ok=it.need.every(w=>got.includes(w))&&got.every(w=>it.need.includes(w)||(it.ok||[]).includes(w));
    if(ok)P.right.bank++;P.out=(ok?yes('Yes.'):no('Not quite. The answer is “'+it.need.join('” and “')+'”.'))+'<p>'+esc(it.why)+'</p>';}
  else if(P.set==='wait'){P.pick=ab;const hi=it[0].preV>=it[1].preV?0:1,ok=ab===hi,s=it[hi];if(ok)P.right.wait++;
    P.out=(ok?yes('Yes.'):no('It is the other one.'))+'<p>Sentence '+'AB'[0]+' holds '+it[0].preV+(it[0].preV===1?' word':' words')+' before its main verb, and sentence '+'AB'[1]+' holds '+it[1].preV+'. In sentence '+'AB'[hi]+' the reader carries '+s.preV+' words before learning what they are for.</p><div class="tilebar"><button type="button" class="btn sm" id="pgo" data-pgo="'+s.i+'" data-pl="sv">Open sentence '+(s.i+1)+' to revise it</button></div>';}
  else{const[a,b]=it,ws=wordsOf(a.text),st=[...P.picks].map(i=>E.stem(ws[i].toLowerCase())),hit=[...P.picks].filter((i,q)=>b.cw.some(c=>nearS(st[q],c.k))).map(i=>ws[i]),K=b.link||{type:'disconnected',via:[]},v=K.via[0];
    if(hit.length)P.right.next++;
    const msg=hit.length?yes('The next sentence does pick up “'+hit.join('”, “')+'”.')+'<p>'+(K.type==='fluid'&&!K.weak?'It does so before its main verb, so the reader sees the connection at once.':K.type==='inverted'?'The link comes after its main verb, though, so the reader meets the new material first. Consider starting the sentence from the shared word.':'')+'</p>'
      :no('It picks up none of the words you chose.')+'<p>'+(v&&v.from===a.i?'It links back through “'+esc(v.pw)+'”'+(K.type==='inverted'?', and only after its main verb.':'.'):K.weak?'It shares no content word with this sentence and leans on a '+(K.weak==='pointer'?'pointing word':'transition')+' to connect.':K.type==='outofsync'?'It shares no word with this sentence. Its nearest link is to sentence '+(v.from+1)+'.':'It shares no word with this sentence, or with the few before it.')+' If you could not predict it, a reader may not see how it follows.</p>';
    P.out=msg+'<p class="prlead"><b>Sentence '+(b.i+1)+'.</b> '+renderMarks(b.text,(b.marks.grid||[]),true)+'</p><div class="tilebar"><button type="button" class="btn sm" id="pgo" data-pgo="'+b.i+'" data-pl="grid">Open sentence '+(b.i+1)+' to revise it</button></div>';}}
/* ---------- manuscript ---------- */
const RUNTIP={even:r=>'Part of a level run: sentences '+r.from+' to '+r.to+' are all close to the same length.',chop:r=>'Part of a choppy run: sentences '+r.from+' to '+r.to+' are all short.',long:r=>'Part of a long run: sentences '+r.from+' to '+r.to+' are all very long.'};
const EMPHTIP={short:'◆ Set apart by length: it is the shortest sentence in its paragraph, and no more than 60% of the median.',drop:'◆ Set apart by length: it is no more than half as long as the sentence before it.'};
function sentHTML(st,fs,hue){const sel=state.sel&&st.s<state.sel.e&&st.e>state.sel.s,on=fs.some(f=>f.s===st.i),rh=state.lens==='rhythm',b=bandOf(st.nW);
  const tip=rh?'Sentence '+(st.i+1)+' · '+st.nW+(st.nW===1?' word':' words')+' · '+BAND[b][0]+' ('+BAND[b][1]+').'+(st.preV!=null?' '+st.preV+' before the main verb.':'')+(st.run?' '+RUNTIP[st.run.type](st.run):'')+(st.emph?' '+EMPHTIP[st.emph]:'')+(st.picked?' ★ You chose this as the sentence to remember.':'')+(on?' Has an open note.':'')+' Tap to open it for rewriting.':'Sentence '+(st.i+1)+'. '+chipTip(st)+(on?'Coloured because it has an open note in this lens. ':'')+'Tap to open it for rewriting.';
  return '<span class="sent'+(sel?' sel':'')+(rh?' lb'+b+(st.run?' rn rn-'+st.run.type:''):'')+(fxOn(st.i)?' fixed':'')+'" data-s="'+st.i+'" style="'+fxS(st.i)+'--i:'+Math.min(st.i,40)+'"><button type="button" class="sn hb-'+hue+(on?' on':'')+(state.lens==='grid'&&st.link?' lk-'+st.link.type:'')+'" aria-label="Sentence '+(st.i+1)+(rh?', '+st.nW+' words, '+BAND[b][0].toLowerCase():'')+'"'+tipA(tip)+'>'+(rh?st.nW+'w'+(st.emph?' ◆':'')+(st.picked?' ★':''):chipLab(st))+'</button>'+(state.lens==='skeleton'?skelHTML(st):renderMarks(st.text,marksFor(st)))+'</span> ';}
function skelHTML(st){const T=st.T,tp=st.topic,sp=st.stress;if(!tp||!sp||T[sp[0]].s<T[tp[1]].e)return esc(st.text);
  const a=T[tp[1]].e,b=T[sp[0]].s,mid=st.text.slice(a,b),n=(mid.match(/[A-Za-z0-9]\S*/g)||[]).length;
  return '<span class="mk hl hb-blue"'+tipA(markTip('skeleton','hb-blue'))+'>'+esc(st.text.slice(0,a))+'</span>'+(n?' <span class="skmid"'+tipA(n+(n===1?' word is':' words are')+' hidden here, between the opening and the close. Tap the sentence to see all of it.')+'>···</span> ':esc(mid))+'<span class="mk hl hb-rose"'+tipA(markTip('skeleton','hb-rose'))+'>'+esc(st.text.slice(b))+'</span>';}
function pblockHTML(p,pi,fs,hue){
  const A=state.A,l=state.lens;
  if(p.head)return '<p class="para head">'+esc(state.raw.slice(p.s,p.e))+'</p>';
  let h='';
  if(l==='topic'&&p.topics&&p.topics.length>1)h+='<span class="tstring"'+tipA('The grammatical subject of each sentence in this paragraph, in order. A steady string of subjects reads as one story.')+'>topics: '+p.topics.map(esc).join(' → ')+'</span>';
  if(l==='jobs'&&p.ord!=null){h+='<div class="padorn"><span class="pn">¶'+(p.ord+1)+'</span><select class="jobsel" id="job-'+p.ord+'" data-ord="'+p.ord+'" aria-label="Job of paragraph '+(p.ord+1)+'"><option value="">What is this paragraph’s job?</option>'+E.JOBS.map(([k,n])=>'<option value="'+k+'"'+(p.job===k?' selected':'')+'>'+n+'</option>').join('')+'</select>'+(p.job?'<a class="pbl" href="'+PBURL+E.PB[E.JOBPB[p.job]][1]+'/" target="_blank" rel="noopener"'+tipA('Common phrases for this kind of paragraph, in the Academic Phrasebank. Opens in a new tab.')+'>Phrasebank: '+E.PB[E.JOBPB[p.job]][0]+'</a>':'')+'</div>'+movesHTML(p);}
  if(l==='tracer'&&p.ord!=null&&A.tracer.terms.length>=2){const hs=p.hits||[];h+='<div class="padorn"><span class="pn">¶'+(p.ord+1)+'</span><span class="'+(hs.length?'hit':'')+'"'+tipA('How many of your claim’s terms this paragraph uses, and which.')+'>'+hs.length+' of '+A.tracer.terms.length+' claim terms'+(hs.length?': '+hs.map(esc).join(', '):'')+'</span></div>';}
  if(l==='signals'&&p.ord!=null){const sg=Object.entries(p.signals||{});h+='<div class="padorn"><span class="pn">¶'+(p.ord+1)+'</span><span'+tipA('Which kinds of signal this paragraph carries, and how many of each.')+'>'+(sg.length?'signals: '+sg.map(([k,n])=>k+(n>1?' ×'+n:'')).join(' · '):'no signals')+'</span></div>';}
  if(l==='grid'&&p.ord>0&&p.carry){const c=p.carry;h+='<div class="padorn carry"><span class="pn">¶'+p.ord+' → ¶'+(p.ord+1)+'</span><span class="'+(c.n?'hit':'miss')+'"'+tipA(c.n?'Content words this paragraph shares with the one before it, most used first. '+c.n+' in all. Overlap between neighbouring paragraphs is the cohesion measure that went with higher-rated essays (Crossley, Kyle & McNamara 2016).':'This paragraph repeats no content word from the one before it, so the reader has no word to carry across the break. It has a note.')+'>'+(c.n?'carries over: '+c.words.map(esc).join(', ')+(c.n>c.words.length?' and '+(c.n-c.words.length)+' more':''):'no content word carried over')+'</span></div>';}
  if(l==='grid'&&p.ord!=null&&p.prog){const PK={constant:['same topic','It opens on a word from the opening of the sentence before: a constant progression.'],linear:['from the close','It opens on a word from the close of the sentence before: a linear progression.'],ret:['returns','It opens on a word from an earlier sentence in this paragraph.'],ref:['pronoun','It opens with a pronoun or “this”. The rules do not work out what it points to.'],fresh:['new','It opens on words not yet used in this paragraph.']};
    h+='<div class="padorn tstrip"><span class="pn">¶'+(p.ord+1)+'</span><span'+tipA('Where the opening of each sentence comes from (Daneš 1974). No pattern is better than another. A run of “new” openings is the one to look at.')+'>openings</span>'+p.prog.seq.map(x=>'<i class="tn tn-'+(x.kind==='fresh'?'none':x.kind==='constant'?'past':'lin')+'"'+tipA('Sentence '+(x.i+1)+'. '+PK[x.kind][1]+(x.w?' The shared word: “'+x.w+'”.':''))+'>'+(x.i+1)+' '+PK[x.kind][0]+'</i>').join('')+'</div>';}
  if(l==='checks'&&p.ord!=null&&p.sents.length>1){h+='<div class="padorn tstrip"><span class="pn">¶'+(p.ord+1)+'</span><span'+tipA('The tense of each sentence’s main verb, in order. Coh-Metrix scores how often tense repeats from one sentence to the next. A change is fine when you move from what you did (past) to what is generally true (present).')+'>tense</span>'+p.sents.map(i=>{const t=A.sents[i].tense;return '<i class="tn tn-'+(t||'none')+'"'+tipA('Sentence '+(i+1)+'. '+(t==='past'?'Its main verb is in the past tense.':t==='present'?'Its main verb is in the present tense.':'The rules could not read a tense from its main verb.'))+'>'+(i+1)+' '+(t==='past'?'past':t==='present'?'present':'?')+'</i>';}).join('')+'</div>';}
  if(l==='outline'&&p.ord!=null){const pt=p.point,v=(state.points||[])[p.ord]||'';h+='<div class="padorn point"><label for="pt-'+p.ord+'"'+tipA('Say in one short sentence what this paragraph is for. The lens then checks whether those words appear in the paragraph’s first sentence or its last, which is where readers look for the point. The check runs when you leave the box.')+'>¶'+(p.ord+1)+' · The point of this paragraph, in your own words</label><input type="text" class="pointin" id="pt-'+p.ord+'" data-ord="'+p.ord+'" value="'+esc(v)+'" placeholder="One short sentence" autocomplete="off">'+(pt?'<span class="'+(pt.ok?'hit':'miss')+'"'+tipA(pt.ok?'At least half of your point’s content words are in that sentence.':'Fewer than half of your point’s content words are in the opening sentence, and fewer than half are in the last. See the note.')+'>'+(pt.ok?'✓ '+(pt.open>=0.5&&pt.close>=0.5?'carried by the opening and the close':pt.open>=0.5?'carried by the opening sentence':'carried by the closing sentence'):'Not at either edge yet')+'</span>':'')+'</div>';}
  h+=meanAdorn(p,l);
  if(l==='rhythm'&&p.ord!=null&&p.rhythm){const R=p.rhythm,s0=p.sents.map(i=>A.sents[i]),pk=p.pick!=null?s0[p.pick]:null,ct=R.n>=4?CONTRAST(R.npvi):null,r1=v=>String(Math.round(v*10)/10);
    h+='<div class="padorn"><span class="pn">¶'+(p.ord+1)+'</span><span>'+R.n+(R.n===1?' sentence':' sentences')+'</span><span'+tipA('Median length: half the sentences in this paragraph are shorter and half are longer.')+'>median '+r1(R.median)+' words</span><span'+tipA('The shortest and the longest sentence in this paragraph.')+'>range '+R.min+'–'+R.max+'</span>'+
      (ct?'<span class="ct-'+ct[0]+'"'+tipA(NPVITIP+' Here each sentence differs from the next by about '+Math.round(R.npvi)+'% on average. '+ct[1])+'>contrast '+Math.round(R.npvi)+' · '+ct[0]+'</span>':'')+'</div>';
    if(R.n>=3)h+='<div class="padorn"><label for="emph-'+p.ord+'"'+tipA('Pick the one sentence in this paragraph you most want the reader to remember. The lens then checks whether its length sets it apart: the shortest in the paragraph, or half the length of the one before it. Sentences that already stand apart carry a diamond (◆).')+'>Which sentence should the reader remember?</label><select class="emphsel" id="emph-'+p.ord+'" data-ord="'+p.ord+'"><option value="0">Choose…</option>'+s0.map((st,q)=>'<option value="'+(q+1)+'"'+(p.pick===q?' selected':'')+'>'+(st.i+1)+' · '+st.nW+' words · '+esc(st.text.length>38?st.text.slice(0,36).trimEnd()+'…':st.text)+'</option>').join('')+'</select>'+
      (pk?'<span class="'+(pk.emph?'hit':'miss')+'"'+tipA(pk.emph?EMPHTIP[pk.emph].replace(/^◆ /,''):'Its length does not set it apart from its neighbours yet. Open the sentence to see the note.')+'>'+(pk.emph?'✓ Its length sets it apart':'Not set apart yet · see the note on sentence '+(pk.i+1))+'</span>':'')+'</div>';}
  const ss=p.sents.map(i=>A.sents[i]),setl=!!(state.setP&&state.setP.has(pi)),here=!fs.some(f=>p.sents.includes(f.s)),was=state.had&&state.had.has(l+'|'+pi),at=state.setAt&&state.setAt[pi],el=at?performance.now()-at:1e9;h+='<p class="para'+(setl?' settled':'')+'">';
  if(l==='outline'&&ss.length>2&&!state.open.has(pi)){const selIn=ss.slice(1,-1).some(st=>state.sel&&st.s<state.sel.e&&st.e>state.sel.s);
    if(selIn)h+=ss.map(st=>sentHTML(st,fs,hue)).join('');
    else h+=sentHTML(ss[0],fs,hue)+'<button type="button" class="gapbtn" data-open="'+pi+'"'+tipA('Show the sentences hidden between the first and the last.')+'>'+(ss.length-2)+(ss.length===3?' sentence':' sentences')+' between</button>'+sentHTML(ss[ss.length-1],fs,hue);}
  else h+=ss.map(st=>sentHTML(st,fs,hue)).join('');
  if(p.ord!=null&&setl)h+='<span class="pdone all'+(el<900?' pop':'')+'"'+(el<900?' style="--fx:-'+Math.round(el)+'ms"':'')+tipA('Settled: this paragraph has no open notes in any lens. Each one was either resolved by rewriting or weighed and kept. Its marks are cleared so you can read it clean.')+'>✓ settled</span>';
  else if(p.ord!=null&&here&&was&&l!=='overview')h+='<span class="pdone"'+tipA('This paragraph had notes in this lens and now has none open. Other lenses may still have notes on it.')+'>✓ clear in this lens</span>';
  return h+'</p>';
}
function renderMs(){
  const A=state.A,ms=$('#ms'),wb=$('#wb');ms.hidden=noText(state.lens);if(ms.hidden)return;
  $('#sampleTag').hidden=!state.isSample;
  const fs=A.findings.filter(f=>inView(f)&&active(f)),hue=LBY[state.lens].hue;
  let blocks=[...ms.querySelectorAll(':scope > .pblock')];
  if(blocks.length!==A.paras.length){blocks.forEach(b=>b.remove());ms.appendChild(wb);blocks=A.paras.map((p,i)=>{const d=document.createElement('div');d.className='pblock';ms.insertBefore(d,wb);return d;});}
  A.paras.forEach((p,i)=>{blocks[i].innerHTML=pblockHTML(p,i,fs,hue);});
  if(state.sel){let pi=A.paras.findIndex(p=>p.s<=state.sel.s&&p.e>=state.sel.s);if(pi<0)pi=A.paras.findIndex(p=>p.s>state.sel.s)-1;if(pi<0)pi=A.paras.length-1;
    const t=blocks[pi];if(t&&wb.previousElementSibling!==t)ms.insertBefore(wb,t.nextSibling);}
}

/* ---------- notes ---------- */
const PBURL='https://www.phrasebank.manchester.ac.uk/';
const STARTERS=[['It continues the same point','This ___ '],['It is a result','As a result of this ___, '],['It is a contrast','In contrast to this ___, '],['It is an example','As an example of this ___, '],['It adds a new point','Beyond this ___, ']];
function helpHTML(f){let h='';if(f.dis)return h;
  if(f.ladder&&f.ladder.length)h+='<div class="aid"><span class="cap"'+tipA('Wording that the evidence you named does support. Tap one to swap it into your text, then fix the grammar around it.')+'>Wording your evidence supports</span><div class="chips">'+f.ladder.map((w,i)=>'<button type="button" class="chip" data-swap="'+f.id+':'+i+'">'+(w?esc(w):'delete it')+'</button>').join('')+'</div></div>';
  if(f.starters)h+='<div class="aid"><span class="cap"'+tipA('Choose how this sentence relates to the one before it. An opener goes into the rewrite box with a blank, which you fill with something the reader already knows.')+'>How does this sentence follow from the last?</span><div class="chips">'+STARTERS.map((s,i)=>'<button type="button" class="chip" data-start="'+f.id+':'+i+'"'+tipA('Starts the sentence with “'+s[1].trim()+'”.')+'>'+esc(s[0])+'</button>').join('')+'</div>'+(f.starters.length?'<p>'+(f.prevTerms?'Terms from the previous sentence':'Familiar terms in this sentence')+': '+f.starters.map(esc).join(', ')+'.</p>':'')+'</div>';
  if(f.nouns&&f.nouns.length)h+='<div class="aid"><span class="cap"'+tipA('Words from the previous sentence. Tap one to put it after the pointing word, or type your own noun in the rewrite box.')+'>Name the noun</span><div class="chips">'+f.nouns.map((w,i)=>'<button type="button" class="chip" data-noun="'+f.id+':'+i+'">… '+esc(w.toLowerCase())+'</button>').join('')+'</div></div>';
  if(f.splits&&f.splits.length)h+='<div class="aid"><span class="cap"'+tipA('Each choice ends the sentence at one of its joints and starts a new one there. The result is a rough draft. Read both parts and repair whatever the split broke.')+'>Split it at a joint</span><div class="chips">'+f.splits.map((x,i)=>'<button type="button" class="chip" data-split="'+f.id+':'+i+'"'+tipA('Ends the sentence after '+x.w1+' words. The next sentence '+(/\w/.test(x.text)?'starts with “'+x.text.replace(/^\.\s*/,'').trim()+'” and ':'')+'has about '+x.w2+' words.')+'>'+esc(x.label)+' <b>'+x.w1+' + '+x.w2+'</b></button>').join('')+'</div></div>';
  if(f.join!=null&&state.A.sents[f.join+1])h+='<div class="aid"><span class="cap"'+tipA('Choose how the second sentence relates to the first. The two are joined with a connector that says so. Then read the result and adjust it.')+'>Join sentences '+(f.join+1)+' and '+(f.join+2)+'. How does the second relate to the first?</span><div class="chips">'+JOINS.map((j,i)=>'<button type="button" class="chip" data-join="'+f.id+':'+i+'"'+tipA('Joins them with “'+j[1].trim()+'”.')+'>'+esc(j[0])+'</button>').join('')+'</div></div>';
  if(f.pb&&f.pb.length)h+='<p class="pb"'+tipA('The Academic Phrasebank, from the University of Manchester, lists common phrases by purpose. Opens in a new tab and needs a connection.')+'>Phrases for this, in the Academic Phrasebank: '+f.pb.map(k=>'<a href="'+PBURL+E.PB[k][1]+'/" target="_blank" rel="noopener">'+esc(E.PB[k][0])+'</a>').join(' · ')+'</p>';
  return h;}
function movesHTML(p){if(!p.job)return'';const list=E.MOVES[p.job]||[],m=state.moves[p.ord],v=m&&m.job===p.job?m.v:[];
  return '<div class="moves"><span class="cap"'+tipA('The moves a paragraph with this job usually makes, in their usual order. Say where each one happens. A move you mark as missing, or two in reverse order, becomes a note.')+'>Usual moves, in order</span>'+list.map((name,k)=>'<label><span>'+esc(name)+'</span><select class="movesel" id="mv-'+p.ord+'-'+k+'" data-ord="'+p.ord+'" data-mv="'+k+'" aria-label="Where: '+esc(name)+'"><option value="">Where is it?</option><option value="no"'+(v[k]==='no'?' selected':'')+'>Not in this paragraph</option>'+p.sents.map((si,q)=>'<option value="'+q+'"'+(v[k]===String(q)?' selected':'')+'>Sentence '+(si+1)+'</option>').join('')+'</select></label>').join('')+'</div>';}
function noteHTML(f,o){
  o=o||{};const l=LBY[f.lens],px=o.px||'n';
  const body='<p>'+esc(f.detail)+'</p>'+(f.tip?'<p class="tip"><b'+tipA('One way to revise. A suggestion, not a rule.')+'>Try</b>'+esc(f.tip)+'</p>':'')+
    (f.sketch?'<dl class="sk">'+f.sketch.map(([a,b])=>'<dt>'+esc(a)+'</dt><dd>'+esc(b)+'</dd>').join('')+'</dl>':'')+
    (f.fix&&!f.dis?'<button type="button" class="apply" data-fix="'+f.id+'"'+tipA('See which notes this change would clear, and any it would bring in, before you decide.')+'>'+(f.fix.lab?'Preview: '+esc(f.fix.lab):f.fix.text?'Preview: replace with “'+esc(f.fix.text)+'”':'Preview: delete the phrase')+'</button>':'')+helpHTML(f)+pvBox(f);
  let ev='';
  if(f.claim){ev='<label class="ev"'+tipA('Your answer is checked against a fixed table of the wording each kind of evidence supports.')+'>The evidence behind it<select id="'+px+'ev-'+f.id+'" data-claim="'+f.id+'"><option value="">Choose…</option>'+E.EVID[f.claim.cat].map(r=>'<option value="'+r[0]+'"'+(f.claim.val===r[0]?' selected':'')+'>'+esc(r[1])+'</option>').join('')+'</select></label>';}
  return '<li class="note hb-'+(f.lens===state.lens?l.hue:'ink')+(f.key===state.hot?' hot':'')+(f.dis||f.ok?' settled':'')+'"><button type="button" class="nh" data-go="'+f.id+'"'+tipA('Open this sentence in the workbench.')+'><span class="ns">Sentence '+(f.s+1)+'</span><span>'+esc(l.n)+'</span></button>'+
    '<h3>'+esc(f.title)+'</h3>'+(f.q?'<p class="q"'+tipA('Answer this for yourself before you read the advice.')+'>'+esc(f.q)+'</p>':'')+(o.ask?'<details class="more"'+(state.pv&&state.pv.fid===f.id?' open':'')+'><summary>Show the note</summary>'+body+'</details>':body)+ev+
    (f.dis?'<p>You checked this: '+esc(f.dis.toLowerCase())+'. <button type="button" class="link" data-undis="'+f.id+'">Reopen</button></p>':
      f.ok?'':'<select class="dismiss" id="'+px+'dis-'+f.id+'" data-dis="'+f.id+'" aria-label="Mark this note as checked"'+tipA('Use this when you have weighed the note and decided the sentence should stay as it is. The note moves to Settled and stops counting.')+'><option value="">I checked this…</option>'+REASONS.map(r=>'<option>'+r+'</option>').join('')+'</select>')+'</li>';
}
function renderNotes(){
  const fs=state.A.findings.filter(inView),open=fs.filter(active),done=fs.filter(f=>!active(f));
  $('#notesTitle').textContent='Notes · '+LBY[state.lens].n+' ('+open.length+')';
  $('#noteList').innerHTML=noText(state.lens)?'':open.length?open.map(f=>noteHTML(f)).join(''):'<li><p class="empty">'+(state.lens==='overview'?'No open notes. Either the draft reads cleanly or it is too short to judge.':'Nothing open in this lens. The marks in the text still show the structure it reads.')+'</p></li>';
  $('#settled').hidden=!done.length||noText(state.lens);$('#settledSum').textContent='Settled ('+done.length+')';$('#settledList').innerHTML=done.map(f=>noteHTML(f,{px:'s'})).join('');
}

/* ---------- workbench ---------- */
function autosize(){const t=$('#wbText');t.style.height='auto';t.style.height=(t.scrollHeight+2)+'px';}
function syncWbText(){if(!state.sel)return;$('#wbText').value=state.raw.slice(state.sel.s,state.sel.e);autosize();renderBack();}
/* ---------- marks inside the rewrite box ---------- */
function wbMarks(){const A=state.A,sel=state.sel,out=[];if(!sel)return out;
  spanSents().forEach(st=>{const o=st.s-sel.s,by={};A.findings.forEach(f=>{if(f.s===st.i&&active(f)&&!f.para)(by[f.lens]=by[f.lens]||[]).push(f);});
    const ks=new Set(Object.keys(by));ks.add('sv');
    ks.forEach(k=>{const L=LBY[k],lf=by[k]||[],full=k==='sv'||k===state.lens||lf.some(f=>f.a==null),done=new Set(),dot=t=>t+(/[.?!]$/.test(t)?'':'.');
      const push=(a,b,cls,tip,sig)=>{if(b>a)out.push({a:a+o,b:b+o,cls,lens:k,tip:L.n+': '+tip,sig:sig||null});};
      if(full)(st.marks[k]||[]).forEach(m=>{let tip=m.tip||markTip(k,m.cls),sg=null;
        if(m.f!=null){const f=A.byId[m.f];if(!f||!active(f))return;done.add(f.id);tip=dot(f.title);sg=nsig(f);}
        else if(k==='sv'){if(/\bhl2?\b/.test(m.cls))return;tip=st.head>=0&&m.a===st.T[st.head].s?'the subject, “'+st.T[st.head].t+'”. Once readers have it, they wait for its verb.':'the main verb. It says what the subject does.';}
        if(tip)push(m.a,m.b,m.cls.split(' ').filter(c=>c!=='st').join(' '),tip,sg);});
      lf.forEach(f=>{if(f.a!=null&&!done.has(f.id))push(f.a,f.b,'hl hb-'+L.hue,dot(f.title),nsig(f));});});});
  return out;}
function backHTML(text,marks){if(!marks.length)return esc(text);const n=text.length,cl=v=>Math.max(0,Math.min(n,v)),cuts=new Set([0,n]);marks.forEach(m=>{cuts.add(cl(m.a));cuts.add(cl(m.b));});
  const pts=[...cuts].sort((x,y)=>x-y);let h='';
  for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1],seg=text.slice(a,b),ms=marks.filter(m=>m.a<=a&&m.b>=b);
    if(!ms.length){h+=esc(seg);continue;}
    ms.sort((x,y)=>(x.b-x.a)-(y.b-y.a));const bg=ms.find(m=>/\b(hl|hl2|fl)\b/.test(m.cls))||ms.find(m=>/\bgone\b/.test(m.cls)),ln=ms.find(m=>/\b(ul|dot|wav)\b/.test(m.cls)),cls=new Set();
    if(bg)bg.cls.split(' ').forEach(c=>{if(/^(hl|hl2|fl|gone|hb-)/.test(c))cls.add(c);});if(ln)ln.cls.split(' ').forEach(c=>{if(/^(ul|dot|wav|hu-)/.test(c))cls.add(c);});
    h+='<span class="mk '+[...cls].join(' ')+'"'+(cls.has('gone')&&state.fx?' style="--fx:-'+Math.round(performance.now()-state.fx.at)+'ms"':'')+tipA([...new Set(ms.map(m=>m.tip))].join(' · '))+'>'+esc(seg)+'</span>';}
  return h;}
function renderBack(){const t=$('#wbText'),bk=$('#wbBack'),kz=$('#wbKeys');if(!state.sel||!bk)return;
  const all=t.value===state.raw.slice(state.sel.s,state.sel.e)?wbMarks():[],ks=[...new Set(all.map(m=>m.lens))];
  if(state.wbOnly&&!ks.includes(state.wbOnly))state.wbOnly=null;
  const ms=state.wbM=state.wbOnly?all.filter(m=>m.lens===state.wbOnly):all;state.wbAll=all;state.wbAllText=t.value;
  let gh=[];if(state.fx&&performance.now()-state.fx.at<1500&&state.fx.ghosts.length){if(state.fx.text!==t.value){state.fx.ghosts=remap(state.fx.ghosts,state.fx.text,t.value);state.fx.text=t.value;}gh=state.fx.ghosts;}
  const acc=state.wbOnly||state.lens,quiet=m=>m.lens===acc?m:Object.assign({},m,{cls:m.cls.replace(/\bh([bu])-\w+/g,'h$1-ink')});
  bk.innerHTML=backHTML(t.value,ms.map(quiet).concat(gh));
  kz.innerHTML=ks.length?'<span class="cap"'+tipA('Each colour in the rewrite box belongs to one lens. Tap a name to show only that lens’s marks, and tap it again to show them all.')+'>Marked in the box</span>'+ks.map(k=>'<button type="button" class="wk hb-'+(k===acc?LBY[k].hue:'ink')+'" id="wk-'+k+'" data-wk="'+k+'" aria-pressed="'+(state.wbOnly===k)+'"'+tipA((k==='sv'?'The subject and the main verb are always underlined. ':'')+'Show only the words marked by the “'+LBY[k].n+'” lens. Tap again to show every mark.')+'><i></i>'+esc(LBY[k].n)+'</button>').join(''):'';
  wbHint();wbMeter();}
function wbHint(){const hEl=$('#wbHint'),t=$('#wbText'),ms=state.wbM||[];if(!hEl)return;let at=[];
  if(document.activeElement===t){const a=t.selectionStart,b=t.selectionEnd;at=ms.filter(m=>a===b?m.a<=a&&a<=m.b:m.a<b&&m.b>a);}
  const seen=new Set();at=at.slice().sort((x,y)=>(x.b-x.a)-(y.b-y.a)).filter(m=>!seen.has(m.tip)&&seen.add(m.tip));
  hEl.innerHTML=at.length?at.map(m=>'<span class="hb-'+(m.lens===(state.wbOnly||state.lens)?LBY[m.lens].hue:'ink')+'"><i></i><span>'+esc(m.tip)+'</span></span>').join(''):ms.length?'Coloured and underlined words are what the open notes point at. Put the cursor on one, or point at it, to see what it is.':'No words are marked. The subject and verb were not found, and no open note points at particular words.';}
function wasInfo(){
  const sel=state.sel;if(!sel||state.base===state.raw)return null;baseline();
  const d=docDiff();let lo=Infinity,hi=-1,any=false;
  d.ops.forEach(op=>{if(op.k==='eq'){for(let j=op.b0;j<op.b1;j++){const t=d.B[j];if(t.s<sel.e&&t.e>sel.s){any=true;const a=op.a0+j-op.b0;lo=Math.min(lo,a);hi=Math.max(hi,a);}}}});
  d.ops.forEach((op,qi)=>{if(op.k!=='del')return;const pos=op.b0<d.B.length?d.B[op.b0].s:state.raw.length,nx=d.ops[qi+1];let hit=any?(pos>sel.s&&pos<sel.e):(pos>=sel.s&&pos<=sel.e);
    if(!hit&&!any&&nx&&nx.k==='ins'&&nx.b0===op.b0&&d.B[nx.b0].s<sel.e&&d.B[nx.b1-1].e>sel.s)hit=true;
    if(hit){lo=Math.min(lo,op.a0);hi=Math.max(hi,op.a1-1);}});
  if(hi<0)return{text:'',fresh:true};
  const bs=state.A0.sents.filter(s=>s.s<d.A[hi].e&&s.e>d.A[lo].s);
  return{text:bs.length?state.base.slice(bs[0].s,bs[bs.length-1].e):state.base.slice(d.A[lo].s,d.A[hi].e)};
}
function chunk(st){
  const T=st.T,text=st.text;let last=st.N-1,end='.';
  while(last>=0&&!T[last].w&&/^[.!?]$/.test(T[last].t)){end=T[last].t;last--;}
  const segs=[];
  if(st.head>=0&&st.v>=0){const sa=Math.max(st.stress?st.stress[0]:last+1,st.ve+1);
    segs.push(['opening',0,st.m-1],['subject',st.m,st.head],['interruption',st.head+1,st.v-1],['verb',st.v,st.ve],['middle',st.ve+1,Math.min(sa-1,last)],['close',sa,last]);}
  else{const sa=st.stress?st.stress[0]:0;segs.push(['opening',0,sa-1],['close',sa,last]);}
  const first=st.words.length?st.words[0]:-1,out=[];
  segs.forEach(([role,a,b])=>{if(a>b)return;const pieces=[];let x=a,dp=0;
    for(let i=a;i<=b;i++){const t=T[i].t;if(t==='('||t==='[')dp++;else if(t===')'||t===']')dp=Math.max(0,dp-1);else if(!dp&&(t===','||t===';')&&(role==='opening'||role==='interruption'||role==='middle')){pieces.push([x,i-1]);x=i+1;}}
    pieces.push([x,b]);
    pieces.forEach(([p,q])=>{while(p<=q&&/^[,;]$/.test(T[p].t))p++;while(q>=p&&/^[,;]$/.test(T[q].t))q--;if(p>q)return;let w=false;for(let i=p;i<=q;i++)if(T[i].w)w=true;if(!w)return;
      const cB=p>0&&T[p-1].t===',',cA=q<last&&T[q+1].t===',';
      out.push({id:'tile'+(state.tid++),role,text:text.slice(T[p].s,T[q].e),init:first>=p&&first<=q,off:(cB&&cA)||(role==='opening'&&cA)||(q===last&&cB),cB,cA});});});
  return{tiles:out,end};
}
function buildTiles(){const ss=spanSents(),t=[];let end='.';ss.forEach((st,i)=>{const c=chunk(st);if(i)t.push({id:'tile'+(state.tid++),brk:true});t.push(...c.tiles);end=c.end;});state.tiles=t;state.tend=end;state.tsrc=state.sel?state.raw.slice(state.sel.s,state.sel.e):'';state.picked=-1;}
function decap(s){const w=(s.match(/^\S+/)||[''])[0];if(!/^[A-Z][a-z]/.test(w))return s;const lo=w.toLowerCase();
  if(E.isFunc(lo)||new RegExp('(^|[^A-Za-z])'+lo.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'([^A-Za-z]|$)').test(state.raw))return s.charAt(0).toLowerCase()+s.slice(1);return s;}
function compose(){let out='',start=true,prev=null;
  state.tiles.forEach(t=>{if(t.brk){if(out&&!/[.!?]$/.test(out))out+='.';start=true;prev=null;return;}
    let s=t.text;if(start){out+=(out?' ':'')+s.charAt(0).toUpperCase()+s.slice(1);start=false;}
    else{if(t.init)s=decap(s);out+=((prev&&prev.off)||t.off?', ':' ')+s;}
    prev=t;});
  if(out&&!/[.!?]$/.test(out))out+=state.tend;return out;}
function commitEdit(val,keepTiles){const s=state.sel;if(!s)return;state.typing=!keepTiles;pushUndo();val=val.replace(/\s*\n+\s*/g,' ');
  state.raw=state.raw.slice(0,s.s)+val+state.raw.slice(s.e);s.e=s.s+val.length;state.isSample=false;
  if(!keepTiles){state.tiles=null;state.picked=-1;}
  state.pick={news:new Set(),who:new Set()};state.markOut='';save();run();}
function applyTiles(){const txt=compose();$('#wbText').value=txt;commitEdit(txt,true);autosize();}
function pushUndo(){if(state.scrubbing)return;const U=state.undo||(state.undo=[]),t=Date.now();if(state.typing&&U.length&&state.undoTyped&&t-(state.undoAt||0)<900){state.undoAt=t;return;}U.push(state.raw);if(U.length>60)U.shift();state.redo=[];state.undoTyped=!!state.typing;state.undoAt=t;}
function restore(from,to){if(!from||!from.length)return;const s0=state.sel?state.sel.s:null;to.push(state.raw);state.raw=from.pop();state.sel=null;state.tiles=null;state.guide=null;save();run();
  if(s0!=null){const st=state.A.sents.find(x=>x.s<=s0&&x.e>s0)||state.A.sents.find(x=>x.s>=s0);if(st){openWb(st.i,{});syncWbText();}}}
function replaceRaw(s,e,text){pushUndo();const d=text.length-(e-s),sel=state.sel;state.raw=state.raw.slice(0,s)+text+state.raw.slice(e);
  if(sel){if(e<=sel.s){sel.s+=d;sel.e+=d;}else if(s>=sel.s&&e<=sel.e)sel.e+=d;else if(s<sel.e&&e>sel.s){sel.s=Math.min(sel.s,s);sel.e=Math.max(sel.e,e)+d;}}
  state.isSample=false;state.tiles=null;state.vcache=null;save();}
function selText(st,idx){const a=[...idx].sort((x,y)=>x-y);if(!a.length)return'';const T=st.T;let wc=0;for(let i=a[0];i<=a[a.length-1];i++)if(T[i].w)wc++;
  return wc<=a.length+1?st.text.slice(T[a[0]].s,T[a[a.length-1]].e):a.map(i=>T[i].t).join(' … ');}
function checkMarks(st){
  const news=state.pick.news,who=state.pick.who,T=st.T;let h='';
  if(!news.size&&!who.size){state.markOut='<div class="verdict hb-ink"><p>Tap at least one word under either question first.</p></div>';return;}
  if(news.size&&st.stress){const[sa,sb]=st.stress,a=[...news],inS=a.filter(i=>i>=sa&&i<=sb).length,nt=selText(st,news),stx=st.text.slice(T[sa].s,T[sb].e),lo=Math.min(...a),hi=Math.max(...a);
    h+='<div class="verdict hb-rose">'+(inS/a.length>=0.6?'<p><b>News.</b> “'+esc(nt)+'” sits in the stress position. Readers will give it the weight you intend.</p>':
      '<p><b>News.</b> “'+esc(nt)+'” sits at '+(lo===hi?'word '+(st.wpos[lo]+1):'words '+(st.wpos[lo]+1)+' to '+(st.wpos[hi]+1))+' of '+st.nW+'. The sentence closes on “'+esc(stx)+'”, so that is what readers will weight.</p><p>Move your news to the end of the sentence, or cut what follows it. The Rearrange tab lets you try the move.</p>')+'</div>';}
  if(who.size&&st.topic){const[ta,tb]=st.topic,a=[...who],inT=a.some(i=>i>=ta&&i<=tb),wt=selText(st,who),ttx=st.text.slice(T[ta].s,T[tb].e),hd=st.head>=0?T[st.head].t:'';
    const fresh=st.i>0&&st.cw.filter(c=>who.has(c.i)).length&&st.cw.filter(c=>who.has(c.i)).every(c=>!c.old);
    h+='<div class="verdict hb-blue">'+(inT?'<p><b>Whose story.</b> “'+esc(wt)+'” is in the opening, where readers look to learn whose story this is.'+(hd&&!who.has(st.head)?' The grammatical subject is “'+esc(hd)+'”. If that is a different thing, consider making “'+esc(wt)+'” the subject itself.':'')+'</p>':
      '<p><b>Whose story.</b> You say this sentence is about “'+esc(wt)+'”, but it opens with “'+esc(ttx)+'”.'+(hd?' Readers will take it as the story of “'+esc(hd)+'”.':'')+'</p><p>Make “'+esc(wt)+'” the subject, or bring it into the opening words.</p>')+
      (fresh?'<p>“'+esc(wt)+'” has not appeared earlier in the draft, so an opening built on it cannot link backward. Is there a familiar term that could lead into it?</p>':'')+'</div>';}
  const ms=[];if(st.topic)ms.push({a:T[st.topic[0]].s,b:T[st.topic[1]].e,cls:'hl hb-blue'});if(st.stress)ms.push({a:T[st.stress[0]].s,b:T[st.stress[1]].e,cls:'hl hb-rose'});
  news.forEach(i=>ms.push({a:T[i].s,b:T[i].e,cls:'ul hu-rose'}));who.forEach(i=>ms.push({a:T[i].s,b:T[i].e,cls:'ul hu-blue'}));
  h+='<div class="verdict hb-ink"><p>What the structure says: the <span class="mk hl hb-blue">topic position</span> and the <span class="mk hl hb-rose">stress position</span>, with your picks underlined.</p><p class="reveal">'+renderMarks(st.text,ms,true)+'</p></div>';
  state.markOut=h;
}
function guideQueue(){if(state.pass){const seen=new Set();return state.A.findings.filter(f=>active(f)&&!f.para&&state.pass.ids.includes(f.s)&&!seen.has(f.s)&&seen.add(f.s)).map(f=>({f,o:[0,state.A.sents[f.s].s,-1]})).sort((x,y)=>x.o[1]-y.o[1]);}
  return state.A.findings.filter(f=>inView(f)&&active(f)).map(f=>({f,o:[LIDX[f.lens],state.A.sents[f.s].s,f.a==null?-1:f.a]})).sort((x,y)=>x.o[0]-y.o[0]||x.o[1]-y.o[1]||x.o[2]-y.o[2]);}
const cmpO=(a,b)=>a[0]-b[0]||a[1]-b[1]||a[2]-b[2];
function guideGo(dir){const q=guideQueue(),g=state.guide;if(!g)return;let nx=null;
  if(dir>0)nx=q.find(x=>cmpO(x.o,g.cur)>0);else{for(const x of q)if(cmpO(x.o,g.cur)<0)nx=x;}
  if(!nx){if(dir>0){g.done=true;renderDynamic();}return;}
  g.cur=nx.o;g.done=false;openWb(nx.f.s,{hot:state.pass?null:nx.f.key,scroll:true});}
function renderWb(){
  const wb=$('#wb');if(!state.sel||noText(state.lens)){wb.hidden=true;return;}wb.hidden=false;
  const A=state.A,ss=spanSents(),st=ss[0];
  $('#wbTitle').textContent=!ss.length?'Sentence removed':ss.length>1?'Sentences '+(st.i+1)+' to '+(ss[ss.length-1].i+1):'Sentence '+(st.i+1);
  $('#wbWords').textContent=ss.reduce((a,s)=>a+s.nW,0)+' words';
  /* anatomy */
  let segs=[],key='';
  if(st){const pre=st.pre,wc=(a,b)=>a>b||a<0?0:pre[b]-(a>0?pre[a-1]:0);
    if(st.head>=0&&st.v>=0){const sa=Math.max(st.stress?st.stress[0]:st.N,st.ve+1);
      segs=[['a-intro',wc(0,st.m-1)],['a-subj',wc(st.m,st.head)],['a-gap',wc(st.head+1,st.v-1)],['a-verb',wc(st.v,st.ve)],['a-rest',wc(st.ve+1,sa-1)],['a-stress',wc(sa,st.N-1)]];
      key='<span class="kb"'+tipA('Topic position: the opening words, up to the subject, or up to the verb when it follows directly.')+'><b>topic</b> '+wc(st.topic[0],st.topic[1])+'w</span><span class="ka"'+tipA('The subject and verb of the main clause, and how many words separate them. Zero is ideal.')+'><b>subject</b> “'+esc(st.T[st.head].t)+'” <b>→ verb</b> “'+esc(st.text.slice(st.T[st.v].s,st.T[st.ve].e))+'”: '+st.gap+'w apart</span>'+(st.stress?'<span class="kr"'+tipA('Stress position: the closing words, which readers weight most.')+'><b>stress</b> '+wc(st.stress[0],st.stress[1])+'w</span>':'');}
    else{const sa=st.stress?st.stress[0]:st.N;segs=[['a-intro',st.topic?wc(st.topic[0],st.topic[1]):0],['a-rest',wc(st.topic?st.topic[1]+1:0,sa-1)],['a-stress',wc(sa,st.N-1)]];key='<span>No main verb found, so only the opening and the close are drawn.</span>';}}
  const wds=n=>n+(n===1?' word':' words'),AT={'a-intro':n=>'Opening: '+wds(n)+(st&&st.v>=0?' before the subject':'')+'. The blue edge on top marks the topic position, where readers look for whose story this is.',
    'a-subj':n=>'Subject'+(st&&st.head>=0?' (“'+st.T[st.head].t+'”)':'')+': '+wds(n)+'. The blue edge on top marks the topic position.',
    'a-gap':n=>'Hatched: '+wds(n)+' between the subject and its verb. Readers treat them as an interruption, so fewer is better.',
    'a-verb':n=>'Main verb'+(st&&st.v>=0?' (“'+st.text.slice(st.T[st.v].s,st.T[st.ve].e)+'”)':'')+'. Readers wait for it once they have the subject.',
    'a-rest':n=>'The middle: '+wds(n)+' between the '+(st&&st.v>=0?'verb':'opening')+' and the close.',
    'a-stress':n=>'Stress position: the last '+wds(n)+'. Readers give these the most weight, so your news belongs here.'};
  $('#wbAnat').innerHTML=segs.filter(s=>s[1]>0).map(s=>'<i class="'+s[0]+'" tabindex="0" style="flex:'+s[1]+' 1 0"'+tipA(AT[s[0]](s[1]))+'></i>').join('');$('#wbKey').innerHTML=key;
  /* traffic light for this sentence */
  {const ids=new Set(ss.map(s=>s.i)),cur=new Map(A.findings.filter(f=>ids.has(f.s)&&active(f)&&!f.para).map(f=>[f.sig,f.title]));
    if(state.wbKey!==state.sel.s||!state.wbStart){state.wbKey=state.sel.s;state.wbStart=cur;state.wbPrev=cur;state.wbDelta=null;state.wbLight='';}
    else{const gone=[...state.wbPrev.keys()].filter(k=>!cur.has(k)),came=[...cur.keys()].filter(k=>!state.wbPrev.has(k));
      if(gone.length||came.length)state.wbDelta={gone:gone.map(k=>state.wbPrev.get(k)),came:came.map(k=>cur.get(k))};state.wbPrev=cur;}
    const openL=A.findings.filter(f=>ids.has(f.s)&&active(f)&&!f.para),n=openL.length,inL=openL.filter(inView).length,done=[...state.wbStart.keys()].filter(k=>!cur.has(k)).length,light=n===0?(state.keptNow===false?'⚪':'🟢'):n<=2?'🟠':'🔴',pop=state.wbLight&&state.wbLight!==light,d=state.wbDelta;state.wbLight=light;
    $('#wbStatus').innerHTML='<span'+tipA((n?'Open on this sentence: '+openL.map(f=>f.title+' ('+LBY[f.lens].n+')').join(' · ')+'. ':'No open notes on this sentence. ')+'The light counts every lens: green for none, orange for one or two, red for three or more. It turns white when the notes went only because the sentence was cut. Notes about the whole paragraph are not counted.')+'>'+lightH(light,pop)+''+
      (n===0?(state.keptNow===false?'No notes are left here, because most of the sentence was cut.':state.wbStart.size?'Clear. All '+state.wbStart.size+(state.wbStart.size===1?' note':' notes')+' on this sentence are resolved.':'No open notes on this sentence.'):n+(n===1?' open note':' open notes')+' on this sentence'+(state.lens!=='overview'&&n!==inL?' ('+inL+' in this lens, '+(n-inL)+' in other lenses)':'')+(done?' · '+done+' resolved since you opened it':''))+'</span>'+
      (d&&d.gone.length?(state.keptNow===false?'<span class="delta more"'+tipA('These notes disappeared because most of the sentence’s content words were cut. Cutting is not counted as resolving. A rewrite counts when it keeps at least four in ten of the content words the sentence started with.')+'>Gone with the words you cut, and not counted as resolved: '+esc(d.gone.join(' · '))+'</span>':'<span class="delta">✓ Resolved: '+esc(d.gone.join(' · '))+'</span>'):'')+(d&&d.came.length?'<span class="delta more">New: '+esc(d.came.join(' · '))+'</span>':'')+(state.aside?'<span class="delta aside">'+state.aside+'</span>':'');
    {const H=state.hist&&state.hist[vKey()]||[],sc=$('#wbScrub');sc.hidden=H.length<2;if(!sc.hidden){const r=$('#histRange');r.max=H.length-1;if(!state.scrubbing){const ix=H.lastIndexOf(state.raw.slice(state.sel.s,state.sel.e));r.value=ix<0?H.length-1:ix;}$('#histPos').textContent='edit '+((+r.value)+1)+' of '+H.length;}}}
  renderBack();
  /* first draft */
  const w=wasInfo(),cur=state.raw.slice(state.sel.s,state.sel.e).trim(),wz=$('#wbWas');
  if(w&&(w.fresh?cur:w.text.trim()!==cur)){state.wasText=w.text;wz.hidden=false;
    wz.innerHTML=w.fresh?'<span class="cap">New since your starting text</span>':'<span class="cap"><span'+tipA('Compared with the text you started from: struck-through red was removed, green was added.')+'>Your starting text, with your changes</span><button type="button" class="link" id="wasRestore">Restore the starting wording</button></span><div>'+diffHTML(w.text,cur)+'</div>';}
  else wz.hidden=true;
  /* guide */
  const g=state.guide,gb=$('#wbGuide');gb.hidden=!g;
  if(g){const q=guideQueue(),ix=q.findIndex(x=>cmpO(x.o,g.cur)>=0);state.gTxt=state.pass?(g.done?'You have been through every sentence in this pass. End it to see what changed.':'sentence '+((ix<0?q.length:ix)+1)+' of '+Math.max(q.length,(ix<0?q.length:ix)+1)):g.done?'Guided pass complete · '+q.length+' still open':'Guided pass · note '+((ix<0?q.length:ix)+1)+' of '+Math.max(q.length,(ix<0?q.length:ix)+1);$('#gPos').textContent=passLab()+state.gTxt;$('#gNext').hidden=!!g.done;}
  /* tabs */
  ['notes','move','mark','read','vers'].forEach(t=>{$('#tab-'+t).setAttribute('aria-selected',String(state.tab===t));});rdStop();
  const pN=$('#pNotes'),pM=$('#pMove'),pK=$('#pMark');pN.hidden=state.tab!=='notes';pM.hidden=state.tab!=='move';pK.hidden=state.tab!=='mark';$('#pRead').hidden=state.tab!=='read';$('#pVers').hidden=state.tab!=='vers';
  if(state.tab==='notes'){const ids=new Set(ss.map(s=>s.i)),all=A.findings.filter(f=>ids.has(f.s)),fs=all.filter(f=>inView(f)&&active(f));let h='';
    if(g&&!state.pass){const cf=fs.filter(f=>f.key===state.hot);h=cf.length?'<ol class="notelist">'+cf.map(f=>noteHTML(f,{px:'w',ask:true})).join('')+'</ol>':'<p class="empty">'+(g.done?'You have been through every open note in this pass.':'That note is resolved. Choose Next.')+'</p>';}
    else{const sent=all.filter(f=>active(f)&&!f.para),mine=sent.filter(inView),rest=sent.filter(f=>!inView(f)),par=all.filter(f=>active(f)&&f.para),list=a=>'<ol class="notelist">'+a.map(f=>noteHTML(f,{px:'w'})).join('')+'</ol>';
      const C=sent.length>2?causeOf(sent):null,ld=C?C.lead:null,m2=mine.filter(f=>f!==ld),r2=rest.filter(f=>f!==ld);
      const grouped=()=>state.lens==='overview'?list(m2):'<span class="cap grp">In this lens ('+m2.length+')</span>'+(m2.length?list(m2):'<p class="empty">None'+(ld&&inView(ld)?' other':'')+' in this lens.</p>')+(r2.length?'<span class="cap grp">In other lenses ('+r2.length+')</span>'+list(r2):'');
      if(!sent.length)h='<p class="empty">No open notes on this sentence.</p>';
      else if(C)h='<span class="cap grp"'+tipA('When a sentence has several notes, the one shown first is the one whose fix most often clears others. The rest are folded away below it.')+'>Start with this one</span>'+(C.text?'<p class="cause">'+C.text+'</p>':'')+list([ld])+'<details class="morenotes" id="moreN"'+(state.moreOpen===state.sel.s||(state.hot&&sent.some(f=>f.key===state.hot&&f!==ld))?' open':'')+'><summary>'+(sent.length-1)+' more notes on this sentence</summary>'+grouped()+'</details>';
      else h=grouped();
      if(par.length)h+='<span class="cap grp"'+tipA('These notes are about the whole paragraph. They are attached to this sentence, but the traffic light does not count them, because editing one sentence cannot settle them.')+'>About the paragraph ('+par.length+')</span>'+list(par);}
    pN.innerHTML=h;}
  else if(state.tab==='move'){if(!ss.length){pM.innerHTML='<p class="empty">Nothing to rearrange.</p>';}else{if(!state.tiles)buildTiles();const pk=state.picked;
    pM.innerHTML='<p class="hint">Drag a piece to where it should go. You can also tap a piece and then tap the piece it should go in front of. The box above shows the result as a rough draft, so fix its commas and small words by hand.</p><div class="tiles">'+
      state.tiles.map((x,i)=>x.brk?'<button type="button" class="tile brk'+(i===pk?' on':'')+'" id="'+x.id+'" data-tile="'+i+'">full stop</button>':'<button type="button" class="tile r-'+x.role+(i===pk?' on':'')+'" id="'+x.id+'" data-tile="'+i+'"'+tipA(TILETIP[x.role])+'><small>'+x.role+'</small>'+esc(x.text)+'</button>').join('')+
      (pk>=0?'<button type="button" class="tile slot" data-tile="end">move to end</button>':'')+'</div>'+
      '<div class="tilebar"><button type="button" class="btn sm" id="tStop">Add a full stop</button>'+(pk>=0&&state.tiles[pk].brk?'<button type="button" class="btn sm" id="tDel">Remove this full stop</button>':'')+'<button type="button" class="btn sm" id="tReset">Start again</button></div>';}}
  else if(state.tab==='mark'){if(!st){pK.innerHTML='<p class="empty">Nothing to mark.</p>';}else{const row=(q,hue)=>{let h='',c=0;st.T.forEach((t,i)=>{h+=esc(st.text.slice(c,t.s));c=t.e;h+=t.w?'<button type="button" class="tk hb-'+hue+(state.pick[q].has(i)?' on':'')+'" data-q="'+q+'" data-w="'+i+'">'+esc(t.t)+'</button>':esc(t.t);});return '<p class="toks">'+h+'</p>';};
    pK.innerHTML='<p class="hint">Answer from what you mean, without looking at the marks. Then check your answers against the structure.</p>'+
      '<p class="askq">1. Tap the words that carry this sentence’s news: what you most want the reader to remember.</p>'+row('news','rose')+
      '<p class="askq">2. Whose story is this sentence? Tap the person or thing it is about.</p>'+row('who','blue')+
      '<div class="tilebar"><button type="button" class="btn sm primary" id="markCheck">Check against the structure</button></div>'+state.markOut;}}
  else if(state.tab==='read')renderRead(ss);
  else if(state.tab==='vers')renderVers(ss);
}
/* ---------- reader's-eye replay ---------- */
let rdT=0;function rdStop(){clearTimeout(rdT);rdT=0;}
function rdWords(sents){const out=[];sents.forEach(st=>{const T=st.T,W=st.words,pv=st.preV;W.forEach((ti,w)=>{const end=w+1<W.length?T[W[w+1]].s:st.text.length;
  out.push({t:st.text.slice(w?T[ti].s:0,end)+(w+1<W.length?'':' '),held:pv!=null&&w<pv?w+1:0,verb:pv!=null&&w===pv,stress:!!st.stress&&ti>=st.stress[0]&&ti<=st.stress[1],last:w===W.length-1,nov:pv==null});});});return out;}
function rdBlock(id,label,ws){const peak=ws.reduce((a,w)=>Math.max(a,w.held),0),sc=Math.max(12,peak),wd=w=>w.t.trim().replace(/[.,;:!?)\]”"]+$/,'');
  return '<div class="rd" id="rd-'+id+'" data-peak="'+peak+'"><span class="cap">'+label+' · '+(peak?'up to '+peak+(peak===1?' word':' words')+' held before the verb':'the verb comes at once')+'</span>'+
    '<p class="rdtext">'+ws.map(w=>'<span class="rw'+(w.verb?' v':'')+(w.stress?' s':'')+'">'+esc(w.t)+'</span>').join('')+'</p>'+
    '<div class="rdprof">'+ws.map((w,i)=>'<i class="'+(w.verb?'v':w.held>=12?'h3':w.held>=8?'h2':'')+'" style="--h:'+(w.verb?100:Math.max(6,w.held/sc*100)).toFixed(0)+'%"'+tipA(w.verb?'The main verb, “'+wd(w)+'”, arrives. What the reader has been holding can now be put together.':w.held?'“'+wd(w)+'”: the reader is holding '+w.held+(w.held===1?' word':' words')+' and still waiting for the main verb.':w.nov?'“'+wd(w)+'”: no main verb was found in this sentence.':'“'+wd(w)+'”: the verb has arrived, so nothing is being held for it.')+'></i>').join('')+'</div>'+
    '<div class="rdmeter"><i></i><span>Each bar above is one word. Its height is how many words the reader is holding while waiting for the main verb.</span></div></div>';}
function renderRead(ss){rdStop();const pR=$('#pRead');if(!ss.length){pR.innerHTML='<p class="empty">Nothing to replay.</p>';return;}
  const now=rdWords(ss),w=wasInfo(),cur=state.raw.slice(state.sel.s,state.sel.e).trim(),pk=a=>a.reduce((x,y)=>Math.max(x,y.held),0);let was=null;
  if(w&&!w.fresh&&w.text.trim()&&w.text.trim()!==cur)was=rdWords(E.analyze(w.text).sents);
  pR.innerHTML='<p class="hint">Watch the sentence arrive the way a reader meets it, one word at a time. Until the main verb comes, the reader has to hold every word so far without knowing what it is for. The meter counts those words. It is a plain count, and no model of any particular reader.</p>'+
    rdBlock('now',was?'Now':'This sentence',now)+(was?rdBlock('was','Your starting text',was):'')+
    (was?'<p class="hint">Most words held before the verb: '+pk(was)+' in your starting text, '+pk(now)+' now.</p>':'')+
    '<div class="tilebar"><button type="button" class="btn sm primary" id="rdNow" data-rd="now"'+tipA('Plays at about four words a second, with a pause when the verb arrives.')+'>▶ Play'+(was?' the current wording':'')+'</button>'+(was?'<button type="button" class="btn sm" id="rdWas" data-rd="was">▶ Play your starting text</button>':'')+'</div>';
  document.getElementById('rd-now')._ws=now;if(was)document.getElementById('rd-was')._ws=was;}
function rdPlay(id){rdStop();const box=document.getElementById('rd-'+id);if(!box||!box._ws)return;const ws=box._ws,rw=[...box.querySelectorAll('.rw')],bars=[...box.querySelectorAll('.rdprof i')],m=box.querySelector('.rdmeter i'),lab=box.querySelector('.rdmeter span'),sc=Math.max(12,+box.dataset.peak);
  const fin=()=>{box.classList.remove('play');box.classList.add('done');rw.forEach(e=>e.classList.remove('cur'));m.style.width='0%';let k=ws.length-1;while(k>0&&!ws[k-1].last)k--;const tail=ws.slice(k).filter(w=>w.stress).map(w=>w.t).join('').trim();lab.textContent=tail?'Read. What stays with the reader is the close: “'+tail+'”':'Read.';};
  if(reduced()){fin();return;}
  box.classList.remove('done');box.classList.add('play');rw.forEach(e=>e.classList.remove('lit','cur'));bars.forEach(e=>e.classList.remove('lit'));let i=0;
  const step=()=>{if(!document.contains(box)){rdStop();return;}if(i>=ws.length){fin();return;}const w=ws[i];if(i)rw[i-1].classList.remove('cur');rw[i].classList.add('lit','cur');bars[i].classList.add('lit');
    m.style.width=Math.min(100,w.held/sc*100)+'%';m.className=w.held>=12?'h3':w.held>=8?'h2':'';
    lab.textContent=w.verb?'The verb arrives: “'+w.t.trim().replace(/[.,;:!?]+$/,'')+'”. Now the reader can put it together.':w.held?'Holding '+w.held+(w.held===1?' word':' words')+', waiting for the verb':w.nov?'No main verb found in this sentence.':'Reading on. Nothing is waiting for a verb.';
    i++;rdT=setTimeout(step,230+(/[,;:]\s*$/.test(w.t)?170:0)+(w.verb?420:0)+(w.last?450:0));};
  step();}
/* ---------- versions ---------- */
function vKey(){const w=wasInfo(),cur=state.raw.slice(state.sel.s,state.sel.e).trim();return w?(w.fresh?'n:'+state.sel.s:'b:'+w.text.trim()):'b:'+cur;}
function miniAnat(st){const pre=st.pre,wc=(a,b)=>a>b||a<0?0:pre[b]-(a>0?pre[a-1]:0);let segs;
  if(st.head>=0&&st.v>=0){const sa=Math.max(st.stress?st.stress[0]:st.N,st.ve+1);segs=[['a-intro',wc(0,st.m-1)],['a-subj',wc(st.m,st.head)],['a-gap',wc(st.head+1,st.v-1)],['a-verb',wc(st.v,st.ve)],['a-rest',wc(st.ve+1,sa-1)],['a-stress',wc(sa,st.N-1)]];}
  else{const sa=st.stress?st.stress[0]:st.N;segs=[['a-intro',st.topic?wc(st.topic[0],st.topic[1]):0],['a-rest',wc(st.topic?st.topic[1]+1:0,sa-1)],['a-stress',wc(sa,st.N-1)]];}
  return '<div class="anat mini" role="img" aria-label="Sentence anatomy"'+tipA('The sentence laid out left to right. Blue edge: the opening. Solid amber: subject and verb. Hatched: words between them. Rose: the close.')+'>'+segs.filter(s=>s[1]>0).map(s=>'<i class="'+s[0]+'" style="flex:'+s[1]+' 1 0"></i>').join('')+'</div>';}
function vStat(text,ss){let sents,notes;
  if(ss){sents=ss;const ids=new Set(ss.map(s=>s.i));notes=state.A.findings.filter(f=>ids.has(f.s)&&active(f)&&!f.para).length;}
  else{const sel=state.sel,ctx=[sel.s,state.raw.length-sel.e,Object.keys(state.dismissed).length,state.claim,JSON.stringify([state.jobs,state.merges,state.moves,state.emph,state.tags,state.points,state.mylist,state.source])].join('|');
    if(state.vctx!==ctx||!state.vcache){state.vctx=ctx;state.vcache=new Map();}let r=state.vcache.get(text);
    if(!r){const A2=E.analyze(state.raw.slice(0,sel.s)+text+state.raw.slice(sel.e),opts()),e2=sel.s+text.length,s2=A2.sents.filter(s=>s.s<e2&&s.e>sel.s),ids=new Set(s2.map(s=>s.i));
      r={sents:s2,notes:A2.findings.filter(f=>ids.has(f.s)&&!f.para&&!f.ok&&!state.dismissed[f.key]).length};state.vcache.set(text,r);}
    sents=r.sents;notes=r.notes;}
  const nW=sents.reduce((a,s)=>a+s.nW,0),s0=sents[0];
  return{sents,line:nW+(nW===1?' word':' words')+' · '+notes+(notes===1?' open note':' open notes')+(s0&&s0.preV!=null?' · '+s0.preV+' before the verb':'')+(s0&&s0.head>=0&&s0.v>=0?' · subject and verb '+s0.gap+' apart':'')};}
function verRow(label,text,x,btns,cur){return '<div class="ver'+(cur?' cur':'')+'"><div class="vh"><b>'+label+'</b><span'+tipA('Counted with this wording in its place in the draft: its length, the open notes it would have across every lens, the words before its main verb, and the words between subject and verb.')+'>'+x.line+'</span></div>'+x.sents.map(miniAnat).join('')+'<p class="vt">'+esc(text)+'</p>'+(btns?'<div class="tilebar">'+btns+'</div>':'')+'</div>';}
function renderVers(ss){const pV=$('#pVers');if(!ss.length){pV.innerHTML='<p class="empty">Nothing to compare.</p>';return;}
  const cur=state.raw.slice(state.sel.s,state.sel.e).trim(),list=state.vers[vKey()]||[],w=wasInfo(),was=w&&!w.fresh&&w.text.trim()&&w.text.trim()!==cur?w.text.trim():null,full=list.length>=3,dup=list.includes(cur);
  let h='<p class="hint">Try the sentence more than one way. Keep a wording, write another in the box above, and compare them here. Nothing is lost when you switch: the wording you leave takes the place of the one you pick.</p>'+
    verRow('In the draft now',cur,vStat(cur,ss),'<button type="button" class="btn sm" id="vKeep"'+(full||dup?' disabled':'')+tipA(dup?'This wording is already kept below.':full?'Three versions are kept. Discard one to keep another.':'Save this wording as a version, then go on editing in the box above.')+'>Keep this wording as a version</button>',true);
  if(was&&!list.includes(was))h+=verRow('Your starting text',was,vStat(was),'<button type="button" class="btn sm" id="vUseW" data-vuse="w">Use this one</button>');
  list.forEach((t,i)=>{h+=verRow('Version '+'ABC'[i],t,vStat(t),'<button type="button" class="btn sm" id="vUse'+i+'" data-vuse="'+i+'">Use this one</button><button type="button" class="btn sm" id="vDel'+i+'" data-vdel="'+i+'">Discard</button>');});
  pV.innerHTML=h;}
function openWb(i,o){
  o=o||{};const st=state.A.sents[i];if(!st)return;const same=state.sel&&st.s<state.sel.e&&st.e>state.sel.s;
  if(!same){state.sel={s:st.s,e:st.e};state.wbOnly=null;state.aside=null;state.pv=null;state.vcache=null;if(state.tab==='read'||state.tab==='vers'){if(!o.keepTab)state.tab='notes';}state.tiles=null;state.picked=-1;state.pick={news:new Set(),who:new Set()};state.markOut='';if(!o.keepTab)state.tab='notes';}
  state.hot=o.hot||null;if(state.guide&&state.tab!=='notes'&&o.hot)state.tab='notes';
  detectFx();renderDynamic();if(!same)syncWbText();
  if(!same||o.scroll)requestAnimationFrame(()=>$('#wb').scrollIntoView({block:'nearest',behavior:reduced()?'auto':'smooth'}));
}
function closeWb(){state.sel=null;state.hot=null;state.guide=null;renderDynamic();}

function renderDynamic(){
  const act=document.activeElement,aid=act&&act.id;
  $('#btnEdit').textContent=state.editing?'Analyze':state.isSample?'Paste your text':'Edit whole text';
  $('#desk').classList.toggle('clean',!!state.clean);
  renderRail();renderStrip();renderExtra();renderMs();renderNotes();renderWb();
  if(aid){const el=document.getElementById(aid);if(el&&el!==document.activeElement){tipMute=Date.now()+400;el.focus({preventScroll:true});}}
  if(tipFor&&!document.contains(tipFor))hideTip();
  {const nt=noText(state.lens),n=nt?0:state.A.findings.filter(f=>inView(f)&&active(f)).length;$('#tools').hidden=nt;$('#btnUndo').disabled=!(state.undo&&state.undo.length);$('#btnRedo').disabled=!(state.redo&&state.redo.length);
    $('#fab').hidden=!n||state.editing||!!state.tour;$('#fab').textContent=state.sel?'Next note':'First note';}
  tourSync();
}
function setLens(k){setTimeout(()=>{const ph=window.matchMedia('(max-width:720px)').matches,b=document.getElementById('lens-'+k),c=document.querySelector('.center');if(b&&ph)b.scrollIntoView({inline:'center',block:'nearest'});if(c){const off=ph?document.querySelector('.rail').offsetHeight+10:14,y=c.getBoundingClientRect().top+window.scrollY-off;if(Math.abs(window.scrollY-y)>4)window.scrollTo({top:Math.max(0,y),behavior:reduced()?'auto':'smooth'});}},0);state.lens=k;(state.seen||(state.seen=new Set())).add(k);state.pv=null;save();renderLensCard();renderDynamic();const ms=$('#ms');ms.classList.remove('lensin');void ms.offsetWidth;ms.classList.add('lensin');clearTimeout(lensT);lensT=setTimeout(()=>ms.classList.remove('lensin'),2200);}
function setEditing(on){
  state.editing=on;$('#desk').classList.toggle('editing',on);$('#btnClear').hidden=!on;
  $('#btnEdit').textContent=on?'Analyze':state.isSample?'Paste your text':'Edit whole text';
  if(on){$('#draft').value=state.isSample?'':state.raw;state.sel=null;state.guide=null;$('#draft').focus();}
}
function applyFix(id){
  const f=state.A.byId[id];if(!f||!f.fix)return;const x=f.fix;
  if(x.capNext&&x.e<state.raw.length)replaceRaw(x.s,x.e+1,state.raw.charAt(x.e).toUpperCase());else replaceRaw(x.s,x.e,x.text);
  run();syncWbText();
}

/* ---------- events ---------- */
document.addEventListener('pointerdown',e=>{if(e.target.id!=='wbText')flushEdit();},true);
document.addEventListener('click',e=>{
  const t=e.target,c=s=>t.closest(s);let el;
  if(c('#about>summary'))setTimeout(()=>store.set('ts.about',$('#about').open?'1':'0'),0);
  if((el=c('[data-ref]'))){e.preventDefault();goRef(el.dataset.ref);return;}
  if(c('#eraseDraft')){try{['ts.v2','ts.draft','ts.lens','ts.list'].forEach(k=>localStorage.removeItem(k));}catch(x){}state.mylist='';newDoc(SAMPLE,true);setEditing(false);renderLensCard();run();window.scrollTo({top:0});return;}
  if((el=c('[data-swap]'))){const[id,i]=el.dataset.swap.split(':').map(Number),f=state.A.byId[id];
    if(f&&f.ladder){const st=state.A.sents[f.s],old=st.text.slice(f.a,f.b);let w=f.ladder[i],s=st.s+f.a,e=st.s+f.b;if(w===''){while(e<state.raw.length&&state.raw[e]===' ')e++;}else if(/^[A-Z]/.test(old))w=w.charAt(0).toUpperCase()+w.slice(1);replaceRaw(s,e,w);run();syncWbText();}return;}
  if((el=c('[data-start]'))){const[id,i]=el.dataset.start.split(':').map(Number),f=state.A.byId[id];
    if(f){const st=state.A.sents[f.s],si=f.s;replaceRaw(st.s,st.e,STARTERS[i][1]+decap(st.text));run();openWb(si,{scroll:true});syncWbText();const t=$('#wbText'),k=t.value.indexOf('___');if(k>=0){t.focus();t.setSelectionRange(k,k+3);}}return;}
  if((el=c('[data-noun]'))){const[id,i]=el.dataset.noun.split(':').map(Number),f=state.A.byId[id];
    if(f&&f.nouns){const st=state.A.sents[f.s];replaceRaw(st.s+f.b,st.s+f.b,' '+f.nouns[i].toLowerCase());run();syncWbText();}return;}
  if((el=c('[data-split]'))){const[id,i]=el.dataset.split.split(':').map(Number),f=state.A.byId[id],x=f&&f.splits&&f.splits[i];
    if(x)pvSet('split:'+id+':'+i,id,x.cap?{s:x.s,e:x.e+1,text:x.text+state.raw.charAt(x.e).toUpperCase()}:{s:x.s,e:x.e,text:x.text});return;}
  if((el=c('[data-join]'))){const[id,i]=el.dataset.join.split(':').map(Number),f=state.A.byId[id];
    if(f&&f.join!=null){const a=state.A.sents[f.join],b=state.A.sents[f.join+1],k=a?a.text.search(/[.!?]\s*$/):-1;
      if(a&&b&&k>0)pvSet('join:'+id+':'+i,id,{s:a.s+k,e:b.e,text:JOINS[i][1]+decap(b.text),open:a.i});}return;}
  if(c('#btnMean')||c('[data-mean]')){meanToggle();return;}
  if((el=c('[data-mvt]'))){mvS().tab=el.dataset.mvt;renderDynamic();return;}
  if((el=c('#mvQuilt'))){const r=el.getBoundingClientRect(),n=el._n||1,cc=r.width/n,j=Math.min(n-1,Math.max(0,Math.floor((e.clientX-r.left)/cc))),i=Math.min(n-1,Math.max(0,Math.floor((e.clientY-r.top)/cc)));mvS().cell=[i,j];renderDynamic();return;}
  if(MEAN.M&&((el=c('[data-mvup]'))||(el=c('[data-mvdn]')))){const O=mvOrderInfo(state.A,MEAN.M),o=O.ord.slice(),up=el.dataset.mvup!=null,q=+(up?el.dataset.mvup:el.dataset.mvdn),d=up?-1:1;if(o[q+d]!=null){const t=o[q];o[q]=o[q+d];o[q+d]=t;mvS().order=o;}renderDynamic();return;}
  if(MEAN.M&&c('#mvGreedy')){const O=mvOrderInfo(state.A,MEAN.M),rest=O.draft.slice(1),o=[O.draft[0]];while(rest.length){let b=0;rest.forEach((x,k)=>{if(O.join(o[o.length-1],x)>O.join(o[o.length-1],rest[b]))b=k;});o.push(rest.splice(b,1)[0]);}mvS().order=o;renderDynamic();return;}
  if(c('#mvReset')){mvS().order=null;renderDynamic();return;}
  if(MEAN.M&&c('#mvApply')){const O=mvOrderInfo(state.A,MEAN.M),txt=O.ord.map(o=>{const p=O.by(o);return state.raw.slice(p.s,p.e).trim();}).join('\n\n');state.sel=null;replaceRaw(0,state.raw.length,txt);mvS().order=null;run();return;}
  if(c('#mvAskBtn')){mvAskGo($('#mvQ').value);return;}
  if((el=c('[data-mvodd]'))){mvS().odd=+el.dataset.mvodd;renderDynamic();return;}
  if((el=c('[data-mvseq]'))){const st=mvS();(st.seq||(st.seq=[])).push(+el.dataset.mvseq);renderDynamic();return;}
  if(c('#mvSeqReset')){mvS().seq=[];renderDynamic();return;}
  if(c('#mvNextP')){const st=mvS();st.dp=(st.dp||0)+1;st.odd=null;st.seq=[];renderDynamic();return;}
  if((el=c('[data-norms]'))){normsLoad();return;}
  if((el=c('[data-mgo]'))){const i=+el.dataset.mgo;setLens('overview');openWb(i,{scroll:true});return;}
  if((el=c('[data-mpair]'))){state.termSel=new Set(el.dataset.mpair.split('|'));renderDynamic();const tb=$('#termMerge');if(tb)tb.scrollIntoView({block:'center',behavior:reduced()?'auto':'smooth'});return;}
  if((el=c('[data-conn]'))){state.connSel=state.connSel===el.dataset.conn?null:el.dataset.conn;renderDynamic();return;}
  if((el=c('[data-gterm]'))){state.gridSel=state.gridSel===el.dataset.gterm?null:el.dataset.gterm;renderDynamic();return;}
  if((el=c('[data-gp]'))){const o=+el.dataset.gp;state.gridP=state.gridP===o?null:o;renderDynamic();return;}
  if((el=c('[data-pset]'))){const P=prState();P.set=el.dataset.pset;P.i=0;P.picks=new Set();P.out=null;P.pick=null;renderDynamic();return;}
  if((el=c('[data-pw]'))){const P=prState();if(!P.out){const i=+el.dataset.pw;if(P.picks.has(i))P.picks.delete(i);else P.picks.add(i);renderDynamic();}return;}
  if(c('#pCheck')){prCheck();renderDynamic();return;}
  if(c('#pNext')){const P=prState(),n=prItems(P.set).length;P.i=n?(P.i+1)%n:0;P.picks=new Set();P.out=null;P.pick=null;renderDynamic();return;}
  if((el=c('[data-pab]'))){prCheck(+el.dataset.pab);renderDynamic();return;}
  if((el=c('[data-pgo]'))){const i=+el.dataset.pgo;setLens(el.dataset.pl||'overview');openWb(i,{scroll:true});return;}
  if((el=c('[data-rd]'))){rdPlay(el.dataset.rd);return;}
  if(c('#btnClean2')){state.clean=!state.clean;renderDynamic();if(state.clean)$('#ms').scrollIntoView({block:'start',behavior:reduced()?'auto':'smooth'});return;}
  if(c('#rcCopy')){const t=$('#rcText'),msg=$('#rcMsg'),fb=()=>{t.focus();t.select();msg.textContent='Selected. Now use Copy from your keyboard or menu.';};
    try{navigator.clipboard.writeText(t.value).then(()=>{msg.textContent='Copied.';},fb);}catch(x){fb();}return;}
  if(c('#vKeep')){const k=vKey(),cur=state.raw.slice(state.sel.s,state.sel.e).trim(),list=state.vers[k]||(state.vers[k]=[]);if(cur&&list.length<3&&!list.includes(cur)){list.push(cur);save();}renderWb();return;}
  if((el=c('[data-vuse]'))){const k=vKey(),v=el.dataset.vuse,cur=state.raw.slice(state.sel.s,state.sel.e).trim(),w=wasInfo(),start=w&&!w.fresh?w.text.trim():cur;let list=state.vers[k]||[];
    const text=v==='w'?start:list[+v];if(text==null)return;
    if(v==='w'){if(cur&&list.length<3)list.push(cur);}else list[+v]=cur;
    state.vers[k]=[...new Set(list)].filter(x=>x&&x!==text&&x!==start);replaceRaw(state.sel.s,state.sel.e,text);run();syncWbText();return;}
  if((el=c('[data-vdel]'))){const k=vKey(),list=state.vers[k]||[];list.splice(+el.dataset.vdel,1);if(!list.length)delete state.vers[k];save();renderWb();return;}
  if((el=c('[data-wk]'))){state.wbOnly=state.wbOnly===el.dataset.wk?null:el.dataset.wk;renderBack();return;}
  if((el=c('[data-k]'))){setLens(el.dataset.k);return;}
  if((el=c('[data-fix]'))){const f=state.A.byId[+el.dataset.fix],x=f&&f.fix;if(x)pvSet('fix:'+f.id,f.id,x.capNext&&x.e<state.raw.length?{s:x.s,e:x.e+1,text:state.raw.charAt(x.e).toUpperCase()}:{s:x.s,e:x.e,text:x.text});return;}
  if(c('[data-pvgo]')){const p=state.pv;if(p){state.pv=null;replaceRaw(p.s,p.e,p.text);run();if(p.open!=null)openWb(p.open,{});syncWbText();}return;}
  if(c('[data-pvno]')){state.pv=null;renderDynamic();return;}
  if((el=c('[data-rg]'))){const g=$('#g'+el.dataset.rg),sh=g.classList.toggle('shut');el.setAttribute('aria-expanded',String(!sh));return;}
  if((el=c('[data-rmore]'))){const g=+el.dataset.rmore;state.railAll[g]=!state.railAll[g];renderRail();return;}
  if(c('#btnClean')){state.clean=!state.clean;renderDynamic();return;}
  if(c('#btnUndo')){restore(state.undo,state.redo||(state.redo=[]));return;}
  if(c('#btnRedo')){restore(state.redo,state.undo||(state.undo=[]));return;}
  if(c('#btnCopy')){const msg=$('#copyMsg'),fb=()=>{setEditing(true);const d=$('#draft');d.value=state.raw;d.focus();d.select();};
    try{navigator.clipboard.writeText(state.raw).then(()=>{msg.textContent='Copied.';setTimeout(()=>{msg.textContent='';},2500);},fb);}catch(x){fb();}return;}
  if(c('#fab')){nextNote();return;}
  if(c('#fsUp')||c('#fsDown')){const R=state.read;R.fs=Math.max(0,Math.min(FS.length-1,R.fs+(c('#fsUp')?1:-1)));applyRead();return;}
  if(c('#lnkTour')){startTour();return;}
  if(c('#tourNext')){const T=state.tour;if(T){if(TOUR[T.i].done)endTour();else{T.i++;renderDynamic();}}return;}
  if(c('#tourSkip')){endTour();return;}
  if((el=c('[data-ex]'))){loadEx(el.dataset.ex==='2'?SAMPLE2:SAMPLE);return;}
  if(c('#lnkExample')){loadEx(SAMPLE);$('#desk').scrollIntoView({block:'start',behavior:reduced()?'auto':'smooth'});return;}
  if(c('#lnkPractice')){setEditing(false);setLens('practice');$('#lensCard').scrollIntoView({block:'start',behavior:reduced()?'auto':'smooth'});return;}
  if(c('#btnPractice')){setEditing(false);setLens('practice');$('#lensCard').scrollIntoView({block:'start',behavior:reduced()?'auto':'smooth'});return;}
  if((el=c('[data-pass]'))){startPass(+el.dataset.pass);return;}
  if(c('#passResume')){if(state.pass){state.guide={cur:[-1,-1,-1],done:false};guideGo(1);}return;}
  if(c('#passEnd')){endPass();return;}
  if(c('#btnSurprise')){surprise();return;}
  if(c('#toast')){hideToast();return;}
  if(c('#wbClose')){closeWb();return;}
  if((el=c('[data-go]'))){const f=state.A.byId[+el.dataset.go];if(f)openWb(f.s,{hot:f.key,scroll:true});return;}
  if((el=c('[data-bar]'))){openWb(+el.dataset.bar,{scroll:true});return;}
  if((el=c('[data-open]'))){state.open.add(+el.dataset.open);renderMs();return;}
  if((el=c('[data-undis]'))){const f=state.A.byId[+el.dataset.undis];if(f){delete state.dismissed[f.key];save();run();}return;}
  if((el=c('[data-tab]'))){state.tab=el.dataset.tab;renderWb();return;}
  if((el=c('[data-tile]'))){if(Date.now()-(state.dragAt||0)<450)return;const v=el.dataset.tile,T=state.tiles;
    if(v==='end'){if(state.picked>=0){T.push(T.splice(state.picked,1)[0]);state.picked=-1;applyTiles();}return;}
    const i=+v;if(state.picked<0){state.picked=i;renderWb();return;}
    if(i===state.picked){state.picked=-1;renderWb();return;}
    const tgt=T[i],x=T.splice(state.picked,1)[0];T.splice(T.indexOf(tgt),0,x);state.picked=-1;applyTiles();return;}
  if(c('#tStop')){const T=state.tiles,at=state.picked>=0?state.picked+1:Math.max(1,T.length-1);T.splice(at,0,{id:'tile'+(state.tid++),brk:true});state.picked=-1;applyTiles();return;}
  if(c('#tDel')){if(state.picked>=0&&state.tiles[state.picked].brk){state.tiles.splice(state.picked,1);state.picked=-1;applyTiles();}return;}
  if(c('#tReset')){const src=state.tsrc;$('#wbText').value=src;commitEdit(src);autosize();return;}
  if((el=c('.tk'))){const s=state.pick[el.dataset.q],i=+el.dataset.w;if(s.has(i))s.delete(i);else s.add(i);state.markOut='';renderWb();return;}
  if(c('#markCheck')){const st=spanSents()[0];if(st){checkMarks(st);renderWb();}return;}
  if(c('#btnGuide')){if(!state.guide){state.guide={cur:[-1,-1,-1],done:false};guideGo(1);}else if(state.sel)$('#wb').scrollIntoView({block:'nearest'});return;}
  if(c('#gNext')){guideGo(1);return;}
  if(c('#gPrev')){guideGo(-1);return;}
  if(c('#gEnd')){if(state.pass){endPass();return;}state.guide=null;state.hot=null;renderDynamic();return;}
  if((el=c('[data-term]'))){const k=el.dataset.term;if(state.termSel.has(k))state.termSel.delete(k);else state.termSel.add(k);renderDynamic();return;}
  if(c('#termMerge')){if(state.termSel.size>=2){const ks=[...state.termSel];state.merges=state.merges.map(g=>g.filter(k=>!ks.includes(k))).filter(g=>g.length>1);state.merges.push(ks);state.termSel=new Set();save();run();}return;}
  if(c('#termClear')){state.termSel=new Set();renderDynamic();return;}
  if((el=c('[data-unmerge]'))){state.merges.splice(+el.dataset.unmerge,1);save();run();return;}
  if(c('#wasRestore')){if(state.sel){replaceRaw(state.sel.s,state.sel.e,state.wasText);run();syncWbText();}return;}
  if(c('#setBase')){state.base=state.raw;save();renderDynamic();return;}
  if((el=c('.ms [data-f]'))){const f=state.A.byId[+el.dataset.f];if(f)openWb(f.s,{hot:f.key});return;}
  if((el=c('.sent'))){openWb(+el.dataset.s);return;}
});
document.addEventListener('change',e=>{
  const t=e.target;
  if(t.matches('[data-dis]')){const f=state.A.byId[+t.dataset.dis];if(f&&t.value){state.dismissed[f.key]=t.value;save();run();}return;}
  if(t.matches('[data-claim]')){const f=state.A.byId[+t.dataset.claim];if(f){if(t.value)state.tags[f.claim.key]=t.value;else delete state.tags[f.claim.key];save();run();}return;}
  if(t.id==='histRange'){state.scrubbing=false;state.scrubKey=null;renderWb();return;}
  if(t.id==='rsSpace'||t.id==='rsColour'){state.read.sp=$('#rsSpace').checked;state.read.rc=$('#rsColour').checked;applyRead();return;}
  if(t.id==='kindSel'){state.kind=t.value;save();run();return;}
  if(t.matches('.emphsel')){state.emph[+t.dataset.ord]=+t.value;save();run();return;}
  if(t.matches('#mvQ')){mvAskGo(t.value);return;}
  if(t.matches('#mvAbs')){mvS().abs=t.value;store.set('ts.abs',t.value);run();return;}
  if(t.matches('#myList')){state.mylist=t.value;store.set('ts.list',t.value);save();run();return;}
  if(t.matches('#srcText')){state.source=t.value;save();run();return;}
  if(t.matches('.pointin')){(state.points||(state.points=[]))[+t.dataset.ord]=t.value.trim();save();run();return;}
  if(t.matches('.jobsel')){state.jobs[+t.dataset.ord]=t.value;state.moves[+t.dataset.ord]=null;save();run();return;}
  if(t.matches('.movesel')){const ord=+t.dataset.ord,p=state.A.paras.find(q=>q.ord===ord);if(!p)return;let m=state.moves[ord];if(!m||m.job!==p.job)m=state.moves[ord]={job:p.job,v:[]};m.v[+t.dataset.mv]=t.value;save();run();return;}
});
let typeT=0,wbT=0,claimT=0;
function flushEdit(){if(wbT){clearTimeout(wbT);wbT=0;if(state.sel)commitEdit($('#wbText').value);}}
document.addEventListener('input',e=>{
  const t=e.target;
  if(t.id==='lensQ'){state.lensQ=t.value;renderRail();return;}
  if(t.id==='guideQ'){state.guideQ=t.value;guideFilter();return;}
  if(t.id==='histRange'){const H=state.hist&&state.hist[state.scrubKey||(state.scrubKey=vKey())];if(H&&state.sel&&H[+t.value]!=null){state.scrubbing=true;replaceRaw(state.sel.s,state.sel.e,H[+t.value]);run();syncWbText();}return;}
  if(t.id==='wbText'){autosize();hideTip();if(state.cost<45)commitEdit(t.value);else{renderBack();clearTimeout(wbT);wbT=setTimeout(()=>{wbT=0;commitEdit(t.value);},220);}}
  else if(t.id==='titleIn'){clearTimeout(claimT);claimT=setTimeout(()=>{state.title=t.value;if(state.isSample&&t.value)state.isSample=false;save();run();},250);}
  else if(t.id==='claimIn'){clearTimeout(claimT);claimT=setTimeout(()=>{state.claim=t.value;if(state.isSample&&t.value!==SAMPLE_CLAIM&&t.value!==SAMPLE2_CLAIM)state.isSample=false;save();run();},250);}
});
document.addEventListener('keydown',e=>{
  const t=e.target;
  if((e.ctrlKey||e.metaKey)&&(e.key==='z'||e.key==='Z')&&!(t.matches&&t.matches('textarea,input,select'))){e.preventDefault();if(e.shiftKey)restore(state.redo,state.undo||(state.undo=[]));else restore(state.undo,state.redo||(state.redo=[]));return;}
  if(t.id==='wbText'&&e.key==='Enter'){e.preventDefault();return;}
  if(t.matches&&t.matches('.tile[data-tile]')&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){const i=+t.dataset.tile,j=i+(e.key==='ArrowLeft'?-1:1),T=state.tiles;if(isNaN(i)||j<0||j>=T.length)return;e.preventDefault();[T[i],T[j]]=[T[j],T[i]];state.picked=-1;applyTiles();return;}
  if(e.key==='Escape'&&state.sel&&t.id!=='wbText')closeWb();
});
$('#btnEdit').addEventListener('click',()=>{
  if(!state.editing){setEditing(true);return;}
  const v=$('#draft').value;if(!v.trim()){$('#draft').focus();return;}
  if(state.isSample||similar(v,state.base)<0.4)newDoc(v,false);else{state.raw=v;state.sel=null;state.isSample=false;save();}
  setEditing(false);renderLensCard();run();
});
const loadEx=t=>{newDoc(t,true);setEditing(false);state.lens='overview';renderLensCard();run();};
$('#btnSample').addEventListener('click',()=>loadEx(SAMPLE));
document.addEventListener('toggle',e=>{if(e.target.id==='moreN'&&state.sel)state.moreOpen=e.target.open?state.sel.s:null;},true);
setInterval(()=>{if(state.pass&&state.guide&&state.sel)$('#gPos').textContent=passLab()+(state.gTxt||'');},15000);
$('#btnClear').addEventListener('click',()=>{$('#draft').value='';$('#draft').focus();});

/* ---------- tooltips ---------- */
const tipEl=document.createElement('div');tipEl.id='tip';tipEl.setAttribute('role','tooltip');tipEl.hidden=true;document.body.appendChild(tipEl);
let tipFor=null,tipT=0,touch=false,tipMute=0,lensT=0;
function showTip(el,x,y){const txt=el.getAttribute('data-tip');if(!txt)return;const rs=[...el.getClientRects()],r=rs.find(q=>x!=null&&x>=q.left&&x<=q.right&&y>=q.top&&y<=q.bottom)||rs[0];if(!r){hideTip();return;}
  tipFor=el;tipEl.textContent=txt;tipEl.hidden=false;
  const vw=document.documentElement.clientWidth,tw=tipEl.offsetWidth,th=tipEl.offsetHeight,cx=x!=null?x:r.left+r.width/2;
  let top=r.top-th-8;if(top<8)top=r.bottom+8;tipEl.style.left=Math.max(8,Math.min(vw-tw-8,cx-tw/2))+'px';tipEl.style.top=top+'px';}
function hideTip(){clearTimeout(tipT);tipFor=null;tipEl.hidden=true;}
document.addEventListener('pointerdown',e=>{touch=e.pointerType==='touch'||e.pointerType==='pen';},true);
document.addEventListener('pointerover',e=>{if(e.pointerType!=='mouse')return;const el=e.target.closest?e.target.closest('[data-tip]'):null;if(el&&el===tipFor)return;clearTimeout(tipT);tipEl.hidden=true;tipFor=null;if(!el)return;const x=e.clientX,y=e.clientY;tipT=setTimeout(()=>{if(document.contains(el))showTip(el,x,y);},320);});
document.addEventListener('focusin',e=>{const t=e.target,el=t.closest?t.closest('[data-tip]'):null;if(el&&Date.now()>tipMute&&t.matches(':focus-visible')&&!t.matches('textarea,select'))showTip(el);});
document.addEventListener('focusout',hideTip);
document.addEventListener('click',e=>{const el=e.target.closest?e.target.closest('[data-tip]'):null;
  if(el&&(el.classList.contains('help')||(touch&&!el.closest('button,a,select,textarea,summary,.sent')))){if(tipFor===el)hideTip();else showTip(el);}
  else if(touch||!el)hideTip();});
window.addEventListener('scroll',hideTip,true);
/* drag and drop for the Rearrange pieces (pointer events, so it works by touch, pen and mouse) */
{let dg=null;const box=()=>document.querySelector('#pMove .tiles');
  const clean=()=>{if(!dg)return;if(dg.ghost)dg.ghost.remove();if(dg.mark)dg.mark.remove();dg.el.classList.remove('dragging');try{dg.el.releasePointerCapture(dg.id);}catch(x){}dg=null;};
  document.addEventListener('pointerdown',e=>{const el=e.target.closest?e.target.closest('#pMove .tile[data-tile]'):null;if(!el||el.dataset.tile==='end'||e.button>0||!state.tiles)return;clean();dg={el,i:+el.dataset.tile,x:e.clientX,y:e.clientY,id:e.pointerId,on:false,at:-1};});
  document.addEventListener('pointermove',e=>{if(!dg||e.pointerId!==dg.id)return;
    if(!dg.on){if(Math.hypot(e.clientX-dg.x,e.clientY-dg.y)<7)return;const r=dg.el.getBoundingClientRect();dg.on=true;dg.ox=dg.x-r.left;dg.oy=dg.y-r.top;hideTip();
      const g=dg.ghost=dg.el.cloneNode(true);g.removeAttribute('id');g.removeAttribute('data-tip');g.classList.add('ghost');g.style.width=r.width+'px';document.body.appendChild(g);
      dg.mark=document.createElement('span');dg.mark.className='tdrop';dg.el.classList.add('dragging');try{dg.el.setPointerCapture(dg.id);}catch(x){}}
    e.preventDefault();dg.ghost.style.left=(e.clientX-dg.ox)+'px';dg.ghost.style.top=(e.clientY-dg.oy)+'px';
    const bx=box();if(!bx)return;const ts=[...bx.querySelectorAll('.tile[data-tile]')].filter(t=>t.dataset.tile!=='end'&&t!==dg.el);let at=state.tiles.length,ref=null;
    for(const t of ts){const q=t.getBoundingClientRect();if(e.clientY<q.top-3||(e.clientY<=q.bottom+3&&e.clientX<q.left+q.width/2)){at=+t.dataset.tile;ref=t;break;}}
    if(at!==dg.at||!dg.mark.parentNode){dg.at=at;bx.insertBefore(dg.mark,ref||bx.querySelector('[data-tile="end"]'));}},{passive:false});
  const drop=(e,cancel)=>{if(!dg||e.pointerId!==dg.id)return;if(!dg.on){dg=null;return;}const from=dg.i;let to=dg.at;clean();state.dragAt=Date.now();
    if(cancel||to<0||!state.tiles)return;if(to>from)to--;if(to===from)return;const T=state.tiles,x=T.splice(from,1)[0];T.splice(to,0,x);state.picked=-1;applyTiles();};
  document.addEventListener('pointerup',e=>drop(e,false));document.addEventListener('pointercancel',e=>drop(e,true));}
/* labels for the marks under the rewrite box: by pointer, and by cursor position */
{const ta=$('#wbText');let bkEl=null;
  ta.addEventListener('mousemove',e=>{const el=document.elementsFromPoint(e.clientX,e.clientY).find(n=>n.classList&&n.classList.contains('mk')&&n.closest('#wbBack'))||null;
    if(el===bkEl)return;bkEl=el;clearTimeout(tipT);if(!el){if(tipFor&&tipFor.closest&&tipFor.closest('#wbBack'))hideTip();return;}
    const x=e.clientX,y=e.clientY;tipT=setTimeout(()=>{if(document.contains(el)&&bkEl===el)showTip(el,x,y);},200);});
  ta.addEventListener('mouseleave',()=>{bkEl=null;if(tipFor&&tipFor.closest&&tipFor.closest('#wbBack'))hideTip();});
  ['keyup','click','focus','blur','select'].forEach(v=>ta.addEventListener(v,()=>setTimeout(wbHint,0)));
  document.addEventListener('selectionchange',()=>{if(document.activeElement===ta)wbHint();});
  /* some browsers pad the text inside a textarea; measure it so the marks line up */
  try{const s=document.createElement('span'),p=document.createElement('textarea'),css='position:absolute;left:-9999px;top:0;font:16px/20px monospace;padding:0;border:0;margin:0;overflow:hidden;box-sizing:content-box;';
    s.style.cssText=css+'white-space:pre';s.textContent=p.value='mmmmmmmm mmmmmmmm';p.rows=1;document.body.append(s,p);const w=Math.ceil(s.getBoundingClientRect().width);let d=0;
    for(;d<=14;d++){p.style.cssText=css+'white-space:pre-wrap;width:'+(w+d)+'px;height:20px';if(p.scrollHeight<=24)break;}
    s.remove();p.remove();if(d>1&&d<=14)$('#wbBack').style.setProperty('--tap',(d/2)+'px');}catch(x){}}
function goRef(k){const el=document.getElementById('ref-'+k);if(!el)return;el.scrollIntoView({block:'center',behavior:reduced()?'auto':'smooth'});el.classList.add('flash');setTimeout(()=>el.classList.remove('flash'),2600);}
function renderRefs(){$('#refs').innerHTML=REFS.map(r=>'<li id="ref-'+r[0]+'">'+r[1]+(r[2]?' <a href="https://doi.org/'+r[2]+'" target="_blank" rel="noopener">https://doi.org/'+esc(r[2])+'</a>':'')+(r[3]?' <a href="'+r[3]+'" target="_blank" rel="noopener">'+esc(r[3].replace(/^https?:\/\//,''))+'</a>':'')+'</li>').join('');}

(function init(){
  let s=null;try{s=JSON.parse(store.get('ts.v2')||'null');}catch(e){}
  const legacy=store.get('ts.draft');
  if(s&&s.raw&&s.raw.trim()){state.raw=s.raw;state.base=s.base||s.raw;state.claim=s.claim||'';state.tags=s.tags||{};state.dismissed=s.dismissed||{};state.jobs=s.jobs||[];state.merges=s.merges||[];state.moves=s.moves||[];state.emph=s.emph||[];state.points=s.points||[];state.source=s.source||'';state.vers=s.vers||{};state.miles=s.miles||{};state.kind=s.kind||'';state.title=s.title||'';}
  else if(legacy&&legacy.trim()){state.raw=legacy;state.base=legacy;}
  else{state.raw=SAMPLE;state.base=SAMPLE;state.isSample=true;state.claim=SAMPLE_CLAIM;}
  if(s&&s.lens&&LBY[s.lens])state.lens=s.lens;
  if(window.matchMedia('(max-width:720px)').matches)[2,3,4,5,6,7].forEach(g=>{$('#g'+g).classList.remove('shut');});
  {const ab=store.get('ts.about');$('#about').open=ab==null?!store.get('ts.seen'):ab==='1';store.set('ts.seen','1');}
  state.mylist=store.get('ts.list')||'';
  if(store.get('ts.mean')==='1'){MEAN.on=true;setTimeout(meanLoad,400);}
  if(store.get('ts.norms')==='1')setTimeout(normsLoad,600);
  try{state.read=JSON.parse(store.get('ts.read')||'null')||{fs:0,sp:false,rc:false};}catch(e){state.read={fs:0,sp:false,rc:false};}
  if(state.isSample&&state.base===SAMPLE&&!store.get('ts.tour'))state.tour={i:0};
  window.matchMedia('(max-width:720px)').addEventListener('change',q=>{if(q.matches)[2,3,4,5,6,7].forEach(g=>{$('#g'+g).classList.remove('shut');});});
  renderRefs();setEditing(false);renderLensCard();applyRead();run();
})();

/* ---------- header diagram: ten invented sentences about writing, one at random on each load ---------- */
/* [sentence before, opening, verb, close]; {word} is what the opening links back to, [word] is the subject */
const DGS=[
 ['Every writer starts with a messy first {draft}.','That [draft]','holds','the sentence you were looking for.'],
 ['Readers come to each sentence with a {question}.','That [question]','deserves','an answer before the full stop.'],
 ['Good paragraphs are made in {revision}.','Each round of [revision]','gives','the reader one less thing to carry.'],
 ['A sentence saves its best seat for the {end}.','The [word] you put there','rings','longest in the reader’s ear.'],
 ['Writing is {thinking} that other people can see.','This visible [thinking]','improves','every time you read it aloud.'],
 ['Most readers are on the {writer}’s side.','A [writer] who trusts this','writes','with a lighter hand.'],
 ['A clear sentence opens with something the reader already {knows}.','That familiar [start]','makes','the new idea feel welcome.'],
 ['Editing is where a draft finds its {rhythm}.','A steady [rhythm]','lets','one short sentence land like a drumbeat.'],
 ['Every paragraph makes the reader a small {promise}.','A kept [promise]','earns','their attention for the next one.'],
 ['Cutting a needless word is a small {kindness}.','Each such [kindness]','buys','your reader a little more patience.']];
function dgShow(next){const el=id=>document.getElementById(id);if(!el('dgPrev'))return;
  const last=parseInt(store.get('ts.dg')||'-1',10);let i=Math.floor(Math.random()*DGS.length);
  if(next&&last>=0)i=(last+1)%DGS.length;else if(i===last)i=(i+1)%DGS.length;
  store.set('ts.dg',String(i));const d=DGS[i],f=s=>esc(s).replace(/\{([^}]+)\}/g,'<span class="dg-old">$1</span>').replace(/\[([^\]]+)\]/g,'<u>$1</u>');
  el('dgPrev').innerHTML=f(d[0]);el('dgOpen').innerHTML=f(d[1]);el('dgVerb').innerHTML='<u>'+esc(d[2])+'</u>';el('dgClose').innerHTML=f(d[3]);}
dgShow(false);document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#dgNext')){e.preventDefault();dgShow(true);}});

document.addEventListener('keydown',e=>{if(e.target&&e.target.id==='lensQ'&&e.key==='Enter'){const b=document.querySelector('.rail .lens');if(b){e.preventDefault();b.click();}}});
