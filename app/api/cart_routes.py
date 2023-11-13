from flask import Blueprint, session, request, jsonify
from app.models import Shopping_Cart, Product, db
from flask_login import login_required, current_user

cart_routes = Blueprint('cart', __name__)


# Get Cart from User
@cart_routes.route('/')
def get_shopping_cart():
    owner_id = current_user.id
    carts = Shopping_Cart.query.filter_by(user_id=owner_id).all()

    return {"carts": [cart.to_dict() for cart in carts]}


# add Product with Quantity to Cart
@cart_routes.route('/', methods=['POST'])
@login_required
def adding_to_cart():
    owner_id = current_user.id
    product_id = request.json.get('product_id')
    product_quantity = request.json.get('quantity')

    cartProduct = Product.query.get(product_id)

    item_in_cart = Shopping_Cart.query.filter(Shopping_Cart.product_id == product_id).filter(
        Shopping_Cart.user_id == owner_id).first()

    if item_in_cart is None:
        cart_item = Shopping_Cart(
            user_id=owner_id, product_id=cartProduct.id, quantity=product_quantity)
        db.session.add(cart_item)
        db.session.commit()

        return (cart_item.to_dict())

    else:
        item_in_cart.quantity += product_quantity
        db.session.add(item_in_cart)
        db.session.commit()
        return item_in_cart.to_dict()

# Edit Product quantity in Cart


@cart_routes.route('/', methods=['PUT'])
@login_required
def update_cart_item_quantity():
    data = request.get_json()

    # Check if 'item' exists in the JSON payload
    if 'item' in data and data['item'] is not None:
        # Access 'id' property if 'item' is not None
        product_id = data['item'].get('id')
    else:
        # Handle the case where 'item' is not present or is None
        return jsonify(error="Invalid data payload"), 400

    quantity = data.get('quantity')
    owner_id = current_user.id

    item_in_cart = Shopping_Cart.query.filter(Shopping_Cart.product_id == product_id).filter(
        Shopping_Cart.user_id == owner_id).first()

    if item_in_cart:
        item_in_cart.quantity = quantity
        db.session.add(item_in_cart)
        db.session.commit()
        return item_in_cart.to_dict()
    else:
        return jsonify(error="Item not found in the cart"), 404


# DELETE item from Cart
@cart_routes.route('/delete_single_item', methods=['DELETE'])
def delete_item_from_cart():
    data = request.get_json()
    product_id = data['product_id']
    owner_id = current_user.id

    item_in_cart = Shopping_Cart.query.filter(Shopping_Cart.product_id == product_id).filter(
        Shopping_Cart.user_id == owner_id).first()

    db.session.delete(item_in_cart)
    db.session.commit()

    return {'message': 'Item Deleted Successfully from Cart !!!'}


# DELETE All Items from Cart
@cart_routes.route('/delete_all_items_from_cart', methods=['DELETE'])
@login_required
def delete_all_items_from_cart():
    data = request.get_json()
    cart_owner_id = data.get('user_id')

    item_in_cart = Shopping_Cart.query.filter(
        Shopping_Cart.user_id == cart_owner_id).all()

    for item in item_in_cart:
        db.session.delete(item)
        db.session.commit()

    return {'message': 'Successfully emptyed the whole Cart'}
