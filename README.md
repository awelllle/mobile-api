# Design / Implementation details

This project was implemented with JavaScript/Typescript running in the Node environment. The typescript files are compiled into Javascript and are stored in the dist folder.

The API is hosted on Render. Kindly bear in mind that it is hosted on a free instance and will spin down with inactivity, which can delay requests by 50 seconds or more.

# Endpoints 

## Register

### URL
http://localhost:3002/register
### Sample Payload
```
{
  "password": "John",
  "email": "a2@o.com"
}
```

## Login

### URL
http://localhost:3002/login
### Sample Payload
```
{
  "password": "John",
  "email": "a@o.com"
}
```
