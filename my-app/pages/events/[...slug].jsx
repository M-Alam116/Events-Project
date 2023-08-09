import EventsList from "@/components/events/events-list";
import { getFilteredEvents } from "@/helpers/api-util";
import { useRouter } from "next/router";
import ResultTitle from "../../components/events/results-title";
import { Fragment } from "react";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/ErrorAlert";
import Head from "next/head";

function FilteredEventsPage(props) {
  const router = useRouter();

  // const filterdData = router.query.slug;

  // if (!filterdData) {
  //   return <p className="center">Loading...</p>;
  // }

  // const filteredYear = filterdData[0];
  // const filteredMonth = filterdData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  
  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={"A list of filtered events."} />
    </Head>
  );

  if (props.hasError) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your vales</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all Events</Button>
        </div>
      </Fragment>
    );
  }

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${props.date.month}/${props.date.year}.`}
      />
    </Head>
  );

  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the choosen events</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultTitle date={date} />
      <EventsList items={filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterdData = params.slug;

  const filteredYear = filterdData[0];
  const filteredMonth = filterdData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2020 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}

export default FilteredEventsPage;
