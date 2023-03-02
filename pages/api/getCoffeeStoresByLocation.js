import { fetchCoffeeStores } from "../../lib/coffee-stores";


//http:localhost:3000/api/getCoffeeStoresByLocation?latLong=38,45&limit=20

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const {latLong, limit} = req.query;
    console.log("query: ", req.query);
    const response = await fetchCoffeeStores(latLong, limit);

    return res.status(200).json({response: response})
  } catch (error) {
    console.error("Something went wrong: ", error);
    return res.status(500).json({Error: error.message})
  }
}

export default getCoffeeStoresByLocation;