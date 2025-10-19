const formDateForClient = (date: string): string => {
  const d = new Date(date); //creates a new date instance(object) that javescript can read

  //Automatically converts to user's locale(local timezone)
  const userLocale = navigator.language || "en-US";

  return d.toLocaleDateString(userLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC", //consistent data across timezones
  }); // convert date object into human readable string
};

export const fetcher = async (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((resData) => {
      console.log("Fetching data from Api output", resData);
      const formattedData = resData.data.map((item: any) => {
        const attrs = item || {};
        const BASE_URL = "http://localhost:1337";

        console.log("this is attrs for item attribute", attrs);
        const createdAt =
          formDateForClient(attrs.createdAt) ?? new Date().toISOString();

        return {
          id: item.id,
          slug: attrs.slug,
          title: attrs.title,
          excerpt: attrs.excerpt[0]?.children[0]?.text || "",
          category: attrs.category,
          date: createdAt,
          readingTime: attrs.readingTime + " min read",
          image: BASE_URL + attrs.image?.url || "",
        };
      });

      console.log("Formatted Data", formattedData);
      return { posts: formattedData };
    });

export const POSTS_API_URL = "http://localhost:1337/api/delicacies?populate=*";
