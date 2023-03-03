import {table, getMinifiedRecords} from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {  
  try {
    const {id, name, address, neighborhood, rating, imgUrl} = req.body;
    if(id){
      if(req.method === "POST"){
        //find a record:
        const findCoffeeStoreRecords = await table.select({
          filterByFormula: `id=${id}`,
        }).firstPage();
  
        if(findCoffeeStoreRecords.length !== 0){
          const records = getMinifiedRecords(findCoffeeStoreRecords);

          res.json(records);
        }else {  
          if(name){
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
            const records = getMinifiedRecords(createRecord);
            
            res.status(200).json({message: "create record...", records})
          } else {
            res.status(400).json({Message: "Provide a valid name."})
          }   
          }
        }         
    }else{
      res.status(400).json({Message: "Provide a valid ID."})
    }
    
  } catch (error) {
    console.error("Error finding Stores: ", error.message)
    res.status(500).json({Error: error.message})
  }
}

export default createCoffeeStore;