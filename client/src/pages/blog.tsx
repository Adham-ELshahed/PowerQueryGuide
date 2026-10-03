import { useState, useEffect, ReactNode } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Twitter, Linkedin, Github, Calendar, Clock, Tag } from "lucide-react";
import frustratedWorkerImage from "@assets/36e1fd5c-e948-4deb-8a2d-64946bfc1dbd.jfif";
import metricTrap from "@assets/metric trap.jfif";
import streetLightEffect from "@assets/streetlight effect.jfif";

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
  tags: string[];
  content?: string;     // Regular post (Markdown / Text)
  htmlFile?: string;    // Interactive HTML post (iframe)
}

// Helper to parse inline markdown (Bold, Italic, Code, Links)
const renderInline = (text: string) => {
  let html = text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
      // Apply green underline styling for Power Query Guide links
      if (url.includes('powerquery.guide/function/')) {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-green-600 underline hover:text-green-800 font-medium">${linkText}</a>`;
      }
      // Default blue styling for all other links
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline font-medium">${linkText}</a>`;
    })
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-red-600">$1</code>');
  return { __html: html };
};

export default function Blog() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [iframeHeight, setIframeHeight] = useState<number>(0);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const index = blogPosts.findIndex(post => post.id === hash);
      if (index !== -1) {
        setCurrentPostIndex(index);
      }
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const blogPosts: BlogPost[] = [
    {
      id: "records-lists-power-query",
      title: "Records & Lists in Power Query",
      author: "Ahmad Askar",
      date: "2026-03-29",
      readTime: "7 min read",
      category: "Power Query",
      featured: true,
      tags: ["Power Query", "M Language"],
      htmlFile: "records-and-lists.html"
    },
    {
      id: "kpi-paradox",
      title: "The KPI Paradox",
      author: "Ahmad Askar",
      date: "2026-02-04",
      readTime: "8 min read",
      category: "Business Strategy",
      featured: true,
      tags: ["KPIs", "Management", "Strategy"],
      htmlFile: "kpi-paradox.html"
    },
    {
      id: "list-dates-power-query",
      title: "Mastering List.Dates in Power Query",
      author: "Ahmad Askar",
      date: "2026-01-12",
      readTime: "7 min read",
      category: "Power Query",
      featured: true,
      tags: ["Power Query", "M Language", "Dates", "Calendar", "Project Management"],
      content: `The [List.Dates](https://powerquery.guide/function/List.Dates) function is a powerful tool in Power Query for generating sequential date lists, which are essential for creating dynamic calendar tables or filling gaps in data.

Here are a few practical examples of how to use it.

**1. Generating a Daily Calendar**
This is the most common use case: creating a list of every single day for a specific year. To get all days for the year 2026, you would use:

\`\`\`powerquery
List.Dates(#date(2026, 1, 1), 365, #duration(1, 0, 0, 0))
\`\`\`

- **Start:** January 1st, 2026.
- **Count:** 365 (number of days).
- **Step:** 1 day.

**2. Generating a Weekly Schedule**
If you need a list of dates representing the start of every week (e.g., every Monday) for a full year, you can adjust the step argument to 7 days.

\`\`\`powerquery
List.Dates(#date(2026, 1, 5), 52, #duration(7, 0, 0, 0))
\`\`\`

- **Start:** January 5th, 2026 (a Monday).
- **Count:** 52 occurrences.
- **Step:** 7 days.

**3. Creating a Bi-Weekly Payroll List**
If you are calculating pay periods that occur every two weeks, you simply increase the duration to 14 days.

\`\`\`powerquery
List.Dates(#date(2026, 1, 1), 26, #duration(14, 0, 0, 0))
\`\`\`

- **Start:** January 1st, 2026.
- **Count:** 26 (bi-weekly periods in a year).
- **Step:** 14 days.

**4. Dynamic Date Range (Today back to 30 days)**

In real-world scenarios, you often want a list that updates relative to the current date. You can combine [List.Dates](https://powerquery.guide/function/List.Dates) with [DateTime.LocalNow](https://powerquery.guide/function/DateTime.LocalNow).

\`\`\`powerquery
List.Dates(
    Date.From(DateTime.LocalNow()), 
    30, 
    #duration(-1, 0, 0, 0)
)
\`\`\`

- **Start:** The current date.
- **Count:** 30 dates.
- **Step:** -1 day (this counts backward in time).

**Understanding the Arguments**

<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>start</strong></td>
      <td>date</td>
      <td>The initial date where the list begins.</td>
    </tr>
    <tr>
      <td><strong>count</strong></td>
      <td>number</td>
      <td>How many total items (dates) will be in the list.</td>
    </tr>
    <tr>
      <td><strong>step</strong></td>
      <td>duration</td>
      <td>The increment between dates, defined as #duration(days, hours, minutes, seconds).</td>
    </tr>
  </tbody>
</table>

**Pro Tip:** If you want to convert this list into a table you can work with in the Power BI or Excel data model, use the **"To Table"** button in the Power Query Ribbon after running the function there will be a transform tab appearing because the function output is a list not a table.

---

To make the count argument dynamic, you need to calculate the difference between two dates using a simple subtraction (which Power Query treats as a duration) and then convert that duration into a number of days using [Duration.Days](https://powerquery.guide/function/Duration.Days).

**The Dynamic Formula Pattern**

If you have a StartDate and an EndDate, the formula looks like this:

\`\`\`powerquery
List.Dates(
    StartDate, 
    Duration.Days(EndDate - StartDate) + 1, 
    #duration(1, 0, 0, 0)
)
\`\`\`

**Note:** We add +1 to the count because the subtraction provides the difference between dates. If you want a list that includes both the start and the end date, you need that extra increment.

**Implementation Examples**

**A. Calculating between two columns**
If you are inside a table and want to generate a list of dates between a [Project Start] and [Project End] column:
1- Go to **Add Column** > **Custom Column**.
2- Use the following formula:

\`\`\`powerquery
List.Dates([Project Start], Duration.Days([Project End] - [Project Start]) + 1, #duration(1, 0, 0, 0))
\`\`\`

3- Expand the resulting list to new rows to "explode" the data into a daily grain.

**B. Calculating from a Fixed Start to "Today"**

This is perfect for a dynamic Sales or Activity report that grows every day.

\`\`\`powerquery
let
    Start = #date(2025, 1, 1),
    Today = Date.From(DateTime.LocalNow()),
    DayCount = Duration.Days(Today - Start) + 1,
    Source = List.Dates(Start, DayCount, #duration(1, 0, 0, 0))
in
    Source
\`\`\`

**Why this is useful for Project Management**

Since you are dealing with schedules, this dynamic approach allows you to:
- **Fill Gaps:** If a project has no activity between two dates, you can generate the missing rows to ensure your charts show a continuous timeline.
- **Resource Allocation:** Generate a row for every day a resource is assigned to a task to calculate total man-hours per day.

---

To exclude weekends, we use a "Generate and Filter" pattern. Because [List.Dates](https://powerquery.guide/function/List.Dates) creates a standard sequential list, we apply a filter using Date.DayOfWeek to keep only the days we want.

**The "Workdays Only" Formula**

In Power Query, [Date.DayOfWeek](https://powerquery.guide/function/Date.DayOfWeek) returns 0 for Sunday and 6 for Saturday (by default). To get Monday through Friday, we filter for values between 1 and 5.

Here is the code to generate a dynamic list of workdays between two dates:

\`\`\`powerquery
let
    StartDate = #date(2026, 1, 1),
    EndDate = #date(2026, 1, 31),
    // 1. Generate the full list of dates first
    FullList = List.Dates(
        StartDate, 
        Duration.Days(EndDate - StartDate) + 1, 
        #duration(1, 0, 0, 0)
    ),
    // 2. Filter the list to keep only Mon (1) through Fri (5)
    WorkdaysOnly = List.Select(
        FullList, 
        each Date.DayOfWeek(_, Day.Monday) < 5
    )
in
    WorkdaysOnly
\`\`\`

**Why use Day.Monday?**
By adding [Day.Monday](https://powerquery.guide/function/Day.Monday) as the optional second argument in [Date.DayOfWeek](https://powerquery.guide/function/Date.DayOfWeek), you force Power Query to treat Monday as 0. This makes your filter logic much cleaner:
- **0 to 4** = Monday to Friday (Workdays)
- **5 and 6** = Saturday and Sunday (Weekends)

**Pro Tip: Handling Holidays**

If you have a separate list of holiday dates (let's call that list Holidays), you can exclude them in the same step to create a "True Working Day" list:

\`\`\`powerquery
WorkdaysAndNoHolidays = List.Select(
    FullList, 
    each Date.DayOfWeek(_, Day.Monday) < 5 
    and not List.Contains(Holidays, _)
)
\`\`\`

**When to use this in Project Management**

This is the standard way to calculate **Project Lead Times** or **Net Working Days** without relying on Excel's NETWORKDAYS function. It gives you a physical list of dates that you can then join to your resource or task tables.`
    },
    {
      "id": "metric-trap-kpi-failure",
      "title": "The Metric Trap: Why Hitting Your Numbers Might Be Killing Your Business",
      "author": "Ahmad Askar",
      "date": "2025-12-14",
      "readTime": "6 min read",
      "category": "Business Strategy",
      "featured": true,
      "tags": ["KPIs", "Management", "Strategy", "Data Literacy", "Goodhart's Law"],
      "content": `**In modern business, we worship the dashboard.** There is a specific kind of comfort found in a spreadsheet full of green arrows pointing up. It suggests control. It suggests progress. It implies that we know exactly where the ship is steering.

But there is a dangerous difference between **"hitting the target"** and **"achieving the goal."**

We often assume that if we measure something, it will improve. The reality is often the opposite. When we rely too heavily on Key Performance Indicators (KPIs) without understanding human psychology, we inadvertently encourage our teams to destroy value in the pursuit of a number.

Here is why your metrics might be lying to you, and why the most "data-driven" companies are often the ones driving off a cliff.

[metricTrap]

**The Law of Unintended Consequences**

The fundamental flaw of every metric is captured by **Goodhart’s Law**:

> "When a measure becomes a target, it ceases to be a good measure."

This happens because metrics are simplistic representations of a complex reality. A map is not the territory. A thermometer is not the weather. When you tell a human being that their livelihood depends on moving a specific needle on a gauge, they *will* find a way to move that needle. Whether the actual result improves is entirely secondary.

Here are the three ways this manifests in the workplace.


**1. The "Pizza Delivery" Syndrome (Tunnel Vision)**

Imagine a pizza chain that sets a strict KPI: *Every pizza must be delivered in under 30 minutes.*

On paper, this looks like a metric for customer satisfaction. In reality, it is a recipe for disaster. To hit that 30-minute mark:
- Drivers speed through school zones.
- Chefs pull pizzas out of the oven before the cheese is fully melted.
- Drivers park illegally.

The metric (Speed) goes up, but the actual goal (Customer Satisfaction and Safety) plummets.

**This is Tunnel Vision.** By obsessing over a single quantifiable variable, you implicitly tell your team that nothing else matters—not quality, not safety, and not the long-term health of the brand.

**2. Gaming the System**

Humans are efficient creatures. If you incentivize an output, we will find the path of least resistance to achieve it.

**The Soviet Nail Factory**
There is a classic story about a Soviet nail factory.
- **The Metric:** Tonnage of nails produced.
- **The Result:** Workers produced a small number of gigantic, heavy, useless nails.

Realizing the mistake, the government changed the metric to the *number* of nails produced.
- **The Result:** Workers immediately switched to producing millions of microscopic, useless pin-nails.

We see this in modern offices every day:
- **Metric:** Lines of code written → **Result:** Bloated, inefficient software.
- **Metric:** Number of bugs fixed → **Result:** Developers "fixing" trivial issues while ignoring critical architectural flaws.

**The Cobra Effect**
This is the most dangerous flaw. When a metric is tied to an incentive (like a bonus), people will find the easiest way to hit the number without actually doing the work.

During British rule in India, the government offered a bounty for every dead cobra to reduce the population. The result? **The populace started breeding cobras to kill them and collect the bounty.** When the program ended, the breeders released the snakes, resulting in more cobras than before.

**3. The Streetlight Effect (Measuring the Easy)**

Perhaps the most insidious flaw is the tendency to value only what we can easily measure, while ignoring what is actually valuable.

This is known as the **Streetlight Effect**:
*A man searches for his lost keys under a streetlight at night. A police officer asks, "Are you sure you lost them here?" The man replies, "No, I lost them in the park, but this is where the light is."*

We measure website clicks because they are easy to count. We measure "hours at the desk" because it’s easy to track. But we rarely measure:
- Trust
- Creativity
- Psychological safety
- Brand reputation

Why? Because those things are messy and hard to quantify. When you manage solely by the spreadsheet, you are only managing the things that fit under the streetlight. The real threats—and opportunities—are usually hiding in the dark.

[streetLightEffect]

**How to Escape the Trap**

This doesn't mean we should abolish metrics. It means we need to stop treating them as the *truth* and start treating them as *evidence*.

To fix your KPI strategy, you must adopt a **"Counter-Measure" mindset**:

**1. Never Measure Quantity Without Quality**
If you measure how fast a call center agent hangs up the phone (Average Handle Time), you must pair it with a counter-metric for First Call Resolution. You cannot reward speed if it sacrifices the solution.

**2. Hunt for the Loophole**
Before rolling out a new KPI, play the "Evil Genius" game. Ask your team: *"If I wanted to get a huge bonus by manipulating this number without actually doing any real work, how would I do it?"* Once you find the loophole, close it before you start measuring.

**3. Accept Subjectivity**
Stop trying to turn everything into a number. Sometimes, the best way to evaluate performance is not a calculation, but a conversation.

**The Bottom Line**

Metrics are a dashboard, not the engine. If you stare at the speedometer while driving, you will eventually crash the car.

The best leaders understand that numbers tell you *what* happened, but they rarely tell you *why*. Use data to ask better questions, not to dictate the answers.`
    },
    {
      id: "raci-matrix-flat-table",
      title: "Why You Should Build Your RACI Matrix as a Flat Table — And Why I Used Power Query",
      author: "Ahmad Askar",
      date: "2025-12-1",
      readTime: "8 min read",
      category: "Power Query",
      featured: true,
      tags: ["RACI", "Power Query", "Project Management", "Data Transformation"],
      content: `**The RACI matrix is one of the simplest yet most powerful tools in project management.** It brings clarity to roles and responsibilities by answering four essential questions for every task:

- Who is Responsible? (Does the work)
- Who is Accountable? (Owns the final decision)
- Who needs to be Consulted?
- Who should be Informed?

Most people understand the concept, but they struggle with the implementation. Traditional RACIs are built as big, complex, cross-tab charts where roles sit on the top and tasks run down the side. It looks nice the first day you build it… and becomes a headache the moment real-world change begins.

That's exactly why I rebuilt my RACI using a flat table.

**The Problem With Traditional RACI Charts**

The classic "grid" RACI looks good in a PowerPoint slide, but in practice it comes with several limitations:

- ❌ Hard to maintain: Adding a new task or role often breaks the layout. You end up constantly shifting columns and adjusting formatting.
- ❌ Not scalable: Once your project grows beyond a few roles or tasks, the matrix becomes cluttered and nearly unreadable.
- ❌ Impossible to analyze: You can't easily filter, sort, or summarize responsibilities. Want to see who is overloaded? Good luck. Want to check how many tasks have unclear accountability? Not happening.
- ❌ Not automation-friendly: Try feeding a big cross-table into BI tools or workflow systems — it becomes manual work again.

So the issue isn't the RACI concept… it's the format.

[FRUSTRATED_WORKER_IMAGE]

**Why a Flat RACI Table Is a Game Changer**

A flat RACI format is simply a list of rows where each row represents a single task-role relationship. Once you convert your RACI into this structure, everything becomes easier, cleaner, and smarter.

**1. Crystal Clear Visibility**

A flat table lets you instantly see:

- All responsibilities for a task
- All tasks assigned to a specific role
- Gaps or missing Accountables
- Places where too many people are Responsible or Consulted

Filtering and slicing the data becomes effortless.

**2. Perfect for Large Projects**

Flat tables don't break when you add:

- New tasks
- New stakeholders
- New functions
- New phases

The structure stays the same. No formatting chaos. No expanding grids. Just add another row.

**3. Easy to Validate and Audit**

Common issues like:

- Multiple Accountables
- Tasks with no Responsible
- Roles that appear too often
- Steps with no I (which leads to communication issues)

… are incredibly easy to detect with simple filters.

**4. Works Seamlessly With Excel, Power BI, and Databases**

Flat tables follow a proper relational model. Everything downstream instantly benefits:

- Pivot tables
- Power BI dashboards
- Workload heatmaps
- Responsibility summaries
- Automation triggers

You get real analytics, not just a pretty table.

**Why I Used Power Query to Build and Maintain It**

Power Query is one of the most underrated tools in Excel. It's made for repeatable, automated, transformation pipelines — and the RACI process fits it perfectly.

**1. Automatic Column Unpivoting**

I started with the traditional RACI grid (tasks as rows, roles as columns). With a simple Unpivot step, Power Query converted it into the exact flat structure I needed. This turned hours of manual restructuring into a repeatable 2-second process.

**2. Clean and Consistent Data**

Power Query ensures:

- No accidental blank roles
- No inconsistent R, A, C, I entries
- Clean text
- Proper data types

Your RACI becomes reliable, not just visually organized.

**3. One-Click Refresh When Anything Changes**

If someone adds a role in the grid? Power Query picks it up.

If someone changes a task description? Power Query updates the flat table.

If the project evolves — which it always does — the RACI evolves too, without rebuilds.

**4. Ready for Analysis in Power BI**

Once the RACI is flat, loading it into Power BI opens the door to rich visuals:

- Accountability heatmaps
- Workload distribution
- Role bottleneck indicators
- Stakeholder involvement patterns
- Communication effort measurement

This turns RACI from a one-time exercise into an ongoing governance tool.

**Conclusion**

The RACI matrix is already a powerful tool — but when you modernize its format, it becomes transformative.

By switching to a flat table and using Power Query to automate the transformation, you get:

- A clean, scalable structure
- Easy maintenance
- Instant reporting
- Automated refresh
- Analytics you can actually act on

This is RACI done right. Not just as documentation — but as a living part of your project governance.

---

## Take Your RACI to the Next Level

You’ve seen how transforming a traditional RACI into a flat table can completely change the way you manage responsibilities, visibility, and accountability.

But instead of building everything from scratch…

### Start with a ready-to-use, fully automated template

✔ Pre-built flat RACI structure  
✔ Power Query transformation included  
✔ One-click refresh  
✔ Clean, scalable, and analysis-ready  
✔ Works seamlessly with Excel & Power BI  

 **[Get the RACI Matrix Template with Power Query Automation](https://www.etsy.com/listing/4338525810/raci-matrix-with-additional-power-query)**

 [RACI_ETSY_IMAGE]

 ---

 Whether you're managing a small team or a complex project, this template helps you move from static documentation to real, data-driven project governance.`
    }
  ];

  const topPosts = blogPosts.slice(0, 3);
  const filteredPosts = blogPosts;
  const currentPost = filteredPosts[currentPostIndex] || blogPosts[0];

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const index = blogPosts.findIndex(post => post.id === hash);
      if (index !== -1) {
        setCurrentPostIndex(index);
        scrollToTop();
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "IFRAME_HEIGHT") {
        setIframeHeight(event.data.height);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const results = blogPosts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search posts..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
            className="pl-10"
          />
        </div>

        {showDropdown && results.length > 0 && (
          <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded mt-1 shadow-lg max-h-60 overflow-y-auto">
            {results.map((post) => (
              <li
                key={post.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer truncate"
                onMouseDown={() => {
                  const indexInFiltered = filteredPosts.findIndex(p => p.id === post.id);
                  if (indexInFiltered !== -1) {
                    setCurrentPostIndex(indexInFiltered);
                    scrollToTop();
                    setQuery("");
                    setShowDropdown(false);
                    window.history.pushState(null, '', `#${post.id}`);
                  }
                }}
              >
                {post.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <div className="flex">
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
        <main className="flex-1 ml-0 lg:ml-[280px] pt-16 px-4 lg:px-0">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Main Content */}
              <div className="lg:col-span-3">
                
                {/* Blog Header */}
                <div className="text-center mb-12 pb-8 border-b border-gray-200">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">AA</span>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-1">Power Query Blog</h1>
                  <p className="text-lg text-gray-600 mb-4">by Ahmad Askar</p>
                  <p className="text-gray-600 mb-4">Power Query, M Language, Data Transformation and more</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://www.linkedin.com/company/power-query-guide/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                {/* Blog Post Rendering */}
                <div className="space-y-0">
                  {filteredPosts.length > 0 ? (
                    <div key={currentPost.id} id={currentPost.id} className="scroll-mt-24">
                      <article className="py-8">
                        {currentPost.featured && (
                          <Badge className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-100">
                            Featured
                          </Badge>
                        )}

                        <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
                          {currentPost.title}
                        </h2>

                        <div className="prose prose-gray max-w-none">
                          {currentPost.htmlFile ? (
                            // Render HTML File
                            <iframe
                              src={`/html/blog/${currentPost.htmlFile}`}
                              title={currentPost.title}
                              className="w-full border-0 rounded-xl"
                              style={{ height: iframeHeight ? `${iframeHeight}px` : "100vh" }}
                              scrolling="no"
                            />
                          ) : (
                            // Advanced Markdown Parser
                            (currentPost.content ?? '').split('\n\n').map((paragraph, pIndex) => {
                              const trimmedPara = paragraph.trim();
                              if (!trimmedPara) return null;

                              // 1. IMAGE MAPPING
                              const imageMap: Record<string, string> = {
                                '[FRUSTRATED_WORKER_IMAGE]': frustratedWorkerImage,
                                '[metricTrap]': metricTrap,
                                '[streetLightEffect]': streetLightEffect,
                                '[RACI_ETSY_IMAGE]': '/attached_assets/functions/Raci Matrix image.jpeg'
                              };

                              if (imageMap[trimmedPara]) {
                                return (
                                  <div key={pIndex} className="my-8 flex justify-center">
                                    <img
                                      src={imageMap[trimmedPara]}
                                      alt="Blog illustration"
                                      className="rounded-lg shadow-lg max-w-full h-auto"
                                      style={{ maxHeight: '400px' }}
                                    />
                                  </div>
                                );
                              }

                              // 2. HTML TABLES/BLOCKS
                              if (trimmedPara.startsWith('<')) {
                                return (
                                  <div 
                                    key={pIndex} 
                                    className="my-6 overflow-x-auto w-full"
                                    dangerouslySetInnerHTML={{ __html: trimmedPara }} 
                                  />
                                );
                              }

                              // 3. CODE BLOCKS
                              if (trimmedPara.startsWith('```')) {
                                const match = trimmedPara.match(/
