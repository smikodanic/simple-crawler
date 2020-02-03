/**
 * Methods common for all models.
 */
module.exports = (modelCommon) => {

  //add new doc
  const add = (doc) => {
    return modelCommon.create(doc);
  };

  //save() method or Bluebird's save()
  const save = (docObj) => {
    const doc = new modelCommon(docObj);
    return doc.save();
  };


  //count and list docs for 'moQuery'
  const list = (moQuery, limit, skip, sort, select) => {
    return modelCommon
      .countDocuments(moQuery)
      .then(resultsNum => {
        return modelCommon
          .find(moQuery)
          .limit(limit)
          .skip(skip)
          .sort(sort)
          .select(select)
          .exec()
          .then(resultsArr => {
            const results = {
              success: true,
              count: resultsNum,
              data: resultsArr
            };
            return results;
          });
      });
  };


  // delete one doc
  // First find doc, then delete doc. This is because doc.deleteOne() activate post middleware. modelName.findOneAndRemove() doesn't activate middleware.
  const deleteOne = (moQuery) => {
    return modelCommon.findOneAsync(moQuery)
      .then(doc => {
        if (!doc) { throw new Error('Doc does not exist for specified query!'); }
        return doc.deleteOne();
      });
  };


  // delete multiple files
  const deleteMultiple = (moQuery) => {
    return modelCommon.deleteMany(moQuery);
  };


  // get doc
  const getOne = (moQuery, sort) => {
    return modelCommon
      .findOne(moQuery)
      .sort(sort)
      .exec();
  };


  // update a doc
  const editOne = (moQuery, docNew, updOpts) => {
    if (!updOpts) {
      // default options https://mongoosejs.com/docs/api.html#query_Query-findOneAndUpdate
      updOpts = {
        new: true, // return newly updated doc
        upsert: false, // whether to create the doc if it doesn't match (false)
        fields: false, // which fields to select. Equivalent to .select(fields).findOneAndUpdate()
        sort: false, // how to sort fields
        runValidators: true, // validators validate the update operation against the model's schema
      };
    }

    return modelCommon.findOneAndUpdate(moQuery, docNew, updOpts).exec();
  };


  // update multiple websource documents
  const editMultiple = (moQuery, docNew, updOpts) => {
    if (!updOpts) {
      // default options https://mongoosejs.com/docs/api.html#query_Query-findOneAndUpdate
      updOpts = {
        new: true, // return newly updated doc
        upsert: false, // whether to create the doc if it doesn't match (false)
        fields: false, // which fields to select. Equivalent to .select(fields).findOneAndUpdate()
        sort: false, // how to sort fields
        runValidators: true // validators validate the update operation against the model's schema
      };
    }

    return modelCommon.updateMany(moQuery, docNew, updOpts);
  };



  // count number of docs
  const countDocs = (moQuery) => {
    return modelCommon.countDocuments(moQuery)
      .then(count => +count || 0); // + is converting string into number
  };



  return {
    add,
    save,
    list,
    deleteOne,
    deleteMultiple,
    getOne,
    editOne,
    editMultiple,
    countDocs
  };

};
