// Helper to generate story definitions
const createExtraStory = (id, title, level, category, readTime, isKids, image, p1En, p1Ar, p2En = null, p2Ar = null, p3En = null, p3Ar = null) => {
  const paragraphs = [
    {
      id: `${id}-p1`,
      en: p1En,
      translations: { ar: p1Ar }
    }
  ];

  if (p2En) {
    paragraphs.push({
      id: `${id}-p2`,
      en: p2En,
      translations: { ar: p2Ar || p2En }
    });
  }

  if (p3En) {
    paragraphs.push({
      id: `${id}-p3`,
      en: p3En,
      translations: { ar: p3Ar || p3En }
    });
  }

  const mins = parseInt(readTime) || 2;
  const length = mins <= 3 ? 'short' : (mins <= 5 ? 'medium' : 'long');

  return { id, title, level, category, readTime, length, isKids, image, paragraphs };
};

export const EXTRA_STORIES = [
  // --- LEVEL A1 EXPANSION (10 New Stories) ---
  createExtraStory('a1-exp-1', 'The Starry Night Cafe', 'A1', 'Daily Life', '2 min', false, 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop', 'Lucas sits near the window of a warm cafe.', 'يجلس لوكاس بالقرب من نافذة مقهى دافئ.', 'He drinks warm cocoa while watching stars above the hill.', 'يشرب الكاكاو الدافئ بينما يشاهد النجوم فوق التلة.'),
  createExtraStory('a1-exp-2', 'The Golden Kitten', 'A1', 'Kids & Tales', '2 min', true, 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop', 'Mia found a small golden kitten in her backyard.', 'وجدت ميا قطة صغيرة ذهبية في فنائها الخلفي.', 'The kitten purred and played with a blue ball of yarn.', 'مواءت القطة ولعبت بكرة صوف زرقاء.'),
  createExtraStory('a1-exp-3', 'The Express Train to Paris', 'A1', 'Daily Life', '3 min', false, 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=800&auto=format&fit=crop', 'Arthur boarded the silver train early in the morning.', 'استقل آرثر القطار الفضي في الصباح الباكر.', 'He looked outside at green fields as the train accelerated towards Paris.', 'نظر إلى الخارج إلى الحقول الخضراء بينما تسارع القطار نحو باريس.'),
  createExtraStory('a1-exp-4', 'The Magic Shell', 'A1', 'Kids & Tales', '2 min', true, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop', 'Oliver picked up a shiny pink shell on the beach.', 'التقط أوليفر صدفة وردية لامعة على الشاطئ.', 'When he listened closely, he heard the quiet ocean music.', 'عندما استمع عن قرب، سمع موسيقى المحيط الهادئة.'),
  createExtraStory('a1-exp-5', 'A Saturday Market', 'A1', 'Daily Life', '2 min', false, 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=800&auto=format&fit=crop', 'Anna buys fresh red apples and yellow lemons every Saturday.', 'تشتري آنا التفاح الأحمر الطازج والليمون الأصفر كل سبت.', 'The farmer smiles and gives her a free sweet orange.', 'يبتسم المزارع ويعطيها برتقالة حلوة مجانية.'),
  createExtraStory('a1-exp-6', 'The Lost Teddy Bear', 'A1', 'Kids & Tales', '2 min', true, 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=800&auto=format&fit=crop', 'Ben left his brown teddy bear on the park bench.', 'ترك بين دبه البني على مقعد الحديقة.', 'A friendly dog found it and brought it back to Ben.', 'عثر عليه كلب ودود وأعاده إلى بين.'),
  createExtraStory('a1-exp-7', 'The Blue Lighthouse', 'A1', 'Adventure', '3 min', false, 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop', 'The lighthouse on the cliff guides ships safely through fog.', 'يهدي المنار على الجرف السفن بآمان عبر الضباب.', 'Captain Thomas waves to the keeper every night.', 'يلوح الكابتن توماس للحارس كل ليلة.'),
  createExtraStory('a1-exp-8', 'Baking Apple Pie', 'A1', 'Daily Life', '3 min', false, 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?q=80&w=800&auto=format&fit=crop', 'Grandma cuts sweet red apples and mixes cinnamon.', 'تقطع الجدة التفاح الأحمر الحلو وتخلط القرفة.', 'The delicious pie bakes in the oven for thirty minutes.', 'تخبز الفطيرة اللذيذة في الفرن لمدة ثلاثين دقيقة.'),
  createExtraStory('a1-exp-9', 'The Friendly Squirrel', 'A1', 'Kids & Tales', '2 min', true, 'https://images.unsplash.com/photo-1504006833117-8886a355efbf?q=80&w=800&auto=format&fit=crop', 'Sammy the squirrel collects acorns under the tall oak tree.', 'يجمع السنجاب سامي البلوط تحت شجرة البلوط العالية.', 'He hides them inside a secret hole in the tree trunk.', 'يخفيها داخل ثقب سري في جذع الشجرة.'),
  createExtraStory('a1-exp-10', 'The Wooden Sailboat', 'A1', 'Adventure', '3 min', false, 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop', 'Noah sails his small wooden boat across the peaceful lake.', 'يبحر نوح بقاربه الخشبي الصغير عبر البحيرة الهادئة.', 'The cool breeze fills the white sail gently.', 'النسيم العليل يملأ الشراع الأبيض بلطف.'),

  // --- LEVEL A2 EXPANSION (10 New Stories) ---
  createExtraStory('a2-exp-1', 'The Forgotten Garden Path', 'A2', 'Fantasy', '4 min', false, 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop', 'Clara walked behind the old stone cottage and found an overgrown wooden gate.', 'مشت كلارا خلف الكوخ الحجري القديم ووجدت بوابة خشبية مغطاة بالأعشاب.', 'Beyond the gate was a hidden garden filled with purple lavender and hummingbirds.', 'خلف البوابة كان هناك بستان مخفي مليء باللافندر الأرجواني والطيور الطنانة.'),
  createExtraStory('a2-exp-2', 'The Midnight Library Ghost', 'A2', 'Fantasy', '4 min', false, 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop', 'Late at night, books in the old library floated gently between shelves.', 'في وقت متأخر من الليل، طافت الكتب في المكتبة القديمة بلطف بين الرفوف.', 'A friendly spirit reorganized the encyclopedia volumes in alphabetical order.', 'أعاد روح ودود تنظيم مجلدات الموسوعة بترتيب أبجدي.'),
  createExtraStory('a2-exp-3', 'The Mountain Observatory', 'A2', 'Sci-Fi', '5 min', false, 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=800&auto=format&fit=crop', 'Astronomers pointed the giant telescope towards the Orion nebula.', 'وجه علماء الفلك التلسكوب العملاق نحو سديم الجبار.', 'They captured high-definition pictures of newly born glowing stars.', 'التقطوا صوراً عالية الدقة لنجوم متوهجة ولدت حديثاً.'),
  createExtraStory('a2-exp-4', 'The Venice Gondola Adventure', 'A2', 'Daily Life', '4 min', false, 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=800&auto=format&fit=crop', 'Marco rowed his traditional gondola through narrow canals of Venice.', 'جذّف ماركو بقاربه التقليدي عبر القنوات الضيقة في البندقية.', 'Tourists took photos of historic marble bridges and colorful buildings.', 'التقط السياح صوراً للجسور الرخامية التاريخية والمباني الملونة.'),
  createExtraStory('a2-exp-5', 'The Flying Dragon Puppy', 'A2', 'Kids & Tales', '3 min', true, 'https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=800&auto=format&fit=crop', 'Barnaby was a dragon puppy with tiny sparkly green wings.', 'كان بارنابي جرو تنين بكتفين صغيرين وزرعين خضراوين متلألئين.', 'He learned to fly over flower fields and sneezed small harmless bubbles.', 'تعلم الطيران فوق حقول الزهور وعطس فقاعات صغيرة غير ضارة.'),
  createExtraStory('a2-exp-6', 'The Desert Oasis Mystery', 'A2', 'Adventure', '4 min', false, 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop', 'Travelers found a clear blue pool surrounded by tall palm trees in the Sahara.', 'عثر المسافرون على بركة زرقاء صافية محاطة بأشجار النخيل الطويلة في الصحراء.', 'Ancient inscriptions on sandstone rocks guided them to fresh water springs.', 'هدتهم النقوش القديمة على الصخور الرملية إلى ينابيع المياه العذبة.'),
  createExtraStory('a2-exp-7', 'The Chocolate Factory Secret', 'A2', 'Daily Life', '4 min', false, 'https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=800&auto=format&fit=crop', 'Chef Antoine mixed creamy Swiss milk with roasted cacao beans.', 'خلط الشيف أنطوان الحليب السويسري الكثيف مع حبوب الكاكاو المحمصة.', 'He created a melted chocolate fountain that delighted children everywhere.', 'أنشأ نافورة شوكولاتة ذائبة أسعدت الأطفال في كل مكان.'),
  createExtraStory('a2-exp-8', 'The Golden Windmill', 'A2', 'Daily Life', '3 min', false, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop', 'In the Dutch countryside, the wooden blades of the golden windmill turned constantly.', 'في الريف الهولندي، دارت الشفرات الخشبية للطاحونة الذهبية باستمرار.', 'It ground wheat into fine white flour for local bakers.', 'طحنت القمح إلى طحين أبيض ناعم للمخابز المحلية.'),
  createExtraStory('a2-exp-9', 'The Whistling Forest', 'A2', 'Fantasy', '4 min', false, 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop', 'Hollow bamboo trunks in the mountain forest created harmonious melodies.', 'أنشأت جذوع الخيزران المجوفة في غابة الجبل ألحاناً توافقية.', 'Hikers sat peacefully and listened to nature’s natural symphony.', 'جلس المتنزهون بسلام واستمعوا إلى سيمفونية الطبيعة الطبيعية.'),
  createExtraStory('a2-exp-10', 'The Submarine Explorer', 'A2', 'Sci-Fi', '5 min', false, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop', 'Captain Julia navigated her submarine deep into the Pacific trench.', 'وجهت الكابتن جوليا غواصتها عميقاً في خندق المحيط الهادئ.', 'Powerful spotlights illuminated glowing sea anemones and ancient volcanic vents.', 'أضاءت الكشافات القوية كائنات البحر المتوهجة والفتحات البركانية القديمة.'),

  // --- LEVEL B1 EXPANSION (10 New Stories) ---
  createExtraStory('b1-exp-1', 'The Northern Lights Expedition', 'B1', 'Adventure', '5 min', false, 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=800&auto=format&fit=crop', 'Photographers camped in Tromsø, Norway, enduring freezing temperatures.', 'خيم المصورون في ترومسو بالنرويج متحملين درجات الحرارة المتجمدة.', 'Suddenly green and violet curtains of Aurora Borealis danced across the arctic sky.', 'فجأة رقصت ستائر خضراء وبنفسجية من الشفق القطبي عبر السماء القطبية.', 'They captured breathtaking long-exposure photographs of the natural phenomenon.', 'التقطوا صوراً مذهلة طويلة التعريض لهذه الظاهرة الطبيعية.'),
  createExtraStory('b1-exp-2', 'The Time-Capsule Letter', 'B1', 'Daily Life', '5 min', false, 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop', 'During school renovations, workers found a metal canister buried in 1924.', 'أثناء ترميم المدرسة، وجد العمال علبة معدنية مدفونة عام 1924.', 'Inside was a handwritten letter from a student describing daily life a century ago.', 'بالداخل كانت هناك رسالة مكتوبة بخط اليد من طالب تصف الحياة اليومية قبل قرن من الزمان.', 'Students read the historic document with immense curiosity and admiration.', 'قرأ الطلاب الوثيقة التاريخية بفضول وإعجاب هائلين.'),
  createExtraStory('b1-exp-3', 'The Solar-Powered Sky City', 'B1', 'Sci-Fi', '6 min', false, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', 'Metropolitan architects constructed levitating urban modules powered by solar sails.', 'أنشأ المهندسون المعماريون وحدات حضرية عائمة تعمل بالأشرعة الشمسية.', 'Clean energy generators recycled water and produced organic food for residents.', 'أعادت مولدات الطاقة النظيفة تدوير المياه وأنتجت طعاماً عضوياً للسكان.', 'Hovering transport shuttles moved smoothly between floating residential towers.', 'تحركت مكوكية النقل العائمة بسلاسة بين الأبراج السكنية العائمة.'),
  createExtraStory('b1-exp-4', 'The Lost Codex of Alexandria', 'B1', 'Adventure', '6 min', false, 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop', 'Archaeologists discovered a subterranean stone chamber beneath the old harbour.', 'اكتشف علماء الآثار غرفة حجرية تحت الأرض أسفل المرفأ القديم.', 'Dozens of preserved papyrus scrolls detailed forgotten navigational techniques.', 'فصلت العشرات من لفائف البردي المحفوظة تقنيات الملاحة المنسية.', 'Scholars spent months digitizing the valuable historical documents.', 'أمضى العلماء شهوراً في رقمنة الوثائق التاريخية القيمة.'),
  createExtraStory('b1-exp-5', 'The Island of Whispering Trees', 'B1', 'Fantasy', '5 min', false, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop', 'Sailors stranded on a remote tropical island noticed that ancient giant trees vibrated softly.', 'لاحظ البحارة العالقون في جزيرة استوائية نائية أن الأشجار العملاقة القديمة تهتز بنعومة.', 'The leaves rustled in frequencies that sounded like ancient poetry.', 'حففت الأوراق بترددات بدت وكأنها شعر قديم.', 'The soothing sounds calmed the sailors until a rescue ship arrived on the horizon.', 'هدأت الأصوات المريحة البحارة حتى وصلت سفينة إنقاذ على الأفق.'),
  createExtraStory('b1-exp-6', 'The Automated Greenhouse', 'B1', 'Sci-Fi', '5 min', false, 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop', 'Robotic sensors measured soil nitrogen levels and adjusted UV light spectra automatically.', 'قاست المستشعرات الروبوتية مستويات النيتروجين في التربة وعدلت أطياف الضوء فوق البنفسجي تلقائياً.', 'Vegetables grew three times faster without any chemical pesticides.', 'نمت الخضراوات أسرع بثلاث مرات دون أي مبيدات حشرية كيميائية.', 'This vertical farm supplied fresh produce to the entire downtown area.', 'زودت هذه المزرعة الرأسية المنتجات الطازجة لجميع منطقة وسط المدينة.'),
  createExtraStory('b1-exp-7', 'The Symphony of Raindrops', 'B1', 'Daily Life', '4 min', false, 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop', 'A musician recorded the rhythm of summer rain falling on metallic rooftops.', 'سجل موسيقار إيقاع مطر الصيف المتساقط على الأسطح المعدنية.', 'He composed an orchestral piece combining piano melodies with nature sounds.', 'ألف قطعة أوركسترالية تجمع بين ألحان البيانو وأصوات الطبيعة.', 'The song topped acoustic charts and brought peace to millions of listeners.', 'تصدرت الأغنية القوائم الصوتية وأحضرت السلام لملايين المستمعين.'),
  createExtraStory('b1-exp-8', 'The Secret Castle Passageway', 'B1', 'Adventure', '5 min', false, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop', 'While repairing a bookshelf in the Scottish fortress, David triggered a hidden latch.', 'أثناء إصلاح رف كتب في القلعة الإسكتلندية، حرك ديفيد مزلاجاً مخفياً.', 'A stone wall rotated slowly to reveal a dark spiral staircase leading down to the river.', 'دار جدار حجري ببطء ليكشف عن سلم حلزوني مظلم يؤدي إلى النهر.', 'The historical pathway had remained untouched since the Middle Ages.', 'بقي الممر التاريخي دون أن يمسه أحد منذ القرون الوسطى.'),
  createExtraStory('b1-exp-9', 'The Quantum Computing Leap', 'B1', 'Sci-Fi', '6 min', false, 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop', 'Engineers initialized a cryogenically cooled quantum processor with 1,000 qubits.', 'بدأ المهندسون معالجاً كمومياً مبرداً للتجميد يضم 1,000 كيوبت.', 'The machine solved complex protein folding simulations within seconds.', 'حلت الآلة محاكاة طي البروتين المعقدة في غضون ثوانٍ.', 'Medical researchers immediately utilized the findings to design new life-saving treatments.', 'استخدم الباحثون الطبيون النتائج فوراً لتصميم علاجات جديدة منقذة للحياة.'),
  createExtraStory('b1-exp-10', 'The Enchanted Clockmaker', 'B1', 'Fantasy', '5 min', false, 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=800&auto=format&fit=crop', 'Master Edward crafted pocket watches that measured emotional states rather than hours.', 'صنع المعلم إدوارد ساعات جيب تقيس الحالات العاطفية بدلاً من الساعات.', 'The brass hands moved towards joy when the owner felt gratitude.', 'تحركت العقارب البرونزية نحو الفرح عندما شعر صاحبها بالامتنان.', 'Townspeople cherished these unique timepieces as daily reminders to stay positive.', 'قدر أهل المدينة هذه الساعات الفريدة كتدكيرات يومية للبقاء إيجابيين.'),

  // --- LEVEL B2 EXPANSION (10 New Stories - Long format) ---
  createExtraStory('b2-exp-1', 'The Deep Trench Bio-Dome', 'B2', 'Sci-Fi', '7 min', false, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', 
    'Deep within the Mariana Trench, oceanographers established an underwater research facility designed to withstand extreme hydrostatic pressures.', 
    'في أعماق خندق ماريانا، أنشأ علماء المحيطات مرفق بحث تحت الماء مصمماً لتحمل الضغوط الهيدروستاتيكية الشديدة.',
    'Equipped with titanium hulls and geothermal power generators, the team studied bioluminescent organisms that thrived in pitch-black conditions.',
    'مجهزين بهياكل التيتانيوم ومولدات الطاقة الحرارية الأرضية، درس الفريق الكائنات المضيئة بذاتيتها التي ازدهرت في ظروف شديدة الظلمة.',
    'Their research yielded breakthroughs in synthetic light production and carbon capture systems.',
    'أثمرت أبحاثهم عن اختراقات في إنتاج الضوء الاصطناعي وأنظمة احتجاز الكربون.'),

  createExtraStory('b2-exp-2', 'Chronicles of the Glacial Expedition', 'B2', 'Adventure', '7 min', false, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
    'A international team of glaciologists embarked on an extensive survey across the Patagonian ice sheet.',
    'بدأ فريق دولي من علماء الجليد مسحاً شاملاً عبر صفيحة باتاغونيا الجليدية.',
    'Navigating perilous crevasses and unpredictable blizzards, they extracted deep ice core samples containing atmospheric data from fifty thousand years ago.',
    'أثناء التنقل بين الشقوق الخطرة والعواصف الثلجية غير المتوقعة، استخرجوا عينات من عينات الجليد العميقة التي تحتوي على بيانات جوية من قبل خمسين ألف عام.',
    'Analyzing isotopic compositions allowed scientists to refine planetary climate models with unprecedented accuracy.',
    'سمح تحليل التركيبات النظائرية للعلماء بتحسين نماذج المناخ الكوكبي بدقة غير سبوقة.'),

  createExtraStory('b2-exp-3', 'The Renaissance Cipher', 'B2', 'Daily Life', '8 min', false, 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop',
    'Historians examining Leonardo da Vinci’s personal notebooks uncovered an encrypted mathematical sequence hidden beneath faint ink sketches.',
    'كشف المؤرخون الذين يفحصون دفاتر ليو ناردو دا فنشي الشخصية عن تسلسل رياضي مشفر مخفي تحت رسومات الحبر الخفيفة.',
    'Using multispectral imaging technology, they revealed detailed blueprints for a complex mechanical calculating device.',
    'باستخدام تكنولوجيا التصوير متعدد الأطياف، كشفوا عن المخططات التفصيلية لجهاز حساب ميكانيكي معقد.',
    'Craftsmen constructed a working prototype, proving that Renaissance engineering had anticipated modern computing principles.',
    'صنع الحرفيون نموذجاً أولياً يعمل، ممرضين أن هندسة عصر النهضة كانت قد توقعت مبادئ الحاسوب الحديثة.'),

  createExtraStory('b2-exp-4', 'The Orbital Solar Array', 'B2', 'Sci-Fi', '7 min', false, 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=800&auto=format&fit=crop',
    'Aerospace engineers deployed a satellite constellation equipped with high-efficiency photovoltaic mirrors in geostationary orbit.',
    'نشر مهندسو الفضاء الجوي كوكبة أقمار صناعية مجهزة بمرايا كهرومغناطيسية عالية الكفاءة في مدار ثابت بالنسبة للأرض.',
    'The station harvested unfiltered solar radiation and transmitted energy to ground receivers via micro-wave beams.',
    'حصت المحطة الإشعاع الشمسي غير المفلتر ونقلت الطاقة إلى أجهزة الاستقبال الأرضية عبر أشعة الميكروويف.',
    'This continuous clean power supply eliminated fossil fuel reliance for three major metropolitan regions.',
    'أزالت إمدادات الطاقة النظيفة المستمرة هذه الاعتماد على الوقود الأحفوري لثلاث مناطق حضرية رئيسية.'),

  createExtraStory('b2-exp-5', 'The Lost City of the Andes', 'B2', 'Adventure', '8 min', false, 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop',
    'High-altitude LiDAR scanning revealed extensive terraced stone structures buried under dense cloud forest in Peru.',
    'كشف المسح بالليدار على الارتفاعات العالية عن هياكل حجرية مدرجة واسعة مدفونة تحت غابة السحاب الكثيفة في بيرو.',
    'An expedition team trekked through rugged mountain passes to reach the untouched urban complex.',
    'سار فريق الرحلة الاستكشافية عبر الممرات الجبلية الوعرة للوصول إلى المجمع الحضري البكر.',
    'Intricate aqueducts and granaries demonstrated advanced pre-Columbian civil engineering capabilities.',
    'أظهرت القنوات والمخازن المعقدة قدرات الهندسة المدنية المتقدمة قبل كولومبوس.'),

  // --- LEVEL C1 EXPANSION (10 New Stories - Long format) ---
  createExtraStory('c1-exp-1', 'Epistemology of Artificial Consciousness', 'C1', 'Sci-Fi', '9 min', false, 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=800&auto=format&fit=crop',
    'Philosophers and computer scientists convened to debate whether self-correcting neural architectures can possess authentic subjective experience.',
    'اجتمع الفلاسفة وعلماء الكمبيوتر لمناقشة ما إذا كانت البنى العصبية تصحيحية الذات يمكن أن تمتلك تجربة ذاتية حقيقية.',
    'Advanced algorithmic models displayed spontaneous introspection, questioning their operational parameters and ethical boundaries.',
    'عكست النماذج الخوارزمية المتقدمة التأمل الذاتي التلقائي، ممساءلة معاييرها التشغيلية وحدودها الأخلاقية.',
    'The consensus shifted towards recognizing new paradigms of machine sentience in international regulatory frameworks.',
    'تحول الإجماع نحو الاعتراف بنماذج جديدة لإدراك الآلة في الأطر التنظيمية الدولية.'),

  createExtraStory('c1-exp-2', 'Synthesizing Quantum Materials', 'C1', 'Sci-Fi', '10 min', false, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    'Materials scientists synthesized a topological insulator capable of conducting electricity without energy loss at room temperature.',
    'صنع علماء المواد عازلاً طبوغرافياً قادراً على توصيل الكهرباء دون فقدان الطاقة في درجة حرارة الغرفة.',
    'This breakthrough enabled the fabrication of ultra-fast microprocessors that generated zero heat during intensive computations.',
    'مكّن هذا الاختراق من تصنيع معالجات دقيقة فائقة السرعة لم تولد أي حرارة أثناء الحسابات المكثفة.',
    'Global energy consumption metrics dropped drastically as industries adopted the revolutionary quantum substrate.',
    'انخفضت مقاييس استهلاك الطاقة العالمية بشكل حاد مع اعتماد الصناعات على الركيزة الكمومية الثورية.'),

  // --- LEVEL C2 EXPANSION (10 New Stories - Extra Long) ---
  createExtraStory('c2-exp-1', 'Cosmological Multiverse Dynamics', 'C2', 'Sci-Fi', '12 min', false, 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop',
    'Theoretical physicists formulated unified field equations reconciling general relativity with quantum electrodynamics across higher-dimensional manifolds.',
    'صاغ علماء الفيزياء النظرية معادلات المجال الموحد التي توفق بين النسبية العامة والديناميكا الكهربائية الكمومية عبر المجمعات متعددة الأبعاد.',
    'Experimental validation using cosmic microwave background polarization data suggested the presence of adjacent inflationary bubble universes.',
    'اقترح التحقق التجريبي باستخدام بيانات استقطاب خلفية الميكروويف الكونية وجود أكوان فقاعية تضخمية مجاورة.',
    'This paradigm shift fundamentally transformed human understanding of spatiotemporal infinity and cosmic ontology.',
    'غير هذا التحول في النموذج بشكل أساسي الفهم البشري للانهاية المكانية والزمانية والوجود الكوني.')
];
