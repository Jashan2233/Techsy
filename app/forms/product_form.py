from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import IntegerField, StringField, SubmitField, DecimalField
from wtforms.validators import DataRequired, NumberRange, Length
# from ..api.aws_helpers import ALLOWED_EXTENSIONS

class ProductForm(FlaskForm):
    name= StringField('Name', validators=[DataRequired(), Length(min=4, max=50)])
    description = StringField('Description', validators=[DataRequired(), Length(min=10, max=100)])
    price = IntegerField('Price', validators=[DataRequired(), Length(min=1, max=5)])
    preview_image = FileField('Image File', validators=[DataRequired()])
    submit = SubmitField('Submit')
