/// <reference path="../typings/typings.d.ts" />
import massive from 'massive';

class TableAsync {

    table: any;

    constructor(table: any) {
        this.table = table;
    }

    saveDocAsync(doc: any) : Promise<any> {
        return new Promise<any>((resolve: any, reject: any) => {
            this.table.saveDoc(doc, (err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    destroyAsync(doc: any) : Promise<any> {
        return new Promise<any>((resolve: any, reject: any) => {
            this.table.destroy(doc, (err: any, res: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    findDocAsync(doc: any) : Promise<any> {
        return new Promise<any>((resolve: any, reject: any) => {
            this.table.findDoc(doc, (err: any, res: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

}

class MassiveAsync {

    database: any;

    static connectAsync(connection: string) : Promise<MassiveAsync> {
        return new Promise<MassiveAsync>((resolve: any, reject: any) => {
            massive.connect(connection, function(err: any, db: Object) : void {
                if (err) {
                    reject(err);
                } else {
                    resolve(new MassiveAsync(db));
                }
            });
        });
    }

    static connectSync(connection: string) : MassiveAsync {
        let result: Object = massive.connectSync(connection);
        if (result) {
            return new MassiveAsync(result);
        }
    }

    constructor(db: any) {
        this.database = db;
    }

    saveDocAsync(table: string, doc: any) : Promise<any> {
        return new Promise<any>((resolve: any, reject: any) => {
            this.database.saveDoc(table, doc, (err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    getTable(table: string) : TableAsync {
        if (this.database) {
            return new TableAsync(this.database[table]);
        } else {
            return undefined;
        }
    }

}
//
// async function main() {
//     'use strict';
//
//     let db: MassiveAsync = await MassiveAsync.connectAsync('oo bar');
//     let saveDoc: any = await db.saveDocAsync('doggies', {name: 'fido'});
//
//     console.log(saveDoc.name);
// }
//
// main();
