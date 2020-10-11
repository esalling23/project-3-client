# Project 3: Farm Chat Client

This application is the front end client for the chat room application. Using sockets.io to chat with other users in real time.

## Important Links
<a href="https://sei-troubleshoot.github.io/project-3-client/">Deployed client</a><br>
<a href="https://thawing-meadow-19567.herokuapp.com/">Deployed API</a><br>
<a href="https://github.com/SEI-Troubleshoot/project-3-api">API repository</a><br>
<a href="https://github.com/SEI-Troubleshoot">Project Repository</a>


## Planning Story
After our planning period we split up the setup of the front end client and back end api into pairs.  When the templates were ready, we set up the models and READMEs, then tested each CRUD with curl scripts. From here, our group met to split up tasks to work either individually or for pair programming to complete mvp requirements. First we setup authorization to make sure every users able to signUp, signIn ,signOut, and changePassword. Users able to chat with each other
in My chat room, also people could see which user is online. Finally, we did some styling with different fonts, colors and picture.

### User Stories

- As a User I want a form so that I can sign up [POST]
- As a User I want a form so that I can sign in [GET]
- As a User I want a form so that I can change my password [PATCH]
- As a User I want a form so that I can sign out [DELETE]
- As a User I want a dashboard so that I can view my list of chat rooms [GET]
- As a User I want a button so that I can create a new chat room
- As a User I want a form so that I can add a new message in my chat room [POST]
- As a User I want a process to edit the name of my chat room [PATCH]
- As a User I want a form to delete my chatroom[DELETE]
- As a User I want a button so that I can upload my profile picture
- As a User I want a button so that I can add emoji
- As a User I want to know who the messages are coming from
- As a User I want a search-bar so that I can find other users to chat

### Technologies Used

- React
- Javascript
- Sockets.io


### Unsolved Problems

- In later version, create multiple group Chats
- In later version, create direct messages

## Images

---

#### Wireframe:
<img src="https://i.imgur.com/eVSbST4.png">
<img src="https://imgur.com/mIoWf28.png">
