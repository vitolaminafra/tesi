from models.model import db

def create_logic():
    try:
        # create tables if not exists.
        db.create_all()
        db.session.commit()
        return 'Tables created!'

    except Exception as e:
        print(e)
        return 'Tables not created!'