const DB = require("../config/dbconfig");
const Personal = require("../model/Personal");
const GraficaSimple = require("../model/GraficaSimiple");
const AutoPersonal = require("../model/AutoPersonal");

class Methods {
  getPersonalAll(req) {
    let promesa = new Promise((resolve, reject) => {
      let query = "SELECT * FROM personal WHERE est_pers = 1 ";
      if (req.params.txtSearch) {
        query += `AND concat(concat(nom_pers, ' '), ape_pers) LIKE '%${req.params.txtSearch}%'`;
      }
      query += " ORDER BY nom_pers, ape_pers ASC";
      DB.query(query, (err, data = new Personal()) => {
        resolve(data);
      });
    });
    return promesa;
  }

  putPersonal(req) {
    let promesa = new Promise((resolve, reject) => {
      DB.query(
        `UPDATE personal SET 
        nom_pers = '${req.body.nom_pers}', 
        ape_pers = '${req.body.ape_pers}', 
        cedu_pers = '${req.body.cedu_pers}',
        fech_nac_pers = '${req.body.fech_nac_pers}',
        sexo_pers = '${req.body.sexo_pers}',
        prof_pers = '${req.body.prof_pers}',
        dire_pers = '${req.body.dire_pers}',
        mun_pers = '${req.body.mun_pers}',
        tel_pers = '${req.body.tel_pers}',
        est_pers = '${req.body.est_pers}' 
        WHERE personal.id_pers = ${req.params.id}`,
        (err, data) => {
          if (err) {
            reject("ERROR");
            throw console.log("ERROR", err, req.body);
          }
          resolve({ STATUS: "OK" });
        }
      );
    });

    return promesa;
  }

  deletePersonal(req) {
    let promise = new Promise((resolve, reject) => {
      DB.query(
        `UPDATE personal SET est_pers = '0' WHERE id_pers = ${req.params.id} AND est_pers <> 0`,
        (err, data) => {
          if (err) {
            throw console.log(err);
          }
          resolve({ STATUS: "OK" });
        }
      );
    });

    return promise;
  }

  insertPersonal(req) {
    let promesa = new Promise((resolve, reject) => {
      DB.query(
        `INSERT INTO personal 
            (nom_pers, 
            ape_pers, 
            cedu_pers, 
            fech_nac_pers, 
            sexo_pers,
            prof_pers,
            dire_pers,
            mun_pers,
            tel_pers,
            est_pers) 
                VALUES 
            ('${req.body.nom_pers}', 
            '${req.body.ape_pers}', 
            '${req.body.cedu_pers}', 
            '${req.body.fech_nac_pers}', 
            '${req.body.sexo_pers}', 
            '${req.body.prof_pers}', 
            '${req.body.dire_pers}', 
            '${req.body.mun_pers}', 
            '${req.body.tel_pers}', 
            '${req.body.est_pers}')`,
        (err, data) => {
          if (err) {
            throw console.log("error", err);
          }
          resolve({ SUCCESS: "OK" });
        }
      );
    });
    return promesa;
  }

  getAutoPersonal(req) {
    let promesa = new Promise((resolve, reject) => {
      DB.query(
        `SELECT * FROM auto_personal WHERE rel_pers_id = ${req.params.id} GROUP BY auto_auto, marc_auto;`,
        (err, data = new AutoPersonal()) => {
          resolve(data);
        }
      );
    });
    return promesa;
  }

  putAutoPersonal(req) {
    let promesa = new Promise((resolve, reject) => {
      DB.query(
        `UPDATE auto_personal SET 
          auto_auto = '${req.body.auto_auto}', 
          marc_auto = '${req.body.marc_auto}', 
          year_auto = '${req.body.year_auto}',
          est_auto = '${req.body.est_auto}'
          WHERE id_auto = ${req.params.id}`,
        (err, data) => {
          if (err) {
            reject("ERROR");
            throw console.log("ERROR", err, req.body);
          }
          resolve({ STATUS: "OK" });
        }
      );
    });

    return promesa;
  }

  deleteAutoPersonal(req) {
    let promise = new Promise((resolve, reject) => {
      DB.query(
        `UPDATE auto_personal SET est_auto = '0' WHERE id_auto = ${req.params.id} AND est_auto <> 0`,
        (err, data) => {
          if (err) {
            throw console.log(err);
          }
          resolve({ STATUS: "OK" });
        }
      );
    });

    return promise;
  }

  insertAutoPersonal(req) {
    let promesa = new Promise((resolve, reject) => {
      DB.query(
        `INSERT INTO auto_personal 
              (auto_auto, 
              marc_auto, 
              year_auto, 
              rel_pers_id, 
              est_auto) 
                  VALUES 
              ('${req.body.auto_auto}', 
              '${req.body.marc_auto}', 
              '${req.body.year_auto}', 
              '${req.body.rel_pers_id}', 
              '${req.body.est_auto}')`,
        (err, data) => {
          if (err) {
            throw console.log("error", err);
          }
          resolve({ SUCCESS: "OK" });
        }
      );
    });
    return promesa;
  }

  getChartPie() {
    let promesa = new Promise((resolve, reject) => {
      DB.query(
        `SELECT count(*) as value, IF(est_pers = 1,'Activos','Inactivos') as name FROM personal GROUP BY est_pers;`,
        (err, data = new GraficaSimple()) => {
          resolve(data);
        }
      );
    });
    return promesa;
  }

  getChartBar() {
    let promesa = new Promise((resolve, reject) => {
      DB.query(
        `SELECT count(*) as value, 
        prof_pers as name FROM personal WHERE est_pers = '1' GROUP BY 
        prof_pers;`,
        (err, data = GraficaSimple()) => {
          resolve(data);
        }
      );
    });
    return promesa;
  }
}

module.exports = Methods;
