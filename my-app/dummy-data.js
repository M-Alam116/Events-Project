const dummy_events = [
  {
    id: "e1",
    title: "Programming for everyone",
    description:
      "Everyone can learn to code! Yes, everyone! In this live event, we are going to through all the ket basics and get started with programming as well",
    location: "Somestreet 25, 12345 San SomwWhere",
    date: "2021-05-12",
    image: "images/coding-event.jpg",
    isFeatured: false,
  },

  {
    id: "e2",
    title: "Networking for introverts",
    description:
      "We know: Networking is no fun if you are an introvert person. Thats why we came",
    location: "New Wall Street 5, 97987 New Work",
    date: "2021-05-30",
    image: "images/introvert-event.jpg",
    isFeatured: true,
  },

  {
    id: "e3",
    title: "Networking for Extraverts",
    description:
      "You probably need no help with networking in general. But focusing your energy",
    location: "My Street 12, 13114 Broke City",
    date: "2022-04-15",
    image: "images/networking-event.jpg",
    isFeatured: true,
  },
];

export function getFeaturedEvents() {
  return dummy_events.filter((event) => event.isFeatured);
}

export function getAllEvents() {
  return dummy_events;
}

export function getFilteredEvents(dataFilter) {
  const { year, month } = dataFilter;

  let filteredEvents = dummy_events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export function getEventById(id) {
  return dummy_events.find((event) => event.id === id);
}
