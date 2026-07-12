/** Knowledge base — edit freely. (PLAN.md ‹CONFIRM› for policy wording.) */
export interface FaqItem {
  q: string;
  a: string;
  group: "Before you book" | "On the day" | "Safety & weather" | "Policies";
}

export const faq: FaqItem[] = [
  {
    group: "Before you book",
    q: "Do I need any kayaking experience?",
    a: "No. Our Budva tour is beginner-friendly and both tours start with a paddle & safety briefing. If you can swim and follow the guide, you'll be fine.",
  },
  {
    group: "Before you book",
    q: "What's the minimum age?",
    a: "The Budva tour is suitable from age 8 and the Kotor tour from age 12, accompanied by an adult. Younger children can join in a double kayak with a parent — message us to arrange. ‹CONFIRM›",
  },
  {
    group: "Before you book",
    q: "How do I pay?",
    a: "You request a booking online with no payment. Once we confirm your spot, you pay in person on the day (cash or card). ‹CONFIRM payment methods›",
  },
  {
    group: "On the day",
    q: "What should I bring?",
    a: "Swimwear, a towel, reef-safe sunscreen, water shoes and a change of clothes. We provide the kayak/SUP, life jacket, dry bag and drinking water.",
  },
  {
    group: "On the day",
    q: "What's included?",
    a: "Your kayak or paddleboard, life jacket, a local certified guide, drinking water and basic snorkel gear. See each tour page for details.",
  },
  {
    group: "On the day",
    q: "Where do we meet?",
    a: "Exact meeting points are shown on the interactive launch map on each tour page, including parking, restrooms and the launch dock. You'll also get directions in your confirmation email.",
  },
  {
    group: "Safety & weather",
    q: "Is it safe? What about the cliff jumping?",
    a: "Safety is our priority: life jackets for everyone, small groups and certified guides who monitor conditions. Cliff jumping on the Kotor tour is always optional and at your own pace.",
  },
  {
    group: "Safety & weather",
    q: "How do I know if conditions are good?",
    a: "Every tour page shows a live conditions widget with current water temperature, wind speed and a simple green/amber/red paddle status pulled from marine forecasts.",
  },
  {
    group: "Policies",
    q: "What if the weather is bad?",
    a: "If conditions are unsafe we'll reschedule you to another slot or offer a full refund of any payment. Safety calls are made by your guide on the day. ‹CONFIRM policy›",
  },
  {
    group: "Policies",
    q: "What is your cancellation policy?",
    a: "Free cancellation up to 24 hours before your tour. Because you pay on the day, there's nothing to refund for earlier cancellations — just let us know. ‹CONFIRM policy›",
  },
];
