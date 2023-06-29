from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Medico(db.Model):
    __tablename__ = 'medico'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(255))
    cognome = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    publicid = db.Column(db.String(255), unique=True)
    paziente = db.relationship('Paziente', backref='post')

class Paziente(db.Model):
    __tablename__ = 'paziente'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(255))
    cognome = db.Column(db.String(255))
    data = db.Column(db.DateTime)
    sesso = db.Column(db.String(255))
    id_medico = db.Column(db.Integer, db.ForeignKey('medico.id'))

        