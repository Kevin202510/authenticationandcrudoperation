import * as SQLite from "expo-sqlite"

class DBConnection {

  constructor(name) {
    this.db = SQLite.openDatabase("db." + name);
  }

  async run(sql) {
    const trans = await this.getTransaction();

    return new Promise((resolve, reject) => {
      trans.executeSql(
        sql, 
        null,
        (tx, rs) => resolve(rs),
        (tx, error) => reject(error)
      )  
    })
  }

  async exec(sql) {
    let type = sql.trim().split(" ")[0];
      type = type.toUpperCase();

    if(type == 'CREATE') {
      return await this.createStatement(sql);
    }
    if(type == 'INSERT') {
      return await this.insertStatement(sql);
    }
    if(type == 'SELECT') {
      return await this.selectStatement(sql);
    }
    if(type == 'UPDATE' || type == 'DELETE') {
      return await this.updateStatement(sql);
    }  

    throw TypeError("Query must start with either one of the ff: (CREATE, SELECT, UPDATE, DELETE)");
  }

  async createStatement(sql) {
    const trans = await this.getTransaction();

    return new Promise((resolve, reject) => {
      trans.executeSql(
        sql, 
        null,
        (tx, rs) => resolve("success"),
        (tx, error) => reject(error)
      )  
    })
  }

  async selectStatement(sql) {
    const trans = await this.getTransaction();

    return new Promise((resolve, reject) => {
      trans.executeSql(
        sql, 
        null,
        (tx, rs) => resolve(rs.rows._array),
        (tx, error) => reject(error)
      )
    })
  }

  async updateStatement(sql) {
    const trans = await this.getTransaction();

    return new Promise((resolve, reject) => {
      trans.executeSql(
        sql, 
        null,
        (tx, rs) => resolve(rs.rowsAffected),
        (tx, error) => reject(error)
      )
    })
  }

  async insertStatement(sql) {
    const trans = await this.getTransaction();

    return new Promise((resolve, reject) => {
      trans.executeSql(
        sql, 
        null,
        (tx, rs) => resolve(rs.insertId),
        (tx, error) => reject(error)
      )
    })
  }

  getTransaction() {
    let transaction = new Promise((resolve, reject) => {
      this.db.transaction(tx => resolve(tx))
    })

    return transaction; 
  }
}

export default DBConnection