//initialize unsplash

// import { createApi } from "unsplash-js";

// // on your node server
// const unsplashApi = createApi({
//   accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
//   //...other fetch options
// });

const getUrlForCoffeeStores = (latLong, query, limit) => {
  // return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;

  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&radius=100&limit=${limit}`
  // 41.8781%2C-87.6298 ->example from foursquare
  // 28.63224550693133%2C%2077.21996673296462
};

// const getListOfCoffeeStorePhotos = async () => {
//   const photos = await unsplashApi.search.getPhotos({
//     query: "coffee shop",
//     perPage: 40,
//   });
//   const unsplashResults = photos.response?.results || [];
//   return unsplashResults.map((result) => result.urls["small"]);
// };

const options = {
  method: "GET",
  headers: {
    Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
  }
}

export const fetchCoffeeStores = async () => {
  try {
    // const photos = await getListOfCoffeeStorePhotos();
    const response = await fetch(
      getUrlForCoffeeStores("41.8781%2C-87.6298", "coffee", 10),
     options
    );
    const data = await response.json();

    return (
      data.results?.map((venue, idx) => {
        const neighbourhood = venue.location.neighborhood;
        return {
          // ...venue,
          id: venue.fsq_id,
          address: venue.location.address || "",
          name: venue.name,
          neighbourhood:
            (neighbourhood && neighbourhood.length > 0 && neighbourhood[0]) ||
            venue.location.cross_street ||
            "",
          imgUrl: photos[idx],
        };
      }) || []
    );
  } catch (error) {
    if (
      !process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY ||
      !process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
    ) {
      console.error(
        "🚨 Make sure to setup your API keys, checkout the docs on Github 🚨"
      );
    }
    console.log("Something went wrong fetching coffee stores", error);
    return [];
  }
};
