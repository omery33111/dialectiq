![עותק של Copy of Navy Minimalist Business Landing Page Desktop Prototype (1920 × 1080px) (3)](https://github.com/omery33111/fitfusion/assets/110463400/c5572396-bc59-4964-9991-521e90f7d9d4)


#


[![Live Netlify Server](https://img.shields.io/badge/Live%20on-Netlify-00ad9f.svg)](https://the-hebrew-adventure.netlify.app/)

[![Last Commit on GitHub](https://img.shields.io/github/last-commit/omery33111/dialectiq.svg)](https://github.com/omery33111/lops-dialectiq/commits/main)

[![Pull Requests](https://img.shields.io/github/issues-pr/omery33111/dialectiq.svg?labelColor=24292E&logo=github&logoColor=white)](https://github.com/omery33111/dialectiq/pulls)


## Table of Contents
- [Description](#description) 🖐️
- [Technologies](#technologies) 🛠️
- [Features](#features) 📕
  - [Feature List](#feature-list) 📄
  - [Profile Hall](#profile-hall) ✏️
  - [Admin Hall](#admin-hall) 🖊️
- [Running Instructions](#running-instructions) 🖱️
  - [Deployments](#deployments) ✈️
  - [Back-end adjustment](#back-end-adjustment) 🖥️
  - [Front-end adjustment](#front-end-adjustment) 🖥️
- [Admin & Staff](#admin--staff) 🤵
- [Contact](#contact) 📞


## Description
"The Hebrew Adventure" - the place for Hebrew & culture.

The Hebrew Adventure is a website offering diverse learning options such as specific exam types like listening comprehension tests, American-style questions, or 'Complete the Sentence.' It features a community area where users can view and interact with other members' profiles, study-related blogs allowing comments and fostering connections among community members, a ranking system, and enjoyable animations.

The Hebrew Adventure is built on a combination of powerful technologies.

For the back-end, the Django framework API and Simple JWT provide a secure and robust foundation for handling user authentication and managing data. On the front-end, React with Redux and TypeScript enable a dynamic and responsive user interface. Our database options include PostgreSQL and SQLite3, with easy-to-follow instructions in the README.md file on how to switch between the two.



## Technologies
* Django: a high-level Python web framework that enables rapid development and clean design.

* Django REST framework: a powerful and flexible toolkit for building Web APIs.

* Simple JWT: a JSON Web Token authentication library for Django that simplifies secure user authentication.

* React: a JavaScript library for building user interfaces, which enables fast and dynamic rendering of components.
* Redux: a state management library that allows for centralized management of application state.
* TypeScript: a superset of JavaScript that adds static types, enabling better code organization and easier debugging.
* MySQL: a popular open-source relational database management system known for its scalability and performance.
* SQLite3: a lightweight and self-contained relational database management system that's ideal for smaller-scale projects.



## Features
The Hebrew Adventure provides an exceptional experience for both customers and staff.

For customers, the authentication system ensures secure access to their account, while the profile hall offers a range of options for managing personal information, quizes I completed, and control of comments I posted. A variety of friendly quizes that make the learning experience fun, community in order to make the learning experience shared among the students, A ranking system that shows you where you are in your learning process.

For staff, the admin hall provides comprehensive data management tools, with clear options for managing both users and products.

In the users section of the admin hall, staff members can easily manage all user accounts, with the ability to search for a user, view and edit user profile data, including profile information, and ranking system points. This provides valuable insights into user behavior and preferences, which allows the staff to better tailor the experience to meet the customer's needs.

In the learning section, staff members have full control over quizes, blogs, and callbacks management. This includes the ability to view and edit all quizes and subjects of quizes, as well as add and delete quizes and subjects of quizes as needed. Also, staff will have the option to view, edit and delete blogs. Managing callbacks that way, enables better knowing of who wants to be premium. A system that gives a field of view to the entire width of the project.



### Feature List

* Authentication system
* Quizes & Quiz Subjects
* Community & Profiles
* Blogs & Comments
* Ranking system


#### Profile hall:
* Profile with option to view.
* Manage information, update, delete.
* View answered quizes.
* View recent activity.

#### Admin hall:
* Watch all user profiles.
* Search for user profile.
* Update and delete user information.
* Post, Update and delete "American quizes" & American quizes subjects.
* Post, Update and delete "Complete the sentence quizes" & Complete the sentence quizes subjects.
* Post, Update and delete "Auditory quizes" & Auditory quizes subjects.
* Post, Update and delete blogs.
* Managing of user callbacks.

## Running Instructions
### Deployments
The front-end of my website is hosted by [Netlify](https://the-hebrew-adventure.netlify.app/) while the database back-end is hosted on [Render](https://render.com/), allowing for seamless integration and efficient website management.

#

In order to make the software work properly in your local host, the steps below must be followed:

### Back-end adjustment

| Step | Command | Explanation |
| --- | --- | --- |
| 1 | `git clone https://github.com/omery33111/dialectiq.git` | Clone the project from GitHub |
| 2 | `cd .\dialectiq\back-end\` | Navigate to the back-end directory |
| 3 | `py -m virtualenv [name your environments file]` | Create virtual environments |
| 4 | `.\[environments name]\Scripts\activate` | Activate the created virtual environment |
| 5 | `pip install -r .\requirements.txt` | Install the project dependencies |
| 6 | `dialectiq  -->   back-end  -->  project  -->  settings.py` | Go to the "settings.py" file in the "shop" directory. |

To run the program with SQLite3, mark all related databases (lines 131-133), and keep lines 123-128. 

![image](https://github.com/omery33111/fitfusion/assets/110463400/902b6740-2925-4dd0-8f8a-a52cf8d4166e)


| ...6 |  |  |
| --- | --- | --- |
| 7 | `py manage.py migrate` | Apply the database migrations |
| 8 | `py manage.py runserver` | Run the back-end server |


### Front-end adjustment

| Step | Command | Explanation |
| --- | --- | --- |
| 1 | `cd ..` | Go back to the main directory |
| 2 | `cd .\front-end\` | Navigate to the front-end directory|
| 3 | `npm install` | Install the front-end dependencies |
| 4 | `dialectiq --> front-end --> src --> endpoints --> endpoints.ts` | Go to the "endpoints.ts" file in the "endpoints" directory. |

To successfully run your server on local host, it's essential to ensure that your endpoints are correctly configured to direct you to the intended destination.

Ensure to designate any external server as marked and remove the marking from the local host server as shown:

![image](https://github.com/omery33111/fitfusion/assets/110463400/27fb0467-a426-4cf7-b682-1d88ae980d01)


| ...4 |  |  |
| --- | --- | --- |
| 5 | `npm start` | Run the front-end server |

**Now you will be able to access LOPS in your local host** "http://localhost:3000".


## Admin & Staff
In order to be able to access the admin panel of Django, note that you are in Back-end directory and create superuser as written:
  ```
  py manage.py createsuperuser
  ```

### Contact

📧 omery33111@gmail.com

ℹ️ https://www.linkedin.com/in/omer-yanai-01208a262/

🐱 https://github.com/omery33111