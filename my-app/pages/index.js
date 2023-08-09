import Head from "next/head";

import { getFeaturedEvents } from "../helpers/api-util";
import EventsList from "@/components/events/events-list";
import NewsletterRegistration from "@/components/input/newsletter-registration";

export default function HomePage(props) {
  return (
    <div>
      {/* Head is used for optimization */}
      <Head>
        <title>Nextjs Events</title>
        <meta name="description" content="find a lot of great events that allow you to evolve..."/>
      </Head>
      <NewsletterRegistration />
      <EventsList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800
  };
}
