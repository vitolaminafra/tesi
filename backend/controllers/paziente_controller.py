from services.paziente_service import savePaziente_logic, getAllPazienti_logic, getPaziente_logic, addBiopsia_logic, addFollowup_logic, getBiopsia_logic

def savePaziente():
    return savePaziente_logic()

def getAllPazienti():
    return getAllPazienti_logic()

def getPaziente():
    return getPaziente_logic()

def addBiopsia():
    return addBiopsia_logic()

def addFollowup():
    return addFollowup_logic()

def getBiopsia():
    return getBiopsia_logic()