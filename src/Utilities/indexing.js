import algoliasearch from "algoliasearch";
//  Reference: https://www.algolia.com/doc/api-client/methods/indexing/

const client = algoliasearch("7LY0YPT76V", "67c441afe8bda9a32e20849908f18221");
const index = client.initIndex("Products");


// Add and Update in the index.
function saveToIndex(product) { 
  /* .saveObject(obj)
   * If the objectID exists, the record will be replaced
   * If the objectID is specified but does not exist, the record is created
   * If the objectID is not specified, the method returns an error
   */
  index.saveObject({
    objectID: product.id,
    ...product,
    price: Number(product.price),
    images: product.images[0],
  })
    .then(({ objectID }) => 
      console.log(`${objectID} indexed.`)
    )
    .catch(err => console.log(err));
}

// Delete Record from the index.
function deleteFromIndex(objectID) {
  index.deleteObject(objectID)
    .then(({ objectID }) => 
      console.log(`${objectID} deleted.`)
    )
    .catch(err => console.log(err));
}

// Reset Index. (Clear all items in the index)
function resetIndex() { 
  if (confirm('This will clear the whole index. Do you confirm?')) {
    index.clearObjects()
      .then(() =>
        res.send({
          status: "Success",
          message: "All products deleted from index.",
        })
      )
      .catch((err) => res.send(err));
  }
}


export { saveToIndex, deleteFromIndex };
// export { resetIndex };