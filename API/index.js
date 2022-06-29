const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const util = require("util");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(".public/"));

const db = mysql.createConnection({
    user: 'root',
    host: '18.233.162.213',
    password: 'AWSprojet2020.@',
    database: 'silver_cipher'
});

app.post("/api/upload/pub_key", async (req, res) => {
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    const file = req.files.file;
    const filename = file.name;

    const url = "/silver-cipher/data/public_keys/" + filename;
    await util.promisify(file.mv)(".public" + url);
    res.json({
        message: "File uploaded successfully",
        url: url,
    });
});

app.post("/api/upload/enc_file", async (req, res) => {
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    const file = req.files.file;
    const filename = file.name;

    const url = "/silver-cipher/data/enc_files/" + filename;
    await util.promisify(file.mv)(".public" + url);
    res.json({
        message: "File uploaded successfully",
        url: url,
    });
});

app.post("/api/upload/enc_key", async (req, res) => {
    console.log(req.files)
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    const file = req.files.file;
    const filename = file.name;

    const url = "/silver-cipher/data/enc_keys/" + filename;
    await util.promisify(file.mv)(".public" + url);
    res.json({
        message: "File uploaded successfully",
        url: url,
    });
});


app.get("/api/user/all", (req, res) => {
    db.query('select * from users',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.post("/api/userbypseudo", (req, res) => {
    const pseudo = req.body.pseudo;
    db.query('select * from users where pseudo like ?', [pseudo],
        (err, result) => {
            if (err) {
                console.log(err);
                console.log(1)
            } else {
                res.send(result);
                console.log(2)
            }
        })
});

app.post("/api/user", (req, res) => {
    const pseudo = req.body.pseudo;
    const mail = req.body.mail;
    const cle_publique = req.body.cle_publique;
    const tel = req.body.tel;
    const path_cert = req.body.path_cert;

    db.query(
        "insert into users (pseudo, mail, cle_publique, tel, path_cert) values (?,?,?,?,?)",
        [pseudo, mail, cle_publique, tel, path_cert],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.post("/api/newtransfer", (req, res) => {
    console.log(req.body.expediteur);
    console.log('aaaaaaaa')
    let expediteur = req.body.expediteur;
    let destinataire = req.body.destinataire;
    let pathFichCrypt = req.body.pathFichCrypt;
    let pathCleCrypt = req.body.pathCleCrypt;
    let pathCont = req.body.pathCont;

    db.query(
        "select idUser from users where pseudo = ?",
        [expediteur],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                db.query(
                    "insert into transfer (expediteur, destinataire, path_fich_crypt, path_cle_crypt, path_contexte) values (?,?,?,?,?)",
                    [
                        result[0].idUser,
                        destinataire,
                        pathFichCrypt,
                        pathCleCrypt,
                        pathCont,
                    ],
                    (error, resultt) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(resultt);
                            res.send(resultt);
                        }
                    }
                );
                
            }
        }
    );
});

app.get("/api/transfer/all", (req, res) => {
    db.query("select * from transfer", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/api/transfer/receive', (req, res) => {

    db.query('select * from transfer where destinataire = (select idUser from users where pseudo like ?)', [req.body.pseudo],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )});


app.post('/api/transfer/received', (req, res) => {

    db.query('select idTransfer, date, path_fich_crypt, path_cle_crypt, path_contexte, pseudo from transfer join users on transfer.expediteur = users.idUser where destinataire = (select idUser from users where pseudo like ?)', [req.body.pseudo],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.post('/api/transfer/sent', (req, res) => {

    db.query('select idTransfer, date, path_fich_crypt, path_cle_crypt, path_contexte, pseudo from transfer join users on transfer.destinataire = users.idUser where expediteur = (select idUser from users where pseudo like ?)', [req.body.pseudo],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

/*
app.post('/api/transfer/sent', (req, res) => {

    db.query('select * from transfer where expediteur = (select idUser from users where pseudo like ?)', [req.body.pseudo],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
*/

app.post('/api/transfer', (req, res) => {
    const expediteur = req.body.expediteur;
    const destinataire = req.body.destinataire;
    const pathFichCrypt = req.body.pathFichCrypt;
    const pathCleCrypt = req.body.pathCleCrypt;
    const pathCont = req.body.pathCont;

    db.query(
        "insert into transfer (expediteur, destinataire, path_fich_crypt, path_cle_crypt, path_contexte) values (?,?,?,?,?)",
        [expediteur, destinataire, pathFichCrypt, pathCleCrypt, pathCont],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete('/api/user', (req, res) => {

    db.query('delete from users where idUser = ?', [req.body.id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.post('/api/transferDeleteTest', (req, res) => {
    db.query('delete from transfer where idTransfer = ?', [req.body.id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

/* 

app.post("/api/connect", (req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;

    db.query('select * from user where Mail = ? and MotDePasse = ?',
    [mail, password],
    (err, result) => {
        if (err) {
            console.log(err);
            console.log(1)
        } else {
            res.send(result);
            console.log(2)
        }
    })
});

app.post('/api/user', (req, res) => {
    const civilite = req.body.civilite;
    const nom = req.body.nom;
    const idGroupeTD = req.body.idGroupeTD;
    const prenom = req.body.prenom;
    const dateDeNaissence = req.body.dateDeNaissence;
    const motDePasse = req.body.motDePasse;
    const mail = req.body.mail;
    const adresse = req.body.adresse;
    const codePostal = req.body.codePostal;
    const ville = req.body.ville;
    const numTelephone = req.body.numTelephone;

    db.query('insert into user (Civilite, Nom, idgroupeTD, Prenom, DateDeNaissence, MotDePasse, Mail, Adresse, CodePostal, Ville, NumTelephone) values (?,?,?,?,?,?,?,?,?,?,?)',
        [civilite, nom, idGroupeTD, prenom, dateDeNaissence, motDePasse, mail, adresse, codePostal, ville, numTelephone],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/api/user", (req, res) => {
    db.query('select * from user',
    (err, result) => {
        if (err) {
            console.log(err);
            console.log(1)
        } else {
            res.send(result);
            console.log(2)
        }
    })
});

app.delete("/api/user/:id", (req, res) => {
    db.query('delete from user where idUser = ?',[req.params.id],
    (err, result) => {
        if (err) {
            console.log(err);
            console.log(1)
        } else {
            res.send(result);
            console.log(2)
        }
    })
});
*/

app.listen(3001, () => {
    console.log("hey server runnin");
});

/*
app.put('/api/user/:id', (req, res) => {
    const idUser = req.params.id;
    const civilite = req.body.civilite;
    const nom = req.body.nom;
    const idGroupeTD = req.body.idGroupeTD;
    const prenom = req.body.prenom;
    const dateDeNaissence = req.body.dateDeNaissence;
    const motDePasse = req.body.motDePasse;
    const mail = req.body.mail;
    const adresse = req.body.adresse;
    const codePostal = req.body.codePostal;
    const ville = req.body.ville;
    const numTelephone = req.body.numTelephone;

    db.query('update user set Civilite = ?,Nom = ?, idGroupeTD = ?, Prenom = ?, DateDeNaissence = ?, MotDePasse = ?, Mail = ?, Adresse = ?, CodePostal = ?, Ville = ?, NumTelephone = ? where idUser = ?',
        [civilite, nom, idGroupeTD, prenom, dateDeNaissence, motDePasse, mail, adresse, codePostal, ville, numTelephone, idUser],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/api/dispo", (req, res) => {
    db.query('select * from disponibilite',
    (err, result) => {
        if (err) {
            console.log(err);
            console.log(1)
        } else {
            res.send(result);
            console.log(2)
        }
    })
});

app.delete("/api/dispo/:id", (req, res) => {
    db.query('delete from disponibilite where iddisponibilite = ?',[req.params.id],
    (err, result) => {
        if (err) {
            console.log(err);
            console.log(1)
        } else {
            res.send(result);
            console.log(2)
        }
    })
});

app.post('/api/dispo', (req, res) => {
    const idEnseignant = req.body.idEnseignant;
    const idSkill = req.body.idSkill;
    const HeureDebut = req.body.HeureDebut;
    const HeureFin = req.body.HeureFin;
    const TarifHoraire = req.body.TarifHoraire;

    db.query('insert into disponibilite (idEnseignant, idSkill, HeureDebut, HeureFin, TarifHoraire) values (?,?,?,?,?)',
        [idEnseignant, idSkill, HeureDebut, HeureFin, TarifHoraire],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.put('/api/dispo/:id', (req, res) => {
    const iddisponibilite = req.params.id;
    const idEnseignant = req.body.idEnseignant;
    const idSkill = req.body.idSkill;
    const HeureDebut = req.body.HeureDebut;
    const HeureFin = req.body.HeureFin;
    const TarifHoraire = req.body.TarifHoraire;

    db.query('update disponibilite set idEnseignant = ?, idSkill = ?, HeureDebut = ?, HeureFin = ?, TarifHoraire = ? where iddisponibilite = ?',
        [idEnseignant, idSkill, HeureDebut, HeureFin, TarifHoraire, iddisponibilite],
        (err, result) => {
            if (err) {
                console.log(err);
                console.log("not ok")
            } else {
                res.send(result);
                console.log("ok")
            }
        }
    );
});

app.get("/api/session", (req, res) => {
    db.query('select * from session',
    (err, result) => {
        if (err) {
            console.log(err);
            console.log(1)
        } else {
            res.send(result);
            console.log(2)
        }
    })
});

app.delete("/api/session/:id", (req, res) => {
    db.query('delete from session where idsession = ?',[req.params.id],
    (err, result) => {
        if (err) {
            console.log(err);
            console.log(1)
        } else {
            res.send(result);
            console.log(2)
        }
    })
});

app.post('/api/session', (req, res) => {
    const idDispo = req.body.idDispo;
    const idApprenant = req.body.idApprenant;
    const HeureDebut = req.body.HeureDebut;
    const HeureFin = req.body.HeureFin;

    db.query('insert into session (idDispo, idApprenant, HeureDebut, HeureFin) values (?,?,?,?)',
        [idDispo, idApprenant, HeureDebut, HeureFin],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.put('/api/session/:id', (req, res) => {
    const idsession = req.params.id;
    const idDispo = req.body.idDispo;
    const idApprenant = req.body.idApprenant;
    const HeureDebut = req.body.HeureDebut;
    const HeureFin = req.body.HeureFin;

    db.query('update session set idDispo = ?, idApprenant = ?, HeureDebut = ?, HeureFin = ? where idsession = ?',
        [idDispo, idApprenant, HeureDebut, HeureFin, idsession],
        (err, result) => {
            if (err) {
                console.log(err);
                console.log("not ok")
            } else {
                res.send(result);
                console.log("ok")
            }
        }
    );
});

app.get("/api/user/session/:id", (req, res) => {
    db.query('select * from session where idApprenant = ?', [req.params.id],
    (err, result) => {
        if (err) {
            console.log(err);
            console.log(1)
        } else {
            res.send(result);
            console.log(2)
        }
    })
});

app.get("/api/user/dispo/:id", (req, res) => {
    db.query('select * from disponibilite where idEnseignant = ?', [req.params.id],
    (err, result) => {
        if (err) {
            console.log(err);
            console.log(1)
        } else {
            res.send(result);
            console.log(2)
        }
    })
});

app.get("/api/user/search", (req, res) => {
    db.query('select iddisponibilite, idEnseignant, NomSkill , s.idSkill, HeureDebut, HeureFin, TarifHoraire from disponibilite join skill s on s.idskill = disponibilite.idSkill',
    (err, result) => {
        if (err) {
            console.log(err);
            console.log(1)
        } else {
            res.send(result);
            console.log(2)
        }
    })
});

app.get("/api/skill", (req, res) => {
    db.query('select * from skill',
    (err, result) => {
        if (err) {
            console.log(err);
            console.log(1)
        } else {
            res.send(result);
            console.log(2)
        }
    })
}); */
