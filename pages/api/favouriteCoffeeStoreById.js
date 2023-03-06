import {table, findRecordById, getMinifiedRecords} from '../../lib/airtable';

const favouriteCoffeeStoreById = async (req, res) => {
  if(req.method === "PUT"){
    const {id} = req.body;
    try {
      if(id){
        console.log("id in favouriteCoffeeStoreById: ", id);
        const record = await findRecordById(id);
        // const {name, address, neighborhood, imgUrl, voting} = await record[0];
        // res.send({name, address, neighborhood, imgUrl, voting})
        if(record.length !== 0){
          const votingData = record[0].voting;
          const calculateVoting = parseInt(votingData) + 1;
          
          const updateVote = await table.update([
            {
              id: record[0].recordId,
              fields: {
                voting: calculateVoting,
              }
            }
          ])

          if(updateVote){            
            res.status(200).json({Message: "update vote success.", record});
          }

        }else{
          res.status(400).json({message: "store with this id doesn't exist."})
        }
      }else{
        res.status(400).json({message: "id is required."});
      }
    } catch (error) {
      console.log("Error while upvoting: ", error);
      res.status(500).json({message: "Error upvoting", error})
    }
  }
  res.json("update")
}

export default favouriteCoffeeStoreById