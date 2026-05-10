import { EducationModule } from '@/types';

export const EDUCATION_MODULES: EducationModule[] = [
  {
    id: 1,
    title: 'Les 5 Piliers',
    description: 'Les fondements de la pratique islamique',
    icon: '🕌',
    color: '#C9A84C',
    lessons: [
      {
        id: 'l1-1', moduleId: 1, order: 1,
        title: 'La Shahada',
        subtitle: 'Le témoignage de foi',
        content: `La Shahada — « Lâ ilâha illâ Allâh, Muhammadun rasûlu Allâh » — est le premier et le plus fondamental des cinq piliers de l'Islam. Elle signifie : « Il n'y a de dieu qu'Allah, et Muhammad est Son messager. »

Prononcer la Shahada avec conviction sincère (niyya) est l'acte qui fait entrer dans l'Islam. Elle n'est pas simplement une déclaration verbale, mais un engagement profond du cœur, de l'esprit et de l'âme.

La première partie — « Lâ ilâha illâ Allâh » — affirme le Tawhid (unicité divine), pilier central de la théologie islamique. Elle rejette toute forme d'idolâtrie et reconnaît qu'Allah seul mérite d'être adoré.

La seconde partie — « Muhammadun rasûlu Allâh » — reconnaît Muhammad (ﷺ) comme le dernier des prophètes, sceau de la prophétie.`,
        keyPoints: [
          'Première condition pour entrer dans l\'Islam',
          'Doit être prononcée avec conviction sincère',
          'Affirme le Tawhid : unicité absolue de Dieu',
          'Reconnaît Muhammad (ﷺ) comme dernier prophète',
          'Répétée dans chaque appel à la prière (Adhan)',
        ],
        arabicQuote: 'لَا إِلَٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ',
        arabicSource: 'La Shahada',
        duration: 5,
      },
      {
        id: 'l1-2', moduleId: 1, order: 2,
        title: 'La Salat',
        subtitle: 'La prière rituelle — 5 fois par jour',
        content: `La Salat est la prière rituelle obligatoire, accomplie cinq fois par jour : Fajr (aube), Dhuhr (midi), Asr (après-midi), Maghrib (coucher du soleil), Isha (nuit).

Elle constitue un lien direct entre le croyant et Allah. Le Prophète (ﷺ) a dit : « La prière est le pilier de la religion. »

Chaque prière suit un rite précis : purification rituelle (wudu), orientation vers La Mecque (qibla), récitation de la Fatiha et d'autres sourates, positions physiques (qiyam, ruku, sujud).

La prière du vendredi (Jumu'a) a un statut particulier : elle remplace la prière de Dhuhr et est accomplie en congrégation à la mosquée.`,
        keyPoints: [
          '5 prières quotidiennes : Fajr, Dhuhr, Asr, Maghrib, Isha',
          'Précédée du wudu (ablutions)',
          'Orientée vers la Kaaba (qibla)',
          'Prière du vendredi (Jumu\'a) obligatoire en congrégation',
          'Pilier de la religion selon le Prophète (ﷺ)',
        ],
        arabicQuote: 'الصَّلَاةُ عِمَادُ الدِّينِ',
        arabicSource: 'Hadith',
        duration: 6,
      },
      {
        id: 'l1-3', moduleId: 1, order: 3,
        title: 'La Zakat',
        subtitle: 'L\'aumône purificatrice',
        content: `La Zakat est l'aumône obligatoire, troisième pilier de l'Islam. Elle représente 2,5% des économies détenues pendant une année lunaire complète (nisab), à distribuer aux catégories désignées dans le Coran (Sourate At-Tawba, 9:60).

Le mot « Zakat » vient de la racine arabe signifiant « purification » et « croissance ». En donnant, le musulman purifie sa richesse et son âme.

Les 8 catégories de bénéficiaires selon le Coran sont : les pauvres, les nécessiteux, ceux qui collectent la Zakat, ceux dont le cœur est à gagner, les esclaves (pour les libérer), les débiteurs, dans la voie d'Allah, et les voyageurs en difficulté.

La Zakat al-Fitr est une forme spéciale payée avant la prière de l'Aïd al-Fitr, obligatoire pour tout musulman capable.`,
        keyPoints: [
          '2,5% des économies après un an (nisab)',
          'Purifie la richesse et l\'âme',
          '8 catégories de bénéficiaires selon le Coran',
          'Distincte des dons volontaires (Sadaqa)',
          'Zakat al-Fitr avant l\'Aïd al-Fitr',
        ],
        arabicQuote: 'خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا',
        arabicSource: 'Sourate At-Tawba, 9:103',
        duration: 6,
      },
      {
        id: 'l1-4', moduleId: 1, order: 4,
        title: 'Le Sawm',
        subtitle: 'Le jeûne du Ramadan',
        content: `Le Sawm (jeûne) est le quatrième pilier de l'Islam. Durant le mois de Ramadan, tout musulman pubère et capable s'abstient de nourriture, boisson, relations conjugales et tout ce qui rompt le jeûne, du lever au coucher du soleil.

Le Ramadan est le mois de la révélation du Coran. La nuit de la première révélation, Laylat al-Qadr (« Nuit du Destin »), vaut mieux que mille mois selon le Coran.

Au-delà de l'abstinence physique, le jeûne est une purification spirituelle : contrôle de soi, gratitude, empathie envers les pauvres, intensification de la dévotion.

La rupture quotidienne du jeûne (iftar) est une joie partagée, souvent commencée par une datte et de l'eau, en suivant la Sunna du Prophète (ﷺ). Le repas avant l'aube (suhur) est béni selon le Hadith.`,
        keyPoints: [
          'Jeûne du lever au coucher du soleil',
          'Mois de la révélation du Coran',
          'Laylat al-Qadr : nuit meilleure que mille mois',
          'Iftar : rupture traditionnellement avec dattes',
          'Suhur : repas avant l\'aube recommandé',
        ],
        arabicQuote: 'شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ',
        arabicSource: 'Sourate Al-Baqara, 2:185',
        duration: 7,
      },
      {
        id: 'l1-5', moduleId: 1, order: 5,
        title: 'Le Hajj',
        subtitle: 'Le pèlerinage à La Mecque',
        content: `Le Hajj est le cinquième pilier de l'Islam, pèlerinage à La Mecque obligatoire une fois dans la vie pour tout musulman qui en a la capacité physique et financière.

Il se déroule du 8 au 13 Dhul Hijja et comprend : le tawaf (circumambulation de la Kaaba), la marche entre Safa et Marwa (Sa'i), la station sur le mont Arafat (9 Dhul Hijja), la lapidation symbolique du diable à Mina.

Le Hajj commémore les épreuves d'Ibrahim (Abraham), de son fils Ismaïl et de Hajar. La Kaaba, que les musulmans croient avoir été construite par Ibrahim et Ismaïl, est le point focal de la prière mondiale.

L'Aïd al-Adha (fête du sacrifice) marque la fin du Hajj et est célébrée par tous les musulmans, même ceux qui ne sont pas à La Mecque.`,
        keyPoints: [
          'Obligatoire une fois pour ceux qui en ont la capacité',
          'Du 8 au 13 Dhul Hijja (12e mois lunaire)',
          'Tawaf : 7 circumambulations autour de la Kaaba',
          'Station d\'Arafat : cœur spirituel du Hajj',
          'Commémore les épreuves d\'Ibrahim (ع)',
        ],
        arabicQuote: 'وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا',
        arabicSource: 'Sourate Al-Imran, 3:97',
        duration: 8,
      },
    ],
  },
  {
    id: 2,
    title: '99 Noms d\'Allah',
    description: 'Al-Asma ul-Husna — Les Beaux Noms divins',
    icon: '✨',
    color: '#4A7FA5',
    lessons: [
      {
        id: 'l2-1', moduleId: 2, order: 1,
        title: 'Introduction aux 99 Noms',
        subtitle: 'Al-Asma ul-Husna',
        content: `Le Prophète Muhammad (ﷺ) a dit : « Allah possède 99 noms. Quiconque les dénombre entrera au Paradis. » (Sahih Bukhari)

Les 99 Noms d'Allah (Al-Asma ul-Husna) décrivent les attributs divins. Ils se divisent en attributs de majesté (Jalal) et attributs de beauté (Jamal).

Contempler ces noms est une forme de dhikr (invocation) profonde. Chaque nom révèle un aspect de la nature divine et guide le croyant vers une relation plus intime avec Allah.

Les Noms ont été transmis principalement par le Hadith et le Coran. Ils couvrent des attributs comme la Miséricorde (Ar-Rahman, Ar-Rahim), la Puissance (Al-Qadir), la Science (Al-Alim), la Beauté (Al-Jamil).`,
        keyPoints: [
          '99 noms selon le Hadith authentique (Bukhari)',
          'Divisés en Jalal (majesté) et Jamal (beauté)',
          'Dhikr : les invoquer est un acte d\'adoration',
          'Chaque nom révèle un attribut divin',
          'Commencer par Ar-Rahman et Ar-Rahim (les plus cités)',
        ],
        arabicQuote: 'وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا',
        arabicSource: 'Sourate Al-A\'raf, 7:180',
        duration: 5,
      },
      {
        id: 'l2-2', moduleId: 2, order: 2,
        title: 'Ar-Rahman & Ar-Rahim',
        subtitle: 'Le Tout-Miséricordieux, le Très-Miséricordieux',
        content: `Ar-Rahman (الرَّحْمَن) et Ar-Rahim (الرَّحِيم) sont les deux noms les plus fréquemment cités dans le Coran, présents dans la Basmala (« Bismillah ir-Rahman ir-Rahim ») qui ouvre chaque sourate.

Ar-Rahman désigne la miséricorde universelle d'Allah qui englobe toutes les créatures, croyants et non-croyants, dans ce monde.

Ar-Rahim désigne la miséricorde spéciale réservée aux croyants dans l'au-delà.

Ces deux noms partagent la racine r-h-m (رحم), liée au mot « womb » (utérus en arabe : rahm), évoquant la tendresse maternelle que Dieu porte à Sa création. Le Prophète (ﷺ) a dit : « Allah a plus de tendresse pour Ses serviteurs que cette mère pour son enfant. »`,
        keyPoints: [
          'Ar-Rahman : miséricorde universelle (ce monde)',
          'Ar-Rahim : miséricorde spéciale (au-delà)',
          'Partagent la racine r-h-m (tendresse, utérus)',
          'Présents dans la Basmala prononcée 114 fois dans le Coran',
          'Dieu plus miséricordieux qu\'une mère selon le Hadith',
        ],
        arabicQuote: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        arabicSource: 'La Basmala — ouverture du Coran',
        duration: 5,
      },
      {
        id: 'l2-3', moduleId: 2, order: 3,
        title: 'Al-Hayy & Al-Qayyum',
        subtitle: 'Le Vivant, Celui qui subsiste par Lui-même',
        content: `Al-Hayy (الْحَيُّ) — Le Vivant Éternel — désigne la vie absolue et parfaite d'Allah, sans début ni fin, sans dépendance à quoi que ce soit.

Al-Qayyum (الْقَيُّومُ) — Celui qui subsiste par Lui-même et fait subsister tout — désigne le fait qu'Allah soutient toute l'existence. Sans Sa volonté, rien ne pourrait exister une seule seconde.

Ces deux noms apparaissent ensemble dans l'Ayat al-Kursi (verset du Trône, 2:255), considéré comme le plus grand verset du Coran. Le Prophète (ﷺ) a mentionné que ces deux noms constituent le Grand Nom d'Allah (Ism Allah al-A'zam).

Invoquer ces noms dans la prière et le dhikr est particulièrement recommandé.`,
        keyPoints: [
          'Al-Hayy : vie absolue, éternelle, sans dépendance',
          'Al-Qayyum : fait subsister toute la création',
          'Apparaissent dans l\'Ayat al-Kursi (2:255)',
          'Considérés comme faisant partie du Grand Nom d\'Allah',
          'Invoquer : « Ya Hayyu ya Qayyum, bi rahmatika astagith »',
        ],
        arabicQuote: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
        arabicSource: 'Ayat al-Kursi — Sourate Al-Baqara, 2:255',
        duration: 6,
      },
      {
        id: 'l2-4', moduleId: 2, order: 4,
        title: 'Al-Ghafur & At-Tawwab',
        subtitle: 'Le Grand Pardonneur, Celui qui agrée le repentir',
        content: `Al-Ghafur (الْغَفُورُ) — Le Grand Pardonneur — vient de la racine gh-f-r qui évoque le fait de couvrir et protéger. Allah couvre les péchés de Ses serviteurs, ne les exposant pas.

At-Tawwab (التَّوَّابُ) — Celui qui agrée constamment le repentir — exprime la réceptivité d'Allah au retour sincère de Son serviteur. La forme intensive (faa'al) indique qu'Il accepte le tawba (repentir) à répétition, sans limite.

Le Coran répète : « Dis : Ô Mes serviteurs qui avez commis des excès contre vous-mêmes, ne désespérez pas de la miséricorde d'Allah. » (39:53)

L'invocation « Astaghfiru Allah » (Je demande pardon à Allah) est la plus courante du repentir quotidien.`,
        keyPoints: [
          'Al-Ghafur : couvre les péchés, ne les expose pas',
          'At-Tawwab : accepte le repentir sans limite de fois',
          'La porte du repentir reste ouverte jusqu\'au dernier souffle',
          'Istighfar : « Astaghfiru Allah » — pratique quotidienne',
          'Le Prophète (ﷺ) faisait istighfar 70-100 fois par jour',
        ],
        arabicQuote: 'وَإِنِّي لَغَفَّارٌ لِّمَن تَابَ وَآمَنَ وَعَمِلَ صَالِحًا',
        arabicSource: 'Sourate Ta-Ha, 20:82',
        duration: 5,
      },
      {
        id: 'l2-5', moduleId: 2, order: 5,
        title: 'Al-Wadud & Al-Karim',
        subtitle: 'Le Très Aimant, le Généreux',
        content: `Al-Wadud (الْوَدُودُ) — Le Très Aimant — décrit l'amour pur et tendre d'Allah pour Ses créatures. Ce nom vient de la racine w-d-d qui désigne l'affection profonde et la tendresse.

Al-Karim (الْكَرِيمُ) — Le Généreux Noble — décrit la générosité sans limites d'Allah qui donne sans attendre de retour, qui pardonne sans nécessité, qui honore sans mérite de la part de Sa création.

Ces deux noms, lus ensemble, peignent un portrait d'un Dieu qui aime et donne par nature, non par obligation. Ibn al-Qayyim al-Jawziyya a écrit : « Connaître Allah par Ses noms Al-Wadud et Al-Karim est la source de tout bonheur du cœur. »`,
        keyPoints: [
          'Al-Wadud : amour divin pur, tendre, inconditionnel',
          'Al-Karim : générosité absolue, sans attente de retour',
          'L\'amour d\'Allah précède Sa colère (Hadith)',
          'Ibn al-Qayyim : ces noms sont source de bonheur intérieur',
          'Dhikr : « Ya Wadud, ya Karim » — pour l\'apaisement',
        ],
        arabicQuote: 'وَهُوَ الْغَفُورُ الْوَدُودُ',
        arabicSource: 'Sourate Al-Buruj, 85:14',
        duration: 5,
      },
    ],
  },
  {
    id: 3,
    title: 'Les Prophètes',
    description: '25 prophètes mentionnés dans le Coran',
    icon: '📖',
    color: '#5A8A5A',
    lessons: [
      {
        id: 'l3-1', moduleId: 3, order: 1,
        title: 'Adam (ع) — Le Premier Homme',
        subtitle: 'Père de l\'humanité, premier prophète',
        content: `Adam (ع) est le premier être humain et le premier prophète selon l'Islam. Il a été créé par Allah directement, sans père ni mère, à partir d'argile (Sourate Al-Hijr, 15:26).

Allah lui a insufflé Son esprit et lui a enseigné les noms de toutes choses — symbole de la connaissance donnée à l'humanité. Les anges furent ordonnés de se prosterner devant Adam, tous obéirent sauf Iblis (Satan), qui se révolta par orgueil.

Adam et Hawa (Ève) vécurent au Paradis mais furent tentés et mangèrent du fruit défendu. Ils se repentirent sincèrement et Allah leur pardonna. Leur descente sur terre n'est pas une malédiction mais le début de la mission humaine de khalifa (vicaire de Dieu sur terre).

Le récit d'Adam enseigne la miséricorde divine, la réalité du repentir et la dignité humaine.`,
        keyPoints: [
          'Premier humain et premier prophète',
          'Créé d\'argile, Allah lui a insufflé Son esprit',
          'Enseigné les noms de toutes choses',
          'Repentir d\'Adam : modèle d\'istighfar sincère',
          'Mission de khalifa : vicaire de Dieu sur terre',
        ],
        arabicQuote: 'وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً',
        arabicSource: 'Sourate Al-Baqara, 2:30',
        duration: 6,
      },
      {
        id: 'l3-2', moduleId: 3, order: 2,
        title: 'Ibrahim (ع) — Le Père des Prophètes',
        subtitle: 'Khalilullah — L\'ami d\'Allah',
        content: `Ibrahim (ع) est l'un des prophètes les plus importants de l'Islam, surnommé « Khalilullah » (l'ami d'Allah) et considéré comme l'ancêtre spirituel des trois religions abrahamiques.

Né à Ur (Irak actuel), il remit en question l'idolâtrie de sa société dès son jeune âge. Après avoir brisé les idoles du temple de son peuple, il fut condamné au feu — qu'Allah rendit froid et pacifique pour lui.

Il émigra vers la terre sainte (Canaan), puis vers la Mecque où il construisit la Kaaba avec son fils Ismaïl. L'épreuve la plus dure fut l'ordre divin de sacrifier Ismaïl, à laquelle Ibrahim obéit et qu'Allah substitua par un bélier.

Le Hajj reproduit en partie les pérégrinations d'Ibrahim et de sa famille.`,
        keyPoints: [
          'Khalilullah : ami d\'Allah (titre unique dans le Coran)',
          'Père d\'Ismaïl (ancêtre des Arabes) et Ishaq (Isaïe)',
          'Constructeur de la Kaaba avec Ismaïl',
          'Épreuve du sacrifice : modèle de soumission totale',
          'Fondateur de la tradition du Hajj',
        ],
        arabicQuote: 'وَاتَّخَذَ اللَّهُ إِبْرَاهِيمَ خَلِيلًا',
        arabicSource: 'Sourate An-Nisa, 4:125',
        duration: 7,
      },
      {
        id: 'l3-3', moduleId: 3, order: 3,
        title: 'Musa (ع) — Le Prophète de la Torah',
        subtitle: 'Kalimullah — Celui à qui Allah a parlé',
        content: `Musa (ع) — Moïse — est le prophète le plus cité dans le Coran (136 fois) et celui à qui Allah a parlé directement, d'où son titre « Kalimullah ».

Né en Égypte à une époque où le Pharaon massacrait les nouveau-nés israélites, il fut sauvé providentiellement et élevé au palais royal. Après avoir tué accidentellement un Égyptien, il s'enfuit au pays de Madian où il reçut la prophétie au Buisson Ardent du mont Sinaï.

Sa mission principale : libérer les Enfants d'Israël de l'esclavage du Pharaon. Les 10 plaies d'Égypte et la traversée de la mer Rouge sont parmi les miracles les plus célèbres de l'Islam. Il reçut la Torah sur le mont Sinaï.

Musa est considéré comme un modèle de combativité au service de la justice.`,
        keyPoints: [
          'Le plus cité dans le Coran : 136 mentions',
          'Kalimullah : Allah lui a parlé directement',
          'Prophétie au Buisson Ardent (mont Sinaï)',
          'Mission : libérer les Enfants d\'Israël',
          'Réceptionnaire de la Torah',
        ],
        arabicQuote: 'وَكَلَّمَ اللَّهُ مُوسَىٰ تَكْلِيمًا',
        arabicSource: 'Sourate An-Nisa, 4:164',
        duration: 7,
      },
      {
        id: 'l3-4', moduleId: 3, order: 4,
        title: 'Isa (ع) — Le Messie dans l\'Islam',
        subtitle: 'Ruhullah — L\'esprit d\'Allah',
        content: `Isa (ع) — Jésus — est l'un des plus grands prophètes de l'Islam, né miraculeusement de la Vierge Maryam sans père, par le commandement divin « Kun fayakun » (Sois, et cela est).

Le Coran lui accorde des titres uniques : Al-Masih (le Messie), Kalimatullah (Parole d'Allah), Ruhullah (Esprit d'Allah). Il accomplit de nombreux miracles : guérir les malades, ressusciter les morts, parler depuis son berceau.

L'Islam rejette sa divinité et sa crucifixion telle qu'entendue : « Ils ne l'ont pas tué, ni crucifié, mais il leur a semblé ainsi. » (4:157). Il fut élevé vers Allah.

Isa reviendra à la fin des temps, descendra à Damas et gouvernera selon la Sharia islamique. Sa venue est un signe majeur du Jour du Jugement.`,
        keyPoints: [
          'Né de Maryam sans père — miracle divin',
          'Titres : Al-Masih, Kalimatullah, Ruhullah',
          'N\'est pas divin selon l\'Islam (Tawhid)',
          'Non crucifié selon le Coran (4:157)',
          'Reviendra à la fin des temps',
        ],
        arabicQuote: 'إِنَّمَا الْمَسِيحُ عِيسَى ابْنُ مَرْيَمَ رَسُولُ اللَّهِ وَكَلِمَتُهُ',
        arabicSource: 'Sourate An-Nisa, 4:171',
        duration: 7,
      },
      {
        id: 'l3-5', moduleId: 3, order: 5,
        title: 'Muhammad (ﷺ) — Le Sceau des Prophètes',
        subtitle: 'Khatam an-Nabiyyin',
        content: `Muhammad ibn Abdallah (ﷺ) est le dernier et le sceau des prophètes (Khatam an-Nabiyyin), né à La Mecque vers 570 de l'ère chrétienne dans la tribu des Quraychites.

Orphelin élevé par son grand-père puis son oncle Abu Talib, il était connu pour son honnêteté et sa droiture (Al-Amin — le Digne de confiance). À 40 ans, il reçut la première révélation dans la grotte de Hira : « Iqra' » (Lis !).

Pendant 23 ans, il reçut le Coran et transmit la Sunna (sa voie exemplaire). Il transforma l'Arabie idolâtre en une civilisation monothéiste et fonda la première communauté islamique à Médine.

Sa vie (Sira) est le modèle ultime du musulman. Ses paroles et actes (Hadith) constituent la seconde source de la loi islamique après le Coran.`,
        keyPoints: [
          'Né à La Mecque vers 570, orphelin élevé par son clan',
          'Al-Amin : titre de digne de confiance avant la prophétie',
          'Première révélation dans la grotte de Hira à 40 ans',
          'Sceau des prophètes : pas de prophète après lui',
          'Sunna : sa voie est modèle pour tout musulman',
        ],
        arabicQuote: 'مَّا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِّن رِّجَالِكُمْ وَلَٰكِن رَّسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ',
        arabicSource: 'Sourate Al-Ahzab, 33:40',
        duration: 8,
      },
    ],
  },
  {
    id: 4,
    title: 'Histoire du Coran',
    description: 'Révélation, compilation et transmission',
    icon: '📜',
    color: '#7A5A9A',
    lessons: [
      {
        id: 'l4-1', moduleId: 4, order: 1,
        title: 'La Révélation',
        subtitle: 'Comment le Coran a été révélé',
        content: `Le Coran fut révélé sur une période de 23 ans (610-632), en deux grandes phases : la période mecquoise (13 ans) et la période médinoise (10 ans).

La révélation se faisait principalement par l'ange Jibrîl (Gabriel), qui transmettait les versets au Prophète (ﷺ). Le mode de révélation variait : parfois comme le tintement d'une cloche, parfois sous forme humaine.

Les versets mecquois portent principalement sur le Tawhid (unicité divine), le Jour du Jugement et les récits des prophètes. Les versets médinois traitent des aspects juridiques, sociaux et organisationnels de la communauté musulmane.

La nuit de Laylat al-Qadr (dans les derniers dix jours de Ramadan) marque la nuit de la première révélation, appelée « meilleure que mille mois » dans le Coran.`,
        keyPoints: [
          '23 ans de révélation (610-632 EC)',
          'Transmis par l\'ange Jibrîl au Prophète (ﷺ)',
          'Mecquois : Tawhid, Jugement, Prophètes',
          'Médinois : loi, communauté, relations sociales',
          'Laylat al-Qadr : nuit de la première révélation',
        ],
        arabicQuote: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ',
        arabicSource: 'Sourate Al-Qadr, 97:1',
        duration: 6,
      },
      {
        id: 'l4-2', moduleId: 4, order: 2,
        title: 'La Compilation',
        subtitle: 'Du Prophète au Mushaf officiel',
        content: `Du vivant du Prophète (ﷺ), le Coran était mémorisé par de nombreux Compagnons (Huffaz) et écrit sur divers supports (os, feuilles de palmier, pierres plates).

Après la bataille de Yamama (632), où de nombreux hafiz tombèrent, le Calife Abu Bakr ordonna la première compilation écrite, confiée à Zayd ibn Thabit, secrétaire du Prophète.

Sous le Calife Uthman (644-656), face aux variantes de récitation, une commission standardisa le texte en un codex unique (Mushaf Uthmani), envoyé dans les grandes villes de l'empire. Les copies non conformes furent brûlées.

Cette compilation est le texte coranique que nous lisons aujourd'hui, transmis par chaîne ininterrompue (tawatur) depuis les Compagnons.`,
        keyPoints: [
          'Mémorisé et écrit du vivant du Prophète (ﷺ)',
          'Première compilation : Abu Bakr → Zayd ibn Thabit',
          'Mushaf Uthmani : standardisation sous Uthman',
          'Transmis par tawatur : chaîne ininterrompue',
          'Identique dans le monde entier depuis 1400 ans',
        ],
        arabicQuote: 'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ',
        arabicSource: 'Sourate Al-Hijr, 15:9',
        duration: 6,
      },
      {
        id: 'l4-3', moduleId: 4, order: 3,
        title: 'Structure du Coran',
        subtitle: '114 sourates, 6236 versets',
        content: `Le Coran se compose de 114 sourates (chapitres), allant de la plus longue (Al-Baqara : 286 versets) à la plus courte (Al-Kawthar : 3 versets). Le total est d'environ 6236 versets (ayas).

Les sourates sont classées non pas dans l'ordre de révélation mais selon une organisation thématique et traditionnelle. Les plus longues sont généralement au début, les plus courtes à la fin.

Chaque sourate, sauf At-Tawba, commence par la Basmala. Chaque sourate porte un nom évocateur : Al-Fatiha (l'Ouverture), Ya-Sin (cœur du Coran), Al-Ikhlas (la Sincérité — équivalant au tiers du Coran selon le Hadith).

Le Coran est divisé en 30 parties égales (Juz') pour faciliter la lecture complète en un mois (pendant Ramadan notamment).`,
        keyPoints: [
          '114 sourates, ~6236 versets (ayas)',
          'Ordre non chronologique : tradition prophétique',
          'Basmala ouvre chaque sourate (sauf At-Tawba)',
          '30 Juz\' pour lecture en un mois',
          'Al-Ikhlas = tiers du Coran selon le Hadith',
        ],
        arabicQuote: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        arabicSource: 'Sourate Al-Ikhlas, 112:1 — équivalant au tiers du Coran',
        duration: 5,
      },
      {
        id: 'l4-4', moduleId: 4, order: 4,
        title: 'Les Sciences du Coran',
        subtitle: 'Ulum al-Quran',
        content: `Les Sciences du Coran (Ulum al-Quran) constituent un corpus académique immense développé par les savants musulmans pour comprendre et interpréter le texte sacré.

Les principales sciences comprennent : le Tafsir (exégèse), l'Asbab an-Nuzul (circonstances de révélation), le Nasikh wal-Mansukh (abrogation), la Qiraat (modes de récitation), l'I'jaz (caractère inimitable du Coran).

Les grandes traditions de Tafsir incluent : Tafsir Ibn Kathir (méthode par la narration), Tafsir al-Tabari (le plus exhaustif), Tafsir al-Jalalayn (le plus accessible), et de nombreuses œuvres modernes.

L'I'jaz al-Quran — l'inimitabilité du Coran — est la preuve que le texte ne peut être d'origine humaine, basée sur ses aspects linguistiques, scientifiques et prophétiques.`,
        keyPoints: [
          'Tafsir : exégèse — science d\'interprétation',
          'Asbab an-Nuzul : circonstances de chaque révélation',
          'Nasikh wal-Mansukh : versets qui abrogent ou sont abrogés',
          '10 modes de récitation (Qiraat) authentiques',
          'I\'jaz : inimitabilité du Coran — preuve divine',
        ],
        arabicQuote: 'أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ',
        arabicSource: 'Sourate An-Nisa, 4:82',
        duration: 7,
      },
      {
        id: 'l4-5', moduleId: 4, order: 5,
        title: 'La Récitation et la Mémorisation',
        subtitle: 'Tajwid et Hifz',
        content: `La récitation coranique est régie par le Tajwid — science des règles de prononciation. Apprendre le Tajwid est un devoir collectif (fard kifaya) selon les savants.

Les principales règles incluent : le madd (allongement), les gunnah (nasalisation), l'ikhfa (assimilation), les qalqalah (sons rebondissants). La récitation belle et correcte est un acte d'adoration.

La mémorisation complète du Coran (Hifz) est une tradition bénie : le Hafiz est honoré dans l'Islam. Le Prophète (ﷺ) a dit : « Le meilleur d'entre vous est celui qui apprend le Coran et l'enseigne. »

Les grandes traditions de récitation (Qiraat) incluent : Hafs 'an 'Asim (la plus répandue dans le monde arabe), Warsh 'an Nafi' (Afrique du Nord), Qalun 'an Nafi'.`,
        keyPoints: [
          'Tajwid : science des règles de récitation',
          'Hifz : mémorisation complète — tradition bénie',
          '10 modes de Qiraat authentiques',
          'Hafs : mode le plus répandu mondialement',
          'Chaque lettre correctement récitée = 10 bonnes actions',
        ],
        arabicQuote: 'وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا',
        arabicSource: 'Sourate Al-Muzzammil, 73:4',
        duration: 6,
      },
    ],
  },
  {
    id: 5,
    title: 'Fiqh de Base',
    description: 'Halal, haram, purification et obligations',
    icon: '⚖️',
    color: '#A5664A',
    lessons: [
      {
        id: 'l5-1', moduleId: 5, order: 1,
        title: 'Sources du Fiqh',
        subtitle: 'Coran, Sunna, Ijma\', Qiyas',
        content: `Le Fiqh (jurisprudence islamique) dérive de quatre sources principales, dans l'ordre de priorité : le Coran, la Sunna (Hadith), l'Ijma' (consensus des savants) et le Qiyas (raisonnement par analogie).

Le Coran contient environ 500 versets à caractère juridique direct. La Sunna — paroles, actes et approbations tacites du Prophète (ﷺ) — comble les lacunes du Coran et précise ses généralités.

L'Ijma' est le consensus des savants d'une époque sur une question juridique. Le Qiyas permet d'étendre les règles existantes à des situations nouvelles par analogie.

Les grandes écoles juridiques (Madhab) — Hanafite, Malikite, Chafiite, Hanbalite — interprètent ces sources avec des méthodologies légèrement différentes, toutes reconnues comme valides (Sunni).`,
        keyPoints: [
          '4 sources : Coran → Sunna → Ijma\' → Qiyas',
          '~500 versets coraniques à caractère juridique',
          '4 Madhabs sunnites : Hanafi, Maliki, Chafi\'i, Hanbali',
          'Ikhtilaf (divergence) = miséricorde pour la communauté',
          'Ijtihad : effort d\'interprétation des savants qualifiés',
        ],
        arabicQuote: 'مَن يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ',
        arabicSource: 'Hadith, Sahih Bukhari',
        duration: 6,
      },
      {
        id: 'l5-2', moduleId: 5, order: 2,
        title: 'La Purification',
        subtitle: 'Tahara — Wudu, Ghusl, Tayammum',
        content: `La Tahara (purification) est la condition sine qua non de la prière. Il existe trois niveaux : le Wudu (ablutions mineures), le Ghusl (grand bain rituel) et le Tayammum (purification sèche avec terre en l'absence d'eau).

Le Wudu comprend : intention, lavage des mains, rinçage de la bouche et du nez, visage, avant-bras, tête (masih), oreilles, pieds. Il est invalidé par : sommeil profond, contacts intimes, saignements importants, etc.

Le Ghusl est obligatoire après les rapports conjugaux, la menstruation, les lochies post-partum et la mort. Il purge la janaba (impureté majeure).

Le Tayammum remplace le wudu et le ghusl quand l'eau est absente ou son utilisation nuisible à la santé. Il se fait avec de la terre pure.`,
        keyPoints: [
          'Tahara : condition de validité de la prière',
          'Wudu : ablutions mineures — 6 étapes obligatoires',
          'Ghusl : après rapports, menstruation, mort',
          'Tayammum : purification à la terre en l\'absence d\'eau',
          '« La purification est la moitié de la foi » (Hadith)',
        ],
        arabicQuote: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ',
        arabicSource: 'Sourate Al-Ma\'ida, 5:6',
        duration: 7,
      },
      {
        id: 'l5-3', moduleId: 5, order: 3,
        title: 'Halal et Haram',
        subtitle: 'Le licite et l\'illicite',
        content: `La règle de base en Islam est que tout est halal (permis) sauf ce qui est explicitement haram (interdit). Cette règle s'applique aux aliments, boissons, transactions, comportements.

Aliments haram : porc et dérivés, sang, animaux morts sans abattage rituel, prédateurs à crocs, oiseaux à serres, alcool et drogues, tout ce qui est abattu au nom d'autres qu'Allah.

L'abattage halal (dhabh) requiert : l'animal doit être vivant et sain, abattu par un musulman, avec l'invocation de Bismillah, par tranchage de la jugulaire.

Le concept de Makruh (détestable mais non interdit) et Mustahabb (recommandé) enrichissent le spectre moral. Le Mashbouh (douteux) doit être évité : « Le licite est clair, l'illicite est clair, et entre eux il y a des choses douteuses. » (Hadith).`,
        keyPoints: [
          'Règle de base : tout est permis sauf l\'explicitement interdit',
          'Haram alimentaire : porc, sang, alcool, charogne',
          'Abattage halal : Bismillah + jugulaire tranchée',
          'Makruh : détestable mais non interdit',
          'Mashbouh (douteux) : à éviter par précaution',
        ],
        arabicQuote: 'الْحَلَالُ بَيِّنٌ وَالْحَرَامُ بَيِّنٌ وَبَيْنَهُمَا أُمُورٌ مُشْتَبِهَاتٌ',
        arabicSource: 'Hadith, Sahih Bukhari',
        duration: 6,
      },
      {
        id: 'l5-4', moduleId: 5, order: 4,
        title: 'Le Mariage Islamique',
        subtitle: 'Nikah — Droit, obligations, dissolution',
        content: `Le mariage (Nikah) est fortement recommandé (Sunna) dans l'Islam : « Le mariage est de ma Sunna. Celui qui se détourne de ma Sunna n'est pas de moi. » (Hadith)

Les conditions de validité du Nikah sont : consentement des deux époux, présence du wali (tuteur) de la femme, deux témoins masculins, mahr (dot) offert à l'épouse par l'époux.

Le mahr est un droit absolu de l'épouse. Les droits et devoirs sont réciproques : l'époux assure la qiwama (protection et subsistance), l'épouse a droit à la fidélité et au traitement équitable.

La polygamie (jusqu'à 4 épouses) est permise sous conditions strictes d'équité totale, jugée par la plupart des savants modernes quasi impossible à réaliser. Le divorce (talaq) est permis mais « la chose la plus détestée d'Allah parmi les choses licites » (Hadith).`,
        keyPoints: [
          '4 conditions : consentement, wali, témoins, mahr',
          'Mahr : dot obligatoire et droit absolu de l\'épouse',
          'Qiwama : responsabilité de l\'époux',
          'Polygamie : permise sous condition d\'équité totale',
          'Talaq : licite mais très déconseillé',
        ],
        arabicQuote: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا',
        arabicSource: 'Sourate Ar-Rum, 30:21',
        duration: 7,
      },
      {
        id: 'l5-5', moduleId: 5, order: 5,
        title: 'Finance Islamique',
        subtitle: 'Riba, Zakat, transactions licites',
        content: `La finance islamique repose sur l'interdiction du riba (intérêt/usure), de la gharar (spéculation excessive) et du maysir (jeu de hasard), et exige des transactions adossées à des actifs réels.

Le riba est explicitement interdit dans quatre versets coraniques. Allah a « déclaré la guerre » à ceux qui pratiquent le riba (2:279). Il englobe tout gain garanti sans risque sur le capital prêté.

Les contrats islamiques alternatifs : murabaha (vente à profit transparent), musharaka (participation aux bénéfices et pertes), mudaraba (commandite islamique), ijara (crédit-bail), sukuk (obligations islamiques).

La Zakat (2,5% des économies), le waqf (fondation pieuse) et les dons Sadaqa constituent le système de redistribution des richesses islamique.`,
        keyPoints: [
          'Riba interdit : 4 versets coraniques explicites',
          'Gharar : spéculation excessive interdite',
          'Murabaha : alternative au prêt immobilier',
          'Sukuk : alternative aux obligations conventionnelles',
          'Waqf : fondation perpétuelle — outil de bienfaisance',
        ],
        arabicQuote: 'وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا',
        arabicSource: 'Sourate Al-Baqara, 2:275',
        duration: 7,
      },
    ],
  },
  {
    id: 6,
    title: 'Grandes Figures',
    description: 'Compagnons du Prophète et savants',
    icon: '🌟',
    color: '#3A7A6A',
    lessons: [
      {
        id: 'l6-1', moduleId: 6, order: 1,
        title: 'Abu Bakr as-Siddiq (رض)',
        subtitle: 'Le Véridique — Premier Calife',
        content: `Abu Bakr Abdallah ibn Abi Quhafa (573-634) est le plus proche Compagnon du Prophète (ﷺ) et le premier Calife de l'Islam. Son titre « as-Siddiq » (le Véridique) lui fut donné après avoir immédiatement cru au Voyage nocturne (Isra' Mi'raj).

Il fut le premier adulte libre à se convertir à l'Islam. Il accompagna le Prophète lors de l'Hégire (migration vers Médine en 622), caché dans la grotte de Thawr pendant trois jours.

Son califat (632-634) fut marqué par la gestion de l'apostasie post-prophétique (Ridda), la compilation du Coran et l'expansion de l'Islam en Perse et en Syrie.

Abu Bakr est universellement considéré comme le meilleur être humain après les prophètes.`,
        keyPoints: [
          'Premier Calife (632-634)',
          'As-Siddiq : premier à croire à l\'Isra\' Mi\'raj',
          'Compagnon de l\'Hégire dans la grotte de Thawr',
          'Ordonna la première compilation écrite du Coran',
          'Vainquit la ridda (apostasie) après la mort du Prophète',
        ],
        arabicQuote: 'لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا',
        arabicSource: 'Paroles du Prophète à Abu Bakr dans la grotte — Sourate At-Tawba, 9:40',
        duration: 6,
      },
      {
        id: 'l6-2', moduleId: 6, order: 2,
        title: 'Umar ibn al-Khattab (رض)',
        subtitle: 'Al-Faruq — Second Calife',
        content: `Umar ibn al-Khattab (584-644) est le second Calife et l'une des figures les plus marquantes de l'Islam. Son titre « Al-Faruq » (celui qui distingue le vrai du faux) lui fut donné par le Prophète.

Sa conversion à l'Islam — d'ennemi juré à ardent défenseur — est l'une des plus dramatiques. Selon la tradition, il se convertit en 615 après avoir entendu sa sœur réciter des versets du Coran.

Son califat (634-644) vit la plus grande expansion territoriale de l'Islam : conquête de la Perse sassanide, de l'Égypte byzantine, de la Palestine. Il établit des institutions étatiques et introduit le calendrier islamique (Hijri).

Umar était connu pour son équité, son ascèse et sa défense des opprimés. Sa mort par assassinat (644) marqua une rupture dans l'histoire islamique.`,
        keyPoints: [
          'Second Calife (634-644)',
          'Al-Faruq : distingue le vrai du faux',
          'Conquest de la Perse, Égypte, Palestine',
          'Introduisit le calendrier hijri (622 = an 1)',
          'Connu pour son ascèse extrême et sa justice',
        ],
        arabicQuote: 'عَلَيْكُمْ بِالصِّدْقِ فَإِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ',
        arabicSource: 'Hadith du Prophète (ﷺ)',
        duration: 6,
      },
      {
        id: 'l6-3', moduleId: 6, order: 3,
        title: 'Aisha bint Abi Bakr (رض)',
        subtitle: 'Mère des Croyants, grande savante',
        content: `Aisha bint Abi Bakr (614-678), épouse du Prophète (ﷺ) et fille d'Abu Bakr, est l'une des plus grandes savantes de l'Islam. Un quart de la jurisprudence islamique passe par elle selon les savants.

Elle est la source de plus de 2000 hadiths et corrigea plusieurs Compagnons dans leurs rapports de hadiths. Sa connaissance du Coran, de la médecine, de la poésie et de l'histoire de l'Arabie était encyclopédique.

Sa chambre était accolée à la mosquée prophétique de Médine. Après la mort du Prophète, elle devint une référence pour toute la communauté. Des milliers de Compagnons et de Suivants vinrent s'instruire auprès d'elle.

Son exemple brise le mythe d'une invisibilité des femmes dans l'Islam classique : elle dirigeait, enseignait, et même prit part à des affaires politiques.`,
        keyPoints: [
          'Source de +2000 hadiths authentiques',
          'Un quart du fiqh islamique passe par elle',
          'Corrigea des Compagnons dans leurs hadiths',
          'Savante en médecine, poésie, généalogie arabe',
          'Référence et enseignante de toute la communauté post-prophétique',
        ],
        arabicQuote: 'تَعَلَّمُوا نِصْفَ دِينِكُمْ مِنَ الْحُمَيْرَاء',
        arabicSource: 'Paroles attribuées au Prophète sur Aisha',
        duration: 6,
      },
      {
        id: 'l6-4', moduleId: 6, order: 4,
        title: 'Imam Al-Ghazali',
        subtitle: 'Hujjat al-Islam — La preuve de l\'Islam',
        content: `Abu Hamid Muhammad al-Ghazali (1058-1111), surnommé Hujjat al-Islam (La preuve de l'Islam), est l'un des plus grands théologiens, philosophes et mystiques de l'Islam médiéval.

Né à Tus (Iran actuel), il enseigna à la célèbre madrasa Nizamiyya de Bagdad avant de traverser une profonde crise spirituelle (1095) qui le conduisit à abandonner gloire et position pour un retrait mystique de 10 ans.

Son œuvre maîtresse, Ihya 'Ulum ad-Din (La Revivification des sciences de la religion), en 4 volumes, reste l'un des livres les plus lus après le Coran dans le monde islamique. Il réconcilia soufisme et orthodoxie sunnite.

Il critiqua les philosophes (Ibn Sina, Al-Farabi) dans son Tahafut al-Falasifa (Incohérence des philosophes), provoquant une réponse fameuse d'Ibn Rushd.`,
        keyPoints: [
          'Hujjat al-Islam : plus grand théologien médiéval',
          'Ihya\' Ulum ad-Din : 4 volumes, œuvre majeure',
          'Réconcilia soufisme et orthodoxie sunnite',
          'Critiqua Ibn Sina et Al-Farabi (Tahafut)',
          'Crise spirituelle → retrait mystique de 10 ans',
        ],
        arabicQuote: 'الْعِلْمُ بِدُونِ عَمَلٍ كَالشَّجَرِ بِدُونِ ثَمَرٍ',
        arabicSource: 'Al-Ghazali, Ihya\' Ulum ad-Din',
        duration: 7,
      },
      {
        id: 'l6-5', moduleId: 6, order: 5,
        title: 'Ibn Khaldoun',
        subtitle: 'Père de la sociologie et de l\'histoire',
        content: `Abd ar-Rahman ibn Khaldoun (1332-1406), né à Tunis, est universellement reconnu comme le père de la sociologie, de l'historiographie scientifique et de l'économie politique.

Sa Muqaddima (Prolégomènes, 1377) est l'introduction à son encyclopédie historique Kitab al-Ibar. Elle expose la théorie de l'Asabiyya (cohésion sociale/tribale) comme moteur de l'histoire des civilisations.

Il fut le premier penseur à analyser les cycles de montée et déclin des civilisations de manière systématique, sans recours au surnaturel. Il théorisa aussi les effets de l'impôt sur l'économie (Laffer curve avant la lettre).

Son œuvre n'a été redécouverte en Occident qu'au XIXe siècle. Arnold Toynbee le décrit comme « le plus grand ouvrage du genre jamais créé par un esprit humain. »`,
        keyPoints: [
          'Père de la sociologie et de l\'historiographie scientifique',
          'Muqaddima (1377) : théorie des civilisations',
          'Asabiyya : cohésion sociale comme moteur historique',
          'Théorisa l\'effet de l\'impôt sur l\'économie',
          'Arnold Toynbee : « le plus grand ouvrage jamais écrit »',
        ],
        arabicQuote: 'التَّارِيخُ فَنٌّ مِنَ الْفُنُونِ الَّتِي تَتَدَاوَلُهَا الْأُمَمُ',
        arabicSource: 'Ibn Khaldoun, Muqaddima',
        duration: 7,
      },
    ],
  },
  {
    id: 7,
    title: 'Spiritualité Soufie',
    description: 'Dhikr, stations et voie intérieure',
    icon: '🌀',
    color: '#8B4A6F',
    lessons: [
      {
        id: 'l7-1', moduleId: 7, order: 1,
        title: 'Introduction au Soufisme',
        subtitle: 'Tasawwuf — La voie intérieure',
        content: `Le Soufisme (Tasawwuf) est la dimension ésotérique et mystique de l'Islam, centrée sur la purification du cœur (tazkiyat an-nafs) et la recherche de la proximité divine (qurb Allah).

Le terme « soufi » proviendrait du mot arabe « suf » (laine), en référence aux vêtements de laine grossière portés par les premiers mystiques musulmans en signe d'ascèse. D'autres étymologies sont proposées (safa : pureté).

Le Tasawwuf s'appuie sur le Coran (11:28 ; 13:28) et les Hadiths, notamment celui de l'Ihsan : « Adore Allah comme si tu Le voyais, car même si tu ne Le vois pas, Lui te voit. »

Les grands maîtres soufis (Hasan al-Basri, Rabia al-Adawiyya, Junayd al-Baghdadi, Ibn Arabi, Rumi, al-Ghazali) ont développé un corpus de théologie mystique unique au monde.`,
        keyPoints: [
          'Tasawwuf : dimension ésotérique de l\'Islam',
          'But : purification du cœur et proximité divine',
          'Fondé sur le Coran et le Hadith de l\'Ihsan',
          'Rabia al-Adawiyya : première à parler de l\'amour divin pur',
          'Junayd al-Baghdadi : le « maître des maîtres »',
        ],
        arabicQuote: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
        arabicSource: 'Sourate Ar-Ra\'d, 13:28',
        duration: 6,
      },
      {
        id: 'l7-2', moduleId: 7, order: 2,
        title: 'Les Stations Spirituelles',
        subtitle: 'Maqamat — Tawba, Zuhd, Tawakkul, Mahabba',
        content: `Les Maqamat (stations spirituelles) sont les étapes de la progression intérieure du soufi sur la voie vers Allah. Chaque station doit être conquise et stabilisée avant de progresser.

Les principales stations selon al-Ghazali et les maîtres soufis : Tawba (repentir sincère), Wara' (scrupule religieux), Zuhd (détachement du monde), Sabr (patience), Shukr (gratitude), Khawf (crainte de Dieu), Raja' (espoir), Tawakkul (confiance totale), Mahabba (amour divin), Rida (satisfaction divine).

À la différence des Ahwal (états spirituels — dons divins temporaires comme la joie ou la proximité), les Maqamat sont acquises par effort et volonté.

La station la plus haute varie selon les écoles : pour Al-Ghazali c'est la Mahabba (amour), pour Junayd c'est le Fana' (annihilation de l'ego dans le divin).`,
        keyPoints: [
          'Maqamat : stations acquises par effort spirituel',
          'Ahwal : états donnés par Allah, non acquis',
          'Tawba première station — repentir sincère',
          'Tawakkul : confiance totale en Allah',
          'Fana\' (Junayd) / Mahabba (Al-Ghazali) : station ultime',
        ],
        arabicQuote: 'إِنَّ الَّذِينَ قَالُوا رَبُّنَا اللَّهُ ثُمَّ اسْتَقَامُوا',
        arabicSource: 'Sourate Fussilat, 41:30',
        duration: 7,
      },
      {
        id: 'l7-3', moduleId: 7, order: 3,
        title: 'Rumi et la Voie de l\'Amour',
        subtitle: 'Mawlana Jalaluddin Rumi (1207-1273)',
        content: `Jalal ad-Din Rumi (1207-1273) est le plus grand poète mystique de l'Islam et l'un des auteurs les plus lus au monde. Né à Balkh (Afghanistan actuel), il s'établit à Konya (Turquie actuelle) où il fonda l'ordre soufi des Mevlevis (« derviches tourneurs »).

Sa rencontre avec le mystérieux soufi Shams de Tabriz (1244) fut le catalyseur de sa transformation spirituelle radicale. La disparition de Shams (1248) plongea Rumi dans une douleur créatrice qui produisit le Diwan-e-Shams (poèmes en persan).

Son œuvre majeure, le Masnavi (6 volumes, ~25 000 vers), est souvent surnommé « le Coran en persan ». Il explore l'amour divin, la nostalgie de l'âme pour son origine divine, et le voyage vers la réunion avec Allah.

La danse des derviches (Sema) est une méditation en mouvement symbolisant le voyage de l'âme autour de l'Aimé.`,
        keyPoints: [
          'Né à Balkh (1207), établi à Konya (Turquie)',
          'Fondateur de l\'ordre soufi Mevlevi',
          'Rencontre de Shams de Tabriz → transformation radicale',
          'Masnavi : « le Coran en persan » (25 000 vers)',
          'Sema (danse des derviches) : méditation en mouvement',
        ],
        arabicQuote: 'بِشْنَو این نَی چوُن شِکایَت می‌کُنَد',
        arabicSource: 'Rumi, Masnavi — « Écoute ce roseau, entends sa plainte »',
        duration: 7,
      },
      {
        id: 'l7-4', moduleId: 7, order: 4,
        title: 'Ibn Arabi et la Métaphysique Soufie',
        subtitle: 'Sheikh al-Akbar — Le Plus Grand Maître',
        content: `Muhyiddin Ibn Arabi (1165-1240), surnommé « Sheikh al-Akbar » (Le Plus Grand Maître), est le plus grand métaphysicien mystique de l'Islam. Né à Murcie (Espagne islamique), il voyagea toute sa vie avant de s'établir à Damas.

Son concept central est le Wahdat al-Wujud (Unicité de l'Être) : il n'y a qu'un seul Être réel, Allah, et toute la création est Sa manifestation. Cette thèse suscita des débats théologiques intenses.

Ses deux œuvres majeures : Al-Futuhat al-Makkiyya (Les Illuminations mecquoises — 37 volumes) et Fusus al-Hikam (Les Chatons des Sagesses — 27 chapitres sur 27 prophètes).

Ibn Arabi développa également la théorie des « Noms divins » comme moteurs de la création, et la notion d'Insan Kamil (l'Homme Parfait) comme miroir de la totalité divine.`,
        keyPoints: [
          'Sheikh al-Akbar : plus grand métaphysicien de l\'Islam',
          'Wahdat al-Wujud : Unicité de l\'Être',
          'Al-Futuhat al-Makkiyya : 37 volumes d\'illuminations',
          'Fusus al-Hikam : sagesse de 27 prophètes',
          'Insan Kamil : l\'Homme Parfait, miroir du divin',
        ],
        arabicQuote: 'مَا رَأَيْتُ شَيْئًا إِلَّا رَأَيْتُ اللَّهَ مَعَهُ',
        arabicSource: 'Ibn Arabi — « Je n\'ai rien vu sans voir Allah avec lui »',
        duration: 8,
      },
      {
        id: 'l7-5', moduleId: 7, order: 5,
        title: 'Le Dhikr quotidien',
        subtitle: 'Pratiques d\'invocation',
        content: `Le Dhikr (invocation / souvenir d'Allah) est le cœur de la pratique soufie et de toute dévotion islamique. Le Coran dit : « C'est par l'invocation d'Allah que les cœurs trouvent la quiétude. » (13:28)

Les formules fondamentales du dhikr : Subhanallah (33×), Alhamdulillah (33×), Allahu Akbar (34×) après chaque prière — enseignées par le Prophète (ﷺ). La récitation de la Fatiha, des dernières sourates (Mu'awwidhatayn) et de l'Ayat al-Kursi sont aussi des dhikrs essentiels.

Les ordres soufis pratiquent des dhikrs collectifs (Hadra) avec litanies spécifiques (Wird) transmises par la chaîne initiatique (Silsila).

La qualité du dhikr prime sur la quantité : il doit être accompagné de présence du cœur (hudur al-qalb), non mécanique.`,
        keyPoints: [
          'Subhanallah (33) + Alhamdulillah (33) + Allahu Akbar (34) après prière',
          'Ayat al-Kursi après chaque prière obligatoire',
          'Wird : litanie quotidienne de l\'ordre soufi',
          'Hadra : dhikr collectif',
          'Hudur al-qalb : présence du cœur — qualité > quantité',
        ],
        arabicQuote: 'فَاذْكُرُونِي أَذْكُرْكُمْ',
        arabicSource: 'Sourate Al-Baqara, 2:152',
        duration: 5,
      },
    ],
  },
  {
    id: 8,
    title: 'Calendrier Islamique',
    description: 'Mois lunaires, événements et fêtes',
    icon: '🌙',
    color: '#4A5A7A',
    lessons: [
      {
        id: 'l8-1', moduleId: 8, order: 1,
        title: 'Le Calendrier Hijri',
        subtitle: 'Système lunaire depuis 622 EC',
        content: `Le calendrier islamique (Hijri) est un calendrier lunaire pur, dont l'an 1 correspond à l'Hégire du Prophète (ﷺ) de La Mecque à Médine en 622 EC. Il fut établi sous le Calife Umar ibn al-Khattab.

L'année Hijri compte 12 mois lunaires de 29 ou 30 jours, soit 354 ou 355 jours — environ 11 jours de moins que l'année solaire. Cela fait que les dates islamiques « glissent » à travers les saisons.

Les 12 mois : Muharram, Safar, Rabi' al-Awwal, Rabi' al-Akhir, Jumada al-Ula, Jumada al-Akhira, Rajab, Sha'ban, Ramadan, Shawwal, Dhul Qa'da, Dhul Hijja.

Quatre mois sont sacrés (Haram) : Rajab, Dhul Qa'da, Dhul Hijja, Muharram — durant lesquels les combats et l'agression sont traditionnellement interdits.`,
        keyPoints: [
          'An 1 Hijri = 622 EC (Hégire à Médine)',
          '354-355 jours : 11 jours moins que l\'année solaire',
          '12 mois lunaires de 29-30 jours',
          '4 mois sacrés (Haram) : Rajab, Dhul Qa\'da, Dhul Hijja, Muharram',
          'Dates islamiques glissent sur toutes les saisons',
        ],
        arabicQuote: 'إِنَّ عِدَّةَ الشُّهُورِ عِندَ اللَّهِ اثْنَا عَشَرَ شَهْرًا',
        arabicSource: 'Sourate At-Tawba, 9:36',
        duration: 5,
      },
      {
        id: 'l8-2', moduleId: 8, order: 2,
        title: 'Ramadan',
        subtitle: 'Le mois béni du jeûne',
        content: `Ramadan est le 9e mois du calendrier islamique et le plus sacré de l'année. Il est le mois de la révélation du Coran, du jeûne obligatoire, de l'intensification de la dévotion et de la générosité.

Les dix derniers jours sont les plus précieux, culminant avec Laylat al-Qadr (nuit du Destin) — cherchée dans les nuits impaires des dix derniers jours. La prière supplémentaire nocturne de Tarawih est accomplie chaque nuit.

Le jeûne débute au lever de l'aube (Fajr) et se rompt au coucher du soleil (Maghrib) avec l'iftar. Le suhur (repas avant l'aube) est béni. L'i'tikaf (retraite spirituelle dans la mosquée) est recommandé pour les dix derniers jours.

Le Ramadan se conclut par la célébration de l'Aïd al-Fitr (1er Shawwal), marquée par la prière de l'Aïd, la Zakat al-Fitr et les réjouissances familiales.`,
        keyPoints: [
          '9e mois lunaire — mois de la révélation du Coran',
          'Laylat al-Qadr : nuits impaires des 10 derniers jours',
          'Tarawih : 8 ou 20 rakaat supplémentaires chaque nuit',
          'I\'tikaf : retraite dans la mosquée les 10 derniers jours',
          'Aïd al-Fitr : 1er Shawwal — fin du Ramadan',
        ],
        arabicQuote: 'شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ',
        arabicSource: 'Sourate Al-Baqara, 2:185',
        duration: 6,
      },
      {
        id: 'l8-3', moduleId: 8, order: 3,
        title: 'Muharram et Ashura',
        subtitle: 'Premier mois sacré de l\'année',
        content: `Muharram est le premier mois de l'année islamique et l'un des quatre mois sacrés. Son nom signifie « interdit » en référence à l'interdiction des combats.

Le 10 Muharram est le jour d'Ashura, l'un des jours les plus importants de l'Islam. Le Prophète (ﷺ) a dit que le jeûne d'Ashura expie les péchés de l'année écoulée. Il jeûnait ce jour en apprenant que Musa (ع) jeûnait aussi en reconnaissance de la libération des Enfants d'Israël.

Ashura a une signification supplémentaire pour les Chiites qui y commémorent le martyre de Hussein ibn Ali (petit-fils du Prophète) à Karbala (680 EC). Cette différence d'interprétation est une source de division historique.

Il est recommandé de jeûner le 9 et le 10 (ou le 10 et le 11) Muharram, pour se distinguer des pratiques antérieures.`,
        keyPoints: [
          'Muharram : 1er mois de l\'an hijri, mois sacré',
          'Ashura : 10 Muharram — expie péchés de l\'année',
          'Lien avec Musa (ع) et la libération d\'Israël',
          'Commémoration de Karbala (Hussein) pour les Chiites',
          'Recommandé : jeûner 2 jours consécutifs (9+10 ou 10+11)',
        ],
        arabicQuote: 'صِيَامُ يَوْمِ عَاشُورَاءَ أَحْتَسِبُ عَلَى اللَّهِ أَنْ يُكَفِّرَ السَّنَةَ الَّتِي قَبْلَهُ',
        arabicSource: 'Hadith, Sahih Muslim',
        duration: 6,
      },
      {
        id: 'l8-4', moduleId: 8, order: 4,
        title: 'Rajab et Sha\'ban',
        subtitle: 'Préparation spirituelle avant Ramadan',
        content: `Rajab est le 7e mois lunaire, l'un des quatre mois sacrés. Il commémore l'Isra' Mi'raj (Voyage Nocturne et Ascension du Prophète ﷺ) — traditionnellement fixé au 27 Rajab.

Le Prophète (ﷺ) supplicait : « O Allah, bénis-nous dans Rajab et Sha'ban et fais-nous atteindre Ramadan. » Cette invocation illustre la progression spirituelle des trois mois.

Sha'ban est le 8e mois, considéré comme le jardin de Ramadan. Le Prophète (ﷺ) jeûnait beaucoup en Sha'ban. La nuit du 15 Sha'ban (Laylat al-Bara'a ou Nuit de la Libération) est honorée par beaucoup de musulmans.

Il n'y a pas de jeûne obligatoire en Rajab ou Sha'ban, mais le jeûne volontaire (Nafl) y est très apprécié.`,
        keyPoints: [
          'Rajab : 7e mois sacré — commémore l\'Isra\' Mi\'raj (27 Rajab)',
          'Invocation prophétique : bénédiction de Rajab, Sha\'ban, Ramadan',
          'Sha\'ban : mois de préparation au Ramadan',
          'Laylat al-Bara\'a : 15 Sha\'ban, nuit de libération',
          'Jeûne volontaire en Sha\'ban très recommandé',
        ],
        arabicQuote: 'اللَّهُمَّ بَارِكْ لَنَا فِي رَجَبَ وَشَعْبَانَ وَبَلِّغْنَا رَمَضَانَ',
        arabicSource: 'Hadith du Prophète (ﷺ)',
        duration: 5,
      },
      {
        id: 'l8-5', moduleId: 8, order: 5,
        title: 'Dhul Hijja et l\'Aïd al-Adha',
        subtitle: 'Le mois du Hajj et de la fête du sacrifice',
        content: `Dhul Hijja est le 12e et dernier mois de l'année islamique, le mois du Hajj. Les dix premiers jours de Dhul Hijja sont les jours les plus bénis de l'année selon le Hadith.

Le 9 Dhul Hijja est le Jour d'Arafat : le pèlerin se tient sur la plaine d'Arafat en supplication. Pour les non-pèlerins, jeûner ce jour expie les péchés des deux années (passée et future) selon le Hadith.

Le 10 Dhul Hijja est l'Aïd al-Adha (Fête du Sacrifice) — célébré dans le monde entier. Il commémore la soumission d'Ibrahim et l'offrande du sacrifice. Les familles capables sacrifient un animal (mouton, chèvre, vache ou chameau) et distribuent la viande aux pauvres.

Les jours de Tashriq (11-13 Dhul Hijja) sont des jours de réjouissance et de dhikr.`,
        keyPoints: [
          '10 premiers jours : les plus bénis de l\'année (Hadith)',
          '9 Dhul Hijja : Jour d\'Arafat — jeûne expie 2 ans',
          '10 Dhul Hijja : Aïd al-Adha — Fête du sacrifice',
          'Sacrifice d\'un animal et distribution aux pauvres',
          'Jours de Tashriq (11-13) : dhikr et réjouissances',
        ],
        arabicQuote: 'مَا مِنْ أَيَّامٍ الْعَمَلُ الصَّالِحُ فِيهَا أَحَبُّ إِلَى اللَّهِ مِنْ هَذِهِ الْأَيَّامِ',
        arabicSource: 'Hadith du Prophète (ﷺ) sur les 10 premiers jours de Dhul Hijja',
        duration: 6,
      },
    ],
  },
  {
    id: 9,
    title: 'Éthique Islamique',
    description: 'Akhlaq — La belle morale',
    icon: '💎',
    color: '#3A6A8A',
    lessons: [
      {
        id: 'l9-1', moduleId: 9, order: 1,
        title: 'Les Fondements de l\'Akhlaq',
        subtitle: 'La belle morale dans l\'Islam',
        content: `Le Prophète Muhammad (ﷺ) a dit : « Je n'ai été envoyé que pour parfaire la belle morale. » (Hadith, Malik). L'éthique islamique (Akhlaq) est donc au cœur de la mission prophétique.

Les valeurs fondamentales de l'Akhlaq : Sidq (sincérité/vérité), Amanah (intégrité/confiance), 'Adl (justice), Ihsan (excellence), Rahmah (miséricorde), Hilm (douceur/patience), Tawadu' (humilité), Karam (générosité).

L'éthique islamique est intrinsèquement liée à la foi (Iman) : un croyant qui se comporte mal contredit sa foi. « Celui d'entre les croyants qui a la foi la plus parfaite est celui qui a le meilleur comportement. » (Hadith, Tirmidhi)

L'Ihsan — faire le bien comme si on voyait Allah — est le sommet de l'éthique islamique.`,
        keyPoints: [
          'Le Prophète (ﷺ) envoyé pour parfaire la morale',
          '8 vertus cardinales : Sidq, Amanah, \'Adl, Ihsan...',
          'Foi et morale inséparables dans l\'Islam',
          'Ihsan : excellence morale, agir comme si on voyait Allah',
          'Le meilleur croyant = celui au meilleur comportement',
        ],
        arabicQuote: 'إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ',
        arabicSource: 'Hadith du Prophète (ﷺ), Al-Muwatta de Malik',
        duration: 6,
      },
      {
        id: 'l9-2', moduleId: 9, order: 2,
        title: 'Les Droits des Autres',
        subtitle: "Huquq al-'Ibad — Droits du prochain",
        content: `L'Islam distingue deux catégories de droits : les droits d'Allah (Huquq Allah — actes d'adoration) et les droits des êtres humains (Huquq al-'Ibad — droits du prochain). Les seconds sont plus strictement réclamés au Jour du Jugement.

Les droits des parents : obéissance et respect (birr al-walidayn), interdite seulement si elle implique la désobéissance à Allah. Le Coran associe le devoir envers les parents au devoir envers Allah.

Les droits du voisin sont extraordinairement étendus selon le Prophète (ﷺ) : « Jibrîl m'a tant recommandé de bien traiter le voisin que j'ai cru qu'il en ferait un héritier. »

Les droits des orphelins, des pauvres, des voyageurs, des non-musulmans sous protection (Dhimmi) sont explicitement mentionnés dans le Coran.`,
        keyPoints: [
          'Huquq al-\'Ibad : droits du prochain — plus stricts au Jugement',
          'Parents : birr al-walidayn, lié au devoir envers Allah',
          'Voisin : droits quasi-illimités selon le Prophète (ﷺ)',
          'Droits des orphelins, pauvres, voyageurs explicites dans le Coran',
          'Riba, oppression, mensonge : violations des droits d\'autrui',
        ],
        arabicQuote: 'وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا ۖ وَبِالْوَالِدَيْنِ إِحْسَانًا',
        arabicSource: 'Sourate An-Nisa, 4:36',
        duration: 6,
      },
      {
        id: 'l9-3', moduleId: 9, order: 3,
        title: 'L\'Éthique Économique',
        subtitle: 'Justice sociale et redistribution',
        content: `L'Islam a une éthique économique distincte fondée sur la justice, l'équité et la lutte contre la concentration des richesses.

La Zakat, le Waqf (fondation pieuse), la Sadaqa volontaire et le Qard Hasan (prêt bienveillant sans intérêt) forment un système de redistribution visant à éliminer la pauvreté extrême.

L'interdiction du riba (intérêt/usure) vise à empêcher l'enrichissement passif au détriment des pauvres. Le Coran dit : « Ce que vous prêtez à intérêt pour vous enrichir au détriment des biens des gens ne vaut rien auprès d'Allah. » (30:39)

L'éthique commerciale islamique exige : honnêteté dans les transactions, pesées justes, interdiction de la fraude, respect des contrats. « Le marchand honnête sera avec les prophètes, les véridiques et les martyrs. » (Hadith, Tirmidhi)`,
        keyPoints: [
          'Zakat + Waqf + Sadaqa : système de redistribution',
          'Riba interdit : empêche enrichissement aux dépens des pauvres',
          'Commerce : honnêteté, pesées justes, respect des contrats',
          'Marchand honnête : avec les prophètes au Paradis (Hadith)',
          'But ultime : éliminer la pauvreté et la concentration des richesses',
        ],
        arabicQuote: 'التَّاجِرُ الصَّدُوقُ الْأَمِينُ مَعَ النَّبِيِّينَ وَالصِّدِّيقِينَ وَالشُّهَدَاءِ',
        arabicSource: 'Hadith du Prophète (ﷺ), Tirmidhi',
        duration: 6,
      },
      {
        id: 'l9-4', moduleId: 9, order: 4,
        title: 'Éthique Environnementale',
        subtitle: 'Khalifa : gardien de la création',
        content: `L'Islam confère à l'humanité le statut de khalifa (vicaire/gardien) sur terre, responsable de la préservation de la création (Amanah al-Khalifa). Cette responsabilité est au cœur de l'éthique environnementale islamique.

Le Prophète (ﷺ) a encouragé la plantation d'arbres comme Sadaqa : « Si l'Heure dernière survenait alors que l'un de vous tient un plant entre ses mains, qu'il le plante. » Le gaspillage (Israf) est explicitement interdit dans le Coran.

La doctrine du Hima (zones protégées) est l'ancêtre islamique des parcs naturels. Le Prophète (ﷺ) établit des zones protégées autour de Médine.

L'eau est sacrée dans l'Islam : le gaspillage d'eau même pour les ablutions est interdit. « N'use pas excessivement de l'eau, même si tu te trouves au bord d'un fleuve. »`,
        keyPoints: [
          'Khalifa : gardien responsable de la création',
          'Israf (gaspillage) interdit dans le Coran',
          'Plantation d\'arbres : Sadaqa même à la fin du monde',
          'Hima : zones protégées institués par le Prophète (ﷺ)',
          'Eau : sacrée, économie même pour les ablutions',
        ],
        arabicQuote: 'وَلَا تُفْسِدُوا فِي الْأَرْضِ بَعْدَ إِصْلَاحِهَا',
        arabicSource: 'Sourate Al-A\'raf, 7:56',
        duration: 6,
      },
      {
        id: 'l9-5', moduleId: 9, order: 5,
        title: 'Éthique de la Parole',
        subtitle: 'La langue : miséricorde ou poison',
        content: `L'Islam accorde une importance extrême à l'éthique de la parole. « Quiconque croit en Allah et au Jour dernier qu'il dise une bonne parole ou qu'il se taise. » (Hadith, Bukhari/Muslim)

Les grands péchés de la langue : Gibah (médisance — mentionner un défaut réel d'une personne absente), Namima (calomnie — rapporter des paroles pour semer la discorde), Kizb (mensonge), Sabb (insulte).

Le Prophète (ﷺ) a dit : « Celui qui me garantit ce qui est entre ses deux mâchoires et ce qui est entre ses deux jambes, je lui garantis le Paradis. »

Vertus de la parole : dire la vérité même difficile, parler avec douceur (liyyân), réciter du Coran, dire du bien du prochain (Ghibah al-Jaiz : médisance permise limitée à des cas précis).`,
        keyPoints: [
          'Gibah (médisance) : péché majeur comparable à manger la chair d\'un mort',
          'Namima (calomnie) : grave péché qui rompt les relations',
          'Langue garantie = Paradis garanti (Hadith)',
          'Liyyân : douceur dans la parole, valeur prophétique',
          'Silence vaut mieux que parole inutile',
        ],
        arabicQuote: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
        arabicSource: 'Hadith, Sahih Bukhari et Muslim',
        duration: 6,
      },
    ],
  },
  {
    id: 10,
    title: 'Islam Contemporain',
    description: 'Défis, renouveau et dialogue',
    icon: '🌍',
    color: '#6A4A3A',
    lessons: [
      {
        id: 'l10-1', moduleId: 10, order: 1,
        title: 'Islam et Modernité',
        subtitle: 'Réforme, ijtihad et adaptation',
        content: `L'Islam contemporain fait face au défi de concilier les sources traditionnelles avec les réalités du monde moderne. Deux approches principales s'affrontent : le traditionnalisme (préserver l'héritage classique) et le réformisme (adapter l'ijtihad aux réalités modernes).

Les grands réformateurs du XIXe-XXe siècle : Jamal ad-Din al-Afghani (1838-1897), Muhammad Abduh (1849-1905) et Rashid Rida — la Nahda islamique — ont cherché à réconcilier Islam et modernité.

L'Ijtihad (effort d'interprétation juridique indépendant) est la clé selon les réformistes : la « fermeture de la porte de l'Ijtihad » (Insidad Bab al-Ijtihad) au Moyen Âge est perçue comme une cause de stagnation.

Les questions modernes : bioéthique, finance islamique, droits des femmes, démocratie et Islam, minorités musulmanes en Occident — nécessitent un ijtihad collectif urgent.`,
        keyPoints: [
          'Traditionnalisme vs réformisme : tension centrale',
          'Nahda : mouvement de réforme du XIXe siècle',
          'Ijtihad : outil nécessaire pour les questions modernes',
          'Questions urgentes : bioéthique, genre, démocratie',
          'Diversité des réponses : richesse et défi de l\'Islam contemporain',
        ],
        arabicQuote: 'إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ',
        arabicSource: 'Sourate Ar-Ra\'d, 13:11',
        duration: 7,
      },
      {
        id: 'l10-2', moduleId: 10, order: 2,
        title: 'Islam et Sciences',
        subtitle: 'L\'âge d\'or et la renaissance',
        content: `L'âge d'or islamique (VIIIe-XIIIe siècle) fut une période de floraison scientifique exceptionnelle. Sous les Abbassides, la Maison de la Sagesse (Bayt al-Hikma) à Bagdad traduisit et enrichit l'héritage grec.

Les contributions islamiques au monde : al-jabr (algèbre, Al-Khawarizmi), optique (Ibn al-Haytham), médecine (Avicenne, Ibn al-Nafis), astronomie (Al-Battani, Al-Biruni), chimie (Jabir ibn Hayyan), philosophie (Al-Kindi, Al-Farabi, Ibn Rushd).

Le Coran encourage explicitement l'observation de l'univers : « Nous leur montrerons Nos signes aux horizons et en eux-mêmes. » (41:53). La science est perçue comme découverte des lois divines.

L'enjeu actuel : réengager les sociétés musulmanes dans la production scientifique tout en préservant les valeurs éthiques islamiques.`,
        keyPoints: [
          'Âge d\'or : VIIIe-XIIIe s., Bagdad comme centre mondial',
          'Bayt al-Hikma : traduction et enrichissement du savoir grec',
          'Al-Khawarizmi : père de l\'algèbre',
          'Ibn al-Haytham : père de l\'optique moderne',
          'Avicenne (Ibn Sina) : Canon de Médecine utilisé 500 ans',
        ],
        arabicQuote: 'سَنُرِيهِمْ آيَاتِنَا فِي الْآفَاقِ وَفِي أَنفُسِهِمْ',
        arabicSource: 'Sourate Fussilat, 41:53',
        duration: 7,
      },
      {
        id: 'l10-3', moduleId: 10, order: 3,
        title: 'Islam et Dialogue Interreligieux',
        subtitle: 'Rencontres, partage, respect mutuel',
        content: `Le dialogue interreligieux est ancré dans le Coran lui-même : « Ô gens du Livre, venez à une parole commune entre nous. » (3:64). L'Islam reconnaît la légitimité des révélations précédentes.

Le concept de Ahl al-Kitab (Gens du Livre — juifs, chrétiens, zoroastriens) confère un statut de protection et de respect. Les mariage avec des femmes Ahl al-Kitab est permis (Coran 5:5).

Les grandes figures du dialogue islamo-chrétien : Louis Massignon (1883-1962), Mohammed Arkoun (1928-2010), Tariq Ramadan, Seyyed Hossein Nasr. La Déclaration d'Abu Dhabi (2019) signée par le Pape François et Al-Azhar est un jalon historique.

Les limites théologiques : le Tawhid islamique et la Trinité chrétienne restent irréductibles. Un dialogue authentique respecte ces différences sans les minimiser.`,
        keyPoints: [
          'Coran 3:64 : invitation à la parole commune',
          'Ahl al-Kitab : statut de respect et protection',
          'Déclaration d\'Abu Dhabi (2019) : Pape François + Al-Azhar',
          'Dialogue authentique : respecte les différences irréductibles',
          'Vivre-ensemble : possible sans syncrétisme théologique',
        ],
        arabicQuote: 'قُلْ يَا أَهْلَ الْكِتَابِ تَعَالَوْا إِلَىٰ كَلِمَةٍ سَوَاءٍ بَيْنَنَا وَبَيْنَكُمْ',
        arabicSource: 'Sourate Al-Imran, 3:64',
        duration: 6,
      },
      {
        id: 'l10-4', moduleId: 10, order: 4,
        title: 'Musulmans en Occident',
        subtitle: 'Minorité, identité et citoyenneté',
        content: `Les musulmans d'Occident représentent aujourd'hui 25-30 millions de personnes en Europe et 3-4 millions en Amérique du Nord. La question de l'identité musulmane dans les sociétés sécularisées est centrale.

Le débat théologique : les savants reconnaissent que le Dar al-Islam (territoire islamique) et Dar al-Harb (territoire de guerre) sont des concepts médiévaux dépassés. Les sociétés occidentales démocratiques sont désormais souvent qualifiées de Dar al-'Ahd (territoire de traité) ou Dar al-Amn (territoire de sécurité).

Tariq Ramadan et d'autres intellectuels musulmans occidentaux défendent une identité « musulman occidental » intégrée, non fragmentée : citoyen à part entière et musulman convaincu.

Les questions pratiques : hijab, alimentation halal, jours fériés islamiques, représentation politique, racisme anti-musulman.`,
        keyPoints: [
          '25-30 millions de musulmans en Europe',
          'Dar al-\'Ahd : concept moderne remplaçant Dar al-Harb',
          'Identité musulmane occidentale : intégrée, non fragmentée',
          'Citoyenneté pleine et entière compatible avec l\'Islam',
          'Islamophobie : défi réel nécessitant une réponse collective',
        ],
        arabicQuote: 'يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا',
        arabicSource: 'Sourate Al-Hujurat, 49:13',
        duration: 6,
      },
      {
        id: 'l10-5', moduleId: 10, order: 5,
        title: 'Renouveau Spirituel',
        subtitle: 'Retour aux sources et renaissance intérieure',
        content: `Face aux défis du monde contemporain, un mouvement de renouveau spirituel islamique traverse les communautés musulmanes mondiales. Ce retour aux sources ne signifie pas le rejet de la modernité mais sa purification.

Les figures du renouveau contemporain : Hamza Yusuf (USA), Tariq Ramadan (Suisse), Bilal Philips (Canada), Mohamed Al-Ghazali (Égypte) — avec des approches diverses mais une conviction commune : l'Islam répond aux questions existentielles modernes.

Le renouveau du Tasawwuf (Soufisme) dans les pays occidentaux — centres de méditation islamique, pratiques de dhikr collectif, retraites spirituelles — répond à une soif de profondeur que les pratiques superficielles ne comblent pas.

Le message final : l'Islam est une voie de paix, de sagesse et de miséricorde. La violence commise en son nom le trahit fondamentalement.`,
        keyPoints: [
          'Retour aux sources ≠ rejet de la modernité',
          'Figures du renouveau : Hamza Yusuf, Tariq Ramadan et al.',
          'Renaissance du Tasawwuf en Occident : soif de profondeur',
          'Islam : voie de paix, sagesse et miséricorde',
          'Violence en son nom : trahison fondamentale du message',
        ],
        arabicQuote: 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ',
        arabicSource: 'Sourate Al-Anbiya, 21:107 — « Nous ne t\'avons envoyé que comme miséricorde pour les mondes »',
        duration: 6,
      },
    ],
  },
];

export const TOTAL_LESSONS = EDUCATION_MODULES.reduce((sum, m) => sum + m.lessons.length, 0);
