from models.model import Medico, db
from flask import request
import json
import hashlib

def signup_logic():
    try:
        data = request.json
        publicid = hashlib.md5(data.get('email').encode('UTF-8')).hexdigest()

        medico = Medico(nome = data.get('nome'), cognome = data.get('cognome'), email = data.get('email'), password = data.get('password'), publicid = publicid)

        db.session.add(medico)
        db.session.commit()
        
        return {'publicid': publicid}, 200

    except Exception as e:
        print(e)
        return 'ERR', 500

def login_logic():
    try:
        data = request.json
        
        medico = Medico.query.filter_by(email=data.get('email')).first()

        if(medico.password == data.get('password')):
            return {'publicid': medico.publicid}, 200
        else:
            return 'WRONG', 400
        
    except Exception as e:
        print(e)
        return 'ERR', 500
    
def getMedicoInfo_logic():
    try:
        data = request.json

        medico = Medico.query.filter_by(publicid=data.get('publicid')).first()

        returnObj = json.dumps({"nome": medico.nome, "cognome": medico.cognome, "email": medico.email})

        return returnObj, 200
        
    except Exception as e:
        print(e)
        return 'ERR', 500