interface DBInput {
  insertMany(collection: string, items: Array<any>): Promise<void>;

  insertOne(collection: string, item: any): Promise<any>;

  pushToSet(collection: string, query: any, updatedFields: any): Promise<void>;
}

interface DBReader {
  findMany(
    collection: string,
    filter: Object | undefined,
    limit?: number,
    skip?: number,
    mapFunc?: Function,
  ): Promise<any>;

  findOne(collection: string, filter: Object | undefined): Promise<any>;
}

interface FileReader {
  readMonuments(): Promise<Array<any>>;
}

export { DBInput, FileReader, DBReader };
