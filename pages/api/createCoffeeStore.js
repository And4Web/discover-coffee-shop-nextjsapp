const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_KEY);

const table = base("Coffee-Stores");

console.log("airtable table:===>", table)

const createCoffeeStore = async (req, res) => {  
  try {
    const {id, name, address, neighborhood, rating, imgUrl} = req.body;
    if(req.method === "POST"){
      //find a record:
      const findCoffeeStoreRecords = await table.select({
        filterByFormula: `id=${id}`,
      }).firstPage();
  
      console.log(findCoffeeStoreRecords);

      if(findCoffeeStoreRecords.length !== 0){
        const records = findCoffeeStoreRecords.map(record=>{
          return {
            ...record.fields
          }
        })
        res.json(records);
      }else{
        //create a record:
        const createRecord = await table.create([
          {
            fields: {
              id,
              name,
              address,
              neighborhood,
              rating,
              imgUrl
            }
          }
        ])

        const records = createRecord.map(record=>{
          return {
            ...record.fields
          }
        })
        
        res.json({message: "create record...", records})
      }
  
    }
  } catch (error) {
    console.error("Error finding Stores: ", error.message)
    res.status(500).json({Error: error.message})
  }
  
}

export default createCoffeeStore;