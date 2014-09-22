IEEE CS-VIT - Website
=====================

The website for the IEEE Computer Society - VIT Student Chapter


The website is hosted [here](http://ieeecsvit.herokuapp.com/)

Please report any bugs or issues [here](https://github.com/IEEECS-VIT/IEEECS-VIT-Website/issues)

#### Instructions for Installation:
###### Create a Python 3.4.x virtualenv (For your respective platform)
###### Activate the Python 3.4.x virtualenv
###### Install Python project dependencies

    $ pip install -r requirements.txt

###### Install Node.js 0.10.x
###### Install Bower components

    # npm install -g bower
    $ bower install

###### Django Task - Collect static files

    $ python manage.py collectstatic

###### Run the server locally at port "PORT" in os.environ or a manually entered port

    $ python manage.py runserver $PORT (For Development)
    $ waitress-serve --port=$PORT mvp.wsgi:application (For Production)

#### External Requirements:
* A PostgreSQL instance running locally or valid "DATABASE_URL" string in os.environ
* A valid "SECRET_KEY" string in os.environ for better security (Optional)

#### Custom buildpack for Heroku
* Set BUILDPACK_URL in os.environ as [this](https://github.com/aneesh-neelam/heroku-buildpack-python-bower.git)
