# Status Codes

    Here, we are talking about the response status codes. These codes tell us whether an HTTP request has been successfully completed. Let us take a look at the five classes of the codes –

    1) Informational Responses: Codes 100 to 199

    2) Successful Responses: Codes 200 to 299

    3) Redirection Messages: Codes 300 to 399

    4) Client Error Responses: Codes 400 to 499

    5) Server Error Responses: Codes 500 to 599

## To see all the status codes : 

### Step 1 : Open your command prompt or shell, and type in the following command:
```bash
node
```
NOTE : You should see the following output, indicating that you are inside the node environment now.
```bash
Welcome to Node.js v16.14.0.
Type ".help" for more information.
>
```

### Step 2 : Now, we type the command:
```bash
http.STATUS_CODES
```
### Step 3 : Console.log result
- `100`: Continue

- `101`: Switching Protocols

- `102`: Processing

- `103`: Early Hints

- `200`: OK

- `201`: Created

- `202`: Accepted

- `203`: Non-Authoritative Information

- `204`: No Content

- `505`: HTTP Version Not Supported

- `506`: Variant Also Negotiates

- `507`: Insufficient Storage

- `508`: Loop Detected

- `509`: Bandwidth Limit Exceeded

- `510`: Not Extended

- `511`: Network Authentication Required