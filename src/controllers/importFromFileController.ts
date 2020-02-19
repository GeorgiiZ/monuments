import path from 'path';
import { DBInput, FileReader } from '../interfaces/interfaces';
import MongoManager from "../classes/MongoManager";
import TextFileManager from "../classes/TextFileManager";

const debug = require('debug')('app:importFromFileController');

async function importMonuments(req: any, res: any) {
    let mongoManager = new MongoManager();
    let textFileManager = new TextFileManager();
    await importMonumentsHelper(mongoManager, textFileManager);
    res.send("Loading finished!");
}

async function importMonumentsHelper(dbManager: DBInput, fileReader: FileReader){
    for(let i = 1; i < 16; i++ ){
        const filePath = path.join(__dirname, `../../assets/${ i }.json`);
        const monuments = await fileReader.getMonuments(filePath);
        const monumentsNew = mapMonuments(monuments);
        await dbManager.insertMany(monumentsNew, 'monuments');
    }
}

function mapMonuments(monuments: Array<any>) {
    return monuments.map((monument: any) => {
        const {
            nativeId,
            nativeName,
            data: {
                general: {
                    region,
                    photo
                }
            }
        } = monument;
        return {
            nativeId,
            nativeName,
            region,
            photo
        }
    });
}

export { importMonuments }
