import {table, getMinifiedRecords, findRecordById} from '../../lib/airtable';

const getCoffeeStoreById = async (req, res) => {
  const {id} = req.query;

  try {
    if(id){
      const record = await findRecordById(id);
      if(record.length !== 0){
        res.status(200).json(records);
      }else{
        res.status(400).json({message: `store with id <${id}> could not be found in our database.`});
      }
    }else{
      res.status(400).json({message: `id is required.`})
    }
    
  } catch (error) {
    res.status(500).json({Error: error.message});
  }
}

export default getCoffeeStoreById;