export const site = {
  name: "Madatala Mahesh Reddy",
  shortName: "Mahesh",
  title: "Growth Engineer & Senior Digital Marketer",
  url: "https://www.madatalamaheshreddy.com",
  description:
    "Madatala Mahesh Reddy — growth engineer and senior digital marketer with 10+ years in SEO, AEO/GEO, performance marketing and custom marketing tools that drive measurable ROI.",
  location: "Hyderabad, India",
  email: "mahesh@madatalamaheshreddy.com",
  phone: "+91 81434 71233",
  phoneHref: "tel:+918143471233",
  whatsappNumber: "918143471233",
  // Set this to your Calendly / Cal.com / Google Calendar booking page.
  // When empty, "Schedule Strategy Call" falls back to a WhatsApp booking message.
  calendarUrl: process.env.NEXT_PUBLIC_CALENDAR_URL ?? "",
  gaId: "G-WY88MJKLMV",
  social: {
    linkedin: "https://www.linkedin.com/in/madatala-mahesh-reddy/",
    x: "https://x.com/maheshmadatala",
    instagram: "https://www.instagram.com/hodophilemahesh",
    youtube: "https://youtube.com/@hodophilemahesh",
  },
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const bookingHref =
  site.calendarUrl ||
  whatsappLink("Hi Mahesh, I'd like to schedule a strategy call. Here's a bit about my business:");
