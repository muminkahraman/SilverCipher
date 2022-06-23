const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'mysql_aws',
    host: 'localhost',
    password: 'AWSprojet2022.@',
    database: 'silver_cipher'
});

db.query('insert into users (pseudo, mail, cle_publique, tel, path_cert) values (?,?,?,?,?)',
        ["pssseudo", "mailll", "cleeeeee", "tellll", "pathhh"],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );


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

app.listen(3001, () => {
    console.log("hey server runnin")
})

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
});