from flask import Blueprint, request
from flask_restful import Api, Resource, reqparse 
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager
import os
from models import db, Location, User, Ticket

administrator_bp = Blueprint('administrator_bp', __name__, url_prefix='/administrator')
administrator_api = Api(administrator_bp)

location_args = reqparse.RequestParser()
location_args.add_argument("name", type=str, help="Name of the location")
location_args.add_argument("description", type=str, help="Description of the location")
location_args.add_argument("image_url", type=str, help="Image URL of the location")

ticket_args = reqparse.RequestParser()
ticket_args.add_argument("location_id", type=int, required=True, help="ID of the location")
ticket_args.add_argument("price", type=float, required=True, help="Price of the ticket")
ticket_args.add_argument("means", type=str, required=True, help="Means of travel")
ticket_args.add_argument("seat_no", type=int, required=True, help="Seat number")

class AddLocation(Resource):
    @jwt_required()
    def post(self):
        data = location_args.parse_args()
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return {"message": "User not found"}, 404
        
        location = Location(name=data["name"], description=data["description"], image_url=data["image_url"])
        db.session.add(location)
        db.session.commit()
        return {"message": "Location added successfully"}, 201

class GetLocations(Resource):
    @jwt_required()
    def get(self):
        locations = Location.query.all()
        return [location.to_dict() for location in locations], 200

administrator_api.add_resource(GetLocations, '/get_locations')
administrator_api.add_resource(AddLocation, '/add_location')

class DeleteLocation(Resource):
    @jwt_required()
    def delete(self, location_id):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return {"message": "User not found"}, 404
        
        location = Location.query.get(location_id)
        
        if not location:
            return {"message": "Location not found"}, 404
        
        db.session.delete(location)
        db.session.commit()
        return {"message": "Location has been deleted successfully"}, 200

administrator_api.add_resource(DeleteLocation, '/delete_location/<int:location_id>')

class UpdateLocation(Resource):
    @jwt_required()
    def put(self, location_id):
        data = location_args.parse_args()
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return {"message": "User not found"}, 404
        
        location = Location.query.get(location_id)
        
        if not location:
            return {"message": "Location not found"}, 404
        
        location.name = data["name"]
        location.description = data["description"]
        location.image_url = data["image_url"]
        db.session.commit()
        return {"message": "Location has updated successfully"}, 200

administrator_api.add_resource(UpdateLocation, '/update_location/<int:location_id>')

class AddTicket(Resource):
    @jwt_required()
    def post(self):
        data = ticket_args.parse_args()
        location = Location.query.get(data["location_id"])
        
        if not location:
            return {"message": "Location not found"}, 404
        
        ticket = Ticket(
            location_id=data["location_id"],
            price=data["price"],
            means=data["means"],
            seat_no=data["seat_no"]
        )
        db.session.add(ticket)
        db.session.commit()
        return {"message": "Ticket posted successfully"}, 201

administrator_api.add_resource(AddTicket, '/add_ticket')

class DeleteTicket(Resource):
    @jwt_required()
    def delete(self, ticket_id):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return {"message": "User not found"}, 404
        
        ticket = Ticket.query.get(ticket_id)
        
        if not ticket:
            return {"message": "Ticket not found"}, 404
        
        db.session.delete(ticket)
        db.session.commit()
        return {"message": "Ticket deleted successfully"}, 200

administrator_api.add_resource(DeleteTicket, '/delete_ticket/<int:ticket_id>')

class GetTicket(Resource):
    @jwt_required()
    def get(self, ticket_id):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return {"message": "User not found"}, 404
        
        ticket = Ticket.query.get(ticket_id)
        
        if not ticket:
            return {"message": "Ticket not found"}, 404
        
        return {
            "id": ticket.id,
            "user_id": ticket.user_id,
            "location_id": ticket.location_id,
            "price": ticket.price,
            "means": ticket.means,
            "seat_no": ticket.seat_no
        }, 200

administrator_api.add_resource(GetTicket, '/get_ticket/<int:ticket_id>')

class UpdateTicket(Resource):
    @jwt_required()
    def put(self, ticket_id):
        data = ticket_args.parse_args()
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return {"message": "User not found"}, 404
        
        ticket = Ticket.query.get(ticket_id)
        
        if not ticket:
            return {"message": "Ticket not found"}, 404
        
        if data["location_id"]:
            ticket.location_id = data["location_id"]
        if data["price"]:
            ticket.price = data["price"]
        if data["means"]:
            ticket.means = data["means"]
        if data["seat_no"]:
            ticket.seat_no = data["seat_no"]
        
        db.session.commit()
        return {"message": "Ticket updated successfully"}, 200

administrator_api.add_resource(UpdateTicket, '/update_ticket/<int:ticket_id>')
