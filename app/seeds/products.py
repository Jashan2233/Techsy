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
    product5 = Product(
        owner_id=2,
        name='Bella Pro Series - 8-qt. Digital Air Fryer',
        description='Cook up healthy meals with this Bella Pro Series 8-qt. Digital Air Fryer.',
        price=49.99,
        preview_image='https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6355/6355794_rd.jpg',
        created_at=date.today(),
        updated_at=date.today()
    )
    product6 = Product(
        owner_id=3,
        name='Insignia™ - 0.9 Cu. Ft. Compact Microwave',
        description='Heat food quickly and efficiently with this 0.9 cu. ft. Insignia microwave.One-touch buttons take the guesswork out of cooking common foods like popcorn and pizza.',
        price=69.99,
        preview_image='https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5856/5856600_sd.jpg',
        created_at=date.today(),
        updated_at=date.today()
    )
    product7 = Product(
        owner_id=1,
        name='iRobot - Roomba i7+ (7550) Wi-Fi Connected Self-Emptying Robot Vacuum',
        description='acuuming that fits seamlessly into your life. The i7+ learns your home and navigates to where the messes are, right when they happen—so you can effortlessly keep your floors clean.',
        price=599.99,
        preview_image='https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6280/6280529_sd.jpg',
        created_at=date.today(),
        updated_at=date.today()
    )
    product8 = Product(
        owner_id=2,
        name='Keurig - K-Select Single-Serve K-Cup Pod Coffee Maker',
        description='The Keurig K-Select single serve coffee maker in Matte Black combines sleek design and more intuitive features to help you brew your perfect cup every single time.',
        price=199.99,
        preview_image='https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6015/6015921_sd.jpg',
        created_at=date.today(),
        updated_at=date.today()
    )
    product9 = Product(
        owner_id=3,
        name='GE Profile - Opal 2.0 38-lb. Portable Ice maker with Nugget Ice',
        description="Nugget Ice. Pellet ice. Drive-in ice. Whatever you call it, you know its the good ice.",
        price=609.99,
        preview_image='https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6408/6408648_sd.jpg',
        created_at=date.today(),
        updated_at=date.today()
    )
    product10 = Product(
        owner_id=1,
        name='Insignia™ - 115-Can Beverage Cooler - Stainless Steel',
        description='Whether you love entertaining friends and family or just like to keep your favorite drinks chilled and ready to go.',
        price=799.99,
        preview_image='https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6191/6191309_sd.jpg',
        created_at=date.today(),
        updated_at=date.today()
    )

    all_products = [product1, product2, product3, product4, product5, product6, product7, product8, product9, product10]
    add_products = [db.session.add(product) for product in all_products]

    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
