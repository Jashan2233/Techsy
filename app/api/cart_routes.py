from flask import Blueprint, session, request, jsonify
from app.models import Shopping_Cart, Product, db
from flask_login import login_required, current_user

cart_routes = Blueprint('cart', __name__)


#Get Cart from User
@cart_routes.route('/')
def get_shopping_cart():
    owner_id = current_user.id
    carts = Shopping_Cart.query.filter_by(user_id= owner_id).all()

    return {"carts": [cart.to_dict() for cart in carts]}


#add Product with Quantity to Cart
@cart_routes.route('/', methods=['POST'])
@login_required
def adding_to_cart():
    owner_id = current_user.id
    product_id = request.json.get('product_id')
    product_quantity = request.json.get('quantity')

    cartProduct = Product.query.get(product_id)

    item_in_cart = Shopping_Cart.query.filter(Shopping_Cart.product_id == product_id).filter(Shopping_Cart.user_id == owner_id).first()

    if item_in_cart is None:
        cart_item = Shopping_Cart(user_id=owner_id, product_id=cartProduct.id, quantity=product_quantity)
        db.session.add(cart_item)
        db.session.commit()

        return(cart_item.to_dict())

    else:
        item_in_cart.quantity += product_quantity
        db.session.add(item_in_cart)
        db.session.commit()
        return item_in_cart.to_dict()


@cart_routes.route('/', methods=['PUT'])
def update_cart_item_quantity():
    data = request.get_json()
    quantity = data['quantity']
    product_id = data['item']['id']
    owner_id = current_user.id
