class MongoDBClass:

    @staticmethod
    def ConnectCollection_IA_DATABASE_TRAINING():
        from pymongo import MongoClient
        client = MongoClient(
            'mongodb+srv:' +
            '//TCC-UNIP:tccdaunip2021' +
            '@cluster0.oagef.mongodb.net' +
            '/myFirstDatabase?retryWrites=true&w=majority'
        )
        db = client.TCC
        collection = db.IA_DATABASE_TRAINING
        return collection

    def InsertMongoDBCollection_IA_DATABASE_TRAINING(document):
        collection = MongoDBClass.ConnectCollection_IA_DATABASE_TRAINING()
        collection.insert_one(document)

    @staticmethod
    def ImportIADatabase():
        import pandas
        collection = MongoDBClass.ConnectCollection_IA_DATABASE_TRAINING()
        docs_mongo = collection.find()
        docs = pandas.DataFrame(columns=[
            'storm',
            'snow',
            'hail',
            'rain',
            'fog',
            'clear_day',
            'clear_night',
            'cloud',
            'cloudly_day',
            'cloudly_night',
            'none_day',
            'none_night',
            'Current Umidity'])

        for num, doc in enumerate(docs_mongo):
            doc["_id"] = str(doc["_id"])
            doc_id = doc["_id"]
            series_obj = pandas.Series(doc, name=doc_id)
            docs = docs.append(series_obj)

        docs.drop('_id', axis=1).to_csv("Export_IA_Traning.csv", index=False)

    def ReturnDocument(data):
        document = {
            'storm': data[0],
            'snow': data[1],
            'hail': data[2],
            'rain': data[3],
            'fog': data[4],
            'clear_day': data[5],
            'clear_night': data[6],
            'cloud': data[7],
            'cloudly_day': data[8],
            'cloudly_night': data[9],
            'none_day': data[10],
            'none_night': data[11],
            'Current Umidity': data[12],
            'Start': data[13]
        }
        return document
