from flask import Blueprint, session, request
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user
from app.models import Product,User, db
from app.forms.product_form import ProductForm
from datetime import date

product_routes= Blueprint('products', __name__)


#Get all products with Owner Infos!
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

#Get Product by its ID!
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

#Create a new Product
@product_routes.route('/create', methods=['POST'])
@login_required
def create_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_product = Product(
            owner_id = current_user.id,
            name = form.data['name'],
            description = form.data['description'],
            price = form.data['price'],
            preview_image = form.data['preview_image'],
            created_at = date.today(),
            updated_at = date.today()
        )
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()
    else:
        errors = validation_errors_to_error_messages(form.errors)
        return {'errors': errors}, 400


#Edit product based on its ID
@product_routes.route('/<int:product_id>', methods=['PUT'])
@login_required
def edit_product(product_id):
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    product = Product.query.get(product_id)


    if product is None:
        return {'error': 'Product not found'}

    if form.validate_on_submit() and product.owner_id == current_user.id:
        product.name = form.data["name"]
        product.description = form.data["description"]
        product.price = form.data["price"]
        product.preview_image = form.data["preview_image"]

        db.session.commit()

        return product.to_dict()
    else:
        errors = validation_errors_to_error_messages(form.errors)
        return {'errors': errors}, 400



#Delete a Product  based on its ID
@product_routes.route('/<int:product_id>', methods=['DELETE'])
@login_required
def delete_product(product_id):
    product = Product.query.get(product_id)

    if not product:
        return {"message": "product not found"}, 404

    if product.owner_id == current_user.id:
        db.session.delete(product)
        db.session.commit()
        return { "message": "Product successfully deleted" }
    elif product.owner_id != current_user.id:
        return { "message": "Must be product owner to delete" }, 400
    else:
        errors = validation_errors_to_error_messages(form.errors)
        return {'errors': errors}, 400


#Get all Products that belong to a user(shop)
@product_routes.route('/current')
@login_required
def get_owned_products():

    owner_id = current_user.id
    products = Product.query.filter_by(owner_id=owner_id).all()
    return {"Products": [product.to_dict() for product in products]}
