import {connect} from 'mongoose';
import {Athlete, AthleteInterface, AthleteAuxInterface} from './ModiMongo/model/athlete';
import {MongoClient} from 'mongodb';

/**
 * Clase manager que maneja los metodos de la base de datos
 */
export class Manager {
  constructor() {}
  /**
   * Metodo addAthlete que añade un atleta a la base de datos
   * @param athlete atleta que se le pasa por parametro para añadirlo a la base de datos
   * @returns {promise<AthleteInterface>} devuelve una promesa con el atleta añadido si se añade correctamente
   */
  public addAthlete(athlete: AthleteAuxInterface): Promise<AthleteInterface> {
    return new Promise((resolve, reject) => {
      connect('mongodb://127.0.0.1:27017/dsi-assessment', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }).then(() => {
        const athleteUser = new Athlete(athlete);
        return athleteUser.save();
      }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  /**
   * Metodo searchAthlete que busca un atleta en la base de datos
   * @param name nombre de los atletas a buscar
   * @returns {promise<AthleteInterface>} devuelve una promesa con el array de atletas con ese nombre
   */
  public searchAthlete(name: string): Promise<AthleteInterface[]> {
    const dbURL = 'mongodb://127.0.0.1:27017';
    const dbName = 'dsi-assessment';
    return new Promise((resolve, reject) => {
      MongoClient.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then((client) => {
        const db = client.db(dbName);
        return db.collection<AthleteInterface>('athletes').find({
          nombre: name,
        }).toArray();
      }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  /**
   * Metodo updateAthlete que actualiza un atleta en la base de datos
   * @param athlete Atleta que se le pasa por parametro
   * @returns {Promise<Number>} devuelve una promesa con el numero de atletas modificados
   */
  public updateAthlete(athlete: AthleteAuxInterface): Promise<Number> {
    const dbURL = 'mongodb://127.0.0.1:27017';
    const dbName = 'dsi-assessment';
    return new Promise((resolve, reject) => {
      MongoClient.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then((client) => {
        const db = client.db(dbName);
        return db.collection<AthleteInterface>('athletes').updateMany({
          nif: athlete.nif,
        }, {
          $set: {
            nombre: athlete.nombre,
            apellido: athlete.apellido,
            nif: athlete.nif,
            edad: athlete.edad,
            deporte: "natacion",
            prueba: "mariposa",
            marca: 15,
          },
        });
      }).then((result) => {
        resolve(result.modifiedCount);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  /**
   * Metodo deleteAthlete que borra un atleta de la base de datos
   * @param nif nif del atleta a borrar
   * @returns <Promise<Number>> devuelve una promesa con el numero de atletas borrados
   */
  public deleteAthlete(nif: string): Promise<Number> {
    const dbURL = 'mongodb://127.0.0.1:27017';
    const dbName = 'dsi-assessment';
    return new Promise((resolve, reject) => {
      MongoClient.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then((client) => {
        const db = client.db(dbName);
        return db.collection<AthleteInterface>('athletes').deleteMany({
          nif: nif,
        });
      }).then((result) => {
        resolve(result.deletedCount as Number);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}

const manager = new Manager();

// Add
/*
const out: AthleteAuxInterface = {
  nombre: "paco",
  apellido: "perez",
  nif: "458677256",
  edad: 31,
  deporte: "futbol",
  prueba: "tiro a puerta",
  marca: 8,
};

manager.addAthlete(out).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});
*/
// Search
/*
manager.searchAthlete("paco").then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});
*/
// Update
/*
manager.updateAthlete({
  nombre: "paco",
  apellido: "perez",
  nif: "458677256",
  edad: 31,
  deporte: "futbol",
  prueba: "tiro a puerta",
  marca: 8,
}).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});
*/

// Delete
/*
manager.deleteAthlete("458677256").then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});
*/
