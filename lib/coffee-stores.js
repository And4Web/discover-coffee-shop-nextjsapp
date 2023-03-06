//initialize unsplash
import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  
});

//retreive photos from unsplash api:
const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "chai coffee",
    page:1,
    perPage: 30,
  });

  const unsplashResults = photos.response.results || [];
  return unsplashResults.map((result) => result.urls["small"]);
};

//generate foursquare search link:
const getUrlForCoffeeStores = (latLong, query, limit) => {
  let latLongNew = latLong.split(",").join("%2C");
  // return `https://api.foursquare.com/v3/places/nearby?ll=${latLongNew}&query=${query}&limit=${limit}`;

  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLongNew}&limit=${limit}`
  // 41.8781,-87.6298 ->example from foursquare
  // 28.63224550693133,-77.21996673296462
  // 28.59913746793468%2C77.20337350487291 ==> new delhi
};

const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
  }
}

export const fetchCoffeeStores = async (latLong="28.59913746793468,77.20337350487291") => {
  try {
    const photos = await getListOfCoffeeStorePhotos();
    const response = await fetch(
      getUrlForCoffeeStores(latLong, "coffee", 30), options
    );
    const data = await response.json();

      return(
        data.results.map((venue, idx) => {
        const neighborhood = venue.location.neighborhood;
        
        return {
          id: venue.fsq_id,
          address: venue.location.address || "",
          name: venue.name,
          neighborhood:
            (neighborhood && neighborhood.length > 0 && neighborhood[0]) ||
            venue.location.cross_street ||
            "",
          imgUrl: (photos.length > 0 ? photos[idx] : photos[0]),
        };
      }) || []   
      )
  } catch (error) {
    if (
      !process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY ||
      !process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
    ) {
      console.error(
        "🚨 Make sure to setup your API keys, checkout the docs on Github 🚨"
      );
    }
    console.error("Something went wrong fetching coffee stores", error);
    return [];
  }
};
