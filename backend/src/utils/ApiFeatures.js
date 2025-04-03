class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        if (this.queryStr.search) {
            this.query = this.query.find({
                farmName: { $regex: this.queryStr.search, $options: "i" }
            });
        }
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        const removeFields = ["search", "sort", "page", "limit"];
        removeFields.forEach((field) => delete queryCopy[field]);
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    sort() {
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.replace(",", " ");
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-createdAt"); // Default: Newest first
        }
        return this;
    }

    paginate(resultsPerPage) {
        const page = parseInt(this.queryStr.page) || 1;
        const skip = (page - 1) * resultsPerPage;

        this.query = this.query.skip(skip).limit(resultsPerPage);
        return this;
    }
}

export default ApiFeatures;
