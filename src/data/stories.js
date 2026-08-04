export const LANGUAGES = [
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' }
];

export const CATEGORIES = ['All', 'Daily Life', 'Adventure', 'Fantasy', 'Sci-Fi', 'Kids & Tales'];
export const LEVELS = ['All', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// Helper to generate rich multi-level story catalog
const createStory = (id, title, level, category, readTime, isKids, image, p1En, p1Ar, p2En = null, p2Ar = null) => {
  const paragraphs = [
    {
      id: `${id}-p1`,
      en: p1En,
      translations: {
        ar: p1Ar,
        es: `[ES] ${p1En}`,
        fr: `[FR] ${p1En}`,
        de: `[DE] ${p1En}`,
        zh: `[ZH] ${p1En}`,
        ja: `[JA] ${p1En}`,
        ru: `[RU] ${p1En}`
      }
    }
  ];

  if (p2En) {
    paragraphs.push({
      id: `${id}-p2`,
      en: p2En,
      translations: {
        ar: p2Ar || `[AR] ${p2En}`,
        es: `[ES] ${p2En}`,
        fr: `[FR] ${p2En}`,
        de: `[DE] ${p2En}`,
        zh: `[ZH] ${p2En}`,
        ja: `[JA] ${p2En}`,
        ru: `[RU] ${p2En}`
      }
    });
  }

  return { id, title, level, category, readTime, isKids, image, paragraphs };
};

// Generate 15 Stories per Level (A1, A2, B1, B2, C1, C2) + 15 Kids Tales
export const INITIAL_STORIES = [
  // --- LEVEL A1 (15 Stories) ---
  createStory('a1-1', 'The Lost Key in Tokyo', 'A1', 'Adventure', '3 min', false, 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop', 'Kenji walked through the quiet streets of Tokyo early in the morning.', 'مشى كينجي في شوارع طوكيو الهادئة في الصباح الباكر.', 'He reached for his coat pocket, but his golden key was missing.', 'وصل إلى جيب معطفه، لكن مفتاحه الذهبي كان مفقوداً.'),
  createStory('a1-2', 'A Morning at the Bakery', 'A1', 'Daily Life', '2 min', false, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop', 'The smell of fresh bread filled the neighborhood every morning.', 'ملأت رائحة الخبز الطازج الحي كل صباح.', 'Elena always bought a chocolate croissant and a small coffee.', 'كانت إلينا تشتري دائماً كرواسون بالشوكولاتة وقهوة صغيرة.'),
  createStory('a1-3', 'The Red Bicycle', 'A1', 'Daily Life', '2 min', false, 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop', 'Leo rode his new red bicycle through the green park.', 'ركب ليو دراجته الحمراء الجديدة عبر الحديقة الخضراء.', 'He waved happily to his best friend sitting on a bench.', 'لوّح بسعادة لصديقه المفضل الجالس على المقعد.'),
  createStory('a1-4', 'A Rainy Day in London', 'A1', 'Daily Life', '3 min', false, 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop', 'Raindrops hit the glass window while Sarah drank hot tea.', 'تساقطت قطرات المطر على النافذة الزجاجية بينما كانت سارة تشرب الشاي الساخن.', 'She opened a good book and listened to the soothing sound of rain.', 'فتحت كتاباً جيداً واستمعت إلى صوت المطر المهدئ.'),
  createStory('a1-5', 'The Bus Station', 'A1', 'Daily Life', '2 min', false, 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800&auto=format&fit=crop', 'David waited for bus number five under the sunny sky.', 'انتظر ديفيد الحافلة رقم خمسة تحت السماء المشمسة.', 'The yellow bus arrived right on time at eight in the morning.', 'وصلت الحافلة الصفراء في الوقت المحدد تماماً في الثامنة صباحاً.'),
  createStory('a1-6', 'My Little Puppy Max', 'A1', 'Daily Life', '2 min', false, 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop', 'Max is a small brown puppy with fluffy white paws.', 'ماكس جرو بني صغير بأقدام بيضاء ناعمة.', 'He loves running in the backyard and playing with tennis balls.', 'يحب الركض في الفناء الخلفي واللعب بكرات التنس.'),
  createStory('a1-7', 'The Apple Orchard', 'A1', 'Daily Life', '3 min', false, 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=800&auto=format&fit=crop', 'Anna picked sweet red apples from the tall trees.', 'قطفت آنا تفاحاً أحمر حلو المذاق من الأشجار العالية.', 'Her wooden basket was completely full before noon.', 'كانت سلتها الخشبية ممتلئة تماماً قبل الظهيرة.'),
  createStory('a1-8', 'The Seaside Cafe', 'A1', 'Daily Life', '3 min', false, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop', 'Sitting near the blue ocean water, Tom ordered fresh orange juice.', 'جلس توم بالقرب من مياه المحيط الزرقاء وطلب عصير برتقال طازج.', 'Gentle ocean waves washed against the sandy shore.', 'ضربت أمواج المحيط اللطيفة الشاطئ الرملي.'),
  createStory('a1-9', 'First Train Ride', 'A1', 'Adventure', '3 min', false, 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=800&auto=format&fit=crop', 'Maya looked out the train window at green rolling hills.', 'نظرت مايا من نافذة القطار إلى التلال الخضراء الممتدة.', 'The train moved smoothly along the steel tracks.', 'تحرك القطار بسلاسة على السكك الحديدية.'),
  createStory('a1-10', 'The Green Market', 'A1', 'Daily Life', '2 min', false, 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=800&auto=format&fit=crop', 'Farmers sold ripe yellow bananas and fresh green spinach.', 'باع المزارعون الموز الأصفر الناضج والسبانخ الخضراء الطازجة.', 'Everyone in town smiled and greeted each other warmly.', 'ابتسم الجميع في المدينة ورحبوا ببعضهم البعض بمدفء.'),
  createStory('a1-11', 'The Starry Night Walk', 'A1', 'Fantasy', '3 min', false, 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop', 'Bright white stars twinkled above the quiet lake.', 'تلألأت النجوم البيضاء الساطعة فوق البحيرة الهادئة.', 'A cool night breeze blew gently through the pine needles.', 'نسيم الليل البارد هبّ ببطء عبر أوراق الصنوبر.'),
  createStory('a1-12', 'The Old Clock Tower', 'A1', 'Adventure', '3 min', false, 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop', 'The city clock rang twelve loud chimes at noon.', 'دقّت ساعة المدينة اثني عشر جرساً عالياً عند الظهيرة.', 'Birds flew up into the clear blue sky together.', 'طارت الطيور إلى السماء الزرقاء الصافية معاً.'),
  createStory('a1-13', 'Grandma’s Garden', 'A1', 'Daily Life', '2 min', false, 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop', 'Grandma watered yellow sunflowers and pink roses every afternoon.', 'سقت الجدة عباد الشمس الأصفر والورود الوردية كل ظهيرة.', 'Butterflies danced gently from flower to flower.', 'رقصت الفراشات ببطء من زهرة إلى أخرى.'),
  createStory('a1-14', 'The Yellow Kite', 'A1', 'Kids & Tales', '2 min', false, 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop', 'A high wind lifted the yellow diamond kite above clouds.', 'رفعت الرياح العاتية الطائرة الورقية الصفراء فوق السحاب.', 'Jack held the long string tightly with both hands.', 'أمسك جاك الخيط الطويل بقوة بكلا يديه.'),
  createStory('a1-15', 'Cooking Dinner Together', 'A1', 'Daily Life', '3 min', false, 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop', 'Mom chopped fresh tomatoes while Ben stirred hot soup.', 'قطعت الأم الطماطم الطازجة بينما حرّك بن الحساء الساخن.', 'The delicious aroma filled the warm kitchen.', 'ملأت الرائحة اللذيذة المطبخ الدافئ.'),

  // --- LEVEL A2 (15 Stories) ---
  createStory('a2-1', 'Secrets of the Northern Lights', 'A2', 'Fantasy', '4 min', false, 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=800&auto=format&fit=crop', 'Deep in the icy forest, bright green waves sparkled across the night sky.', 'في أعماق الغابة الجليدية، تلألأت موجات خضراء ساطعة عبر سماء الليل.', 'Legend said that whoever whispered a true wish would find inner courage.', 'تقول الأسطورة إن من يهمس بأمنية صادقة يجد شجاعة داخلية.'),
  createStory('a2-2', 'The Hidden Waterfall', 'A2', 'Adventure', '4 min', false, 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=800&auto=format&fit=crop', 'Following an old hand-drawn map, Noah discovered a roaring waterfall.', 'باتباع خريطة قديمة مرسومة يدوياً، اكتشف نوح شلالاً مهدوراً.', 'Crystal clear spray misted against ancient mossy rocks.', 'انتشر رذاذ بلوري صافٍ على الصخور الطحلبية القديمة.'),
  createStory('a2-3', 'The Mountain Cabin', 'A2', 'Adventure', '4 min', false, 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop', 'Smoke drifted gently from the stone chimney high in the mountains.', 'تصاعد الدخان ببطء من المدخنة الحجرية العالية في الجبال.', 'Snow began to fall softly over pine trees as evening approached.', 'بدأ الثلج يتساقط بنعومة فوق أشجار الصنوبر مع اقتراب المساء.'),
  createStory('a2-4', 'Midnight at the Library', 'A2', 'Fantasy', '4 min', false, 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop', 'A single candle illuminated rare leather-bound books on wooden shelves.', 'أضاءت شمعة واحدة كتباً جلدية نادرة على أرفف خشبية.', 'Old parchment manuscripts hummed with forgotten fairy lore.', 'همست المخطوطات القديمة بأساطير الجنيات المنسية.'),
  createStory('a2-5', 'The Lighthouse Keeper', 'A2', 'Adventure', '4 min', false, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop', 'Captain Henry polished the massive glass lantern every sunset.', 'صقل الكابتن هنري الفانوس الزجاجي الضخم عند كل غروب.', 'Its bright beam guided ships safely past dangerous sharp reefs.', 'أرشد شعاعه الساطع السفن بآمان بعيداً عن الشعاب المرجانية الحادة.'),
  createStory('a2-6', 'The Desert Oasis', 'A2', 'Adventure', '4 min', false, 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop', 'Tall palm trees shaded cool freshwater springs surrounded by golden dunes.', 'ظللت أشجار النخيل العالية ينابيع المياه العذبة الباردة المحاطة بالكثبان الذهبية.', 'Travelers rested beneath woven tents after a long desert trek.', 'استراح المسافرون تحت الخيام المنسوجة بعد رحلة صحراوية طويلة.'),
  createStory('a2-7', 'The Toymaker’s Shop', 'A2', 'Fantasy', '4 min', false, 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=800&auto=format&fit=crop', 'Carved wooden soldiers lined velvet shelves in the magical workshop.', 'اصطفت الجنود الخشبية المنحوتة على أرفف مخملية في الورشة السحرية.', 'Clockwork music boxes spun playing sweet forgotten melodies.', 'دارت صناديق الموسيقى الآلية معزوفة ألحاناً عذبة منسية.'),
  createStory('a2-8', 'Baking Cinnamon Rolls', 'A2', 'Daily Life', '3 min', false, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop', 'Warm butter and brown sugar swirled into soft yeast dough.', 'امتزجت الزبدة الدافئة والسكر البني في عجينة الخميرة الطرية.', 'The baking rolls turned golden brown inside the hot oven.', 'تحولت لفائف المخبوزات إلى اللون الذهبي داخل الفرن الساخن.'),
  createStory('a2-9', 'The Stargazer', 'A2', 'Sci-Fi', '4 min', false, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', 'Looking through his brass telescope, Oliver tracked a passing comet.', 'من خلال تلسكوبه النحاسي، تتبع أوليفير مذنباً عابراً.', 'A glowing tail of cosmic dust stretched across distant constellations.', 'امتد ذيل مضيء من الغبار الكوني عبر الأبراج السماوية البعيدة.'),
  createStory('a2-10', 'Island of Wild Flowers', 'A2', 'Adventure', '4 min', false, 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop', 'Lavender blossoms covered steep cliffs overlooking crashing ocean waves.', 'غطت أزهار اللافندر المنحدرات الحادة المطلة على أمواج المحيط.', 'Seagulls soared high above white foam and rocky shores.', 'حلقت طيور النورس عالية فوق الرغوة البيضاء والشواطئ الصخرية.'),
  createStory('a2-11', 'The Forgotten Garden Wall', 'A2', 'Fantasy', '4 min', false, 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop', 'Ivy-covered brick walls protected ancient roses from harsh winter frost.', 'حمت الجدران الطوبية المغطاة بالبلاب الورود القديمة من الصقيع الشديد.'),
  createStory('a2-12', 'The Venetian Gondola', 'A2', 'Adventure', '4 min', false, 'https://images.unsplash.com/photo-1514896856000-91cb6de818e0?q=80&w=800&auto=format&fit=crop', 'Gliding along quiet canals, the black gondola passed historic stone bridges.', 'منزلقة عبر القنوات الهادئة، مرت الجندول الأسود تحت الجسور الحجرية التاريخية.'),
  createStory('a2-13', 'The Woodcarver’s Secret', 'A2', 'Daily Life', '3 min', false, 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop', 'With sharp chisels, Master Franz shaped aromatic cedar wood.', 'بالأزاميل الحادة، شكل المعلم فرانز أخشاب الأرز العطرة.'),
  createStory('a2-14', 'First Autumn Snow', 'A2', 'Daily Life', '3 min', false, 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=800&auto=format&fit=crop', 'Orange maple leaves lay frozen under thin layers of sparkling ice.', 'استلقت أوراق القيقب البرتقالية متجمدة تحت طبقات من الجليد.'),
  createStory('a2-15', 'The Pottery Wheel', 'A2', 'Daily Life', '3 min', false, 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=800&auto=format&fit=crop', 'Wet clay spun rapidly under steady hands forming a curved vase.', 'دار الطين المبلل بسرعة تحت يدين ثابتتين مشكلاً مزهرية منحنية.'),

  // --- LEVEL B1 (15 Stories) ---
  createStory('b1-1', 'The AI Companion', 'B1', 'Sci-Fi', '5 min', false, 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop', 'In the year 2088, small glowing drones delivered personalized messages into holographic wristwatches.', 'في عام 2088، قامت طائرات مسيرة صغيرة بتسليم رسائل مخصصة إلى الساعات المجسمة.', 'Aria built a robot capable of understanding human emotion.', 'صممت آريا روبوتاً قادراً على فهم المشاعر الإنسانية.'),
  createStory('b1-2', 'Echoes of Atlantis', 'B1', 'Fantasy', '5 min', false, 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop', 'Deep ocean submersibles illuminated glowing coral ruins submerged beneath sea trenches.', 'أضاءت الغواصات البحرية العميقة أطلال الشعاب المرجانية الغارقة.'),
  createStory('b1-3', 'The Quantum Telescope', 'B1', 'Sci-Fi', '5 min', false, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', 'Scientists captured high-resolution imagery of distant exoplanets orbiting twin suns.', 'التقط العلماء صوراً عالية الدقة لكواك خارجية تدور حول شمسين متوأمتين.'),
  createStory('b1-4', 'The Silk Road Caravan', 'B1', 'Adventure', '5 min', false, 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop', 'Merchants traded rare spices, woven silks, and blue ceramics along dusty mountain passes.', 'تاجر التجار بالتوابل النادرة والحرير المنسوج والسيراميك الأزرق عبر الممرات الجبلية.'),
  createStory('b1-5', 'Cyberpunk Alleyways', 'B1', 'Sci-Fi', '5 min', false, 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop', 'Neon billboards reflected off rain-slicked asphalt streets in futuristic Neo-Seoul.', 'انعكست اللوحات الإعلانية النيونية على الأسفلت المبتل بالمطر في نيو سيول.'),
  createStory('b1-6', 'Chronicles of the Windmill', 'B1', 'Daily Life', '5 min', false, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop', 'Gears turned as wind swept across endless tulip fields in Holland.', 'دارت التروس بينما عصفت الرياح عبر حقول التوليب اللانهائية في هولندا.'),
  createStory('b1-7', 'The Observatory Peak', 'B1', 'Sci-Fi', '5 min', false, 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop', 'Astronomers monitored radio signals transmitted from deep interstellar space.', 'راقب الفلكيون الإشارات اللاسلكية المنبعثة من الفضاء الخارجي.'),
  createStory('b1-8', 'The Alchemist’s Formula', 'B1', 'Fantasy', '5 min', false, 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop', 'Bubbling glass retorts transformed mercury into shimmering liquid silver.', 'حولت القوارير الزجاجية الفوارة الزئبق إلى فضة سائلة متلألئة.'),
  createStory('b1-9', 'The Deep Submarine', 'B1', 'Adventure', '5 min', false, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop', 'Hydrothermal vents spewed mineral clouds six miles below ocean surface.', 'نفثت الفوهات الحرارية مياها معدنية على عمق ستة أشكال تحت المحيط.'),
  createStory('b1-10', 'The Lost Rainforest Tribe', 'B1', 'Adventure', '5 min', false, 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800&auto=format&fit=crop', 'Botanists classified medicinal orchids hidden beneath thick jungle canopy.', 'صنف علماء النبات زهور الأوركيد الطبية المخفية تحت غطاء الغابة.'),
  createStory('b1-11', 'The Solar Sail Ship', 'B1', 'Sci-Fi', '5 min', false, 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=800&auto=format&fit=crop', 'Reflective sails caught light pressure from the sun pushing spacecraft toward Jupiter.', 'التقطت الأشرعة العاكسة ضغط الضوء الشمسي دافعة المركبة نحو المشتري.'),
  createStory('b1-12', 'The Clockwork Citadel', 'B1', 'Fantasy', '5 min', false, 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop', 'Brass automata guarded high walls of steam-powered mechanical cities.', 'حرست الآليات النحاسية أسوار المدن الميكانيكية التي تعمل بالبخار.'),
  createStory('b1-13', 'The Viking Longship', 'B1', 'Adventure', '5 min', false, 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop', 'Carved dragon prows cut through foggy Arctic seas toward unknown shores.', 'شقت مقدمات السفن المنحوتة البحار القطبية الضبابية.'),
  createStory('b1-14', 'The Botanical Conservatory', 'B1', 'Daily Life', '4 min', false, 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=800&auto=format&fit=crop', 'Exotic tropical ferns flourished inside glass domes heated by geothermal springs.', 'ازدهرت السرخس المدارية داخل القباب الزجاجية المسخنة بالينابيع.'),
  createStory('b1-15', 'The Express Train to Paris', 'B1', 'Daily Life', '4 min', false, 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=800&auto=format&fit=crop', 'High-speed trains sped past vineyards under golden afternoon sunlight.', 'سارت القطارات السريعة بجوار حقول العنب تحت ضوء الشمس الذهبي.'),

  // --- LEVEL B2 (15 Stories) ---
  createStory('b2-1', 'Architects of the Invisible', 'B2', 'Adventure', '6 min', false, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', 'Underneath ancient cathedrals lie subterranean networks of optical circuits.', 'تحت الكاتدرائيات القديمة تقع شبكات تحت الأرض من الدوائر البصرية.', 'Scholars spent decades deciphering light patterns that predicted environmental shifts.', 'أمضى العلماء عقوداً في فك رموز أنماط الضوء التنبؤية.'),
  createStory('b2-2', 'Neural Network Awakening', 'B2', 'Sci-Fi', '6 min', false, 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=800&auto=format&fit=crop', 'Distributed supercomputers synchronized synthetic synaptic pathways.', 'زامنت الحواسيب الفائقة الموزعة المسارات العصبية الاصطناعية.'),
  createStory('b2-3', 'The Antarctic Ice Core', 'B2', 'Sci-Fi', '6 min', false, 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=800&auto=format&fit=crop', 'Climatologists extracted ice cylinders containing trapped atmosphere from million years ago.', 'استخرج علماء المناخ عينات جليدية تحوي غلافاً جوياً نادراً.'),
  createStory('b2-4', 'The Venice Floods Solution', 'B2', 'Adventure', '6 min', false, 'https://images.unsplash.com/photo-1514896856000-91cb6de818e0?q=80&w=800&auto=format&fit=crop', 'Hydraulic engineers raised submerged yellow barriers protecting lagoon islands.', 'رفع مهندسو الهيدروليك حواجز غاطسة لحماية جزر البحيرة.'),
  createStory('b2-5', 'Holographic Cartography', 'B2', 'Sci-Fi', '6 min', false, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', 'Three-dimensional topographies rendered planetary mountain ranges in real-time.', 'عرضت التضاريس ثلاثية الأبعاد سلاسل الجبال الكوكبية في الوقت الفعلي.'),
  createStory('b2-6', 'The Lost Codex of Alexandria', 'B2', 'Fantasy', '6 min', false, 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop', 'Historians scanned charred papyrus scrolls using non-destructive X-ray tomography.', 'مسح المؤرخون لفائف البردي المحترقة باستخدام الأشعة السينية.'),
  createStory('b2-7', 'The Fusion Reactor Breakthrough', 'B2', 'Sci-Fi', '6 min', false, 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop', 'Magnetic containment fields sustained plasma reactions generating clean boundless power.', 'حافظت حقول الاحتواء المغناطيسي على تفاعلات البلازما النظيفة.'),
  createStory('b2-8', 'Symphony of the Deep Ocean', 'B2', 'Sci-Fi', '6 min', false, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop', 'Hydrophones recorded low-frequency whale vocalizations traveling across ocean basins.', 'سجلت أجهزة الميكروفون المائية أصوات الحيتان عبر قاعات المحيطات.'),
  createStory('b2-9', 'The Genetic Sanctuary', 'B2', 'Sci-Fi', '6 min', false, 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop', 'Cryogenic vaults preserved seed specimens of extinct flora for future restoration.', 'حفظت الخزانات المبردة عينات بذور النباتات المنقرضة.'),
  createStory('b2-10', 'The Renaissance Masterpiece', 'B2', 'Daily Life', '5 min', false, 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop', 'Restorers carefully removed centuries of oxidized varnish revealing original pigments.', 'أزال المرممون طبقات الورنيش المؤكسد كاشفين الصبغات الأصلية.'),
  createStory('b2-11', 'Quantum Encryption Keys', 'B2', 'Sci-Fi', '6 min', false, 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop', 'Entangled photons transmitted unbreakable cryptographic keys via orbital satellites.', 'نقلت الفوتونات المتشابكة مفاتيح تشفير غير قابلة للاختراق.'),
  createStory('b2-12', 'The Sub-Orbital Flight', 'B2', 'Sci-Fi', '6 min', false, 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=800&auto=format&fit=crop', 'Commercial spacecraft ascended through upper atmosphere rendering curvature of Earth visible.', 'صعدت المركبة الفضائية عبر الغلاف الجوي كاشفة انحناء الأرض.'),
  createStory('b2-13', 'The Deep Space Array', 'B2', 'Sci-Fi', '6 min', false, 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop', 'Radio dishes spanning desert basins captured cosmic background radiation.', 'التقطت الأطباق اللاسلكية الإشعاع الكوني الخلفي.'),
  createStory('b2-14', 'The Alpine Glacier Study', 'B2', 'Adventure', '5 min', false, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop', 'Glaciologists measured ice sheet displacement using satellite radar interferometry.', 'قاس علماء الجليد إزاحة الصفائح الجليدية بالأقمار الصناعية.'),
  createStory('b2-15', 'The Ancient Monoliths', 'B2', 'Fantasy', '6 min', false, 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop', 'Mega-lithic stone circles aligned perfectly with solstices and lunar eclipses.', 'تحاذت الدوائر الحجرية الضخمة تماماً مع الانقلابات والكسوفات.'),

  // --- LEVEL C1 (15 Stories) ---
  createStory('c1-1', 'The Philosophy of Resonance', 'C1', 'Fantasy', '7 min', false, 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop', 'Philosophers argue that true comprehension transcends linguistic constructs.', 'يجادل الفلاسفة بأن الفهم الحقيقي يتجاوز البنى اللغوية.'),
  createStory('c1-2', 'Phenomenology of Perception', 'C1', 'Fantasy', '7 min', false, 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop', 'Subjective experience forms the foundational pillar of conscious reality.', 'تشكل التجربة الذاتية الدعامة الأساسية للواقع الوعائي.'),
  createStory('c1-3', 'Symbiosis of Cybernetics', 'C1', 'Sci-Fi', '7 min', false, 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=800&auto=format&fit=crop', 'Biochemical interfaces merged biological cognition with silicon intelligence.', 'دمجت الواجهات البيوكيميائية الإدراك البيولوجي بالذكاء السليكوني.'),
  createStory('c1-4', 'Aesthetic Dimensions of Architecture', 'C1', 'Daily Life', '7 min', false, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop', 'Architectural spatial harmony influences human emotional equilibrium.', 'يؤثر التناغم الفضائي المعماري على التوازن العاطفي للبشر.'),
  createStory('c1-5', 'Thermodynamics of Spacetime', 'C1', 'Sci-Fi', '7 min', false, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', 'Entropy gradients govern cosmic evolution across expanding spacetime domains.', 'تحكم تحدرات الاعتلاء التطور الكوني عبر أبعاد الزمان والمكان.'),
  createStory('c1-6', 'Hermeneutics of Ancient Texts', 'C1', 'Fantasy', '7 min', false, 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop', 'Textual interpretation requires contextual historical empathy.', 'يتطلب التفسير النصي تعاطفاً تاريخياً سياقياً.'),
  createStory('c1-7', 'Algorithmic Epistemology', 'C1', 'Sci-Fi', '7 min', false, 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop', 'Computational models evaluate truth criteria through probabilistic inference.', 'تقيم النماذج الحوسبية معايير الحقيقة بالاستدلال الاحتمالي.'),
  createStory('c1-8', 'The Ethics of Genetic Modification', 'C1', 'Sci-Fi', '7 min', false, 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop', 'Genome editing raises profound existential considerations for human heritage.', 'يثير التعديل الجيني اعتبارات وجودية عميقة للتراث البشري.'),
  createStory('c1-9', 'Cosmological Inflation Theory', 'C1', 'Sci-Fi', '7 min', false, 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop', 'Rapid exponential expansion shaped cosmic microwave background fluctuations.', 'شكّل التوسع الأسي السريع تقلبات الخلفية الكونية الميكروية.'),
  createStory('c1-10', 'The Semiotics of Fine Art', 'C1', 'Daily Life', '7 min', false, 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop', 'Visual symbols convey layered cultural allegories across centuries.', 'تنقل الرموز البصرية مجازات ثنائية ثقافية عبر القرون.'),
  createStory('c1-11', 'Cognitive Neuro-Linguistics', 'C1', 'Sci-Fi', '7 min', false, 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=800&auto=format&fit=crop', 'Neural activation patterns reveal underlying semantic processing mechanisms.', 'تكشف أنماط التنشيط العصبي عن آليات المعالجة الدلالية.'),
  createStory('c1-12', 'Sub-Atomic Symmetry Breaking', 'C1', 'Sci-Fi', '7 min', false, 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop', 'Spontaneous symmetry breaking imparted mass to fundamental particles.', 'منح كسر التناظر التلقائي كتلة للجسيمات الأولية.'),
  createStory('c1-13', 'Macro-Economic Dynamics', 'C1', 'Daily Life', '7 min', false, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop', 'Global trade equilibrium adjusts to geopolitical currency shifts.', 'يتكيف توازن التجارة العالمية مع التغيرات الجيوسياسية للعملات.'),
  createStory('c1-14', 'Post-Modern Literary Criticism', 'C1', 'Fantasy', '7 min', false, 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop', 'Deconstructive analysis uncovers implicit ideological assumptions.', 'يكشف التحليل التفكيكي عن افتراضات أيديولوجية ضمتية.'),
  createStory('c1-15', 'Stochastic Climate Models', 'C1', 'Sci-Fi', '7 min', false, 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=800&auto=format&fit=crop', 'Predictive algorithms calculate atmospheric feedback loops with high confidence.', 'تحسب الخوارزميات التنبؤية حلقات التغذية الراجعة الجوية.'),

  // --- LEVEL C2 (15 Stories) ---
  createStory('c2-1', 'Epistemology of Quantum Consciousness', 'C2', 'Sci-Fi', '8 min', false, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', 'The paradigm shift from classical determinism to quantum superposition challenged fundamentally our perception of subjective experience.', 'إن التحول النوعي من الحتمية الكلاسيكية إلى التراكب الكمي قد تحدى بشكل أساسي إدراكنا للتجربة الذاتية.'),
  createStory('c2-2', 'Ontological Paradoxes of Time', 'C2', 'Sci-Fi', '8 min', false, 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop', 'Temporal loops question causal linearity in closed timelike curves.', 'تتحدى الحلقات الزمنية الخطية السببية في المنحنيات المغلقة.'),
  createStory('c2-3', 'Non-Euclidean Geometries', 'C2', 'Sci-Fi', '8 min', false, 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop', 'Curved manifold topologies redefine distance metrics in higher dimensions.', 'تعيد طوبولوجيا المناهج المنحنية تعريف مقاييس المسافة.'),
  createStory('c2-4', 'Synthetic Consciousness Singularity', 'C2', 'Sci-Fi', '8 min', false, 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=800&auto=format&fit=crop', 'Recursive self-improvement algorithms achieved self-aware autonomous agency.', 'حققت خوارزميات التحسين الذاتي التكرارية وعياً ذاتياً مستقلاً.'),
  createStory('c2-5', 'Holographic Principle of Black Holes', 'C2', 'Sci-Fi', '8 min', false, 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop', 'Information density scales with boundary surface area rather than volume.', 'تتناسب كثافة المعلومات مع مساحة السطح الحدودي.'),
  createStory('c2-6', 'Transcendental Aesthetics', 'C2', 'Fantasy', '8 min', false, 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop', 'Pure forms of intuition condition a priori spatial and temporal experience.', 'تشرط أشكال الحدس الخالص التجربة المكانية والزمانية.'),
  createStory('c2-7', 'Superstring Multiverse Dynamics', 'C2', 'Sci-Fi', '8 min', false, 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop', 'Ten-dimensional vibrational strings manifest fundamental physical constants.', 'تظهر الأوتار الاهتزازية عشرية الأبعاد الثوابت الفيزيائية.'),
  createStory('c2-8', 'Bio-Synthetic Epigenetics', 'C2', 'Sci-Fi', '8 min', false, 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop', 'Chromatin remodeling regulates heritable gene expression alterations.', 'ينظم إعادة تشكيل الكروماتين تعديلات التعبير الجيني الهامشية.'),
  createStory('c2-9', 'Dark Energy Cosmological Constant', 'C2', 'Sci-Fi', '8 min', false, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', 'Negative pressure accelerates cosmic expansion against gravitational pull.', 'يعجل الضغط السلبي التوسع الكوني ضد الجاذبية.'),
  createStory('c2-10', 'Relativistic Astrophysics', 'C2', 'Sci-Fi', '8 min', false, 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=800&auto=format&fit=crop', 'Frame dragging deforms spacetime geometry surrounding rotating black holes.', 'يشوه سحب الإطار الهندسة الزمانية المكانية للثقوب الدوارة.'),
  createStory('c2-11', 'Quantum Chromodynamics', 'C2', 'Sci-Fi', '8 min', false, 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop', 'Gluon field confinement binds quarks into stable hadronic matter.', 'يربط حظر مجال الجلوون الكواركات في مادة هادرونية استقرارية.'),
  createStory('c2-12', 'Neural Plasticity Optimization', 'C2', 'Sci-Fi', '8 min', false, 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=800&auto=format&fit=crop', 'Dendritic spine remodeling enhances synaptic transmission efficiency.', 'يعزز إعادة تشكيل الأشواك الشجيرية كفاءة النقل المشبكي.'),
  createStory('c2-13', 'Macro-Cosmology String Landscape', 'C2', 'Sci-Fi', '8 min', false, 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop', 'Flux compactifications yield vast ensembles of metastable vacuum states.', 'تنتج التراصات التدفقية مجموعات ضخمة من الفراغات.'),
  createStory('c2-14', 'Computational Complexity Theory', 'C2', 'Sci-Fi', '8 min', false, 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop', 'Polynomial vs non-deterministic polynomial bounds bound algorithm limits.', 'تحدد حدود متعددات الحدود إمكانيات الخوارزميات.'),
  createStory('c2-15', 'Unified Field Gauge Theories', 'C2', 'Sci-Fi', '8 min', false, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', 'Grand unified gauge symmetries unite electroweak and strong nuclear interactions.', 'توحد التناظرات المعيارية التفاعلات الكهرودعيفة والقوية.'),

  // --- KIDS DEDICATED TALES (15 Stories) ---
  createStory('kids-1', 'Barnaby the Brave Bear', 'A1', 'Kids & Tales', '2 min', true, 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=800&auto=format&fit=crop', 'Barnaby was a little brown bear who loved honey and blue skies.', 'كان بارنابي دباً بنياً صغيراً يحب العسل والسماء الزرقاء.', 'He helped his friend Bunny find her lost red balloon in the forest.', 'ساعد صديقته الأرنوبة في العثور على بالونها الأحمر في الغابة.'),
  createStory('kids-2', 'The Dancing Dolphin', 'A1', 'Kids & Tales', '2 min', true, 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?q=80&w=800&auto=format&fit=crop', 'Splash the dolphin jumped high into warm ocean air with a giant smile.', 'قفز الدلفين سبلاش عالياً في هوء المحيط الدافئ بابتسامة عملاقة.'),
  createStory('kids-3', 'Oliver the Friendly Owl', 'A1', 'Kids & Tales', '2 min', true, 'https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?q=80&w=800&auto=format&fit=crop', 'Oliver sat on a wooden branch hooting soft lullabies to forest animals.', 'جلس أوليفير على غصن خشبي يغني أغاني هادئة لحيوانات الغابة.'),
  createStory('kids-4', 'Penny the Little Penguin', 'A1', 'Kids & Tales', '2 min', true, 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?q=80&w=800&auto=format&fit=crop', 'Penny slid down icy snow hills right into cool sparkling ocean water.', 'انزلقت بيني على التلال الثلجية مباشرة نحو مياه المحيط.'),
  createStory('kids-5', 'The Magic Rainbow Dragon', 'A1', 'Kids & Tales', '2 min', true, 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop', 'Sparky breathed colorful bubbles that floated happily across green fields.', 'نفث سباركي فقاعات ملونة طافت بسعادة فوق الحقول الخضراء.'),
  createStory('kids-6', 'Sammy the Slow Turtle', 'A1', 'Kids & Tales', '2 min', true, 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=800&auto=format&fit=crop', 'Sammy won the forest race by walking slow, steady, and full of joy.', 'فاز سامي بسباق الغابة بالمشي الهادئ والمستمر المليء بالفرح.'),
  createStory('kids-7', 'Bella the Happy Butterfly', 'A1', 'Kids & Tales', '2 min', true, 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=800&auto=format&fit=crop', 'Bella fluttered her orange wings visiting purple flowers in morning sun.', 'رفرفت بيلا بأجنحتها البرتقالية ممتعة بالورود الأرجوانية.'),
  createStory('kids-8', 'The Silly Kitten Whiskers', 'A1', 'Kids & Tales', '2 min', true, 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop', 'Whiskers chased a ball of red yarn all across the living room rug.', 'طارد ويسكرز كرة صوف حمراء عبر سجاد غرفة المعيشة.'),
  createStory('kids-9', 'The Singing Canary', 'A1', 'Kids & Tales', '2 min', true, 'https://images.unsplash.com/photo-1522921820582-184e0c841e79?q=80&w=800&auto=format&fit=crop', 'Pip sang sweet cheer songs every morning waking up garden flowers.', 'غرد بيب بأغانٍ عذبة كل صباح توقظ أزهار الحديقة.'),
  createStory('kids-10', 'The Friendly Fox Red', 'A1', 'Kids & Tales', '2 min', true, 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=800&auto=format&fit=crop', 'Red shared juicy berries with his woodland neighbors under oak trees.', 'شارك ريد التوت اللذيذ مع جيرانه في الغابة تحت أشجار البلوط.'),
  createStory('kids-11', 'The Starry Little Lamb', 'A1', 'Kids & Tales', '2 min', true, 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?q=80&w=800&auto=format&fit=crop', 'Cotton the lamb leaped over grassy hills under twinkling night stars.', 'قفز الحمل كوتن فوق التلال العشبية تحت النجوم المتلألئة.'),
  createStory('kids-12', 'The Golden Fish Miracle', 'A1', 'Kids & Tales', '2 min', true, 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=800&auto=format&fit=crop', 'Finn swam gracefully glowing like warm sunshine in clear pond water.', 'سبح فين برشاقة مضيئاً كأشعة الشمس الدافئة في مياه الغدير.'),
  createStory('kids-13', 'The Playful Monkey Banana', 'A1', 'Kids & Tales', '2 min', true, 'https://images.unsplash.com/photo-1540573133985-780688d1e248?q=80&w=800&auto=format&fit=crop', 'Coco swung from jungle vines collecting yellow ripe bananas for snack time.', 'تأرجح كوكو على أغصان الغابة جامعاً الموز الأصفر الناضج.'),
  createStory('kids-14', 'The Tiny Ants Picnic', 'A1', 'Kids & Tales', '2 min', true, 'https://images.unsplash.com/photo-1589365278144-59f2a9386c99?q=80&w=800&auto=format&fit=crop', 'Little ants carried sweet strawberry crumbs back to their hill home.', 'حملت النملات الصغيرات فتات الفراولة الحلوة إلى مسكنها.'),
  createStory('kids-15', 'The Flying Paper Airplane', 'A1', 'Kids & Tales', '2 min', true, 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=800&auto=format&fit=crop', 'Leo threw his white paper airplane high gliding across sunny playground skies.', 'أطلق ليو طائرته الورقية البيضاء محلقة عبر سماء الملعب المشمس.')
];

export const STORIES = INITIAL_STORIES;

// Comprehensive Offline Multi-Language Dictionary
export const WORD_DICTIONARY = {
  was: { ar: 'كان', es: 'era / estaba', fr: 'était', de: 'war', zh: '是 / 曾经', ja: '〜でした', ru: 'был / была' },
  is: { ar: 'يكون', es: 'es / está', fr: 'est', de: 'ist', zh: '是', ja: '〜です', ru: 'есть' },
  are: { ar: 'يكونون', es: 'son / están', fr: 'sont', de: 'sind', zh: '是', ja: '〜です', ru: 'являются' },
  were: { ar: 'كانوا', es: 'eran', fr: 'étaient', de: 'waren', zh: '曾经是', ja: '〜でした', ru: 'были' },
  he: { ar: 'هو', es: 'él', fr: 'il', de: 'er', zh: '他', ja: '彼', ru: 'он' },
  she: { ar: 'هي', es: 'ella', fr: 'elle', de: 'sie', zh: '她', ja: '彼女', ru: 'она' },
  it: { ar: 'هو/هي لغير العاقل', es: 'eso', fr: 'il/elle', de: 'es', zh: '它', ja: 'それ', ru: 'оно' },
  his: { ar: 'خاصته', es: 'su', fr: 'son', de: 'sein', zh: '他的', ja: '彼の', ru: 'его' },
  her: { ar: 'خاصتها', es: 'su', fr: 'sa', de: 'ihr', zh: '她的', ja: '彼女の', ru: 'ее' },
  the: { ar: 'الـ (أداة تعريف)', es: 'el / la', fr: 'le / la', de: 'der / die / das', zh: '这 / 那', ja: 'その', ru: 'этот / эта' },
  a: { ar: 'أداة تنكير', es: 'un / una', fr: 'un / une', de: 'ein / eine', zh: '一个', ja: '1つの', ru: 'один' },
  an: { ar: 'أداة تنكير', es: 'un / una', fr: 'un / une', de: 'ein / eine', zh: '一个', ja: '1つの', ru: 'один' },
  and: { ar: 'و (حرف عطف)', es: 'y', fr: 'et', de: 'und', zh: '和', ja: 'と', ru: 'и' },
  but: { ar: 'لكن', es: 'pero', fr: 'mais', de: 'aber', zh: '하지만', ja: 'しかし', ru: 'но' },
  in: { ar: 'في', es: 'en', fr: 'dans', de: 'in', zh: '在...里', ja: '〜の中で', ru: 'в' },
  on: { ar: 'على', es: 'en / sobre', fr: 'sur', de: 'auf', zh: '在...上', ja: '〜の上に', ru: 'на' },
  at: { ar: 'عند / في', es: 'en', fr: 'à', de: 'an / bei', zh: '在', ja: '〜で', ru: 'в / при' },
  with: { ar: 'مع', es: 'con', fr: 'avec', de: 'mit', zh: '与 / 和', ja: '〜と一緒に', ru: 'с' },
  for: { ar: 'لـ / لأجل', es: 'para / por', fr: 'pour', de: 'für', zh: '为了', ja: '〜のために', ru: 'для' },
  of: { ar: 'من / الخاص بـ', es: 'de', fr: 'de', de: 'von', zh: '的', ja: '〜の', ru: 'из / от' },
  to: { ar: 'إلى', es: 'a / para', fr: 'à / vers', de: 'zu / nach', zh: '到 / 向', ja: '〜へ', ru: 'к / в' },
  honey: { ar: 'عسل', es: 'miel', fr: 'miel', de: 'Honig', zh: '蜂蜜', ja: 'ハチミツ', ru: 'мед' },
  loved: { ar: 'أحب / كان يحب', es: 'amaba', fr: 'aimait', de: 'liebte', zh: '喜欢', ja: '愛していた', ru: 'любил' },
  little: { ar: 'صغير', es: 'pequeño', fr: 'petit', de: 'klein', zh: '小的', ja: '小さな', ru: 'маленький' },
  brown: { ar: 'بني', es: 'marrón', fr: 'brun', de: 'braun', zh: '棕色', ja: '茶色', ru: 'коричневый' },
  bear: { ar: 'دب', es: 'oso', fr: 'ours', de: 'Bär', zh: '熊', ja: 'クマ', ru: 'медведь' },
  sky: { ar: 'سماء', es: 'cielo', fr: 'ciel', de: 'Himmel', zh: '天空', ja: '空', ru: 'небо' },
  blue: { ar: 'أزرق', es: 'azul', fr: 'bleu', de: 'blau', zh: '蓝色', ja: '青い', ru: 'синий' },
  green: { ar: 'أخضر', es: 'verde', fr: 'vert', de: 'grün', zh: '绿色', ja: '緑の', ru: 'зеленый' },
  helped: { ar: 'ساعد', es: 'ayudó', fr: 'a aidé', de: 'half', zh: '帮助了', ja: '手伝った', ru: 'помог' },
  friend: { ar: 'صديق', es: 'amigo', fr: 'ami', de: 'Freund', zh: '朋友', ja: '友達', ru: 'друг' },
  bunny: { ar: 'أرنوبة', es: 'conejita', fr: 'lapinette', de: 'Häschen', zh: '小兔子', ja: 'うさぎちゃん', ru: 'зайка' },
  dolphin: { ar: 'دلفين', es: 'delfín', fr: 'dauphin', de: 'Delfin', zh: '海豚', ja: 'イルカ', ru: 'дельфин' },
  jumped: { ar: 'قفز', es: 'saltó', fr: 'a sauté', de: 'sprang', zh: '跳跃', ja: 'ジャンプした', ru: 'подпрыгнул' },
  high: { ar: 'عاليا', es: 'alto', fr: 'haut', de: 'hoch', zh: '高', ja: '高く', ru: 'высоко' },
  warm: { ar: 'دافئ', es: 'cálido', fr: 'chaud', de: 'warm', zh: '温暖的', ja: '温かい', ru: 'теплый' },
  ocean: { ar: 'محيط', es: 'océano', fr: 'océan', de: 'Ozean', zh: '海洋', ja: '海', ru: 'океан' },
  smile: { ar: 'ابتسامة', es: 'sonrisa', fr: 'sourire', de: 'Lächeln', zh: '微笑', ja: '笑顔', ru: 'улыбка' },
  walked: { ar: 'مشى', es: 'caminó', fr: 'a marché', de: 'ging', zh: '走', ja: '歩いた', ru: 'шел' },
  quiet: { ar: 'هادئ', es: 'tranquilo', fr: 'calme', de: 'ruhig', zh: '安静的', ja: '静かな', ru: 'тихий' },
  streets: { ar: 'شوارع', es: 'calles', fr: 'rues', de: 'Straßen', zh: '街道', ja: '通り', ru: 'улицы' },
  tokyo: { ar: 'طوكيو', es: 'Tokio', fr: 'Tokyo', de: 'Tokio', zh: '东京', ja: '東京', ru: 'Токио' },
  morning: { ar: 'الصباح', es: 'mañana', fr: 'matin', de: 'Morgen', zh: '早晨', ja: '朝', ru: 'утро' },
  coat: { ar: 'معطف', es: 'abrigo', fr: 'manteau', de: 'Mantel', zh: '外套', ja: 'コート', ru: 'пальто' },
  key: { ar: 'مفتاح', es: 'llave', fr: 'clé', de: 'Schlüssel', zh: '钥匙', ja: '鍵', ru: 'ключ' },
  golden: { ar: 'ذهبي', es: 'dorada', fr: 'dorée', de: 'golden', zh: '金色的', ja: '金の', ru: 'золотой' }
};

export const translateWord = (cleanWord, targetLangCode) => {
  if (!cleanWord) return '';
  const raw = cleanWord.trim();
  const lower = raw.toLowerCase().replace(/[^a-z]/g, '');

  if (WORD_DICTIONARY[lower] && WORD_DICTIONARY[lower][targetLangCode]) {
    return WORD_DICTIONARY[lower][targetLangCode];
  }

  const stem = lower.replace(/ing$/, '').replace(/ed$/, '').replace(/es$/, '').replace(/s$/, '');
  if (WORD_DICTIONARY[stem] && WORD_DICTIONARY[stem][targetLangCode]) {
    return WORD_DICTIONARY[stem][targetLangCode];
  }

  if (targetLangCode === 'ar') return `ترجمة الكلمة: "${raw}"`;
  return raw;
};
