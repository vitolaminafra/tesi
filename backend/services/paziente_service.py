from models.model import Paziente, Medico, db
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


