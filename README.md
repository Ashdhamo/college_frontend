I am creating a college interface that allows student, professor and admin to get data.
This project combines knowledge of HTML, CSS, Javascript, Python and SQL languages to make possible.
There are 2 parts: frontend and backend. The frontend uses Javascript, CSS and HTML to create a user interface. The backend uses Python to fetch data from the college. When run, it creates an API URL which when used with Javascript on the front end, presents a croprehensive page where different users can interact with different data.

Login:
Frontend:
    -username and password input bars and login button. If username and password match the data in the login table in the database. It fetches data so it goes to admin, student or professor page based on position 
    TODO:
    -register and forgot username page(allows you to create an account if name and id and email matches on database (use patch and not post))
    -allows change in password with email, id and username
Backend:
    - code when you POST username and password, and they match a user in the mySQL database it gives all their info.
    -patch info (for register and forgot username)
    -patch info for forgot password (see if possible to do all in one patch)



   

