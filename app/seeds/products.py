from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_products():
    product1 = Product(
        owner_id=1,
        name='Macbook Air 13.6 - M2',
        description='Supercharged by the next-generation M2 chip, the redesigned MacBook Air combines incredible performance.',
        price=1199.99,
        preview_image='https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6509/6509650_sd.jpg',
        created_at=date.today(),
        updated_at=date.today()
    )
    product2 = Product(
        owner_id=1,
        name='Samsung - 75" Crystal UHD 4K',
        description='True-to-life color. Effortless connectivity. Dazzling 4K value.',
        price=699.99,
        preview_image='https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6537/6537373_sd.jpg',
        created_at=date.today(),
        updated_at=date.today()
    )
    product3 = Product(
        owner_id=2,
        name='Hisense 75-Inch Class U6 Series 4K',
        description='The U6 Series continues Hisense\'s mission to bring leading-edge technology to everyone.',
        price=799.99,
        preview_image='https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6541/6541869_sd.jpg',
        created_at=date.today(),
        updated_at=date.today()
    )
    product4 = Product(
        owner_id=3,
        name='Apple - AirPods Pro (2nd generation)',
        description='AirPods Pro (2nd generation) with USB-C deliver up to 2x more Active Noise Cancellation',
        price=249.99,
        preview_image='https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6447/6447382_sd.jpg',
        created_at=date.today(),
        updated_at=date.today()
    )

    all_products = [product1, product2, product3, product4]
    add_products = [db.session.add(product) for product in all_products]

    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
