from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    review1 = Review(
        user_id = 1,
        product_id = 1,
        review = 'I think it is a great purchase, It is so fast!. I am very pleased',
        rating = 5
    )

    review2 = Review(
        user_id = 2,
        product_id = 2,
        review = 'I think it is a okay purchase !! It works okay but not that fast. I am very whelmed',
        rating = 3
    )

    review3 = Review(
        user_id = 2,
        product_id = 3,
        review = 'I think it is a terrible purchase !! It does not work well! I am very sad',
        rating = 1
    )

    review4 = Review(
        user_id = 3,
        product_id = 1,
        review = 'I think it is a okay purchase !! Its okay!!!!. I am very whelmed, again.',
        rating = 3
    )

    all_reviews = [review1, review2, review3, review4]
    add_reviews = [db.session.add(review) for review in all_reviews]
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
