import {table, getMinifiedRecords, findRecordById} from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {  
  try {
    const {id, name, address, neighborhood, voting, imgUrl} = req.body;
    
    if(id){
      if(req.method === "POST"){
        //find a record:
        const record = await findRecordById(id);  

        if(record.length !== 0){
          res.json( record);
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
                  voting,
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