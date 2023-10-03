from flask import Blueprint, session, request
from flask_login import login_required
from app.models import Product,User, db
from app.forms import product_form
from datetime import date

product_routes= Blueprint('products', __name__)



@product_routes.route('/')
def get_products():
#Get all Products!

    products = Product.query.all()
    res = [single_product.to_dict() for single_product in products]

# Adds Owner Name + id to product!
    for product in res:
        owner_id = product['owner_id']
        user = User.query.get(owner_id)
        product_owner = user.to_dict()
        product['owner_info'] = product_owner['username']
    return res


@product_routes.route('/<int:product_id>')
def get_single_product(product_id):

    single_product = Product.query.get(product_id)
    product = single_product.to_dict()

    #Adds owner name to the Product

    owner_id = product['owner_id']
    user = User.query.get(owner_id)
    product_owner = user.to_dict()
    product['owner_info'] = product_owner['username']

    return product
