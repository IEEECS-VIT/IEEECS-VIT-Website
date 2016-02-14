IEEE CS-VIT - Website
=====================

[![Join the chat at https://gitter.im/IEEECS-VIT/IEEECS-VIT-Website](https://badges.gitter.im/IEEECS-VIT/IEEECS-VIT-Website.svg)](https://gitter.im/IEEECS-VIT/IEEECS-VIT-Website?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The website for the IEEE Computer Society - VIT Student Chapter



The website is hosted [here](http://ieeecsvit.herokuapp.com/)

Please report any bugs or issues [here](https://github.com/IEEECS-VIT/IEEECS-VIT-Website/issues)

#### Instructions for Installation:
###### Create a Python 3.4.x virtualenv (For your respective platform)
###### Activate the Python 3.4.x virtualenv
###### Install Python project dependencies

    $ pip install -r requirements.txt

###### Django Task - Collect static files

    $ python manage.py collectstatic

###### Run the server locally at port "PORT" in os.environ or a manually entered port

    $ python manage.py runserver $PORT (For Development)
    $ waitress-serve --port=$PORT mvp.wsgi:application (For Production)

#### External Requirements:
* A PostgreSQL instance running locally or valid "DATABASE_URL" string in os.environ
* A valid "SECRET_KEY" string in os.environ for better security (Optional)

#### Custom buildpack for Heroku
#### Set BUILDPACK_URL in os.environ as [this](https://github.com/papaeye/heroku-buildpack-python-bower.git)

#### External Requirements: 
* A valid "COOKIE_SECRET" string in process.env for better security (Optional)
