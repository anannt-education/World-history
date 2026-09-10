import type { SourceAsset } from "@/lib/types";

export const SOURCES: Record<string, SourceAsset> = {
  pegolotti: {
    id: "pegolotti",
    stimulusFamily: "PEG-1340",
    kind: "primary_extract",
    title: "Francesco Balducci Pegolotti, merchant handbook on the land route to Cathay",
    excerpt: `CHAPTER I. Information regarding the journey to Cathay, for such as will go by Tana and come back with goods.

In the first place, from Tana [Azov, at the mouth of the Don] to Gintarchan [Astrakhan] may be twenty-five days with an ox-waggon, and from ten to twelve days with a horse-waggon. On the road you will find plenty of Moccols [Mongols], that is to say, of gens d'armes. … From Saracanco to Organci [Urgench] may be twenty days journey in camel-waggon. It will be well for anyone travelling with merchandize to go to Organci, for in that city there is a ready sale for goods. …

After getting to Cassai you carry on with the money which you get for the sommi of silver which you sell there; and this money is made of paper, and is called balishi. And four pieces of this money are worth one sommo of silver in the province of Cathay. …

CHAPTER II. Things needful for merchants who desire to make the journey to Cathay …

In the first place, you must let your beard grow long and not shave. And at Tana you should furnish yourself with a dragoman [translator/guide]. And you must not try to save money in the matter of dragomen by taking a bad one instead of a good one. …

The road you travel from Tana to Cathay is perfectly safe, whether by day or by night, according to what the merchants say who have used it. Only if the merchant, in going or coming, should die upon the road, everything belonging to him will become the perquisite of the lord of the country in which he dies. … And there is another danger: this is when the lord of the country dies, and before the new lord who is to have the lordship is proclaimed; during such intervals there have sometimes been irregularities practised on the Franks, and other foreigners. …

Whatever silver the merchants may carry with them as far as Cathay the lord of Cathay will take from them and put into his treasury. And to merchants who thus bring silver they give that paper money of theirs in exchange. This is of yellow paper, stamped with the seal of the lord aforesaid. And this money is called balishi; and with this money you can readily buy silk and all other merchandize that you have a desire to buy. And all the people of the country are bound to receive it.`,
    accessibilityText:
      "A fourteenth-century Italian merchant handbook lists overland stages from the Black Sea toward Cathay, names Mongol guards along the route, advises hiring a translator, reports that merchants call the road safe except at a ruler’s death or a merchant’s death, and describes compulsory exchange of silver for sealed paper money used to buy silk.",
    provenance: {
      creator:
        "Francesco Balducci Pegolotti (fl. early 14th c.), Florentine factor of the Bardi company",
      dateRange: "c. 1330–1340 (compiled); surviving copy later)",
      originalContext:
        "A practical commercial handbook (often titled La pratica della mercatura) written for merchants, not a travel narrative. Pegolotti reports what merchants who used the Tana–Cathay road said; he does not claim to have made the full journey himself.",
      sourceType: "Merchant handbook / commercial manual (text extract)",
      repository:
        "English translation: Henry Yule, Cathay and the Way Thither, Vol. III (Hakluyt Society, 1916), pp. 143–171. Italian text known from a later manuscript tradition.",
      translationNotes:
        "Abridged from Yule’s English translation. Place identifications in square brackets are editorial. Ellipses mark omitted commercial detail (weights, packing). “Cathay” here refers to the Yuan-ruled Chinese core as Italian merchants named it; it is not a modern state.",
      rightsStatus:
        "Public domain. Yule (d. 1889); 1916 Hakluyt Society text.",
      academicNote:
        "Useful for commercial practice and perceived security under Mongol-era overland rule. It is one merchant community’s advice, not a census of every caravan. “Perfectly safe” is a reported claim, not a proven condition.",
    },
  },
  ibnBattutaKilwa: {
    id: "ibnBattutaKilwa",
    stimulusFamily: "IBN-1331-SWAHILI",
    kind: "primary_extract",
    title: "Ibn Battuta, Rihla — Mogadishu, Mombasa, and Kilwa",
    excerpt: `I took ship at Aden, and after four days at sea reached Zayla [Zeila] … The town of Mogadishu … is an enormous town. Its inhabitants are merchants and have many camels … When a vessel reaches the port, it is met by sumbuqs, which are small boats, in each of which are a number of young men, each carrying a covered dish containing food. He presents this to one of the merchants on the ship saying “This is my guest,” and all the others do the same. Each merchant on disembarking goes only to the house of the young man who is his host … The host then sells his goods for him and buys for him, and if anyone buys anything from him at too low a price, or sells to him in the absence of his host, the sale is regarded by them as invalid. This practice is of great advantage to them. …

I embarked at Maqdashaw [Mogadishu] for the Sawahil [Swahili] country, with the object of visiting the town of Kulwa [Kilwa] in the land of the Zanj. We came to Mambasa [Mombasa], a large island … They have fruit trees on the island, but no cereals, which have to be brought to them from the Sawahil. … The inhabitants are pious, honourable, and upright, and they have well-built wooden mosques.

We stayed one night in this island [Mombasa], and then pursued our journey to Kulwa, which is a large town on the coast. The majority of its inhabitants are Zanj … I was told by a merchant that the town of Sufala lies a fortnight’s journey [south] from Kulwa and that gold dust is brought to Sufala from Yufi … Kulwa is a very fine and substantially built town, and all its buildings are of wood. … The sultan at the time of my visit was Abu’l-Muzaffar Hasan, who was noted for his gifts and generosity. …

From Kulwa we sailed to Dhafari [Dhofar] … Thoroughbred horses are exported from here to India, the passage taking a month with a favouring wind. … Their principal food is rice imported from India. … Its population consists of merchants who live entirely on trade.`,
    accessibilityText:
      "A fourteenth-century Maghribi traveler describes Mogadishu’s merchant-host system, Mombasa’s imported grain and wooden mosques, Kilwa’s reported link to gold dust via Sofala, and Dhofar’s export of horses to India and import of Indian rice, with travel timed to a favoring wind.",
    provenance: {
      creator:
        "Abū ʿAbd Allāh Muḥammad ibn Battūta (1304–1368/69), Maghribi scholar-traveler, dictating an account after return",
      dateRange:
        "Travels 1325–1354; East African coastal visit commonly placed c. 1331; written account compiled later with a literary collaborator, Ibn Juzayy",
      originalContext:
        "A rihla (travel account) composed for a courtly Maghribi audience. Ibn Battuta is a visiting Muslim jurist and guest of local elites. He notices piety, hospitality, and sultanic generosity; he is not writing a trade ledger.",
      sourceType: "Travel narrative (text extract from a later dictated account)",
      repository:
        "English: H.A.R. Gibb, trans., Ibn Battuta: Travels in Asia and Africa, 1325–1354 (London: Routledge, 1929), pp. 110–115. 1929 publication is now in the U.S. public domain.",
      translationNotes:
        "Abridged from Gibb’s 1929 translation. Place names in brackets are editorial. The rihla was shaped in recitation; some itinerary details are debated by historians. That does not make the source useless for port practice and reported gold flows.",
      rightsStatus:
        "Public domain (U.S.) for the 1929 Gibb translation used here.",
      academicNote:
        "Strong on how a Muslim visitor experienced Swahili and South Arabian ports. Weak as a complete map of inland producers. “I was told by a merchant” is hearsay and should be labeled as such, not discarded.",
    },
  },
  boccaccioPlague: {
    id: "boccaccioPlague",
    stimulusFamily: "BOCC-1348",
    kind: "primary_extract",
    title: "Giovanni Boccaccio, Decameron — the plague in Florence, 1348",
    excerpt: `I say, then, that the years of the beatific incarnation of the Son of God had reached the tale of one thousand three hundred and forty eight, when in the illustrious city of Florence … there made its appearance that deadly pestilence, which, whether disseminated by the influence of the celestial bodies, or sent upon us mortals by God in His just wrath … had had its origin some years before in the East, whence, after destroying an innumerable multitude of living beings, it had propagated itself without respite from place to place, and so calamitously, had spread into the West.

In Florence, despite all that human wisdom and forethought could devise to avert it, as the cleansing of the city from many impurities … the refusal of entrance to all sick folk, and the adoption of many precautions for the preservation of health … towards the beginning of the spring of the said year the doleful effects of the pestilence began to be horribly apparent …

Moreover, the virulence of the pest was the greater by reason the intercourse was apt to convey it from the sick to the whole … not merely by speech or association with the sick was the malady communicated to the healthy … but any that touched the clothes the sick or aught else that had been touched, or used by these seemed thereby to contract the disease.

… In this extremity of our city’s suffering and tribulation the venerable authority of laws, human and divine, was abased and all but totally dissolved for lack of those who should have administered and enforced them … Whereby every man was free to do what was right in his own eyes.

… this sore affliction entered so deep into the minds of men and women, that in the horror thereof brother was forsaken by brother … and oftentimes husband by wife: nay, what is more, and scarcely to be believed, fathers and mothers were found to abandon their own children … to their fate, as if they had been strangers.`,
    accessibilityText:
      "Boccaccio, writing about Florence in 1348, says a deadly pestilence began in the East years earlier, spread from place to place into the West, overcame city precautions, seemed to pass through contact with the sick and their belongings, and left laws and families unable to hold together.",
    provenance: {
      creator: "Giovanni Boccaccio (1313–1375), Florentine writer",
      dateRange: "Events of 1348; Decameron framed shortly afterward (mid-14th c.)",
      originalContext:
        "A literary frame-story introducing tales told by people who have left plague-stricken Florence. It is both a historical witness and a crafted narrative with moral and literary aims. Boccaccio offers competing explanations (celestial influence, divine wrath) rather than a single medical theory.",
      sourceType: "Literary narrative with contemporary eyewitness claims (text extract)",
      repository:
        "English: The Decameron, trans. J. M. Rigg (London: David Campbell, 1921), Vol. 1, pp. 5–11.",
      translationNotes:
        "Abridged from Rigg’s 1921 translation. Graphic clinical and burial detail is shortened for classroom length; the omitted passages describe tumors, high mortality, and breakdown of funeral custom. Ellipses mark cuts.",
      rightsStatus: "Public domain (Rigg 1921 translation).",
      academicNote:
        "Valuable for how a Western Mediterranean city experienced a pathogen that moved along long-distance routes. It does not by itself prove a single origin point or a unique transmission path. Historians still debate plague phylogeny and the relative role of particular sieges or caravans.",
    },
  },
  monsoonParaphrase: {
    id: "monsoonParaphrase",
    stimulusFamily: "TEACH-MONSOON",
    kind: "teaching_paraphrase",
    paraphraseLabel: "Teaching paraphrase (not a primary-source quotation).",
    title: "Monsoon timing and Indian Ocean cargoes, c. 1200–1450",
    excerpt: `Teaching paraphrase (not a primary-source quotation).

By the period c. 1200–1450, sailors on the western and eastern Indian Ocean timed departures to the seasonal reversal of monsoon winds. A merchant leaving the Red Sea or the Swahili coast for western India generally needed the southwest monsoon; the return used the northeast monsoon. That calendar made transoceanic trips predictable enough to support regular bulk cargoes — grain, timber, and rice as well as horses, metals, and luxury textiles — in a way overland Inner Asian caravans could rarely match for weight.

Predictability did not make outcomes even. A Swahili city-state that taxed gold dust arriving from the African interior, or a South Arabian port that re-exported horses to India, captured commercial revenue and hosted Muslim legal and religious specialists. An inland farming community a month from the coast might sell gold or ivory into that system without becoming a cosmopolitan port, and might encounter the network mainly as a demand for labor, tribute, or goods rather than as a place of mosques and merchant-host customs. The same wind system that enlarged exchange also left some societies beside the route rather than astride it.`,
    accessibilityText:
      "A modern teaching paraphrase explains that monsoon wind reversal made Indian Ocean trips regular enough for bulk and luxury cargoes, but inland producers and coastal ports did not share the same institutions or profits.",
    provenance: {
      creator: "Anannt instructional paraphrase for Unit 2 transfer practice",
      dateRange: "Describes c. 1200–1450; written 2026 for this pilot",
      originalContext:
        "A classroom synthesis of widely attested monsoon sailing and Indian Ocean commercial geography. It is not a quotation from Ibn Battuta, Marco Polo, or any other historical author.",
      sourceType: "Modern teaching paraphrase",
      repository: "Anannt AP World History: Modern, Unit 2 pilot curriculum",
      translationNotes: "Not a translation. Labeled as paraphrase by design.",
      rightsStatus: "Original instructional text for this product.",
      academicNote:
        "Use to practice transfer. Do not cite this paragraph as if it were fourteenth-century testimony.",
    },
  },
  transSaharanParaphrase: {
    id: "transSaharanParaphrase",
    stimulusFamily: "TEACH-SAHARA",
    kind: "teaching_paraphrase",
    paraphraseLabel: "Teaching paraphrase (not a primary-source quotation).",
    title: "Gold, salt, and the Mali Empire’s Sahara corridors",
    excerpt: `Teaching paraphrase (not a primary-source quotation).

Across the Sahara, camel caravans in this period moved West African gold northward and rock salt, copper, and manufactured goods southward. The Mali Empire (thirteenth–fifteenth centuries, with shifting frontiers) did not need to occupy every oasis to profit: it taxed and protected segments of the corridor, and its rulers’ well-attested wealth in gold — including Mansa Musa’s hajj of 1324–25, reported by later Arabic writers — made Mali visible to Mediterranean and Middle Eastern observers.

Islam traveled with scholars, jurists, and merchants along those routes, becoming deeply established in towns such as Timbuktu and in court culture, while many rural producers of gold remained less fully drawn into that literate, congregational world. Exchange here increased because pack animals, oasis wells, and imperial protection lowered the cost of crossing a desert that had long been a barrier. Effects differed because a caravan town, a royal court, and a gold-producing countryside did not occupy the same place in the chain.`,
    accessibilityText:
      "A modern teaching paraphrase states that trans-Saharan camel caravans moved gold and salt, that Mali taxed corridors rather than every oasis, and that Islamic institutions took root more firmly in towns and courts than among all gold producers.",
    provenance: {
      creator: "Anannt instructional paraphrase for Unit 2 comparison and quiz items",
      dateRange: "Describes c. 1200–1450; written 2026 for this pilot",
      originalContext:
        "Classroom synthesis. Mansa Musa’s hajj date follows the conventional 1324–25 placement used by historians; the famous later account of gold flooding Cairo is a separate source tradition and is not quoted here.",
      sourceType: "Modern teaching paraphrase",
      repository: "Anannt AP World History: Modern, Unit 2 pilot curriculum",
      translationNotes: "Not a translation.",
      rightsStatus: "Original instructional text for this product.",
      academicNote:
        "Do not treat this as a primary quotation. It exists so students can practice comparison without a second copyrighted passage.",
    },
  },
};

export const SOURCE_LIST = Object.values(SOURCES);
