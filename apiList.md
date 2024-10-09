# DevTinder APIs

##  authRouter
- Post /signup
- POST /login
- Post /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userID
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId


## userRouter
- GET /user/connections
- GET /user/requests/received
- GET /user/feed - Gets you the profiles of other users on platform


Status: ignore , interested, accepteed ,rejected