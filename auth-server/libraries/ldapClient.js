const ldap = require("ldapjs");

class Ldap {
  constructor(username, password) {
    this.client;
    this.username = username;
    this.password = password;
  }

  authenticate() {
    this.client = ldap.createClient({
      url: "ldaps://cds.eu.novartis.net:3636",
      tlsOptions: { rejectUnauthorized: false }
    });

    return new Promise((resolve, reject) => {
      this.client.bind(
        `uid=${this.username},ou=people,ou=intranet,dc=Novartis,dc=com`,
        this.password,
        err => {
          if (err) {
            return reject(err);
          }

          resolve();
        }
      );
    });
  }

  search() {
    const opts = {
      filter: `uid=${this.username}`,
      scope: "sub",
      attributes: []
    };

    return new Promise((resolve, reject) => {
      this.client.search("dc=novartis,dc=com", opts, (err, res) => {
        if (err) {
          return reject(err);
        }

        res.on("searchEntry", data =>
          resolve(this.decodeResponse(data.object))
        );

        res.on("searchReference", data => {
          resolve(data.uris.join());
        });

        res.on("error", err => reject(`Error - ${err}`));

        res.on("end", data => reject(`Not found - ${data}`));
      });
    });
  }

  closeConnection() {
    this.client.unbind();
  }

  decodeResponse(object) {
    return {
      username: object.uid ? object.uid.toLowerCase() : "notFound",
      firstname: object.givenName || "notFound",
      lastname: object.sn || "notFound",
      fullname: object.cn || "notFound",
      email: object.mail || "notFound",
      title: object.title || "notFound",
      department: object.novaFirstPortOpLevel1Text || "notFound",
      country: object.novaCountryName || "notFound",
      countryCode: object.novaCountryCode || "notFound",
      phone: object.telephoneNumber || "notFound",
      room: object.roomNumber || "notFound",
      supervisor: object.novaOperationalManager || "notFound",
      employeeID: object.novaLocalEmployeeID || "notFound",
      hireDate: object.novaHireDate || "notFound"
    };
  }
}

module.exports = Ldap;
