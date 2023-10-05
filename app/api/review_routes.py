from flask import Blueprint, jsonify, session, request, flash
from flask_login import login_required, current_user
from app.models import Review, User, db, Product
from app.forms.review_form import ReviewForm

review_routes = Blueprint('reviews', __name__)

#Get reviews of User
@review_routes.route('/user/<int:user_id>')
@login_required
def get_reviews_of_user(user_id):
    user_reviews = Review.query.filter_by(user_id=user_id).all()
    reviews = [review.to_dict() for review in user_reviews]

    return reviews


#Get Reviews of a Products
@review_routes.route('/product/<int:product_id>')
def get_reviews_of_product(product_id):
    #Sorting reviews in Descending Order of Reviews on product!
    product_reviews = Review.query.filter_by(product_id=product_id).order_by(Review.created_at.desc()).all()
    reviews = [review.to_dict() for review in product_reviews]

    for review in reviews:
        user_id = review['user_id']
        user = User.query.get(user_id)
        review_user = user.to_dict()
        review['User_Info'] = review_user

    return reviews

#Create a new Review based on Product ID
@review_routes.route('/new/product/<int:product_id>', methods=['POST'])
@login_required
def create_review(product_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies["csrf_token"]
    # owner_id = current_user.id
    product = Product.query.get(product_id)


    if form.validate_on_submit() and current_user.id != product.owner_id:
        new_review = Review (
            user_id = current_user.id,
            product_id = product_id,
            review = form.data['review'],
            rating = form.data['rating']
        )

        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    else:

        return {'message': 'You are the owner!!!'}


#Delete Review based on review_id
@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)

    if not review:
        return {'error': 'review not found'}

    db.session.delete(review)
    db.session.commit()

    return {'Review Successfully Deleted!!!'}


#Edit route based on review_id
@review_routes.route('/<int:review_id>/update', methods=['PUT'])
@login_required
def update_user_review(review_id):
    review = Review.query.get(review_id)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies["csrf_token"]

    if form.validate_on_submit and current_user.id == review.user_id:
        review.rating = form.data["rating"]
        review.review = form.data["review"]

        db.session.commit()
        return review.to_dict()
    return {'MESSAGE': "Update review didn't work"}
