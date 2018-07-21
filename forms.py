from flask_wtf import FlaskForm
from wtforms import StringField
from wtform.validators import DataRequired, Length

class NewMessage(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=2, max=30)])
    contact = StringField('contact', validators=[DataRequired(), Length(min=2, max=30) ])
    message = StringField('message', validators=[DataRequired(), Length(min=1, max=300) ])
