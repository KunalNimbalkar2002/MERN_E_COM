class ApiFeatures {
  constructor(query, queryStr) {
    (this.query = query), //ntw
      (this.queryStr = queryStr);
  }
  //--------------------------------------------00000000000000000000----------------------------------------------------
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    //Remove some fields for category
    console.log("---queryCopy---:", queryCopy);
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    //Filter for price and rating
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    console.log("---queryCopy---:", queryCopy);
    return this;
  }

  // page 1:46:00
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; //10  50

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}
module.exports = ApiFeatures;
