This is the Django application. Its a level of organization that handles specific functions of our application.

~~~Explaination of Default Application Files/Directories~~~

    __init__.py: This file is an empty Python script that tells Python to treat the directory as a Python package. It's required for Python to recognize the directory as part of your project.

    admin.py: This file is used to define the administration interface for your application's models. You can use it to customize how data is displayed and managed in the Django admin site. For example, you can register your models here to make them accessible in the admin interface and customize the way they are displayed.

    apps.py: This file contains configuration settings for your application. You can use it to define various metadata about your app, such as its name, a short description, and any application-specific configuration. It's also where you can configure your app's default AppConfig settings if needed.

    models.py: This file is where you define your application's data models using Django's Object-Relational Mapping (ORM). Models are used to define the structure of your database tables and the relationships between them. You can define Python classes that subclass django.db.models.Model, and each class attribute represents a database field. This file is essential for defining your data schema.

    test.py: This file is where you can write tests for your application using Django's testing framework. Writing tests is crucial for ensuring that your application behaves correctly and that changes don't introduce regressions. You can create test cases that cover various aspects of your app, including model methods, views, forms, and more.

    views.py: This file is where you define the view functions for your application. Views handle HTTP requests and return HTTP responses. They contain the business logic for your application. You define Python functions here that take a request object as input and return a response object. Views determine what gets displayed on a webpage or returned as data from an API.

    /migrations/: This directory is used by Django to manage database schema changes over time. When you create or modify models in your app, Django generates migration files in this directory. Migrations provide a way to evolve your database schema as your application's models change. You can apply migrations using the python manage.py migrate command.

You might ask yourself, why might I choose react's models to represent and manipulate data instead of python classes and objects. React models are used for defining the structure of your database tables. The distinction of their
individual usages comes in when you answer the question: do I need to store persistent data that I will later retrieve or update? If so, use React models. If you are just working with data within the application's runtime but do
not need to store it out of that lifespan, then just use normal python classes. 