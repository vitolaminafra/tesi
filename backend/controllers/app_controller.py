from services.app_service import create_logic

def index():
    return {'status': 'OK'}

def create():
    return create_logic()
    
