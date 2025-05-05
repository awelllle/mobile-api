# Design / Implementation details

This project was implemented with JavaScript/Typescript running in the Node environment. The typescript files are compiled into Javascript and are stored in the dist folder.

The API is hosted on Render. Kindly bear in mind that it is hosted on a free instance and will spin down with inactivity, which can delay requests by 50 seconds or more.

# Endpoints 

## Register

### URL
https://vzy-u6g6.onrender.com/register
### Sample Payload
```
{
  "name": "John",
  "username": "Smith",
  "email": "a@o.com"
}
```

