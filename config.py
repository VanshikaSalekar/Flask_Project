import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root:Vanshika123@localhost/grocerystore'
    SQLALCHEMY_TRACK_MODIFICATIONS = False  
    SECRET_KEY = os.urandom(24)  
