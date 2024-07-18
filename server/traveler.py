from flask import Blueprint, request,jsonify
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Ticket, Review, Location, User

traveler_bp = Blueprint('traveler_bp',__name__, url_prefix='/traveler')
traveler_api = Api(traveler_bp)

# Request parsers
ticket_args = reqparse.RequestParser()
ticket_args.add_argument("ticket_id", type=int, required=True, help="ID of the ticket")
ticket_args.add_argument("location_id", type=int, required=True, help="ID of the location")
ticket_args.add_argument("price", type=float, required=True, help="Price of the ticket")
ticket_args.add_argument("means", type=str, required=True, help="Means of travel")
ticket_args.add_argument("seat_no", type=int, required=True, help="Seat number")

review_args = reqparse.RequestParser()
review_args.add_argument("location_id", type=int, required=True, help="ID of the location")
review_args.add_argument("rating", type=int, required=True, help="Rating of the location")
review_args.add_argument("comment", type=str, required=True, help="Comment for the review")

class GetTickets(Resource):
    
    def get(self):
        tickets = Ticket.query.all()
        return [ticket.to_dict() for ticket in tickets], 200
    
traveler_api.add_resource(GetTickets, '/tickets')

import logging

class BuyTicket(Resource):
    @jwt_required()
    def post(self):
        data = ticket_args.parse_args()
        logging.debug(f'Received data: {data}')
        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        if not user:
            logging.debug('User not found')
            return {"message": "User not found"}, 404

        ticket = Ticket.query.get(data["ticket_id"])
        logging.debug(f'Ticket found: {ticket}')

        if not ticket or ticket.user_id:
            logging.debug('Ticket not found or already purchased')
            return {"message": "Ticket not found or already purchased"}, 404

        ticket.user_id = user_id  # Assign ticket to the user
        db.session.commit()

        return {"message": "Ticket purchased successfully"}, 200

traveler_api.add_resource(BuyTicket, '/buy_ticket')


class PostReview(Resource):
    @jwt_required()
    def post(self):
        data = review_args.parse_args()
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return {"message": "User not found"}, 404
        
        location = Location.query.get(data["location_id"])
        
        if not location:
            return {"message": "Location not found"}, 404
        
        review = Review(user_id=user_id, location_id=data["location_id"], rating=data["rating"], comment=data["comment"])
        db.session.add(review)
        db.session.commit()
        return {"message": "Review posted successfully"}, 201

traveler_api.add_resource(PostReview, '/post_review')

class GetLocations(Resource):
    def get(self):
        locations = Location.query.all()
        return [location.to_dict() for location in locations], 200

traveler_api.add_resource(GetLocations, '/locations')

class ClickedLocation(Resource):
    def get(self, location_id):
        location = Location.query.get(location_id)
        if not location:
            return {"message": "Location not found"}, 404
        return location.to_dict(), 200

traveler_api.add_resource(ClickedLocation, '/locations/<int:location_id>')


class GetUserReviews(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return {"message": "User not found"}, 404
        reviews = Review.query.filter_by(user_id=user_id).all()
        return [review.to_dict() for review in reviews], 200

traveler_api.add_resource(GetUserReviews, '/user_reviews')


class DeleteUserReview(Resource):
    @jwt_required()
    def delete(self, review_id):
        review = Review.query.get(review_id)
        if not review:
            return {"message": "Review not found"}, 404
        db.session.delete(review)
        db.session.commit()
        return {"message": "Review deleted successfully"}, 200

traveler_api.add_resource(DeleteUserReview, '/user_reviews/<int:review_id>')

class PatchUserReview(Resource):
    @jwt_required()
    def patch(self, review_id):
        review = Review.query.get(review_id)
        if not review:
            return {"message": "Review not found"}, 404

        data = request.get_json()
        review.rating = data.get("rating", review.rating)
        review.comment = data.get("comment", review.comment)

        db.session.commit()
        return {"message": "Review updated successfully"}, 200

traveler_api.add_resource(PatchUserReview, '/user_reviews/<int:review_id>')
