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
    biopsia = db.relationship('Biopsia', backref='post')

class Biopsia(db.Model):
    __tablename__ = 'biopsia'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    data = db.Column(db.DateTime)
    m = db.Column(db.Boolean)
    e = db.Column(db.Boolean)
    s = db.Column(db.Boolean)
    t = db.Column(db.Integer)
    c = db.Column(db.Boolean)
    id_paziente = db.Column(db.Integer, db.ForeignKey('paziente.id'))

class Followup(db.Model):
    __tablename__ = 'followup'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    data = db.Column(db.DateTime)
    altezza = db.Column(db.Float)
    peso = db.Column(db.Float)
    systolic = db.Column(db.Float)
    diastolic = db.Column(db.Float)
    creatinine = db.Column(db.Float)
    uprotein = db.Column(db.Float)
    nbofbpmeds = db.Column(db.Integer)
    ras = db.Column(db.Integer)
    immunitherapies = db.Column(db.Boolean)
    id_paziente = db.Column(db.Integer, db.ForeignKey('paziente.id'))

