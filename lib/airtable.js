const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_KEY);

const table = base("Coffee-Stores");

const minify = (record) => {  
  
    return {
      recordId: record.id,
      ...record.fields
    } 
}

const getMinifiedRecords = (records) => {
  return records.map(record => {    
    return minify(record)
  });
}

const findRecordById = async (id) => {
  const findCoffeStoreById = await table.select({
    filterByFormula: `id="${id}"`
  }).firstPage();

  return getMinifiedRecords(findCoffeStoreById);
}

export {table, getMinifiedRecords, findRecordById};