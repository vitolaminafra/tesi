from models.model import Paziente, Medico, Biopsia, Followup, db
from flask import request, jsonify
from datetime import datetime
import json
from sqlalchemy.inspection import inspect


def savePaziente_logic():
    try:
        data = request.json

        id_medico = Medico.query.filter_by(publicid=data.get('publicid')).first().id

        date_formatted = datetime.strptime(data.get('data'),'%d/%m/%Y')

        paziente = Paziente(nome = data.get('nome'), cognome = data.get('cognome'), data = date_formatted, sesso = data.get('sesso'), id_medico = id_medico)

        db.session.add(paziente)
        db.session.commit()
        
        return 'OK', 200

    except Exception as e:
        print(e)
        return 'ERR', 500

def getAllPazienti_logic():
    try:
        data = request.json

        id_medico = Medico.query.filter_by(publicid=data.get('publicid')).first().id

        pazienti = Paziente.query.filter_by(id_medico=id_medico).all()

        output = []

        for paziente in pazienti :
            paz = {}
            paz['id'] = paziente.id
            paz['nome'] = paziente.nome
            paz['cognome'] = paziente.cognome
            paz['data'] = paziente.data.strftime("%d-%m-%Y")
            paz['sesso'] = paziente.sesso

            output.append(paz)

        output = json.dumps(output)
        
        return output, 200

    except Exception as e:
        print(e)
        return 'ERR', 500

def getPaziente_logic():
    try:
        data = request.json

        print(data)

        paziente = Paziente.query.filter_by(id=data.get('id')).first()

        returnObj = json.dumps({"nome": paziente.nome, "cognome": paziente.cognome, "data": paziente.data.strftime("%d-%m-%Y"), "sesso": paziente.sesso})
        
        return returnObj, 200
    
    except Exception as e:
        print(e)
        return 'ERR', 500

def addBiopsia_logic():
    try:
        data = request.json

        id_paziente = data.get('id_paziente')

        date_formatted = datetime.strptime(data.get('data'),'%d/%m/%Y')

        biopsia = Biopsia(data = date_formatted, m = data.get('m'), e = data.get('e'), s = data.get('s'), t = data.get('t'), c = data.get('c'), id_paziente = id_paziente)

        db.session.add(biopsia)
        db.session.commit()
        
        return 'OK', 200

    except Exception as e:
        print(e)
        return 'ERR', 500
    
def addFollowup_logic():
    try:
        data = request.json

        id_paziente = data.get('id_paziente')

        date_formatted = datetime.strptime(data.get('data'),'%d/%m/%Y')

        followup = Followup(data = date_formatted, altezza = data.get('altezza'), peso = data.get('peso'), 
                            systolic = data.get('systolic'), diastolic = data.get('diastolic'), creatinine = data.get('creatinine'),
                             uprotein = data.get('uprotein'), nbofbpmeds = data.get('nbofbpmeds'), ras = data.get('ras'),
                              immunotherapies = data.get('immunotherapies'), id_paziente = id_paziente)

        db.session.add(followup)
        db.session.commit()
        
        return 'OK', 200

    except Exception as e:
        print(e)
        return 'ERR', 500

def getBiopsia_logic():
    try:
        data = request.json

        biopsia = Biopsia.query.filter_by(id_paziente=data.get('id')).first()

        returnObj = json.dumps({"data": biopsia.data.strftime("%d-%m-%Y"), "m": biopsia.m, "e": biopsia.e, 
                                "s": biopsia.s, "t": biopsia.t, "c": biopsia.c})
        
        return returnObj, 200
    
    except Exception as e:
        print(e)
        return 'ERR', 500