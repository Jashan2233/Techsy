from flask import Blueprint, session
from flask_login import login_required, current_user
from app.models import Shop


shop_routes = Blueprint('shop', __name__)

#Get shop of a User
@shop_routes.route('/')
@login_required
def get_user_shop():
    owner_id = current_user.id

    # Query the Shop model to check if the user has a shop
    shop = Shop.query.filter_by(owner_id =owner_id).first()

    if shop:
        return {"shop": shop.to_dict()}
    else:
        return {"message": "User does not have a shop."}, 404
