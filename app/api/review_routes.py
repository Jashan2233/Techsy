from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Review, User, db
from app.forms.review_form import ReviewForm

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/user/<int:user_id>')
@login_required
def get_reviews_of_user(user_id):
    user_reviews = Review.query.filter_by(user_id=user_id).all()
    reviews = [review.to_dict() for review in user_reviews]

    return reviews
