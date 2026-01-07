export interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  readTime: string;
  slug: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "6 months in building the best concierge service",
    description: "A bit of my journed from hackathon, to side project, to going all it, and now officialy running my company with my Cofounder.",
    date: "2026-01-01",
    readTime: "8 min",
    slug: "6-months-in-tableswap",
    tags: ["TableSwap"],
    content: `
      It's been 6 months since I graduated, and unconsciouscly just also signed to end up starting my entreprenurial journey with my cofounder. It's started during a hackathon in the finals week, a 5 days hackathon. If you want to learn more about how hackathons are changing look here.

      During the 5 days hack, our goal was to generate as much revenue as possible. And so we did. $60 bucks, 2 clients. We didn't wait because the other criteria was to go viral and some other team did better than us. I'd say from the start, nothing changed, we keep making revenue, and never want viral.

      TableSwap starts with the goal of helping people facing a big issue: getting restaurant reservations. When Ryan exposed me to this problem, I was a bit skeptical, but still tried to learn and understand more about that. It's actually true, in some countries, it's just painful, or impossible to get these reservations.

      So our whole goal was just to understand if people are willing to pay to outsource these reservations to us. Spoiler, they do, and they love it. People understand how valuable is our service because of our customer service.
    `
  },
  {
    id: 2,
    title: "My website is becoming my main communication channel",
    description: "I am testing something probably stupid, but still I am testing it. I want to centralized everything I would post on social media to my personal website. What's gonna happen? Will I reach some people?",
    date: "2026-05-01",
    readTime: "8 min",
    slug: "experiement-website-as-social-media",
    tags: ["Experiment"],
    content: `
      So here's the thing, I am not sure how you got here. But I am geniunely sick of anything reading and seeing on any type of social media. X's team has 0 clue what they are doing with their algorithm, Linkedin, I mean, it's just LinkedIn. And than YouTube, and Instagram have shifted their focus on short form content, which is just intoxicating people.

      However, I do like the idea of sharing content of our life, but I also don't want to pay the price of engaging with a engagement based algorithm. I do enjoy valuable content, I like to see what the people I know are up to, but everything is shifting away from this.

      But this should not limit me on sharing this, especially if it can be helpful for me first of all, to reflect on the things I am doing, and to just keep a record of all the decisions I take.

      Thankfully, software is getting just easier and easier to build, so no one can stop me from making my own social media type of website, where I can just post any type of content I like, from videos, essays, caroulels, like literally anything.

      Before you say that, I am aware of the downside that this has compared to traditional social media posting, first and foremost comes, virality. That's why I am calling this an experiment.

      I am starting this experiment of just posting anything that I like on here, and treat this personal website like my universal social media page.

      Geniunely not sure if someone can reach it, but what I know for sure is that Google SEO bots are mainly looking for very personal content, and there's nothing more personal that a constantly updated personal website
    `
  }
];
