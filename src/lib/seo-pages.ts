import type { ContentMeta } from "@/content/types";
import { getAllContentMeta } from "@/lib/content";
import { clampMetaDescription } from "@/lib/seo";

export type SeoSection = {
  heading: string;
  body: string[];
};

export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string[];
  sections: SeoSection[];
  faqs: SeoFaq[];
  relatedLessonSlugs: string[];
  keywords: string[];
  cluster: string;
};

function topicLabel(lesson: ContentMeta) {
  const map: Record<string, string> = {
    "javascript-essentials": "JavaScript",
    "git-and-github-for-beginners": "Git and GitHub",
    "notion-for-work-and-study": "Notion",
    "ui-design-with-figma": "Figma UI design",
    "seo-fundamentals": "SEO",
    "personal-finance-basics": "personal finance",
    "public-speaking-and-presentations": "public speaking",
    "docker-fundamentals": "Docker",
    "linkedin-and-personal-branding": "LinkedIn personal branding",
    "writing-clearly-for-work": "workplace writing",
    "web-development-fundamentals": "web development",
    "project-management-foundations": "project management",
    "photography-composition-masterclass": "photography composition",
    "introduction-to-artificial-intelligence": "artificial intelligence",
    "prompt-engineering-fundamentals": "prompt engineering",
    "python-from-zero": "Python",
    "excel-essentials": "Excel",
    "sql-for-beginners": "SQL",
    "data-science-first-principles": "data science",
    "aws-cloud-practitioner-essentials": "AWS cloud",
    "cybersecurity-foundations": "cybersecurity",
    "digital-marketing-complete-intro": "digital marketing",
    "drawing-for-complete-beginners": "drawing",
  };
  return map[lesson.slug] ?? lesson.title.split(":")[0].trim();
}

function primaryKeyword(lesson: ContentMeta) {
  return lesson.tags[0] || topicLabel(lesson);
}

function buildLessonPages(lesson: ContentMeta): SeoPage[] {
  const topic = topicLabel(lesson);
  const keyword = primaryKeyword(lesson);
  const lessonPathNote = `Syllaba’s “${lesson.title}” module`;

  return [
    {
      slug: `learn-${lesson.slug}`,
      title: `Learn ${topic} Online`,
      description: clampMetaDescription(
        `Learn ${topic} with a deep Syllaba lesson: clear structure, worked examples, and quizzes that explain mistakes. Preview free, then unlock.`,
      ),
      h1: `Learn ${topic} online with a lesson built to finish`,
      intro: [
        `${topic} is easier to learn when the material is structured for study instead of skim culture. ${lessonPathNote} is designed as a complete beginner-friendly module you can preview before buying.`,
        `Instead of scattered tips, you get outcomes, examples, checkpoints, and interactive quizzes that explain wrong answers — so practice reinforces judgment, not just recall.`,
      ],
      sections: [
        {
          heading: `What you actually learn in ${topic}`,
          body: [
            lesson.summary,
            `The Syllaba approach favors depth: definitions that connect to decisions, examples you can reuse, and common mistakes called out before they become habits.`,
          ],
        },
        {
          heading: "Why structured lessons beat random tutorials",
          body: [
            `Search results are full of short explainers. They help for one error, but they rarely build a complete mental model. A full lesson gives sequence: foundations first, then practice, then edge cases.`,
            `If you are comparing options, look for clear outcomes, readable structure, and feedback loops. Quizzes that explain mistakes are especially useful for ${keyword} because wrong answers often look plausible.`,
          ],
        },
        {
          heading: "How Syllaba delivers the lesson",
          body: [
            `Open the lesson page, read the free preview, and decide if the teaching style fits you. Unlock a single lesson or subscribe to the Syllaba library for full catalog access.`,
            `Purchased single lessons stay unlocked on your account. Library access covers the full catalog while your membership is active, including new lessons added during that period.`,
          ],
        },
        {
          heading: "Who this page is for",
          body: [
            `Beginners starting ${topic} from zero, career switchers rebuilding fundamentals, and professionals who want a cleaner study path than fragmented videos.`,
            `If you want a quiet, text-first lesson with practice — not a hype feed — this is the Syllaba format.`,
          ],
        },
      ],
      faqs: [
        {
          question: `Can I preview the ${topic} lesson before paying?`,
          answer:
            "Yes. Every Syllaba lesson includes a free preview with outcomes and opening sections so you can judge teaching quality first.",
        },
        {
          question: `Is this a short tip list or a full ${topic} lesson?`,
          answer: `${lessonPathNote} is a deep study module with structure, examples, and quizzes — not a skim summary.`,
        },
        {
          question: "Do I keep access after purchase?",
          answer:
            "Single-lesson unlocks remain on your account. Library subscriptions unlock the catalog while membership is active.",
        },
      ],
      relatedLessonSlugs: [lesson.slug],
      keywords: [
        `learn ${topic.toLowerCase()} online`,
        `${keyword} lesson`,
        `${keyword} for beginners`,
        "online learning with quizzes",
        "Syllaba",
      ],
      cluster: lesson.category,
    },
    {
      slug: `${lesson.slug}-course`,
      title: `${topic} Course for Beginners`,
      description: clampMetaDescription(
        `A beginner-friendly ${topic} course on Syllaba: structured teaching, examples, and quizzes that explain wrong answers. Start with a free preview.`,
      ),
      h1: `${topic} course for beginners who want real understanding`,
      intro: [
        `A good beginner ${topic} course should reduce confusion, not add noise. Syllaba packages ${topic} as a paid lesson with a free preview, clear outcomes, and practice checkpoints.`,
        `You study one coherent module instead of hopping between unrelated tutorials. That sequence matters when you are building first confidence in ${keyword}.`,
      ],
      sections: [
        {
          heading: "Course style: depth over skim",
          body: [
            `The module focuses on judgment: what to do, why it works, and what beginners usually get wrong. That is more durable than memorizing disconnected shortcuts.`,
            lesson.summary,
          ],
        },
        {
          heading: "Practice that teaches, not just scores",
          body: [
            `Interactive quizzes ask you to choose, then explain why an answer is wrong. For ${topic}, that feedback loop is often the difference between “I watched it” and “I can use it.”`,
            `Use the quizzes as study tools: retry after rereading the related section instead of racing for a perfect score on the first pass.`,
          ],
        },
        {
          heading: "Pricing that matches how people learn",
          body: [
            `Unlock only this lesson if ${topic} is your current priority, or join the Syllaba library if you want ongoing access across topics.`,
            `Either way, you can evaluate the teaching style from the free preview before you pay.`,
          ],
        },
        {
          heading: "Related skills on Syllaba",
          body: [
            `${topic} sits in the ${lesson.category} cluster. After you finish, browse neighboring lessons in the catalog to keep momentum without restarting from random search results.`,
          ],
        },
      ],
      faqs: [
        {
          question: `How long does the ${topic} course take?`,
          answer: `Plan for focused study sessions. The lesson lists an estimated study time and is written to be completed end to end, not abandoned halfway.`,
        },
        {
          question: "Are the quizzes graded for certificates?",
          answer:
            "Quizzes are learning tools with explanations. They are designed to strengthen understanding, not to gate a vanity certificate.",
        },
        {
          question: "What if I already know some basics?",
          answer: `Skim familiar sections, then use the quizzes to find gaps. Many learners discover weak spots in ${keyword} only when they have to choose between plausible options.`,
        },
      ],
      relatedLessonSlugs: [lesson.slug],
      keywords: [
        `${topic.toLowerCase()} course`,
        `${topic.toLowerCase()} for beginners`,
        `${keyword} online course`,
        "beginner course with quizzes",
      ],
      cluster: lesson.category,
    },
    {
      slug: `how-to-learn-${lesson.slug}`,
      title: `How to Learn ${topic}`,
      description: clampMetaDescription(
        `How to learn ${topic} effectively: start with structure, practice with feedback, and avoid tutorial-hopping. Syllaba’s ${topic} lesson is built for that path.`,
      ),
      h1: `How to learn ${topic} without getting stuck in tutorial loops`,
      intro: [
        `Learning ${topic} well is less about finding one magic video and more about following a sequence you can finish. The fastest-looking path is often the slowest if it keeps resetting your context.`,
        `Use a complete lesson, take notes in your own words, and test yourself with questions that explain mistakes. That is the Syllaba method for ${keyword}.`,
      ],
      sections: [
        {
          heading: "1. Start with a clear outcome",
          body: [
            `Before you open ten tabs, define what “done” looks like for this week. For ${topic}, that might be completing one coherent module and being able to explain core ideas without rereading every line.`,
            `${lessonPathNote} begins with learning outcomes so you know what progress should feel like.`,
          ],
        },
        {
          heading: "2. Prefer one structured path over random tips",
          body: [
            `Tips are useful after you have a map. Without a map, tips become noise. A structured lesson keeps vocabulary, examples, and practice aligned.`,
            `If a resource cannot show you the next step after a mistake, it is entertainment — not a study system.`,
          ],
        },
        {
          heading: "3. Practice with explanations, not only answers",
          body: [
            `When a quiz only says “correct/incorrect,” you learn less. Explanations turn errors into teaching. Syllaba quizzes are written for that.`,
            `Revisit weak sections the same day. Spaced repetition works better when the first pass already created a clean mental model.`,
          ],
        },
        {
          heading: "4. Keep access where you study",
          body: [
            `Save the lesson in your Syllaba account so you can return without hunting links. Unlock the single module or use library access if you are learning across several skills.`,
          ],
        },
      ],
      faqs: [
        {
          question: `How long should I study ${topic} each day?`,
          answer:
            "Prefer consistent 25–45 minute sessions with one checkpoint over rare marathon days. Depth compounds when context stays warm.",
        },
        {
          question: "Should I take notes?",
          answer: `Yes — short notes in your own words beat highlighting everything. Capture definitions, examples, and mistakes you almost made in ${keyword}.`,
        },
        {
          question: "When should I move to the next skill?",
          answer: `After you can explain the core ideas and pass the lesson quizzes with understanding, not memorization. Then browse related ${lesson.category} lessons on Syllaba.`,
        },
      ],
      relatedLessonSlugs: [lesson.slug],
      keywords: [
        `how to learn ${topic.toLowerCase()}`,
        `${keyword} study guide`,
        `learn ${keyword} effectively`,
        "online study method",
      ],
      cluster: lesson.category,
    },
  ];
}

function hubPages(lessons: ContentMeta[]): SeoPage[] {
  const byCategory = new Map<string, ContentMeta[]>();
  for (const lesson of lessons) {
    const list = byCategory.get(lesson.category) ?? [];
    list.push(lesson);
    byCategory.set(lesson.category, list);
  }

  const categoryHubs: SeoPage[] = Array.from(byCategory.entries()).map(
    ([category, items]) => {
      const names = items.map((item) => topicLabel(item));
      return {
        slug: `learn-${category.toLowerCase().replace(/\s+/g, "-")}-online`,
        title: `Learn ${category} Online`,
        description: clampMetaDescription(
          `Learn ${category.toLowerCase()} online with Syllaba’s deep lessons — structured teaching, examples, and quizzes. Browse ${names.slice(0, 3).join(", ")} and more.`,
        ),
        h1: `${category} lessons built for serious beginners and upskillers`,
        intro: [
          `The ${category} catalog on Syllaba is for people who want durable skills, not disposable tips. Each lesson is written to be studied end to end, with practice that explains mistakes.`,
          `Start from a free preview, unlock a single module, or subscribe for library access across topics.`,
        ],
        sections: [
          {
            heading: `What ${category} covers on Syllaba`,
            body: [
              `Current ${category} lessons include ${names.join(", ")}. Each module stands alone, so you can enter where your goal is — then expand into neighboring skills when you are ready.`,
            ],
          },
          {
            heading: "How to choose your first lesson",
            body: [
              `Pick the skill you will use this month. Open the lesson page, read the outcomes and preview, then unlock if the teaching style fits. Avoid collecting unread modules.`,
            ],
          },
          {
            heading: "Study rhythm that works",
            body: [
              `Block short sessions, finish a section, take the checkpoint quiz, and write one paragraph in your own words. That rhythm beats binge-watching without practice.`,
            ],
          },
        ],
        faqs: [
          {
            question: `Are ${category} lessons beginner friendly?`,
            answer:
              "Most Syllaba modules are written for beginners and early intermediates, with clear foundations before advanced judgment calls.",
          },
          {
            question: "Can I buy only one lesson?",
            answer:
              "Yes. Unlock a single lesson or subscribe to the library for broader access.",
          },
        ],
        relatedLessonSlugs: items.map((item) => item.slug),
        keywords: [
          `learn ${category.toLowerCase()} online`,
          `${category.toLowerCase()} lessons`,
          `${category.toLowerCase()} courses`,
          "Syllaba catalog",
        ],
        cluster: category,
      };
    },
  );

  const general: SeoPage[] = [
    {
      slug: "online-learning-platform",
      title: "Online Learning Platform for Deep Lessons",
      description:
        "Syllaba is an online learning platform for deep, structured lessons with quizzes that explain mistakes. Preview free, unlock one lesson, or join the library.",
      h1: "An online learning platform built for depth, not skim culture",
      intro: [
        "Syllaba is for learners who want lessons they can finish — warm structure, worked examples, and interactive quizzes that teach through explanations.",
        "Browse a growing catalog across AI, programming, data, business, design, marketing, and career skills. Every lesson can be previewed before you pay.",
      ],
      sections: [
        {
          heading: "What makes Syllaba different",
          body: [
            "Many platforms optimize for endless browsing. Syllaba optimizes for completion: clear outcomes, readable sections, and practice that improves judgment.",
            "You can buy a single lesson when you need one skill, or subscribe for library access while you explore multiple topics.",
          ],
        },
        {
          heading: "How access works",
          body: [
            "Create an account, preview a lesson, then unlock it or subscribe. Purchases attach to your account so you can return without hunting files or links.",
            "Support is available at support@getsyllaba.com for access and account questions.",
          ],
        },
        {
          heading: "Who Syllaba is for",
          body: [
            "Career switchers, working professionals, and self-taught learners who prefer structured study over short tip streams.",
          ],
        },
      ],
      faqs: [
        {
          question: "Is Syllaba free?",
          answer:
            "Previews are free. Full lessons unlock with a one-time purchase or library subscription.",
        },
        {
          question: "Do you offer certificates?",
          answer:
            "Syllaba focuses on understanding and practice. Quizzes are learning tools with explanations rather than certificate gates.",
        },
      ],
      relatedLessonSlugs: lessons.slice(0, 6).map((l) => l.slug),
      keywords: [
        "online learning platform",
        "deep online lessons",
        "lessons with quizzes",
        "Syllaba",
      ],
      cluster: "Platform",
    },
    {
      slug: "lessons-with-interactive-quizzes",
      title: "Lessons with Interactive Quizzes",
      description:
        "Study Syllaba lessons with interactive quizzes that explain wrong answers. Learn with feedback, not guesswork. Preview free before you unlock.",
      h1: "Lessons with interactive quizzes that explain mistakes",
      intro: [
        "A quiz that only marks right or wrong wastes the best teaching moment. Syllaba quizzes explain why an option fails, so errors become part of the lesson.",
        "That design helps beginners build judgment in technical and professional skills where plausible wrong answers are common.",
      ],
      sections: [
        {
          heading: "Feedback loops beat passive watching",
          body: [
            "Reading and choosing forces attention. Explanations then install the missing rule. Use checkpoints as study breaks, not as a race.",
          ],
        },
        {
          heading: "Where to start",
          body: [
            "Open the catalog, pick a topic you need this month, and preview the lesson. If the tone fits, unlock it and work section by section with the quizzes.",
          ],
        },
      ],
      faqs: [
        {
          question: "Are quizzes required to finish?",
          answer:
            "They are embedded as learning checkpoints. Use them to verify understanding as you go.",
        },
      ],
      relatedLessonSlugs: lessons.slice(0, 8).map((l) => l.slug),
      keywords: [
        "interactive quizzes",
        "online lessons with quizzes",
        "learn with feedback",
      ],
      cluster: "Platform",
    },
    {
      slug: "buy-single-online-lessons",
      title: "Buy Single Online Lessons",
      description:
        "Buy a single Syllaba lesson when you need one skill — or subscribe for the full library. Preview free, unlock instantly, keep access on your account.",
      h1: "Buy a single online lesson — or unlock the full library",
      intro: [
        "Not every learner wants a giant subscription on day one. Syllaba lets you unlock one deep lesson when that skill is the priority.",
        "If you plan to study across topics, the library subscription keeps the catalog open while membership is active.",
      ],
      sections: [
        {
          heading: "Single lesson unlocks",
          body: [
            "Pay once for a module, study it end to end, and keep it on your account. Ideal when you have a clear goal like SQL, Excel, Git, or prompt engineering.",
          ],
        },
        {
          heading: "Library subscription",
          body: [
            "One monthly membership unlocks the full Syllaba library, including new lessons added while you stay subscribed. Cancel anytime from your account.",
          ],
        },
      ],
      faqs: [
        {
          question: "Can I switch later?",
          answer:
            "Yes. Start with a single lesson, then subscribe if you want broader access.",
        },
      ],
      relatedLessonSlugs: lessons.slice(0, 5).map((l) => l.slug),
      keywords: [
        "buy online lesson",
        "single course unlock",
        "online lesson library",
      ],
      cluster: "Platform",
    },
    {
      slug: "structured-online-courses",
      title: "Structured Online Courses",
      description:
        "Structured online courses on Syllaba: outcomes, examples, checkpoints, and quizzes. Learn programming, data, AI, career, and creative skills with a clear path.",
      h1: "Structured online courses you can actually finish",
      intro: [
        "Structure is the product. Syllaba courses are sequenced for study: what you will learn, why it matters, how to practice, and where beginners usually slip.",
        "Browse by topic in the catalog, preview freely, then unlock the module that matches your next goal.",
      ],
      sections: [
        {
          heading: "What “structured” means here",
          body: [
            "Clear outcomes, readable sections, worked examples, and practice with explanations. No fake urgency. No content farming for watch time.",
          ],
        },
        {
          heading: "Popular starting points",
          body: [
            "Many learners begin with Python, SQL, Excel, JavaScript, prompt engineering, or career communication — then branch into neighboring skills.",
          ],
        },
      ],
      faqs: [
        {
          question: "Are courses self-paced?",
          answer:
            "Yes. Study on your schedule. Lessons stay available according to your purchase or active library membership.",
        },
      ],
      relatedLessonSlugs: lessons
        .filter((l) =>
          [
            "python-from-zero",
            "sql-for-beginners",
            "excel-essentials",
            "javascript-essentials",
            "prompt-engineering-fundamentals",
          ].includes(l.slug),
        )
        .map((l) => l.slug),
      keywords: [
        "structured online courses",
        "self-paced online courses",
        "deep study courses",
      ],
      cluster: "Platform",
    },
    {
      slug: "learn-programming-online",
      title: "Learn Programming Online",
      description:
        "Learn programming online with Syllaba: Python, JavaScript, Git, web development, Docker, and more. Structured lessons with quizzes you can preview free.",
      h1: "Learn programming online with lessons built for clarity",
      intro: [
        "Programming clicks when concepts arrive in order: how programs run, how data moves, how tools fit together. Syllaba’s development lessons are written for that sequence.",
        "Start with Python or JavaScript, add Git for collaboration, then expand into web or containers when you need them.",
      ],
      sections: [
        {
          heading: "Suggested path",
          body: [
            "Beginners: Python From Zero or JavaScript Essentials. Then Git & GitHub. Add Web Development Fundamentals or Docker when your projects need them.",
          ],
        },
        {
          heading: "Practice that sticks",
          body: [
            "Read a section, try the idea, then take the quiz. Explanations for wrong answers reduce the silent confusion that makes people quit.",
          ],
        },
      ],
      faqs: [
        {
          question: "Do I need prior experience?",
          answer:
            "Beginner modules assume curiosity, not prior code. Intermediate topics build on fundamentals taught earlier in the lesson.",
        },
      ],
      relatedLessonSlugs: lessons
        .filter((l) =>
          ["Programming", "Development"].includes(l.category),
        )
        .map((l) => l.slug),
      keywords: [
        "learn programming online",
        "python for beginners",
        "javascript for beginners",
        "git for beginners",
      ],
      cluster: "Development",
    },
    {
      slug: "learn-data-skills-online",
      title: "Learn Data Skills Online",
      description:
        "Learn data skills online with Syllaba: SQL, Excel, and data science foundations. Structured lessons, examples, and quizzes that explain mistakes.",
      h1: "Learn data skills online — SQL, Excel, and clear thinking",
      intro: [
        "Data work rewards precision. Syllaba’s data lessons teach how to ask better questions, clean inputs, and avoid confidently wrong summaries.",
        "Start with Excel or SQL depending on your tools, then deepen judgment with data science first principles.",
      ],
      sections: [
        {
          heading: "A practical order",
          body: [
            "If your workplace lives in spreadsheets, begin with Excel Essentials. If you need database access, start with SQL for Beginners. Add data science principles when you need modeling judgment.",
          ],
        },
      ],
      faqs: [
        {
          question: "Are these tools-focused or theory-focused?",
          answer:
            "Both: enough tool skill to work, enough judgment to trust the answer.",
        },
      ],
      relatedLessonSlugs: lessons
        .filter((l) => l.category === "Data")
        .map((l) => l.slug),
      keywords: ["learn sql online", "excel course", "data science for beginners"],
      cluster: "Data",
    },
    {
      slug: "learn-ai-online",
      title: "Learn AI Online",
      description:
        "Learn AI online with Syllaba: artificial intelligence foundations and prompt engineering. Deep lessons with quizzes — preview free before unlock.",
      h1: "Learn AI online without the hype spiral",
      intro: [
        "AI literacy needs calm foundations: what systems can do, where they fail, and how to work with them responsibly. Syllaba’s AI lessons are written for that clarity.",
        "Pair Introduction to Artificial Intelligence with Prompt Engineering Fundamentals for concepts plus practical workflows.",
      ],
      sections: [
        {
          heading: "Two complementary modules",
          body: [
            "Start with AI concepts if you need the map. Start with prompt engineering if you need better daily outputs. Many learners do both.",
          ],
        },
      ],
      faqs: [
        {
          question: "Is this for engineers only?",
          answer:
            "No. The lessons are written for motivated beginners and professionals who need practical literacy.",
        },
      ],
      relatedLessonSlugs: lessons
        .filter((l) => l.category === "AI")
        .map((l) => l.slug),
      keywords: [
        "learn ai online",
        "prompt engineering course",
        "artificial intelligence for beginners",
      ],
      cluster: "AI",
    },
    {
      slug: "career-skills-online",
      title: "Career Skills Online",
      description:
        "Build career skills online with Syllaba: writing, LinkedIn branding, and public speaking. Structured lessons with quizzes and free previews.",
      h1: "Career skills online: writing, presence, and positioning",
      intro: [
        "Technical skill opens doors; communication keeps them open. Syllaba’s career lessons focus on clarity, credibility, and practice you can reuse at work.",
      ],
      sections: [
        {
          heading: "Modules that transfer to real weeks",
          body: [
            "Writing Clearly for Work, LinkedIn & Personal Branding, and Public Speaking & Presentations are designed for immediate workplace use.",
          ],
        },
      ],
      faqs: [
        {
          question: "Can I take these without a technical background?",
          answer: "Yes. They are written for professionals across roles.",
        },
      ],
      relatedLessonSlugs: lessons
        .filter((l) => l.category === "Career")
        .map((l) => l.slug),
      keywords: [
        "career skills online",
        "linkedin course",
        "public speaking course",
        "business writing course",
      ],
      cluster: "Career",
    },
    {
      slug: "best-way-to-learn-online",
      title: "Best Way to Learn Online",
      description:
        "The best way to learn online: one structured path, practice with feedback, and fewer tabs. See how Syllaba lessons are built for completion.",
      h1: "The best way to learn online is the path you can finish",
      intro: [
        "“Best” is not the longest playlist. It is the system that creates understanding with the least thrash: structure, examples, and feedback.",
        "Syllaba is built around that definition — deep lessons, free previews, and quizzes that explain mistakes.",
      ],
      sections: [
        {
          heading: "A simple study protocol",
          body: [
            "1) Choose one lesson. 2) Preview and confirm the style fits. 3) Study in short sessions. 4) Use quizzes as teaching, not trophies. 5) Write a short summary from memory.",
          ],
        },
        {
          heading: "Avoid common traps",
          body: [
            "Tutorial hopping, highlight-only reading, and skipping practice all feel productive while leaving skills fragile. Prefer completion over collection.",
          ],
        },
      ],
      faqs: [
        {
          question: "How many courses should I take at once?",
          answer:
            "Usually one deep module at a time. Add a second only after the first has a weekly habit.",
        },
      ],
      relatedLessonSlugs: lessons.slice(0, 6).map((l) => l.slug),
      keywords: [
        "best way to learn online",
        "how to study online",
        "online learning tips",
      ],
      cluster: "Platform",
    },
    {
      slug: "self-paced-learning",
      title: "Self-Paced Learning",
      description:
        "Self-paced learning on Syllaba: study deep lessons on your schedule with quizzes and free previews. Unlock one skill or subscribe for the library.",
      h1: "Self-paced learning that still has a finish line",
      intro: [
        "Self-paced should not mean directionless. Syllaba gives you a complete module and lets you move through it on your calendar — with checkpoints that keep standards high.",
      ],
      sections: [
        {
          heading: "Design your week",
          body: [
            "Two to four focused sessions beat one exhausted weekend. End each session on a quiz or a written summary so progress is visible.",
          ],
        },
      ],
      faqs: [
        {
          question: "Do lessons expire?",
          answer:
            "Single-lesson purchases stay on your account. Library access lasts while your subscription is active.",
        },
      ],
      relatedLessonSlugs: lessons.slice(0, 5).map((l) => l.slug),
      keywords: ["self-paced learning", "self-paced online courses"],
      cluster: "Platform",
    },
  ];

  return [...general, ...categoryHubs];
}

export function getAllSeoPages(): SeoPage[] {
  const lessons = getAllContentMeta();
  const pages = [...hubPages(lessons), ...lessons.flatMap(buildLessonPages)];
  const seen = new Set<string>();
  return pages.filter((page) => {
    if (seen.has(page.slug)) return false;
    seen.add(page.slug);
    return true;
  });
}

export function getSeoPageBySlug(slug: string) {
  return getAllSeoPages().find((page) => page.slug === slug);
}

export function getSeoPagesByCluster(cluster: string) {
  return getAllSeoPages().filter((page) => page.cluster === cluster);
}

export function getSeoClusters() {
  const map = new Map<string, number>();
  for (const page of getAllSeoPages()) {
    map.set(page.cluster, (map.get(page.cluster) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
