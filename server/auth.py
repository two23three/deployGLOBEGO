from flask import Blueprint, jsonify
from flask_restful import Api, Resource, reqparse
from models import db, User
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager

auth_bp = Blueprint('auth_bp', __name__, url_prefix='/auth')
bcrypt = Bcrypt()
jwt = JWTManager()
auth_api = Api(auth_bp)

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).first()

register_args = reqparse.RequestParser()
register_args.add_argument('email', type=str, required=True, help="Email is required")
register_args.add_argument('password', type=str, required=True, help="Password is required")
register_args.add_argument('username', type=str, required=True, help="Username is required")

login_args = reqparse.RequestParser()
login_args.add_argument('email', type=str, required=True, help="Email is required")
login_args.add_argument('password', type=str, required=True, help="Password is required")

class Register(Resource):
    def post(self):
        data = register_args.parse_args()
        hashed_password = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
        new_user = User(email=data.get('email'), username=data.get('username'), password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return {"msg": 'User created successfully'}, 201

class Login(Resource):
    def post(self):
        data = login_args.parse_args()
        user = User.query.filter_by(email=data.get('email')).first()
        if not user:
            return {"msg": "User does not exist in our DB"}, 404
        if not bcrypt.check_password_hash(user.password, data.get('password')):
            return {"msg": "Password is incorrect!"}, 401
        
        token = create_access_token(identity=user.id)
        return {"token": token}, 200

class GetUser(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if not user:
            return {"msg": "User not found"}, 404
        
        return jsonify({
            "id": user.id,
            "username": user.username,
            "email": user.email
        })

auth_api.add_resource(Register, '/register')
auth_api.add_resource(Login, '/login')
auth_api.add_resource(GetUser, '/user')

