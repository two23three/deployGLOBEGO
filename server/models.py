from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()
# Define the User model
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    tickets = db.relationship('Ticket', back_populates='user')
    reviews = db.relationship('Review', back_populates='user')

# Define the Location model
class Location(db.Model):
    serialize_rules = ('-tickets', '-reviews')
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String(120), nullable=False)
    image_url = db.Column(db.String, nullable=True)
    
    tickets = db.relationship('Ticket', back_populates='location')
    reviews = db.relationship('Review', back_populates='location')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image_url': self.image_url,
            'reviews': [review.to_dict() for review in self.reviews]

        }
   

# Define the Ticket model
class Ticket(db.Model, SerializerMixin):
    __tablename__ = 'tickets'
    
    serialize_rules = ('-user', '-location')
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    price = db.Column(db.Float, nullable=False)
    means = db.Column(db.String(50), nullable=False)
    seat_no = db.Column(db.Integer, nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'), nullable=False)
    
    user = db.relationship('User', back_populates='tickets')
    location = db.relationship('Location', back_populates='tickets')

# Define the Review model
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(200), nullable=False)
    
    user = db.relationship('User', back_populates='reviews')
    location = db.relationship('Location', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'location': {
                'id': self.location.id,
                'name': self.location.name,
                'description': self.location.description,
                'image_url': self.location.image_url
            },
            'rating': self.rating,
            'comment': self.comment
        }

