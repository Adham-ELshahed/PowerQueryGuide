import { useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Twitter, Linkedin, Github, Calendar, Clock, Tag } from "lucide-react";
import { Link } from "wouter";
import frustratedWorkerImage from "@assets/36e1fd5c-e948-4deb-8a2d-64946bfc1dbd.jfif";
import metricTrap from "@assets/metric trap.jfif";
import streetLightEffect from "@assets/streetlight effect.jfif";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
  tags: string[];
}

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Blog posts
  const blogPosts: BlogPost[] = [
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

**Ready to implement this approach?** [Get the complete RACI Matrix template with Power Query transformation here](https://businessish.etsy.com/listing/4338525810/raci-matrix-with-additional-power-query)`
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

But there is a dangerous difference between **\"hitting the target\"** and **\"achieving the goal.\"**

We often assume that if we measure something, it will improve. The reality is often the opposite. When we rely too heavily on Key Performance Indicators (KPIs) without understanding human psychology, we inadvertently encourage our teams to destroy value in the pursuit of a number.

Here is why your metrics might be lying to you, and why the most \"data-driven\" companies are often the ones driving off a cliff.

[metricTrap]

**The Law of Unintended Consequences**

The fundamental flaw of every metric is captured by **Goodhart’s Law**:

> \"When a measure becomes a target, it ceases to be a good measure.\"

This happens because metrics are simplistic representations of a complex reality. A map is not the territory. A thermometer is not the weather. When you tell a human being that their livelihood depends on moving a specific needle on a gauge, they *will* find a way to move that needle. Whether the actual result improves is entirely secondary.

Here are the three ways this manifests in the workplace.


**1. The \"Pizza Delivery\" Syndrome (Tunnel Vision)**

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
- **Metric:** Number of bugs fixed → **Result:** Developers \"fixing\" trivial issues while ignoring critical architectural flaws.

**The Cobra Effect**
This is the most dangerous flaw. When a metric is tied to an incentive (like a bonus), people will find the easiest way to hit the number without actually doing the work.

During British rule in India, the government offered a bounty for every dead cobra to reduce the population. The result? **The populace started breeding cobras to kill them and collect the bounty.** When the program ended, the breeders released the snakes, resulting in more cobras than before.

**3. The Streetlight Effect (Measuring the Easy)**

Perhaps the most insidious flaw is the tendency to value only what we can easily measure, while ignoring what is actually valuable.

This is known as the **Streetlight Effect**:
*A man searches for his lost keys under a streetlight at night. A police officer asks, \"Are you sure you lost them here?\" The man replies, \"No, I lost them in the park, but this is where the light is.\"*

We measure website clicks because they are easy to count. We measure \"hours at the desk\" because it’s easy to track. But we rarely measure:
- Trust
- Creativity
- Psychological safety
- Brand reputation

Why? Because those things are messy and hard to quantify. When you manage solely by the spreadsheet, you are only managing the things that fit under the streetlight. The real threats—and opportunities—are usually hiding in the dark.

[streetLightEffect]

**How to Escape the Trap**

This doesn't mean we should abolish metrics. It means we need to stop treating them as the *truth* and start treating them as *evidence*.

To fix your KPI strategy, you must adopt a **\"Counter-Measure\" mindset**:

**1. Never Measure Quantity Without Quality**
If you measure how fast a call center agent hangs up the phone (Average Handle Time), you must pair it with a counter-metric for First Call Resolution. You cannot reward speed if it sacrifices the solution.

**2. Hunt for the Loophole**
Before rolling out a new KPI, play the \"Evil Genius\" game. Ask your team: *\"If I wanted to get a huge bonus by manipulating this number without actually doing any real work, how would I do it?\"* Once you find the loophole, close it before you start measuring.

**3. Accept Subjectivity**
Stop trying to turn everything into a number. Sometimes, the best way to evaluate performance is not a calculation, but a conversation.

**The Bottom Line**

Metrics are a dashboard, not the engine. If you stare at the speedometer while driving, you will eventually crash the car.

The best leaders understand that numbers tell you *what* happened, but they rarely tell you *why*. Use data to ask better questions, not to dictate the answers.`
}
  ];

  const categories = ["All", "Power Query", "Power BI", "DAX", "M Language", "Analysis Services"];
  const topPosts = blogPosts.slice(0, 3);

  // Filter posts based on search query
  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );



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
                    <Link href="https://twitter.com/ahmadaskar" className="text-gray-400 hover:text-blue-500">
                      <Twitter className="h-5 w-5" />
                    </Link>
                    <Link href="https://linkedin.com/in/ahmadaskar" className="text-gray-400 hover:text-blue-600">
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link href="https://github.com/ahmadaskar" className="text-gray-400 hover:text-gray-900">
                      <Github className="h-5 w-5" />
                    </Link>
                  </div>
                </div>



                {/* Blog Posts */}
                <div className="space-y-0">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                      <div key={post.id} id={post.id} className="scroll-mt-24">
                        <article className="py-8">
                          {post.featured && (
                            <Badge className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-100">
                              Featured
                            </Badge>
                          )}
                          
                          <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
                            {post.title}
                          </h2>
                          
                          <div className="prose prose-gray max-w-none">
  {post.content.split('\n\n').map((paragraph, pIndex) => {
    
    // 1. DEFINE IMAGE MAPPING
    // This connects the text tag to your imported variable
    const imageMap: Record<string, string> = {
      '[FRUSTRATED_WORKER_IMAGE]': frustratedWorkerImage,
      '[metricTrap]': metricTrap,
      '[streetLightEffect]': streetLightEffect
    };

    const trimmedLine = paragraph.trim();

    // 2. CHECK IF PARAGRAPH IS AN IMAGE TAG
    if (imageMap[trimmedLine]) {
      return (
        <div key={pIndex} className="my-8 flex justify-center">
          <img 
            src={imageMap[trimmedLine]} 
            alt="Blog illustration"
            className="rounded-lg shadow-lg max-w-full h-auto"
            style={{ maxHeight: '400px' }}
          />
        </div>
      );
    }
                              
                              // Handle code blocks
                              if (paragraph.startsWith('```')) {
                                const lines = paragraph.split('\n');
                                const language = lines[0].slice(3);
                                const code = lines.slice(1, -1).join('\n');
                                
                                return (
                                  <div key={pIndex} className="my-6">
                                    <div className="bg-gray-900 rounded-t-lg px-4 py-2 flex items-center justify-between">
                                      <span className="text-gray-400 text-xs font-mono uppercase">{language || 'code'}</span>
                                      <button 
                                        onClick={() => navigator.clipboard.writeText(code)}
                                        className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-gray-700"
                                      >
                                        Copy
                                      </button>
                                    </div>
                                    <pre className="bg-gray-800 text-gray-100 p-4 rounded-b-lg text-sm overflow-x-auto font-mono leading-relaxed">
                                      <code>{code}</code>
                                    </pre>
                                  </div>
                                );
                              }
                              
                              // Handle headings
                              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                                return (
                                  <h3 key={pIndex} className="text-xl font-bold text-gray-900 mt-8 mb-4">
                                    {paragraph.slice(2, -2)}
                                  </h3>
                                );
                              }
                              
                              // Handle regular content with rich formatting
                              const renderRichText = (text: string) => {
                                // Handle images ![alt](url)
                                text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-lg shadow-md my-4 max-w-full h-auto" />');
                                
                                // Handle videos <video>
                                text = text.replace(/<video([^>]*)>/g, '<video$1 class="rounded-lg shadow-md my-4 max-w-full">');
                                
                                // Handle iframes (YouTube embeds)
                                text = text.replace(/<iframe([^>]*)>/g, '<div class="relative my-6 aspect-video"><iframe$1 class="absolute inset-0 w-full h-full rounded-lg"></div>');
                                
                                // Handle links [text](url)
                                text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-green-600 hover:text-green-800 underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>');
                                
                                // Handle bold **text**
                                text = text.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>');
                                
                                // Handle italic *text*
                                text = text.replace(/\*([^*]+)\*/g, '<em class="italic text-gray-700">$1</em>');
                                
                                // Handle inline code `code`
                                text = text.replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>');
                                
                                // Handle emojis and special characters
                                text = text.replace(/🚀/g, '<span class="text-blue-500">🚀</span>');
                                text = text.replace(/⚠️/g, '<span class="text-yellow-500">⚠️</span>');
                                text = text.replace(/📚/g, '<span class="text-green-500">📚</span>');
                                text = text.replace(/🎥/g, '<span class="text-red-500">🎥</span>');
                                text = text.replace(/💡/g, '<span class="text-yellow-400">💡</span>');
                                text = text.replace(/🔧/g, '<span class="text-blue-400">🔧</span>');
                                text = text.replace(/📊/g, '<span class="text-purple-500">📊</span>');
                                
                                return text;
                              };
                              
                              // Handle list items
                              if (paragraph.includes('- ') || paragraph.includes('1. ') || paragraph.includes('2. ') || paragraph.includes('3. ')) {
                                const lines = paragraph.split('\n');
                                return (
                                  <div key={pIndex} className="my-4">
                                    {lines.map((line, lIndex) => {
                                      if (line.startsWith('- ')) {
                                        return (
                                          <div key={lIndex} className="flex items-start mb-2">
                                            <span className="text-green-600 mr-3 mt-1 text-sm">•</span>
                                            <span 
                                              className="text-gray-700 leading-relaxed flex-1"
                                              dangerouslySetInnerHTML={{ __html: renderRichText(line.slice(2)) }}
                                            />
                                          </div>
                                        );
                                      } else if (/^\d+\.\s/.test(line)) {
                                        const match = line.match(/^(\d+)\.\s/);
                                        const number = match ? match[1] : '1';
                                        const content = line.replace(/^\d+\.\s/, '');
                                        return (
                                          <div key={lIndex} className="flex items-start mb-2">
                                            <span className="text-green-600 mr-3 font-semibold text-sm">{number}.</span>
                                            <span 
                                              className="text-gray-700 leading-relaxed flex-1"
                                              dangerouslySetInnerHTML={{ __html: renderRichText(content) }}
                                            />
                                          </div>
                                        );
                                      } else if (line.trim()) {
                                        return (
                                          <p key={lIndex} className="mb-2 text-gray-700 leading-relaxed" 
                                             dangerouslySetInnerHTML={{ __html: renderRichText(line) }} />
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                );
                              }
                              
                              // Handle regular paragraphs
                              if (paragraph.trim()) {
                                return (
                                  <p key={pIndex} className="mb-4 text-gray-700 leading-relaxed" 
                                     dangerouslySetInnerHTML={{ __html: renderRichText(paragraph) }} />
                                );
                              }
                              
                              return null;
                            })}
                          </div>
                          
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-6 pt-4 border-t border-gray-100">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(post.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {post.readTime}
                            </div>
                            <div className="flex items-center">
                              <Tag className="h-4 w-4 mr-1" />
                              <Badge variant="outline" className="text-xs">
                                {post.category}
                              </Badge>
                            </div>
                            <span>by {post.author}</span>
                          </div>
                        </article>
                        
                        {/* Thin line separator between posts */}
                        {index < filteredPosts.length - 1 && (
                          <div className="border-t border-gray-200"></div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">No Blog Posts Yet</h2>
                      <p className="text-gray-600">
                        Blog posts will appear here when they are added to the site.
                      </p>
                    </div>
                  )}
                </div>


              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6 max-h-[calc(100vh-6rem)] overflow-y-auto">
                  {/* Search and Language Controls */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Search</h3>
                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search posts..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>

                    </div>
                  </div>

                  {/* Top Posts */}
                  {topPosts.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Posts</h3>
                      <div className="space-y-4">
                        {topPosts.map((post) => (
                          <div key={post.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                            <h4 className="font-medium text-gray-900 text-sm leading-tight mb-2">
                              <a 
              href={`#${post.id}`} 
              className="hover:text-blue-600 transition-colors block"
              onClick={(e) => {
                // Optional: Smooth scroll behavior
                e.preventDefault();
                document.getElementById(post.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {post.title}
            </a>
                            </h4>
                            <div className="text-xs text-gray-600">
                              {new Date(post.date).toLocaleDateString()} • {post.readTime}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}




                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
